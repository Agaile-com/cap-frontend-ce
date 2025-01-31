# Deployment Configuration Guide

## Configuration Files

### config.json
Contains deployment-specific variables:
```json
{
  "production": {
    "PROJECT_NAME": "agaile-prod",
    "NEXT_PUBLIC_LANGGRAPH_ASSISTANT_ID": "your-assistant-id"
  }
}
```

### .env.build (for local development)
```env
LANGCHAIN_API_KEY=your_key_here
LANGGRAPH_API_URL=your_url_here
```

## GitHub Secrets
These secrets need to be set in your GitHub repository settings (Settings > Secrets and Variables > Actions):

### API Keys and URLs
- `LANGCHAIN_API_KEY` - LangChain API key for authentication
- `LANGGRAPH_API_URL` - URL for the LangGraph API endpoint

### AWS Credentials
- `AWS_ACCESS_KEY_ID_PROD` - AWS access key for production environment
- `AWS_SECRET_ACCESS_KEY_PROD` - AWS secret key for production environment

## Build Process

### Local Build (build_image)
1. Reads deployment config from `config.json`
2. Loads sensitive data from environment (set via .env.build)
3. Uses AWS credentials from AWS CLI configuration

### GitHub Actions Build
1. Reads deployment config from `config.json`
2. Uses secrets for sensitive data
3. Uses AWS credentials from GitHub secrets

## ECS Task Definition
Ensure these environment variables are set in your ECS task definition:
- `LANGCHAIN_API_KEY`
- `LANGGRAPH_API_URL`
- `AWS_REGION`

## Workflow
1. Update `config.json` for deployment-specific settings
2. Set secrets in GitHub for sensitive data
3. Configure ECS task definition with runtime environment variables
4. Use `build_image` for local builds or GitHub Actions for production deployments

Note: Never commit actual secret values to version control. This file serves as a reference for configuration only. 