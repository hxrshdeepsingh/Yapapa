import { pathToFileURL } from "node:url";
import { resolve } from "node:path";
import { getRuntime } from "./runtime";

export const projectRoot = process.cwd();
export const yapapaRoot = resolve(import.meta.dirname || ".", "..");
export const config = await import(pathToFileURL(resolve(projectRoot, "yapapa.config.ts")).href);
export const runtime = getRuntime(config.default.runtime);