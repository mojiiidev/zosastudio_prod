import { execSync } from "child_process";
import { existsSync, unlinkSync } from "fs";
import { join } from "path";

const lockFile = join(process.cwd(), "package-lock.json");

// Remove stale lock file if it exists
if (existsSync(lockFile)) {
  unlinkSync(lockFile);
  console.log("Removed stale package-lock.json");
} else {
  console.log("No package-lock.json found (already deleted)");
}

// Run npm install to regenerate lock file
console.log("Running npm install...");
try {
  execSync("npm install", { stdio: "inherit", cwd: process.cwd() });
  console.log("Successfully regenerated package-lock.json");
} catch (error) {
  console.error("npm install failed:", error.message);
  process.exit(1);
}
