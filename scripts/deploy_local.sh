#!/bin/bash

# Configuration
TENANT="${TENANT:-agaile}"  # Use TENANT from .env.local or default to "agaile"
ENV="${ENV:-dev}"          # Use ENV from .env.local or default to "dev"
ECR_REGISTRY="533267288999.dkr.ecr.eu-central-1.amazonaws.com"
IMAGE_NAME="cap-frontend"
TAG="local"

# Load environment variables from .env.local if it exists
if [ -f .env.local ]; then
    echo "Loading environment variables from .env.local"
    source .env.local
fi

echo "Deploying tenant: $TENANT in environment: $ENV"

# Build the image
echo "Building Docker image for tenant $TENANT..."
echo "Environment variables:"
echo "ENV_NAME=${ENV}"
echo "NEXT_PUBLIC_APP_ENV=${ENV}"
echo "NODE_ENV=production"
docker buildx build \
  --platform linux/arm64 \
  --build-arg LANGCHAIN_API_KEY="${LANGCHAIN_API_KEY}" \
  --build-arg LANGGRAPH_API_URL="${LANGGRAPH_API_URL}" \
  --build-arg NEXT_PUBLIC_LANGGRAPH_ASSISTANT_ID="${NEXT_PUBLIC_LANGGRAPH_ASSISTANT_ID}" \
  --build-arg NEXT_PUBLIC_APP_ENV="${ENV}" \
  --build-arg TENANT_NAME="${TENANT}" \
  --build-arg ENV_NAME="${ENV}" \
  -t "${IMAGE_NAME}:${TENANT}-${TAG}" \
  .

# Test locally (uncomment to run)
# echo "Running container locally on port 3000..."
# docker run -p 3000:3000 "${IMAGE_NAME}:${TENANT}-${TAG}"

echo "Logging into ECR..."
aws ecr get-login-password --region eu-central-1 | docker login --username AWS --password-stdin ${ECR_REGISTRY}

echo "Tagging image for ECR..."
docker tag "${IMAGE_NAME}:${TENANT}-${TAG}" "${ECR_REGISTRY}/${IMAGE_NAME}:${TENANT}"

echo "Pushing to ECR..."
docker push "${ECR_REGISTRY}/${IMAGE_NAME}:${TENANT}"

echo "Done! Image pushed to ${ECR_REGISTRY}/${IMAGE_NAME}:${TENANT}" 