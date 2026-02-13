import { execSync } from 'child_process';

console.log('Running npm install to regenerate package-lock.json...');
try {
  const output = execSync('npm install', {
    cwd: '/vercel/share/v0-project',
    encoding: 'utf-8',
    stdio: 'pipe'
  });
  console.log(output);
  console.log('Successfully regenerated package-lock.json');
} catch (error) {
  console.error('Error:', error.stdout || error.message);
  process.exit(1);
}
