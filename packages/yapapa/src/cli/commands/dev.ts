import { generateRoutes, loadRoutes } from "../../routing/routing";
import { getGlobalContext } from "../../globals";
import { handleRequest } from "../../handle/handleRequest";

// get global contexts
const { runtime, config } = getGlobalContext();

// generate routes + load routes
await generateRoutes();
await loadRoutes();

const requestFunction = async (request: Request) => {
    return await handleRequest(request, runtime);
}

runtime.listen(config.default.port, requestFunction);
console.log(`Yapapa running at http://localhost:${config.default.port}`);