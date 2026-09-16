import { BunRuntime } from "./bun";
import { NodeRuntime } from "./node";

const runtimes = {
    bun: BunRuntime,
    node: NodeRuntime
} as const;

export function getRuntime(name: keyof typeof runtimes) {
    const runtime = runtimes[name];

    if (!runtime) {
        throw new Error(`Unknown runtime: ${name}`);
    }

    return runtime;
}