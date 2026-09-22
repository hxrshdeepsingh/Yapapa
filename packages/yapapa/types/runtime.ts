export interface Runtime {
    name: string;

    cwd(): string;
    readFile(path: string): Promise<string>;
    writeFile(path: string, data: string): Promise<void>;
    exists(path: string): Promise<boolean>;
    importModule(path: string): Promise<any>;
    resolveModule(specifier: string): URL;
    glob(pattern: string, options?: {
        cwd?: string
    }): Promise<string[]>;

    listen(
        port: number,
        handler: (request: Request) => Promise<Response>
    ): unknown;
}