import { readFile, writeFile, access, mkdir } from "node:fs/promises";
import { dirname } from "node:path";
import { glob } from "node:fs/promises";
import { nodeHandler } from "./handler/nodeHandler";
import type { Runtime } from "../../types/runtime";

export const NodeRuntime: Runtime = {
    name: "node",

    cwd() {
        return process.cwd();
    },

    async readFile(path: string): Promise<string> {
        return readFile(path, "utf-8");
    },

    async writeFile(path: string, data: string) {
        await mkdir(dirname(path), { recursive: true });
        await writeFile(path, data, "utf-8");
    },

    async exists(path: string): Promise<boolean> {
        try {
            await access(path);
            return true;
        } catch {
            return false;
        }
    },

    async importModule(path: string) {
        return import(path);
    },

    resolveModule(specifier: string): URL {
        return new URL(import.meta.resolve(specifier));
    },

    async glob(
        pattern: string,
        options?: {
            cwd?: string;
        }
    ): Promise<string[]> {
        return Array.fromAsync(
            glob(pattern, {
                cwd: options?.cwd
            })
        );
    },

    listen(port: number, handler: (request: Request) => Promise<Response>) {
        return nodeHandler(port, handler);
    }
};