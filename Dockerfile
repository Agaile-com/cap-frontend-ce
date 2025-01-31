# Specify platform in base image
FROM node:18-alpine

# Declare build-time arguments
ARG TARGETPLATFORM
ARG BUILDPLATFORM
ARG LANGCHAIN_API_KEY
ARG LANGGRAPH_API_URL
ARG NEXT_PUBLIC_LANGGRAPH_ASSISTANT_ID
ARG NEXT_PUBLIC_APP_ENV
ARG TENANT_NAME
ARG ENV_NAME

# Set environment variables
ENV NODE_ENV=production
ENV NEXT_PUBLIC_APP_ENV=${NEXT_PUBLIC_APP_ENV}
ENV LANGCHAIN_API_KEY=${LANGCHAIN_API_KEY}
ENV LANGGRAPH_API_URL=${LANGGRAPH_API_URL}
ENV NEXT_PUBLIC_LANGGRAPH_ASSISTANT_ID=${NEXT_PUBLIC_LANGGRAPH_ASSISTANT_ID}
ENV AWS_REGION=eu-central-1

# Set working directory
WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./
COPY tenants.json ./

# Install dependencies
RUN apk add --no-cache python3 make g++ jq

# Install npm dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Extract assistant ID from tenants.json based on TENANT_NAME and ENV_NAME
RUN if [ -n "$TENANT_NAME" ] && [ -n "$ENV_NAME" ]; then \
    ASSISTANT_ID=$(jq -r ".$ENV_NAME.tenants.$TENANT_NAME.assistant_id" tenants.json); \
    export NEXT_PUBLIC_LANGGRAPH_ASSISTANT_ID=$ASSISTANT_ID; \
    fi

# Build with the extracted assistant ID
RUN NEXT_PUBLIC_LANGGRAPH_ASSISTANT_ID=${NEXT_PUBLIC_LANGGRAPH_ASSISTANT_ID} npm run build

# Expose the port
EXPOSE 3000

# Add AWS CLI
RUN apk add --no-cache aws-cli

# Run the application
CMD ["npm", "start"]
