import { executeServerCode } from "../execute.js";
import { runtime } from "../server.js";

export function renderTemplate(template: any, context: any) {
  return template.replace(/\{([a-zA-Z_$][\w$]*)\}/g, (match: any, key: any) => {
    const value = context[key];

    if (value === undefined || value === null) {
      return "";
    }

    return String(value);
  });
}

export function parseYapapa(source: string) {
  const serverMatch = source.match(/<server>([\s\S]*?)<\/server>/);
  const serverCode = serverMatch?.[1] ?? "";
  const template = source.replace(/<server>[\s\S]*?<\/server>/, "");

  return {
    serverCode,
    template,
  };
}

export async function renderYapapaFile(
  filePath: string,
  request: any,
  params: any,
): Promise<string> {
  const source = await runtime.readFile(filePath);

  const { serverCode, template } = parseYapapa(source);

  const context = await executeServerCode(serverCode, request, params);

  return renderTemplate(template, context);
}
