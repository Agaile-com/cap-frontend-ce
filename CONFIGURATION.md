# Tenant Configuration Guide

The `tenants.json` file contains configuration for different environments and tenants. The values in this file correspond to GitHub secrets:

## Development Environment

### Agaile Tenant
- `assistant_id`: Maps to NEXT_PUBLIC_LANGGRAPH_ASSISTANT_ID GitHub secret
- Current value: "d8a7f747-77ce-4b59-b3ff-754b46155d79"

### Zohlar Tenant
- `assistant_id`: Maps to NEXT_PUBLIC_LANGGRAPH_ASSISTANT_ID GitHub secret
- Current value: "fefda989-9c0e-4ddd-94d8-d1b5540b17bc"

### Shared Configuration
- `api_url`: Value from LANGGRAPH_API_URL GitHub secret
- `api_key`: Value from LANGCHAIN_API_KEY GitHub secret

## Production Environment

Similar structure with production-specific values and secrets. 