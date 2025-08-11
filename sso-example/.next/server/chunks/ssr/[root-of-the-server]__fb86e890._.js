module.exports = {

"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[project]/packages/better-auth/dist/shared/better-auth.8zoxzg-F.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "a": ()=>isProduction,
    "b": ()=>isDevelopment,
    "e": ()=>env,
    "i": ()=>isTest
});
const _envShim = /* @__PURE__ */ Object.create(null);
const _getEnv = (useShim)=>globalThis.process?.env || //@ts-expect-error
    globalThis.Deno?.env.toObject() || //@ts-expect-error
    globalThis.__env__ || (useShim ? _envShim : globalThis);
const env = new Proxy(_envShim, {
    get (_, prop) {
        const env2 = _getEnv();
        return env2[prop] ?? _envShim[prop];
    },
    has (_, prop) {
        const env2 = _getEnv();
        return prop in env2 || prop in _envShim;
    },
    set (_, prop, value) {
        const env2 = _getEnv(true);
        env2[prop] = value;
        return true;
    },
    deleteProperty (_, prop) {
        if (!prop) {
            return false;
        }
        const env2 = _getEnv(true);
        delete env2[prop];
        return true;
    },
    ownKeys () {
        const env2 = _getEnv(true);
        return Object.keys(env2);
    }
});
function toBoolean(val) {
    return val ? val !== "false" : false;
}
const nodeENV = typeof process !== "undefined" && process.env && ("TURBOPACK compile-time value", "development") || "";
const isProduction = nodeENV === "production";
const isDevelopment = nodeENV === "dev" || nodeENV === "development";
const isTest = nodeENV === "test" || toBoolean(env.TEST);
;
}),
"[project]/packages/better-auth/dist/shared/better-auth.DdzSJf-n.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "B": ()=>BetterAuthError,
    "M": ()=>MissingDependencyError
});
class BetterAuthError extends Error {
    constructor(message, cause){
        super(message);
        this.name = "BetterAuthError";
        this.message = message;
        this.cause = cause;
        this.stack = "";
    }
}
class MissingDependencyError extends BetterAuthError {
    constructor(pkgName){
        super(`The package "${pkgName}" is required. Make sure it is installed.`, pkgName);
    }
}
;
}),
"[project]/packages/better-auth/dist/shared/better-auth.VTXNLFMT.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "a": ()=>getBaseURL,
    "b": ()=>getHost,
    "c": ()=>getProtocol,
    "g": ()=>getOrigin
});
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$8zoxzg$2d$F$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.8zoxzg-F.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DdzSJf$2d$n$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.DdzSJf-n.mjs [app-ssr] (ecmascript)");
;
;
function checkHasPath(url) {
    try {
        const parsedUrl = new URL(url);
        return parsedUrl.pathname !== "/";
    } catch (error) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DdzSJf$2d$n$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["B"](`Invalid base URL: ${url}. Please provide a valid base URL.`);
    }
}
function withPath(url, path = "/api/auth") {
    const hasPath = checkHasPath(url);
    if (hasPath) {
        return url;
    }
    path = path.startsWith("/") ? path : `/${path}`;
    return `${url.replace(/\/+$/, "")}${path}`;
}
function getBaseURL(url, path, request) {
    if (url) {
        return withPath(url, path);
    }
    const fromEnv = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$8zoxzg$2d$F$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["e"].BETTER_AUTH_URL || __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$8zoxzg$2d$F$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["e"].NEXT_PUBLIC_BETTER_AUTH_URL || __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$8zoxzg$2d$F$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["e"].PUBLIC_BETTER_AUTH_URL || __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$8zoxzg$2d$F$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["e"].NUXT_PUBLIC_BETTER_AUTH_URL || __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$8zoxzg$2d$F$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["e"].NUXT_PUBLIC_AUTH_URL || (__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$8zoxzg$2d$F$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["e"].BASE_URL !== "/" ? __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$8zoxzg$2d$F$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["e"].BASE_URL : void 0);
    if (fromEnv) {
        return withPath(fromEnv, path);
    }
    const fromRequest = request?.headers.get("x-forwarded-host");
    const fromRequestProto = request?.headers.get("x-forwarded-proto");
    if (fromRequest && fromRequestProto) {
        return withPath(`${fromRequestProto}://${fromRequest}`, path);
    }
    if (request) {
        const url2 = getOrigin(request.url);
        if (!url2) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DdzSJf$2d$n$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["B"]("Could not get origin from request. Please provide a valid base URL.");
        }
        return withPath(url2, path);
    }
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return void 0;
}
function getOrigin(url) {
    try {
        const parsedUrl = new URL(url);
        return parsedUrl.origin;
    } catch (error) {
        return null;
    }
}
function getProtocol(url) {
    try {
        const parsedUrl = new URL(url);
        return parsedUrl.protocol;
    } catch (error) {
        return null;
    }
}
function getHost(url) {
    try {
        const parsedUrl = new URL(url);
        return parsedUrl.host;
    } catch (error) {
        return url;
    }
}
;
}),
"[project]/packages/better-auth/dist/shared/better-auth.Buni1mmI.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "u": ()=>useAuthQuery
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nanostores$2f$atom$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/nanostores/atom/index.js [app-ssr] (ecmascript)");
;
const isServer = "undefined" === "undefined";
const useAuthQuery = (initializedAtom, path, $fetch, options)=>{
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nanostores$2f$atom$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["atom"])({
        data: null,
        error: null,
        isPending: true,
        isRefetching: false,
        refetch: ()=>{
            return fn();
        }
    });
    const fn = ()=>{
        const opts = typeof options === "function" ? options({
            data: value.get().data,
            error: value.get().error,
            isPending: value.get().isPending
        }) : options;
        return $fetch(path, {
            ...opts,
            async onSuccess (context) {
                value.set({
                    data: context.data,
                    error: null,
                    isPending: false,
                    isRefetching: false,
                    refetch: value.value.refetch
                });
                await opts?.onSuccess?.(context);
            },
            async onError (context) {
                const { request } = context;
                const retryAttempts = typeof request.retry === "number" ? request.retry : request.retry?.attempts;
                const retryAttempt = request.retryAttempt || 0;
                if (retryAttempts && retryAttempt < retryAttempts) return;
                value.set({
                    error: context.error,
                    data: null,
                    isPending: false,
                    isRefetching: false,
                    refetch: value.value.refetch
                });
                await opts?.onError?.(context);
            },
            async onRequest (context) {
                const currentValue = value.get();
                value.set({
                    isPending: currentValue.data === null,
                    data: currentValue.data,
                    error: null,
                    isRefetching: true,
                    refetch: value.value.refetch
                });
                await opts?.onRequest?.(context);
            }
        });
    };
    initializedAtom = Array.isArray(initializedAtom) ? initializedAtom : [
        initializedAtom
    ];
    let isMounted = false;
    for (const initAtom of initializedAtom){
        initAtom.subscribe(()=>{
            if ("TURBOPACK compile-time truthy", 1) {
                return;
            }
            //TURBOPACK unreachable
            ;
        });
    }
    return value;
};
;
}),
"[project]/packages/better-auth/dist/shared/better-auth.ffWeg50w.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "p": ()=>parseJSON
});
const PROTO_POLLUTION_PATTERNS = {
    proto: /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/,
    constructor: /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/,
    protoShort: /"__proto__"\s*:/,
    constructorShort: /"constructor"\s*:/
};
const JSON_SIGNATURE = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
const SPECIAL_VALUES = {
    true: true,
    false: false,
    null: null,
    undefined: void 0,
    nan: Number.NaN,
    infinity: Number.POSITIVE_INFINITY,
    "-infinity": Number.NEGATIVE_INFINITY
};
const ISO_DATE_REGEX = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.(\d{1,7}))?(?:Z|([+-])(\d{2}):(\d{2}))$/;
function isValidDate(date) {
    return date instanceof Date && !isNaN(date.getTime());
}
function parseISODate(value) {
    const match = ISO_DATE_REGEX.exec(value);
    if (!match) return null;
    const [, year, month, day, hour, minute, second, ms, offsetSign, offsetHour, offsetMinute] = match;
    let date = new Date(Date.UTC(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10), parseInt(hour, 10), parseInt(minute, 10), parseInt(second, 10), ms ? parseInt(ms.padEnd(3, "0"), 10) : 0));
    if (offsetSign) {
        const offset = (parseInt(offsetHour, 10) * 60 + parseInt(offsetMinute, 10)) * (offsetSign === "+" ? -1 : 1);
        date.setUTCMinutes(date.getUTCMinutes() + offset);
    }
    return isValidDate(date) ? date : null;
}
function betterJSONParse(value, options = {}) {
    const { strict = false, warnings = false, reviver, parseDates = true } = options;
    if (typeof value !== "string") {
        return value;
    }
    const trimmed = value.trim();
    if (trimmed[0] === '"' && trimmed.endsWith('"') && !trimmed.slice(1, -1).includes('"')) {
        return trimmed.slice(1, -1);
    }
    const lowerValue = trimmed.toLowerCase();
    if (lowerValue.length <= 9 && lowerValue in SPECIAL_VALUES) {
        return SPECIAL_VALUES[lowerValue];
    }
    if (!JSON_SIGNATURE.test(trimmed)) {
        if (strict) {
            throw new SyntaxError("[better-json] Invalid JSON");
        }
        return value;
    }
    const hasProtoPattern = Object.entries(PROTO_POLLUTION_PATTERNS).some(([key, pattern])=>{
        const matches = pattern.test(trimmed);
        if (matches && warnings) {
            console.warn(`[better-json] Detected potential prototype pollution attempt using ${key} pattern`);
        }
        return matches;
    });
    if (hasProtoPattern && strict) {
        throw new Error("[better-json] Potential prototype pollution attempt detected");
    }
    try {
        const secureReviver = (key, value2)=>{
            if (key === "__proto__" || key === "constructor" && value2 && typeof value2 === "object" && "prototype" in value2) {
                if (warnings) {
                    console.warn(`[better-json] Dropping "${key}" key to prevent prototype pollution`);
                }
                return void 0;
            }
            if (parseDates && typeof value2 === "string") {
                const date = parseISODate(value2);
                if (date) {
                    return date;
                }
            }
            return reviver ? reviver(key, value2) : value2;
        };
        return JSON.parse(trimmed, secureReviver);
    } catch (error) {
        if (strict) {
            throw error;
        }
        return value;
    }
}
function parseJSON(value, options = {
    strict: true
}) {
    return betterJSONParse(value, options);
}
;
}),
"[project]/packages/better-auth/dist/shared/better-auth.A_Crzln-.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "c": ()=>createDynamicPathProxy,
    "g": ()=>getClientConfig
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-fetch/fetch/dist/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$VTXNLFMT$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.VTXNLFMT.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nanostores$2f$atom$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/nanostores/atom/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$Buni1mmI$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.Buni1mmI.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$ffWeg50w$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.ffWeg50w.mjs [app-ssr] (ecmascript)");
;
;
;
;
;
const redirectPlugin = {
    id: "redirect",
    name: "Redirect",
    hooks: {
        onSuccess (context) {
            if (context.data?.url && context.data?.redirect) {
                if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
                ;
            }
        }
    }
};
function getSessionAtom($fetch) {
    const $signal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nanostores$2f$atom$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["atom"])(false);
    const session = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$Buni1mmI$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["u"])($signal, "/get-session", $fetch, {
        method: "GET"
    });
    return {
        session,
        $sessionSignal: $signal
    };
}
const getClientConfig = (options)=>{
    const isCredentialsSupported = "credentials" in Request.prototype;
    const baseURL = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$VTXNLFMT$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["a"])(options?.baseURL, options?.basePath);
    const pluginsFetchPlugins = options?.plugins?.flatMap((plugin)=>plugin.fetchPlugins).filter((pl)=>pl !== void 0) || [];
    const lifeCyclePlugin = {
        id: "lifecycle-hooks",
        name: "lifecycle-hooks",
        hooks: {
            onSuccess: options?.fetchOptions?.onSuccess,
            onError: options?.fetchOptions?.onError,
            onRequest: options?.fetchOptions?.onRequest,
            onResponse: options?.fetchOptions?.onResponse
        }
    };
    const { onSuccess, onError, onRequest, onResponse, ...restOfFetchOptions } = options?.fetchOptions || {};
    const $fetch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createFetch"])({
        baseURL,
        ...isCredentialsSupported ? {
            credentials: "include"
        } : {},
        method: "GET",
        jsonParser (text) {
            if (!text) {
                return null;
            }
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$ffWeg50w$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["p"])(text, {
                strict: false
            });
        },
        customFetchImpl: async (input, init)=>{
            try {
                return await fetch(input, init);
            } catch (error) {
                return Response.error();
            }
        },
        ...restOfFetchOptions,
        plugins: [
            lifeCyclePlugin,
            ...restOfFetchOptions.plugins || [],
            ...options?.disableDefaultFetchPlugins ? [] : [
                redirectPlugin
            ],
            ...pluginsFetchPlugins
        ]
    });
    const { $sessionSignal, session } = getSessionAtom($fetch);
    const plugins = options?.plugins || [];
    let pluginsActions = {};
    let pluginsAtoms = {
        $sessionSignal,
        session
    };
    let pluginPathMethods = {
        "/sign-out": "POST",
        "/revoke-sessions": "POST",
        "/revoke-other-sessions": "POST",
        "/delete-user": "POST"
    };
    const atomListeners = [
        {
            signal: "$sessionSignal",
            matcher (path) {
                return path === "/sign-out" || path === "/update-user" || path.startsWith("/sign-in") || path.startsWith("/sign-up") || path === "/delete-user" || path === "/verify-email";
            }
        }
    ];
    for (const plugin of plugins){
        if (plugin.getAtoms) {
            Object.assign(pluginsAtoms, plugin.getAtoms?.($fetch));
        }
        if (plugin.pathMethods) {
            Object.assign(pluginPathMethods, plugin.pathMethods);
        }
        if (plugin.atomListeners) {
            atomListeners.push(...plugin.atomListeners);
        }
    }
    const $store = {
        notify: (signal)=>{
            pluginsAtoms[signal].set(!pluginsAtoms[signal].get());
        },
        listen: (signal, listener)=>{
            pluginsAtoms[signal].subscribe(listener);
        },
        atoms: pluginsAtoms
    };
    for (const plugin of plugins){
        if (plugin.getActions) {
            Object.assign(pluginsActions, plugin.getActions?.($fetch, $store, options));
        }
    }
    return {
        pluginsActions,
        pluginsAtoms,
        pluginPathMethods,
        atomListeners,
        $fetch,
        $store
    };
};
function getMethod(path, knownPathMethods, args) {
    const method = knownPathMethods[path];
    const { fetchOptions, query, ...body } = args || {};
    if (method) {
        return method;
    }
    if (fetchOptions?.method) {
        return fetchOptions.method;
    }
    if (body && Object.keys(body).length > 0) {
        return "POST";
    }
    return "GET";
}
function createDynamicPathProxy(routes, client, knownPathMethods, atoms, atomListeners) {
    function createProxy(path = []) {
        return new Proxy(function() {}, {
            get (target, prop) {
                const fullPath = [
                    ...path,
                    prop
                ];
                let current = routes;
                for (const segment of fullPath){
                    if (current && typeof current === "object" && segment in current) {
                        current = current[segment];
                    } else {
                        current = void 0;
                        break;
                    }
                }
                if (typeof current === "function") {
                    return current;
                }
                return createProxy(fullPath);
            },
            apply: async (_, __, args)=>{
                const routePath = "/" + path.map((segment)=>segment.replace(/[A-Z]/g, (letter)=>`-${letter.toLowerCase()}`)).join("/");
                const arg = args[0] || {};
                const fetchOptions = args[1] || {};
                const { query, fetchOptions: argFetchOptions, ...body } = arg;
                const options = {
                    ...fetchOptions,
                    ...argFetchOptions
                };
                const method = getMethod(routePath, knownPathMethods, arg);
                return await client(routePath, {
                    ...options,
                    body: method === "GET" ? void 0 : {
                        ...body,
                        ...options?.body || {}
                    },
                    query: query || options?.query,
                    method,
                    async onSuccess (context) {
                        await options?.onSuccess?.(context);
                        const matches = atomListeners?.find((s)=>s.matcher(routePath));
                        if (!matches) return;
                        const signal = atoms[matches.signal];
                        if (!signal) return;
                        const val = signal.get();
                        setTimeout(()=>{
                            signal.set(!val);
                        }, 10);
                    }
                });
            }
        });
    }
    return createProxy();
}
;
}),
"[project]/packages/better-auth/dist/shared/better-auth.D-2CmEwz.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "c": ()=>capitalizeFirstLetter
});
function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
;
}),
"[project]/packages/better-auth/dist/shared/better-auth.Dxl6OMy2.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "c": ()=>createAuthClient
});
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$A_Crzln$2d2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.A_Crzln-.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D$2d$2CmEwz$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.D-2CmEwz.mjs [app-ssr] (ecmascript)");
;
;
function createAuthClient(options) {
    const { pluginPathMethods, pluginsActions, pluginsAtoms, $fetch, atomListeners, $store } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$A_Crzln$2d2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["g"])(options);
    let resolvedHooks = {};
    for (const [key, value] of Object.entries(pluginsAtoms)){
        resolvedHooks[`use${(0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D$2d$2CmEwz$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["c"])(key)}`] = value;
    }
    const routes = {
        ...pluginsActions,
        ...resolvedHooks,
        $fetch,
        $store
    };
    const proxy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$A_Crzln$2d2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["c"])(routes, $fetch, pluginPathMethods, pluginsAtoms, atomListeners);
    return proxy;
}
;
}),
"[project]/packages/better-auth/dist/client/index.mjs [app-ssr] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "InferAuth": ()=>InferAuth,
    "InferPlugin": ()=>InferPlugin
});
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$Dxl6OMy2$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.Dxl6OMy2.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$Buni1mmI$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.Buni1mmI.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$A_Crzln$2d2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.A_Crzln-.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-fetch/fetch/dist/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$VTXNLFMT$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.VTXNLFMT.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$8zoxzg$2d$F$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.8zoxzg-F.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DdzSJf$2d$n$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.DdzSJf-n.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$ffWeg50w$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.ffWeg50w.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D$2d$2CmEwz$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.D-2CmEwz.mjs [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
const InferPlugin = ()=>{
    return {
        id: "infer-server-plugin",
        $InferServerPlugin: {}
    };
};
function InferAuth() {
    return {};
}
;
}),
"[project]/packages/better-auth/dist/client/index.mjs [app-ssr] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$Dxl6OMy2$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.Dxl6OMy2.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$Buni1mmI$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.Buni1mmI.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$A_Crzln$2d2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.A_Crzln-.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-fetch/fetch/dist/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$VTXNLFMT$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.VTXNLFMT.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$8zoxzg$2d$F$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.8zoxzg-F.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DdzSJf$2d$n$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.DdzSJf-n.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$ffWeg50w$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.ffWeg50w.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D$2d$2CmEwz$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.D-2CmEwz.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$client$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/client/index.mjs [app-ssr] (ecmascript) <locals>");
}),
"[project]/packages/better-auth/dist/shared/better-auth.Dxl6OMy2.mjs [app-ssr] (ecmascript) <export c as createAuthClient>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "createAuthClient": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$Dxl6OMy2$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["c"]
});
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$Dxl6OMy2$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.Dxl6OMy2.mjs [app-ssr] (ecmascript)");
}),
"[project]/packages/sso/dist/client.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "ssoClient": ()=>ssoClient
});
const ssoClient = ()=>{
    return {
        id: "sso-client",
        $InferServerPlugin: {}
    };
};
;
}),
"[project]/examples/sso-example/lib/auth-client.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "authClient": ()=>authClient
});
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$client$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/client/index.mjs [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$Dxl6OMy2$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__c__as__createAuthClient$3e$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.Dxl6OMy2.mjs [app-ssr] (ecmascript) <export c as createAuthClient>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$sso$2f$dist$2f$client$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/sso/dist/client.mjs [app-ssr] (ecmascript)");
;
;
const authClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$Dxl6OMy2$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__c__as__createAuthClient$3e$__["createAuthClient"])({
    plugins: [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$sso$2f$dist$2f$client$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ssoClient"])()
    ]
});
}),
"[project]/examples/sso-example/app/page.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "default": ()=>SignInPage
});
var __TURBOPACK__imported__module__$5b$project$5d2f$examples$2f$sso$2d$example$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/examples/sso-example/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$examples$2f$sso$2d$example$2f$lib$2f$auth$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/examples/sso-example/lib/auth-client.ts [app-ssr] (ecmascript)");
"use client";
;
;
function SignInPage() {
    const handleSignIn = async ()=>{
        await __TURBOPACK__imported__module__$5b$project$5d2f$examples$2f$sso$2d$example$2f$lib$2f$auth$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authClient"].signIn.sso({
            providerId: "dummy",
            callbackURL: "/"
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$examples$2f$sso$2d$example$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen flex items-center justify-center bg-gray-50",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$examples$2f$sso$2d$example$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-md w-full space-y-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$examples$2f$sso$2d$example$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$examples$2f$sso$2d$example$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "mt-6 text-center text-3xl font-extrabold text-gray-900",
                        children: "Sign in to your account"
                    }, void 0, false, {
                        fileName: "[project]/examples/sso-example/app/page.tsx",
                        lineNumber: 17,
                        columnNumber: 6
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/examples/sso-example/app/page.tsx",
                    lineNumber: 16,
                    columnNumber: 5
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$examples$2f$sso$2d$example$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$examples$2f$sso$2d$example$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleSignIn,
                        className: "group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
                        children: "Sign in with SSO"
                    }, void 0, false, {
                        fileName: "[project]/examples/sso-example/app/page.tsx",
                        lineNumber: 22,
                        columnNumber: 6
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/examples/sso-example/app/page.tsx",
                    lineNumber: 21,
                    columnNumber: 5
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/examples/sso-example/app/page.tsx",
            lineNumber: 15,
            columnNumber: 4
        }, this)
    }, void 0, false, {
        fileName: "[project]/examples/sso-example/app/page.tsx",
        lineNumber: 14,
        columnNumber: 3
    }, this);
}
}),
"[project]/examples/sso-example/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        if ("TURBOPACK compile-time truthy", 1) {
            if ("TURBOPACK compile-time truthy", 1) {
                module.exports = __turbopack_context__.r("[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)");
            } else //TURBOPACK unreachable
            ;
        } else //TURBOPACK unreachable
        ;
    }
} //# sourceMappingURL=module.compiled.js.map
}}),
"[project]/examples/sso-example/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
module.exports = __turbopack_context__.r("[project]/examples/sso-example/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}}),
"[project]/node_modules/@better-fetch/fetch/dist/index.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "BetterFetchError": ()=>BetterFetchError,
    "ValidationError": ()=>ValidationError,
    "applySchemaPlugin": ()=>applySchemaPlugin,
    "betterFetch": ()=>betterFetch,
    "bodyParser": ()=>bodyParser,
    "createFetch": ()=>createFetch,
    "createRetryStrategy": ()=>createRetryStrategy,
    "createSchema": ()=>createSchema,
    "detectContentType": ()=>detectContentType,
    "detectResponseType": ()=>detectResponseType,
    "getBody": ()=>getBody,
    "getFetch": ()=>getFetch,
    "getHeaders": ()=>getHeaders,
    "getMethod": ()=>getMethod,
    "getTimeout": ()=>getTimeout,
    "getURL": ()=>getURL,
    "initializePlugins": ()=>initializePlugins,
    "isFunction": ()=>isFunction,
    "isJSONParsable": ()=>isJSONParsable,
    "isJSONSerializable": ()=>isJSONSerializable,
    "isPayloadMethod": ()=>isPayloadMethod,
    "isRouteMethod": ()=>isRouteMethod,
    "jsonParse": ()=>jsonParse,
    "methods": ()=>methods,
    "parseStandardSchema": ()=>parseStandardSchema
});
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __spreadValues = (a, b)=>{
    for(var prop in b || (b = {}))if (__hasOwnProp.call(b, prop)) __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols) for (var prop of __getOwnPropSymbols(b)){
        if (__propIsEnum.call(b, prop)) __defNormalProp(a, prop, b[prop]);
    }
    return a;
};
var __spreadProps = (a, b)=>__defProps(a, __getOwnPropDescs(b));
// src/error.ts
var BetterFetchError = class extends Error {
    constructor(status, statusText, error){
        super(statusText || status.toString(), {
            cause: error
        });
        this.status = status;
        this.statusText = statusText;
        this.error = error;
    }
};
// src/plugins.ts
var initializePlugins = async (url, options)=>{
    var _a, _b, _c, _d, _e, _f;
    let opts = options || {};
    const hooks = {
        onRequest: [
            options == null ? void 0 : options.onRequest
        ],
        onResponse: [
            options == null ? void 0 : options.onResponse
        ],
        onSuccess: [
            options == null ? void 0 : options.onSuccess
        ],
        onError: [
            options == null ? void 0 : options.onError
        ],
        onRetry: [
            options == null ? void 0 : options.onRetry
        ]
    };
    if (!options || !(options == null ? void 0 : options.plugins)) {
        return {
            url,
            options: opts,
            hooks
        };
    }
    for (const plugin of (options == null ? void 0 : options.plugins) || []){
        if (plugin.init) {
            const pluginRes = await ((_a = plugin.init) == null ? void 0 : _a.call(plugin, url.toString(), options));
            opts = pluginRes.options || opts;
            url = pluginRes.url;
        }
        hooks.onRequest.push((_b = plugin.hooks) == null ? void 0 : _b.onRequest);
        hooks.onResponse.push((_c = plugin.hooks) == null ? void 0 : _c.onResponse);
        hooks.onSuccess.push((_d = plugin.hooks) == null ? void 0 : _d.onSuccess);
        hooks.onError.push((_e = plugin.hooks) == null ? void 0 : _e.onError);
        hooks.onRetry.push((_f = plugin.hooks) == null ? void 0 : _f.onRetry);
    }
    return {
        url,
        options: opts,
        hooks
    };
};
// src/retry.ts
var LinearRetryStrategy = class {
    constructor(options){
        this.options = options;
    }
    shouldAttemptRetry(attempt, response) {
        if (this.options.shouldRetry) {
            return Promise.resolve(attempt < this.options.attempts && this.options.shouldRetry(response));
        }
        return Promise.resolve(attempt < this.options.attempts);
    }
    getDelay() {
        return this.options.delay;
    }
};
var ExponentialRetryStrategy = class {
    constructor(options){
        this.options = options;
    }
    shouldAttemptRetry(attempt, response) {
        if (this.options.shouldRetry) {
            return Promise.resolve(attempt < this.options.attempts && this.options.shouldRetry(response));
        }
        return Promise.resolve(attempt < this.options.attempts);
    }
    getDelay(attempt) {
        const delay = Math.min(this.options.maxDelay, this.options.baseDelay * 2 ** attempt);
        return delay;
    }
};
function createRetryStrategy(options) {
    if (typeof options === "number") {
        return new LinearRetryStrategy({
            type: "linear",
            attempts: options,
            delay: 1e3
        });
    }
    switch(options.type){
        case "linear":
            return new LinearRetryStrategy(options);
        case "exponential":
            return new ExponentialRetryStrategy(options);
        default:
            throw new Error("Invalid retry strategy");
    }
}
// src/auth.ts
var getAuthHeader = async (options)=>{
    const headers = {};
    const getValue = async (value)=>typeof value === "function" ? await value() : value;
    if (options == null ? void 0 : options.auth) {
        if (options.auth.type === "Bearer") {
            const token = await getValue(options.auth.token);
            if (!token) {
                return headers;
            }
            headers["authorization"] = `Bearer ${token}`;
        } else if (options.auth.type === "Basic") {
            const username = getValue(options.auth.username);
            const password = getValue(options.auth.password);
            if (!username || !password) {
                return headers;
            }
            headers["authorization"] = `Basic ${btoa(`${username}:${password}`)}`;
        } else if (options.auth.type === "Custom") {
            const value = getValue(options.auth.value);
            if (!value) {
                return headers;
            }
            headers["authorization"] = `${getValue(options.auth.prefix)} ${value}`;
        }
    }
    return headers;
};
// src/utils.ts
var JSON_RE = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
function detectResponseType(request) {
    const _contentType = request.headers.get("content-type");
    const textTypes = /* @__PURE__ */ new Set([
        "image/svg",
        "application/xml",
        "application/xhtml",
        "application/html"
    ]);
    if (!_contentType) {
        return "json";
    }
    const contentType = _contentType.split(";").shift() || "";
    if (JSON_RE.test(contentType)) {
        return "json";
    }
    if (textTypes.has(contentType) || contentType.startsWith("text/")) {
        return "text";
    }
    return "blob";
}
function isJSONParsable(value) {
    try {
        JSON.parse(value);
        return true;
    } catch (error) {
        return false;
    }
}
function isJSONSerializable(value) {
    if (value === void 0) {
        return false;
    }
    const t = typeof value;
    if (t === "string" || t === "number" || t === "boolean" || t === null) {
        return true;
    }
    if (t !== "object") {
        return false;
    }
    if (Array.isArray(value)) {
        return true;
    }
    if (value.buffer) {
        return false;
    }
    return value.constructor && value.constructor.name === "Object" || typeof value.toJSON === "function";
}
function jsonParse(text) {
    try {
        return JSON.parse(text);
    } catch (error) {
        return text;
    }
}
function isFunction(value) {
    return typeof value === "function";
}
function getFetch(options) {
    if (options == null ? void 0 : options.customFetchImpl) {
        return options.customFetchImpl;
    }
    if (typeof globalThis !== "undefined" && isFunction(globalThis.fetch)) {
        return globalThis.fetch;
    }
    if ("undefined" !== "undefined" && isFunction(window.fetch)) //TURBOPACK unreachable
    ;
    throw new Error("No fetch implementation found");
}
function isPayloadMethod(method) {
    if (!method) {
        return false;
    }
    const payloadMethod = [
        "POST",
        "PUT",
        "PATCH",
        "DELETE"
    ];
    return payloadMethod.includes(method.toUpperCase());
}
function isRouteMethod(method) {
    const routeMethod = [
        "GET",
        "POST",
        "PUT",
        "PATCH",
        "DELETE"
    ];
    if (!method) {
        return false;
    }
    return routeMethod.includes(method.toUpperCase());
}
async function getHeaders(opts) {
    const headers = new Headers(opts == null ? void 0 : opts.headers);
    const authHeader = await getAuthHeader(opts);
    for (const [key, value] of Object.entries(authHeader || {})){
        headers.set(key, value);
    }
    if (!headers.has("content-type")) {
        const t = detectContentType(opts == null ? void 0 : opts.body);
        if (t) {
            headers.set("content-type", t);
        }
    }
    return headers;
}
function getURL(url, options) {
    if (url.startsWith("@")) {
        const m = url.toString().split("@")[1].split("/")[0];
        if (methods.includes(m)) {
            url = url.replace(`@${m}/`, "/");
        }
    }
    let _url;
    try {
        if (url.startsWith("http")) {
            _url = url;
        } else {
            let baseURL = options == null ? void 0 : options.baseURL;
            if (baseURL && !(baseURL == null ? void 0 : baseURL.endsWith("/"))) {
                baseURL = baseURL + "/";
            }
            if (url.startsWith("/")) {
                _url = new URL(url.substring(1), baseURL);
            } else {
                _url = new URL(url, options == null ? void 0 : options.baseURL);
            }
        }
    } catch (e) {
        if (e instanceof TypeError) {
            if (!(options == null ? void 0 : options.baseURL)) {
                throw TypeError(`Invalid URL ${url}. Are you passing in a relative url but not setting the baseURL?`);
            }
            throw TypeError(`Invalid URL ${url}. Please validate that you are passing the correct input.`);
        }
        throw e;
    }
    if (options == null ? void 0 : options.params) {
        if (Array.isArray(options == null ? void 0 : options.params)) {
            const params = (options == null ? void 0 : options.params) ? Array.isArray(options.params) ? `/${options.params.join("/")}` : `/${Object.values(options.params).join("/")}` : "";
            _url = _url.toString().split("/:")[0];
            _url = `${_url.toString()}${params}`;
        } else {
            for (const [key, value] of Object.entries(options == null ? void 0 : options.params)){
                _url = _url.toString().replace(`:${key}`, String(value));
            }
        }
    }
    const __url = new URL(_url);
    const queryParams = options == null ? void 0 : options.query;
    if (queryParams) {
        for (const [key, value] of Object.entries(queryParams)){
            __url.searchParams.append(key, String(value));
        }
    }
    return __url;
}
function detectContentType(body) {
    if (isJSONSerializable(body)) {
        return "application/json";
    }
    return null;
}
function getBody(options) {
    if (!(options == null ? void 0 : options.body)) {
        return null;
    }
    const headers = new Headers(options == null ? void 0 : options.headers);
    if (isJSONSerializable(options.body) && !headers.has("content-type")) {
        for (const [key, value] of Object.entries(options == null ? void 0 : options.body)){
            if (value instanceof Date) {
                options.body[key] = value.toISOString();
            }
        }
        return JSON.stringify(options.body);
    }
    return options.body;
}
function getMethod(url, options) {
    var _a;
    if (options == null ? void 0 : options.method) {
        return options.method.toUpperCase();
    }
    if (url.startsWith("@")) {
        const pMethod = (_a = url.split("@")[1]) == null ? void 0 : _a.split("/")[0];
        if (!methods.includes(pMethod)) {
            return (options == null ? void 0 : options.body) ? "POST" : "GET";
        }
        return pMethod.toUpperCase();
    }
    return (options == null ? void 0 : options.body) ? "POST" : "GET";
}
function getTimeout(options, controller) {
    let abortTimeout;
    if (!(options == null ? void 0 : options.signal) && (options == null ? void 0 : options.timeout)) {
        abortTimeout = setTimeout(()=>controller == null ? void 0 : controller.abort(), options == null ? void 0 : options.timeout);
    }
    return {
        abortTimeout,
        clearTimeout: ()=>{
            if (abortTimeout) {
                clearTimeout(abortTimeout);
            }
        }
    };
}
function bodyParser(data, responseType) {
    if (responseType === "json") {
        return JSON.parse(data);
    }
    return data;
}
var ValidationError = class _ValidationError extends Error {
    constructor(issues, message){
        super(message || JSON.stringify(issues, null, 2));
        this.issues = issues;
        Object.setPrototypeOf(this, _ValidationError.prototype);
    }
};
async function parseStandardSchema(schema, input) {
    let result = await schema["~standard"].validate(input);
    if (result.issues) {
        throw new ValidationError(result.issues);
    }
    return result.value;
}
// src/create-fetch/schema.ts
var methods = [
    "get",
    "post",
    "put",
    "patch",
    "delete"
];
var createSchema = (schema, config)=>{
    return {
        schema,
        config
    };
};
// src/create-fetch/index.ts
var applySchemaPlugin = (config)=>({
        id: "apply-schema",
        name: "Apply Schema",
        version: "1.0.0",
        async init (url, options) {
            var _a, _b, _c, _d;
            const schema = ((_b = (_a = config.plugins) == null ? void 0 : _a.find((plugin)=>{
                var _a2;
                return ((_a2 = plugin.schema) == null ? void 0 : _a2.config) ? url.startsWith(plugin.schema.config.baseURL || "") || url.startsWith(plugin.schema.config.prefix || "") : false;
            })) == null ? void 0 : _b.schema) || config.schema;
            if (schema) {
                let urlKey = url;
                if ((_c = schema.config) == null ? void 0 : _c.prefix) {
                    if (urlKey.startsWith(schema.config.prefix)) {
                        urlKey = urlKey.replace(schema.config.prefix, "");
                        if (schema.config.baseURL) {
                            url = url.replace(schema.config.prefix, schema.config.baseURL);
                        }
                    }
                }
                if ((_d = schema.config) == null ? void 0 : _d.baseURL) {
                    if (urlKey.startsWith(schema.config.baseURL)) {
                        urlKey = urlKey.replace(schema.config.baseURL, "");
                    }
                }
                const keySchema = schema.schema[urlKey];
                if (keySchema) {
                    let opts = __spreadProps(__spreadValues({}, options), {
                        method: keySchema.method,
                        output: keySchema.output
                    });
                    if (!(options == null ? void 0 : options.disableValidation)) {
                        opts = __spreadProps(__spreadValues({}, opts), {
                            body: keySchema.input ? await parseStandardSchema(keySchema.input, options == null ? void 0 : options.body) : options == null ? void 0 : options.body,
                            params: keySchema.params ? await parseStandardSchema(keySchema.params, options == null ? void 0 : options.params) : options == null ? void 0 : options.params,
                            query: keySchema.query ? await parseStandardSchema(keySchema.query, options == null ? void 0 : options.query) : options == null ? void 0 : options.query
                        });
                    }
                    return {
                        url,
                        options: opts
                    };
                }
            }
            return {
                url,
                options
            };
        }
    });
var createFetch = (config)=>{
    async function $fetch(url, options) {
        const opts = __spreadProps(__spreadValues(__spreadValues({}, config), options), {
            plugins: [
                ...(config == null ? void 0 : config.plugins) || [],
                applySchemaPlugin(config || {})
            ]
        });
        if (config == null ? void 0 : config.catchAllError) {
            try {
                return await betterFetch(url, opts);
            } catch (error) {
                return {
                    data: null,
                    error: {
                        status: 500,
                        statusText: "Fetch Error",
                        message: "Fetch related error. Captured by catchAllError option. See error property for more details.",
                        error
                    }
                };
            }
        }
        return await betterFetch(url, opts);
    }
    return $fetch;
};
// src/url.ts
function getURL2(url, option) {
    let { baseURL, params, query } = option || {
        query: {},
        params: {},
        baseURL: ""
    };
    let basePath = url.startsWith("http") ? url.split("/").slice(0, 3).join("/") : baseURL || "";
    if (url.startsWith("@")) {
        const m = url.toString().split("@")[1].split("/")[0];
        if (methods.includes(m)) {
            url = url.replace(`@${m}/`, "/");
        }
    }
    if (!basePath.endsWith("/")) basePath += "/";
    let [path, urlQuery] = url.replace(basePath, "").split("?");
    const queryParams = new URLSearchParams(urlQuery);
    for (const [key, value] of Object.entries(query || {})){
        if (value == null) continue;
        queryParams.set(key, String(value));
    }
    if (params) {
        if (Array.isArray(params)) {
            const paramPaths = path.split("/").filter((p)=>p.startsWith(":"));
            for (const [index, key] of paramPaths.entries()){
                const value = params[index];
                path = path.replace(key, value);
            }
        } else {
            for (const [key, value] of Object.entries(params)){
                path = path.replace(`:${key}`, String(value));
            }
        }
    }
    path = path.split("/").map(encodeURIComponent).join("/");
    if (path.startsWith("/")) path = path.slice(1);
    let queryParamString = queryParams.toString();
    queryParamString = queryParamString.length > 0 ? `?${queryParamString}`.replace(/\+/g, "%20") : "";
    if (!basePath.startsWith("http")) {
        return `${basePath}${path}${queryParamString}`;
    }
    const _url = new URL(`${path}${queryParamString}`, basePath);
    return _url;
}
// src/fetch.ts
var betterFetch = async (url, options)=>{
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const { hooks, url: __url, options: opts } = await initializePlugins(url, options);
    const fetch = getFetch(opts);
    const controller = new AbortController();
    const signal = (_a = opts.signal) != null ? _a : controller.signal;
    const _url = getURL2(__url, opts);
    const body = getBody(opts);
    const headers = await getHeaders(opts);
    const method = getMethod(__url, opts);
    let context = __spreadProps(__spreadValues({}, opts), {
        url: _url,
        headers,
        body,
        method,
        signal
    });
    for (const onRequest of hooks.onRequest){
        if (onRequest) {
            const res = await onRequest(context);
            if (res instanceof Object) {
                context = res;
            }
        }
    }
    if ("pipeTo" in context && typeof context.pipeTo === "function" || typeof ((_b = options == null ? void 0 : options.body) == null ? void 0 : _b.pipe) === "function") {
        if (!("duplex" in context)) {
            context.duplex = "half";
        }
    }
    const { clearTimeout: clearTimeout2 } = getTimeout(opts, controller);
    let response = await fetch(context.url, context);
    clearTimeout2();
    const responseContext = {
        response,
        request: context
    };
    for (const onResponse of hooks.onResponse){
        if (onResponse) {
            const r = await onResponse(__spreadProps(__spreadValues({}, responseContext), {
                response: ((_c = options == null ? void 0 : options.hookOptions) == null ? void 0 : _c.cloneResponse) ? response.clone() : response
            }));
            if (r instanceof Response) {
                response = r;
            } else if (r instanceof Object) {
                response = r.response;
            }
        }
    }
    if (response.ok) {
        const hasBody = context.method !== "HEAD";
        if (!hasBody) {
            return {
                data: "",
                error: null
            };
        }
        const responseType = detectResponseType(response);
        const successContext = {
            data: "",
            response,
            request: context
        };
        if (responseType === "json" || responseType === "text") {
            const text = await response.text();
            const parser2 = (_d = context.jsonParser) != null ? _d : jsonParse;
            const data = await parser2(text);
            successContext.data = data;
        } else {
            successContext.data = await response[responseType]();
        }
        if (context == null ? void 0 : context.output) {
            if (context.output && !context.disableValidation) {
                successContext.data = await parseStandardSchema(context.output, successContext.data);
            }
        }
        for (const onSuccess of hooks.onSuccess){
            if (onSuccess) {
                await onSuccess(__spreadProps(__spreadValues({}, successContext), {
                    response: ((_e = options == null ? void 0 : options.hookOptions) == null ? void 0 : _e.cloneResponse) ? response.clone() : response
                }));
            }
        }
        if (options == null ? void 0 : options.throw) {
            return successContext.data;
        }
        return {
            data: successContext.data,
            error: null
        };
    }
    const parser = (_f = options == null ? void 0 : options.jsonParser) != null ? _f : jsonParse;
    const responseText = await response.text();
    const isJSONResponse = isJSONParsable(responseText);
    const errorObject = isJSONResponse ? await parser(responseText) : null;
    const errorContext = {
        response,
        responseText,
        request: context,
        error: __spreadProps(__spreadValues({}, errorObject), {
            status: response.status,
            statusText: response.statusText
        })
    };
    for (const onError of hooks.onError){
        if (onError) {
            await onError(__spreadProps(__spreadValues({}, errorContext), {
                response: ((_g = options == null ? void 0 : options.hookOptions) == null ? void 0 : _g.cloneResponse) ? response.clone() : response
            }));
        }
    }
    if (options == null ? void 0 : options.retry) {
        const retryStrategy = createRetryStrategy(options.retry);
        const _retryAttempt = (_h = options.retryAttempt) != null ? _h : 0;
        if (await retryStrategy.shouldAttemptRetry(_retryAttempt, response)) {
            for (const onRetry of hooks.onRetry){
                if (onRetry) {
                    await onRetry(responseContext);
                }
            }
            const delay = retryStrategy.getDelay(_retryAttempt);
            await new Promise((resolve)=>setTimeout(resolve, delay));
            return await betterFetch(url, __spreadProps(__spreadValues({}, options), {
                retryAttempt: _retryAttempt + 1
            }));
        }
    }
    if (options == null ? void 0 : options.throw) {
        throw new BetterFetchError(response.status, response.statusText, isJSONResponse ? errorObject : responseText);
    }
    return {
        data: null,
        error: __spreadProps(__spreadValues({}, errorObject), {
            status: response.status,
            statusText: response.statusText
        })
    };
};
;
 //# sourceMappingURL=index.js.map
}),
"[project]/node_modules/nanostores/task/index.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "allTasks": ()=>allTasks,
    "cleanTasks": ()=>cleanTasks,
    "startTask": ()=>startTask,
    "task": ()=>task
});
let tasks = 0;
let resolves = [];
function startTask() {
    tasks += 1;
    return ()=>{
        tasks -= 1;
        if (tasks === 0) {
            let prevResolves = resolves;
            resolves = [];
            for (let i of prevResolves)i();
        }
    };
}
function task(cb) {
    let endTask = startTask();
    let promise = cb().finally(endTask);
    promise.t = true;
    return promise;
}
function allTasks() {
    if (tasks === 0) {
        return Promise.resolve();
    } else {
        return new Promise((resolve)=>{
            resolves.push(resolve);
        });
    }
}
function cleanTasks() {
    tasks = 0;
}
}),
"[project]/node_modules/nanostores/clean-stores/index.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "clean": ()=>clean,
    "cleanStores": ()=>cleanStores
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nanostores$2f$task$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/nanostores/task/index.js [app-ssr] (ecmascript)");
;
let clean = Symbol('clean');
let cleanStores = (...stores)=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nanostores$2f$task$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cleanTasks"])();
    for (let $store of stores){
        if ($store) {
            if ($store.mocked) delete $store.mocked;
            if ($store[clean]) $store[clean]();
        }
    }
};
}),
"[project]/node_modules/nanostores/atom/index.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "atom": ()=>atom,
    "epoch": ()=>epoch
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nanostores$2f$clean$2d$stores$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/nanostores/clean-stores/index.js [app-ssr] (ecmascript)");
;
let listenerQueue = [];
let lqIndex = 0;
const QUEUE_ITEMS_PER_LISTENER = 4;
let epoch = 0;
let atom = (initialValue)=>{
    let listeners = [];
    let $atom = {
        get () {
            if (!$atom.lc) {
                $atom.listen(()=>{})();
            }
            return $atom.value;
        },
        lc: 0,
        listen (listener) {
            $atom.lc = listeners.push(listener);
            return ()=>{
                for(let i = lqIndex + QUEUE_ITEMS_PER_LISTENER; i < listenerQueue.length;){
                    if (listenerQueue[i] === listener) {
                        listenerQueue.splice(i, QUEUE_ITEMS_PER_LISTENER);
                    } else {
                        i += QUEUE_ITEMS_PER_LISTENER;
                    }
                }
                let index = listeners.indexOf(listener);
                if (~index) {
                    listeners.splice(index, 1);
                    if (!--$atom.lc) $atom.off();
                }
            };
        },
        notify (oldValue, changedKey) {
            epoch++;
            let runListenerQueue = !listenerQueue.length;
            for (let listener of listeners){
                listenerQueue.push(listener, $atom.value, oldValue, changedKey);
            }
            if (runListenerQueue) {
                for(lqIndex = 0; lqIndex < listenerQueue.length; lqIndex += QUEUE_ITEMS_PER_LISTENER){
                    listenerQueue[lqIndex](listenerQueue[lqIndex + 1], listenerQueue[lqIndex + 2], listenerQueue[lqIndex + 3]);
                }
                listenerQueue.length = 0;
            }
        },
        /* It will be called on last listener unsubscribing.
       We will redefine it in onMount and onStop. */ off () {},
        set (newValue) {
            let oldValue = $atom.value;
            if (oldValue !== newValue) {
                $atom.value = newValue;
                $atom.notify(oldValue);
            }
        },
        subscribe (listener) {
            let unbind = $atom.listen(listener);
            listener($atom.value);
            return unbind;
        },
        value: initialValue
    };
    if ("TURBOPACK compile-time truthy", 1) {
        $atom[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$nanostores$2f$clean$2d$stores$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clean"]] = ()=>{
            listeners = [];
            $atom.lc = 0;
            $atom.off();
        };
    }
    return $atom;
};
}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__fb86e890._.js.map