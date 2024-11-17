#!/bin/bash

echo "Starting sanitization process..."

# Create temporary directory for sanitized content
mkdir -p ./temp-community/

# Copy community directory content
rsync -av ./community/ ./temp-community/

# Remove sensitive files
find ./temp-community -type f -name "*.env*" -delete
find ./temp-community -type f -name "*secrets*" -delete
find ./temp-community -type f -name "*config.private*" -delete
find ./temp-community -type f -name "*.key" -delete
find ./temp-community -type f -name "*.pem" -delete

# Remove sensitive content from files
find ./temp-community -type f -exec sed -i '/TODO:/d' {} +
find ./temp-community -type f -exec sed -i '/FIXME:/d' {} +
find ./temp-community -type f -exec sed -i '/SECURITY:/d' {} +

# Replace internal URLs and endpoints
find ./temp-community -type f -exec sed -i 's/internal\.[a-zA-Z0-9.-]*\.[a-zA-Z]\{2,\}/example.com/g' {} +

# Ensure community-specific files are present
cp LICENSE ./temp-community/
cp community/README.md ./temp-community/
cp community/CONTRIBUTING.md ./temp-community/

echo "Sanitization complete. Files are ready in ./temp-community/"
