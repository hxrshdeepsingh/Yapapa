import { renderYapapaFile } from "../../render/render.js";
import { getRouteFile, generateRoutes, loadRoutes } from "../../routing/routing.js";
import { projectRoot, yapapaRoot, config, runtime } from "../../exporter.js";

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

export { runtime };

config.default.runtime.listen(config.default.port, fetch);
console.log(`Yapapa running at http://localhost:${config.default.port}`);