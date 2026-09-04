import fs from 'node:fs';
import 'dotenv/config';

async function generateApi() {
  const url = `${process.env.API_URL}/docs-json`;

  let openapi;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    openapi = await res.json();
  } catch (err: any) {
    console.warn(`Failed to fetch schema from ${url}: ${err.message}. Trying to read local openapi.json...`);
    try {
      openapi = JSON.parse(fs.readFileSync('openapi.json', 'utf8'));
    } catch (e) {
      console.error('Could not load OpenAPI schema. Make sure the backend is running or openapi.json exists.');
      process.exit(1);
    }
  }

  let output = `import type * as Generated from './types.gen';\n\nexport type Api = {\n`;

  for (const [route, methods] of Object.entries(openapi.paths)) {
    output += `  '${route}': {\n`;
    for (const [method, operation] of Object.entries(methods as any)) {
      if (['get', 'post', 'put', 'patch', 'delete', 'options', 'head'].indexOf(method) === -1) continue;

      const op = operation as any;
      const methodUpper = method.toUpperCase();
      const opId = op.operationId;
      if (!opId) continue;

      const typeNameBase = opId
        .replace(/_([a-zA-Z0-9])/g, (_: string, p1: string) => p1.toUpperCase())
        .replace(/^[a-z]/, (c: string) => c.toUpperCase());

      output += `    ${methodUpper}: {\n`;

      const parameters = op.parameters || [];
      const hasPathParams = parameters.some((p: any) => p.in === 'path');
      if (hasPathParams) {
        output += `      params: Generated.${typeNameBase}Data['path'];\n`;
      } else {
        output += `      params: {};\n`;
      }

      const hasQueryParams = parameters.some((p: any) => p.in === 'query');
      if (hasQueryParams) {
        output += `      query: Generated.${typeNameBase}Data['query'];\n`;
      } else {
        output += `      query: {};\n`;
      }

      const hasBody = op.requestBody != null;
      if (hasBody) {
        output += `      data: Generated.${typeNameBase}Data['body'];\n`;
      } else {
        output += `      data: {};\n`;
      }

      const responses = op.responses || {};
      const successCode = Object.keys(responses).find((code) => /^2\d\d$/.test(code));

      if (successCode && successCode !== '204') {
        output += `      response: Generated.${typeNameBase}Responses[${successCode}];\n`;
      } else {
        output += `      response: void;\n`;
      }

      output += `    };\n`;
    }
    output += `  };\n\n`;
  }

  output += `};\n\n`;

  output += `export type ApiPath = keyof Api;

export type ApiMethod<
  P extends ApiPath
> = keyof Api[P];

export type ApiOperation<
  P extends ApiPath,
  M extends ApiMethod<P>
> = Api[P][M];

export type ApiParams<
  P extends ApiPath,
  M extends ApiMethod<P>
> = ApiOperation<P, M> extends { params: infer T } ? T : never;

export type ApiQuery<
  P extends ApiPath,
  M extends ApiMethod<P>
> = ApiOperation<P, M> extends { query: infer T } ? T : never;

export type ApiData<
  P extends ApiPath,
  M extends ApiMethod<P>
> = ApiOperation<P, M> extends { data: infer T } ? T : never;

export type ApiResponse<
  P extends ApiPath,
  M extends ApiMethod<P>
> = ApiOperation<P, M> extends { response: infer T } ? T : never;
`;

  fs.writeFileSync('app/core/generated/api.gen.ts', output, 'utf8');
  console.log('Successfully generated app/core/generated/api.gen.ts');
}

generateApi().catch(console.error);