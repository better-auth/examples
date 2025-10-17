interface ImportMetaEnv {
    readonly VITE_API_URL: string | undefined;
    readonly VITE_WEB_URL: string | undefined;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
