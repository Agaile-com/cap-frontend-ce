#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const customerName = process.argv[2];

if (!customerName) {
  console.error('Please provide a customer name');
  process.exit(1);
}

const customerDir = path.join(__dirname, '..', 'customers', customerName);

// Create customer directory
fs.mkdirSync(customerDir, { recursive: true });

// Create customer package.json
const packageJson = {
  name: `@cap-frontend/${customerName}`,
  version: '1.0.0',
  private: true,
  scripts: {
    dev: 'vite',
    build: 'tsc && vite build',
    test: 'vitest'
  },
  dependencies: {
    '@cap-frontend/core': 'workspace:*',
    'react': '^18.2.0',
    'react-dom': '^18.2.0'
  },
  devDependencies: {
    '@types/react': '^18.2.0',
    '@types/react-dom': '^18.2.0',
    '@vitejs/plugin-react': '^4.0.0',
    'typescript': '^5.0.0',
    'vite': '^4.0.0',
    'vitest': '^0.34.0'
  }
};

fs.writeFileSync(
  path.join(customerDir, 'package.json'),
  JSON.stringify(packageJson, null, 2)
);

// Create base files for customer
const files = {
  'vite.config.ts': `
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
  server: {
    port: 3000,
  },
});
  `,
  'tsconfig.json': `
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@core/*": ["../../core/src/*"]
    }
  },
  "include": ["src"]
}
  `,
  'src/main.tsx': `
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
  `,
  'src/App.tsx': `
import { CoreComponent } from '@cap-frontend/core';

function App() {
  return (
    <div>
      <h1>${customerName} Instance</h1>
      <CoreComponent />
    </div>
  );
}

export default App;
  `
};

Object.entries(files).forEach(([filename, content]) => {
  const filePath = path.join(customerDir, filename);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content.trim());
});

console.log(`Created customer instance: ${customerName}`);
