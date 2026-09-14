#!/usr/bin/env tsx
const command = process.argv[2];

if (command === "dev") {
  console.log("Starting Yapapa development server...");

  await import("./../../src/cli/dev/server.ts");
  // await import("../server.js");
} else {
  console.log(`
Yapapa CLI

Commands:
  yapapa dev
`);
}
