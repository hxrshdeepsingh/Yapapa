import { getGlobalContext } from "../globals";

const { runtime } = getGlobalContext()

export async function layoutWrapper(text: string, html: string) {
    const layout = await runtime.readFile("./src/pages/layout.html");
    return layout.replace(text, html);
}