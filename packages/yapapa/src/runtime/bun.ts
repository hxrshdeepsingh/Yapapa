import type { Runtime } from "../../types/runtime.js";
import { bunHandler } from "./handler/bunHandler.js";

export const BunRuntime: Runtime = {
  name: "bun",

  cwd() {
    return process.cwd();
  },

  async readFile(path: string): Promise<string> {
    return Bun.file(path).text();
  },

  async writeFile(path: string, data: string) {
    await Bun.write(path, data);
  },

  async exists(path: string): Promise<boolean> {
    return Bun.file(path).exists();
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
    const glob = new Bun.Glob(pattern);

    return Array.fromAsync(
      glob.scan({
        cwd: options?.cwd
      })
    );
  },

  listen(port: number, handler: (request: Request) => Promise<Response>) {
    return bunHandler(port, handler);
  },
};
