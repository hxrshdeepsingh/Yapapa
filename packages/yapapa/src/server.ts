import { renderYapapaFile } from "./render/render.js";
import { layoutWrapper } from "./template/layout.js";
import { getRouteFile, generateRoutes, loadRoutes } from "./routing/routing.js";

// -----------------------------------------

import { pathToFileURL } from "node:url";
import { resolve } from "node:path";

// -----------------------------------------

// routes project * yapapa
const projectRoot = process.cwd();
const yapapaRoot = resolve(import.meta.dirname || ".", "..");
const config = await import(pathToFileURL(resolve(projectRoot, "yapapa.config.ts")).href);
const runtime = config.default.runtime;

// -----------------------------------------

// generate routes + load routes
await generateRoutes();
await loadRoutes();

// -----------------------------------------

const fetch = async (request: any) => {
  const url = new URL(request.url);

  if (url.pathname === "/htmx.js") {
    return new Response(
      await runtime.readFile(
        `${yapapaRoot}/node_modules/htmx.org/dist/htmx.min.js`,
      ),
      {
        headers: {
          "Content-Type": "application/javascript",
        },
      },
    );
  }
  if (url.pathname === "/alpine.js") {
    return new Response(
      await runtime.readFile(
        `${yapapaRoot}/node_modules/alpinejs/dist/cdn.min.js`,
      ),
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
  const finalHtml = await layoutWrapper(html);

  if (fileExists) {
    return new Response(finalHtml, {
      headers: {
        "Content-Type": "text/html",
      },
    });
  }

  return new Response("404 - Page Not Found", {
    status: 404,
  });
};

export { runtime };

config.default.runtime.listen(config.default.port, fetch);
console.log(`Yapapa running at http://localhost:${config.default.port}`);
