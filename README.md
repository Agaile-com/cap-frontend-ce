# CAP - Empowering Enterprise AI Transformation with Open Source
This repository is part of CAP - a platform for building and deploying AI applications. It is built with LangGraph and Model Context Protocol (MCP).
Find more about CAP at [https://cap.agaile.ai](https://cap.agaile.ai).


## CAP Frontend

This is the user interface for CAP based on [assistant-ui](https://github.com/Yonom/assistant-ui) and a starter project for langgraph.

## Configuration

### Tenant-Specific Parameters

The application uses tenant-specific configuration stored in `tenants.json`:

```json
{
  "dev": {
    "tenants": {
      "agaile": {
        "project_name": "agaile",
        "assistant_id": "d8a7f747-77ce-4b59-b3ff-754b46155d79"
      },
      "zohlar": {
        "project_name": "zohlar",
        "assistant_id": "fefda989-9c0e-4ddd-94d8-d1b5540b17bc"
      },
      "new-tenant": {
        "project_name": "new-tenant",
        "assistant_id": "your-assistant-id"
      }
    }
  }
}
```

To add or update a tenant:
1. Add/modify the tenant entry in `tenants.json`
2. Required fields:
   - `project_name`: Used for container tagging
   - `assistant_id`: LangGraph Assistant ID for this tenant

## Deployment Options

### 1. Local Development

First, add your langgraph API url and assistant id to `.env.local` file:


Update `.env.local` with your values:
```env
LANGCHAIN_API_KEY=your_langchain_api_key
LANGGRAPH_API_URL=your_langgraph_api_url
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_REGION=eu-central-1
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 2. Local Deployment (via Console)

For testing and deployment to ECR:

1. Configure your `.env.local`:
```env
LANGCHAIN_API_KEY=your_langchain_api_key
LANGGRAPH_API_URL=your_langgraph_api_url
TENANT=rooftopsolar              # Specify which tenant to deploy
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_REGION=eu-central-1
```

2. Run the deployment script:
```bash
./scripts/deploy_local.sh
# Or override tenant from command line:
TENANT=agaile ./scripts/deploy_local.sh
```

This will:
- Build the Docker image
- Push to ECR
- Use tenant configuration from `tenants.json` for the specified tenant
- Assistant ID is automatically picked from `tenants.json` based on TENANT

The script will show:
```bash
Loading environment variables from .env.local
Deploying tenant: rooftopsolar
Building Docker image for tenant rooftopsolar...
```

### 3. GitHub Actions Deployment

For automated deployments:

1. Set up GitHub Secrets:
   - `LANGCHAIN_API_KEY`
   - `LANGGRAPH_API_URL`
   - `AWS_ACCESS_KEY_ID_DEV`
   - `AWS_SECRET_ACCESS_KEY_DEV`

2. Trigger the workflow:
   - Go to Actions → "Build and Publish Container"
   - Click "Run workflow"
   - Select:
     - Tenant (agaile/zohlar)
     - Tag (default: latest)
     - Dockerfile path (default: Dockerfile)

## Environment Variables

### Shared Variables (GitHub Secrets)
- `LANGCHAIN_API_KEY`: LangChain API key
- `LANGGRAPH_API_URL`: LangGraph API URL
- `AWS_ACCESS_KEY_ID_DEV`: AWS access key
- `AWS_SECRET_ACCESS_KEY_DEV`: AWS secret key

### Tenant-Specific Variables (tenants.json)
- `assistant_id`: LangGraph Assistant ID
- `project_name`: Container naming

## Embedding Instructions

To embed the chatbot in your application:

```html
<iframe 
  id="agaile" 
  src="https://agaile.widget.agaile.com" 
  style="position: fixed;right: 0;bottom: 0;width: 500px;height: 600px;z-index: 9999;">
</iframe>
```

## Notes
- Local development is useful for testing changes
- Local deployment via console helps test the full deployment process
- GitHub Actions is recommended for production deployments
- Always update `tenants.json` when adding new tenants

To deploy a new tenant:

1. Add tenant configuration to `tenants.json`:
```json
{
  "dev": {
    "tenants": {
      "new-tenant": {
        "project_name": "new-tenant",
        "assistant_id": "your-assistant-id"
      }
    }
  }
}
```

2. Deploy using either method:
   - Local: Update `TENANT` in `scripts/deploy_local.sh` and run it
   - GitHub Actions: Select tenant from dropdown when running workflow

#### Note: `.env.local` is only needed for local development (`npm run dev`), not for container builds which use `tenants.json`.

