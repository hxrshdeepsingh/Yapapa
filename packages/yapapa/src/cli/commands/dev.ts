import { renderYapapaFile } from "../../render/render";
import { getRouteFile, generateRoutes, loadRoutes } from "../../routing/routing";
import { getGlobalContext } from "../../globals";

const ctx = getGlobalContext();
const { runtime, projectRoot, config, yapapaRoot } = ctx;

// generate routes + load routes
await generateRoutes();
await loadRoutes();

// -----------------------------------------

const fetch = async (request: any) => {
    const url = new URL(request.url);
    const htmxPath = runtime.resolveModule("htmx.org/dist/htmx.min.js");
    const alpinePath = runtime.resolveModule("alpinejs/dist/cdn.min.js");

    if (url.pathname === "/htmx.js") {
        return new Response(

            await runtime.readFile(htmxPath),
            {
                headers: {
                    "Content-Type": "application/javascript",
                },
            },
        );
    }
    if (url.pathname === "/alpine.js") {
        return new Response(
            await runtime.readFile(alpinePath),
            {
                headers: {
                    "Content-Type": "application/javascript",
                },
            },
        );
    }
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

    const html = await renderYapapaFile(path, request, params);

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
};

runtime.listen(config.default.port, fetch);
console.log(`Yapapa running at http://localhost:${config.default.port}`);