import { runtime } from "../exporter";

export async function layoutWrapper(html: string) {
    const layout = await runtime.readFile("./src/pages/layout.html");
    return layout.replace("{{children}}", html);
}