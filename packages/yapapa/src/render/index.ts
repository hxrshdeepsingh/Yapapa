import { layoutWrapper } from "../template/layout";
import { renderYapapaFile } from "./render";

export async function handlePageRendering(path: any, request: any, params: any) {
    const pageHtml = await renderYapapaFile(path, request, params);
    const html = await layoutWrapper("{{children}}", pageHtml);
    return html;
}