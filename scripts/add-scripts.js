
#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Path to package.json
const packageJsonPath = path.resolve(__dirname, '../package.json');

try {
  // Read the package.json file
  const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf8');
  const packageJson = JSON.parse(packageJsonContent);

  // Add the required scripts
  packageJson.scripts = {
    ...packageJson.scripts,
    "dev": "vite",
    "build": "vite build",
    "build:dev": "vite build --mode development",
    "preview": "vite preview"
  };

  // Write the updated package.json
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  
  console.log('✅ Scripts successfully added to package.json!');
  console.log('You can now run: npm run dev');
} catch (error) {
  console.error('Error updating package.json:', error.message);
  console.log('\n🚨 IMPORTANT: Please manually add the following scripts to your package.json:\n');
  console.log(JSON.stringify({
    "scripts": {
      "dev": "vite",
      "build": "vite build", 
      "build:dev": "vite build --mode development",
      "preview": "vite preview"
    }
  }, null, 2));
  console.log('\nThese scripts are required for your Vite React project to run correctly.');
  process.exit(1);
}
