
import { getGlobalContext } from "../globals";

const { runtime } = getGlobalContext()

import { layoutWrapper } from "../template/layout";

// execute server code
export async function executeServerCode(code: string, request: Request, params: any): Promise<Record<string, unknown>> {
  const AsyncFunction = Object.getPrototypeOf(async function () { }).constructor

  const fn = new AsyncFunction("request", "params", code)

  const result = await fn(request, params)

  return result ?? {}
}

// replace {variable} placeholders with values from the rendering context
export function renderTemplate(template: any, context: any) {
  return template.replace(/\{([a-zA-Z_$][\w$]*)\}/g, (match: any, key: any) => {
    const value = context[key];

    if (value === undefined || value === null) {
      return "";
    }

    return String(value);
  });
}

// splitting yapapa file source code into server code and template
export function parseYapapa(source: string) {
  const serverMatch = source.match(/<server>([\s\S]*?)<\/server>/);
  const serverCode = serverMatch?.[1] ?? "";
  const template = source.replace(/<server>[\s\S]*?<\/server>/, "");

  return {
    serverCode,
    template,
  };
}

// return html string by executing server code and rendering template
export async function renderYapapaFile(
  filePath: string,
  request: any,
  params: any,
): Promise<string> {
  const source = await runtime.readFile(filePath);
  const { serverCode, template } = parseYapapa(source);
  const context = await executeServerCode(serverCode, request, params);
  const childHtml = renderTemplate(template, context);
  const html = await layoutWrapper(childHtml);
  return html;
}
