import { execSync } from "child_process";

// Copy files
try {
  execSync("xcopy /E /I prisma");
  execSync("xcopy /E /I public");
  console.log("Files copied successfully.");
} catch (error) {
  console.error("Error copying files:", error);
}
