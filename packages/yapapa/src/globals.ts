import type { GlobalContext } from "../types/context/globals";
import { getRuntime } from "./runtime";

let context: GlobalContext;

export function setGlobalContext(content: GlobalContext) {
    context = content;
}

export function getGlobalContext() {
    return context;
}

export async function createGlobalContext(runtimeType: any) {
    const runtime = getRuntime(runtimeType);
    const projectRoot = runtime.cwd();
    const config = await runtime.importModule(`${projectRoot}/yapapa.config.ts`);
    const yapapaRoot = new URL("../", import.meta.url);
    return {
        projectRoot,
        runtime,
        config,
        yapapaRoot
    };
}