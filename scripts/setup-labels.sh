#!/bin/bash

# Check if gh CLI is installed
if ! command -v gh &> /dev/null; then
    echo "GitHub CLI (gh) is not installed. Please install it first."
    exit 1
fi

# Repository details
REPO="cap-frontend-community-repo"
OWNER="Agaile-com"

# Function to create or update a label
create_label() {
    local name="$1"
    local color="$2"
    local description="$3"

    echo "Creating/updating label: $name"
    gh api \
        --method POST \
        "/repos/$OWNER/$REPO/labels" \
        -f name="$name" \
        -f color="$color" \
        -f description="$description" \
        >/dev/null 2>&1 || \
    gh api \
        --method PATCH \
        "/repos/$OWNER/$REPO/labels/$name" \
        -f color="$color" \
        -f description="$description"
}

# Delete default labels
echo "Removing default labels..."
default_labels=("bug" "documentation" "duplicate" "enhancement" "good first issue" "help wanted" "invalid" "question" "wontfix")
for label in "${default_labels[@]}"; do
    gh api --method DELETE "/repos/$OWNER/$REPO/labels/$label" 2>/dev/null || true
done

# Create custom labels
echo "Creating custom labels..."

# Priority labels
create_label "priority: critical" "b60205" "Needs immediate attention"
create_label "priority: high" "d93f0b" "Important issue that needs attention soon"
create_label "priority: medium" "fbca04" "Issue that needs attention"
create_label "priority: low" "0e8a16" "Issue that can wait"

# Type labels
create_label "type: bug" "d73a4a" "Something isn't working correctly"
create_label "type: feature" "0075ca" "New feature request or proposal"
create_label "type: ui" "7057ff" "UI related changes"
create_label "type: ux" "006b75" "UX improvements or issues"
create_label "type: accessibility" "0052cc" "Accessibility issues or improvements"
create_label "type: documentation" "0075ca" "Documentation related issues"
create_label "type: performance" "006b75" "Performance improvement related"
create_label "type: security" "ee0701" "Security related issues"

# Component labels
create_label "component: core" "5319e7" "Core component issues"
create_label "component: ui" "bfdadc" "UI component issues"
create_label "component: build" "fef2c0" "Build system issues"
create_label "component: tests" "d4c5f9" "Test-related issues"

# Browser labels
create_label "browser: chrome" "ededed" "Chrome-specific issues"
create_label "browser: firefox" "ededed" "Firefox-specific issues"
create_label "browser: safari" "ededed" "Safari-specific issues"
create_label "browser: edge" "ededed" "Edge-specific issues"

# Status labels
create_label "status: blocked" "d73a4a" "Issue is blocked by something else"
create_label "status: in progress" "fbca04" "Issue is being worked on"
create_label "status: review needed" "006b75" "Issue needs review"
create_label "status: ready" "0e8a16" "Issue is ready to be worked on"

# Size labels
create_label "size: xs" "d4c5f9" "Very small change"
create_label "size: small" "c5def5" "Small change"
create_label "size: medium" "fef2c0" "Medium-sized change"
create_label "size: large" "f9d0c4" "Large change"

# Other labels
create_label "good first issue" "7057ff" "Good issues for newcomers"
create_label "help wanted" "008672" "Extra attention needed"
create_label "needs design" "cc317c" "Requires design input"
create_label "responsive" "ffd700" "Related to responsive design"
create_label "dependencies" "0366d6" "Updates to dependencies"

echo "Label setup completed!"
