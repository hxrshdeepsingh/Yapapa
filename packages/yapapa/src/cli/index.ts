import { createGlobalContext, setGlobalContext } from "../globals";
import cac from "cac";

function detectRuntime() {
  if (typeof Bun !== 'undefined') return 'bun';
  if (typeof process !== 'undefined' && process.versions && process.versions.node) return 'node';
  return 'unknown';
}

const cli = cac("yapapa");
cli
  .command("dev", "Start the development server")
  .action(async () => {
    const runtime = detectRuntime();
    // setting global runtime & other gloabal variables
    const ctx = await createGlobalContext(runtime);
    setGlobalContext(ctx);
    // calling the main dev script
    await import("./commands/dev.ts");
  });

cli
  .command("start", "Start the production server")
  .action(async () => {
    const runtime = detectRuntime();
    // setting global runtime & other gloabal variables
    const ctx = await createGlobalContext(runtime);
    setGlobalContext(ctx);
    // calling the main dev script
    await import("./commands/start.ts");
  });

cli
  .command("build", "Build the production bundle")
  .action(async () => {
    const runtime = detectRuntime();
    // setting global runtime & other gloabal variables
    const ctx = await createGlobalContext(runtime);
    setGlobalContext(ctx);
    // calling the main build script
    await import("./commands/build.ts");
  });

cli.help();
cli.parse();