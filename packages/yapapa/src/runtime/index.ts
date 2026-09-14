import { BunRuntime } from "./bun";
import { NodeRuntime } from "./node";

export const runtimes: any = {
    bun: BunRuntime,
    node: NodeRuntime
}

export function getRuntime(name: string) {
    const runtime = runtimes[name as keyof typeof runtimes];

    if (!runtime) {
        throw new Error(`Unknown runtime: ${name}`);
    }

    return runtime;
}