import { generateRoutes, loadRoutes } from "../../routing/routing";
import { getGlobalContext } from "../../globals";

// get global contexts
const { runtime } = getGlobalContext();

// generate routes + load routes
await generateRoutes();
await loadRoutes();

console.log(`Building route manifest at ${runtime.cwd()}/.yapapa/routes.manifest.json`);