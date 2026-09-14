import { pathToFileURL } from "node:url";
import { resolve } from "node:path";

export const projectRoot = process.cwd();
export const yapapaRoot = resolve(import.meta.dirname || ".", "..");
export const config = await import(pathToFileURL(resolve(projectRoot, "yapapa.config.ts")).href);
export const runtime = config.default.runtime;