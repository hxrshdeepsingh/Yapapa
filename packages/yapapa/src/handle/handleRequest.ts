import { handlePageRendering } from "../render";
import { getRouteFile } from "../routing/routing";

export async function handleRequest(request: any, runtime: any) {
    const url = new URL(request.url);
    if (
        url.pathname === "/favicon.ico" ||
        url.pathname.startsWith("/.well-known/")
    ) {
        return new Response(null, { status: 404 });
    }

    const { path, params } = await getRouteFile(url.pathname);
    const fileExists = await runtime.exists(path);

    if (!fileExists) {
        return new Response("404 - Page Not Found", {
            status: 404,
        });
    }

    const html = await handlePageRendering(path, request, params);

    if (fileExists) {
        return new Response(html, {
            headers: {
                "Content-Type": "text/html",
            },
        });
    }

    return new Response("404 - Page Not Found", {
        status: 404,
    });
}