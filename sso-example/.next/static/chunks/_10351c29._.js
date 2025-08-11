(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/node_modules/uncrypto/dist/crypto.web.mjs [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "default": ()=>_crypto,
    "getRandomValues": ()=>getRandomValues,
    "randomUUID": ()=>randomUUID,
    "subtle": ()=>subtle
});
const webCrypto = globalThis.crypto;
const subtle = webCrypto.subtle;
const randomUUID = ()=>{
    return webCrypto.randomUUID();
};
const getRandomValues = (array)=>{
    return webCrypto.getRandomValues(array);
};
const _crypto = {
    randomUUID,
    getRandomValues,
    subtle
};
;
}),
"[project]/node_modules/rou3/dist/index.mjs [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "addRoute": ()=>addRoute,
    "createRouter": ()=>createRouter,
    "findAllRoutes": ()=>findAllRoutes,
    "findRoute": ()=>findRoute,
    "removeRoute": ()=>removeRoute
});
const EmptyObject = /* @__PURE__ */ (()=>{
    const C = function() {};
    C.prototype = /* @__PURE__ */ Object.create(null);
    return C;
})();
function createRouter() {
    const ctx = {
        root: {
            key: ""
        },
        static: new EmptyObject()
    };
    return ctx;
}
function splitPath(path) {
    return path.split("/").filter(Boolean);
}
function getMatchParams(segments, paramsMap) {
    const params = new EmptyObject();
    for (const [index, name] of paramsMap){
        const segment = index < 0 ? segments.slice(-1 * index).join("/") : segments[index];
        if (typeof name === "string") {
            params[name] = segment;
        } else {
            const match = segment.match(name);
            if (match) {
                for(const key in match.groups){
                    params[key] = match.groups[key];
                }
            }
        }
    }
    return params;
}
function addRoute(ctx) {
    let method = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "", path = arguments.length > 2 ? arguments[2] : void 0, data = arguments.length > 3 ? arguments[3] : void 0;
    const segments = splitPath(path);
    let node = ctx.root;
    let _unnamedParamIndex = 0;
    const paramsMap = [];
    for(let i = 0; i < segments.length; i++){
        var _node_static;
        const segment = segments[i];
        if (segment.startsWith("**")) {
            if (!node.wildcard) {
                node.wildcard = {
                    key: "**"
                };
            }
            node = node.wildcard;
            paramsMap.push([
                -i,
                segment.split(":")[1] || "_",
                segment.length === 2
            ]);
            break;
        }
        if (segment === "*" || segment.includes(":")) {
            if (!node.param) {
                node.param = {
                    key: "*"
                };
            }
            node = node.param;
            const isOptional = segment === "*";
            paramsMap.push([
                i,
                isOptional ? "_".concat(_unnamedParamIndex++) : _getParamMatcher(segment),
                isOptional
            ]);
            continue;
        }
        const child = (_node_static = node.static) === null || _node_static === void 0 ? void 0 : _node_static[segment];
        if (child) {
            node = child;
        } else {
            const staticNode = {
                key: segment
            };
            if (!node.static) {
                node.static = new EmptyObject();
            }
            node.static[segment] = staticNode;
            node = staticNode;
        }
    }
    const hasParams = paramsMap.length > 0;
    if (!node.methods) {
        node.methods = new EmptyObject();
    }
    if (!node.methods[method]) {
        node.methods[method] = [];
    }
    node.methods[method].push({
        data: data || null,
        paramsMap: hasParams ? paramsMap : void 0
    });
    if (!hasParams) {
        ctx.static[path] = node;
    }
}
function _getParamMatcher(segment) {
    if (!segment.includes(":", 1)) {
        return segment.slice(1);
    }
    const regex = segment.replace(/:(\w+)/g, (_, id)=>"(?<".concat(id, ">\\w+)"));
    return new RegExp("^".concat(regex, "$"));
}
function findRoute(ctx) {
    let method = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "", path = arguments.length > 2 ? arguments[2] : void 0, opts = arguments.length > 3 ? arguments[3] : void 0;
    var _lookupTree1;
    if (path[path.length - 1] === "/") {
        path = path.slice(0, -1);
    }
    const staticNode = ctx.static[path];
    if (staticNode && staticNode.methods) {
        const staticMatch = staticNode.methods[method] || staticNode.methods[""];
        if (staticMatch !== void 0) {
            return staticMatch[0];
        }
    }
    const segments = splitPath(path);
    const match = (_lookupTree1 = _lookupTree(ctx, ctx.root, method, segments, 0)) === null || _lookupTree1 === void 0 ? void 0 : _lookupTree1[0];
    if (match === void 0) {
        return;
    }
    if ((opts === null || opts === void 0 ? void 0 : opts.params) === false) {
        return match;
    }
    return {
        data: match.data,
        params: match.paramsMap ? getMatchParams(segments, match.paramsMap) : void 0
    };
}
function _lookupTree(ctx, node, method, segments, index) {
    if (index === segments.length) {
        if (node.methods) {
            const match = node.methods[method] || node.methods[""];
            if (match) {
                return match;
            }
        }
        if (node.param && node.param.methods) {
            const match = node.param.methods[method] || node.param.methods[""];
            if (match) {
                var _pMap_;
                const pMap = match[0].paramsMap;
                if (pMap === null || pMap === void 0 ? void 0 : (_pMap_ = pMap[(pMap === null || pMap === void 0 ? void 0 : pMap.length) - 1]) === null || _pMap_ === void 0 ? void 0 : _pMap_[2]) {
                    return match;
                }
            }
        }
        if (node.wildcard && node.wildcard.methods) {
            const match = node.wildcard.methods[method] || node.wildcard.methods[""];
            if (match) {
                var _pMap_1;
                const pMap = match[0].paramsMap;
                if (pMap === null || pMap === void 0 ? void 0 : (_pMap_1 = pMap[(pMap === null || pMap === void 0 ? void 0 : pMap.length) - 1]) === null || _pMap_1 === void 0 ? void 0 : _pMap_1[2]) {
                    return match;
                }
            }
        }
        return void 0;
    }
    const segment = segments[index];
    if (node.static) {
        const staticChild = node.static[segment];
        if (staticChild) {
            const match = _lookupTree(ctx, staticChild, method, segments, index + 1);
            if (match) {
                return match;
            }
        }
    }
    if (node.param) {
        const match = _lookupTree(ctx, node.param, method, segments, index + 1);
        if (match) {
            return match;
        }
    }
    if (node.wildcard && node.wildcard.methods) {
        return node.wildcard.methods[method] || node.wildcard.methods[""];
    }
    return;
}
function removeRoute(ctx, method, path) {
    const segments = splitPath(path);
    return _remove(ctx.root, method || "", segments, 0);
}
function _remove(node, method, segments, index) {
    var _node_static;
    if (index === segments.length) {
        if (node.methods && method in node.methods) {
            delete node.methods[method];
            if (Object.keys(node.methods).length === 0) {
                node.methods = void 0;
            }
        }
        return;
    }
    const segment = segments[index];
    if (segment === "*") {
        if (node.param) {
            _remove(node.param, method, segments, index + 1);
            if (_isEmptyNode(node.param)) {
                node.param = void 0;
            }
        }
        return;
    }
    if (segment === "**") {
        if (node.wildcard) {
            _remove(node.wildcard, method, segments, index + 1);
            if (_isEmptyNode(node.wildcard)) {
                node.wildcard = void 0;
            }
        }
        return;
    }
    const childNode = (_node_static = node.static) === null || _node_static === void 0 ? void 0 : _node_static[segment];
    if (childNode) {
        _remove(childNode, method, segments, index + 1);
        if (_isEmptyNode(childNode)) {
            delete node.static[segment];
            if (Object.keys(node.static).length === 0) {
                node.static = void 0;
            }
        }
    }
}
function _isEmptyNode(node) {
    return node.methods === void 0 && node.static === void 0 && node.param === void 0 && node.wildcard === void 0;
}
function findAllRoutes(ctx) {
    let method = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "", path = arguments.length > 2 ? arguments[2] : void 0, opts = arguments.length > 3 ? arguments[3] : void 0;
    if (path[path.length - 1] === "/") {
        path = path.slice(0, -1);
    }
    const segments = splitPath(path);
    const matches = _findAll(ctx, ctx.root, method, segments, 0);
    if ((opts === null || opts === void 0 ? void 0 : opts.params) === false) {
        return matches;
    }
    return matches.map((m)=>{
        return {
            data: m.data,
            params: m.paramsMap ? getMatchParams(segments, m.paramsMap) : void 0
        };
    });
}
function _findAll(ctx, node, method, segments, index) {
    let matches = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : [];
    var _node_static;
    const segment = segments[index];
    if (node.wildcard && node.wildcard.methods) {
        const match = node.wildcard.methods[method] || node.wildcard.methods[""];
        if (match) {
            matches.push(...match);
        }
    }
    if (node.param) {
        _findAll(ctx, node.param, method, segments, index + 1, matches);
        if (index === segments.length && node.param.methods) {
            const match = node.param.methods[method] || node.param.methods[""];
            if (match) {
                matches.push(...match);
            }
        }
    }
    const staticChild = (_node_static = node.static) === null || _node_static === void 0 ? void 0 : _node_static[segment];
    if (staticChild) {
        _findAll(ctx, staticChild, method, segments, index + 1, matches);
    }
    if (index === segments.length && node.methods) {
        const match = node.methods[method] || node.methods[""];
        if (match) {
            matches.push(...match);
        }
    }
    return matches;
}
;
}),
"[project]/node_modules/@better-auth/utils/dist/base64.mjs [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "base64": ()=>base64,
    "base64Url": ()=>base64Url
});
function getAlphabet(urlSafe) {
    return urlSafe ? "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_" : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
}
function base64Encode(data, alphabet, padding) {
    let result = "";
    let buffer = 0;
    let shift = 0;
    for (const byte of data){
        buffer = buffer << 8 | byte;
        shift += 8;
        while(shift >= 6){
            shift -= 6;
            result += alphabet[buffer >> shift & 63];
        }
    }
    if (shift > 0) {
        result += alphabet[buffer << 6 - shift & 63];
    }
    if (padding) {
        const padCount = (4 - result.length % 4) % 4;
        result += "=".repeat(padCount);
    }
    return result;
}
function base64Decode(data, alphabet) {
    const decodeMap = /* @__PURE__ */ new Map();
    for(let i = 0; i < alphabet.length; i++){
        decodeMap.set(alphabet[i], i);
    }
    const result = [];
    let buffer = 0;
    let bitsCollected = 0;
    for (const char of data){
        if (char === "=") break;
        const value = decodeMap.get(char);
        if (value === void 0) {
            throw new Error("Invalid Base64 character: ".concat(char));
        }
        buffer = buffer << 6 | value;
        bitsCollected += 6;
        if (bitsCollected >= 8) {
            bitsCollected -= 8;
            result.push(buffer >> bitsCollected & 255);
        }
    }
    return Uint8Array.from(result);
}
const base64 = {
    encode (data) {
        let options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        const alphabet = getAlphabet(false);
        const buffer = typeof data === "string" ? new TextEncoder().encode(data) : new Uint8Array(data);
        var _options_padding;
        return base64Encode(buffer, alphabet, (_options_padding = options.padding) !== null && _options_padding !== void 0 ? _options_padding : true);
    },
    decode (data) {
        if (typeof data !== "string") {
            data = new TextDecoder().decode(data);
        }
        const urlSafe = data.includes("-") || data.includes("_");
        const alphabet = getAlphabet(urlSafe);
        return base64Decode(data, alphabet);
    }
};
const base64Url = {
    encode (data) {
        let options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        const alphabet = getAlphabet(true);
        const buffer = typeof data === "string" ? new TextEncoder().encode(data) : new Uint8Array(data);
        var _options_padding;
        return base64Encode(buffer, alphabet, (_options_padding = options.padding) !== null && _options_padding !== void 0 ? _options_padding : true);
    },
    decode (data) {
        const urlSafe = data.includes("-") || data.includes("_");
        const alphabet = getAlphabet(urlSafe);
        return base64Decode(data, alphabet);
    }
};
;
}),
"[project]/node_modules/@better-auth/utils/dist/hash.mjs [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "createHash": ()=>createHash
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uncrypto$2f$dist$2f$crypto$2e$web$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/uncrypto/dist/crypto.web.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$base64$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/base64.mjs [app-client] (ecmascript)");
;
;
function createHash(algorithm, encoding) {
    return {
        digest: async (input)=>{
            const encoder = new TextEncoder();
            const data = typeof input === "string" ? encoder.encode(input) : input;
            const hashBuffer = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uncrypto$2f$dist$2f$crypto$2e$web$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subtle"].digest(algorithm, data);
            if (encoding === "hex") {
                const hashArray = Array.from(new Uint8Array(hashBuffer));
                const hashHex = hashArray.map((b)=>b.toString(16).padStart(2, "0")).join("");
                return hashHex;
            }
            if (encoding === "base64" || encoding === "base64url" || encoding === "base64urlnopad") {
                if (encoding.includes("url")) {
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$base64$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["base64Url"].encode(hashBuffer, {
                        padding: encoding !== "base64urlnopad"
                    });
                }
                const hashBase64 = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$base64$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["base64"].encode(hashBuffer);
                return hashBase64;
            }
            return hashBuffer;
        }
    };
}
;
}),
"[project]/node_modules/@better-auth/utils/dist/index.mjs [app-client] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({});
;
}),
"[project]/node_modules/@better-auth/utils/dist/index.mjs [app-client] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/index.mjs [app-client] (ecmascript) <locals>");
}),
"[project]/node_modules/@better-auth/utils/dist/hex.mjs [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "hex": ()=>hex
});
const hexadecimal = "0123456789abcdef";
const hex = {
    encode: (data)=>{
        if (typeof data === "string") {
            data = new TextEncoder().encode(data);
        }
        if (data.byteLength === 0) {
            return "";
        }
        const buffer = new Uint8Array(data);
        let result = "";
        for (const byte of buffer){
            result += byte.toString(16).padStart(2, "0");
        }
        return result;
    },
    decode: (data)=>{
        if (!data) {
            return "";
        }
        if (typeof data === "string") {
            if (data.length % 2 !== 0) {
                throw new Error("Invalid hexadecimal string");
            }
            if (!new RegExp("^[".concat(hexadecimal, "]+$")).test(data)) {
                throw new Error("Invalid hexadecimal string");
            }
            const result = new Uint8Array(data.length / 2);
            for(let i = 0; i < data.length; i += 2){
                result[i / 2] = parseInt(data.slice(i, i + 2), 16);
            }
            return new TextDecoder().decode(result);
        }
        return new TextDecoder().decode(data);
    }
};
;
}),
"[project]/node_modules/@better-auth/utils/dist/random.mjs [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "createRandomStringGenerator": ()=>createRandomStringGenerator
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uncrypto$2f$dist$2f$crypto$2e$web$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/uncrypto/dist/crypto.web.mjs [app-client] (ecmascript)");
;
function expandAlphabet(alphabet) {
    switch(alphabet){
        case "a-z":
            return "abcdefghijklmnopqrstuvwxyz";
        case "A-Z":
            return "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        case "0-9":
            return "0123456789";
        case "-_":
            return "-_";
        default:
            throw new Error("Unsupported alphabet: ".concat(alphabet));
    }
}
function createRandomStringGenerator() {
    for(var _len = arguments.length, baseAlphabets = new Array(_len), _key = 0; _key < _len; _key++){
        baseAlphabets[_key] = arguments[_key];
    }
    const baseCharSet = baseAlphabets.map(expandAlphabet).join("");
    if (baseCharSet.length === 0) {
        throw new Error("No valid characters provided for random string generation.");
    }
    const baseCharSetLength = baseCharSet.length;
    return function(length) {
        for(var _len = arguments.length, alphabets = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++){
            alphabets[_key - 1] = arguments[_key];
        }
        if (length <= 0) {
            throw new Error("Length must be a positive integer.");
        }
        let charSet = baseCharSet;
        let charSetLength = baseCharSetLength;
        if (alphabets.length > 0) {
            charSet = alphabets.map(expandAlphabet).join("");
            charSetLength = charSet.length;
        }
        const maxValid = Math.floor(256 / charSetLength) * charSetLength;
        const buf = new Uint8Array(length * 2);
        const bufLength = buf.length;
        let result = "";
        let bufIndex = bufLength;
        let rand;
        while(result.length < length){
            if (bufIndex >= bufLength) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uncrypto$2f$dist$2f$crypto$2e$web$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRandomValues"])(buf);
                bufIndex = 0;
            }
            rand = buf[bufIndex++];
            if (rand < maxValid) {
                result += charSet[rand % charSetLength];
            }
        }
        return result;
    };
}
;
}),
"[project]/node_modules/@better-auth/utils/dist/hmac.mjs [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "createHMAC": ()=>createHMAC
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uncrypto$2f$dist$2f$crypto$2e$web$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/uncrypto/dist/crypto.web.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hex$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/hex.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$base64$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/base64.mjs [app-client] (ecmascript)");
;
;
;
const createHMAC = function() {
    let algorithm = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "SHA-256", encoding = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "none";
    const hmac = {
        importKey: async (key, keyUsage)=>{
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uncrypto$2f$dist$2f$crypto$2e$web$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subtle"].importKey("raw", typeof key === "string" ? new TextEncoder().encode(key) : key, {
                name: "HMAC",
                hash: {
                    name: algorithm
                }
            }, false, [
                keyUsage
            ]);
        },
        sign: async (hmacKey, data)=>{
            if (typeof hmacKey === "string") {
                hmacKey = await hmac.importKey(hmacKey, "sign");
            }
            const signature = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uncrypto$2f$dist$2f$crypto$2e$web$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subtle"].sign("HMAC", hmacKey, typeof data === "string" ? new TextEncoder().encode(data) : data);
            if (encoding === "hex") {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hex$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hex"].encode(signature);
            }
            if (encoding === "base64" || encoding === "base64url" || encoding === "base64urlnopad") {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$base64$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["base64Url"].encode(signature, {
                    padding: encoding !== "base64urlnopad"
                });
            }
            return signature;
        },
        verify: async (hmacKey, data, signature)=>{
            if (typeof hmacKey === "string") {
                hmacKey = await hmac.importKey(hmacKey, "verify");
            }
            if (encoding === "hex") {
                signature = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hex$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hex"].decode(signature);
            }
            if (encoding === "base64" || encoding === "base64url" || encoding === "base64urlnopad") {
                signature = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$base64$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["base64"].decode(signature);
            }
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uncrypto$2f$dist$2f$crypto$2e$web$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subtle"].verify("HMAC", hmacKey, typeof signature === "string" ? new TextEncoder().encode(signature) : signature, typeof data === "string" ? new TextEncoder().encode(data) : data);
        }
    };
    return hmac;
};
;
}),
"[project]/node_modules/@better-auth/utils/dist/binary.mjs [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "binary": ()=>binary
});
const decoders = /* @__PURE__ */ new Map();
const encoder = new TextEncoder();
const binary = {
    decode: function(data) {
        let encoding = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "utf-8";
        if (!decoders.has(encoding)) {
            decoders.set(encoding, new TextDecoder(encoding));
        }
        const decoder = decoders.get(encoding);
        return decoder.decode(data);
    },
    encode: encoder.encode
};
;
}),
"[project]/node_modules/@better-auth/utils/dist/base32.mjs [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "base32": ()=>base32,
    "base32hex": ()=>base32hex
});
function getAlphabet(hex) {
    return hex ? "0123456789ABCDEFGHIJKLMNOPQRSTUV" : "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
}
function createDecodeMap(alphabet) {
    const decodeMap = /* @__PURE__ */ new Map();
    for(let i = 0; i < alphabet.length; i++){
        decodeMap.set(alphabet[i], i);
    }
    return decodeMap;
}
function base32Encode(data, alphabet, padding) {
    let result = "";
    let buffer = 0;
    let shift = 0;
    for (const byte of data){
        buffer = buffer << 8 | byte;
        shift += 8;
        while(shift >= 5){
            shift -= 5;
            result += alphabet[buffer >> shift & 31];
        }
    }
    if (shift > 0) {
        result += alphabet[buffer << 5 - shift & 31];
    }
    if (padding) {
        const padCount = (8 - result.length % 8) % 8;
        result += "=".repeat(padCount);
    }
    return result;
}
function base32Decode(data, alphabet) {
    const decodeMap = createDecodeMap(alphabet);
    const result = [];
    let buffer = 0;
    let bitsCollected = 0;
    for (const char of data){
        if (char === "=") break;
        const value = decodeMap.get(char);
        if (value === void 0) {
            throw new Error("Invalid Base32 character: ".concat(char));
        }
        buffer = buffer << 5 | value;
        bitsCollected += 5;
        while(bitsCollected >= 8){
            bitsCollected -= 8;
            result.push(buffer >> bitsCollected & 255);
        }
    }
    return Uint8Array.from(result);
}
const base32 = {
    /**
   * Encodes data into a Base32 string.
   * @param data - The data to encode (ArrayBuffer, TypedArray, or string).
   * @param options - Encoding options.
   * @returns The Base32 encoded string.
   */ encode (data) {
        let options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        const alphabet = getAlphabet(false);
        const buffer = typeof data === "string" ? new TextEncoder().encode(data) : new Uint8Array(data);
        var _options_padding;
        return base32Encode(buffer, alphabet, (_options_padding = options.padding) !== null && _options_padding !== void 0 ? _options_padding : true);
    },
    /**
   * Decodes a Base32 string into a Uint8Array.
   * @param data - The Base32 encoded string or ArrayBuffer/TypedArray.
   * @returns The decoded Uint8Array.
   */ decode (data) {
        if (typeof data !== "string") {
            data = new TextDecoder().decode(data);
        }
        const alphabet = getAlphabet(false);
        return base32Decode(data, alphabet);
    }
};
const base32hex = {
    /**
   * Encodes data into a Base32hex string.
   * @param data - The data to encode (ArrayBuffer, TypedArray, or string).
   * @param options - Encoding options.
   * @returns The Base32hex encoded string.
   */ encode (data) {
        let options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        const alphabet = getAlphabet(true);
        const buffer = typeof data === "string" ? new TextEncoder().encode(data) : new Uint8Array(data);
        var _options_padding;
        return base32Encode(buffer, alphabet, (_options_padding = options.padding) !== null && _options_padding !== void 0 ? _options_padding : true);
    },
    /**
   * Decodes a Base32hex string into a Uint8Array.
   * @param data - The Base32hex encoded string.
   * @returns The decoded Uint8Array.
   */ decode (data) {
        const alphabet = getAlphabet(true);
        return base32Decode(data, alphabet);
    }
};
;
}),
"[project]/node_modules/@better-auth/utils/dist/otp.mjs [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "createOTP": ()=>createOTP
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$base32$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/base32.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hmac$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/hmac.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hex$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/hex.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$base64$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/base64.mjs [app-client] (ecmascript)");
;
;
;
;
;
const defaultPeriod = 30;
const defaultDigits = 6;
async function generateHOTP(secret, param) {
    let { counter, digits, hash = "SHA-1" } = param;
    const _digits = digits !== null && digits !== void 0 ? digits : defaultDigits;
    if (_digits < 1 || _digits > 8) {
        throw new TypeError("Digits must be between 1 and 8");
    }
    const buffer = new ArrayBuffer(8);
    new DataView(buffer).setBigUint64(0, BigInt(counter), false);
    const bytes = new Uint8Array(buffer);
    const hmacResult = new Uint8Array(await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hmac$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createHMAC"])(hash).sign(secret, bytes));
    const offset = hmacResult[hmacResult.length - 1] & 15;
    const truncated = (hmacResult[offset] & 127) << 24 | (hmacResult[offset + 1] & 255) << 16 | (hmacResult[offset + 2] & 255) << 8 | hmacResult[offset + 3] & 255;
    const otp = truncated % 10 ** _digits;
    return otp.toString().padStart(_digits, "0");
}
async function generateTOTP(secret, options) {
    var _options_digits;
    const digits = (_options_digits = options === null || options === void 0 ? void 0 : options.digits) !== null && _options_digits !== void 0 ? _options_digits : defaultDigits;
    var _options_period;
    const period = (_options_period = options === null || options === void 0 ? void 0 : options.period) !== null && _options_period !== void 0 ? _options_period : defaultPeriod;
    const milliseconds = period * 1e3;
    const counter = Math.floor(Date.now() / milliseconds);
    return await generateHOTP(secret, {
        counter,
        digits,
        hash: options === null || options === void 0 ? void 0 : options.hash
    });
}
async function verifyTOTP(otp, param) {
    let { window = 1, digits = defaultDigits, secret, period = defaultPeriod } = param;
    const milliseconds = period * 1e3;
    const counter = Math.floor(Date.now() / milliseconds);
    for(let i = -window; i <= window; i++){
        const generatedOTP = await generateHOTP(secret, {
            counter: counter + i,
            digits
        });
        if (otp === generatedOTP) {
            return true;
        }
    }
    return false;
}
function generateQRCode(param) {
    let { issuer, account, secret, digits = defaultDigits, period = defaultPeriod } = param;
    const encodedIssuer = encodeURIComponent(issuer);
    const encodedAccountName = encodeURIComponent(account);
    const baseURI = "otpauth://totp/".concat(encodedIssuer, ":").concat(encodedAccountName);
    const params = new URLSearchParams({
        secret: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$base32$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["base32"].encode(secret, {
            padding: false
        }),
        issuer
    });
    if (digits !== void 0) {
        params.set("digits", digits.toString());
    }
    if (period !== void 0) {
        params.set("period", period.toString());
    }
    return "".concat(baseURI, "?").concat(params.toString());
}
const createOTP = (secret, opts)=>{
    var _opts_digits;
    const digits = (_opts_digits = opts === null || opts === void 0 ? void 0 : opts.digits) !== null && _opts_digits !== void 0 ? _opts_digits : defaultDigits;
    var _opts_period;
    const period = (_opts_period = opts === null || opts === void 0 ? void 0 : opts.period) !== null && _opts_period !== void 0 ? _opts_period : defaultPeriod;
    return {
        hotp: (counter)=>generateHOTP(secret, {
                counter,
                digits
            }),
        totp: ()=>generateTOTP(secret, {
                digits,
                period
            }),
        verify: (otp, options)=>verifyTOTP(otp, {
                secret,
                digits,
                period,
                ...options
            }),
        url: (issuer, account)=>generateQRCode({
                issuer,
                account,
                secret,
                digits,
                period
            })
    };
};
;
}),
"[project]/node_modules/@noble/ciphers/esm/_assert.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "bool": ()=>bool,
    "bytes": ()=>bytes,
    "default": ()=>__TURBOPACK__default__export__,
    "exists": ()=>exists,
    "hash": ()=>hash,
    "isBytes": ()=>isBytes,
    "number": ()=>number,
    "output": ()=>output
});
function number(n) {
    if (!Number.isSafeInteger(n) || n < 0) throw new Error("positive integer expected, not ".concat(n));
}
function bool(b) {
    if (typeof b !== 'boolean') throw new Error("boolean expected, not ".concat(b));
}
function isBytes(a) {
    return a instanceof Uint8Array || a != null && typeof a === 'object' && a.constructor.name === 'Uint8Array';
}
function bytes(b) {
    for(var _len = arguments.length, lengths = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++){
        lengths[_key - 1] = arguments[_key];
    }
    if (!isBytes(b)) throw new Error('Uint8Array expected');
    if (lengths.length > 0 && !lengths.includes(b.length)) throw new Error("Uint8Array expected of length ".concat(lengths, ", not of length=").concat(b.length));
}
function hash(hash) {
    if (typeof hash !== 'function' || typeof hash.create !== 'function') throw new Error('hash must be wrapped by utils.wrapConstructor');
    number(hash.outputLen);
    number(hash.blockLen);
}
function exists(instance) {
    let checkFinished = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
    if (instance.destroyed) throw new Error('Hash instance has been destroyed');
    if (checkFinished && instance.finished) throw new Error('Hash#digest() has already been called');
}
function output(out, instance) {
    bytes(out);
    const min = instance.outputLen;
    if (out.length < min) {
        throw new Error("digestInto() expects output buffer of length at least ".concat(min));
    }
}
;
const assert = {
    number,
    bool,
    bytes,
    hash,
    exists,
    output
};
const __TURBOPACK__default__export__ = assert;
 //# sourceMappingURL=_assert.js.map
}),
"[project]/node_modules/@noble/ciphers/esm/utils.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

/*! noble-ciphers - MIT License (c) 2023 Paul Miller (paulmillr.com) */ __turbopack_context__.s({
    "Hash": ()=>Hash,
    "asyncLoop": ()=>asyncLoop,
    "bytesToHex": ()=>bytesToHex,
    "bytesToNumberBE": ()=>bytesToNumberBE,
    "bytesToUtf8": ()=>bytesToUtf8,
    "checkOpts": ()=>checkOpts,
    "clean": ()=>clean,
    "concatBytes": ()=>concatBytes,
    "copyBytes": ()=>copyBytes,
    "createView": ()=>createView,
    "equalBytes": ()=>equalBytes,
    "hexToBytes": ()=>hexToBytes,
    "hexToNumber": ()=>hexToNumber,
    "isAligned32": ()=>isAligned32,
    "isLE": ()=>isLE,
    "nextTick": ()=>nextTick,
    "numberToBytesBE": ()=>numberToBytesBE,
    "setBigUint64": ()=>setBigUint64,
    "toBytes": ()=>toBytes,
    "u16": ()=>u16,
    "u32": ()=>u32,
    "u64Lengths": ()=>u64Lengths,
    "u8": ()=>u8,
    "utf8ToBytes": ()=>utf8ToBytes,
    "wrapCipher": ()=>wrapCipher
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_assert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@noble/ciphers/esm/_assert.js [app-client] (ecmascript)");
;
const u8 = (arr)=>new Uint8Array(arr.buffer, arr.byteOffset, arr.byteLength);
const u16 = (arr)=>new Uint16Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 2));
const u32 = (arr)=>new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
const createView = (arr)=>new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
const isLE = new Uint8Array(new Uint32Array([
    0x11223344
]).buffer)[0] === 0x44;
if (!isLE) throw new Error('Non little-endian hardware is not supported');
// Array where index 0xf0 (240) is mapped to string 'f0'
const hexes = /* @__PURE__ */ Array.from({
    length: 256
}, (_, i)=>i.toString(16).padStart(2, '0'));
function bytesToHex(bytes) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_assert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bytes"])(bytes);
    // pre-caching improves the speed 6x
    let hex = '';
    for(let i = 0; i < bytes.length; i++){
        hex += hexes[bytes[i]];
    }
    return hex;
}
// We use optimized technique to convert hex string to byte array
const asciis = {
    _0: 48,
    _9: 57,
    _A: 65,
    _F: 70,
    _a: 97,
    _f: 102
};
function asciiToBase16(char) {
    if (char >= asciis._0 && char <= asciis._9) return char - asciis._0;
    if (char >= asciis._A && char <= asciis._F) return char - (asciis._A - 10);
    if (char >= asciis._a && char <= asciis._f) return char - (asciis._a - 10);
    return;
}
function hexToBytes(hex) {
    if (typeof hex !== 'string') throw new Error('hex string expected, got ' + typeof hex);
    const hl = hex.length;
    const al = hl / 2;
    if (hl % 2) throw new Error('padded hex string expected, got unpadded hex of length ' + hl);
    const array = new Uint8Array(al);
    for(let ai = 0, hi = 0; ai < al; ai++, hi += 2){
        const n1 = asciiToBase16(hex.charCodeAt(hi));
        const n2 = asciiToBase16(hex.charCodeAt(hi + 1));
        if (n1 === undefined || n2 === undefined) {
            const char = hex[hi] + hex[hi + 1];
            throw new Error('hex string expected, got non-hex character "' + char + '" at index ' + hi);
        }
        array[ai] = n1 * 16 + n2;
    }
    return array;
}
function hexToNumber(hex) {
    if (typeof hex !== 'string') throw new Error('hex string expected, got ' + typeof hex);
    // Big Endian
    return BigInt(hex === '' ? '0' : "0x".concat(hex));
}
function bytesToNumberBE(bytes) {
    return hexToNumber(bytesToHex(bytes));
}
function numberToBytesBE(n, len) {
    return hexToBytes(n.toString(16).padStart(len * 2, '0'));
}
const nextTick = async ()=>{};
async function asyncLoop(iters, tick, cb) {
    let ts = Date.now();
    for(let i = 0; i < iters; i++){
        cb(i);
        // Date.now() is not monotonic, so in case if clock goes backwards we return return control too
        const diff = Date.now() - ts;
        if (diff >= 0 && diff < tick) continue;
        await nextTick();
        ts += diff;
    }
}
function utf8ToBytes(str) {
    if (typeof str !== 'string') throw new Error("string expected, got ".concat(typeof str));
    return new Uint8Array(new TextEncoder().encode(str)); // https://bugzil.la/1681809
}
function bytesToUtf8(bytes) {
    return new TextDecoder().decode(bytes);
}
function toBytes(data) {
    if (typeof data === 'string') data = utf8ToBytes(data);
    else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_assert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isBytes"])(data)) data = copyBytes(data);
    else throw new Error("Uint8Array expected, got ".concat(typeof data));
    return data;
}
function concatBytes() {
    for(var _len = arguments.length, arrays = new Array(_len), _key = 0; _key < _len; _key++){
        arrays[_key] = arguments[_key];
    }
    let sum = 0;
    for(let i = 0; i < arrays.length; i++){
        const a = arrays[i];
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_assert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bytes"])(a);
        sum += a.length;
    }
    const res = new Uint8Array(sum);
    for(let i = 0, pad = 0; i < arrays.length; i++){
        const a = arrays[i];
        res.set(a, pad);
        pad += a.length;
    }
    return res;
}
function checkOpts(defaults, opts) {
    if (opts == null || typeof opts !== 'object') throw new Error('options must be defined');
    const merged = Object.assign(defaults, opts);
    return merged;
}
function equalBytes(a, b) {
    if (a.length !== b.length) return false;
    let diff = 0;
    for(let i = 0; i < a.length; i++)diff |= a[i] ^ b[i];
    return diff === 0;
}
class Hash {
}
const wrapCipher = (params, c)=>{
    Object.assign(c, params);
    return c;
};
function setBigUint64(view, byteOffset, value, isLE) {
    if (typeof view.setBigUint64 === 'function') return view.setBigUint64(byteOffset, value, isLE);
    const _32n = BigInt(32);
    const _u32_max = BigInt(0xffffffff);
    const wh = Number(value >> _32n & _u32_max);
    const wl = Number(value & _u32_max);
    const h = isLE ? 4 : 0;
    const l = isLE ? 0 : 4;
    view.setUint32(byteOffset + h, wh, isLE);
    view.setUint32(byteOffset + l, wl, isLE);
}
function u64Lengths(ciphertext, AAD) {
    const num = new Uint8Array(16);
    const view = createView(num);
    setBigUint64(view, 0, BigInt(AAD ? AAD.length : 0), true);
    setBigUint64(view, 8, BigInt(ciphertext.length), true);
    return num;
}
function isAligned32(bytes) {
    return bytes.byteOffset % 4 === 0;
}
function copyBytes(bytes) {
    return Uint8Array.from(bytes);
}
function clean() {
    for(var _len = arguments.length, arrays = new Array(_len), _key = 0; _key < _len; _key++){
        arrays[_key] = arguments[_key];
    }
    for(let i = 0; i < arrays.length; i++){
        arrays[i].fill(0);
    }
} //# sourceMappingURL=utils.js.map
}),
"[project]/node_modules/@noble/ciphers/esm/_arx.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

// Basic utils for ARX (add-rotate-xor) salsa and chacha ciphers.
__turbopack_context__.s({
    "createCipher": ()=>createCipher,
    "rotl": ()=>rotl,
    "sigma": ()=>sigma
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_assert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@noble/ciphers/esm/_assert.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@noble/ciphers/esm/utils.js [app-client] (ecmascript)");
;
;
/*
RFC8439 requires multi-step cipher stream, where
authKey starts with counter: 0, actual msg with counter: 1.

For this, we need a way to re-use nonce / counter:

    const counter = new Uint8Array(4);
    chacha(..., counter, ...); // counter is now 1
    chacha(..., counter, ...); // counter is now 2

This is complicated:

- 32-bit counters are enough, no need for 64-bit: max ArrayBuffer size in JS is 4GB
- Original papers don't allow mutating counters
- Counter overflow is undefined [^1]
- Idea A: allow providing (nonce | counter) instead of just nonce, re-use it
- Caveat: Cannot be re-used through all cases:
- * chacha has (counter | nonce)
- * xchacha has (nonce16 | counter | nonce16)
- Idea B: separate nonce / counter and provide separate API for counter re-use
- Caveat: there are different counter sizes depending on an algorithm.
- salsa & chacha also differ in structures of key & sigma:
  salsa20:      s[0] | k(4) | s[1] | nonce(2) | ctr(2) | s[2] | k(4) | s[3]
  chacha:       s(4) | k(8) | ctr(1) | nonce(3)
  chacha20orig: s(4) | k(8) | ctr(2) | nonce(2)
- Idea C: helper method such as `setSalsaState(key, nonce, sigma, data)`
- Caveat: we can't re-use counter array

xchacha [^2] uses the subkey and remaining 8 byte nonce with ChaCha20 as normal
(prefixed by 4 NUL bytes, since [RFC8439] specifies a 12-byte nonce).

[^1]: https://mailarchive.ietf.org/arch/msg/cfrg/gsOnTJzcbgG6OqD8Sc0GO5aR_tU/
[^2]: https://datatracker.ietf.org/doc/html/draft-irtf-cfrg-xchacha#appendix-A.2
*/ // We can't make top-level var depend on utils.utf8ToBytes
// because it's not present in all envs. Creating a similar fn here
const _utf8ToBytes = (str)=>Uint8Array.from(str.split('').map((c)=>c.charCodeAt(0)));
const sigma16 = _utf8ToBytes('expand 16-byte k');
const sigma32 = _utf8ToBytes('expand 32-byte k');
const sigma16_32 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["u32"])(sigma16);
const sigma32_32 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["u32"])(sigma32);
const sigma = sigma32_32.slice();
function rotl(a, b) {
    return a << b | a >>> 32 - b;
}
// Is byte array aligned to 4 byte offset (u32)?
function isAligned32(b) {
    return b.byteOffset % 4 === 0;
}
// Salsa and Chacha block length is always 512-bit
const BLOCK_LEN = 64;
const BLOCK_LEN32 = 16;
// new Uint32Array([2**32])   // => Uint32Array(1) [ 0 ]
// new Uint32Array([2**32-1]) // => Uint32Array(1) [ 4294967295 ]
const MAX_COUNTER = 2 ** 32 - 1;
const U32_EMPTY = new Uint32Array();
function runCipher(core, sigma, key, nonce, data, output, counter, rounds) {
    const len = data.length;
    const block = new Uint8Array(BLOCK_LEN);
    const b32 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["u32"])(block);
    // Make sure that buffers aligned to 4 bytes
    const isAligned = isAligned32(data) && isAligned32(output);
    const d32 = isAligned ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["u32"])(data) : U32_EMPTY;
    const o32 = isAligned ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["u32"])(output) : U32_EMPTY;
    for(let pos = 0; pos < len; counter++){
        core(sigma, key, nonce, b32, counter, rounds);
        if (counter >= MAX_COUNTER) throw new Error('arx: counter overflow');
        const take = Math.min(BLOCK_LEN, len - pos);
        // aligned to 4 bytes
        if (isAligned && take === BLOCK_LEN) {
            const pos32 = pos / 4;
            if (pos % 4 !== 0) throw new Error('arx: invalid block position');
            for(let j = 0, posj; j < BLOCK_LEN32; j++){
                posj = pos32 + j;
                o32[posj] = d32[posj] ^ b32[j];
            }
            pos += BLOCK_LEN;
            continue;
        }
        for(let j = 0, posj; j < take; j++){
            posj = pos + j;
            output[posj] = data[posj] ^ block[j];
        }
        pos += take;
    }
}
function createCipher(core, opts) {
    const { allowShortKeys, extendNonceFn, counterLength, counterRight, rounds } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["checkOpts"])({
        allowShortKeys: false,
        counterLength: 8,
        counterRight: false,
        rounds: 20
    }, opts);
    if (typeof core !== 'function') throw new Error('core must be a function');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_assert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["number"])(counterLength);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_assert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["number"])(rounds);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_assert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bool"])(counterRight);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_assert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bool"])(allowShortKeys);
    return function(key, nonce, data, output) {
        let counter = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 0;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_assert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bytes"])(key);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_assert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bytes"])(nonce);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_assert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bytes"])(data);
        const len = data.length;
        if (output === undefined) output = new Uint8Array(len);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_assert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bytes"])(output);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_assert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["number"])(counter);
        if (counter < 0 || counter >= MAX_COUNTER) throw new Error('arx: counter overflow');
        if (output.length < len) throw new Error("arx: output (".concat(output.length, ") is shorter than data (").concat(len, ")"));
        const toClean = [];
        // Key & sigma
        // key=16 -> sigma16, k=key|key
        // key=32 -> sigma32, k=key
        let l = key.length, k, sigma;
        if (l === 32) {
            toClean.push(k = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["copyBytes"])(key));
            sigma = sigma32_32;
        } else if (l === 16 && allowShortKeys) {
            k = new Uint8Array(32);
            k.set(key);
            k.set(key, 16);
            sigma = sigma16_32;
            toClean.push(k);
        } else {
            throw new Error("arx: invalid 32-byte key, got length=".concat(l));
        }
        // Nonce
        // salsa20:      8   (8-byte counter)
        // chacha20orig: 8   (8-byte counter)
        // chacha20:     12  (4-byte counter)
        // xsalsa20:     24  (16 -> hsalsa,  8 -> old nonce)
        // xchacha20:    24  (16 -> hchacha, 8 -> old nonce)
        // Align nonce to 4 bytes
        if (!isAligned32(nonce)) toClean.push(nonce = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["copyBytes"])(nonce));
        const k32 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["u32"])(k);
        // hsalsa & hchacha: handle extended nonce
        if (extendNonceFn) {
            if (nonce.length !== 24) throw new Error("arx: extended nonce must be 24 bytes");
            extendNonceFn(sigma, k32, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["u32"])(nonce.subarray(0, 16)), k32);
            nonce = nonce.subarray(16);
        }
        // Handle nonce counter
        const nonceNcLen = 16 - counterLength;
        if (nonceNcLen !== nonce.length) throw new Error("arx: nonce must be ".concat(nonceNcLen, " or 16 bytes"));
        // Pad counter when nonce is 64 bit
        if (nonceNcLen !== 12) {
            const nc = new Uint8Array(12);
            nc.set(nonce, counterRight ? 0 : 12 - nonce.length);
            nonce = nc;
            toClean.push(nonce);
        }
        const n32 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["u32"])(nonce);
        runCipher(core, sigma, k32, n32, data, output, counter, rounds);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clean"])(...toClean);
        return output;
    };
} //# sourceMappingURL=_arx.js.map
}),
"[project]/node_modules/@noble/ciphers/esm/_poly1305.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "poly1305": ()=>poly1305,
    "wrapConstructorWithKey": ()=>wrapConstructorWithKey
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_assert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@noble/ciphers/esm/_assert.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@noble/ciphers/esm/utils.js [app-client] (ecmascript)");
;
;
// Poly1305 is a fast and parallel secret-key message-authentication code.
// https://cr.yp.to/mac.html, https://cr.yp.to/mac/poly1305-20050329.pdf
// https://datatracker.ietf.org/doc/html/rfc8439
// Based on Public Domain poly1305-donna https://github.com/floodyberry/poly1305-donna
const u8to16 = (a, i)=>a[i++] & 0xff | (a[i++] & 0xff) << 8;
class Poly1305 {
    process(data, offset) {
        let isLast = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
        const hibit = isLast ? 0 : 1 << 11;
        const { h, r } = this;
        const r0 = r[0];
        const r1 = r[1];
        const r2 = r[2];
        const r3 = r[3];
        const r4 = r[4];
        const r5 = r[5];
        const r6 = r[6];
        const r7 = r[7];
        const r8 = r[8];
        const r9 = r[9];
        const t0 = u8to16(data, offset + 0);
        const t1 = u8to16(data, offset + 2);
        const t2 = u8to16(data, offset + 4);
        const t3 = u8to16(data, offset + 6);
        const t4 = u8to16(data, offset + 8);
        const t5 = u8to16(data, offset + 10);
        const t6 = u8to16(data, offset + 12);
        const t7 = u8to16(data, offset + 14);
        let h0 = h[0] + (t0 & 0x1fff);
        let h1 = h[1] + ((t0 >>> 13 | t1 << 3) & 0x1fff);
        let h2 = h[2] + ((t1 >>> 10 | t2 << 6) & 0x1fff);
        let h3 = h[3] + ((t2 >>> 7 | t3 << 9) & 0x1fff);
        let h4 = h[4] + ((t3 >>> 4 | t4 << 12) & 0x1fff);
        let h5 = h[5] + (t4 >>> 1 & 0x1fff);
        let h6 = h[6] + ((t4 >>> 14 | t5 << 2) & 0x1fff);
        let h7 = h[7] + ((t5 >>> 11 | t6 << 5) & 0x1fff);
        let h8 = h[8] + ((t6 >>> 8 | t7 << 8) & 0x1fff);
        let h9 = h[9] + (t7 >>> 5 | hibit);
        let c = 0;
        let d0 = c + h0 * r0 + h1 * (5 * r9) + h2 * (5 * r8) + h3 * (5 * r7) + h4 * (5 * r6);
        c = d0 >>> 13;
        d0 &= 0x1fff;
        d0 += h5 * (5 * r5) + h6 * (5 * r4) + h7 * (5 * r3) + h8 * (5 * r2) + h9 * (5 * r1);
        c += d0 >>> 13;
        d0 &= 0x1fff;
        let d1 = c + h0 * r1 + h1 * r0 + h2 * (5 * r9) + h3 * (5 * r8) + h4 * (5 * r7);
        c = d1 >>> 13;
        d1 &= 0x1fff;
        d1 += h5 * (5 * r6) + h6 * (5 * r5) + h7 * (5 * r4) + h8 * (5 * r3) + h9 * (5 * r2);
        c += d1 >>> 13;
        d1 &= 0x1fff;
        let d2 = c + h0 * r2 + h1 * r1 + h2 * r0 + h3 * (5 * r9) + h4 * (5 * r8);
        c = d2 >>> 13;
        d2 &= 0x1fff;
        d2 += h5 * (5 * r7) + h6 * (5 * r6) + h7 * (5 * r5) + h8 * (5 * r4) + h9 * (5 * r3);
        c += d2 >>> 13;
        d2 &= 0x1fff;
        let d3 = c + h0 * r3 + h1 * r2 + h2 * r1 + h3 * r0 + h4 * (5 * r9);
        c = d3 >>> 13;
        d3 &= 0x1fff;
        d3 += h5 * (5 * r8) + h6 * (5 * r7) + h7 * (5 * r6) + h8 * (5 * r5) + h9 * (5 * r4);
        c += d3 >>> 13;
        d3 &= 0x1fff;
        let d4 = c + h0 * r4 + h1 * r3 + h2 * r2 + h3 * r1 + h4 * r0;
        c = d4 >>> 13;
        d4 &= 0x1fff;
        d4 += h5 * (5 * r9) + h6 * (5 * r8) + h7 * (5 * r7) + h8 * (5 * r6) + h9 * (5 * r5);
        c += d4 >>> 13;
        d4 &= 0x1fff;
        let d5 = c + h0 * r5 + h1 * r4 + h2 * r3 + h3 * r2 + h4 * r1;
        c = d5 >>> 13;
        d5 &= 0x1fff;
        d5 += h5 * r0 + h6 * (5 * r9) + h7 * (5 * r8) + h8 * (5 * r7) + h9 * (5 * r6);
        c += d5 >>> 13;
        d5 &= 0x1fff;
        let d6 = c + h0 * r6 + h1 * r5 + h2 * r4 + h3 * r3 + h4 * r2;
        c = d6 >>> 13;
        d6 &= 0x1fff;
        d6 += h5 * r1 + h6 * r0 + h7 * (5 * r9) + h8 * (5 * r8) + h9 * (5 * r7);
        c += d6 >>> 13;
        d6 &= 0x1fff;
        let d7 = c + h0 * r7 + h1 * r6 + h2 * r5 + h3 * r4 + h4 * r3;
        c = d7 >>> 13;
        d7 &= 0x1fff;
        d7 += h5 * r2 + h6 * r1 + h7 * r0 + h8 * (5 * r9) + h9 * (5 * r8);
        c += d7 >>> 13;
        d7 &= 0x1fff;
        let d8 = c + h0 * r8 + h1 * r7 + h2 * r6 + h3 * r5 + h4 * r4;
        c = d8 >>> 13;
        d8 &= 0x1fff;
        d8 += h5 * r3 + h6 * r2 + h7 * r1 + h8 * r0 + h9 * (5 * r9);
        c += d8 >>> 13;
        d8 &= 0x1fff;
        let d9 = c + h0 * r9 + h1 * r8 + h2 * r7 + h3 * r6 + h4 * r5;
        c = d9 >>> 13;
        d9 &= 0x1fff;
        d9 += h5 * r4 + h6 * r3 + h7 * r2 + h8 * r1 + h9 * r0;
        c += d9 >>> 13;
        d9 &= 0x1fff;
        c = (c << 2) + c | 0;
        c = c + d0 | 0;
        d0 = c & 0x1fff;
        c = c >>> 13;
        d1 += c;
        h[0] = d0;
        h[1] = d1;
        h[2] = d2;
        h[3] = d3;
        h[4] = d4;
        h[5] = d5;
        h[6] = d6;
        h[7] = d7;
        h[8] = d8;
        h[9] = d9;
    }
    finalize() {
        const { h, pad } = this;
        const g = new Uint16Array(10);
        let c = h[1] >>> 13;
        h[1] &= 0x1fff;
        for(let i = 2; i < 10; i++){
            h[i] += c;
            c = h[i] >>> 13;
            h[i] &= 0x1fff;
        }
        h[0] += c * 5;
        c = h[0] >>> 13;
        h[0] &= 0x1fff;
        h[1] += c;
        c = h[1] >>> 13;
        h[1] &= 0x1fff;
        h[2] += c;
        g[0] = h[0] + 5;
        c = g[0] >>> 13;
        g[0] &= 0x1fff;
        for(let i = 1; i < 10; i++){
            g[i] = h[i] + c;
            c = g[i] >>> 13;
            g[i] &= 0x1fff;
        }
        g[9] -= 1 << 13;
        let mask = (c ^ 1) - 1;
        for(let i = 0; i < 10; i++)g[i] &= mask;
        mask = ~mask;
        for(let i = 0; i < 10; i++)h[i] = h[i] & mask | g[i];
        h[0] = (h[0] | h[1] << 13) & 0xffff;
        h[1] = (h[1] >>> 3 | h[2] << 10) & 0xffff;
        h[2] = (h[2] >>> 6 | h[3] << 7) & 0xffff;
        h[3] = (h[3] >>> 9 | h[4] << 4) & 0xffff;
        h[4] = (h[4] >>> 12 | h[5] << 1 | h[6] << 14) & 0xffff;
        h[5] = (h[6] >>> 2 | h[7] << 11) & 0xffff;
        h[6] = (h[7] >>> 5 | h[8] << 8) & 0xffff;
        h[7] = (h[8] >>> 8 | h[9] << 5) & 0xffff;
        let f = h[0] + pad[0];
        h[0] = f & 0xffff;
        for(let i = 1; i < 8; i++){
            f = (h[i] + pad[i] | 0) + (f >>> 16) | 0;
            h[i] = f & 0xffff;
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clean"])(g);
    }
    update(data) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_assert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["exists"])(this);
        const { buffer, blockLen } = this;
        data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toBytes"])(data);
        const len = data.length;
        for(let pos = 0; pos < len;){
            const take = Math.min(blockLen - this.pos, len - pos);
            // Fast path: we have at least one block in input
            if (take === blockLen) {
                for(; blockLen <= len - pos; pos += blockLen)this.process(data, pos);
                continue;
            }
            buffer.set(data.subarray(pos, pos + take), this.pos);
            this.pos += take;
            pos += take;
            if (this.pos === blockLen) {
                this.process(buffer, 0, false);
                this.pos = 0;
            }
        }
        return this;
    }
    destroy() {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clean"])(this.h, this.r, this.buffer, this.pad);
    }
    digestInto(out) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_assert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["exists"])(this);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_assert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["output"])(out, this);
        this.finished = true;
        const { buffer, h } = this;
        let { pos } = this;
        if (pos) {
            buffer[pos++] = 1;
            for(; pos < 16; pos++)buffer[pos] = 0;
            this.process(buffer, 0, true);
        }
        this.finalize();
        let opos = 0;
        for(let i = 0; i < 8; i++){
            out[opos++] = h[i] >>> 0;
            out[opos++] = h[i] >>> 8;
        }
        return out;
    }
    digest() {
        const { buffer, outputLen } = this;
        this.digestInto(buffer);
        const res = buffer.slice(0, outputLen);
        this.destroy();
        return res;
    }
    constructor(key){
        this.blockLen = 16;
        this.outputLen = 16;
        this.buffer = new Uint8Array(16);
        this.r = new Uint16Array(10);
        this.h = new Uint16Array(10);
        this.pad = new Uint16Array(8);
        this.pos = 0;
        this.finished = false;
        key = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toBytes"])(key);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_assert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bytes"])(key, 32);
        const t0 = u8to16(key, 0);
        const t1 = u8to16(key, 2);
        const t2 = u8to16(key, 4);
        const t3 = u8to16(key, 6);
        const t4 = u8to16(key, 8);
        const t5 = u8to16(key, 10);
        const t6 = u8to16(key, 12);
        const t7 = u8to16(key, 14);
        // https://github.com/floodyberry/poly1305-donna/blob/e6ad6e091d30d7f4ec2d4f978be1fcfcbce72781/poly1305-donna-16.h#L47
        this.r[0] = t0 & 0x1fff;
        this.r[1] = (t0 >>> 13 | t1 << 3) & 0x1fff;
        this.r[2] = (t1 >>> 10 | t2 << 6) & 0x1f03;
        this.r[3] = (t2 >>> 7 | t3 << 9) & 0x1fff;
        this.r[4] = (t3 >>> 4 | t4 << 12) & 0x00ff;
        this.r[5] = t4 >>> 1 & 0x1ffe;
        this.r[6] = (t4 >>> 14 | t5 << 2) & 0x1fff;
        this.r[7] = (t5 >>> 11 | t6 << 5) & 0x1f81;
        this.r[8] = (t6 >>> 8 | t7 << 8) & 0x1fff;
        this.r[9] = t7 >>> 5 & 0x007f;
        for(let i = 0; i < 8; i++)this.pad[i] = u8to16(key, 16 + 2 * i);
    }
}
function wrapConstructorWithKey(hashCons) {
    const hashC = (msg, key)=>hashCons(key).update((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toBytes"])(msg)).digest();
    const tmp = hashCons(new Uint8Array(32));
    hashC.outputLen = tmp.outputLen;
    hashC.blockLen = tmp.blockLen;
    hashC.create = (key)=>hashCons(key);
    return hashC;
}
const poly1305 = wrapConstructorWithKey((key)=>new Poly1305(key)); //# sourceMappingURL=_poly1305.js.map
}),
"[project]/node_modules/@noble/ciphers/esm/chacha.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

// prettier-ignore
__turbopack_context__.s({
    "_poly1305_aead": ()=>_poly1305_aead,
    "chacha12": ()=>chacha12,
    "chacha20": ()=>chacha20,
    "chacha20orig": ()=>chacha20orig,
    "chacha20poly1305": ()=>chacha20poly1305,
    "chacha8": ()=>chacha8,
    "hchacha": ()=>hchacha,
    "xchacha20": ()=>xchacha20,
    "xchacha20poly1305": ()=>xchacha20poly1305
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_arx$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@noble/ciphers/esm/_arx.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_assert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@noble/ciphers/esm/_assert.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_poly1305$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@noble/ciphers/esm/_poly1305.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@noble/ciphers/esm/utils.js [app-client] (ecmascript)");
;
;
;
;
// ChaCha20 stream cipher was released in 2008. ChaCha aims to increase
// the diffusion per round, but had slightly less cryptanalysis.
// https://cr.yp.to/chacha.html, http://cr.yp.to/chacha/chacha-20080128.pdf
/**
 * ChaCha core function.
 */ // prettier-ignore
function chachaCore(s, k, n, out, cnt) {
    let rounds = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : 20;
    let y00 = s[0], y01 = s[1], y02 = s[2], y03 = s[3], y04 = k[0], y05 = k[1], y06 = k[2], y07 = k[3], y08 = k[4], y09 = k[5], y10 = k[6], y11 = k[7], y12 = cnt, y13 = n[0], y14 = n[1], y15 = n[2]; // Counter  Counter	Nonce   Nonce
    // Save state to temporary variables
    let x00 = y00, x01 = y01, x02 = y02, x03 = y03, x04 = y04, x05 = y05, x06 = y06, x07 = y07, x08 = y08, x09 = y09, x10 = y10, x11 = y11, x12 = y12, x13 = y13, x14 = y14, x15 = y15;
    for(let r = 0; r < rounds; r += 2){
        x00 = x00 + x04 | 0;
        x12 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_arx$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(x12 ^ x00, 16);
        x08 = x08 + x12 | 0;
        x04 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_arx$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(x04 ^ x08, 12);
        x00 = x00 + x04 | 0;
        x12 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_arx$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(x12 ^ x00, 8);
        x08 = x08 + x12 | 0;
        x04 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_arx$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(x04 ^ x08, 7);
        x01 = x01 + x05 | 0;
        x13 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_arx$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(x13 ^ x01, 16);
        x09 = x09 + x13 | 0;
        x05 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_arx$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(x05 ^ x09, 12);
        x01 = x01 + x05 | 0;
        x13 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_arx$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(x13 ^ x01, 8);
        x09 = x09 + x13 | 0;
        x05 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_arx$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(x05 ^ x09, 7);
        x02 = x02 + x06 | 0;
        x14 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_arx$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(x14 ^ x02, 16);
        x10 = x10 + x14 | 0;
        x06 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_arx$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(x06 ^ x10, 12);
        x02 = x02 + x06 | 0;
        x14 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_arx$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(x14 ^ x02, 8);
        x10 = x10 + x14 | 0;
        x06 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_arx$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(x06 ^ x10, 7);
        x03 = x03 + x07 | 0;
        x15 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_arx$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(x15 ^ x03, 16);
        x11 = x11 + x15 | 0;
        x07 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_arx$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(x07 ^ x11, 12);
        x03 = x03 + x07 | 0;
        x15 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_arx$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(x15 ^ x03, 8);
        x11 = x11 + x15 | 0;
        x07 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_arx$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(x07 ^ x11, 7);
        x00 = x00 + x05 | 0;
        x15 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_arx$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(x15 ^ x00, 16);
        x10 = x10 + x15 | 0;
        x05 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_arx$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(x05 ^ x10, 12);
        x00 = x00 + x05 | 0;
        x15 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_arx$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(x15 ^ x00, 8);
        x10 = x10 + x15 | 0;
        x05 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_arx$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(x05 ^ x10, 7);
        x01 = x01 + x06 | 0;
        x12 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_arx$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(x12 ^ x01, 16);
        x11 = x11 + x12 | 0;
        x06 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_arx$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(x06 ^ x11, 12);
        x01 = x01 + x06 | 0;
        x12 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_arx$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(x12 ^ x01, 8);
        x11 = x11 + x12 | 0;
        x06 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_arx$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(x06 ^ x11, 7);
        x02 = x02 + x07 | 0;
        x13 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_arx$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(x13 ^ x02, 16);
        x08 = x08 + x13 | 0;
        x07 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_arx$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(x07 ^ x08, 12);
        x02 = x02 + x07 | 0;
        x13 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_arx$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(x13 ^ x02, 8);
        x08 = x08 + x13 | 0;
        x07 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_arx$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(x07 ^ x08, 7);
        x03 = x03 + x04 | 0;
        x14 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_arx$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(x14 ^ x03, 16);
        x09 = x09 + x14 | 0;
        x04 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_arx$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(x04 ^ x09, 12);
        x03 = x03 + x04 | 0;
        x14 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_arx$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(x14 ^ x03, 8);
        x09 = x09 + x14 | 0;
        x04 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_arx$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(x04 ^ x09, 7);
    }
    // Write output
    let oi = 0;
    out[oi++] = y00 + x00 | 0;
    out[oi++] = y01 + x01 | 0;
    out[oi++] = y02 + x02 | 0;
    out[oi++] = y03 + x03 | 0;
    out[oi++] = y04 + x04 | 0;
    out[oi++] = y05 + x05 | 0;
    out[oi++] = y06 + x06 | 0;
    out[oi++] = y07 + x07 | 0;
    out[oi++] = y08 + x08 | 0;
    out[oi++] = y09 + x09 | 0;
    out[oi++] = y10 + x10 | 0;
    out[oi++] = y11 + x11 | 0;
    out[oi++] = y12 + x12 | 0;
    out[oi++] = y13 + x13 | 0;
    out[oi++] = y14 + x14 | 0;
    out[oi++] = y15 + x15 | 0;
}
function hchacha(s, k, i, o32) {
    let x00 = s[0], x01 = s[1], x02 = s[2], x03 = s[3], x04 = k[0], x05 = k[1], x06 = k[2], x07 = k[3], x08 = k[4], x09 = k[5], x10 = k[6], x11 = k[7], x12 = i[0], x13 = i[1], x14 = i[2], x15 = i[3];
    for(let r = 0; r < 20; r += 2){
        x00 = x00 + x04 | 0;
        x12 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_arx$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(x12 ^ x00, 16);
        x08 = x08 + x12 | 0;
        x04 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_arx$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(x04 ^ x08, 12);
        x00 = x00 + x04 | 0;
        x12 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_arx$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(x12 ^ x00, 8);
        x08 = x08 + x12 | 0;
        x04 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_arx$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(x04 ^ x08, 7);
        x01 = x01 + x05 | 0;
        x13 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_arx$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(x13 ^ x01, 16);
        x09 = x09 + x13 | 0;
        x05 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_arx$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(x05 ^ x09, 12);
        x01 = x01 + x05 | 0;
        x13 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_arx$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(x13 ^ x01, 8);
        x09 = x09 + x13 | 0;
        x05 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_arx$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(x05 ^ x09, 7);
        x02 = x02 + x06 | 0;
        x14 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_arx$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(x14 ^ x02, 16);
        x10 = x10 + x14 | 0;
        x06 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_arx$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(x06 ^ x10, 12);
        x02 = x02 + x06 | 0;
        x14 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_arx$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(x14 ^ x02, 8);
        x10 = x10 + x14 | 0;
        x06 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_arx$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(x06 ^ x10, 7);
        x03 = x03 + x07 | 0;
        x15 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_arx$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(x15 ^ x03, 16);
        x11 = x11 + x15 | 0;
        x07 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_arx$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(x07 ^ x11, 12);
        x03 = x03 + x07 | 0;
        x15 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_arx$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(x15 ^ x03, 8);
        x11 = x11 + x15 | 0;
        x07 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_arx$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(x07 ^ x11, 7);
        x00 = x00 + x05 | 0;
        x15 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_arx$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(x15 ^ x00, 16);
        x10 = x10 + x15 | 0;
        x05 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_arx$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(x05 ^ x10, 12);
        x00 = x00 + x05 | 0;
        x15 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_arx$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(x15 ^ x00, 8);
        x10 = x10 + x15 | 0;
        x05 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_arx$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(x05 ^ x10, 7);
        x01 = x01 + x06 | 0;
        x12 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_arx$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(x12 ^ x01, 16);
        x11 = x11 + x12 | 0;
        x06 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_arx$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(x06 ^ x11, 12);
        x01 = x01 + x06 | 0;
        x12 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_arx$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(x12 ^ x01, 8);
        x11 = x11 + x12 | 0;
        x06 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_arx$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(x06 ^ x11, 7);
        x02 = x02 + x07 | 0;
        x13 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_arx$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(x13 ^ x02, 16);
        x08 = x08 + x13 | 0;
        x07 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_arx$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(x07 ^ x08, 12);
        x02 = x02 + x07 | 0;
        x13 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_arx$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(x13 ^ x02, 8);
        x08 = x08 + x13 | 0;
        x07 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_arx$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(x07 ^ x08, 7);
        x03 = x03 + x04 | 0;
        x14 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_arx$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(x14 ^ x03, 16);
        x09 = x09 + x14 | 0;
        x04 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_arx$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(x04 ^ x09, 12);
        x03 = x03 + x04 | 0;
        x14 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_arx$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(x14 ^ x03, 8);
        x09 = x09 + x14 | 0;
        x04 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_arx$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(x04 ^ x09, 7);
    }
    let oi = 0;
    o32[oi++] = x00;
    o32[oi++] = x01;
    o32[oi++] = x02;
    o32[oi++] = x03;
    o32[oi++] = x12;
    o32[oi++] = x13;
    o32[oi++] = x14;
    o32[oi++] = x15;
}
const chacha20orig = /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_arx$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createCipher"])(chachaCore, {
    counterRight: false,
    counterLength: 8,
    allowShortKeys: true
});
const chacha20 = /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_arx$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createCipher"])(chachaCore, {
    counterRight: false,
    counterLength: 4,
    allowShortKeys: false
});
const xchacha20 = /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_arx$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createCipher"])(chachaCore, {
    counterRight: false,
    counterLength: 8,
    extendNonceFn: hchacha,
    allowShortKeys: false
});
const chacha8 = /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_arx$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createCipher"])(chachaCore, {
    counterRight: false,
    counterLength: 4,
    rounds: 8
});
const chacha12 = /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_arx$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createCipher"])(chachaCore, {
    counterRight: false,
    counterLength: 4,
    rounds: 12
});
const ZEROS16 = /* @__PURE__ */ new Uint8Array(16);
// Pad to digest size with zeros
const updatePadded = (h, msg)=>{
    h.update(msg);
    const left = msg.length % 16;
    if (left) h.update(ZEROS16.subarray(left));
};
const ZEROS32 = /* @__PURE__ */ new Uint8Array(32);
function computeTag(fn, key, nonce, data, AAD) {
    const authKey = fn(key, nonce, ZEROS32);
    const h = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_poly1305$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["poly1305"].create(authKey);
    if (AAD) updatePadded(h, AAD);
    updatePadded(h, data);
    const num = new Uint8Array(16);
    const view = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createView"])(num);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setBigUint64"])(view, 0, BigInt(AAD ? AAD.length : 0), true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setBigUint64"])(view, 8, BigInt(data.length), true);
    h.update(num);
    const res = h.digest();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clean"])(authKey, num);
    return res;
}
const _poly1305_aead = (xorStream)=>(key, nonce, AAD)=>{
        const tagLength = 16;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_assert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bytes"])(key, 32);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_assert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bytes"])(nonce);
        return {
            encrypt (plaintext, output) {
                const plength = plaintext.length;
                const clength = plength + tagLength;
                if (output) {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_assert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bytes"])(output, clength);
                } else {
                    output = new Uint8Array(clength);
                }
                xorStream(key, nonce, plaintext, output, 1);
                const tag = computeTag(xorStream, key, nonce, output.subarray(0, -tagLength), AAD);
                output.set(tag, plength); // append tag
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clean"])(tag);
                return output;
            },
            decrypt (ciphertext, output) {
                const clength = ciphertext.length;
                const plength = clength - tagLength;
                if (clength < tagLength) throw new Error("encrypted data must be at least ".concat(tagLength, " bytes"));
                if (output) {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_assert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bytes"])(output, plength);
                } else {
                    output = new Uint8Array(plength);
                }
                const data = ciphertext.subarray(0, -tagLength);
                const passedTag = ciphertext.subarray(-tagLength);
                const tag = computeTag(xorStream, key, nonce, data, AAD);
                if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["equalBytes"])(passedTag, tag)) throw new Error('invalid tag');
                xorStream(key, nonce, data, output, 1);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clean"])(tag);
                return output;
            }
        };
    };
const chacha20poly1305 = /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["wrapCipher"])({
    blockSize: 64,
    nonceLength: 12,
    tagLength: 16
}, _poly1305_aead(chacha20));
const xchacha20poly1305 = /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["wrapCipher"])({
    blockSize: 64,
    nonceLength: 24,
    tagLength: 16
}, _poly1305_aead(xchacha20)); //# sourceMappingURL=chacha.js.map
}),
"[project]/node_modules/@noble/ciphers/esm/crypto.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "crypto": ()=>crypto
});
const crypto = typeof globalThis === 'object' && 'crypto' in globalThis ? globalThis.crypto : undefined; //# sourceMappingURL=crypto.js.map
}),
"[project]/node_modules/@noble/ciphers/esm/webcrypto.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

// We use WebCrypto aka globalThis.crypto, which exists in browsers and node.js 16+.
// node.js versions earlier than v19 don't declare it in global scope.
// For node.js, package.js on#exports field mapping rewrites import
// from `crypto` to `cryptoNode`, which imports native module.
// Makes the utils un-importable in browsers without a bundler.
// Once node.js 18 is deprecated, we can just drop the import.
//
// Use full path so that Node.js can rewrite it to `cryptoNode.js`.
__turbopack_context__.s({
    "cbc": ()=>cbc,
    "ctr": ()=>ctr,
    "gcm": ()=>gcm,
    "getWebcryptoSubtle": ()=>getWebcryptoSubtle,
    "managedNonce": ()=>managedNonce,
    "randomBytes": ()=>randomBytes,
    "utils": ()=>utils
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$crypto$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@noble/ciphers/esm/crypto.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_assert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@noble/ciphers/esm/_assert.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@noble/ciphers/esm/utils.js [app-client] (ecmascript)");
;
;
;
function randomBytes() {
    let bytesLength = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 32;
    if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$crypto$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["crypto"] && typeof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$crypto$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["crypto"].getRandomValues === 'function') return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$crypto$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["crypto"].getRandomValues(new Uint8Array(bytesLength));
    throw new Error('crypto.getRandomValues must be defined');
}
function getWebcryptoSubtle() {
    if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$crypto$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["crypto"] && typeof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$crypto$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["crypto"].subtle === 'object' && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$crypto$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["crypto"].subtle != null) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$crypto$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["crypto"].subtle;
    throw new Error('crypto.subtle must be defined');
}
function managedNonce(fn) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_assert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["number"])(fn.nonceLength);
    return function(key) {
        for(var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++){
            args[_key - 1] = arguments[_key];
        }
        return {
            encrypt (plaintext) {
                for(var _len = arguments.length, argsEnc = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++){
                    argsEnc[_key - 1] = arguments[_key];
                }
                const { nonceLength } = fn;
                const nonce = randomBytes(nonceLength);
                const ciphertext = fn(key, nonce, ...args).encrypt(plaintext, ...argsEnc);
                const out = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["concatBytes"])(nonce, ciphertext);
                ciphertext.fill(0);
                return out;
            },
            decrypt (ciphertext) {
                for(var _len = arguments.length, argsDec = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++){
                    argsDec[_key - 1] = arguments[_key];
                }
                const { nonceLength } = fn;
                const nonce = ciphertext.subarray(0, nonceLength);
                const data = ciphertext.subarray(nonceLength);
                return fn(key, nonce, ...args).decrypt(data, ...argsDec);
            }
        };
    };
}
const utils = {
    async encrypt (key, keyParams, cryptParams, plaintext) {
        const cr = getWebcryptoSubtle();
        const iKey = await cr.importKey('raw', key, keyParams, true, [
            'encrypt'
        ]);
        const ciphertext = await cr.encrypt(cryptParams, iKey, plaintext);
        return new Uint8Array(ciphertext);
    },
    async decrypt (key, keyParams, cryptParams, ciphertext) {
        const cr = getWebcryptoSubtle();
        const iKey = await cr.importKey('raw', key, keyParams, true, [
            'decrypt'
        ]);
        const plaintext = await cr.decrypt(cryptParams, iKey, ciphertext);
        return new Uint8Array(plaintext);
    }
};
const mode = {
    CBC: 'AES-CBC',
    CTR: 'AES-CTR',
    GCM: 'AES-GCM'
};
function getCryptParams(algo, nonce, AAD) {
    if (algo === mode.CBC) return {
        name: mode.CBC,
        iv: nonce
    };
    if (algo === mode.CTR) return {
        name: mode.CTR,
        counter: nonce,
        length: 64
    };
    if (algo === mode.GCM) {
        if (AAD) return {
            name: mode.GCM,
            iv: nonce,
            additionalData: AAD
        };
        else return {
            name: mode.GCM,
            iv: nonce
        };
    }
    throw new Error('unknown aes block mode');
}
function generate(algo) {
    return (key, nonce, AAD)=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_assert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bytes"])(key);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_assert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bytes"])(nonce);
        const keyParams = {
            name: algo,
            length: key.length * 8
        };
        const cryptParams = getCryptParams(algo, nonce, AAD);
        return {
            // keyLength,
            encrypt (plaintext) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_assert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bytes"])(plaintext);
                return utils.encrypt(key, keyParams, cryptParams, plaintext);
            },
            decrypt (ciphertext) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$ciphers$2f$esm$2f$_assert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["bytes"])(ciphertext);
                return utils.decrypt(key, keyParams, cryptParams, ciphertext);
            }
        };
    };
}
const cbc = generate(mode.CBC);
const ctr = generate(mode.CTR);
const gcm = generate(mode.GCM); // // Type tests
 // import { siv, gcm, ctr, ecb, cbc } from '../aes.js';
 // import { xsalsa20poly1305 } from '../salsa.js';
 // import { chacha20poly1305, xchacha20poly1305 } from '../chacha.js';
 // const wsiv = managedNonce(siv);
 // const wgcm = managedNonce(gcm);
 // const wctr = managedNonce(ctr);
 // const wcbc = managedNonce(cbc);
 // const wsalsapoly = managedNonce(xsalsa20poly1305);
 // const wchacha = managedNonce(chacha20poly1305);
 // const wxchacha = managedNonce(xchacha20poly1305);
 // // should fail
 // const wcbc2 = managedNonce(managedNonce(cbc));
 // const wctr = managedNonce(ctr);
 //# sourceMappingURL=webcrypto.js.map
}),
"[project]/node_modules/@noble/hashes/esm/crypto.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "crypto": ()=>crypto
});
const crypto = typeof globalThis === 'object' && 'crypto' in globalThis ? globalThis.crypto : undefined; //# sourceMappingURL=crypto.js.map
}),
"[project]/node_modules/@noble/hashes/esm/utils.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

/**
 * Utilities for hex, bytes, CSPRNG.
 * @module
 */ /*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */ // We use WebCrypto aka globalThis.crypto, which exists in browsers and node.js 16+.
// node.js versions earlier than v19 don't declare it in global scope.
// For node.js, package.json#exports field mapping rewrites import
// from `crypto` to `cryptoNode`, which imports native module.
// Makes the utils un-importable in browsers without a bundler.
// Once node.js 18 is deprecated (2025-04-30), we can just drop the import.
__turbopack_context__.s({
    "Hash": ()=>Hash,
    "abytes": ()=>abytes,
    "aexists": ()=>aexists,
    "ahash": ()=>ahash,
    "anumber": ()=>anumber,
    "aoutput": ()=>aoutput,
    "asyncLoop": ()=>asyncLoop,
    "byteSwap": ()=>byteSwap,
    "byteSwap32": ()=>byteSwap32,
    "byteSwapIfBE": ()=>byteSwapIfBE,
    "bytesToHex": ()=>bytesToHex,
    "bytesToUtf8": ()=>bytesToUtf8,
    "checkOpts": ()=>checkOpts,
    "clean": ()=>clean,
    "concatBytes": ()=>concatBytes,
    "createHasher": ()=>createHasher,
    "createOptHasher": ()=>createOptHasher,
    "createView": ()=>createView,
    "createXOFer": ()=>createXOFer,
    "hexToBytes": ()=>hexToBytes,
    "isBytes": ()=>isBytes,
    "isLE": ()=>isLE,
    "kdfInputToBytes": ()=>kdfInputToBytes,
    "nextTick": ()=>nextTick,
    "randomBytes": ()=>randomBytes,
    "rotl": ()=>rotl,
    "rotr": ()=>rotr,
    "swap32IfBE": ()=>swap32IfBE,
    "swap8IfBE": ()=>swap8IfBE,
    "toBytes": ()=>toBytes,
    "u32": ()=>u32,
    "u8": ()=>u8,
    "utf8ToBytes": ()=>utf8ToBytes,
    "wrapConstructor": ()=>wrapConstructor,
    "wrapConstructorWithOpts": ()=>wrapConstructorWithOpts,
    "wrapXOFConstructorWithOpts": ()=>wrapXOFConstructorWithOpts
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$crypto$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@noble/hashes/esm/crypto.js [app-client] (ecmascript)");
;
function isBytes(a) {
    return a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === 'Uint8Array';
}
function anumber(n) {
    if (!Number.isSafeInteger(n) || n < 0) throw new Error('positive integer expected, got ' + n);
}
function abytes(b) {
    for(var _len = arguments.length, lengths = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++){
        lengths[_key - 1] = arguments[_key];
    }
    if (!isBytes(b)) throw new Error('Uint8Array expected');
    if (lengths.length > 0 && !lengths.includes(b.length)) throw new Error('Uint8Array expected of length ' + lengths + ', got length=' + b.length);
}
function ahash(h) {
    if (typeof h !== 'function' || typeof h.create !== 'function') throw new Error('Hash should be wrapped by utils.createHasher');
    anumber(h.outputLen);
    anumber(h.blockLen);
}
function aexists(instance) {
    let checkFinished = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
    if (instance.destroyed) throw new Error('Hash instance has been destroyed');
    if (checkFinished && instance.finished) throw new Error('Hash#digest() has already been called');
}
function aoutput(out, instance) {
    abytes(out);
    const min = instance.outputLen;
    if (out.length < min) {
        throw new Error('digestInto() expects output buffer of length at least ' + min);
    }
}
function u8(arr) {
    return new Uint8Array(arr.buffer, arr.byteOffset, arr.byteLength);
}
function u32(arr) {
    return new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
}
function clean() {
    for(var _len = arguments.length, arrays = new Array(_len), _key = 0; _key < _len; _key++){
        arrays[_key] = arguments[_key];
    }
    for(let i = 0; i < arrays.length; i++){
        arrays[i].fill(0);
    }
}
function createView(arr) {
    return new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
}
function rotr(word, shift) {
    return word << 32 - shift | word >>> shift;
}
function rotl(word, shift) {
    return word << shift | word >>> 32 - shift >>> 0;
}
const isLE = /* @__PURE__ */ (()=>new Uint8Array(new Uint32Array([
        0x11223344
    ]).buffer)[0] === 0x44)();
function byteSwap(word) {
    return word << 24 & 0xff000000 | word << 8 & 0xff0000 | word >>> 8 & 0xff00 | word >>> 24 & 0xff;
}
const swap8IfBE = isLE ? (n)=>n : (n)=>byteSwap(n);
const byteSwapIfBE = swap8IfBE;
function byteSwap32(arr) {
    for(let i = 0; i < arr.length; i++){
        arr[i] = byteSwap(arr[i]);
    }
    return arr;
}
const swap32IfBE = isLE ? (u)=>u : byteSwap32;
// Built-in hex conversion https://caniuse.com/mdn-javascript_builtins_uint8array_fromhex
const hasHexBuiltin = /* @__PURE__ */ (()=>// @ts-ignore
    typeof Uint8Array.from([]).toHex === 'function' && typeof Uint8Array.fromHex === 'function')();
// Array where index 0xf0 (240) is mapped to string 'f0'
const hexes = /* @__PURE__ */ Array.from({
    length: 256
}, (_, i)=>i.toString(16).padStart(2, '0'));
function bytesToHex(bytes) {
    abytes(bytes);
    // @ts-ignore
    if (hasHexBuiltin) return bytes.toHex();
    // pre-caching improves the speed 6x
    let hex = '';
    for(let i = 0; i < bytes.length; i++){
        hex += hexes[bytes[i]];
    }
    return hex;
}
// We use optimized technique to convert hex string to byte array
const asciis = {
    _0: 48,
    _9: 57,
    A: 65,
    F: 70,
    a: 97,
    f: 102
};
function asciiToBase16(ch) {
    if (ch >= asciis._0 && ch <= asciis._9) return ch - asciis._0; // '2' => 50-48
    if (ch >= asciis.A && ch <= asciis.F) return ch - (asciis.A - 10); // 'B' => 66-(65-10)
    if (ch >= asciis.a && ch <= asciis.f) return ch - (asciis.a - 10); // 'b' => 98-(97-10)
    return;
}
function hexToBytes(hex) {
    if (typeof hex !== 'string') throw new Error('hex string expected, got ' + typeof hex);
    // @ts-ignore
    if (hasHexBuiltin) return Uint8Array.fromHex(hex);
    const hl = hex.length;
    const al = hl / 2;
    if (hl % 2) throw new Error('hex string expected, got unpadded hex of length ' + hl);
    const array = new Uint8Array(al);
    for(let ai = 0, hi = 0; ai < al; ai++, hi += 2){
        const n1 = asciiToBase16(hex.charCodeAt(hi));
        const n2 = asciiToBase16(hex.charCodeAt(hi + 1));
        if (n1 === undefined || n2 === undefined) {
            const char = hex[hi] + hex[hi + 1];
            throw new Error('hex string expected, got non-hex character "' + char + '" at index ' + hi);
        }
        array[ai] = n1 * 16 + n2; // multiply first octet, e.g. 'a3' => 10*16+3 => 160 + 3 => 163
    }
    return array;
}
const nextTick = async ()=>{};
async function asyncLoop(iters, tick, cb) {
    let ts = Date.now();
    for(let i = 0; i < iters; i++){
        cb(i);
        // Date.now() is not monotonic, so in case if clock goes backwards we return return control too
        const diff = Date.now() - ts;
        if (diff >= 0 && diff < tick) continue;
        await nextTick();
        ts += diff;
    }
}
function utf8ToBytes(str) {
    if (typeof str !== 'string') throw new Error('string expected');
    return new Uint8Array(new TextEncoder().encode(str)); // https://bugzil.la/1681809
}
function bytesToUtf8(bytes) {
    return new TextDecoder().decode(bytes);
}
function toBytes(data) {
    if (typeof data === 'string') data = utf8ToBytes(data);
    abytes(data);
    return data;
}
function kdfInputToBytes(data) {
    if (typeof data === 'string') data = utf8ToBytes(data);
    abytes(data);
    return data;
}
function concatBytes() {
    for(var _len = arguments.length, arrays = new Array(_len), _key = 0; _key < _len; _key++){
        arrays[_key] = arguments[_key];
    }
    let sum = 0;
    for(let i = 0; i < arrays.length; i++){
        const a = arrays[i];
        abytes(a);
        sum += a.length;
    }
    const res = new Uint8Array(sum);
    for(let i = 0, pad = 0; i < arrays.length; i++){
        const a = arrays[i];
        res.set(a, pad);
        pad += a.length;
    }
    return res;
}
function checkOpts(defaults, opts) {
    if (opts !== undefined && ({}).toString.call(opts) !== '[object Object]') throw new Error('options should be object or undefined');
    const merged = Object.assign(defaults, opts);
    return merged;
}
class Hash {
}
function createHasher(hashCons) {
    const hashC = (msg)=>hashCons().update(toBytes(msg)).digest();
    const tmp = hashCons();
    hashC.outputLen = tmp.outputLen;
    hashC.blockLen = tmp.blockLen;
    hashC.create = ()=>hashCons();
    return hashC;
}
function createOptHasher(hashCons) {
    const hashC = (msg, opts)=>hashCons(opts).update(toBytes(msg)).digest();
    const tmp = hashCons({});
    hashC.outputLen = tmp.outputLen;
    hashC.blockLen = tmp.blockLen;
    hashC.create = (opts)=>hashCons(opts);
    return hashC;
}
function createXOFer(hashCons) {
    const hashC = (msg, opts)=>hashCons(opts).update(toBytes(msg)).digest();
    const tmp = hashCons({});
    hashC.outputLen = tmp.outputLen;
    hashC.blockLen = tmp.blockLen;
    hashC.create = (opts)=>hashCons(opts);
    return hashC;
}
const wrapConstructor = createHasher;
const wrapConstructorWithOpts = createOptHasher;
const wrapXOFConstructorWithOpts = createXOFer;
function randomBytes() {
    let bytesLength = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 32;
    if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$crypto$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["crypto"] && typeof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$crypto$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["crypto"].getRandomValues === 'function') {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$crypto$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["crypto"].getRandomValues(new Uint8Array(bytesLength));
    }
    // Legacy Node.js compatibility
    if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$crypto$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["crypto"] && typeof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$crypto$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["crypto"].randomBytes === 'function') {
        return Uint8Array.from(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$crypto$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["crypto"].randomBytes(bytesLength));
    }
    throw new Error('crypto.getRandomValues must be defined');
} //# sourceMappingURL=utils.js.map
}),
"[project]/node_modules/@noble/hashes/esm/hmac.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

/**
 * HMAC: RFC2104 message authentication code.
 * @module
 */ __turbopack_context__.s({
    "HMAC": ()=>HMAC,
    "hmac": ()=>hmac
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@noble/hashes/esm/utils.js [app-client] (ecmascript)");
;
class HMAC extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Hash"] {
    update(buf) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["aexists"])(this);
        this.iHash.update(buf);
        return this;
    }
    digestInto(out) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["aexists"])(this);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["abytes"])(out, this.outputLen);
        this.finished = true;
        this.iHash.digestInto(out);
        this.oHash.update(out);
        this.oHash.digestInto(out);
        this.destroy();
    }
    digest() {
        const out = new Uint8Array(this.oHash.outputLen);
        this.digestInto(out);
        return out;
    }
    _cloneInto(to) {
        // Create new instance without calling constructor since key already in state and we don't know it.
        to || (to = Object.create(Object.getPrototypeOf(this), {}));
        const { oHash, iHash, finished, destroyed, blockLen, outputLen } = this;
        to = to;
        to.finished = finished;
        to.destroyed = destroyed;
        to.blockLen = blockLen;
        to.outputLen = outputLen;
        to.oHash = oHash._cloneInto(to.oHash);
        to.iHash = iHash._cloneInto(to.iHash);
        return to;
    }
    clone() {
        return this._cloneInto();
    }
    destroy() {
        this.destroyed = true;
        this.oHash.destroy();
        this.iHash.destroy();
    }
    constructor(hash, _key){
        super();
        this.finished = false;
        this.destroyed = false;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ahash"])(hash);
        const key = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toBytes"])(_key);
        this.iHash = hash.create();
        if (typeof this.iHash.update !== 'function') throw new Error('Expected instance of class which extends utils.Hash');
        this.blockLen = this.iHash.blockLen;
        this.outputLen = this.iHash.outputLen;
        const blockLen = this.blockLen;
        const pad = new Uint8Array(blockLen);
        // blockLen can be bigger than outputLen
        pad.set(key.length > blockLen ? hash.create().update(key).digest() : key);
        for(let i = 0; i < pad.length; i++)pad[i] ^= 0x36;
        this.iHash.update(pad);
        // By doing update (processing of first block) of outer hash here we can re-use it between multiple calls via clone
        this.oHash = hash.create();
        // Undo internal XOR && apply outer XOR
        for(let i = 0; i < pad.length; i++)pad[i] ^= 0x36 ^ 0x5c;
        this.oHash.update(pad);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clean"])(pad);
    }
}
const hmac = (hash, key, message)=>new HMAC(hash, key).update(message).digest();
hmac.create = (hash, key)=>new HMAC(hash, key); //# sourceMappingURL=hmac.js.map
}),
"[project]/node_modules/@noble/hashes/esm/pbkdf2.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

/**
 * PBKDF (RFC 2898). Can be used to create a key from password and salt.
 * @module
 */ __turbopack_context__.s({
    "pbkdf2": ()=>pbkdf2,
    "pbkdf2Async": ()=>pbkdf2Async
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$hmac$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@noble/hashes/esm/hmac.js [app-client] (ecmascript)");
// prettier-ignore
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@noble/hashes/esm/utils.js [app-client] (ecmascript)");
;
;
// Common prologue and epilogue for sync/async functions
function pbkdf2Init(hash, _password, _salt, _opts) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ahash"])(hash);
    const opts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["checkOpts"])({
        dkLen: 32,
        asyncTick: 10
    }, _opts);
    const { c, dkLen, asyncTick } = opts;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["anumber"])(c);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["anumber"])(dkLen);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["anumber"])(asyncTick);
    if (c < 1) throw new Error('iterations (c) should be >= 1');
    const password = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["kdfInputToBytes"])(_password);
    const salt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["kdfInputToBytes"])(_salt);
    // DK = PBKDF2(PRF, Password, Salt, c, dkLen);
    const DK = new Uint8Array(dkLen);
    // U1 = PRF(Password, Salt + INT_32_BE(i))
    const PRF = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$hmac$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hmac"].create(hash, password);
    const PRFSalt = PRF._cloneInto().update(salt);
    return {
        c,
        dkLen,
        asyncTick,
        DK,
        PRF,
        PRFSalt
    };
}
function pbkdf2Output(PRF, PRFSalt, DK, prfW, u) {
    PRF.destroy();
    PRFSalt.destroy();
    if (prfW) prfW.destroy();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clean"])(u);
    return DK;
}
function pbkdf2(hash, password, salt, opts) {
    const { c, dkLen, DK, PRF, PRFSalt } = pbkdf2Init(hash, password, salt, opts);
    let prfW; // Working copy
    const arr = new Uint8Array(4);
    const view = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createView"])(arr);
    const u = new Uint8Array(PRF.outputLen);
    // DK = T1 + T2 + ⋯ + Tdklen/hlen
    for(let ti = 1, pos = 0; pos < dkLen; ti++, pos += PRF.outputLen){
        // Ti = F(Password, Salt, c, i)
        const Ti = DK.subarray(pos, pos + PRF.outputLen);
        view.setInt32(0, ti, false);
        // F(Password, Salt, c, i) = U1 ^ U2 ^ ⋯ ^ Uc
        // U1 = PRF(Password, Salt + INT_32_BE(i))
        (prfW = PRFSalt._cloneInto(prfW)).update(arr).digestInto(u);
        Ti.set(u.subarray(0, Ti.length));
        for(let ui = 1; ui < c; ui++){
            // Uc = PRF(Password, Uc−1)
            PRF._cloneInto(prfW).update(u).digestInto(u);
            for(let i = 0; i < Ti.length; i++)Ti[i] ^= u[i];
        }
    }
    return pbkdf2Output(PRF, PRFSalt, DK, prfW, u);
}
async function pbkdf2Async(hash, password, salt, opts) {
    const { c, dkLen, asyncTick, DK, PRF, PRFSalt } = pbkdf2Init(hash, password, salt, opts);
    let prfW; // Working copy
    const arr = new Uint8Array(4);
    const view = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createView"])(arr);
    const u = new Uint8Array(PRF.outputLen);
    // DK = T1 + T2 + ⋯ + Tdklen/hlen
    for(let ti = 1, pos = 0; pos < dkLen; ti++, pos += PRF.outputLen){
        // Ti = F(Password, Salt, c, i)
        const Ti = DK.subarray(pos, pos + PRF.outputLen);
        view.setInt32(0, ti, false);
        // F(Password, Salt, c, i) = U1 ^ U2 ^ ⋯ ^ Uc
        // U1 = PRF(Password, Salt + INT_32_BE(i))
        (prfW = PRFSalt._cloneInto(prfW)).update(arr).digestInto(u);
        Ti.set(u.subarray(0, Ti.length));
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["asyncLoop"])(c - 1, asyncTick, ()=>{
            // Uc = PRF(Password, Uc−1)
            PRF._cloneInto(prfW).update(u).digestInto(u);
            for(let i = 0; i < Ti.length; i++)Ti[i] ^= u[i];
        });
    }
    return pbkdf2Output(PRF, PRFSalt, DK, prfW, u);
} //# sourceMappingURL=pbkdf2.js.map
}),
"[project]/node_modules/@noble/hashes/esm/_md.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

/**
 * Internal Merkle-Damgard hash utils.
 * @module
 */ __turbopack_context__.s({
    "Chi": ()=>Chi,
    "HashMD": ()=>HashMD,
    "Maj": ()=>Maj,
    "SHA224_IV": ()=>SHA224_IV,
    "SHA256_IV": ()=>SHA256_IV,
    "SHA384_IV": ()=>SHA384_IV,
    "SHA512_IV": ()=>SHA512_IV,
    "setBigUint64": ()=>setBigUint64
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@noble/hashes/esm/utils.js [app-client] (ecmascript)");
;
function setBigUint64(view, byteOffset, value, isLE) {
    if (typeof view.setBigUint64 === 'function') return view.setBigUint64(byteOffset, value, isLE);
    const _32n = BigInt(32);
    const _u32_max = BigInt(0xffffffff);
    const wh = Number(value >> _32n & _u32_max);
    const wl = Number(value & _u32_max);
    const h = isLE ? 4 : 0;
    const l = isLE ? 0 : 4;
    view.setUint32(byteOffset + h, wh, isLE);
    view.setUint32(byteOffset + l, wl, isLE);
}
function Chi(a, b, c) {
    return a & b ^ ~a & c;
}
function Maj(a, b, c) {
    return a & b ^ a & c ^ b & c;
}
class HashMD extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Hash"] {
    update(data) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["aexists"])(this);
        data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toBytes"])(data);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["abytes"])(data);
        const { view, buffer, blockLen } = this;
        const len = data.length;
        for(let pos = 0; pos < len;){
            const take = Math.min(blockLen - this.pos, len - pos);
            // Fast path: we have at least one block in input, cast it to view and process
            if (take === blockLen) {
                const dataView = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createView"])(data);
                for(; blockLen <= len - pos; pos += blockLen)this.process(dataView, pos);
                continue;
            }
            buffer.set(data.subarray(pos, pos + take), this.pos);
            this.pos += take;
            pos += take;
            if (this.pos === blockLen) {
                this.process(view, 0);
                this.pos = 0;
            }
        }
        this.length += data.length;
        this.roundClean();
        return this;
    }
    digestInto(out) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["aexists"])(this);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["aoutput"])(out, this);
        this.finished = true;
        // Padding
        // We can avoid allocation of buffer for padding completely if it
        // was previously not allocated here. But it won't change performance.
        const { buffer, view, blockLen, isLE } = this;
        let { pos } = this;
        // append the bit '1' to the message
        buffer[pos++] = 0b10000000;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clean"])(this.buffer.subarray(pos));
        // we have less than padOffset left in buffer, so we cannot put length in
        // current block, need process it and pad again
        if (this.padOffset > blockLen - pos) {
            this.process(view, 0);
            pos = 0;
        }
        // Pad until full block byte with zeros
        for(let i = pos; i < blockLen; i++)buffer[i] = 0;
        // Note: sha512 requires length to be 128bit integer, but length in JS will overflow before that
        // You need to write around 2 exabytes (u64_max / 8 / (1024**6)) for this to happen.
        // So we just write lowest 64 bits of that value.
        setBigUint64(view, blockLen - 8, BigInt(this.length * 8), isLE);
        this.process(view, 0);
        const oview = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createView"])(out);
        const len = this.outputLen;
        // NOTE: we do division by 4 later, which should be fused in single op with modulo by JIT
        if (len % 4) throw new Error('_sha2: outputLen should be aligned to 32bit');
        const outLen = len / 4;
        const state = this.get();
        if (outLen > state.length) throw new Error('_sha2: outputLen bigger than state');
        for(let i = 0; i < outLen; i++)oview.setUint32(4 * i, state[i], isLE);
    }
    digest() {
        const { buffer, outputLen } = this;
        this.digestInto(buffer);
        const res = buffer.slice(0, outputLen);
        this.destroy();
        return res;
    }
    _cloneInto(to) {
        to || (to = new this.constructor());
        to.set(...this.get());
        const { blockLen, buffer, length, finished, destroyed, pos } = this;
        to.destroyed = destroyed;
        to.finished = finished;
        to.length = length;
        to.pos = pos;
        if (length % blockLen) to.buffer.set(buffer);
        return to;
    }
    clone() {
        return this._cloneInto();
    }
    constructor(blockLen, outputLen, padOffset, isLE){
        super();
        this.finished = false;
        this.length = 0;
        this.pos = 0;
        this.destroyed = false;
        this.blockLen = blockLen;
        this.outputLen = outputLen;
        this.padOffset = padOffset;
        this.isLE = isLE;
        this.buffer = new Uint8Array(blockLen);
        this.view = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createView"])(this.buffer);
    }
}
const SHA256_IV = /* @__PURE__ */ Uint32Array.from([
    0x6a09e667,
    0xbb67ae85,
    0x3c6ef372,
    0xa54ff53a,
    0x510e527f,
    0x9b05688c,
    0x1f83d9ab,
    0x5be0cd19
]);
const SHA224_IV = /* @__PURE__ */ Uint32Array.from([
    0xc1059ed8,
    0x367cd507,
    0x3070dd17,
    0xf70e5939,
    0xffc00b31,
    0x68581511,
    0x64f98fa7,
    0xbefa4fa4
]);
const SHA384_IV = /* @__PURE__ */ Uint32Array.from([
    0xcbbb9d5d,
    0xc1059ed8,
    0x629a292a,
    0x367cd507,
    0x9159015a,
    0x3070dd17,
    0x152fecd8,
    0xf70e5939,
    0x67332667,
    0xffc00b31,
    0x8eb44a87,
    0x68581511,
    0xdb0c2e0d,
    0x64f98fa7,
    0x47b5481d,
    0xbefa4fa4
]);
const SHA512_IV = /* @__PURE__ */ Uint32Array.from([
    0x6a09e667,
    0xf3bcc908,
    0xbb67ae85,
    0x84caa73b,
    0x3c6ef372,
    0xfe94f82b,
    0xa54ff53a,
    0x5f1d36f1,
    0x510e527f,
    0xade682d1,
    0x9b05688c,
    0x2b3e6c1f,
    0x1f83d9ab,
    0xfb41bd6b,
    0x5be0cd19,
    0x137e2179
]); //# sourceMappingURL=_md.js.map
}),
"[project]/node_modules/@noble/hashes/esm/_u64.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

/**
 * Internal helpers for u64. BigUint64Array is too slow as per 2025, so we implement it using Uint32Array.
 * @todo re-check https://issues.chromium.org/issues/42212588
 * @module
 */ __turbopack_context__.s({
    "add": ()=>add,
    "add3H": ()=>add3H,
    "add3L": ()=>add3L,
    "add4H": ()=>add4H,
    "add4L": ()=>add4L,
    "add5H": ()=>add5H,
    "add5L": ()=>add5L,
    "default": ()=>__TURBOPACK__default__export__,
    "fromBig": ()=>fromBig,
    "rotlBH": ()=>rotlBH,
    "rotlBL": ()=>rotlBL,
    "rotlSH": ()=>rotlSH,
    "rotlSL": ()=>rotlSL,
    "rotr32H": ()=>rotr32H,
    "rotr32L": ()=>rotr32L,
    "rotrBH": ()=>rotrBH,
    "rotrBL": ()=>rotrBL,
    "rotrSH": ()=>rotrSH,
    "rotrSL": ()=>rotrSL,
    "shrSH": ()=>shrSH,
    "shrSL": ()=>shrSL,
    "split": ()=>split,
    "toBig": ()=>toBig
});
const U32_MASK64 = /* @__PURE__ */ BigInt(2 ** 32 - 1);
const _32n = /* @__PURE__ */ BigInt(32);
function fromBig(n) {
    let le = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
    if (le) return {
        h: Number(n & U32_MASK64),
        l: Number(n >> _32n & U32_MASK64)
    };
    return {
        h: Number(n >> _32n & U32_MASK64) | 0,
        l: Number(n & U32_MASK64) | 0
    };
}
function split(lst) {
    let le = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
    const len = lst.length;
    let Ah = new Uint32Array(len);
    let Al = new Uint32Array(len);
    for(let i = 0; i < len; i++){
        const { h, l } = fromBig(lst[i], le);
        [Ah[i], Al[i]] = [
            h,
            l
        ];
    }
    return [
        Ah,
        Al
    ];
}
const toBig = (h, l)=>BigInt(h >>> 0) << _32n | BigInt(l >>> 0);
// for Shift in [0, 32)
const shrSH = (h, _l, s)=>h >>> s;
const shrSL = (h, l, s)=>h << 32 - s | l >>> s;
// Right rotate for Shift in [1, 32)
const rotrSH = (h, l, s)=>h >>> s | l << 32 - s;
const rotrSL = (h, l, s)=>h << 32 - s | l >>> s;
// Right rotate for Shift in (32, 64), NOTE: 32 is special case.
const rotrBH = (h, l, s)=>h << 64 - s | l >>> s - 32;
const rotrBL = (h, l, s)=>h >>> s - 32 | l << 64 - s;
// Right rotate for shift===32 (just swaps l&h)
const rotr32H = (_h, l)=>l;
const rotr32L = (h, _l)=>h;
// Left rotate for Shift in [1, 32)
const rotlSH = (h, l, s)=>h << s | l >>> 32 - s;
const rotlSL = (h, l, s)=>l << s | h >>> 32 - s;
// Left rotate for Shift in (32, 64), NOTE: 32 is special case.
const rotlBH = (h, l, s)=>l << s - 32 | h >>> 64 - s;
const rotlBL = (h, l, s)=>h << s - 32 | l >>> 64 - s;
// JS uses 32-bit signed integers for bitwise operations which means we cannot
// simple take carry out of low bit sum by shift, we need to use division.
function add(Ah, Al, Bh, Bl) {
    const l = (Al >>> 0) + (Bl >>> 0);
    return {
        h: Ah + Bh + (l / 2 ** 32 | 0) | 0,
        l: l | 0
    };
}
// Addition with more than 2 elements
const add3L = (Al, Bl, Cl)=>(Al >>> 0) + (Bl >>> 0) + (Cl >>> 0);
const add3H = (low, Ah, Bh, Ch)=>Ah + Bh + Ch + (low / 2 ** 32 | 0) | 0;
const add4L = (Al, Bl, Cl, Dl)=>(Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0);
const add4H = (low, Ah, Bh, Ch, Dh)=>Ah + Bh + Ch + Dh + (low / 2 ** 32 | 0) | 0;
const add5L = (Al, Bl, Cl, Dl, El)=>(Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0) + (El >>> 0);
const add5H = (low, Ah, Bh, Ch, Dh, Eh)=>Ah + Bh + Ch + Dh + Eh + (low / 2 ** 32 | 0) | 0;
;
// prettier-ignore
const u64 = {
    fromBig,
    split,
    toBig,
    shrSH,
    shrSL,
    rotrSH,
    rotrSL,
    rotrBH,
    rotrBL,
    rotr32H,
    rotr32L,
    rotlSH,
    rotlSL,
    rotlBH,
    rotlBL,
    add,
    add3L,
    add3H,
    add4L,
    add4H,
    add5H,
    add5L
};
const __TURBOPACK__default__export__ = u64;
 //# sourceMappingURL=_u64.js.map
}),
"[project]/node_modules/@noble/hashes/esm/sha2.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

/**
 * SHA2 hash function. A.k.a. sha256, sha384, sha512, sha512_224, sha512_256.
 * SHA256 is the fastest hash implementable in JS, even faster than Blake3.
 * Check out [RFC 4634](https://datatracker.ietf.org/doc/html/rfc4634) and
 * [FIPS 180-4](https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.180-4.pdf).
 * @module
 */ __turbopack_context__.s({
    "SHA224": ()=>SHA224,
    "SHA256": ()=>SHA256,
    "SHA384": ()=>SHA384,
    "SHA512": ()=>SHA512,
    "SHA512_224": ()=>SHA512_224,
    "SHA512_256": ()=>SHA512_256,
    "sha224": ()=>sha224,
    "sha256": ()=>sha256,
    "sha384": ()=>sha384,
    "sha512": ()=>sha512,
    "sha512_224": ()=>sha512_224,
    "sha512_256": ()=>sha512_256
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@noble/hashes/esm/_md.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@noble/hashes/esm/_u64.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@noble/hashes/esm/utils.js [app-client] (ecmascript)");
;
;
;
/**
 * Round constants:
 * First 32 bits of fractional parts of the cube roots of the first 64 primes 2..311)
 */ // prettier-ignore
const SHA256_K = /* @__PURE__ */ Uint32Array.from([
    0x428a2f98,
    0x71374491,
    0xb5c0fbcf,
    0xe9b5dba5,
    0x3956c25b,
    0x59f111f1,
    0x923f82a4,
    0xab1c5ed5,
    0xd807aa98,
    0x12835b01,
    0x243185be,
    0x550c7dc3,
    0x72be5d74,
    0x80deb1fe,
    0x9bdc06a7,
    0xc19bf174,
    0xe49b69c1,
    0xefbe4786,
    0x0fc19dc6,
    0x240ca1cc,
    0x2de92c6f,
    0x4a7484aa,
    0x5cb0a9dc,
    0x76f988da,
    0x983e5152,
    0xa831c66d,
    0xb00327c8,
    0xbf597fc7,
    0xc6e00bf3,
    0xd5a79147,
    0x06ca6351,
    0x14292967,
    0x27b70a85,
    0x2e1b2138,
    0x4d2c6dfc,
    0x53380d13,
    0x650a7354,
    0x766a0abb,
    0x81c2c92e,
    0x92722c85,
    0xa2bfe8a1,
    0xa81a664b,
    0xc24b8b70,
    0xc76c51a3,
    0xd192e819,
    0xd6990624,
    0xf40e3585,
    0x106aa070,
    0x19a4c116,
    0x1e376c08,
    0x2748774c,
    0x34b0bcb5,
    0x391c0cb3,
    0x4ed8aa4a,
    0x5b9cca4f,
    0x682e6ff3,
    0x748f82ee,
    0x78a5636f,
    0x84c87814,
    0x8cc70208,
    0x90befffa,
    0xa4506ceb,
    0xbef9a3f7,
    0xc67178f2
]);
/** Reusable temporary buffer. "W" comes straight from spec. */ const SHA256_W = /* @__PURE__ */ new Uint32Array(64);
class SHA256 extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HashMD"] {
    get() {
        const { A, B, C, D, E, F, G, H } = this;
        return [
            A,
            B,
            C,
            D,
            E,
            F,
            G,
            H
        ];
    }
    // prettier-ignore
    set(A, B, C, D, E, F, G, H) {
        this.A = A | 0;
        this.B = B | 0;
        this.C = C | 0;
        this.D = D | 0;
        this.E = E | 0;
        this.F = F | 0;
        this.G = G | 0;
        this.H = H | 0;
    }
    process(view, offset) {
        // Extend the first 16 words into the remaining 48 words w[16..63] of the message schedule array
        for(let i = 0; i < 16; i++, offset += 4)SHA256_W[i] = view.getUint32(offset, false);
        for(let i = 16; i < 64; i++){
            const W15 = SHA256_W[i - 15];
            const W2 = SHA256_W[i - 2];
            const s0 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotr"])(W15, 7) ^ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotr"])(W15, 18) ^ W15 >>> 3;
            const s1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotr"])(W2, 17) ^ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotr"])(W2, 19) ^ W2 >>> 10;
            SHA256_W[i] = s1 + SHA256_W[i - 7] + s0 + SHA256_W[i - 16] | 0;
        }
        // Compression function main loop, 64 rounds
        let { A, B, C, D, E, F, G, H } = this;
        for(let i = 0; i < 64; i++){
            const sigma1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotr"])(E, 6) ^ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotr"])(E, 11) ^ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotr"])(E, 25);
            const T1 = H + sigma1 + (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Chi"])(E, F, G) + SHA256_K[i] + SHA256_W[i] | 0;
            const sigma0 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotr"])(A, 2) ^ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotr"])(A, 13) ^ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotr"])(A, 22);
            const T2 = sigma0 + (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Maj"])(A, B, C) | 0;
            H = G;
            G = F;
            F = E;
            E = D + T1 | 0;
            D = C;
            C = B;
            B = A;
            A = T1 + T2 | 0;
        }
        // Add the compressed chunk to the current hash value
        A = A + this.A | 0;
        B = B + this.B | 0;
        C = C + this.C | 0;
        D = D + this.D | 0;
        E = E + this.E | 0;
        F = F + this.F | 0;
        G = G + this.G | 0;
        H = H + this.H | 0;
        this.set(A, B, C, D, E, F, G, H);
    }
    roundClean() {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clean"])(SHA256_W);
    }
    destroy() {
        this.set(0, 0, 0, 0, 0, 0, 0, 0);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clean"])(this.buffer);
    }
    constructor(outputLen = 32){
        super(64, outputLen, 8, false);
        // We cannot use array here since array allows indexing by variable
        // which means optimizer/compiler cannot use registers.
        this.A = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHA256_IV"][0] | 0;
        this.B = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHA256_IV"][1] | 0;
        this.C = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHA256_IV"][2] | 0;
        this.D = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHA256_IV"][3] | 0;
        this.E = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHA256_IV"][4] | 0;
        this.F = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHA256_IV"][5] | 0;
        this.G = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHA256_IV"][6] | 0;
        this.H = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHA256_IV"][7] | 0;
    }
}
class SHA224 extends SHA256 {
    constructor(){
        super(28);
        this.A = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHA224_IV"][0] | 0;
        this.B = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHA224_IV"][1] | 0;
        this.C = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHA224_IV"][2] | 0;
        this.D = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHA224_IV"][3] | 0;
        this.E = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHA224_IV"][4] | 0;
        this.F = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHA224_IV"][5] | 0;
        this.G = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHA224_IV"][6] | 0;
        this.H = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHA224_IV"][7] | 0;
    }
}
// SHA2-512 is slower than sha256 in js because u64 operations are slow.
// Round contants
// First 32 bits of the fractional parts of the cube roots of the first 80 primes 2..409
// prettier-ignore
const K512 = /* @__PURE__ */ (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["split"]([
        '0x428a2f98d728ae22',
        '0x7137449123ef65cd',
        '0xb5c0fbcfec4d3b2f',
        '0xe9b5dba58189dbbc',
        '0x3956c25bf348b538',
        '0x59f111f1b605d019',
        '0x923f82a4af194f9b',
        '0xab1c5ed5da6d8118',
        '0xd807aa98a3030242',
        '0x12835b0145706fbe',
        '0x243185be4ee4b28c',
        '0x550c7dc3d5ffb4e2',
        '0x72be5d74f27b896f',
        '0x80deb1fe3b1696b1',
        '0x9bdc06a725c71235',
        '0xc19bf174cf692694',
        '0xe49b69c19ef14ad2',
        '0xefbe4786384f25e3',
        '0x0fc19dc68b8cd5b5',
        '0x240ca1cc77ac9c65',
        '0x2de92c6f592b0275',
        '0x4a7484aa6ea6e483',
        '0x5cb0a9dcbd41fbd4',
        '0x76f988da831153b5',
        '0x983e5152ee66dfab',
        '0xa831c66d2db43210',
        '0xb00327c898fb213f',
        '0xbf597fc7beef0ee4',
        '0xc6e00bf33da88fc2',
        '0xd5a79147930aa725',
        '0x06ca6351e003826f',
        '0x142929670a0e6e70',
        '0x27b70a8546d22ffc',
        '0x2e1b21385c26c926',
        '0x4d2c6dfc5ac42aed',
        '0x53380d139d95b3df',
        '0x650a73548baf63de',
        '0x766a0abb3c77b2a8',
        '0x81c2c92e47edaee6',
        '0x92722c851482353b',
        '0xa2bfe8a14cf10364',
        '0xa81a664bbc423001',
        '0xc24b8b70d0f89791',
        '0xc76c51a30654be30',
        '0xd192e819d6ef5218',
        '0xd69906245565a910',
        '0xf40e35855771202a',
        '0x106aa07032bbd1b8',
        '0x19a4c116b8d2d0c8',
        '0x1e376c085141ab53',
        '0x2748774cdf8eeb99',
        '0x34b0bcb5e19b48a8',
        '0x391c0cb3c5c95a63',
        '0x4ed8aa4ae3418acb',
        '0x5b9cca4f7763e373',
        '0x682e6ff3d6b2b8a3',
        '0x748f82ee5defb2fc',
        '0x78a5636f43172f60',
        '0x84c87814a1f0ab72',
        '0x8cc702081a6439ec',
        '0x90befffa23631e28',
        '0xa4506cebde82bde9',
        '0xbef9a3f7b2c67915',
        '0xc67178f2e372532b',
        '0xca273eceea26619c',
        '0xd186b8c721c0c207',
        '0xeada7dd6cde0eb1e',
        '0xf57d4f7fee6ed178',
        '0x06f067aa72176fba',
        '0x0a637dc5a2c898a6',
        '0x113f9804bef90dae',
        '0x1b710b35131c471b',
        '0x28db77f523047d84',
        '0x32caab7b40c72493',
        '0x3c9ebe0a15c9bebc',
        '0x431d67c49c100d4c',
        '0x4cc5d4becb3e42b6',
        '0x597f299cfc657e2a',
        '0x5fcb6fab3ad6faec',
        '0x6c44198c4a475817'
    ].map((n)=>BigInt(n))))();
const SHA512_Kh = /* @__PURE__ */ (()=>K512[0])();
const SHA512_Kl = /* @__PURE__ */ (()=>K512[1])();
// Reusable temporary buffers
const SHA512_W_H = /* @__PURE__ */ new Uint32Array(80);
const SHA512_W_L = /* @__PURE__ */ new Uint32Array(80);
class SHA512 extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HashMD"] {
    // prettier-ignore
    get() {
        const { Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl } = this;
        return [
            Ah,
            Al,
            Bh,
            Bl,
            Ch,
            Cl,
            Dh,
            Dl,
            Eh,
            El,
            Fh,
            Fl,
            Gh,
            Gl,
            Hh,
            Hl
        ];
    }
    // prettier-ignore
    set(Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl) {
        this.Ah = Ah | 0;
        this.Al = Al | 0;
        this.Bh = Bh | 0;
        this.Bl = Bl | 0;
        this.Ch = Ch | 0;
        this.Cl = Cl | 0;
        this.Dh = Dh | 0;
        this.Dl = Dl | 0;
        this.Eh = Eh | 0;
        this.El = El | 0;
        this.Fh = Fh | 0;
        this.Fl = Fl | 0;
        this.Gh = Gh | 0;
        this.Gl = Gl | 0;
        this.Hh = Hh | 0;
        this.Hl = Hl | 0;
    }
    process(view, offset) {
        // Extend the first 16 words into the remaining 64 words w[16..79] of the message schedule array
        for(let i = 0; i < 16; i++, offset += 4){
            SHA512_W_H[i] = view.getUint32(offset);
            SHA512_W_L[i] = view.getUint32(offset += 4);
        }
        for(let i = 16; i < 80; i++){
            // s0 := (w[i-15] rightrotate 1) xor (w[i-15] rightrotate 8) xor (w[i-15] rightshift 7)
            const W15h = SHA512_W_H[i - 15] | 0;
            const W15l = SHA512_W_L[i - 15] | 0;
            const s0h = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotrSH"](W15h, W15l, 1) ^ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotrSH"](W15h, W15l, 8) ^ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shrSH"](W15h, W15l, 7);
            const s0l = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotrSL"](W15h, W15l, 1) ^ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotrSL"](W15h, W15l, 8) ^ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shrSL"](W15h, W15l, 7);
            // s1 := (w[i-2] rightrotate 19) xor (w[i-2] rightrotate 61) xor (w[i-2] rightshift 6)
            const W2h = SHA512_W_H[i - 2] | 0;
            const W2l = SHA512_W_L[i - 2] | 0;
            const s1h = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotrSH"](W2h, W2l, 19) ^ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotrBH"](W2h, W2l, 61) ^ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shrSH"](W2h, W2l, 6);
            const s1l = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotrSL"](W2h, W2l, 19) ^ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotrBL"](W2h, W2l, 61) ^ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["shrSL"](W2h, W2l, 6);
            // SHA256_W[i] = s0 + s1 + SHA256_W[i - 7] + SHA256_W[i - 16];
            const SUMl = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["add4L"](s0l, s1l, SHA512_W_L[i - 7], SHA512_W_L[i - 16]);
            const SUMh = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["add4H"](SUMl, s0h, s1h, SHA512_W_H[i - 7], SHA512_W_H[i - 16]);
            SHA512_W_H[i] = SUMh | 0;
            SHA512_W_L[i] = SUMl | 0;
        }
        let { Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl } = this;
        // Compression function main loop, 80 rounds
        for(let i = 0; i < 80; i++){
            // S1 := (e rightrotate 14) xor (e rightrotate 18) xor (e rightrotate 41)
            const sigma1h = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotrSH"](Eh, El, 14) ^ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotrSH"](Eh, El, 18) ^ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotrBH"](Eh, El, 41);
            const sigma1l = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotrSL"](Eh, El, 14) ^ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotrSL"](Eh, El, 18) ^ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotrBL"](Eh, El, 41);
            //const T1 = (H + sigma1 + Chi(E, F, G) + SHA256_K[i] + SHA256_W[i]) | 0;
            const CHIh = Eh & Fh ^ ~Eh & Gh;
            const CHIl = El & Fl ^ ~El & Gl;
            // T1 = H + sigma1 + Chi(E, F, G) + SHA512_K[i] + SHA512_W[i]
            // prettier-ignore
            const T1ll = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["add5L"](Hl, sigma1l, CHIl, SHA512_Kl[i], SHA512_W_L[i]);
            const T1h = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["add5H"](T1ll, Hh, sigma1h, CHIh, SHA512_Kh[i], SHA512_W_H[i]);
            const T1l = T1ll | 0;
            // S0 := (a rightrotate 28) xor (a rightrotate 34) xor (a rightrotate 39)
            const sigma0h = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotrSH"](Ah, Al, 28) ^ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotrBH"](Ah, Al, 34) ^ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotrBH"](Ah, Al, 39);
            const sigma0l = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotrSL"](Ah, Al, 28) ^ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotrBL"](Ah, Al, 34) ^ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotrBL"](Ah, Al, 39);
            const MAJh = Ah & Bh ^ Ah & Ch ^ Bh & Ch;
            const MAJl = Al & Bl ^ Al & Cl ^ Bl & Cl;
            Hh = Gh | 0;
            Hl = Gl | 0;
            Gh = Fh | 0;
            Gl = Fl | 0;
            Fh = Eh | 0;
            Fl = El | 0;
            ({ h: Eh, l: El } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["add"](Dh | 0, Dl | 0, T1h | 0, T1l | 0));
            Dh = Ch | 0;
            Dl = Cl | 0;
            Ch = Bh | 0;
            Cl = Bl | 0;
            Bh = Ah | 0;
            Bl = Al | 0;
            const All = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["add3L"](T1l, sigma0l, MAJl);
            Ah = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["add3H"](All, T1h, sigma0h, MAJh);
            Al = All | 0;
        }
        // Add the compressed chunk to the current hash value
        ({ h: Ah, l: Al } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["add"](this.Ah | 0, this.Al | 0, Ah | 0, Al | 0));
        ({ h: Bh, l: Bl } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["add"](this.Bh | 0, this.Bl | 0, Bh | 0, Bl | 0));
        ({ h: Ch, l: Cl } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["add"](this.Ch | 0, this.Cl | 0, Ch | 0, Cl | 0));
        ({ h: Dh, l: Dl } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["add"](this.Dh | 0, this.Dl | 0, Dh | 0, Dl | 0));
        ({ h: Eh, l: El } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["add"](this.Eh | 0, this.El | 0, Eh | 0, El | 0));
        ({ h: Fh, l: Fl } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["add"](this.Fh | 0, this.Fl | 0, Fh | 0, Fl | 0));
        ({ h: Gh, l: Gl } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["add"](this.Gh | 0, this.Gl | 0, Gh | 0, Gl | 0));
        ({ h: Hh, l: Hl } = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["add"](this.Hh | 0, this.Hl | 0, Hh | 0, Hl | 0));
        this.set(Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl);
    }
    roundClean() {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clean"])(SHA512_W_H, SHA512_W_L);
    }
    destroy() {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clean"])(this.buffer);
        this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    }
    constructor(outputLen = 64){
        super(128, outputLen, 16, false);
        // We cannot use array here since array allows indexing by variable
        // which means optimizer/compiler cannot use registers.
        // h -- high 32 bits, l -- low 32 bits
        this.Ah = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHA512_IV"][0] | 0;
        this.Al = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHA512_IV"][1] | 0;
        this.Bh = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHA512_IV"][2] | 0;
        this.Bl = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHA512_IV"][3] | 0;
        this.Ch = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHA512_IV"][4] | 0;
        this.Cl = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHA512_IV"][5] | 0;
        this.Dh = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHA512_IV"][6] | 0;
        this.Dl = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHA512_IV"][7] | 0;
        this.Eh = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHA512_IV"][8] | 0;
        this.El = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHA512_IV"][9] | 0;
        this.Fh = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHA512_IV"][10] | 0;
        this.Fl = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHA512_IV"][11] | 0;
        this.Gh = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHA512_IV"][12] | 0;
        this.Gl = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHA512_IV"][13] | 0;
        this.Hh = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHA512_IV"][14] | 0;
        this.Hl = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHA512_IV"][15] | 0;
    }
}
class SHA384 extends SHA512 {
    constructor(){
        super(48);
        this.Ah = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHA384_IV"][0] | 0;
        this.Al = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHA384_IV"][1] | 0;
        this.Bh = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHA384_IV"][2] | 0;
        this.Bl = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHA384_IV"][3] | 0;
        this.Ch = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHA384_IV"][4] | 0;
        this.Cl = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHA384_IV"][5] | 0;
        this.Dh = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHA384_IV"][6] | 0;
        this.Dl = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHA384_IV"][7] | 0;
        this.Eh = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHA384_IV"][8] | 0;
        this.El = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHA384_IV"][9] | 0;
        this.Fh = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHA384_IV"][10] | 0;
        this.Fl = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHA384_IV"][11] | 0;
        this.Gh = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHA384_IV"][12] | 0;
        this.Gl = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHA384_IV"][13] | 0;
        this.Hh = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHA384_IV"][14] | 0;
        this.Hl = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_md$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHA384_IV"][15] | 0;
    }
}
/**
 * Truncated SHA512/256 and SHA512/224.
 * SHA512_IV is XORed with 0xa5a5a5a5a5a5a5a5, then used as "intermediary" IV of SHA512/t.
 * Then t hashes string to produce result IV.
 * See `test/misc/sha2-gen-iv.js`.
 */ /** SHA512/224 IV */ const T224_IV = /* @__PURE__ */ Uint32Array.from([
    0x8c3d37c8,
    0x19544da2,
    0x73e19966,
    0x89dcd4d6,
    0x1dfab7ae,
    0x32ff9c82,
    0x679dd514,
    0x582f9fcf,
    0x0f6d2b69,
    0x7bd44da8,
    0x77e36f73,
    0x04c48942,
    0x3f9d85a8,
    0x6a1d36c8,
    0x1112e6ad,
    0x91d692a1
]);
/** SHA512/256 IV */ const T256_IV = /* @__PURE__ */ Uint32Array.from([
    0x22312194,
    0xfc2bf72c,
    0x9f555fa3,
    0xc84c64c2,
    0x2393b86b,
    0x6f53b151,
    0x96387719,
    0x5940eabd,
    0x96283ee2,
    0xa88effe3,
    0xbe5e1e25,
    0x53863992,
    0x2b0199fc,
    0x2c85b8aa,
    0x0eb72ddc,
    0x81c52ca2
]);
class SHA512_224 extends SHA512 {
    constructor(){
        super(28);
        this.Ah = T224_IV[0] | 0;
        this.Al = T224_IV[1] | 0;
        this.Bh = T224_IV[2] | 0;
        this.Bl = T224_IV[3] | 0;
        this.Ch = T224_IV[4] | 0;
        this.Cl = T224_IV[5] | 0;
        this.Dh = T224_IV[6] | 0;
        this.Dl = T224_IV[7] | 0;
        this.Eh = T224_IV[8] | 0;
        this.El = T224_IV[9] | 0;
        this.Fh = T224_IV[10] | 0;
        this.Fl = T224_IV[11] | 0;
        this.Gh = T224_IV[12] | 0;
        this.Gl = T224_IV[13] | 0;
        this.Hh = T224_IV[14] | 0;
        this.Hl = T224_IV[15] | 0;
    }
}
class SHA512_256 extends SHA512 {
    constructor(){
        super(32);
        this.Ah = T256_IV[0] | 0;
        this.Al = T256_IV[1] | 0;
        this.Bh = T256_IV[2] | 0;
        this.Bl = T256_IV[3] | 0;
        this.Ch = T256_IV[4] | 0;
        this.Cl = T256_IV[5] | 0;
        this.Dh = T256_IV[6] | 0;
        this.Dl = T256_IV[7] | 0;
        this.Eh = T256_IV[8] | 0;
        this.El = T256_IV[9] | 0;
        this.Fh = T256_IV[10] | 0;
        this.Fl = T256_IV[11] | 0;
        this.Gh = T256_IV[12] | 0;
        this.Gl = T256_IV[13] | 0;
        this.Hh = T256_IV[14] | 0;
        this.Hl = T256_IV[15] | 0;
    }
}
const sha256 = /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createHasher"])(()=>new SHA256());
const sha224 = /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createHasher"])(()=>new SHA224());
const sha512 = /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createHasher"])(()=>new SHA512());
const sha384 = /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createHasher"])(()=>new SHA384());
const sha512_256 = /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createHasher"])(()=>new SHA512_256());
const sha512_224 = /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createHasher"])(()=>new SHA512_224()); //# sourceMappingURL=sha2.js.map
}),
"[project]/node_modules/@noble/hashes/esm/scrypt.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

/**
 * RFC 7914 Scrypt KDF. Can be used to create a key from password and salt.
 * @module
 */ __turbopack_context__.s({
    "scrypt": ()=>scrypt,
    "scryptAsync": ()=>scryptAsync
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$pbkdf2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@noble/hashes/esm/pbkdf2.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$sha2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@noble/hashes/esm/sha2.js [app-client] (ecmascript)");
// prettier-ignore
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@noble/hashes/esm/utils.js [app-client] (ecmascript)");
;
;
;
// The main Scrypt loop: uses Salsa extensively.
// Six versions of the function were tried, this is the fastest one.
// prettier-ignore
function XorAndSalsa(prev, pi, input, ii, out, oi) {
    // Based on https://cr.yp.to/salsa20.html
    // Xor blocks
    let y00 = prev[pi++] ^ input[ii++], y01 = prev[pi++] ^ input[ii++];
    let y02 = prev[pi++] ^ input[ii++], y03 = prev[pi++] ^ input[ii++];
    let y04 = prev[pi++] ^ input[ii++], y05 = prev[pi++] ^ input[ii++];
    let y06 = prev[pi++] ^ input[ii++], y07 = prev[pi++] ^ input[ii++];
    let y08 = prev[pi++] ^ input[ii++], y09 = prev[pi++] ^ input[ii++];
    let y10 = prev[pi++] ^ input[ii++], y11 = prev[pi++] ^ input[ii++];
    let y12 = prev[pi++] ^ input[ii++], y13 = prev[pi++] ^ input[ii++];
    let y14 = prev[pi++] ^ input[ii++], y15 = prev[pi++] ^ input[ii++];
    // Save state to temporary variables (salsa)
    let x00 = y00, x01 = y01, x02 = y02, x03 = y03, x04 = y04, x05 = y05, x06 = y06, x07 = y07, x08 = y08, x09 = y09, x10 = y10, x11 = y11, x12 = y12, x13 = y13, x14 = y14, x15 = y15;
    // Main loop (salsa)
    for(let i = 0; i < 8; i += 2){
        x04 ^= (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(x00 + x12 | 0, 7);
        x08 ^= (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(x04 + x00 | 0, 9);
        x12 ^= (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(x08 + x04 | 0, 13);
        x00 ^= (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(x12 + x08 | 0, 18);
        x09 ^= (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(x05 + x01 | 0, 7);
        x13 ^= (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(x09 + x05 | 0, 9);
        x01 ^= (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(x13 + x09 | 0, 13);
        x05 ^= (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(x01 + x13 | 0, 18);
        x14 ^= (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(x10 + x06 | 0, 7);
        x02 ^= (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(x14 + x10 | 0, 9);
        x06 ^= (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(x02 + x14 | 0, 13);
        x10 ^= (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(x06 + x02 | 0, 18);
        x03 ^= (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(x15 + x11 | 0, 7);
        x07 ^= (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(x03 + x15 | 0, 9);
        x11 ^= (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(x07 + x03 | 0, 13);
        x15 ^= (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(x11 + x07 | 0, 18);
        x01 ^= (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(x00 + x03 | 0, 7);
        x02 ^= (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(x01 + x00 | 0, 9);
        x03 ^= (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(x02 + x01 | 0, 13);
        x00 ^= (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(x03 + x02 | 0, 18);
        x06 ^= (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(x05 + x04 | 0, 7);
        x07 ^= (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(x06 + x05 | 0, 9);
        x04 ^= (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(x07 + x06 | 0, 13);
        x05 ^= (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(x04 + x07 | 0, 18);
        x11 ^= (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(x10 + x09 | 0, 7);
        x08 ^= (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(x11 + x10 | 0, 9);
        x09 ^= (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(x08 + x11 | 0, 13);
        x10 ^= (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(x09 + x08 | 0, 18);
        x12 ^= (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(x15 + x14 | 0, 7);
        x13 ^= (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(x12 + x15 | 0, 9);
        x14 ^= (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(x13 + x12 | 0, 13);
        x15 ^= (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rotl"])(x14 + x13 | 0, 18);
    }
    // Write output (salsa)
    out[oi++] = y00 + x00 | 0;
    out[oi++] = y01 + x01 | 0;
    out[oi++] = y02 + x02 | 0;
    out[oi++] = y03 + x03 | 0;
    out[oi++] = y04 + x04 | 0;
    out[oi++] = y05 + x05 | 0;
    out[oi++] = y06 + x06 | 0;
    out[oi++] = y07 + x07 | 0;
    out[oi++] = y08 + x08 | 0;
    out[oi++] = y09 + x09 | 0;
    out[oi++] = y10 + x10 | 0;
    out[oi++] = y11 + x11 | 0;
    out[oi++] = y12 + x12 | 0;
    out[oi++] = y13 + x13 | 0;
    out[oi++] = y14 + x14 | 0;
    out[oi++] = y15 + x15 | 0;
}
function BlockMix(input, ii, out, oi, r) {
    // The block B is r 128-byte chunks (which is equivalent of 2r 64-byte chunks)
    let head = oi + 0;
    let tail = oi + 16 * r;
    for(let i = 0; i < 16; i++)out[tail + i] = input[ii + (2 * r - 1) * 16 + i]; // X ← B[2r−1]
    for(let i = 0; i < r; i++, head += 16, ii += 16){
        // We write odd & even Yi at same time. Even: 0bXXXXX0 Odd:  0bXXXXX1
        XorAndSalsa(out, tail, input, ii, out, head); // head[i] = Salsa(blockIn[2*i] ^ tail[i-1])
        if (i > 0) tail += 16; // First iteration overwrites tmp value in tail
        XorAndSalsa(out, head, input, ii += 16, out, tail); // tail[i] = Salsa(blockIn[2*i+1] ^ head[i])
    }
}
// Common prologue and epilogue for sync/async functions
function scryptInit(password, salt, _opts) {
    // Maxmem - 1GB+1KB by default
    const opts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["checkOpts"])({
        dkLen: 32,
        asyncTick: 10,
        maxmem: 1024 ** 3 + 1024
    }, _opts);
    const { N, r, p, dkLen, asyncTick, maxmem, onProgress } = opts;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["anumber"])(N);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["anumber"])(r);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["anumber"])(p);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["anumber"])(dkLen);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["anumber"])(asyncTick);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["anumber"])(maxmem);
    if (onProgress !== undefined && typeof onProgress !== 'function') throw new Error('progressCb should be function');
    const blockSize = 128 * r;
    const blockSize32 = blockSize / 4;
    // Max N is 2^32 (Integrify is 32-bit). Real limit is 2^22: JS engines Uint8Array limit is 4GB in 2024.
    // Spec check `N >= 2^(blockSize / 8)` is not done for compat with popular libs,
    // which used incorrect r: 1, p: 8. Also, the check seems to be a spec error:
    // https://www.rfc-editor.org/errata_search.php?rfc=7914
    const pow32 = Math.pow(2, 32);
    if (N <= 1 || (N & N - 1) !== 0 || N > pow32) {
        throw new Error('Scrypt: N must be larger than 1, a power of 2, and less than 2^32');
    }
    if (p < 0 || p > (pow32 - 1) * 32 / blockSize) {
        throw new Error('Scrypt: p must be a positive integer less than or equal to ((2^32 - 1) * 32) / (128 * r)');
    }
    if (dkLen < 0 || dkLen > (pow32 - 1) * 32) {
        throw new Error('Scrypt: dkLen should be positive integer less than or equal to (2^32 - 1) * 32');
    }
    const memUsed = blockSize * (N + p);
    if (memUsed > maxmem) {
        throw new Error('Scrypt: memused is bigger than maxMem. Expected 128 * r * (N + p) > maxmem of ' + maxmem);
    }
    // [B0...Bp−1] ← PBKDF2HMAC-SHA256(Passphrase, Salt, 1, blockSize*ParallelizationFactor)
    // Since it has only one iteration there is no reason to use async variant
    const B = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$pbkdf2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pbkdf2"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$sha2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sha256"], password, salt, {
        c: 1,
        dkLen: blockSize * p
    });
    const B32 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["u32"])(B);
    // Re-used between parallel iterations. Array(iterations) of B
    const V = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["u32"])(new Uint8Array(blockSize * N));
    const tmp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["u32"])(new Uint8Array(blockSize));
    let blockMixCb = ()=>{};
    if (onProgress) {
        const totalBlockMix = 2 * N * p;
        // Invoke callback if progress changes from 10.01 to 10.02
        // Allows to draw smooth progress bar on up to 8K screen
        const callbackPer = Math.max(Math.floor(totalBlockMix / 10000), 1);
        let blockMixCnt = 0;
        blockMixCb = ()=>{
            blockMixCnt++;
            if (onProgress && (!(blockMixCnt % callbackPer) || blockMixCnt === totalBlockMix)) onProgress(blockMixCnt / totalBlockMix);
        };
    }
    return {
        N,
        r,
        p,
        dkLen,
        blockSize32,
        V,
        B32,
        B,
        tmp,
        blockMixCb,
        asyncTick
    };
}
function scryptOutput(password, dkLen, B, V, tmp) {
    const res = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$pbkdf2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pbkdf2"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$sha2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sha256"], password, B, {
        c: 1,
        dkLen
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clean"])(B, V, tmp);
    return res;
}
function scrypt(password, salt, opts) {
    const { N, r, p, dkLen, blockSize32, V, B32, B, tmp, blockMixCb } = scryptInit(password, salt, opts);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["swap32IfBE"])(B32);
    for(let pi = 0; pi < p; pi++){
        const Pi = blockSize32 * pi;
        for(let i = 0; i < blockSize32; i++)V[i] = B32[Pi + i]; // V[0] = B[i]
        for(let i = 0, pos = 0; i < N - 1; i++){
            BlockMix(V, pos, V, pos += blockSize32, r); // V[i] = BlockMix(V[i-1]);
            blockMixCb();
        }
        BlockMix(V, (N - 1) * blockSize32, B32, Pi, r); // Process last element
        blockMixCb();
        for(let i = 0; i < N; i++){
            // First u32 of the last 64-byte block (u32 is LE)
            const j = B32[Pi + blockSize32 - 16] % N; // j = Integrify(X) % iterations
            for(let k = 0; k < blockSize32; k++)tmp[k] = B32[Pi + k] ^ V[j * blockSize32 + k]; // tmp = B ^ V[j]
            BlockMix(tmp, 0, B32, Pi, r); // B = BlockMix(B ^ V[j])
            blockMixCb();
        }
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["swap32IfBE"])(B32);
    return scryptOutput(password, dkLen, B, V, tmp);
}
async function scryptAsync(password, salt, opts) {
    const { N, r, p, dkLen, blockSize32, V, B32, B, tmp, blockMixCb, asyncTick } = scryptInit(password, salt, opts);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["swap32IfBE"])(B32);
    for(let pi = 0; pi < p; pi++){
        const Pi = blockSize32 * pi;
        for(let i = 0; i < blockSize32; i++)V[i] = B32[Pi + i]; // V[0] = B[i]
        let pos = 0;
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["asyncLoop"])(N - 1, asyncTick, ()=>{
            BlockMix(V, pos, V, pos += blockSize32, r); // V[i] = BlockMix(V[i-1]);
            blockMixCb();
        });
        BlockMix(V, (N - 1) * blockSize32, B32, Pi, r); // Process last element
        blockMixCb();
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["asyncLoop"])(N, asyncTick, ()=>{
            // First u32 of the last 64-byte block (u32 is LE)
            const j = B32[Pi + blockSize32 - 16] % N; // j = Integrify(X) % iterations
            for(let k = 0; k < blockSize32; k++)tmp[k] = B32[Pi + k] ^ V[j * blockSize32 + k]; // tmp = B ^ V[j]
            BlockMix(tmp, 0, B32, Pi, r); // B = BlockMix(B ^ V[j])
            blockMixCb();
        });
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["swap32IfBE"])(B32);
    return scryptOutput(password, dkLen, B, V, tmp);
} //# sourceMappingURL=scrypt.js.map
}),
"[project]/node_modules/@better-fetch/fetch/dist/index.js [app-client] (ecmascript)": ((__turbopack_context__) => {
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
    shouldAttemptRetry(attempt, response) {
        if (this.options.shouldRetry) {
            return Promise.resolve(attempt < this.options.attempts && this.options.shouldRetry(response));
        }
        return Promise.resolve(attempt < this.options.attempts);
    }
    getDelay() {
        return this.options.delay;
    }
    constructor(options){
        this.options = options;
    }
};
var ExponentialRetryStrategy = class {
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
    constructor(options){
        this.options = options;
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
            headers["authorization"] = "Bearer ".concat(token);
        } else if (options.auth.type === "Basic") {
            const username = getValue(options.auth.username);
            const password = getValue(options.auth.password);
            if (!username || !password) {
                return headers;
            }
            headers["authorization"] = "Basic ".concat(btoa("".concat(username, ":").concat(password)));
        } else if (options.auth.type === "Custom") {
            const value = getValue(options.auth.value);
            if (!value) {
                return headers;
            }
            headers["authorization"] = "".concat(getValue(options.auth.prefix), " ").concat(value);
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
    if (typeof window !== "undefined" && isFunction(window.fetch)) {
        return window.fetch;
    }
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
            url = url.replace("@".concat(m, "/"), "/");
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
                throw TypeError("Invalid URL ".concat(url, ". Are you passing in a relative url but not setting the baseURL?"));
            }
            throw TypeError("Invalid URL ".concat(url, ". Please validate that you are passing the correct input."));
        }
        throw e;
    }
    if (options == null ? void 0 : options.params) {
        if (Array.isArray(options == null ? void 0 : options.params)) {
            const params = (options == null ? void 0 : options.params) ? Array.isArray(options.params) ? "/".concat(options.params.join("/")) : "/".concat(Object.values(options.params).join("/")) : "";
            _url = _url.toString().split("/:")[0];
            _url = "".concat(_url.toString()).concat(params);
        } else {
            for (const [key, value] of Object.entries(options == null ? void 0 : options.params)){
                _url = _url.toString().replace(":".concat(key), String(value));
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
            url = url.replace("@".concat(m, "/"), "/");
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
                path = path.replace(":".concat(key), String(value));
            }
        }
    }
    path = path.split("/").map(encodeURIComponent).join("/");
    if (path.startsWith("/")) path = path.slice(1);
    let queryParamString = queryParams.toString();
    queryParamString = queryParamString.length > 0 ? "?".concat(queryParamString).replace(/\+/g, "%20") : "";
    if (!basePath.startsWith("http")) {
        return "".concat(basePath).concat(path).concat(queryParamString);
    }
    const _url = new URL("".concat(path).concat(queryParamString), basePath);
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
"[project]/node_modules/defu/dist/defu.mjs [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "createDefu": ()=>createDefu,
    "default": ()=>defu,
    "defu": ()=>defu,
    "defuArrayFn": ()=>defuArrayFn,
    "defuFn": ()=>defuFn
});
function isPlainObject(value) {
    if (value === null || typeof value !== "object") {
        return false;
    }
    const prototype = Object.getPrototypeOf(value);
    if (prototype !== null && prototype !== Object.prototype && Object.getPrototypeOf(prototype) !== null) {
        return false;
    }
    if (Symbol.iterator in value) {
        return false;
    }
    if (Symbol.toStringTag in value) {
        return Object.prototype.toString.call(value) === "[object Module]";
    }
    return true;
}
function _defu(baseObject, defaults) {
    let namespace = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : ".", merger = arguments.length > 3 ? arguments[3] : void 0;
    if (!isPlainObject(defaults)) {
        return _defu(baseObject, {}, namespace, merger);
    }
    const object = Object.assign({}, defaults);
    for(const key in baseObject){
        if (key === "__proto__" || key === "constructor") {
            continue;
        }
        const value = baseObject[key];
        if (value === null || value === void 0) {
            continue;
        }
        if (merger && merger(object, key, value, namespace)) {
            continue;
        }
        if (Array.isArray(value) && Array.isArray(object[key])) {
            object[key] = [
                ...value,
                ...object[key]
            ];
        } else if (isPlainObject(value) && isPlainObject(object[key])) {
            object[key] = _defu(value, object[key], (namespace ? "".concat(namespace, ".") : "") + key.toString(), merger);
        } else {
            object[key] = value;
        }
    }
    return object;
}
function createDefu(merger) {
    return function() {
        for(var _len = arguments.length, arguments_ = new Array(_len), _key = 0; _key < _len; _key++){
            arguments_[_key] = arguments[_key];
        }
        return(// eslint-disable-next-line unicorn/no-array-reduce
        arguments_.reduce((p, c)=>_defu(p, c, "", merger), {}));
    };
}
const defu = createDefu();
const defuFn = createDefu((object, key, currentValue)=>{
    if (object[key] !== void 0 && typeof currentValue === "function") {
        object[key] = currentValue(object[key]);
        return true;
    }
});
const defuArrayFn = createDefu((object, key, currentValue)=>{
    if (Array.isArray(object[key]) && typeof currentValue === "function") {
        object[key] = currentValue(object[key]);
        return true;
    }
});
;
}),
"[project]/examples/sso-example/node_modules/@swc/helpers/esm/_class_apply_descriptor_get.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "_": ()=>_class_apply_descriptor_get
});
function _class_apply_descriptor_get(receiver, descriptor) {
    if (descriptor.get) return descriptor.get.call(receiver);
    return descriptor.value;
}
;
}),
"[project]/examples/sso-example/node_modules/@swc/helpers/esm/_class_extract_field_descriptor.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "_": ()=>_class_extract_field_descriptor
});
function _class_extract_field_descriptor(receiver, privateMap, action) {
    if (!privateMap.has(receiver)) throw new TypeError("attempted to " + action + " private field on non-instance");
    return privateMap.get(receiver);
}
;
}),
"[project]/examples/sso-example/node_modules/@swc/helpers/esm/_class_private_field_get.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "_": ()=>_class_private_field_get
});
var __TURBOPACK__imported__module__$5b$project$5d2f$examples$2f$sso$2d$example$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_class_apply_descriptor_get$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/examples/sso-example/node_modules/@swc/helpers/esm/_class_apply_descriptor_get.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$examples$2f$sso$2d$example$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_class_extract_field_descriptor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/examples/sso-example/node_modules/@swc/helpers/esm/_class_extract_field_descriptor.js [app-client] (ecmascript)");
;
;
function _class_private_field_get(receiver, privateMap) {
    var descriptor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$examples$2f$sso$2d$example$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_class_extract_field_descriptor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(receiver, privateMap, "get");
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$examples$2f$sso$2d$example$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_class_apply_descriptor_get$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(receiver, descriptor);
}
;
}),
"[project]/examples/sso-example/node_modules/@swc/helpers/esm/_check_private_redeclaration.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "_": ()=>_check_private_redeclaration
});
function _check_private_redeclaration(obj, privateCollection) {
    if (privateCollection.has(obj)) {
        throw new TypeError("Cannot initialize the same private elements twice on an object");
    }
}
;
}),
"[project]/examples/sso-example/node_modules/@swc/helpers/esm/_class_private_field_init.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "_": ()=>_class_private_field_init
});
var __TURBOPACK__imported__module__$5b$project$5d2f$examples$2f$sso$2d$example$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_check_private_redeclaration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/examples/sso-example/node_modules/@swc/helpers/esm/_check_private_redeclaration.js [app-client] (ecmascript)");
;
function _class_private_field_init(obj, privateMap, value) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$examples$2f$sso$2d$example$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_check_private_redeclaration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(obj, privateMap);
    privateMap.set(obj, value);
}
;
}),
"[project]/examples/sso-example/node_modules/@swc/helpers/esm/_class_apply_descriptor_set.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "_": ()=>_class_apply_descriptor_set
});
function _class_apply_descriptor_set(receiver, descriptor, value) {
    if (descriptor.set) descriptor.set.call(receiver, value);
    else {
        if (!descriptor.writable) {
            // This should only throw in strict mode, but class bodies are
            // always strict and private fields can only be used inside
            // class bodies.
            throw new TypeError("attempted to set read only private field");
        }
        descriptor.value = value;
    }
}
;
}),
"[project]/examples/sso-example/node_modules/@swc/helpers/esm/_class_private_field_set.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "_": ()=>_class_private_field_set
});
var __TURBOPACK__imported__module__$5b$project$5d2f$examples$2f$sso$2d$example$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_class_apply_descriptor_set$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/examples/sso-example/node_modules/@swc/helpers/esm/_class_apply_descriptor_set.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$examples$2f$sso$2d$example$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_class_extract_field_descriptor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/examples/sso-example/node_modules/@swc/helpers/esm/_class_extract_field_descriptor.js [app-client] (ecmascript)");
;
;
function _class_private_field_set(receiver, privateMap, value) {
    var descriptor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$examples$2f$sso$2d$example$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_class_extract_field_descriptor$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(receiver, privateMap, "set");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$examples$2f$sso$2d$example$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_class_apply_descriptor_set$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(receiver, descriptor, value);
    return value;
}
;
}),
"[project]/examples/sso-example/node_modules/@swc/helpers/esm/_class_private_method_get.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "_": ()=>_class_private_method_get
});
function _class_private_method_get(receiver, privateSet, fn) {
    if (!privateSet.has(receiver)) throw new TypeError("attempted to get private field on non-instance");
    return fn;
}
;
}),
"[project]/examples/sso-example/node_modules/@swc/helpers/esm/_class_private_method_init.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "_": ()=>_class_private_method_init
});
var __TURBOPACK__imported__module__$5b$project$5d2f$examples$2f$sso$2d$example$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_check_private_redeclaration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/examples/sso-example/node_modules/@swc/helpers/esm/_check_private_redeclaration.js [app-client] (ecmascript)");
;
function _class_private_method_init(obj, privateSet) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$examples$2f$sso$2d$example$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_check_private_redeclaration$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(obj, privateSet);
    privateSet.add(obj);
}
;
}),
"[project]/examples/sso-example/node_modules/@swc/helpers/esm/_define_property.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "_": ()=>_define_property
});
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else obj[key] = value;
    return obj;
}
;
}),
"[project]/examples/sso-example/node_modules/@swc/helpers/esm/_tagged_template_literal.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "_": ()=>_tagged_template_literal
});
function _tagged_template_literal(strings, raw) {
    if (!raw) raw = strings.slice(0);
    return Object.freeze(Object.defineProperties(strings, {
        raw: {
            value: Object.freeze(raw)
        }
    }));
}
;
}),
"[project]/node_modules/uuid/dist/esm-browser/index.js [app-client] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({});
;
;
;
;
;
;
;
;
;
}),
"[project]/node_modules/uuid/dist/esm-browser/index.js [app-client] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/uuid/dist/esm-browser/index.js [app-client] (ecmascript) <locals>");
}),
"[project]/node_modules/uuid/dist/esm-browser/rng.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
__turbopack_context__.s({
    "default": ()=>rng
});
var getRandomValues;
var rnds8 = new Uint8Array(16);
function rng() {
    // lazy load so that environments that need to polyfill have a chance to do so
    if (!getRandomValues) {
        // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation. Also,
        // find the complete implementation of crypto (msCrypto) on IE11.
        getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== 'undefined' && typeof msCrypto.getRandomValues === 'function' && msCrypto.getRandomValues.bind(msCrypto);
        if (!getRandomValues) {
            throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
        }
    }
    return getRandomValues(rnds8);
}
}),
"[project]/node_modules/uuid/dist/esm-browser/regex.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__
});
const __TURBOPACK__default__export__ = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
}),
"[project]/node_modules/uuid/dist/esm-browser/validate.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$regex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/uuid/dist/esm-browser/regex.js [app-client] (ecmascript)");
;
function validate(uuid) {
    return typeof uuid === 'string' && __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$regex$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].test(uuid);
}
const __TURBOPACK__default__export__ = validate;
}),
"[project]/node_modules/uuid/dist/esm-browser/stringify.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$validate$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/uuid/dist/esm-browser/validate.js [app-client] (ecmascript)");
;
/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */ var byteToHex = [];
for(var i = 0; i < 256; ++i){
    byteToHex.push((i + 0x100).toString(16).substr(1));
}
function stringify(arr) {
    var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    // Note: Be careful editing this code!  It's been tuned for performance
    // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
    var uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
    // of the following:
    // - One or more input array values don't map to a hex octet (leading to
    // "undefined" in the uuid)
    // - Invalid input values for the RFC `version` or `variant` fields
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$validate$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(uuid)) {
        throw TypeError('Stringified UUID is invalid');
    }
    return uuid;
}
const __TURBOPACK__default__export__ = stringify;
}),
"[project]/node_modules/uuid/dist/esm-browser/v1.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$rng$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/uuid/dist/esm-browser/rng.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$stringify$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/uuid/dist/esm-browser/stringify.js [app-client] (ecmascript)"); // **`v1()` - Generate time-based UUID**
;
;
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html
var _nodeId;
var _clockseq; // Previous uuid creation time
var _lastMSecs = 0;
var _lastNSecs = 0; // See https://github.com/uuidjs/uuid for API details
function v1(options, buf, offset) {
    var i = buf && offset || 0;
    var b = buf || new Array(16);
    options = options || {};
    var node = options.node || _nodeId;
    var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq; // node and clockseq need to be initialized to random values if they're not
    // specified.  We do this lazily to minimize issues related to insufficient
    // system entropy.  See #189
    if (node == null || clockseq == null) {
        var seedBytes = options.random || (options.rng || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$rng$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])();
        if (node == null) {
            // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
            node = _nodeId = [
                seedBytes[0] | 0x01,
                seedBytes[1],
                seedBytes[2],
                seedBytes[3],
                seedBytes[4],
                seedBytes[5]
            ];
        }
        if (clockseq == null) {
            // Per 4.2.2, randomize (14 bit) clockseq
            clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
        }
    } // UUID timestamps are 100 nano-second units since the Gregorian epoch,
    // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
    // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
    // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
    var msecs = options.msecs !== undefined ? options.msecs : Date.now(); // Per 4.2.1.2, use count of uuid's generated during the current clock
    // cycle to simulate higher resolution clock
    var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1; // Time since last uuid creation (in msecs)
    var dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 10000; // Per 4.2.1.2, Bump clockseq on clock regression
    if (dt < 0 && options.clockseq === undefined) {
        clockseq = clockseq + 1 & 0x3fff;
    } // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
    // time interval
    if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
        nsecs = 0;
    } // Per 4.2.1.2 Throw error if too many uuids are requested
    if (nsecs >= 10000) {
        throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
    }
    _lastMSecs = msecs;
    _lastNSecs = nsecs;
    _clockseq = clockseq; // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
    msecs += 12219292800000; // `time_low`
    var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
    b[i++] = tl >>> 24 & 0xff;
    b[i++] = tl >>> 16 & 0xff;
    b[i++] = tl >>> 8 & 0xff;
    b[i++] = tl & 0xff; // `time_mid`
    var tmh = msecs / 0x100000000 * 10000 & 0xfffffff;
    b[i++] = tmh >>> 8 & 0xff;
    b[i++] = tmh & 0xff; // `time_high_and_version`
    b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
    b[i++] = tmh >>> 16 & 0xff; // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
    b[i++] = clockseq >>> 8 | 0x80; // `clock_seq_low`
    b[i++] = clockseq & 0xff; // `node`
    for(var n = 0; n < 6; ++n){
        b[i + n] = node[n];
    }
    return buf || (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$stringify$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(b);
}
const __TURBOPACK__default__export__ = v1;
}),
"[project]/node_modules/uuid/dist/esm-browser/parse.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$validate$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/uuid/dist/esm-browser/validate.js [app-client] (ecmascript)");
;
function parse(uuid) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$validate$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(uuid)) {
        throw TypeError('Invalid UUID');
    }
    var v;
    var arr = new Uint8Array(16); // Parse ########-....-....-....-............
    arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;
    arr[1] = v >>> 16 & 0xff;
    arr[2] = v >>> 8 & 0xff;
    arr[3] = v & 0xff; // Parse ........-####-....-....-............
    arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;
    arr[5] = v & 0xff; // Parse ........-....-####-....-............
    arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;
    arr[7] = v & 0xff; // Parse ........-....-....-####-............
    arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;
    arr[9] = v & 0xff; // Parse ........-....-....-....-############
    // (Use "/" to avoid 32-bit truncation when bit-shifting high-order bytes)
    arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 0x10000000000 & 0xff;
    arr[11] = v / 0x100000000 & 0xff;
    arr[12] = v >>> 24 & 0xff;
    arr[13] = v >>> 16 & 0xff;
    arr[14] = v >>> 8 & 0xff;
    arr[15] = v & 0xff;
    return arr;
}
const __TURBOPACK__default__export__ = parse;
}),
"[project]/node_modules/uuid/dist/esm-browser/v35.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "DNS": ()=>DNS,
    "URL": ()=>URL,
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$stringify$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/uuid/dist/esm-browser/stringify.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$parse$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/uuid/dist/esm-browser/parse.js [app-client] (ecmascript)");
;
;
function stringToBytes(str) {
    str = unescape(encodeURIComponent(str)); // UTF8 escape
    var bytes = [];
    for(var i = 0; i < str.length; ++i){
        bytes.push(str.charCodeAt(i));
    }
    return bytes;
}
var DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
var URL = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';
function __TURBOPACK__default__export__(name, version, hashfunc) {
    function generateUUID(value, namespace, buf, offset) {
        if (typeof value === 'string') {
            value = stringToBytes(value);
        }
        if (typeof namespace === 'string') {
            namespace = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$parse$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(namespace);
        }
        if (namespace.length !== 16) {
            throw TypeError('Namespace must be array-like (16 iterable integer values, 0-255)');
        } // Compute hash of namespace and value, Per 4.3
        // Future: Use spread syntax when supported on all platforms, e.g. `bytes =
        // hashfunc([...namespace, ... value])`
        var bytes = new Uint8Array(16 + value.length);
        bytes.set(namespace);
        bytes.set(value, namespace.length);
        bytes = hashfunc(bytes);
        bytes[6] = bytes[6] & 0x0f | version;
        bytes[8] = bytes[8] & 0x3f | 0x80;
        if (buf) {
            offset = offset || 0;
            for(var i = 0; i < 16; ++i){
                buf[offset + i] = bytes[i];
            }
            return buf;
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$stringify$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(bytes);
    } // Function#name is not settable on some platforms (#270)
    try {
        generateUUID.name = name; // eslint-disable-next-line no-empty
    } catch (err) {} // For CommonJS default export support
    generateUUID.DNS = DNS;
    generateUUID.URL = URL;
    return generateUUID;
}
}),
"[project]/node_modules/uuid/dist/esm-browser/md5.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

/*
 * Browser-compatible JavaScript MD5
 *
 * Modification of JavaScript MD5
 * https://github.com/blueimp/JavaScript-MD5
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 *
 * Based on
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */ __turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__
});
function md5(bytes) {
    if (typeof bytes === 'string') {
        var msg = unescape(encodeURIComponent(bytes)); // UTF8 escape
        bytes = new Uint8Array(msg.length);
        for(var i = 0; i < msg.length; ++i){
            bytes[i] = msg.charCodeAt(i);
        }
    }
    return md5ToHexEncodedArray(wordsToMd5(bytesToWords(bytes), bytes.length * 8));
}
/*
 * Convert an array of little-endian words to an array of bytes
 */ function md5ToHexEncodedArray(input) {
    var output = [];
    var length32 = input.length * 32;
    var hexTab = '0123456789abcdef';
    for(var i = 0; i < length32; i += 8){
        var x = input[i >> 5] >>> i % 32 & 0xff;
        var hex = parseInt(hexTab.charAt(x >>> 4 & 0x0f) + hexTab.charAt(x & 0x0f), 16);
        output.push(hex);
    }
    return output;
}
/**
 * Calculate output length with padding and bit length
 */ function getOutputLength(inputLength8) {
    return (inputLength8 + 64 >>> 9 << 4) + 14 + 1;
}
/*
 * Calculate the MD5 of an array of little-endian words, and a bit length.
 */ function wordsToMd5(x, len) {
    /* append padding */ x[len >> 5] |= 0x80 << len % 32;
    x[getOutputLength(len) - 1] = len;
    var a = 1732584193;
    var b = -271733879;
    var c = -1732584194;
    var d = 271733878;
    for(var i = 0; i < x.length; i += 16){
        var olda = a;
        var oldb = b;
        var oldc = c;
        var oldd = d;
        a = md5ff(a, b, c, d, x[i], 7, -680876936);
        d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
        c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
        b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
        a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
        d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
        c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
        b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
        a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
        d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
        c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
        b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
        a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
        d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
        c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
        b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);
        a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
        d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
        c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
        b = md5gg(b, c, d, a, x[i], 20, -373897302);
        a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
        d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
        c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
        b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
        a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
        d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
        c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
        b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
        a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
        d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
        c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
        b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);
        a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
        d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
        c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
        b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
        a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
        d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
        c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
        b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
        a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
        d = md5hh(d, a, b, c, x[i], 11, -358537222);
        c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
        b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
        a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
        d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
        c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
        b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);
        a = md5ii(a, b, c, d, x[i], 6, -198630844);
        d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
        c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
        b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
        a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
        d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
        c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
        b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
        a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
        d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
        c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
        b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
        a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
        d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
        c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
        b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);
        a = safeAdd(a, olda);
        b = safeAdd(b, oldb);
        c = safeAdd(c, oldc);
        d = safeAdd(d, oldd);
    }
    return [
        a,
        b,
        c,
        d
    ];
}
/*
 * Convert an array bytes to an array of little-endian words
 * Characters >255 have their high-byte silently ignored.
 */ function bytesToWords(input) {
    if (input.length === 0) {
        return [];
    }
    var length8 = input.length * 8;
    var output = new Uint32Array(getOutputLength(length8));
    for(var i = 0; i < length8; i += 8){
        output[i >> 5] |= (input[i / 8] & 0xff) << i % 32;
    }
    return output;
}
/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */ function safeAdd(x, y) {
    var lsw = (x & 0xffff) + (y & 0xffff);
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return msw << 16 | lsw & 0xffff;
}
/*
 * Bitwise rotate a 32-bit number to the left.
 */ function bitRotateLeft(num, cnt) {
    return num << cnt | num >>> 32 - cnt;
}
/*
 * These functions implement the four basic operations the algorithm uses.
 */ function md5cmn(q, a, b, x, s, t) {
    return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
}
function md5ff(a, b, c, d, x, s, t) {
    return md5cmn(b & c | ~b & d, a, b, x, s, t);
}
function md5gg(a, b, c, d, x, s, t) {
    return md5cmn(b & d | c & ~d, a, b, x, s, t);
}
function md5hh(a, b, c, d, x, s, t) {
    return md5cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5ii(a, b, c, d, x, s, t) {
    return md5cmn(c ^ (b | ~d), a, b, x, s, t);
}
const __TURBOPACK__default__export__ = md5;
}),
"[project]/node_modules/uuid/dist/esm-browser/v3.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$v35$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/uuid/dist/esm-browser/v35.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$md5$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/uuid/dist/esm-browser/md5.js [app-client] (ecmascript)");
;
;
var v3 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$v35$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])('v3', 0x30, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$md5$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]);
const __TURBOPACK__default__export__ = v3;
}),
"[project]/node_modules/uuid/dist/esm-browser/v4.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$rng$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/uuid/dist/esm-browser/rng.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$stringify$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/uuid/dist/esm-browser/stringify.js [app-client] (ecmascript)");
;
;
function v4(options, buf, offset) {
    options = options || {};
    var rnds = options.random || (options.rng || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$rng$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
    rnds[6] = rnds[6] & 0x0f | 0x40;
    rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided
    if (buf) {
        offset = offset || 0;
        for(var i = 0; i < 16; ++i){
            buf[offset + i] = rnds[i];
        }
        return buf;
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$stringify$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(rnds);
}
const __TURBOPACK__default__export__ = v4;
}),
"[project]/node_modules/uuid/dist/esm-browser/sha1.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

// Adapted from Chris Veness' SHA1 code at
// http://www.movable-type.co.uk/scripts/sha1.html
__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__
});
function f(s, x, y, z) {
    switch(s){
        case 0:
            return x & y ^ ~x & z;
        case 1:
            return x ^ y ^ z;
        case 2:
            return x & y ^ x & z ^ y & z;
        case 3:
            return x ^ y ^ z;
    }
}
function ROTL(x, n) {
    return x << n | x >>> 32 - n;
}
function sha1(bytes) {
    var K = [
        0x5a827999,
        0x6ed9eba1,
        0x8f1bbcdc,
        0xca62c1d6
    ];
    var H = [
        0x67452301,
        0xefcdab89,
        0x98badcfe,
        0x10325476,
        0xc3d2e1f0
    ];
    if (typeof bytes === 'string') {
        var msg = unescape(encodeURIComponent(bytes)); // UTF8 escape
        bytes = [];
        for(var i = 0; i < msg.length; ++i){
            bytes.push(msg.charCodeAt(i));
        }
    } else if (!Array.isArray(bytes)) {
        // Convert Array-like to Array
        bytes = Array.prototype.slice.call(bytes);
    }
    bytes.push(0x80);
    var l = bytes.length / 4 + 2;
    var N = Math.ceil(l / 16);
    var M = new Array(N);
    for(var _i = 0; _i < N; ++_i){
        var arr = new Uint32Array(16);
        for(var j = 0; j < 16; ++j){
            arr[j] = bytes[_i * 64 + j * 4] << 24 | bytes[_i * 64 + j * 4 + 1] << 16 | bytes[_i * 64 + j * 4 + 2] << 8 | bytes[_i * 64 + j * 4 + 3];
        }
        M[_i] = arr;
    }
    M[N - 1][14] = (bytes.length - 1) * 8 / Math.pow(2, 32);
    M[N - 1][14] = Math.floor(M[N - 1][14]);
    M[N - 1][15] = (bytes.length - 1) * 8 & 0xffffffff;
    for(var _i2 = 0; _i2 < N; ++_i2){
        var W = new Uint32Array(80);
        for(var t = 0; t < 16; ++t){
            W[t] = M[_i2][t];
        }
        for(var _t = 16; _t < 80; ++_t){
            W[_t] = ROTL(W[_t - 3] ^ W[_t - 8] ^ W[_t - 14] ^ W[_t - 16], 1);
        }
        var a = H[0];
        var b = H[1];
        var c = H[2];
        var d = H[3];
        var e = H[4];
        for(var _t2 = 0; _t2 < 80; ++_t2){
            var s = Math.floor(_t2 / 20);
            var T = ROTL(a, 5) + f(s, b, c, d) + e + K[s] + W[_t2] >>> 0;
            e = d;
            d = c;
            c = ROTL(b, 30) >>> 0;
            b = a;
            a = T;
        }
        H[0] = H[0] + a >>> 0;
        H[1] = H[1] + b >>> 0;
        H[2] = H[2] + c >>> 0;
        H[3] = H[3] + d >>> 0;
        H[4] = H[4] + e >>> 0;
    }
    return [
        H[0] >> 24 & 0xff,
        H[0] >> 16 & 0xff,
        H[0] >> 8 & 0xff,
        H[0] & 0xff,
        H[1] >> 24 & 0xff,
        H[1] >> 16 & 0xff,
        H[1] >> 8 & 0xff,
        H[1] & 0xff,
        H[2] >> 24 & 0xff,
        H[2] >> 16 & 0xff,
        H[2] >> 8 & 0xff,
        H[2] & 0xff,
        H[3] >> 24 & 0xff,
        H[3] >> 16 & 0xff,
        H[3] >> 8 & 0xff,
        H[3] & 0xff,
        H[4] >> 24 & 0xff,
        H[4] >> 16 & 0xff,
        H[4] >> 8 & 0xff,
        H[4] & 0xff
    ];
}
const __TURBOPACK__default__export__ = sha1;
}),
"[project]/node_modules/uuid/dist/esm-browser/v5.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$v35$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/uuid/dist/esm-browser/v35.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$sha1$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/uuid/dist/esm-browser/sha1.js [app-client] (ecmascript)");
;
;
var v5 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$v35$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])('v5', 0x50, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$sha1$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]);
const __TURBOPACK__default__export__ = v5;
}),
"[project]/node_modules/uuid/dist/esm-browser/nil.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__
});
const __TURBOPACK__default__export__ = '00000000-0000-0000-0000-000000000000';
}),
"[project]/node_modules/uuid/dist/esm-browser/version.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "default": ()=>__TURBOPACK__default__export__
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$validate$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/uuid/dist/esm-browser/validate.js [app-client] (ecmascript)");
;
function version(uuid) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$validate$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(uuid)) {
        throw TypeError('Invalid UUID');
    }
    return parseInt(uuid.substr(14, 1), 16);
}
const __TURBOPACK__default__export__ = version;
}),
"[project]/node_modules/uuid/dist/esm-browser/index.js [app-client] (ecmascript) <exports>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "NIL": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$nil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "parse": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$parse$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "stringify": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$stringify$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "v1": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$v1$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "v3": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$v3$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "v4": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$v4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "v5": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$v5$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "validate": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$validate$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    "version": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$version$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$v1$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/uuid/dist/esm-browser/v1.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$v3$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/uuid/dist/esm-browser/v3.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$v4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/uuid/dist/esm-browser/v4.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$v5$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/uuid/dist/esm-browser/v5.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$nil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/uuid/dist/esm-browser/nil.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$version$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/uuid/dist/esm-browser/version.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$validate$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/uuid/dist/esm-browser/validate.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$stringify$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/uuid/dist/esm-browser/stringify.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$parse$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/uuid/dist/esm-browser/parse.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/uuid/dist/esm-browser/index.js [app-client] (ecmascript) <locals>");
}),
"[project]/node_modules/uuid/dist/esm-browser/index.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "NIL": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$exports$3e$__["NIL"],
    "parse": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$exports$3e$__["parse"],
    "stringify": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$exports$3e$__["stringify"],
    "v1": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$exports$3e$__["v1"],
    "v3": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$exports$3e$__["v3"],
    "v4": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$exports$3e$__["v4"],
    "v5": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$exports$3e$__["v5"],
    "validate": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$exports$3e$__["validate"],
    "version": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$exports$3e$__["version"]
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/uuid/dist/esm-browser/index.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$exports$3e$__ = __turbopack_context__.i("[project]/node_modules/uuid/dist/esm-browser/index.js [app-client] (ecmascript) <exports>");
}),
"[project]/node_modules/camelcase/index.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
const UPPERCASE = RegExp("[\\p{Lu}]", "u");
const LOWERCASE = RegExp("[\\p{Ll}]", "u");
const LEADING_CAPITAL = RegExp("^[\\p{Lu}](?![\\p{Lu}])", "gu");
const IDENTIFIER = RegExp("([\\p{Alpha}\\p{N}_]|$)", "u");
const SEPARATORS = /[_.\- ]+/;
const LEADING_SEPARATORS = new RegExp('^' + SEPARATORS.source);
const SEPARATORS_AND_IDENTIFIER = new RegExp(SEPARATORS.source + IDENTIFIER.source, 'gu');
const NUMBERS_AND_IDENTIFIER = new RegExp('\\d+' + IDENTIFIER.source, 'gu');
const preserveCamelCase = (string, toLowerCase, toUpperCase)=>{
    let isLastCharLower = false;
    let isLastCharUpper = false;
    let isLastLastCharUpper = false;
    for(let i = 0; i < string.length; i++){
        const character = string[i];
        if (isLastCharLower && UPPERCASE.test(character)) {
            string = string.slice(0, i) + '-' + string.slice(i);
            isLastCharLower = false;
            isLastLastCharUpper = isLastCharUpper;
            isLastCharUpper = true;
            i++;
        } else if (isLastCharUpper && isLastLastCharUpper && LOWERCASE.test(character)) {
            string = string.slice(0, i - 1) + '-' + string.slice(i - 1);
            isLastLastCharUpper = isLastCharUpper;
            isLastCharUpper = false;
            isLastCharLower = true;
        } else {
            isLastCharLower = toLowerCase(character) === character && toUpperCase(character) !== character;
            isLastLastCharUpper = isLastCharUpper;
            isLastCharUpper = toUpperCase(character) === character && toLowerCase(character) !== character;
        }
    }
    return string;
};
const preserveConsecutiveUppercase = (input, toLowerCase)=>{
    LEADING_CAPITAL.lastIndex = 0;
    return input.replace(LEADING_CAPITAL, (m1)=>toLowerCase(m1));
};
const postProcess = (input, toUpperCase)=>{
    SEPARATORS_AND_IDENTIFIER.lastIndex = 0;
    NUMBERS_AND_IDENTIFIER.lastIndex = 0;
    return input.replace(SEPARATORS_AND_IDENTIFIER, (_, identifier)=>toUpperCase(identifier)).replace(NUMBERS_AND_IDENTIFIER, (m)=>toUpperCase(m));
};
const camelCase = (input, options)=>{
    if (!(typeof input === 'string' || Array.isArray(input))) {
        throw new TypeError('Expected the input to be `string | string[]`');
    }
    options = {
        pascalCase: false,
        preserveConsecutiveUppercase: false,
        ...options
    };
    if (Array.isArray(input)) {
        input = input.map((x)=>x.trim()).filter((x)=>x.length).join('-');
    } else {
        input = input.trim();
    }
    if (input.length === 0) {
        return '';
    }
    const toLowerCase = options.locale === false ? (string)=>string.toLowerCase() : (string)=>string.toLocaleLowerCase(options.locale);
    const toUpperCase = options.locale === false ? (string)=>string.toUpperCase() : (string)=>string.toLocaleUpperCase(options.locale);
    if (input.length === 1) {
        return options.pascalCase ? toUpperCase(input) : toLowerCase(input);
    }
    const hasUpperCase = input !== toLowerCase(input);
    if (hasUpperCase) {
        input = preserveCamelCase(input, toLowerCase, toUpperCase);
    }
    input = input.replace(LEADING_SEPARATORS, '');
    if (options.preserveConsecutiveUppercase) {
        input = preserveConsecutiveUppercase(input, toLowerCase);
    } else {
        input = toLowerCase(input);
    }
    if (options.pascalCase) {
        input = toUpperCase(input.charAt(0)) + input.slice(1);
    }
    return postProcess(input, toUpperCase);
};
module.exports = camelCase;
// TODO: Remove this for the next major release
module.exports.default = camelCase;
}}),
"[project]/node_modules/base64-js/index.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
exports.byteLength = byteLength;
exports.toByteArray = toByteArray;
exports.fromByteArray = fromByteArray;
var lookup = [];
var revLookup = [];
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;
var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
for(var i = 0, len = code.length; i < len; ++i){
    lookup[i] = code[i];
    revLookup[code.charCodeAt(i)] = i;
}
// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62;
revLookup['_'.charCodeAt(0)] = 63;
function getLens(b64) {
    var len = b64.length;
    if (len % 4 > 0) {
        throw new Error('Invalid string. Length must be a multiple of 4');
    }
    // Trim off extra bytes after placeholder bytes are found
    // See: https://github.com/beatgammit/base64-js/issues/42
    var validLen = b64.indexOf('=');
    if (validLen === -1) validLen = len;
    var placeHoldersLen = validLen === len ? 0 : 4 - validLen % 4;
    return [
        validLen,
        placeHoldersLen
    ];
}
// base64 is 4/3 + up to two characters of the original data
function byteLength(b64) {
    var lens = getLens(b64);
    var validLen = lens[0];
    var placeHoldersLen = lens[1];
    return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
}
function _byteLength(b64, validLen, placeHoldersLen) {
    return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
}
function toByteArray(b64) {
    var tmp;
    var lens = getLens(b64);
    var validLen = lens[0];
    var placeHoldersLen = lens[1];
    var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
    var curByte = 0;
    // if there are placeholders, only get up to the last complete 4 chars
    var len = placeHoldersLen > 0 ? validLen - 4 : validLen;
    var i;
    for(i = 0; i < len; i += 4){
        tmp = revLookup[b64.charCodeAt(i)] << 18 | revLookup[b64.charCodeAt(i + 1)] << 12 | revLookup[b64.charCodeAt(i + 2)] << 6 | revLookup[b64.charCodeAt(i + 3)];
        arr[curByte++] = tmp >> 16 & 0xFF;
        arr[curByte++] = tmp >> 8 & 0xFF;
        arr[curByte++] = tmp & 0xFF;
    }
    if (placeHoldersLen === 2) {
        tmp = revLookup[b64.charCodeAt(i)] << 2 | revLookup[b64.charCodeAt(i + 1)] >> 4;
        arr[curByte++] = tmp & 0xFF;
    }
    if (placeHoldersLen === 1) {
        tmp = revLookup[b64.charCodeAt(i)] << 10 | revLookup[b64.charCodeAt(i + 1)] << 4 | revLookup[b64.charCodeAt(i + 2)] >> 2;
        arr[curByte++] = tmp >> 8 & 0xFF;
        arr[curByte++] = tmp & 0xFF;
    }
    return arr;
}
function tripletToBase64(num) {
    return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F];
}
function encodeChunk(uint8, start, end) {
    var tmp;
    var output = [];
    for(var i = start; i < end; i += 3){
        tmp = (uint8[i] << 16 & 0xFF0000) + (uint8[i + 1] << 8 & 0xFF00) + (uint8[i + 2] & 0xFF);
        output.push(tripletToBase64(tmp));
    }
    return output.join('');
}
function fromByteArray(uint8) {
    var tmp;
    var len = uint8.length;
    var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
    ;
    var parts = [];
    var maxChunkLength = 16383 // must be multiple of 3
    ;
    // go through the array every three bytes, we'll deal with trailing stuff later
    for(var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength){
        parts.push(encodeChunk(uint8, i, i + maxChunkLength > len2 ? len2 : i + maxChunkLength));
    }
    // pad the end with zeros, but make sure to not forget the extra bytes
    if (extraBytes === 1) {
        tmp = uint8[len - 1];
        parts.push(lookup[tmp >> 2] + lookup[tmp << 4 & 0x3F] + '==');
    } else if (extraBytes === 2) {
        tmp = (uint8[len - 2] << 8) + uint8[len - 1];
        parts.push(lookup[tmp >> 10] + lookup[tmp >> 4 & 0x3F] + lookup[tmp << 2 & 0x3F] + '=');
    }
    return parts.join('');
}
}}),
"[project]/node_modules/ieee754/index.js [app-client] (ecmascript)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */ exports.read = function(buffer, offset, isLE, mLen, nBytes) {
    var e, m;
    var eLen = nBytes * 8 - mLen - 1;
    var eMax = (1 << eLen) - 1;
    var eBias = eMax >> 1;
    var nBits = -7;
    var i = isLE ? nBytes - 1 : 0;
    var d = isLE ? -1 : 1;
    var s = buffer[offset + i];
    i += d;
    e = s & (1 << -nBits) - 1;
    s >>= -nBits;
    nBits += eLen;
    for(; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8){}
    m = e & (1 << -nBits) - 1;
    e >>= -nBits;
    nBits += mLen;
    for(; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8){}
    if (e === 0) {
        e = 1 - eBias;
    } else if (e === eMax) {
        return m ? NaN : (s ? -1 : 1) * Infinity;
    } else {
        m = m + Math.pow(2, mLen);
        e = e - eBias;
    }
    return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
};
exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
    var e, m, c;
    var eLen = nBytes * 8 - mLen - 1;
    var eMax = (1 << eLen) - 1;
    var eBias = eMax >> 1;
    var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
    var i = isLE ? 0 : nBytes - 1;
    var d = isLE ? 1 : -1;
    var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
    value = Math.abs(value);
    if (isNaN(value) || value === Infinity) {
        m = isNaN(value) ? 1 : 0;
        e = eMax;
    } else {
        e = Math.floor(Math.log(value) / Math.LN2);
        if (value * (c = Math.pow(2, -e)) < 1) {
            e--;
            c *= 2;
        }
        if (e + eBias >= 1) {
            value += rt / c;
        } else {
            value += rt * Math.pow(2, 1 - eBias);
        }
        if (value * c >= 2) {
            e++;
            c /= 2;
        }
        if (e + eBias >= eMax) {
            m = 0;
            e = eMax;
        } else if (e + eBias >= 1) {
            m = (value * c - 1) * Math.pow(2, mLen);
            e = e + eBias;
        } else {
            m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
            e = 0;
        }
    }
    for(; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8){}
    e = e << mLen | m;
    eLen += mLen;
    for(; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8){}
    buffer[offset + i - d] |= s * 128;
};
}}),
"[project]/node_modules/buffer/index.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */ /* eslint-disable no-proto */ const base64 = __turbopack_context__.r("[project]/node_modules/base64-js/index.js [app-client] (ecmascript)");
const ieee754 = __turbopack_context__.r("[project]/node_modules/ieee754/index.js [app-client] (ecmascript)");
const customInspectSymbol = typeof Symbol === 'function' && typeof Symbol['for'] === 'function' ? Symbol['for']('nodejs.util.inspect.custom') // eslint-disable-line dot-notation
 : null;
exports.Buffer = Buffer;
exports.SlowBuffer = SlowBuffer;
exports.INSPECT_MAX_BYTES = 50;
const K_MAX_LENGTH = 0x7fffffff;
exports.kMaxLength = K_MAX_LENGTH;
/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
 *               implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * We report that the browser does not support typed arrays if the are not subclassable
 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
 * for __proto__ and has a buggy typed array implementation.
 */ Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport();
if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error('This browser lacks typed array (Uint8Array) support which is required by ' + '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.');
}
function typedArraySupport() {
    // Can typed array instances can be augmented?
    try {
        const arr = new Uint8Array(1);
        const proto = {
            foo: function() {
                return 42;
            }
        };
        Object.setPrototypeOf(proto, Uint8Array.prototype);
        Object.setPrototypeOf(arr, proto);
        return arr.foo() === 42;
    } catch (e) {
        return false;
    }
}
Object.defineProperty(Buffer.prototype, 'parent', {
    enumerable: true,
    get: function() {
        if (!Buffer.isBuffer(this)) return undefined;
        return this.buffer;
    }
});
Object.defineProperty(Buffer.prototype, 'offset', {
    enumerable: true,
    get: function() {
        if (!Buffer.isBuffer(this)) return undefined;
        return this.byteOffset;
    }
});
function createBuffer(length) {
    if (length > K_MAX_LENGTH) {
        throw new RangeError('The value "' + length + '" is invalid for option "size"');
    }
    // Return an augmented `Uint8Array` instance
    const buf = new Uint8Array(length);
    Object.setPrototypeOf(buf, Buffer.prototype);
    return buf;
}
/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */ function Buffer(arg, encodingOrOffset, length) {
    // Common case.
    if (typeof arg === 'number') {
        if (typeof encodingOrOffset === 'string') {
            throw new TypeError('The "string" argument must be of type string. Received type number');
        }
        return allocUnsafe(arg);
    }
    return from(arg, encodingOrOffset, length);
}
Buffer.poolSize = 8192; // not used by this implementation
function from(value, encodingOrOffset, length) {
    if (typeof value === 'string') {
        return fromString(value, encodingOrOffset);
    }
    if (ArrayBuffer.isView(value)) {
        return fromArrayView(value);
    }
    if (value == null) {
        throw new TypeError('The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' + 'or Array-like Object. Received type ' + typeof value);
    }
    if (isInstance(value, ArrayBuffer) || value && isInstance(value.buffer, ArrayBuffer)) {
        return fromArrayBuffer(value, encodingOrOffset, length);
    }
    if (typeof SharedArrayBuffer !== 'undefined' && (isInstance(value, SharedArrayBuffer) || value && isInstance(value.buffer, SharedArrayBuffer))) {
        return fromArrayBuffer(value, encodingOrOffset, length);
    }
    if (typeof value === 'number') {
        throw new TypeError('The "value" argument must not be of type number. Received type number');
    }
    const valueOf = value.valueOf && value.valueOf();
    if (valueOf != null && valueOf !== value) {
        return Buffer.from(valueOf, encodingOrOffset, length);
    }
    const b = fromObject(value);
    if (b) return b;
    if (typeof Symbol !== 'undefined' && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === 'function') {
        return Buffer.from(value[Symbol.toPrimitive]('string'), encodingOrOffset, length);
    }
    throw new TypeError('The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' + 'or Array-like Object. Received type ' + typeof value);
}
/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/ Buffer.from = function(value, encodingOrOffset, length) {
    return from(value, encodingOrOffset, length);
};
// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
Object.setPrototypeOf(Buffer.prototype, Uint8Array.prototype);
Object.setPrototypeOf(Buffer, Uint8Array);
function assertSize(size) {
    if (typeof size !== 'number') {
        throw new TypeError('"size" argument must be of type number');
    } else if (size < 0) {
        throw new RangeError('The value "' + size + '" is invalid for option "size"');
    }
}
function alloc(size, fill, encoding) {
    assertSize(size);
    if (size <= 0) {
        return createBuffer(size);
    }
    if (fill !== undefined) {
        // Only pay attention to encoding if it's a string. This
        // prevents accidentally sending in a number that would
        // be interpreted as a start offset.
        return typeof encoding === 'string' ? createBuffer(size).fill(fill, encoding) : createBuffer(size).fill(fill);
    }
    return createBuffer(size);
}
/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/ Buffer.alloc = function(size, fill, encoding) {
    return alloc(size, fill, encoding);
};
function allocUnsafe(size) {
    assertSize(size);
    return createBuffer(size < 0 ? 0 : checked(size) | 0);
}
/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */ Buffer.allocUnsafe = function(size) {
    return allocUnsafe(size);
};
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */ Buffer.allocUnsafeSlow = function(size) {
    return allocUnsafe(size);
};
function fromString(string, encoding) {
    if (typeof encoding !== 'string' || encoding === '') {
        encoding = 'utf8';
    }
    if (!Buffer.isEncoding(encoding)) {
        throw new TypeError('Unknown encoding: ' + encoding);
    }
    const length = byteLength(string, encoding) | 0;
    let buf = createBuffer(length);
    const actual = buf.write(string, encoding);
    if (actual !== length) {
        // Writing a hex string, for example, that contains invalid characters will
        // cause everything after the first invalid character to be ignored. (e.g.
        // 'abxxcd' will be treated as 'ab')
        buf = buf.slice(0, actual);
    }
    return buf;
}
function fromArrayLike(array) {
    const length = array.length < 0 ? 0 : checked(array.length) | 0;
    const buf = createBuffer(length);
    for(let i = 0; i < length; i += 1){
        buf[i] = array[i] & 255;
    }
    return buf;
}
function fromArrayView(arrayView) {
    if (isInstance(arrayView, Uint8Array)) {
        const copy = new Uint8Array(arrayView);
        return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength);
    }
    return fromArrayLike(arrayView);
}
function fromArrayBuffer(array, byteOffset, length) {
    if (byteOffset < 0 || array.byteLength < byteOffset) {
        throw new RangeError('"offset" is outside of buffer bounds');
    }
    if (array.byteLength < byteOffset + (length || 0)) {
        throw new RangeError('"length" is outside of buffer bounds');
    }
    let buf;
    if (byteOffset === undefined && length === undefined) {
        buf = new Uint8Array(array);
    } else if (length === undefined) {
        buf = new Uint8Array(array, byteOffset);
    } else {
        buf = new Uint8Array(array, byteOffset, length);
    }
    // Return an augmented `Uint8Array` instance
    Object.setPrototypeOf(buf, Buffer.prototype);
    return buf;
}
function fromObject(obj) {
    if (Buffer.isBuffer(obj)) {
        const len = checked(obj.length) | 0;
        const buf = createBuffer(len);
        if (buf.length === 0) {
            return buf;
        }
        obj.copy(buf, 0, 0, len);
        return buf;
    }
    if (obj.length !== undefined) {
        if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
            return createBuffer(0);
        }
        return fromArrayLike(obj);
    }
    if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
        return fromArrayLike(obj.data);
    }
}
function checked(length) {
    // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
    // length is NaN (which is otherwise coerced to zero.)
    if (length >= K_MAX_LENGTH) {
        throw new RangeError('Attempt to allocate Buffer larger than maximum ' + 'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes');
    }
    return length | 0;
}
function SlowBuffer(length) {
    if (+length != length) {
        length = 0;
    }
    return Buffer.alloc(+length);
}
Buffer.isBuffer = function isBuffer(b) {
    return b != null && b._isBuffer === true && b !== Buffer.prototype // so Buffer.isBuffer(Buffer.prototype) will be false
    ;
};
Buffer.compare = function compare(a, b) {
    if (isInstance(a, Uint8Array)) a = Buffer.from(a, a.offset, a.byteLength);
    if (isInstance(b, Uint8Array)) b = Buffer.from(b, b.offset, b.byteLength);
    if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
        throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
    }
    if (a === b) return 0;
    let x = a.length;
    let y = b.length;
    for(let i = 0, len = Math.min(x, y); i < len; ++i){
        if (a[i] !== b[i]) {
            x = a[i];
            y = b[i];
            break;
        }
    }
    if (x < y) return -1;
    if (y < x) return 1;
    return 0;
};
Buffer.isEncoding = function isEncoding(encoding) {
    switch(String(encoding).toLowerCase()){
        case 'hex':
        case 'utf8':
        case 'utf-8':
        case 'ascii':
        case 'latin1':
        case 'binary':
        case 'base64':
        case 'ucs2':
        case 'ucs-2':
        case 'utf16le':
        case 'utf-16le':
            return true;
        default:
            return false;
    }
};
Buffer.concat = function concat(list, length) {
    if (!Array.isArray(list)) {
        throw new TypeError('"list" argument must be an Array of Buffers');
    }
    if (list.length === 0) {
        return Buffer.alloc(0);
    }
    let i;
    if (length === undefined) {
        length = 0;
        for(i = 0; i < list.length; ++i){
            length += list[i].length;
        }
    }
    const buffer = Buffer.allocUnsafe(length);
    let pos = 0;
    for(i = 0; i < list.length; ++i){
        let buf = list[i];
        if (isInstance(buf, Uint8Array)) {
            if (pos + buf.length > buffer.length) {
                if (!Buffer.isBuffer(buf)) buf = Buffer.from(buf);
                buf.copy(buffer, pos);
            } else {
                Uint8Array.prototype.set.call(buffer, buf, pos);
            }
        } else if (!Buffer.isBuffer(buf)) {
            throw new TypeError('"list" argument must be an Array of Buffers');
        } else {
            buf.copy(buffer, pos);
        }
        pos += buf.length;
    }
    return buffer;
};
function byteLength(string, encoding) {
    if (Buffer.isBuffer(string)) {
        return string.length;
    }
    if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
        return string.byteLength;
    }
    if (typeof string !== 'string') {
        throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. ' + 'Received type ' + typeof string);
    }
    const len = string.length;
    const mustMatch = arguments.length > 2 && arguments[2] === true;
    if (!mustMatch && len === 0) return 0;
    // Use a for loop to avoid recursion
    let loweredCase = false;
    for(;;){
        switch(encoding){
            case 'ascii':
            case 'latin1':
            case 'binary':
                return len;
            case 'utf8':
            case 'utf-8':
                return utf8ToBytes(string).length;
            case 'ucs2':
            case 'ucs-2':
            case 'utf16le':
            case 'utf-16le':
                return len * 2;
            case 'hex':
                return len >>> 1;
            case 'base64':
                return base64ToBytes(string).length;
            default:
                if (loweredCase) {
                    return mustMatch ? -1 : utf8ToBytes(string).length // assume utf8
                    ;
                }
                encoding = ('' + encoding).toLowerCase();
                loweredCase = true;
        }
    }
}
Buffer.byteLength = byteLength;
function slowToString(encoding, start, end) {
    let loweredCase = false;
    // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
    // property of a typed array.
    // This behaves neither like String nor Uint8Array in that we set start/end
    // to their upper/lower bounds if the value passed is out of range.
    // undefined is handled specially as per ECMA-262 6th Edition,
    // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
    if (start === undefined || start < 0) {
        start = 0;
    }
    // Return early if start > this.length. Done here to prevent potential uint32
    // coercion fail below.
    if (start > this.length) {
        return '';
    }
    if (end === undefined || end > this.length) {
        end = this.length;
    }
    if (end <= 0) {
        return '';
    }
    // Force coercion to uint32. This will also coerce falsey/NaN values to 0.
    end >>>= 0;
    start >>>= 0;
    if (end <= start) {
        return '';
    }
    if (!encoding) encoding = 'utf8';
    while(true){
        switch(encoding){
            case 'hex':
                return hexSlice(this, start, end);
            case 'utf8':
            case 'utf-8':
                return utf8Slice(this, start, end);
            case 'ascii':
                return asciiSlice(this, start, end);
            case 'latin1':
            case 'binary':
                return latin1Slice(this, start, end);
            case 'base64':
                return base64Slice(this, start, end);
            case 'ucs2':
            case 'ucs-2':
            case 'utf16le':
            case 'utf-16le':
                return utf16leSlice(this, start, end);
            default:
                if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding);
                encoding = (encoding + '').toLowerCase();
                loweredCase = true;
        }
    }
}
// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
Buffer.prototype._isBuffer = true;
function swap(b, n, m) {
    const i = b[n];
    b[n] = b[m];
    b[m] = i;
}
Buffer.prototype.swap16 = function swap16() {
    const len = this.length;
    if (len % 2 !== 0) {
        throw new RangeError('Buffer size must be a multiple of 16-bits');
    }
    for(let i = 0; i < len; i += 2){
        swap(this, i, i + 1);
    }
    return this;
};
Buffer.prototype.swap32 = function swap32() {
    const len = this.length;
    if (len % 4 !== 0) {
        throw new RangeError('Buffer size must be a multiple of 32-bits');
    }
    for(let i = 0; i < len; i += 4){
        swap(this, i, i + 3);
        swap(this, i + 1, i + 2);
    }
    return this;
};
Buffer.prototype.swap64 = function swap64() {
    const len = this.length;
    if (len % 8 !== 0) {
        throw new RangeError('Buffer size must be a multiple of 64-bits');
    }
    for(let i = 0; i < len; i += 8){
        swap(this, i, i + 7);
        swap(this, i + 1, i + 6);
        swap(this, i + 2, i + 5);
        swap(this, i + 3, i + 4);
    }
    return this;
};
Buffer.prototype.toString = function toString() {
    const length = this.length;
    if (length === 0) return '';
    if (arguments.length === 0) return utf8Slice(this, 0, length);
    return slowToString.apply(this, arguments);
};
Buffer.prototype.toLocaleString = Buffer.prototype.toString;
Buffer.prototype.equals = function equals(b) {
    if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer');
    if (this === b) return true;
    return Buffer.compare(this, b) === 0;
};
Buffer.prototype.inspect = function inspect() {
    let str = '';
    const max = exports.INSPECT_MAX_BYTES;
    str = this.toString('hex', 0, max).replace(/(.{2})/g, '$1 ').trim();
    if (this.length > max) str += ' ... ';
    return '<Buffer ' + str + '>';
};
if (customInspectSymbol) {
    Buffer.prototype[customInspectSymbol] = Buffer.prototype.inspect;
}
Buffer.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
    if (isInstance(target, Uint8Array)) {
        target = Buffer.from(target, target.offset, target.byteLength);
    }
    if (!Buffer.isBuffer(target)) {
        throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. ' + 'Received type ' + typeof target);
    }
    if (start === undefined) {
        start = 0;
    }
    if (end === undefined) {
        end = target ? target.length : 0;
    }
    if (thisStart === undefined) {
        thisStart = 0;
    }
    if (thisEnd === undefined) {
        thisEnd = this.length;
    }
    if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
        throw new RangeError('out of range index');
    }
    if (thisStart >= thisEnd && start >= end) {
        return 0;
    }
    if (thisStart >= thisEnd) {
        return -1;
    }
    if (start >= end) {
        return 1;
    }
    start >>>= 0;
    end >>>= 0;
    thisStart >>>= 0;
    thisEnd >>>= 0;
    if (this === target) return 0;
    let x = thisEnd - thisStart;
    let y = end - start;
    const len = Math.min(x, y);
    const thisCopy = this.slice(thisStart, thisEnd);
    const targetCopy = target.slice(start, end);
    for(let i = 0; i < len; ++i){
        if (thisCopy[i] !== targetCopy[i]) {
            x = thisCopy[i];
            y = targetCopy[i];
            break;
        }
    }
    if (x < y) return -1;
    if (y < x) return 1;
    return 0;
};
// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
    // Empty buffer means no match
    if (buffer.length === 0) return -1;
    // Normalize byteOffset
    if (typeof byteOffset === 'string') {
        encoding = byteOffset;
        byteOffset = 0;
    } else if (byteOffset > 0x7fffffff) {
        byteOffset = 0x7fffffff;
    } else if (byteOffset < -0x80000000) {
        byteOffset = -0x80000000;
    }
    byteOffset = +byteOffset; // Coerce to Number.
    if (numberIsNaN(byteOffset)) {
        // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
        byteOffset = dir ? 0 : buffer.length - 1;
    }
    // Normalize byteOffset: negative offsets start from the end of the buffer
    if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
    if (byteOffset >= buffer.length) {
        if (dir) return -1;
        else byteOffset = buffer.length - 1;
    } else if (byteOffset < 0) {
        if (dir) byteOffset = 0;
        else return -1;
    }
    // Normalize val
    if (typeof val === 'string') {
        val = Buffer.from(val, encoding);
    }
    // Finally, search either indexOf (if dir is true) or lastIndexOf
    if (Buffer.isBuffer(val)) {
        // Special case: looking for empty string/buffer always fails
        if (val.length === 0) {
            return -1;
        }
        return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
    } else if (typeof val === 'number') {
        val = val & 0xFF; // Search for a byte value [0-255]
        if (typeof Uint8Array.prototype.indexOf === 'function') {
            if (dir) {
                return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
            } else {
                return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
            }
        }
        return arrayIndexOf(buffer, [
            val
        ], byteOffset, encoding, dir);
    }
    throw new TypeError('val must be string, number or Buffer');
}
function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
    let indexSize = 1;
    let arrLength = arr.length;
    let valLength = val.length;
    if (encoding !== undefined) {
        encoding = String(encoding).toLowerCase();
        if (encoding === 'ucs2' || encoding === 'ucs-2' || encoding === 'utf16le' || encoding === 'utf-16le') {
            if (arr.length < 2 || val.length < 2) {
                return -1;
            }
            indexSize = 2;
            arrLength /= 2;
            valLength /= 2;
            byteOffset /= 2;
        }
    }
    function read(buf, i) {
        if (indexSize === 1) {
            return buf[i];
        } else {
            return buf.readUInt16BE(i * indexSize);
        }
    }
    let i;
    if (dir) {
        let foundIndex = -1;
        for(i = byteOffset; i < arrLength; i++){
            if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
                if (foundIndex === -1) foundIndex = i;
                if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
            } else {
                if (foundIndex !== -1) i -= i - foundIndex;
                foundIndex = -1;
            }
        }
    } else {
        if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
        for(i = byteOffset; i >= 0; i--){
            let found = true;
            for(let j = 0; j < valLength; j++){
                if (read(arr, i + j) !== read(val, j)) {
                    found = false;
                    break;
                }
            }
            if (found) return i;
        }
    }
    return -1;
}
Buffer.prototype.includes = function includes(val, byteOffset, encoding) {
    return this.indexOf(val, byteOffset, encoding) !== -1;
};
Buffer.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
    return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
};
Buffer.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
    return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
};
function hexWrite(buf, string, offset, length) {
    offset = Number(offset) || 0;
    const remaining = buf.length - offset;
    if (!length) {
        length = remaining;
    } else {
        length = Number(length);
        if (length > remaining) {
            length = remaining;
        }
    }
    const strLen = string.length;
    if (length > strLen / 2) {
        length = strLen / 2;
    }
    let i;
    for(i = 0; i < length; ++i){
        const parsed = parseInt(string.substr(i * 2, 2), 16);
        if (numberIsNaN(parsed)) return i;
        buf[offset + i] = parsed;
    }
    return i;
}
function utf8Write(buf, string, offset, length) {
    return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
}
function asciiWrite(buf, string, offset, length) {
    return blitBuffer(asciiToBytes(string), buf, offset, length);
}
function base64Write(buf, string, offset, length) {
    return blitBuffer(base64ToBytes(string), buf, offset, length);
}
function ucs2Write(buf, string, offset, length) {
    return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
}
Buffer.prototype.write = function write(string, offset, length, encoding) {
    // Buffer#write(string)
    if (offset === undefined) {
        encoding = 'utf8';
        length = this.length;
        offset = 0;
    // Buffer#write(string, encoding)
    } else if (length === undefined && typeof offset === 'string') {
        encoding = offset;
        length = this.length;
        offset = 0;
    // Buffer#write(string, offset[, length][, encoding])
    } else if (isFinite(offset)) {
        offset = offset >>> 0;
        if (isFinite(length)) {
            length = length >>> 0;
            if (encoding === undefined) encoding = 'utf8';
        } else {
            encoding = length;
            length = undefined;
        }
    } else {
        throw new Error('Buffer.write(string, encoding, offset[, length]) is no longer supported');
    }
    const remaining = this.length - offset;
    if (length === undefined || length > remaining) length = remaining;
    if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
        throw new RangeError('Attempt to write outside buffer bounds');
    }
    if (!encoding) encoding = 'utf8';
    let loweredCase = false;
    for(;;){
        switch(encoding){
            case 'hex':
                return hexWrite(this, string, offset, length);
            case 'utf8':
            case 'utf-8':
                return utf8Write(this, string, offset, length);
            case 'ascii':
            case 'latin1':
            case 'binary':
                return asciiWrite(this, string, offset, length);
            case 'base64':
                // Warning: maxLength not taken into account in base64Write
                return base64Write(this, string, offset, length);
            case 'ucs2':
            case 'ucs-2':
            case 'utf16le':
            case 'utf-16le':
                return ucs2Write(this, string, offset, length);
            default:
                if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding);
                encoding = ('' + encoding).toLowerCase();
                loweredCase = true;
        }
    }
};
Buffer.prototype.toJSON = function toJSON() {
    return {
        type: 'Buffer',
        data: Array.prototype.slice.call(this._arr || this, 0)
    };
};
function base64Slice(buf, start, end) {
    if (start === 0 && end === buf.length) {
        return base64.fromByteArray(buf);
    } else {
        return base64.fromByteArray(buf.slice(start, end));
    }
}
function utf8Slice(buf, start, end) {
    end = Math.min(buf.length, end);
    const res = [];
    let i = start;
    while(i < end){
        const firstByte = buf[i];
        let codePoint = null;
        let bytesPerSequence = firstByte > 0xEF ? 4 : firstByte > 0xDF ? 3 : firstByte > 0xBF ? 2 : 1;
        if (i + bytesPerSequence <= end) {
            let secondByte, thirdByte, fourthByte, tempCodePoint;
            switch(bytesPerSequence){
                case 1:
                    if (firstByte < 0x80) {
                        codePoint = firstByte;
                    }
                    break;
                case 2:
                    secondByte = buf[i + 1];
                    if ((secondByte & 0xC0) === 0x80) {
                        tempCodePoint = (firstByte & 0x1F) << 0x6 | secondByte & 0x3F;
                        if (tempCodePoint > 0x7F) {
                            codePoint = tempCodePoint;
                        }
                    }
                    break;
                case 3:
                    secondByte = buf[i + 1];
                    thirdByte = buf[i + 2];
                    if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
                        tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | thirdByte & 0x3F;
                        if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
                            codePoint = tempCodePoint;
                        }
                    }
                    break;
                case 4:
                    secondByte = buf[i + 1];
                    thirdByte = buf[i + 2];
                    fourthByte = buf[i + 3];
                    if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
                        tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | fourthByte & 0x3F;
                        if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
                            codePoint = tempCodePoint;
                        }
                    }
            }
        }
        if (codePoint === null) {
            // we did not generate a valid codePoint so insert a
            // replacement char (U+FFFD) and advance only 1 byte
            codePoint = 0xFFFD;
            bytesPerSequence = 1;
        } else if (codePoint > 0xFFFF) {
            // encode to utf16 (surrogate pair dance)
            codePoint -= 0x10000;
            res.push(codePoint >>> 10 & 0x3FF | 0xD800);
            codePoint = 0xDC00 | codePoint & 0x3FF;
        }
        res.push(codePoint);
        i += bytesPerSequence;
    }
    return decodeCodePointsArray(res);
}
// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
const MAX_ARGUMENTS_LENGTH = 0x1000;
function decodeCodePointsArray(codePoints) {
    const len = codePoints.length;
    if (len <= MAX_ARGUMENTS_LENGTH) {
        return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
        ;
    }
    // Decode in chunks to avoid "call stack size exceeded".
    let res = '';
    let i = 0;
    while(i < len){
        res += String.fromCharCode.apply(String, codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH));
    }
    return res;
}
function asciiSlice(buf, start, end) {
    let ret = '';
    end = Math.min(buf.length, end);
    for(let i = start; i < end; ++i){
        ret += String.fromCharCode(buf[i] & 0x7F);
    }
    return ret;
}
function latin1Slice(buf, start, end) {
    let ret = '';
    end = Math.min(buf.length, end);
    for(let i = start; i < end; ++i){
        ret += String.fromCharCode(buf[i]);
    }
    return ret;
}
function hexSlice(buf, start, end) {
    const len = buf.length;
    if (!start || start < 0) start = 0;
    if (!end || end < 0 || end > len) end = len;
    let out = '';
    for(let i = start; i < end; ++i){
        out += hexSliceLookupTable[buf[i]];
    }
    return out;
}
function utf16leSlice(buf, start, end) {
    const bytes = buf.slice(start, end);
    let res = '';
    // If bytes.length is odd, the last 8 bits must be ignored (same as node.js)
    for(let i = 0; i < bytes.length - 1; i += 2){
        res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
    }
    return res;
}
Buffer.prototype.slice = function slice(start, end) {
    const len = this.length;
    start = ~~start;
    end = end === undefined ? len : ~~end;
    if (start < 0) {
        start += len;
        if (start < 0) start = 0;
    } else if (start > len) {
        start = len;
    }
    if (end < 0) {
        end += len;
        if (end < 0) end = 0;
    } else if (end > len) {
        end = len;
    }
    if (end < start) end = start;
    const newBuf = this.subarray(start, end);
    // Return an augmented `Uint8Array` instance
    Object.setPrototypeOf(newBuf, Buffer.prototype);
    return newBuf;
};
/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */ function checkOffset(offset, ext, length) {
    if (offset % 1 !== 0 || offset < 0) throw new RangeError('offset is not uint');
    if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length');
}
Buffer.prototype.readUintLE = Buffer.prototype.readUIntLE = function readUIntLE(offset, byteLength, noAssert) {
    offset = offset >>> 0;
    byteLength = byteLength >>> 0;
    if (!noAssert) checkOffset(offset, byteLength, this.length);
    let val = this[offset];
    let mul = 1;
    let i = 0;
    while(++i < byteLength && (mul *= 0x100)){
        val += this[offset + i] * mul;
    }
    return val;
};
Buffer.prototype.readUintBE = Buffer.prototype.readUIntBE = function readUIntBE(offset, byteLength, noAssert) {
    offset = offset >>> 0;
    byteLength = byteLength >>> 0;
    if (!noAssert) {
        checkOffset(offset, byteLength, this.length);
    }
    let val = this[offset + --byteLength];
    let mul = 1;
    while(byteLength > 0 && (mul *= 0x100)){
        val += this[offset + --byteLength] * mul;
    }
    return val;
};
Buffer.prototype.readUint8 = Buffer.prototype.readUInt8 = function readUInt8(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 1, this.length);
    return this[offset];
};
Buffer.prototype.readUint16LE = Buffer.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 2, this.length);
    return this[offset] | this[offset + 1] << 8;
};
Buffer.prototype.readUint16BE = Buffer.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 2, this.length);
    return this[offset] << 8 | this[offset + 1];
};
Buffer.prototype.readUint32LE = Buffer.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 4, this.length);
    return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 0x1000000;
};
Buffer.prototype.readUint32BE = Buffer.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 4, this.length);
    return this[offset] * 0x1000000 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
};
Buffer.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE(offset) {
    offset = offset >>> 0;
    validateNumber(offset, 'offset');
    const first = this[offset];
    const last = this[offset + 7];
    if (first === undefined || last === undefined) {
        boundsError(offset, this.length - 8);
    }
    const lo = first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24;
    const hi = this[++offset] + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + last * 2 ** 24;
    return BigInt(lo) + (BigInt(hi) << BigInt(32));
});
Buffer.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE(offset) {
    offset = offset >>> 0;
    validateNumber(offset, 'offset');
    const first = this[offset];
    const last = this[offset + 7];
    if (first === undefined || last === undefined) {
        boundsError(offset, this.length - 8);
    }
    const hi = first * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
    const lo = this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last;
    return (BigInt(hi) << BigInt(32)) + BigInt(lo);
});
Buffer.prototype.readIntLE = function readIntLE(offset, byteLength, noAssert) {
    offset = offset >>> 0;
    byteLength = byteLength >>> 0;
    if (!noAssert) checkOffset(offset, byteLength, this.length);
    let val = this[offset];
    let mul = 1;
    let i = 0;
    while(++i < byteLength && (mul *= 0x100)){
        val += this[offset + i] * mul;
    }
    mul *= 0x80;
    if (val >= mul) val -= Math.pow(2, 8 * byteLength);
    return val;
};
Buffer.prototype.readIntBE = function readIntBE(offset, byteLength, noAssert) {
    offset = offset >>> 0;
    byteLength = byteLength >>> 0;
    if (!noAssert) checkOffset(offset, byteLength, this.length);
    let i = byteLength;
    let mul = 1;
    let val = this[offset + --i];
    while(i > 0 && (mul *= 0x100)){
        val += this[offset + --i] * mul;
    }
    mul *= 0x80;
    if (val >= mul) val -= Math.pow(2, 8 * byteLength);
    return val;
};
Buffer.prototype.readInt8 = function readInt8(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 1, this.length);
    if (!(this[offset] & 0x80)) return this[offset];
    return (0xff - this[offset] + 1) * -1;
};
Buffer.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 2, this.length);
    const val = this[offset] | this[offset + 1] << 8;
    return val & 0x8000 ? val | 0xFFFF0000 : val;
};
Buffer.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 2, this.length);
    const val = this[offset + 1] | this[offset] << 8;
    return val & 0x8000 ? val | 0xFFFF0000 : val;
};
Buffer.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 4, this.length);
    return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
};
Buffer.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 4, this.length);
    return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
};
Buffer.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE(offset) {
    offset = offset >>> 0;
    validateNumber(offset, 'offset');
    const first = this[offset];
    const last = this[offset + 7];
    if (first === undefined || last === undefined) {
        boundsError(offset, this.length - 8);
    }
    const val = this[offset + 4] + this[offset + 5] * 2 ** 8 + this[offset + 6] * 2 ** 16 + (last << 24) // Overflow
    ;
    return (BigInt(val) << BigInt(32)) + BigInt(first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24);
});
Buffer.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE(offset) {
    offset = offset >>> 0;
    validateNumber(offset, 'offset');
    const first = this[offset];
    const last = this[offset + 7];
    if (first === undefined || last === undefined) {
        boundsError(offset, this.length - 8);
    }
    const val = (first << 24) + // Overflow
    this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
    return (BigInt(val) << BigInt(32)) + BigInt(this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last);
});
Buffer.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 4, this.length);
    return ieee754.read(this, offset, true, 23, 4);
};
Buffer.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 4, this.length);
    return ieee754.read(this, offset, false, 23, 4);
};
Buffer.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 8, this.length);
    return ieee754.read(this, offset, true, 52, 8);
};
Buffer.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 8, this.length);
    return ieee754.read(this, offset, false, 52, 8);
};
function checkInt(buf, value, offset, ext, max, min) {
    if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
    if (value > max || value < min) throw new RangeError('"value" argument is out of bounds');
    if (offset + ext > buf.length) throw new RangeError('Index out of range');
}
Buffer.prototype.writeUintLE = Buffer.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength, noAssert) {
    value = +value;
    offset = offset >>> 0;
    byteLength = byteLength >>> 0;
    if (!noAssert) {
        const maxBytes = Math.pow(2, 8 * byteLength) - 1;
        checkInt(this, value, offset, byteLength, maxBytes, 0);
    }
    let mul = 1;
    let i = 0;
    this[offset] = value & 0xFF;
    while(++i < byteLength && (mul *= 0x100)){
        this[offset + i] = value / mul & 0xFF;
    }
    return offset + byteLength;
};
Buffer.prototype.writeUintBE = Buffer.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength, noAssert) {
    value = +value;
    offset = offset >>> 0;
    byteLength = byteLength >>> 0;
    if (!noAssert) {
        const maxBytes = Math.pow(2, 8 * byteLength) - 1;
        checkInt(this, value, offset, byteLength, maxBytes, 0);
    }
    let i = byteLength - 1;
    let mul = 1;
    this[offset + i] = value & 0xFF;
    while(--i >= 0 && (mul *= 0x100)){
        this[offset + i] = value / mul & 0xFF;
    }
    return offset + byteLength;
};
Buffer.prototype.writeUint8 = Buffer.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0);
    this[offset] = value & 0xff;
    return offset + 1;
};
Buffer.prototype.writeUint16LE = Buffer.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
    this[offset] = value & 0xff;
    this[offset + 1] = value >>> 8;
    return offset + 2;
};
Buffer.prototype.writeUint16BE = Buffer.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
    this[offset] = value >>> 8;
    this[offset + 1] = value & 0xff;
    return offset + 2;
};
Buffer.prototype.writeUint32LE = Buffer.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
    this[offset + 3] = value >>> 24;
    this[offset + 2] = value >>> 16;
    this[offset + 1] = value >>> 8;
    this[offset] = value & 0xff;
    return offset + 4;
};
Buffer.prototype.writeUint32BE = Buffer.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
    this[offset] = value >>> 24;
    this[offset + 1] = value >>> 16;
    this[offset + 2] = value >>> 8;
    this[offset + 3] = value & 0xff;
    return offset + 4;
};
function wrtBigUInt64LE(buf, value, offset, min, max) {
    checkIntBI(value, min, max, buf, offset, 7);
    let lo = Number(value & BigInt(0xffffffff));
    buf[offset++] = lo;
    lo = lo >> 8;
    buf[offset++] = lo;
    lo = lo >> 8;
    buf[offset++] = lo;
    lo = lo >> 8;
    buf[offset++] = lo;
    let hi = Number(value >> BigInt(32) & BigInt(0xffffffff));
    buf[offset++] = hi;
    hi = hi >> 8;
    buf[offset++] = hi;
    hi = hi >> 8;
    buf[offset++] = hi;
    hi = hi >> 8;
    buf[offset++] = hi;
    return offset;
}
function wrtBigUInt64BE(buf, value, offset, min, max) {
    checkIntBI(value, min, max, buf, offset, 7);
    let lo = Number(value & BigInt(0xffffffff));
    buf[offset + 7] = lo;
    lo = lo >> 8;
    buf[offset + 6] = lo;
    lo = lo >> 8;
    buf[offset + 5] = lo;
    lo = lo >> 8;
    buf[offset + 4] = lo;
    let hi = Number(value >> BigInt(32) & BigInt(0xffffffff));
    buf[offset + 3] = hi;
    hi = hi >> 8;
    buf[offset + 2] = hi;
    hi = hi >> 8;
    buf[offset + 1] = hi;
    hi = hi >> 8;
    buf[offset] = hi;
    return offset + 8;
}
Buffer.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE(value) {
    let offset = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    return wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt('0xffffffffffffffff'));
});
Buffer.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE(value) {
    let offset = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    return wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt('0xffffffffffffffff'));
});
Buffer.prototype.writeIntLE = function writeIntLE(value, offset, byteLength, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
        const limit = Math.pow(2, 8 * byteLength - 1);
        checkInt(this, value, offset, byteLength, limit - 1, -limit);
    }
    let i = 0;
    let mul = 1;
    let sub = 0;
    this[offset] = value & 0xFF;
    while(++i < byteLength && (mul *= 0x100)){
        if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
            sub = 1;
        }
        this[offset + i] = (value / mul >> 0) - sub & 0xFF;
    }
    return offset + byteLength;
};
Buffer.prototype.writeIntBE = function writeIntBE(value, offset, byteLength, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
        const limit = Math.pow(2, 8 * byteLength - 1);
        checkInt(this, value, offset, byteLength, limit - 1, -limit);
    }
    let i = byteLength - 1;
    let mul = 1;
    let sub = 0;
    this[offset + i] = value & 0xFF;
    while(--i >= 0 && (mul *= 0x100)){
        if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
            sub = 1;
        }
        this[offset + i] = (value / mul >> 0) - sub & 0xFF;
    }
    return offset + byteLength;
};
Buffer.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80);
    if (value < 0) value = 0xff + value + 1;
    this[offset] = value & 0xff;
    return offset + 1;
};
Buffer.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
    this[offset] = value & 0xff;
    this[offset + 1] = value >>> 8;
    return offset + 2;
};
Buffer.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
    this[offset] = value >>> 8;
    this[offset + 1] = value & 0xff;
    return offset + 2;
};
Buffer.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
    this[offset] = value & 0xff;
    this[offset + 1] = value >>> 8;
    this[offset + 2] = value >>> 16;
    this[offset + 3] = value >>> 24;
    return offset + 4;
};
Buffer.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
    if (value < 0) value = 0xffffffff + value + 1;
    this[offset] = value >>> 24;
    this[offset + 1] = value >>> 16;
    this[offset + 2] = value >>> 8;
    this[offset + 3] = value & 0xff;
    return offset + 4;
};
Buffer.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE(value) {
    let offset = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    return wrtBigUInt64LE(this, value, offset, -BigInt('0x8000000000000000'), BigInt('0x7fffffffffffffff'));
});
Buffer.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE(value) {
    let offset = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    return wrtBigUInt64BE(this, value, offset, -BigInt('0x8000000000000000'), BigInt('0x7fffffffffffffff'));
});
function checkIEEE754(buf, value, offset, ext, max, min) {
    if (offset + ext > buf.length) throw new RangeError('Index out of range');
    if (offset < 0) throw new RangeError('Index out of range');
}
function writeFloat(buf, value, offset, littleEndian, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
        checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38);
    }
    ieee754.write(buf, value, offset, littleEndian, 23, 4);
    return offset + 4;
}
Buffer.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
    return writeFloat(this, value, offset, true, noAssert);
};
Buffer.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
    return writeFloat(this, value, offset, false, noAssert);
};
function writeDouble(buf, value, offset, littleEndian, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
        checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308);
    }
    ieee754.write(buf, value, offset, littleEndian, 52, 8);
    return offset + 8;
}
Buffer.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
    return writeDouble(this, value, offset, true, noAssert);
};
Buffer.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
    return writeDouble(this, value, offset, false, noAssert);
};
// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy(target, targetStart, start, end) {
    if (!Buffer.isBuffer(target)) throw new TypeError('argument should be a Buffer');
    if (!start) start = 0;
    if (!end && end !== 0) end = this.length;
    if (targetStart >= target.length) targetStart = target.length;
    if (!targetStart) targetStart = 0;
    if (end > 0 && end < start) end = start;
    // Copy 0 bytes; we're done
    if (end === start) return 0;
    if (target.length === 0 || this.length === 0) return 0;
    // Fatal error conditions
    if (targetStart < 0) {
        throw new RangeError('targetStart out of bounds');
    }
    if (start < 0 || start >= this.length) throw new RangeError('Index out of range');
    if (end < 0) throw new RangeError('sourceEnd out of bounds');
    // Are we oob?
    if (end > this.length) end = this.length;
    if (target.length - targetStart < end - start) {
        end = target.length - targetStart + start;
    }
    const len = end - start;
    if (this === target && typeof Uint8Array.prototype.copyWithin === 'function') {
        // Use built-in when available, missing from IE11
        this.copyWithin(targetStart, start, end);
    } else {
        Uint8Array.prototype.set.call(target, this.subarray(start, end), targetStart);
    }
    return len;
};
// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill(val, start, end, encoding) {
    // Handle string cases:
    if (typeof val === 'string') {
        if (typeof start === 'string') {
            encoding = start;
            start = 0;
            end = this.length;
        } else if (typeof end === 'string') {
            encoding = end;
            end = this.length;
        }
        if (encoding !== undefined && typeof encoding !== 'string') {
            throw new TypeError('encoding must be a string');
        }
        if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
            throw new TypeError('Unknown encoding: ' + encoding);
        }
        if (val.length === 1) {
            const code = val.charCodeAt(0);
            if (encoding === 'utf8' && code < 128 || encoding === 'latin1') {
                // Fast path: If `val` fits into a single byte, use that numeric value.
                val = code;
            }
        }
    } else if (typeof val === 'number') {
        val = val & 255;
    } else if (typeof val === 'boolean') {
        val = Number(val);
    }
    // Invalid ranges are not set to a default, so can range check early.
    if (start < 0 || this.length < start || this.length < end) {
        throw new RangeError('Out of range index');
    }
    if (end <= start) {
        return this;
    }
    start = start >>> 0;
    end = end === undefined ? this.length : end >>> 0;
    if (!val) val = 0;
    let i;
    if (typeof val === 'number') {
        for(i = start; i < end; ++i){
            this[i] = val;
        }
    } else {
        const bytes = Buffer.isBuffer(val) ? val : Buffer.from(val, encoding);
        const len = bytes.length;
        if (len === 0) {
            throw new TypeError('The value "' + val + '" is invalid for argument "value"');
        }
        for(i = 0; i < end - start; ++i){
            this[i + start] = bytes[i % len];
        }
    }
    return this;
};
// CUSTOM ERRORS
// =============
// Simplified versions from Node, changed for Buffer-only usage
const errors = {};
function E(sym, getMessage, Base) {
    errors[sym] = class NodeError extends Base {
        get code() {
            return sym;
        }
        set code(value) {
            Object.defineProperty(this, 'code', {
                configurable: true,
                enumerable: true,
                value,
                writable: true
            });
        }
        toString() {
            return "".concat(this.name, " [").concat(sym, "]: ").concat(this.message);
        }
        constructor(){
            super();
            Object.defineProperty(this, 'message', {
                value: getMessage.apply(this, arguments),
                writable: true,
                configurable: true
            });
            // Add the error code to the name to include it in the stack trace.
            this.name = "".concat(this.name, " [").concat(sym, "]");
            // Access the stack to generate the error message including the error code
            // from the name.
            this.stack; // eslint-disable-line no-unused-expressions
            // Reset the name to the actual name.
            delete this.name;
        }
    };
}
E('ERR_BUFFER_OUT_OF_BOUNDS', function(name) {
    if (name) {
        return "".concat(name, " is outside of buffer bounds");
    }
    return 'Attempt to access memory outside buffer bounds';
}, RangeError);
E('ERR_INVALID_ARG_TYPE', function(name, actual) {
    return 'The "'.concat(name, '" argument must be of type number. Received type ').concat(typeof actual);
}, TypeError);
E('ERR_OUT_OF_RANGE', function(str, range, input) {
    let msg = 'The value of "'.concat(str, '" is out of range.');
    let received = input;
    if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
        received = addNumericalSeparator(String(input));
    } else if (typeof input === 'bigint') {
        received = String(input);
        if (input > BigInt(2) ** BigInt(32) || input < -(BigInt(2) ** BigInt(32))) {
            received = addNumericalSeparator(received);
        }
        received += 'n';
    }
    msg += " It must be ".concat(range, ". Received ").concat(received);
    return msg;
}, RangeError);
function addNumericalSeparator(val) {
    let res = '';
    let i = val.length;
    const start = val[0] === '-' ? 1 : 0;
    for(; i >= start + 4; i -= 3){
        res = "_".concat(val.slice(i - 3, i)).concat(res);
    }
    return "".concat(val.slice(0, i)).concat(res);
}
// CHECK FUNCTIONS
// ===============
function checkBounds(buf, offset, byteLength) {
    validateNumber(offset, 'offset');
    if (buf[offset] === undefined || buf[offset + byteLength] === undefined) {
        boundsError(offset, buf.length - (byteLength + 1));
    }
}
function checkIntBI(value, min, max, buf, offset, byteLength) {
    if (value > max || value < min) {
        const n = typeof min === 'bigint' ? 'n' : '';
        let range;
        if (byteLength > 3) {
            if (min === 0 || min === BigInt(0)) {
                range = ">= 0".concat(n, " and < 2").concat(n, " ** ").concat((byteLength + 1) * 8).concat(n);
            } else {
                range = ">= -(2".concat(n, " ** ").concat((byteLength + 1) * 8 - 1).concat(n, ") and < 2 ** ") + "".concat((byteLength + 1) * 8 - 1).concat(n);
            }
        } else {
            range = ">= ".concat(min).concat(n, " and <= ").concat(max).concat(n);
        }
        throw new errors.ERR_OUT_OF_RANGE('value', range, value);
    }
    checkBounds(buf, offset, byteLength);
}
function validateNumber(value, name) {
    if (typeof value !== 'number') {
        throw new errors.ERR_INVALID_ARG_TYPE(name, 'number', value);
    }
}
function boundsError(value, length, type) {
    if (Math.floor(value) !== value) {
        validateNumber(value, type);
        throw new errors.ERR_OUT_OF_RANGE(type || 'offset', 'an integer', value);
    }
    if (length < 0) {
        throw new errors.ERR_BUFFER_OUT_OF_BOUNDS();
    }
    throw new errors.ERR_OUT_OF_RANGE(type || 'offset', ">= ".concat(type ? 1 : 0, " and <= ").concat(length), value);
}
// HELPER FUNCTIONS
// ================
const INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
function base64clean(str) {
    // Node takes equal signs as end of the Base64 encoding
    str = str.split('=')[0];
    // Node strips out invalid characters like \n and \t from the string, base64-js does not
    str = str.trim().replace(INVALID_BASE64_RE, '');
    // Node converts strings with length < 2 to ''
    if (str.length < 2) return '';
    // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
    while(str.length % 4 !== 0){
        str = str + '=';
    }
    return str;
}
function utf8ToBytes(string, units) {
    units = units || Infinity;
    let codePoint;
    const length = string.length;
    let leadSurrogate = null;
    const bytes = [];
    for(let i = 0; i < length; ++i){
        codePoint = string.charCodeAt(i);
        // is surrogate component
        if (codePoint > 0xD7FF && codePoint < 0xE000) {
            // last char was a lead
            if (!leadSurrogate) {
                // no lead yet
                if (codePoint > 0xDBFF) {
                    // unexpected trail
                    if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
                    continue;
                } else if (i + 1 === length) {
                    // unpaired lead
                    if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
                    continue;
                }
                // valid lead
                leadSurrogate = codePoint;
                continue;
            }
            // 2 leads in a row
            if (codePoint < 0xDC00) {
                if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
                leadSurrogate = codePoint;
                continue;
            }
            // valid surrogate pair
            codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
        } else if (leadSurrogate) {
            // valid bmp char, but last char was a lead
            if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
        }
        leadSurrogate = null;
        // encode utf8
        if (codePoint < 0x80) {
            if ((units -= 1) < 0) break;
            bytes.push(codePoint);
        } else if (codePoint < 0x800) {
            if ((units -= 2) < 0) break;
            bytes.push(codePoint >> 0x6 | 0xC0, codePoint & 0x3F | 0x80);
        } else if (codePoint < 0x10000) {
            if ((units -= 3) < 0) break;
            bytes.push(codePoint >> 0xC | 0xE0, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
        } else if (codePoint < 0x110000) {
            if ((units -= 4) < 0) break;
            bytes.push(codePoint >> 0x12 | 0xF0, codePoint >> 0xC & 0x3F | 0x80, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
        } else {
            throw new Error('Invalid code point');
        }
    }
    return bytes;
}
function asciiToBytes(str) {
    const byteArray = [];
    for(let i = 0; i < str.length; ++i){
        // Node's code seems to be doing this and not & 0x7F..
        byteArray.push(str.charCodeAt(i) & 0xFF);
    }
    return byteArray;
}
function utf16leToBytes(str, units) {
    let c, hi, lo;
    const byteArray = [];
    for(let i = 0; i < str.length; ++i){
        if ((units -= 2) < 0) break;
        c = str.charCodeAt(i);
        hi = c >> 8;
        lo = c % 256;
        byteArray.push(lo);
        byteArray.push(hi);
    }
    return byteArray;
}
function base64ToBytes(str) {
    return base64.toByteArray(base64clean(str));
}
function blitBuffer(src, dst, offset, length) {
    let i;
    for(i = 0; i < length; ++i){
        if (i + offset >= dst.length || i >= src.length) break;
        dst[i + offset] = src[i];
    }
    return i;
}
// ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass
// the `instanceof` check but they should be treated as of that type.
// See: https://github.com/feross/buffer/issues/166
function isInstance(obj, type) {
    return obj instanceof type || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type.name;
}
function numberIsNaN(obj) {
    // For IE11 support
    return obj !== obj // eslint-disable-line no-self-compare
    ;
}
// Create lookup table for `toString('hex')`
// See: https://github.com/feross/buffer/issues/219
const hexSliceLookupTable = function() {
    const alphabet = '0123456789abcdef';
    const table = new Array(256);
    for(let i = 0; i < 16; ++i){
        const i16 = i * 16;
        for(let j = 0; j < 16; ++j){
            table[i16 + j] = alphabet[i] + alphabet[j];
        }
    }
    return table;
}();
// Return not function with Error if BigInt not supported
function defineBigIntMethod(fn) {
    return typeof BigInt === 'undefined' ? BufferBigIntNotDefined : fn;
}
function BufferBigIntNotDefined() {
    throw new Error('BigInt not supported');
}
}}),
"[project]/node_modules/events/events.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
var R = typeof Reflect === 'object' ? Reflect : null;
var ReflectApply = R && typeof R.apply === 'function' ? R.apply : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
};
var ReflectOwnKeys;
if (R && typeof R.ownKeys === 'function') {
    ReflectOwnKeys = R.ownKeys;
} else if (Object.getOwnPropertySymbols) {
    ReflectOwnKeys = function ReflectOwnKeys(target) {
        return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
    };
} else {
    ReflectOwnKeys = function ReflectOwnKeys(target) {
        return Object.getOwnPropertyNames(target);
    };
}
function ProcessEmitWarning(warning) {
    if (console && console.warn) console.warn(warning);
}
var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
    return value !== value;
};
function EventEmitter() {
    EventEmitter.init.call(this);
}
module.exports = EventEmitter;
module.exports.once = once;
// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;
EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;
// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;
function checkListener(listener) {
    if (typeof listener !== 'function') {
        throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
    }
}
Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
    enumerable: true,
    get: function() {
        return defaultMaxListeners;
    },
    set: function(arg) {
        if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
            throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
        }
        defaultMaxListeners = arg;
    }
});
EventEmitter.init = function() {
    if (this._events === undefined || this._events === Object.getPrototypeOf(this)._events) {
        this._events = Object.create(null);
        this._eventsCount = 0;
    }
    this._maxListeners = this._maxListeners || undefined;
};
// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
    if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
        throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
    }
    this._maxListeners = n;
    return this;
};
function _getMaxListeners(that) {
    if (that._maxListeners === undefined) return EventEmitter.defaultMaxListeners;
    return that._maxListeners;
}
EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
    return _getMaxListeners(this);
};
EventEmitter.prototype.emit = function emit(type) {
    var args = [];
    for(var i = 1; i < arguments.length; i++)args.push(arguments[i]);
    var doError = type === 'error';
    var events = this._events;
    if (events !== undefined) doError = doError && events.error === undefined;
    else if (!doError) return false;
    // If there is no 'error' event listener then throw.
    if (doError) {
        var er;
        if (args.length > 0) er = args[0];
        if (er instanceof Error) {
            // Note: The comments on the `throw` lines are intentional, they show
            // up in Node's output if this results in an unhandled exception.
            throw er; // Unhandled 'error' event
        }
        // At least give some kind of context to the user
        var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
        err.context = er;
        throw err; // Unhandled 'error' event
    }
    var handler = events[type];
    if (handler === undefined) return false;
    if (typeof handler === 'function') {
        ReflectApply(handler, this, args);
    } else {
        var len = handler.length;
        var listeners = arrayClone(handler, len);
        for(var i = 0; i < len; ++i)ReflectApply(listeners[i], this, args);
    }
    return true;
};
function _addListener(target, type, listener, prepend) {
    var m;
    var events;
    var existing;
    checkListener(listener);
    events = target._events;
    if (events === undefined) {
        events = target._events = Object.create(null);
        target._eventsCount = 0;
    } else {
        // To avoid recursion in the case that type === "newListener"! Before
        // adding it to the listeners, first emit "newListener".
        if (events.newListener !== undefined) {
            target.emit('newListener', type, listener.listener ? listener.listener : listener);
            // Re-assign `events` because a newListener handler could have caused the
            // this._events to be assigned to a new object
            events = target._events;
        }
        existing = events[type];
    }
    if (existing === undefined) {
        // Optimize the case of one listener. Don't need the extra array object.
        existing = events[type] = listener;
        ++target._eventsCount;
    } else {
        if (typeof existing === 'function') {
            // Adding the second element, need to change to array.
            existing = events[type] = prepend ? [
                listener,
                existing
            ] : [
                existing,
                listener
            ];
        // If we've already got an array, just append.
        } else if (prepend) {
            existing.unshift(listener);
        } else {
            existing.push(listener);
        }
        // Check for listener leak
        m = _getMaxListeners(target);
        if (m > 0 && existing.length > m && !existing.warned) {
            existing.warned = true;
            // No error code for this since it is a Warning
            // eslint-disable-next-line no-restricted-syntax
            var w = new Error('Possible EventEmitter memory leak detected. ' + existing.length + ' ' + String(type) + ' listeners ' + 'added. Use emitter.setMaxListeners() to ' + 'increase limit');
            w.name = 'MaxListenersExceededWarning';
            w.emitter = target;
            w.type = type;
            w.count = existing.length;
            ProcessEmitWarning(w);
        }
    }
    return target;
}
EventEmitter.prototype.addListener = function addListener(type, listener) {
    return _addListener(this, type, listener, false);
};
EventEmitter.prototype.on = EventEmitter.prototype.addListener;
EventEmitter.prototype.prependListener = function prependListener(type, listener) {
    return _addListener(this, type, listener, true);
};
function onceWrapper() {
    if (!this.fired) {
        this.target.removeListener(this.type, this.wrapFn);
        this.fired = true;
        if (arguments.length === 0) return this.listener.call(this.target);
        return this.listener.apply(this.target, arguments);
    }
}
function _onceWrap(target, type, listener) {
    var state = {
        fired: false,
        wrapFn: undefined,
        target: target,
        type: type,
        listener: listener
    };
    var wrapped = onceWrapper.bind(state);
    wrapped.listener = listener;
    state.wrapFn = wrapped;
    return wrapped;
}
EventEmitter.prototype.once = function once(type, listener) {
    checkListener(listener);
    this.on(type, _onceWrap(this, type, listener));
    return this;
};
EventEmitter.prototype.prependOnceListener = function prependOnceListener(type, listener) {
    checkListener(listener);
    this.prependListener(type, _onceWrap(this, type, listener));
    return this;
};
// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener = function removeListener(type, listener) {
    var list, events, position, i, originalListener;
    checkListener(listener);
    events = this._events;
    if (events === undefined) return this;
    list = events[type];
    if (list === undefined) return this;
    if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0) this._events = Object.create(null);
        else {
            delete events[type];
            if (events.removeListener) this.emit('removeListener', type, list.listener || listener);
        }
    } else if (typeof list !== 'function') {
        position = -1;
        for(i = list.length - 1; i >= 0; i--){
            if (list[i] === listener || list[i].listener === listener) {
                originalListener = list[i].listener;
                position = i;
                break;
            }
        }
        if (position < 0) return this;
        if (position === 0) list.shift();
        else {
            spliceOne(list, position);
        }
        if (list.length === 1) events[type] = list[0];
        if (events.removeListener !== undefined) this.emit('removeListener', type, originalListener || listener);
    }
    return this;
};
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.removeAllListeners = function removeAllListeners(type) {
    var listeners, events, i;
    events = this._events;
    if (events === undefined) return this;
    // not listening for removeListener, no need to emit
    if (events.removeListener === undefined) {
        if (arguments.length === 0) {
            this._events = Object.create(null);
            this._eventsCount = 0;
        } else if (events[type] !== undefined) {
            if (--this._eventsCount === 0) this._events = Object.create(null);
            else delete events[type];
        }
        return this;
    }
    // emit removeListener for all listeners on all events
    if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for(i = 0; i < keys.length; ++i){
            key = keys[i];
            if (key === 'removeListener') continue;
            this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
    }
    listeners = events[type];
    if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
    } else if (listeners !== undefined) {
        // LIFO order
        for(i = listeners.length - 1; i >= 0; i--){
            this.removeListener(type, listeners[i]);
        }
    }
    return this;
};
function _listeners(target, type, unwrap) {
    var events = target._events;
    if (events === undefined) return [];
    var evlistener = events[type];
    if (evlistener === undefined) return [];
    if (typeof evlistener === 'function') return unwrap ? [
        evlistener.listener || evlistener
    ] : [
        evlistener
    ];
    return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}
EventEmitter.prototype.listeners = function listeners(type) {
    return _listeners(this, type, true);
};
EventEmitter.prototype.rawListeners = function rawListeners(type) {
    return _listeners(this, type, false);
};
EventEmitter.listenerCount = function(emitter, type) {
    if (typeof emitter.listenerCount === 'function') {
        return emitter.listenerCount(type);
    } else {
        return listenerCount.call(emitter, type);
    }
};
EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
    var events = this._events;
    if (events !== undefined) {
        var evlistener = events[type];
        if (typeof evlistener === 'function') {
            return 1;
        } else if (evlistener !== undefined) {
            return evlistener.length;
        }
    }
    return 0;
}
EventEmitter.prototype.eventNames = function eventNames() {
    return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};
function arrayClone(arr, n) {
    var copy = new Array(n);
    for(var i = 0; i < n; ++i)copy[i] = arr[i];
    return copy;
}
function spliceOne(list, index) {
    for(; index + 1 < list.length; index++)list[index] = list[index + 1];
    list.pop();
}
function unwrapListeners(arr) {
    var ret = new Array(arr.length);
    for(var i = 0; i < ret.length; ++i){
        ret[i] = arr[i].listener || arr[i];
    }
    return ret;
}
function once(emitter, name) {
    return new Promise(function(resolve, reject) {
        function errorListener(err) {
            emitter.removeListener(name, resolver);
            reject(err);
        }
        function resolver() {
            if (typeof emitter.removeListener === 'function') {
                emitter.removeListener('error', errorListener);
            }
            resolve([].slice.call(arguments));
        }
        ;
        eventTargetAgnosticAddListener(emitter, name, resolver, {
            once: true
        });
        if (name !== 'error') {
            addErrorHandlerIfEventEmitter(emitter, errorListener, {
                once: true
            });
        }
    });
}
function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
    if (typeof emitter.on === 'function') {
        eventTargetAgnosticAddListener(emitter, 'error', handler, flags);
    }
}
function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
    if (typeof emitter.on === 'function') {
        if (flags.once) {
            emitter.once(name, listener);
        } else {
            emitter.on(name, listener);
        }
    } else if (typeof emitter.addEventListener === 'function') {
        // EventTarget does not have `error` event semantics like Node
        // EventEmitters, we do not listen for `error` events here.
        emitter.addEventListener(name, function wrapListener(arg) {
            // IE does not have builtin `{ once: true }` support so we
            // have to do it manually.
            if (flags.once) {
                emitter.removeEventListener(name, wrapListener);
            }
            listener(arg);
        });
    } else {
        throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
    }
}
}}),
"[project]/node_modules/has-symbols/shams.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
/** @type {import('./shams')} */ /* eslint complexity: [2, 18], max-statements: [2, 33] */ module.exports = function hasSymbols() {
    if (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') {
        return false;
    }
    if (typeof Symbol.iterator === 'symbol') {
        return true;
    }
    /** @type {{ [k in symbol]?: unknown }} */ var obj = {};
    var sym = Symbol('test');
    var symObj = Object(sym);
    if (typeof sym === 'string') {
        return false;
    }
    if (Object.prototype.toString.call(sym) !== '[object Symbol]') {
        return false;
    }
    if (Object.prototype.toString.call(symObj) !== '[object Symbol]') {
        return false;
    }
    // temp disabled per https://github.com/ljharb/object.assign/issues/17
    // if (sym instanceof Symbol) { return false; }
    // temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4
    // if (!(symObj instanceof Symbol)) { return false; }
    // if (typeof Symbol.prototype.toString !== 'function') { return false; }
    // if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }
    var symVal = 42;
    obj[sym] = symVal;
    for(var _ in obj){
        return false;
    } // eslint-disable-line no-restricted-syntax, no-unreachable-loop
    if (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) {
        return false;
    }
    if (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) {
        return false;
    }
    var syms = Object.getOwnPropertySymbols(obj);
    if (syms.length !== 1 || syms[0] !== sym) {
        return false;
    }
    if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) {
        return false;
    }
    if (typeof Object.getOwnPropertyDescriptor === 'function') {
        // eslint-disable-next-line no-extra-parens
        var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
        if (descriptor.value !== symVal || descriptor.enumerable !== true) {
            return false;
        }
    }
    return true;
};
}}),
"[project]/node_modules/has-symbols/index.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
var origSymbol = typeof Symbol !== 'undefined' && Symbol;
var hasSymbolSham = __turbopack_context__.r("[project]/node_modules/has-symbols/shams.js [app-client] (ecmascript)");
/** @type {import('.')} */ module.exports = function hasNativeSymbols() {
    if (typeof origSymbol !== 'function') {
        return false;
    }
    if (typeof Symbol !== 'function') {
        return false;
    }
    if (typeof origSymbol('foo') !== 'symbol') {
        return false;
    }
    if (typeof Symbol('bar') !== 'symbol') {
        return false;
    }
    return hasSymbolSham();
};
}}),
"[project]/node_modules/has-tostringtag/shams.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
var hasSymbols = __turbopack_context__.r("[project]/node_modules/has-symbols/shams.js [app-client] (ecmascript)");
/** @type {import('.')} */ module.exports = function hasToStringTagShams() {
    return hasSymbols() && !!Symbol.toStringTag;
};
}}),
"[project]/node_modules/es-object-atoms/index.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
/** @type {import('.')} */ module.exports = Object;
}}),
"[project]/node_modules/es-errors/index.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
/** @type {import('.')} */ module.exports = Error;
}}),
"[project]/node_modules/es-errors/eval.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
/** @type {import('./eval')} */ module.exports = EvalError;
}}),
"[project]/node_modules/es-errors/range.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
/** @type {import('./range')} */ module.exports = RangeError;
}}),
"[project]/node_modules/es-errors/ref.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
/** @type {import('./ref')} */ module.exports = ReferenceError;
}}),
"[project]/node_modules/es-errors/syntax.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
/** @type {import('./syntax')} */ module.exports = SyntaxError;
}}),
"[project]/node_modules/es-errors/type.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
/** @type {import('./type')} */ module.exports = TypeError;
}}),
"[project]/node_modules/es-errors/uri.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
/** @type {import('./uri')} */ module.exports = URIError;
}}),
"[project]/node_modules/math-intrinsics/abs.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
/** @type {import('./abs')} */ module.exports = Math.abs;
}}),
"[project]/node_modules/math-intrinsics/floor.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
/** @type {import('./floor')} */ module.exports = Math.floor;
}}),
"[project]/node_modules/math-intrinsics/max.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
/** @type {import('./max')} */ module.exports = Math.max;
}}),
"[project]/node_modules/math-intrinsics/min.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
/** @type {import('./min')} */ module.exports = Math.min;
}}),
"[project]/node_modules/math-intrinsics/pow.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
/** @type {import('./pow')} */ module.exports = Math.pow;
}}),
"[project]/node_modules/math-intrinsics/round.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
/** @type {import('./round')} */ module.exports = Math.round;
}}),
"[project]/node_modules/math-intrinsics/isNaN.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
/** @type {import('./isNaN')} */ module.exports = Number.isNaN || function isNaN(a) {
    return a !== a;
};
}}),
"[project]/node_modules/math-intrinsics/sign.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
var $isNaN = __turbopack_context__.r("[project]/node_modules/math-intrinsics/isNaN.js [app-client] (ecmascript)");
/** @type {import('./sign')} */ module.exports = function sign(number) {
    if ($isNaN(number) || number === 0) {
        return number;
    }
    return number < 0 ? -1 : +1;
};
}}),
"[project]/node_modules/gopd/gOPD.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
/** @type {import('./gOPD')} */ module.exports = Object.getOwnPropertyDescriptor;
}}),
"[project]/node_modules/gopd/index.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
/** @type {import('.')} */ var $gOPD = __turbopack_context__.r("[project]/node_modules/gopd/gOPD.js [app-client] (ecmascript)");
if ($gOPD) {
    try {
        $gOPD([], 'length');
    } catch (e) {
        // IE 8 has a broken gOPD
        $gOPD = null;
    }
}
module.exports = $gOPD;
}}),
"[project]/node_modules/es-define-property/index.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
/** @type {import('.')} */ var $defineProperty = Object.defineProperty || false;
if ($defineProperty) {
    try {
        $defineProperty({}, 'a', {
            value: 1
        });
    } catch (e) {
        // IE 8 has a broken defineProperty
        $defineProperty = false;
    }
}
module.exports = $defineProperty;
}}),
"[project]/node_modules/get-proto/Reflect.getPrototypeOf.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
/** @type {import('./Reflect.getPrototypeOf')} */ module.exports = typeof Reflect !== 'undefined' && Reflect.getPrototypeOf || null;
}}),
"[project]/node_modules/get-proto/Object.getPrototypeOf.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
var $Object = __turbopack_context__.r("[project]/node_modules/es-object-atoms/index.js [app-client] (ecmascript)");
/** @type {import('./Object.getPrototypeOf')} */ module.exports = $Object.getPrototypeOf || null;
}}),
"[project]/node_modules/get-proto/index.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
var reflectGetProto = __turbopack_context__.r("[project]/node_modules/get-proto/Reflect.getPrototypeOf.js [app-client] (ecmascript)");
var originalGetProto = __turbopack_context__.r("[project]/node_modules/get-proto/Object.getPrototypeOf.js [app-client] (ecmascript)");
var getDunderProto = __turbopack_context__.r("[project]/node_modules/dunder-proto/get.js [app-client] (ecmascript)");
/** @type {import('.')} */ module.exports = reflectGetProto ? function getProto(O) {
    // @ts-expect-error TS can't narrow inside a closure, for some reason
    return reflectGetProto(O);
} : originalGetProto ? function getProto(O) {
    if (!O || typeof O !== 'object' && typeof O !== 'function') {
        throw new TypeError('getProto: not an object');
    }
    // @ts-expect-error TS can't narrow inside a closure, for some reason
    return originalGetProto(O);
} : getDunderProto ? function getProto(O) {
    // @ts-expect-error TS can't narrow inside a closure, for some reason
    return getDunderProto(O);
} : null;
}}),
"[project]/node_modules/function-bind/implementation.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
/* eslint no-invalid-this: 1 */ var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
var toStr = Object.prototype.toString;
var max = Math.max;
var funcType = '[object Function]';
var concatty = function concatty(a, b) {
    var arr = [];
    for(var i = 0; i < a.length; i += 1){
        arr[i] = a[i];
    }
    for(var j = 0; j < b.length; j += 1){
        arr[j + a.length] = b[j];
    }
    return arr;
};
var slicy = function slicy(arrLike, offset) {
    var arr = [];
    for(var i = offset || 0, j = 0; i < arrLike.length; i += 1, j += 1){
        arr[j] = arrLike[i];
    }
    return arr;
};
var joiny = function(arr, joiner) {
    var str = '';
    for(var i = 0; i < arr.length; i += 1){
        str += arr[i];
        if (i + 1 < arr.length) {
            str += joiner;
        }
    }
    return str;
};
module.exports = function bind(that) {
    var target = this;
    if (typeof target !== 'function' || toStr.apply(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slicy(arguments, 1);
    var bound;
    var binder = function() {
        if (this instanceof bound) {
            var result = target.apply(this, concatty(args, arguments));
            if (Object(result) === result) {
                return result;
            }
            return this;
        }
        return target.apply(that, concatty(args, arguments));
    };
    var boundLength = max(0, target.length - args.length);
    var boundArgs = [];
    for(var i = 0; i < boundLength; i++){
        boundArgs[i] = '$' + i;
    }
    bound = Function('binder', 'return function (' + joiny(boundArgs, ',') + '){ return binder.apply(this,arguments); }')(binder);
    if (target.prototype) {
        var Empty = function Empty() {};
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
    }
    return bound;
};
}}),
"[project]/node_modules/function-bind/index.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
var implementation = __turbopack_context__.r("[project]/node_modules/function-bind/implementation.js [app-client] (ecmascript)");
module.exports = Function.prototype.bind || implementation;
}}),
"[project]/node_modules/call-bind-apply-helpers/functionCall.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
/** @type {import('./functionCall')} */ module.exports = Function.prototype.call;
}}),
"[project]/node_modules/call-bind-apply-helpers/functionApply.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
/** @type {import('./functionApply')} */ module.exports = Function.prototype.apply;
}}),
"[project]/node_modules/call-bind-apply-helpers/reflectApply.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
/** @type {import('./reflectApply')} */ module.exports = typeof Reflect !== 'undefined' && Reflect && Reflect.apply;
}}),
"[project]/node_modules/call-bind-apply-helpers/actualApply.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
var bind = __turbopack_context__.r("[project]/node_modules/function-bind/index.js [app-client] (ecmascript)");
var $apply = __turbopack_context__.r("[project]/node_modules/call-bind-apply-helpers/functionApply.js [app-client] (ecmascript)");
var $call = __turbopack_context__.r("[project]/node_modules/call-bind-apply-helpers/functionCall.js [app-client] (ecmascript)");
var $reflectApply = __turbopack_context__.r("[project]/node_modules/call-bind-apply-helpers/reflectApply.js [app-client] (ecmascript)");
/** @type {import('./actualApply')} */ module.exports = $reflectApply || bind.call($call, $apply);
}}),
"[project]/node_modules/call-bind-apply-helpers/index.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
var bind = __turbopack_context__.r("[project]/node_modules/function-bind/index.js [app-client] (ecmascript)");
var $TypeError = __turbopack_context__.r("[project]/node_modules/es-errors/type.js [app-client] (ecmascript)");
var $call = __turbopack_context__.r("[project]/node_modules/call-bind-apply-helpers/functionCall.js [app-client] (ecmascript)");
var $actualApply = __turbopack_context__.r("[project]/node_modules/call-bind-apply-helpers/actualApply.js [app-client] (ecmascript)");
/** @type {(args: [Function, thisArg?: unknown, ...args: unknown[]]) => Function} TODO FIXME, find a way to use import('.') */ module.exports = function callBindBasic(args) {
    if (args.length < 1 || typeof args[0] !== 'function') {
        throw new $TypeError('a function is required');
    }
    return $actualApply(bind, $call, args);
};
}}),
"[project]/node_modules/call-bind-apply-helpers/applyBind.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
var bind = __turbopack_context__.r("[project]/node_modules/function-bind/index.js [app-client] (ecmascript)");
var $apply = __turbopack_context__.r("[project]/node_modules/call-bind-apply-helpers/functionApply.js [app-client] (ecmascript)");
var actualApply = __turbopack_context__.r("[project]/node_modules/call-bind-apply-helpers/actualApply.js [app-client] (ecmascript)");
/** @type {import('./applyBind')} */ module.exports = function applyBind() {
    return actualApply(bind, $apply, arguments);
};
}}),
"[project]/node_modules/dunder-proto/get.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
var callBind = __turbopack_context__.r("[project]/node_modules/call-bind-apply-helpers/index.js [app-client] (ecmascript)");
var gOPD = __turbopack_context__.r("[project]/node_modules/gopd/index.js [app-client] (ecmascript)");
var hasProtoAccessor;
try {
    // eslint-disable-next-line no-extra-parens, no-proto
    hasProtoAccessor = /** @type {{ __proto__?: typeof Array.prototype }} */ [].__proto__ === Array.prototype;
} catch (e) {
    if (!e || typeof e !== 'object' || !('code' in e) || e.code !== 'ERR_PROTO_ACCESS') {
        throw e;
    }
}
// eslint-disable-next-line no-extra-parens
var desc = !!hasProtoAccessor && gOPD && gOPD(Object.prototype, '__proto__');
var $Object = Object;
var $getPrototypeOf = $Object.getPrototypeOf;
/** @type {import('./get')} */ module.exports = desc && typeof desc.get === 'function' ? callBind([
    desc.get
]) : typeof $getPrototypeOf === 'function' ? /** @type {import('./get')} */ function getDunder(value) {
    // eslint-disable-next-line eqeqeq
    return $getPrototypeOf(value == null ? value : $Object(value));
} : false;
}}),
"[project]/node_modules/hasown/index.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
var call = Function.prototype.call;
var $hasOwn = Object.prototype.hasOwnProperty;
var bind = __turbopack_context__.r("[project]/node_modules/function-bind/index.js [app-client] (ecmascript)");
/** @type {import('.')} */ module.exports = bind.call(call, $hasOwn);
}}),
"[project]/node_modules/get-intrinsic/index.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
var undefined1;
var $Object = __turbopack_context__.r("[project]/node_modules/es-object-atoms/index.js [app-client] (ecmascript)");
var $Error = __turbopack_context__.r("[project]/node_modules/es-errors/index.js [app-client] (ecmascript)");
var $EvalError = __turbopack_context__.r("[project]/node_modules/es-errors/eval.js [app-client] (ecmascript)");
var $RangeError = __turbopack_context__.r("[project]/node_modules/es-errors/range.js [app-client] (ecmascript)");
var $ReferenceError = __turbopack_context__.r("[project]/node_modules/es-errors/ref.js [app-client] (ecmascript)");
var $SyntaxError = __turbopack_context__.r("[project]/node_modules/es-errors/syntax.js [app-client] (ecmascript)");
var $TypeError = __turbopack_context__.r("[project]/node_modules/es-errors/type.js [app-client] (ecmascript)");
var $URIError = __turbopack_context__.r("[project]/node_modules/es-errors/uri.js [app-client] (ecmascript)");
var abs = __turbopack_context__.r("[project]/node_modules/math-intrinsics/abs.js [app-client] (ecmascript)");
var floor = __turbopack_context__.r("[project]/node_modules/math-intrinsics/floor.js [app-client] (ecmascript)");
var max = __turbopack_context__.r("[project]/node_modules/math-intrinsics/max.js [app-client] (ecmascript)");
var min = __turbopack_context__.r("[project]/node_modules/math-intrinsics/min.js [app-client] (ecmascript)");
var pow = __turbopack_context__.r("[project]/node_modules/math-intrinsics/pow.js [app-client] (ecmascript)");
var round = __turbopack_context__.r("[project]/node_modules/math-intrinsics/round.js [app-client] (ecmascript)");
var sign = __turbopack_context__.r("[project]/node_modules/math-intrinsics/sign.js [app-client] (ecmascript)");
var $Function = Function;
// eslint-disable-next-line consistent-return
var getEvalledConstructor = function(expressionSyntax) {
    try {
        return $Function('"use strict"; return (' + expressionSyntax + ').constructor;')();
    } catch (e) {}
};
var $gOPD = __turbopack_context__.r("[project]/node_modules/gopd/index.js [app-client] (ecmascript)");
var $defineProperty = __turbopack_context__.r("[project]/node_modules/es-define-property/index.js [app-client] (ecmascript)");
var throwTypeError = function() {
    throw new $TypeError();
};
var ThrowTypeError = $gOPD ? function() {
    try {
        // eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties
        arguments.callee; // IE 8 does not throw here
        return throwTypeError;
    } catch (calleeThrows) {
        try {
            // IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')
            return $gOPD(arguments, 'callee').get;
        } catch (gOPDthrows) {
            return throwTypeError;
        }
    }
}() : throwTypeError;
var hasSymbols = __turbopack_context__.r("[project]/node_modules/has-symbols/index.js [app-client] (ecmascript)")();
var getProto = __turbopack_context__.r("[project]/node_modules/get-proto/index.js [app-client] (ecmascript)");
var $ObjectGPO = __turbopack_context__.r("[project]/node_modules/get-proto/Object.getPrototypeOf.js [app-client] (ecmascript)");
var $ReflectGPO = __turbopack_context__.r("[project]/node_modules/get-proto/Reflect.getPrototypeOf.js [app-client] (ecmascript)");
var $apply = __turbopack_context__.r("[project]/node_modules/call-bind-apply-helpers/functionApply.js [app-client] (ecmascript)");
var $call = __turbopack_context__.r("[project]/node_modules/call-bind-apply-helpers/functionCall.js [app-client] (ecmascript)");
var needsEval = {};
var TypedArray = typeof Uint8Array === 'undefined' || !getProto ? undefined : getProto(Uint8Array);
var INTRINSICS = {
    __proto__: null,
    '%AggregateError%': typeof AggregateError === 'undefined' ? undefined : AggregateError,
    '%Array%': Array,
    '%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer,
    '%ArrayIteratorPrototype%': hasSymbols && getProto ? getProto([][Symbol.iterator]()) : undefined,
    '%AsyncFromSyncIteratorPrototype%': undefined,
    '%AsyncFunction%': needsEval,
    '%AsyncGenerator%': needsEval,
    '%AsyncGeneratorFunction%': needsEval,
    '%AsyncIteratorPrototype%': needsEval,
    '%Atomics%': typeof Atomics === 'undefined' ? undefined : Atomics,
    '%BigInt%': typeof BigInt === 'undefined' ? undefined : BigInt,
    '%BigInt64Array%': typeof BigInt64Array === 'undefined' ? undefined : BigInt64Array,
    '%BigUint64Array%': typeof BigUint64Array === 'undefined' ? undefined : BigUint64Array,
    '%Boolean%': Boolean,
    '%DataView%': typeof DataView === 'undefined' ? undefined : DataView,
    '%Date%': Date,
    '%decodeURI%': decodeURI,
    '%decodeURIComponent%': decodeURIComponent,
    '%encodeURI%': encodeURI,
    '%encodeURIComponent%': encodeURIComponent,
    '%Error%': $Error,
    '%eval%': eval,
    '%EvalError%': $EvalError,
    '%Float16Array%': typeof Float16Array === 'undefined' ? undefined : Float16Array,
    '%Float32Array%': typeof Float32Array === 'undefined' ? undefined : Float32Array,
    '%Float64Array%': typeof Float64Array === 'undefined' ? undefined : Float64Array,
    '%FinalizationRegistry%': typeof FinalizationRegistry === 'undefined' ? undefined : FinalizationRegistry,
    '%Function%': $Function,
    '%GeneratorFunction%': needsEval,
    '%Int8Array%': typeof Int8Array === 'undefined' ? undefined : Int8Array,
    '%Int16Array%': typeof Int16Array === 'undefined' ? undefined : Int16Array,
    '%Int32Array%': typeof Int32Array === 'undefined' ? undefined : Int32Array,
    '%isFinite%': isFinite,
    '%isNaN%': isNaN,
    '%IteratorPrototype%': hasSymbols && getProto ? getProto(getProto([][Symbol.iterator]())) : undefined,
    '%JSON%': typeof JSON === 'object' ? JSON : undefined,
    '%Map%': typeof Map === 'undefined' ? undefined : Map,
    '%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols || !getProto ? undefined : getProto(new Map()[Symbol.iterator]()),
    '%Math%': Math,
    '%Number%': Number,
    '%Object%': $Object,
    '%Object.getOwnPropertyDescriptor%': $gOPD,
    '%parseFloat%': parseFloat,
    '%parseInt%': parseInt,
    '%Promise%': typeof Promise === 'undefined' ? undefined : Promise,
    '%Proxy%': typeof Proxy === 'undefined' ? undefined : Proxy,
    '%RangeError%': $RangeError,
    '%ReferenceError%': $ReferenceError,
    '%Reflect%': typeof Reflect === 'undefined' ? undefined : Reflect,
    '%RegExp%': RegExp,
    '%Set%': typeof Set === 'undefined' ? undefined : Set,
    '%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols || !getProto ? undefined : getProto(new Set()[Symbol.iterator]()),
    '%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer,
    '%String%': String,
    '%StringIteratorPrototype%': hasSymbols && getProto ? getProto(''[Symbol.iterator]()) : undefined,
    '%Symbol%': hasSymbols ? Symbol : undefined,
    '%SyntaxError%': $SyntaxError,
    '%ThrowTypeError%': ThrowTypeError,
    '%TypedArray%': TypedArray,
    '%TypeError%': $TypeError,
    '%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array,
    '%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray,
    '%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array,
    '%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array,
    '%URIError%': $URIError,
    '%WeakMap%': typeof WeakMap === 'undefined' ? undefined : WeakMap,
    '%WeakRef%': typeof WeakRef === 'undefined' ? undefined : WeakRef,
    '%WeakSet%': typeof WeakSet === 'undefined' ? undefined : WeakSet,
    '%Function.prototype.call%': $call,
    '%Function.prototype.apply%': $apply,
    '%Object.defineProperty%': $defineProperty,
    '%Object.getPrototypeOf%': $ObjectGPO,
    '%Math.abs%': abs,
    '%Math.floor%': floor,
    '%Math.max%': max,
    '%Math.min%': min,
    '%Math.pow%': pow,
    '%Math.round%': round,
    '%Math.sign%': sign,
    '%Reflect.getPrototypeOf%': $ReflectGPO
};
if (getProto) {
    try {
        null.error; // eslint-disable-line no-unused-expressions
    } catch (e) {
        // https://github.com/tc39/proposal-shadowrealm/pull/384#issuecomment-1364264229
        var errorProto = getProto(getProto(e));
        INTRINSICS['%Error.prototype%'] = errorProto;
    }
}
var doEval = function doEval(name) {
    var value;
    if (name === '%AsyncFunction%') {
        value = getEvalledConstructor('async function () {}');
    } else if (name === '%GeneratorFunction%') {
        value = getEvalledConstructor('function* () {}');
    } else if (name === '%AsyncGeneratorFunction%') {
        value = getEvalledConstructor('async function* () {}');
    } else if (name === '%AsyncGenerator%') {
        var fn = doEval('%AsyncGeneratorFunction%');
        if (fn) {
            value = fn.prototype;
        }
    } else if (name === '%AsyncIteratorPrototype%') {
        var gen = doEval('%AsyncGenerator%');
        if (gen && getProto) {
            value = getProto(gen.prototype);
        }
    }
    INTRINSICS[name] = value;
    return value;
};
var LEGACY_ALIASES = {
    __proto__: null,
    '%ArrayBufferPrototype%': [
        'ArrayBuffer',
        'prototype'
    ],
    '%ArrayPrototype%': [
        'Array',
        'prototype'
    ],
    '%ArrayProto_entries%': [
        'Array',
        'prototype',
        'entries'
    ],
    '%ArrayProto_forEach%': [
        'Array',
        'prototype',
        'forEach'
    ],
    '%ArrayProto_keys%': [
        'Array',
        'prototype',
        'keys'
    ],
    '%ArrayProto_values%': [
        'Array',
        'prototype',
        'values'
    ],
    '%AsyncFunctionPrototype%': [
        'AsyncFunction',
        'prototype'
    ],
    '%AsyncGenerator%': [
        'AsyncGeneratorFunction',
        'prototype'
    ],
    '%AsyncGeneratorPrototype%': [
        'AsyncGeneratorFunction',
        'prototype',
        'prototype'
    ],
    '%BooleanPrototype%': [
        'Boolean',
        'prototype'
    ],
    '%DataViewPrototype%': [
        'DataView',
        'prototype'
    ],
    '%DatePrototype%': [
        'Date',
        'prototype'
    ],
    '%ErrorPrototype%': [
        'Error',
        'prototype'
    ],
    '%EvalErrorPrototype%': [
        'EvalError',
        'prototype'
    ],
    '%Float32ArrayPrototype%': [
        'Float32Array',
        'prototype'
    ],
    '%Float64ArrayPrototype%': [
        'Float64Array',
        'prototype'
    ],
    '%FunctionPrototype%': [
        'Function',
        'prototype'
    ],
    '%Generator%': [
        'GeneratorFunction',
        'prototype'
    ],
    '%GeneratorPrototype%': [
        'GeneratorFunction',
        'prototype',
        'prototype'
    ],
    '%Int8ArrayPrototype%': [
        'Int8Array',
        'prototype'
    ],
    '%Int16ArrayPrototype%': [
        'Int16Array',
        'prototype'
    ],
    '%Int32ArrayPrototype%': [
        'Int32Array',
        'prototype'
    ],
    '%JSONParse%': [
        'JSON',
        'parse'
    ],
    '%JSONStringify%': [
        'JSON',
        'stringify'
    ],
    '%MapPrototype%': [
        'Map',
        'prototype'
    ],
    '%NumberPrototype%': [
        'Number',
        'prototype'
    ],
    '%ObjectPrototype%': [
        'Object',
        'prototype'
    ],
    '%ObjProto_toString%': [
        'Object',
        'prototype',
        'toString'
    ],
    '%ObjProto_valueOf%': [
        'Object',
        'prototype',
        'valueOf'
    ],
    '%PromisePrototype%': [
        'Promise',
        'prototype'
    ],
    '%PromiseProto_then%': [
        'Promise',
        'prototype',
        'then'
    ],
    '%Promise_all%': [
        'Promise',
        'all'
    ],
    '%Promise_reject%': [
        'Promise',
        'reject'
    ],
    '%Promise_resolve%': [
        'Promise',
        'resolve'
    ],
    '%RangeErrorPrototype%': [
        'RangeError',
        'prototype'
    ],
    '%ReferenceErrorPrototype%': [
        'ReferenceError',
        'prototype'
    ],
    '%RegExpPrototype%': [
        'RegExp',
        'prototype'
    ],
    '%SetPrototype%': [
        'Set',
        'prototype'
    ],
    '%SharedArrayBufferPrototype%': [
        'SharedArrayBuffer',
        'prototype'
    ],
    '%StringPrototype%': [
        'String',
        'prototype'
    ],
    '%SymbolPrototype%': [
        'Symbol',
        'prototype'
    ],
    '%SyntaxErrorPrototype%': [
        'SyntaxError',
        'prototype'
    ],
    '%TypedArrayPrototype%': [
        'TypedArray',
        'prototype'
    ],
    '%TypeErrorPrototype%': [
        'TypeError',
        'prototype'
    ],
    '%Uint8ArrayPrototype%': [
        'Uint8Array',
        'prototype'
    ],
    '%Uint8ClampedArrayPrototype%': [
        'Uint8ClampedArray',
        'prototype'
    ],
    '%Uint16ArrayPrototype%': [
        'Uint16Array',
        'prototype'
    ],
    '%Uint32ArrayPrototype%': [
        'Uint32Array',
        'prototype'
    ],
    '%URIErrorPrototype%': [
        'URIError',
        'prototype'
    ],
    '%WeakMapPrototype%': [
        'WeakMap',
        'prototype'
    ],
    '%WeakSetPrototype%': [
        'WeakSet',
        'prototype'
    ]
};
var bind = __turbopack_context__.r("[project]/node_modules/function-bind/index.js [app-client] (ecmascript)");
var hasOwn = __turbopack_context__.r("[project]/node_modules/hasown/index.js [app-client] (ecmascript)");
var $concat = bind.call($call, Array.prototype.concat);
var $spliceApply = bind.call($apply, Array.prototype.splice);
var $replace = bind.call($call, String.prototype.replace);
var $strSlice = bind.call($call, String.prototype.slice);
var $exec = bind.call($call, RegExp.prototype.exec);
/* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */ var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
var reEscapeChar = /\\(\\)?/g; /** Used to match backslashes in property paths. */ 
var stringToPath = function stringToPath(string) {
    var first = $strSlice(string, 0, 1);
    var last = $strSlice(string, -1);
    if (first === '%' && last !== '%') {
        throw new $SyntaxError('invalid intrinsic syntax, expected closing `%`');
    } else if (last === '%' && first !== '%') {
        throw new $SyntaxError('invalid intrinsic syntax, expected opening `%`');
    }
    var result = [];
    $replace(string, rePropName, function(match, number, quote, subString) {
        result[result.length] = quote ? $replace(subString, reEscapeChar, '$1') : number || match;
    });
    return result;
};
/* end adaptation */ var getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {
    var intrinsicName = name;
    var alias;
    if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
        alias = LEGACY_ALIASES[intrinsicName];
        intrinsicName = '%' + alias[0] + '%';
    }
    if (hasOwn(INTRINSICS, intrinsicName)) {
        var value = INTRINSICS[intrinsicName];
        if (value === needsEval) {
            value = doEval(intrinsicName);
        }
        if (typeof value === 'undefined' && !allowMissing) {
            throw new $TypeError('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
        }
        return {
            alias: alias,
            name: intrinsicName,
            value: value
        };
    }
    throw new $SyntaxError('intrinsic ' + name + ' does not exist!');
};
module.exports = function GetIntrinsic(name, allowMissing) {
    if (typeof name !== 'string' || name.length === 0) {
        throw new $TypeError('intrinsic name must be a non-empty string');
    }
    if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
        throw new $TypeError('"allowMissing" argument must be a boolean');
    }
    if ($exec(/^%?[^%]*%?$/, name) === null) {
        throw new $SyntaxError('`%` may not be present anywhere but at the beginning and end of the intrinsic name');
    }
    var parts = stringToPath(name);
    var intrinsicBaseName = parts.length > 0 ? parts[0] : '';
    var intrinsic = getBaseIntrinsic('%' + intrinsicBaseName + '%', allowMissing);
    var intrinsicRealName = intrinsic.name;
    var value = intrinsic.value;
    var skipFurtherCaching = false;
    var alias = intrinsic.alias;
    if (alias) {
        intrinsicBaseName = alias[0];
        $spliceApply(parts, $concat([
            0,
            1
        ], alias));
    }
    for(var i = 1, isOwn = true; i < parts.length; i += 1){
        var part = parts[i];
        var first = $strSlice(part, 0, 1);
        var last = $strSlice(part, -1);
        if ((first === '"' || first === "'" || first === '`' || last === '"' || last === "'" || last === '`') && first !== last) {
            throw new $SyntaxError('property names with quotes must have matching quotes');
        }
        if (part === 'constructor' || !isOwn) {
            skipFurtherCaching = true;
        }
        intrinsicBaseName += '.' + part;
        intrinsicRealName = '%' + intrinsicBaseName + '%';
        if (hasOwn(INTRINSICS, intrinsicRealName)) {
            value = INTRINSICS[intrinsicRealName];
        } else if (value != null) {
            if (!(part in value)) {
                if (!allowMissing) {
                    throw new $TypeError('base intrinsic for ' + name + ' exists, but the property is not available.');
                }
                return void undefined;
            }
            if ($gOPD && i + 1 >= parts.length) {
                var desc = $gOPD(value, part);
                isOwn = !!desc;
                // By convention, when a data property is converted to an accessor
                // property to emulate a data property that does not suffer from
                // the override mistake, that accessor's getter is marked with
                // an `originalValue` property. Here, when we detect this, we
                // uphold the illusion by pretending to see that original data
                // property, i.e., returning the value rather than the getter
                // itself.
                if (isOwn && 'get' in desc && !('originalValue' in desc.get)) {
                    value = desc.get;
                } else {
                    value = value[part];
                }
            } else {
                isOwn = hasOwn(value, part);
                value = value[part];
            }
            if (isOwn && !skipFurtherCaching) {
                INTRINSICS[intrinsicRealName] = value;
            }
        }
    }
    return value;
};
}}),
"[project]/node_modules/call-bound/index.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
var GetIntrinsic = __turbopack_context__.r("[project]/node_modules/get-intrinsic/index.js [app-client] (ecmascript)");
var callBindBasic = __turbopack_context__.r("[project]/node_modules/call-bind-apply-helpers/index.js [app-client] (ecmascript)");
/** @type {(thisArg: string, searchString: string, position?: number) => number} */ var $indexOf = callBindBasic([
    GetIntrinsic('%String.prototype.indexOf%')
]);
/** @type {import('.')} */ module.exports = function callBoundIntrinsic(name, allowMissing) {
    /* eslint no-extra-parens: 0 */ var intrinsic = GetIntrinsic(name, !!allowMissing);
    if (typeof intrinsic === 'function' && $indexOf(name, '.prototype.') > -1) {
        return callBindBasic([
            intrinsic
        ]);
    }
    return intrinsic;
};
}}),
"[project]/node_modules/is-arguments/index.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
var hasToStringTag = __turbopack_context__.r("[project]/node_modules/has-tostringtag/shams.js [app-client] (ecmascript)")();
var callBound = __turbopack_context__.r("[project]/node_modules/call-bound/index.js [app-client] (ecmascript)");
var $toString = callBound('Object.prototype.toString');
/** @type {import('.')} */ var isStandardArguments = function isArguments(value) {
    if (hasToStringTag && value && typeof value === 'object' && Symbol.toStringTag in value) {
        return false;
    }
    return $toString(value) === '[object Arguments]';
};
/** @type {import('.')} */ var isLegacyArguments = function isArguments(value) {
    if (isStandardArguments(value)) {
        return true;
    }
    return value !== null && typeof value === 'object' && 'length' in value && typeof value.length === 'number' && value.length >= 0 && $toString(value) !== '[object Array]' && 'callee' in value && $toString(value.callee) === '[object Function]';
};
var supportsStandardArguments = function() {
    return isStandardArguments(arguments);
}();
// @ts-expect-error TODO make this not error
isStandardArguments.isLegacyArguments = isLegacyArguments; // for tests
/** @type {import('.')} */ module.exports = supportsStandardArguments ? isStandardArguments : isLegacyArguments;
}}),
"[project]/node_modules/is-regex/index.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
var callBound = __turbopack_context__.r("[project]/node_modules/call-bound/index.js [app-client] (ecmascript)");
var hasToStringTag = __turbopack_context__.r("[project]/node_modules/has-tostringtag/shams.js [app-client] (ecmascript)")();
var hasOwn = __turbopack_context__.r("[project]/node_modules/hasown/index.js [app-client] (ecmascript)");
var gOPD = __turbopack_context__.r("[project]/node_modules/gopd/index.js [app-client] (ecmascript)");
/** @type {import('.')} */ var fn;
if (hasToStringTag) {
    /** @type {(receiver: ThisParameterType<typeof RegExp.prototype.exec>, ...args: Parameters<typeof RegExp.prototype.exec>) => ReturnType<typeof RegExp.prototype.exec>} */ var $exec = callBound('RegExp.prototype.exec');
    /** @type {object} */ var isRegexMarker = {};
    var throwRegexMarker = function() {
        throw isRegexMarker;
    };
    /** @type {{ toString(): never, valueOf(): never, [Symbol.toPrimitive]?(): never }} */ var badStringifier = {
        toString: throwRegexMarker,
        valueOf: throwRegexMarker
    };
    if (typeof Symbol.toPrimitive === 'symbol') {
        badStringifier[Symbol.toPrimitive] = throwRegexMarker;
    }
    /** @type {import('.')} */ // @ts-expect-error TS can't figure out that the $exec call always throws
    // eslint-disable-next-line consistent-return
    fn = function isRegex(value) {
        if (!value || typeof value !== 'object') {
            return false;
        }
        // eslint-disable-next-line no-extra-parens
        var descriptor = /** @type {NonNullable<typeof gOPD>} */ gOPD(value, 'lastIndex');
        var hasLastIndexDataProperty = descriptor && hasOwn(descriptor, 'value');
        if (!hasLastIndexDataProperty) {
            return false;
        }
        try {
            // eslint-disable-next-line no-extra-parens
            $exec(value, badStringifier);
        } catch (e) {
            return e === isRegexMarker;
        }
    };
} else {
    /** @type {(receiver: ThisParameterType<typeof Object.prototype.toString>, ...args: Parameters<typeof Object.prototype.toString>) => ReturnType<typeof Object.prototype.toString>} */ var $toString = callBound('Object.prototype.toString');
    /** @const @type {'[object RegExp]'} */ var regexClass = '[object RegExp]';
    /** @type {import('.')} */ fn = function isRegex(value) {
        // In older browsers, typeof regex incorrectly returns 'function'
        if (!value || typeof value !== 'object' && typeof value !== 'function') {
            return false;
        }
        return $toString(value) === regexClass;
    };
}
module.exports = fn;
}}),
"[project]/node_modules/safe-regex-test/index.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
var callBound = __turbopack_context__.r("[project]/node_modules/call-bound/index.js [app-client] (ecmascript)");
var isRegex = __turbopack_context__.r("[project]/node_modules/is-regex/index.js [app-client] (ecmascript)");
var $exec = callBound('RegExp.prototype.exec');
var $TypeError = __turbopack_context__.r("[project]/node_modules/es-errors/type.js [app-client] (ecmascript)");
/** @type {import('.')} */ module.exports = function regexTester(regex) {
    if (!isRegex(regex)) {
        throw new $TypeError('`regex` must be a RegExp');
    }
    return function test(s) {
        return $exec(regex, s) !== null;
    };
};
}}),
"[project]/node_modules/is-generator-function/index.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
var callBound = __turbopack_context__.r("[project]/node_modules/call-bound/index.js [app-client] (ecmascript)");
var safeRegexTest = __turbopack_context__.r("[project]/node_modules/safe-regex-test/index.js [app-client] (ecmascript)");
var isFnRegex = safeRegexTest(/^\s*(?:function)?\*/);
var hasToStringTag = __turbopack_context__.r("[project]/node_modules/has-tostringtag/shams.js [app-client] (ecmascript)")();
var getProto = __turbopack_context__.r("[project]/node_modules/get-proto/index.js [app-client] (ecmascript)");
var toStr = callBound('Object.prototype.toString');
var fnToStr = callBound('Function.prototype.toString');
var getGeneratorFunc = function() {
    if (!hasToStringTag) {
        return false;
    }
    try {
        return Function('return function*() {}')();
    } catch (e) {}
};
/** @type {undefined | false | null | GeneratorFunctionConstructor} */ var GeneratorFunction;
/** @type {import('.')} */ module.exports = function isGeneratorFunction(fn) {
    if (typeof fn !== 'function') {
        return false;
    }
    if (isFnRegex(fnToStr(fn))) {
        return true;
    }
    if (!hasToStringTag) {
        var str = toStr(fn);
        return str === '[object GeneratorFunction]';
    }
    if (!getProto) {
        return false;
    }
    if (typeof GeneratorFunction === 'undefined') {
        var generatorFunc = getGeneratorFunc();
        GeneratorFunction = generatorFunc ? getProto(generatorFunc) : false;
    }
    return getProto(fn) === GeneratorFunction;
};
}}),
"[project]/node_modules/is-callable/index.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
var fnToStr = Function.prototype.toString;
var reflectApply = typeof Reflect === 'object' && Reflect !== null && Reflect.apply;
var badArrayLike;
var isCallableMarker;
if (typeof reflectApply === 'function' && typeof Object.defineProperty === 'function') {
    try {
        badArrayLike = Object.defineProperty({}, 'length', {
            get: function() {
                throw isCallableMarker;
            }
        });
        isCallableMarker = {};
        // eslint-disable-next-line no-throw-literal
        reflectApply(function() {
            throw 42;
        }, null, badArrayLike);
    } catch (_) {
        if (_ !== isCallableMarker) {
            reflectApply = null;
        }
    }
} else {
    reflectApply = null;
}
var constructorRegex = /^\s*class\b/;
var isES6ClassFn = function isES6ClassFunction(value) {
    try {
        var fnStr = fnToStr.call(value);
        return constructorRegex.test(fnStr);
    } catch (e) {
        return false; // not a function
    }
};
var tryFunctionObject = function tryFunctionToStr(value) {
    try {
        if (isES6ClassFn(value)) {
            return false;
        }
        fnToStr.call(value);
        return true;
    } catch (e) {
        return false;
    }
};
var toStr = Object.prototype.toString;
var objectClass = '[object Object]';
var fnClass = '[object Function]';
var genClass = '[object GeneratorFunction]';
var ddaClass = '[object HTMLAllCollection]'; // IE 11
var ddaClass2 = '[object HTML document.all class]';
var ddaClass3 = '[object HTMLCollection]'; // IE 9-10
var hasToStringTag = typeof Symbol === 'function' && !!Symbol.toStringTag; // better: use `has-tostringtag`
var isIE68 = !(0 in [
    , 
]); // eslint-disable-line no-sparse-arrays, comma-spacing
var isDDA = function isDocumentDotAll() {
    return false;
};
if (typeof document === 'object') {
    // Firefox 3 canonicalizes DDA to undefined when it's not accessed directly
    var all = document.all;
    if (toStr.call(all) === toStr.call(document.all)) {
        isDDA = function isDocumentDotAll(value) {
            /* globals document: false */ // in IE 6-8, typeof document.all is "object" and it's truthy
            if ((isIE68 || !value) && (typeof value === 'undefined' || typeof value === 'object')) {
                try {
                    var str = toStr.call(value);
                    return (str === ddaClass || str === ddaClass2 || str === ddaClass3 // opera 12.16
                     || str === objectClass // IE 6-8
                    ) && value('') == null; // eslint-disable-line eqeqeq
                } catch (e) {}
            }
            return false;
        };
    }
}
module.exports = reflectApply ? function isCallable(value) {
    if (isDDA(value)) {
        return true;
    }
    if (!value) {
        return false;
    }
    if (typeof value !== 'function' && typeof value !== 'object') {
        return false;
    }
    try {
        reflectApply(value, null, badArrayLike);
    } catch (e) {
        if (e !== isCallableMarker) {
            return false;
        }
    }
    return !isES6ClassFn(value) && tryFunctionObject(value);
} : function isCallable(value) {
    if (isDDA(value)) {
        return true;
    }
    if (!value) {
        return false;
    }
    if (typeof value !== 'function' && typeof value !== 'object') {
        return false;
    }
    if (hasToStringTag) {
        return tryFunctionObject(value);
    }
    if (isES6ClassFn(value)) {
        return false;
    }
    var strClass = toStr.call(value);
    if (strClass !== fnClass && strClass !== genClass && !/^\[object HTML/.test(strClass)) {
        return false;
    }
    return tryFunctionObject(value);
};
}}),
"[project]/node_modules/for-each/index.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
var isCallable = __turbopack_context__.r("[project]/node_modules/is-callable/index.js [app-client] (ecmascript)");
var toStr = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;
/** @type {<This, A extends readonly unknown[]>(arr: A, iterator: (this: This | void, value: A[number], index: number, arr: A) => void, receiver: This | undefined) => void} */ var forEachArray = function forEachArray(array, iterator, receiver) {
    for(var i = 0, len = array.length; i < len; i++){
        if (hasOwnProperty.call(array, i)) {
            if (receiver == null) {
                iterator(array[i], i, array);
            } else {
                iterator.call(receiver, array[i], i, array);
            }
        }
    }
};
/** @type {<This, S extends string>(string: S, iterator: (this: This | void, value: S[number], index: number, string: S) => void, receiver: This | undefined) => void} */ var forEachString = function forEachString(string, iterator, receiver) {
    for(var i = 0, len = string.length; i < len; i++){
        // no such thing as a sparse string.
        if (receiver == null) {
            iterator(string.charAt(i), i, string);
        } else {
            iterator.call(receiver, string.charAt(i), i, string);
        }
    }
};
/** @type {<This, O>(obj: O, iterator: (this: This | void, value: O[keyof O], index: keyof O, obj: O) => void, receiver: This | undefined) => void} */ var forEachObject = function forEachObject(object, iterator, receiver) {
    for(var k in object){
        if (hasOwnProperty.call(object, k)) {
            if (receiver == null) {
                iterator(object[k], k, object);
            } else {
                iterator.call(receiver, object[k], k, object);
            }
        }
    }
};
/** @type {(x: unknown) => x is readonly unknown[]} */ function isArray(x) {
    return toStr.call(x) === '[object Array]';
}
/** @type {import('.')._internal} */ module.exports = function forEach(list, iterator, thisArg) {
    if (!isCallable(iterator)) {
        throw new TypeError('iterator must be a function');
    }
    var receiver;
    if (arguments.length >= 3) {
        receiver = thisArg;
    }
    if (isArray(list)) {
        forEachArray(list, iterator, receiver);
    } else if (typeof list === 'string') {
        forEachString(list, iterator, receiver);
    } else {
        forEachObject(list, iterator, receiver);
    }
};
}}),
"[project]/node_modules/possible-typed-array-names/index.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
/** @type {import('.')} */ module.exports = [
    'Float16Array',
    'Float32Array',
    'Float64Array',
    'Int8Array',
    'Int16Array',
    'Int32Array',
    'Uint8Array',
    'Uint8ClampedArray',
    'Uint16Array',
    'Uint32Array',
    'BigInt64Array',
    'BigUint64Array'
];
}}),
"[project]/node_modules/available-typed-arrays/index.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
var possibleNames = __turbopack_context__.r("[project]/node_modules/possible-typed-array-names/index.js [app-client] (ecmascript)");
var g = typeof globalThis === 'undefined' ? ("TURBOPACK ident replacement", globalThis) : globalThis;
/** @type {import('.')} */ module.exports = function availableTypedArrays() {
    var /** @type {ReturnType<typeof availableTypedArrays>} */ out = [];
    for(var i = 0; i < possibleNames.length; i++){
        if (typeof g[possibleNames[i]] === 'function') {
            // @ts-expect-error
            out[out.length] = possibleNames[i];
        }
    }
    return out;
};
}}),
"[project]/node_modules/define-data-property/index.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
var $defineProperty = __turbopack_context__.r("[project]/node_modules/es-define-property/index.js [app-client] (ecmascript)");
var $SyntaxError = __turbopack_context__.r("[project]/node_modules/es-errors/syntax.js [app-client] (ecmascript)");
var $TypeError = __turbopack_context__.r("[project]/node_modules/es-errors/type.js [app-client] (ecmascript)");
var gopd = __turbopack_context__.r("[project]/node_modules/gopd/index.js [app-client] (ecmascript)");
/** @type {import('.')} */ module.exports = function defineDataProperty(obj, property, value) {
    if (!obj || typeof obj !== 'object' && typeof obj !== 'function') {
        throw new $TypeError('`obj` must be an object or a function`');
    }
    if (typeof property !== 'string' && typeof property !== 'symbol') {
        throw new $TypeError('`property` must be a string or a symbol`');
    }
    if (arguments.length > 3 && typeof arguments[3] !== 'boolean' && arguments[3] !== null) {
        throw new $TypeError('`nonEnumerable`, if provided, must be a boolean or null');
    }
    if (arguments.length > 4 && typeof arguments[4] !== 'boolean' && arguments[4] !== null) {
        throw new $TypeError('`nonWritable`, if provided, must be a boolean or null');
    }
    if (arguments.length > 5 && typeof arguments[5] !== 'boolean' && arguments[5] !== null) {
        throw new $TypeError('`nonConfigurable`, if provided, must be a boolean or null');
    }
    if (arguments.length > 6 && typeof arguments[6] !== 'boolean') {
        throw new $TypeError('`loose`, if provided, must be a boolean');
    }
    var nonEnumerable = arguments.length > 3 ? arguments[3] : null;
    var nonWritable = arguments.length > 4 ? arguments[4] : null;
    var nonConfigurable = arguments.length > 5 ? arguments[5] : null;
    var loose = arguments.length > 6 ? arguments[6] : false;
    /* @type {false | TypedPropertyDescriptor<unknown>} */ var desc = !!gopd && gopd(obj, property);
    if ($defineProperty) {
        $defineProperty(obj, property, {
            configurable: nonConfigurable === null && desc ? desc.configurable : !nonConfigurable,
            enumerable: nonEnumerable === null && desc ? desc.enumerable : !nonEnumerable,
            value: value,
            writable: nonWritable === null && desc ? desc.writable : !nonWritable
        });
    } else if (loose || !nonEnumerable && !nonWritable && !nonConfigurable) {
        // must fall back to [[Set]], and was not explicitly asked to make non-enumerable, non-writable, or non-configurable
        obj[property] = value; // eslint-disable-line no-param-reassign
    } else {
        throw new $SyntaxError('This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.');
    }
};
}}),
"[project]/node_modules/has-property-descriptors/index.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
var $defineProperty = __turbopack_context__.r("[project]/node_modules/es-define-property/index.js [app-client] (ecmascript)");
var hasPropertyDescriptors = function hasPropertyDescriptors() {
    return !!$defineProperty;
};
hasPropertyDescriptors.hasArrayLengthDefineBug = function hasArrayLengthDefineBug() {
    // node v0.6 has a bug where array lengths can be Set but not Defined
    if (!$defineProperty) {
        return null;
    }
    try {
        return $defineProperty([], 'length', {
            value: 1
        }).length !== 1;
    } catch (e) {
        // In Firefox 4-22, defining length on an array throws an exception.
        return true;
    }
};
module.exports = hasPropertyDescriptors;
}}),
"[project]/node_modules/set-function-length/index.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
var GetIntrinsic = __turbopack_context__.r("[project]/node_modules/get-intrinsic/index.js [app-client] (ecmascript)");
var define = __turbopack_context__.r("[project]/node_modules/define-data-property/index.js [app-client] (ecmascript)");
var hasDescriptors = __turbopack_context__.r("[project]/node_modules/has-property-descriptors/index.js [app-client] (ecmascript)")();
var gOPD = __turbopack_context__.r("[project]/node_modules/gopd/index.js [app-client] (ecmascript)");
var $TypeError = __turbopack_context__.r("[project]/node_modules/es-errors/type.js [app-client] (ecmascript)");
var $floor = GetIntrinsic('%Math.floor%');
/** @type {import('.')} */ module.exports = function setFunctionLength(fn, length) {
    if (typeof fn !== 'function') {
        throw new $TypeError('`fn` is not a function');
    }
    if (typeof length !== 'number' || length < 0 || length > 0xFFFFFFFF || $floor(length) !== length) {
        throw new $TypeError('`length` must be a positive 32-bit integer');
    }
    var loose = arguments.length > 2 && !!arguments[2];
    var functionLengthIsConfigurable = true;
    var functionLengthIsWritable = true;
    if ('length' in fn && gOPD) {
        var desc = gOPD(fn, 'length');
        if (desc && !desc.configurable) {
            functionLengthIsConfigurable = false;
        }
        if (desc && !desc.writable) {
            functionLengthIsWritable = false;
        }
    }
    if (functionLengthIsConfigurable || functionLengthIsWritable || !loose) {
        if (hasDescriptors) {
            define(fn, 'length', length, true, true);
        } else {
            define(fn, 'length', length);
        }
    }
    return fn;
};
}}),
"[project]/node_modules/call-bind/index.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
var setFunctionLength = __turbopack_context__.r("[project]/node_modules/set-function-length/index.js [app-client] (ecmascript)");
var $defineProperty = __turbopack_context__.r("[project]/node_modules/es-define-property/index.js [app-client] (ecmascript)");
var callBindBasic = __turbopack_context__.r("[project]/node_modules/call-bind-apply-helpers/index.js [app-client] (ecmascript)");
var applyBind = __turbopack_context__.r("[project]/node_modules/call-bind-apply-helpers/applyBind.js [app-client] (ecmascript)");
module.exports = function callBind(originalFunction) {
    var func = callBindBasic(arguments);
    var adjustedLength = originalFunction.length - (arguments.length - 1);
    return setFunctionLength(func, 1 + (adjustedLength > 0 ? adjustedLength : 0), true);
};
if ($defineProperty) {
    $defineProperty(module.exports, 'apply', {
        value: applyBind
    });
} else {
    module.exports.apply = applyBind;
}
}}),
"[project]/node_modules/which-typed-array/index.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
var forEach = __turbopack_context__.r("[project]/node_modules/for-each/index.js [app-client] (ecmascript)");
var availableTypedArrays = __turbopack_context__.r("[project]/node_modules/available-typed-arrays/index.js [app-client] (ecmascript)");
var callBind = __turbopack_context__.r("[project]/node_modules/call-bind/index.js [app-client] (ecmascript)");
var callBound = __turbopack_context__.r("[project]/node_modules/call-bound/index.js [app-client] (ecmascript)");
var gOPD = __turbopack_context__.r("[project]/node_modules/gopd/index.js [app-client] (ecmascript)");
var getProto = __turbopack_context__.r("[project]/node_modules/get-proto/index.js [app-client] (ecmascript)");
var $toString = callBound('Object.prototype.toString');
var hasToStringTag = __turbopack_context__.r("[project]/node_modules/has-tostringtag/shams.js [app-client] (ecmascript)")();
var g = typeof globalThis === 'undefined' ? ("TURBOPACK ident replacement", globalThis) : globalThis;
var typedArrays = availableTypedArrays();
var $slice = callBound('String.prototype.slice');
/** @type {<T = unknown>(array: readonly T[], value: unknown) => number} */ var $indexOf = callBound('Array.prototype.indexOf', true) || function indexOf(array, value) {
    for(var i = 0; i < array.length; i += 1){
        if (array[i] === value) {
            return i;
        }
    }
    return -1;
};
/** @typedef {import('./types').Getter} Getter */ /** @type {import('./types').Cache} */ var cache = {
    __proto__: null
};
if (hasToStringTag && gOPD && getProto) {
    forEach(typedArrays, function(typedArray) {
        var arr = new g[typedArray]();
        if (Symbol.toStringTag in arr && getProto) {
            var proto = getProto(arr);
            // @ts-expect-error TS won't narrow inside a closure
            var descriptor = gOPD(proto, Symbol.toStringTag);
            if (!descriptor && proto) {
                var superProto = getProto(proto);
                // @ts-expect-error TS won't narrow inside a closure
                descriptor = gOPD(superProto, Symbol.toStringTag);
            }
            // @ts-expect-error TODO: fix
            cache['$' + typedArray] = callBind(descriptor.get);
        }
    });
} else {
    forEach(typedArrays, function(typedArray) {
        var arr = new g[typedArray]();
        var fn = arr.slice || arr.set;
        if (fn) {
            cache['$' + typedArray] = // @ts-expect-error TODO FIXME
            callBind(fn);
        }
    });
}
/** @type {(value: object) => false | import('.').TypedArrayName} */ var tryTypedArrays = function tryAllTypedArrays(value) {
    /** @type {ReturnType<typeof tryAllTypedArrays>} */ var found = false;
    forEach(cache, /** @type {(getter: Getter, name: `\$${import('.').TypedArrayName}`) => void} */ function(getter, typedArray) {
        if (!found) {
            try {
                // @ts-expect-error a throw is fine here
                if ('$' + getter(value) === typedArray) {
                    found = $slice(typedArray, 1);
                }
            } catch (e) {}
        }
    });
    return found;
};
/** @type {(value: object) => false | import('.').TypedArrayName} */ var trySlices = function tryAllSlices(value) {
    /** @type {ReturnType<typeof tryAllSlices>} */ var found = false;
    forEach(cache, /** @type {(getter: Getter, name: `\$${import('.').TypedArrayName}`) => void} */ function(getter, name) {
        if (!found) {
            try {
                // @ts-expect-error a throw is fine here
                getter(value);
                found = $slice(name, 1);
            } catch (e) {}
        }
    });
    return found;
};
/** @type {import('.')} */ module.exports = function whichTypedArray(value) {
    if (!value || typeof value !== 'object') {
        return false;
    }
    if (!hasToStringTag) {
        /** @type {string} */ var tag = $slice($toString(value), 8, -1);
        if ($indexOf(typedArrays, tag) > -1) {
            return tag;
        }
        if (tag !== 'Object') {
            return false;
        }
        // node < 0.6 hits here on real Typed Arrays
        return trySlices(value);
    }
    if (!gOPD) {
        return null;
    } // unknown engine
    return tryTypedArrays(value);
};
}}),
"[project]/node_modules/is-typed-array/index.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
var whichTypedArray = __turbopack_context__.r("[project]/node_modules/which-typed-array/index.js [app-client] (ecmascript)");
/** @type {import('.')} */ module.exports = function isTypedArray(value) {
    return !!whichTypedArray(value);
};
}}),
"[project]/node_modules/util/support/types.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
// Currently in sync with Node.js lib/internal/util/types.js
// https://github.com/nodejs/node/commit/112cc7c27551254aa2b17098fb774867f05ed0d9
var isArgumentsObject = __turbopack_context__.r("[project]/node_modules/is-arguments/index.js [app-client] (ecmascript)");
var isGeneratorFunction = __turbopack_context__.r("[project]/node_modules/is-generator-function/index.js [app-client] (ecmascript)");
var whichTypedArray = __turbopack_context__.r("[project]/node_modules/which-typed-array/index.js [app-client] (ecmascript)");
var isTypedArray = __turbopack_context__.r("[project]/node_modules/is-typed-array/index.js [app-client] (ecmascript)");
function uncurryThis(f) {
    return f.call.bind(f);
}
var BigIntSupported = typeof BigInt !== 'undefined';
var SymbolSupported = typeof Symbol !== 'undefined';
var ObjectToString = uncurryThis(Object.prototype.toString);
var numberValue = uncurryThis(Number.prototype.valueOf);
var stringValue = uncurryThis(String.prototype.valueOf);
var booleanValue = uncurryThis(Boolean.prototype.valueOf);
if (BigIntSupported) {
    var bigIntValue = uncurryThis(BigInt.prototype.valueOf);
}
if (SymbolSupported) {
    var symbolValue = uncurryThis(Symbol.prototype.valueOf);
}
function checkBoxedPrimitive(value, prototypeValueOf) {
    if (typeof value !== 'object') {
        return false;
    }
    try {
        prototypeValueOf(value);
        return true;
    } catch (e) {
        return false;
    }
}
exports.isArgumentsObject = isArgumentsObject;
exports.isGeneratorFunction = isGeneratorFunction;
exports.isTypedArray = isTypedArray;
// Taken from here and modified for better browser support
// https://github.com/sindresorhus/p-is-promise/blob/cda35a513bda03f977ad5cde3a079d237e82d7ef/index.js
function isPromise(input) {
    return typeof Promise !== 'undefined' && input instanceof Promise || input !== null && typeof input === 'object' && typeof input.then === 'function' && typeof input.catch === 'function';
}
exports.isPromise = isPromise;
function isArrayBufferView(value) {
    if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
        return ArrayBuffer.isView(value);
    }
    return isTypedArray(value) || isDataView(value);
}
exports.isArrayBufferView = isArrayBufferView;
function isUint8Array(value) {
    return whichTypedArray(value) === 'Uint8Array';
}
exports.isUint8Array = isUint8Array;
function isUint8ClampedArray(value) {
    return whichTypedArray(value) === 'Uint8ClampedArray';
}
exports.isUint8ClampedArray = isUint8ClampedArray;
function isUint16Array(value) {
    return whichTypedArray(value) === 'Uint16Array';
}
exports.isUint16Array = isUint16Array;
function isUint32Array(value) {
    return whichTypedArray(value) === 'Uint32Array';
}
exports.isUint32Array = isUint32Array;
function isInt8Array(value) {
    return whichTypedArray(value) === 'Int8Array';
}
exports.isInt8Array = isInt8Array;
function isInt16Array(value) {
    return whichTypedArray(value) === 'Int16Array';
}
exports.isInt16Array = isInt16Array;
function isInt32Array(value) {
    return whichTypedArray(value) === 'Int32Array';
}
exports.isInt32Array = isInt32Array;
function isFloat32Array(value) {
    return whichTypedArray(value) === 'Float32Array';
}
exports.isFloat32Array = isFloat32Array;
function isFloat64Array(value) {
    return whichTypedArray(value) === 'Float64Array';
}
exports.isFloat64Array = isFloat64Array;
function isBigInt64Array(value) {
    return whichTypedArray(value) === 'BigInt64Array';
}
exports.isBigInt64Array = isBigInt64Array;
function isBigUint64Array(value) {
    return whichTypedArray(value) === 'BigUint64Array';
}
exports.isBigUint64Array = isBigUint64Array;
function isMapToString(value) {
    return ObjectToString(value) === '[object Map]';
}
isMapToString.working = typeof Map !== 'undefined' && isMapToString(new Map());
function isMap(value) {
    if (typeof Map === 'undefined') {
        return false;
    }
    return isMapToString.working ? isMapToString(value) : value instanceof Map;
}
exports.isMap = isMap;
function isSetToString(value) {
    return ObjectToString(value) === '[object Set]';
}
isSetToString.working = typeof Set !== 'undefined' && isSetToString(new Set());
function isSet(value) {
    if (typeof Set === 'undefined') {
        return false;
    }
    return isSetToString.working ? isSetToString(value) : value instanceof Set;
}
exports.isSet = isSet;
function isWeakMapToString(value) {
    return ObjectToString(value) === '[object WeakMap]';
}
isWeakMapToString.working = typeof WeakMap !== 'undefined' && isWeakMapToString(new WeakMap());
function isWeakMap(value) {
    if (typeof WeakMap === 'undefined') {
        return false;
    }
    return isWeakMapToString.working ? isWeakMapToString(value) : value instanceof WeakMap;
}
exports.isWeakMap = isWeakMap;
function isWeakSetToString(value) {
    return ObjectToString(value) === '[object WeakSet]';
}
isWeakSetToString.working = typeof WeakSet !== 'undefined' && isWeakSetToString(new WeakSet());
function isWeakSet(value) {
    return isWeakSetToString(value);
}
exports.isWeakSet = isWeakSet;
function isArrayBufferToString(value) {
    return ObjectToString(value) === '[object ArrayBuffer]';
}
isArrayBufferToString.working = typeof ArrayBuffer !== 'undefined' && isArrayBufferToString(new ArrayBuffer());
function isArrayBuffer(value) {
    if (typeof ArrayBuffer === 'undefined') {
        return false;
    }
    return isArrayBufferToString.working ? isArrayBufferToString(value) : value instanceof ArrayBuffer;
}
exports.isArrayBuffer = isArrayBuffer;
function isDataViewToString(value) {
    return ObjectToString(value) === '[object DataView]';
}
isDataViewToString.working = typeof ArrayBuffer !== 'undefined' && typeof DataView !== 'undefined' && isDataViewToString(new DataView(new ArrayBuffer(1), 0, 1));
function isDataView(value) {
    if (typeof DataView === 'undefined') {
        return false;
    }
    return isDataViewToString.working ? isDataViewToString(value) : value instanceof DataView;
}
exports.isDataView = isDataView;
// Store a copy of SharedArrayBuffer in case it's deleted elsewhere
var SharedArrayBufferCopy = typeof SharedArrayBuffer !== 'undefined' ? SharedArrayBuffer : undefined;
function isSharedArrayBufferToString(value) {
    return ObjectToString(value) === '[object SharedArrayBuffer]';
}
function isSharedArrayBuffer(value) {
    if (typeof SharedArrayBufferCopy === 'undefined') {
        return false;
    }
    if (typeof isSharedArrayBufferToString.working === 'undefined') {
        isSharedArrayBufferToString.working = isSharedArrayBufferToString(new SharedArrayBufferCopy());
    }
    return isSharedArrayBufferToString.working ? isSharedArrayBufferToString(value) : value instanceof SharedArrayBufferCopy;
}
exports.isSharedArrayBuffer = isSharedArrayBuffer;
function isAsyncFunction(value) {
    return ObjectToString(value) === '[object AsyncFunction]';
}
exports.isAsyncFunction = isAsyncFunction;
function isMapIterator(value) {
    return ObjectToString(value) === '[object Map Iterator]';
}
exports.isMapIterator = isMapIterator;
function isSetIterator(value) {
    return ObjectToString(value) === '[object Set Iterator]';
}
exports.isSetIterator = isSetIterator;
function isGeneratorObject(value) {
    return ObjectToString(value) === '[object Generator]';
}
exports.isGeneratorObject = isGeneratorObject;
function isWebAssemblyCompiledModule(value) {
    return ObjectToString(value) === '[object WebAssembly.Module]';
}
exports.isWebAssemblyCompiledModule = isWebAssemblyCompiledModule;
function isNumberObject(value) {
    return checkBoxedPrimitive(value, numberValue);
}
exports.isNumberObject = isNumberObject;
function isStringObject(value) {
    return checkBoxedPrimitive(value, stringValue);
}
exports.isStringObject = isStringObject;
function isBooleanObject(value) {
    return checkBoxedPrimitive(value, booleanValue);
}
exports.isBooleanObject = isBooleanObject;
function isBigIntObject(value) {
    return BigIntSupported && checkBoxedPrimitive(value, bigIntValue);
}
exports.isBigIntObject = isBigIntObject;
function isSymbolObject(value) {
    return SymbolSupported && checkBoxedPrimitive(value, symbolValue);
}
exports.isSymbolObject = isSymbolObject;
function isBoxedPrimitive(value) {
    return isNumberObject(value) || isStringObject(value) || isBooleanObject(value) || isBigIntObject(value) || isSymbolObject(value);
}
exports.isBoxedPrimitive = isBoxedPrimitive;
function isAnyArrayBuffer(value) {
    return typeof Uint8Array !== 'undefined' && (isArrayBuffer(value) || isSharedArrayBuffer(value));
}
exports.isAnyArrayBuffer = isAnyArrayBuffer;
[
    'isProxy',
    'isExternal',
    'isModuleNamespaceObject'
].forEach(function(method) {
    Object.defineProperty(exports, method, {
        enumerable: false,
        value: function() {
            throw new Error(method + ' is not supported in userland');
        }
    });
});
}}),
"[project]/node_modules/util/support/isBufferBrowser.js [app-client] (ecmascript)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
module.exports = function isBuffer(arg) {
    return arg && typeof arg === 'object' && typeof arg.copy === 'function' && typeof arg.fill === 'function' && typeof arg.readUInt8 === 'function';
};
}}),
"[project]/node_modules/util/util.js [app-client] (ecmascript)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
var __TURBOPACK__imported__module__$5b$project$5d2f$examples$2f$sso$2d$example$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/examples/sso-example/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors || function getOwnPropertyDescriptors(obj) {
    var keys = Object.keys(obj);
    var descriptors = {};
    for(var i = 0; i < keys.length; i++){
        descriptors[keys[i]] = Object.getOwnPropertyDescriptor(obj, keys[i]);
    }
    return descriptors;
};
var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
    if (!isString(f)) {
        var objects = [];
        for(var i = 0; i < arguments.length; i++){
            objects.push(inspect(arguments[i]));
        }
        return objects.join(' ');
    }
    var i = 1;
    var args = arguments;
    var len = args.length;
    var str = String(f).replace(formatRegExp, function(x) {
        if (x === '%%') return '%';
        if (i >= len) return x;
        switch(x){
            case '%s':
                return String(args[i++]);
            case '%d':
                return Number(args[i++]);
            case '%j':
                try {
                    return JSON.stringify(args[i++]);
                } catch (_) {
                    return '[Circular]';
                }
            default:
                return x;
        }
    });
    for(var x = args[i]; i < len; x = args[++i]){
        if (isNull(x) || !isObject(x)) {
            str += ' ' + x;
        } else {
            str += ' ' + inspect(x);
        }
    }
    return str;
};
// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
    if (typeof __TURBOPACK__imported__module__$5b$project$5d2f$examples$2f$sso$2d$example$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"] !== 'undefined' && __TURBOPACK__imported__module__$5b$project$5d2f$examples$2f$sso$2d$example$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].noDeprecation === true) {
        return fn;
    }
    // Allow for deprecating things in the process of starting up.
    if (typeof __TURBOPACK__imported__module__$5b$project$5d2f$examples$2f$sso$2d$example$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"] === 'undefined') {
        return function() {
            return exports.deprecate(fn, msg).apply(this, arguments);
        };
    }
    var warned = false;
    function deprecated() {
        if (!warned) {
            if (__TURBOPACK__imported__module__$5b$project$5d2f$examples$2f$sso$2d$example$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].throwDeprecation) {
                throw new Error(msg);
            } else if (__TURBOPACK__imported__module__$5b$project$5d2f$examples$2f$sso$2d$example$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].traceDeprecation) {
                console.trace(msg);
            } else {
                console.error(msg);
            }
            warned = true;
        }
        return fn.apply(this, arguments);
    }
    return deprecated;
};
var debugs = {};
var debugEnvRegex = /^$/;
if (__TURBOPACK__imported__module__$5b$project$5d2f$examples$2f$sso$2d$example$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NODE_DEBUG) {
    var debugEnv = __TURBOPACK__imported__module__$5b$project$5d2f$examples$2f$sso$2d$example$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NODE_DEBUG;
    debugEnv = debugEnv.replace(/[|\\{}()[\]^$+?.]/g, '\\$&').replace(/\*/g, '.*').replace(/,/g, '$|^').toUpperCase();
    debugEnvRegex = new RegExp('^' + debugEnv + '$', 'i');
}
exports.debuglog = function(set) {
    set = set.toUpperCase();
    if (!debugs[set]) {
        if (debugEnvRegex.test(set)) {
            var pid = __TURBOPACK__imported__module__$5b$project$5d2f$examples$2f$sso$2d$example$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].pid;
            debugs[set] = function() {
                var msg = exports.format.apply(exports, arguments);
                console.error('%s %d: %s', set, pid, msg);
            };
        } else {
            debugs[set] = function() {};
        }
    }
    return debugs[set];
};
/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */ /* legacy: obj, showHidden, depth, colors*/ function inspect(obj, opts) {
    // default options
    var ctx = {
        seen: [],
        stylize: stylizeNoColor
    };
    // legacy...
    if (arguments.length >= 3) ctx.depth = arguments[2];
    if (arguments.length >= 4) ctx.colors = arguments[3];
    if (isBoolean(opts)) {
        // legacy...
        ctx.showHidden = opts;
    } else if (opts) {
        // got an "options" object
        exports._extend(ctx, opts);
    }
    // set default options
    if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
    if (isUndefined(ctx.depth)) ctx.depth = 2;
    if (isUndefined(ctx.colors)) ctx.colors = false;
    if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
    if (ctx.colors) ctx.stylize = stylizeWithColor;
    return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;
// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
    'bold': [
        1,
        22
    ],
    'italic': [
        3,
        23
    ],
    'underline': [
        4,
        24
    ],
    'inverse': [
        7,
        27
    ],
    'white': [
        37,
        39
    ],
    'grey': [
        90,
        39
    ],
    'black': [
        30,
        39
    ],
    'blue': [
        34,
        39
    ],
    'cyan': [
        36,
        39
    ],
    'green': [
        32,
        39
    ],
    'magenta': [
        35,
        39
    ],
    'red': [
        31,
        39
    ],
    'yellow': [
        33,
        39
    ]
};
// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
    'special': 'cyan',
    'number': 'yellow',
    'boolean': 'yellow',
    'undefined': 'grey',
    'null': 'bold',
    'string': 'green',
    'date': 'magenta',
    // "name": intentionally not styling
    'regexp': 'red'
};
function stylizeWithColor(str, styleType) {
    var style = inspect.styles[styleType];
    if (style) {
        return '\u001b[' + inspect.colors[style][0] + 'm' + str + '\u001b[' + inspect.colors[style][1] + 'm';
    } else {
        return str;
    }
}
function stylizeNoColor(str, styleType) {
    return str;
}
function arrayToHash(array) {
    var hash = {};
    array.forEach(function(val, idx) {
        hash[val] = true;
    });
    return hash;
}
function formatValue(ctx, value, recurseTimes) {
    // Provide a hook for user-specified inspect functions.
    // Check that value is an object with an inspect function on it
    if (ctx.customInspect && value && isFunction(value.inspect) && // Filter out the util module, it's inspect function is special
    value.inspect !== exports.inspect && // Also filter out any prototype objects using the circular check.
    !(value.constructor && value.constructor.prototype === value)) {
        var ret = value.inspect(recurseTimes, ctx);
        if (!isString(ret)) {
            ret = formatValue(ctx, ret, recurseTimes);
        }
        return ret;
    }
    // Primitive types cannot have properties
    var primitive = formatPrimitive(ctx, value);
    if (primitive) {
        return primitive;
    }
    // Look up the keys of the object.
    var keys = Object.keys(value);
    var visibleKeys = arrayToHash(keys);
    if (ctx.showHidden) {
        keys = Object.getOwnPropertyNames(value);
    }
    // IE doesn't make error fields non-enumerable
    // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
    if (isError(value) && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
        return formatError(value);
    }
    // Some type of object without properties can be shortcutted.
    if (keys.length === 0) {
        if (isFunction(value)) {
            var name = value.name ? ': ' + value.name : '';
            return ctx.stylize('[Function' + name + ']', 'special');
        }
        if (isRegExp(value)) {
            return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
        }
        if (isDate(value)) {
            return ctx.stylize(Date.prototype.toString.call(value), 'date');
        }
        if (isError(value)) {
            return formatError(value);
        }
    }
    var base = '', array = false, braces = [
        '{',
        '}'
    ];
    // Make Array say that they are Array
    if (isArray(value)) {
        array = true;
        braces = [
            '[',
            ']'
        ];
    }
    // Make functions say that they are functions
    if (isFunction(value)) {
        var n = value.name ? ': ' + value.name : '';
        base = ' [Function' + n + ']';
    }
    // Make RegExps say that they are RegExps
    if (isRegExp(value)) {
        base = ' ' + RegExp.prototype.toString.call(value);
    }
    // Make dates with properties first say the date
    if (isDate(value)) {
        base = ' ' + Date.prototype.toUTCString.call(value);
    }
    // Make error with message first say the error
    if (isError(value)) {
        base = ' ' + formatError(value);
    }
    if (keys.length === 0 && (!array || value.length == 0)) {
        return braces[0] + base + braces[1];
    }
    if (recurseTimes < 0) {
        if (isRegExp(value)) {
            return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
        } else {
            return ctx.stylize('[Object]', 'special');
        }
    }
    ctx.seen.push(value);
    var output;
    if (array) {
        output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
    } else {
        output = keys.map(function(key) {
            return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
        });
    }
    ctx.seen.pop();
    return reduceToSingleString(output, base, braces);
}
function formatPrimitive(ctx, value) {
    if (isUndefined(value)) return ctx.stylize('undefined', 'undefined');
    if (isString(value)) {
        var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '').replace(/'/g, "\\'").replace(/\\"/g, '"') + '\'';
        return ctx.stylize(simple, 'string');
    }
    if (isNumber(value)) return ctx.stylize('' + value, 'number');
    if (isBoolean(value)) return ctx.stylize('' + value, 'boolean');
    // For some reason typeof null is "object", so special case here.
    if (isNull(value)) return ctx.stylize('null', 'null');
}
function formatError(value) {
    return '[' + Error.prototype.toString.call(value) + ']';
}
function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
    var output = [];
    for(var i = 0, l = value.length; i < l; ++i){
        if (hasOwnProperty(value, String(i))) {
            output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, String(i), true));
        } else {
            output.push('');
        }
    }
    keys.forEach(function(key) {
        if (!key.match(/^\d+$/)) {
            output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, key, true));
        }
    });
    return output;
}
function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
    var name, str, desc;
    desc = Object.getOwnPropertyDescriptor(value, key) || {
        value: value[key]
    };
    if (desc.get) {
        if (desc.set) {
            str = ctx.stylize('[Getter/Setter]', 'special');
        } else {
            str = ctx.stylize('[Getter]', 'special');
        }
    } else {
        if (desc.set) {
            str = ctx.stylize('[Setter]', 'special');
        }
    }
    if (!hasOwnProperty(visibleKeys, key)) {
        name = '[' + key + ']';
    }
    if (!str) {
        if (ctx.seen.indexOf(desc.value) < 0) {
            if (isNull(recurseTimes)) {
                str = formatValue(ctx, desc.value, null);
            } else {
                str = formatValue(ctx, desc.value, recurseTimes - 1);
            }
            if (str.indexOf('\n') > -1) {
                if (array) {
                    str = str.split('\n').map(function(line) {
                        return '  ' + line;
                    }).join('\n').slice(2);
                } else {
                    str = '\n' + str.split('\n').map(function(line) {
                        return '   ' + line;
                    }).join('\n');
                }
            }
        } else {
            str = ctx.stylize('[Circular]', 'special');
        }
    }
    if (isUndefined(name)) {
        if (array && key.match(/^\d+$/)) {
            return str;
        }
        name = JSON.stringify('' + key);
        if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
            name = name.slice(1, -1);
            name = ctx.stylize(name, 'name');
        } else {
            name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
            name = ctx.stylize(name, 'string');
        }
    }
    return name + ': ' + str;
}
function reduceToSingleString(output, base, braces) {
    var numLinesEst = 0;
    var length = output.reduce(function(prev, cur) {
        numLinesEst++;
        if (cur.indexOf('\n') >= 0) numLinesEst++;
        return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
    }, 0);
    if (length > 60) {
        return braces[0] + (base === '' ? '' : base + '\n ') + ' ' + output.join(',\n  ') + ' ' + braces[1];
    }
    return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}
// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
exports.types = __turbopack_context__.r("[project]/node_modules/util/support/types.js [app-client] (ecmascript)");
function isArray(ar) {
    return Array.isArray(ar);
}
exports.isArray = isArray;
function isBoolean(arg) {
    return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;
function isNull(arg) {
    return arg === null;
}
exports.isNull = isNull;
function isNullOrUndefined(arg) {
    return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;
function isNumber(arg) {
    return typeof arg === 'number';
}
exports.isNumber = isNumber;
function isString(arg) {
    return typeof arg === 'string';
}
exports.isString = isString;
function isSymbol(arg) {
    return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;
function isUndefined(arg) {
    return arg === void 0;
}
exports.isUndefined = isUndefined;
function isRegExp(re) {
    return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;
exports.types.isRegExp = isRegExp;
function isObject(arg) {
    return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;
function isDate(d) {
    return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;
exports.types.isDate = isDate;
function isError(e) {
    return isObject(e) && (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;
exports.types.isNativeError = isError;
function isFunction(arg) {
    return typeof arg === 'function';
}
exports.isFunction = isFunction;
function isPrimitive(arg) {
    return arg === null || typeof arg === 'boolean' || typeof arg === 'number' || typeof arg === 'string' || typeof arg === 'symbol' || // ES6 symbol
    typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;
exports.isBuffer = __turbopack_context__.r("[project]/node_modules/util/support/isBufferBrowser.js [app-client] (ecmascript)");
function objectToString(o) {
    return Object.prototype.toString.call(o);
}
function pad(n) {
    return n < 10 ? '0' + n.toString(10) : n.toString(10);
}
var months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
];
// 26 Feb 16:19:34
function timestamp() {
    var d = new Date();
    var time = [
        pad(d.getHours()),
        pad(d.getMinutes()),
        pad(d.getSeconds())
    ].join(':');
    return [
        d.getDate(),
        months[d.getMonth()],
        time
    ].join(' ');
}
// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
    console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};
/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */ exports.inherits = __turbopack_context__.r("[project]/node_modules/inherits/inherits_browser.js [app-client] (ecmascript)");
exports._extend = function(origin, add) {
    // Don't do anything if add isn't an object
    if (!add || !isObject(add)) return origin;
    var keys = Object.keys(add);
    var i = keys.length;
    while(i--){
        origin[keys[i]] = add[keys[i]];
    }
    return origin;
};
function hasOwnProperty(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
}
var kCustomPromisifiedSymbol = typeof Symbol !== 'undefined' ? Symbol('util.promisify.custom') : undefined;
exports.promisify = function promisify(original) {
    if (typeof original !== 'function') throw new TypeError('The "original" argument must be of type Function');
    if (kCustomPromisifiedSymbol && original[kCustomPromisifiedSymbol]) {
        var fn = original[kCustomPromisifiedSymbol];
        if (typeof fn !== 'function') {
            throw new TypeError('The "util.promisify.custom" argument must be of type Function');
        }
        Object.defineProperty(fn, kCustomPromisifiedSymbol, {
            value: fn,
            enumerable: false,
            writable: false,
            configurable: true
        });
        return fn;
    }
    function fn() {
        var promiseResolve, promiseReject;
        var promise = new Promise(function(resolve, reject) {
            promiseResolve = resolve;
            promiseReject = reject;
        });
        var args = [];
        for(var i = 0; i < arguments.length; i++){
            args.push(arguments[i]);
        }
        args.push(function(err, value) {
            if (err) {
                promiseReject(err);
            } else {
                promiseResolve(value);
            }
        });
        try {
            original.apply(this, args);
        } catch (err) {
            promiseReject(err);
        }
        return promise;
    }
    Object.setPrototypeOf(fn, Object.getPrototypeOf(original));
    if (kCustomPromisifiedSymbol) Object.defineProperty(fn, kCustomPromisifiedSymbol, {
        value: fn,
        enumerable: false,
        writable: false,
        configurable: true
    });
    return Object.defineProperties(fn, getOwnPropertyDescriptors(original));
};
exports.promisify.custom = kCustomPromisifiedSymbol;
function callbackifyOnRejected(reason, cb) {
    // `!reason` guard inspired by bluebird (Ref: https://goo.gl/t5IS6M).
    // Because `null` is a special error value in callbacks which means "no error
    // occurred", we error-wrap so the callback consumer can distinguish between
    // "the promise rejected with null" or "the promise fulfilled with undefined".
    if (!reason) {
        var newReason = new Error('Promise was rejected with a falsy value');
        newReason.reason = reason;
        reason = newReason;
    }
    return cb(reason);
}
function callbackify(original) {
    if (typeof original !== 'function') {
        throw new TypeError('The "original" argument must be of type Function');
    }
    // We DO NOT return the promise as it gives the user a false sense that
    // the promise is actually somehow related to the callback's execution
    // and that the callback throwing will reject the promise.
    function callbackified() {
        var args = [];
        for(var i = 0; i < arguments.length; i++){
            args.push(arguments[i]);
        }
        var maybeCb = args.pop();
        if (typeof maybeCb !== 'function') {
            throw new TypeError('The last argument must be of type Function');
        }
        var self = this;
        var cb = function() {
            return maybeCb.apply(self, arguments);
        };
        // In true node style we process the callback on `nextTick` with all the
        // implications (stack, `uncaughtException`, `async_hooks`)
        original.apply(this, args).then(function(ret) {
            __TURBOPACK__imported__module__$5b$project$5d2f$examples$2f$sso$2d$example$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].nextTick(cb.bind(null, null, ret));
        }, function(rej) {
            __TURBOPACK__imported__module__$5b$project$5d2f$examples$2f$sso$2d$example$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].nextTick(callbackifyOnRejected.bind(null, rej, cb));
        });
    }
    Object.setPrototypeOf(callbackified, Object.getPrototypeOf(original));
    Object.defineProperties(callbackified, getOwnPropertyDescriptors(original));
    return callbackified;
}
exports.callbackify = callbackify;
}}),
"[project]/node_modules/inherits/inherits_browser.js [app-client] (ecmascript)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
if (typeof Object.create === 'function') {
    // implementation from standard node.js 'util' module
    module.exports = function inherits(ctor, superCtor) {
        if (superCtor) {
            ctor.super_ = superCtor;
            ctor.prototype = Object.create(superCtor.prototype, {
                constructor: {
                    value: ctor,
                    enumerable: false,
                    writable: true,
                    configurable: true
                }
            });
        }
    };
} else {
    // old school shim for old browsers
    module.exports = function inherits(ctor, superCtor) {
        if (superCtor) {
            ctor.super_ = superCtor;
            var TempCtor = function() {};
            TempCtor.prototype = superCtor.prototype;
            ctor.prototype = new TempCtor();
            ctor.prototype.constructor = ctor;
        }
    };
}
}}),
"[project]/node_modules/safe-buffer/index.js [app-client] (ecmascript)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */ /* eslint-disable node/no-deprecated-api */ var buffer = __turbopack_context__.r("[project]/node_modules/buffer/index.js [app-client] (ecmascript)");
var Buffer = buffer.Buffer;
// alternative to using Object.keys for old browsers
function copyProps(src, dst) {
    for(var key in src){
        dst[key] = src[key];
    }
}
if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
    module.exports = buffer;
} else {
    // Copy properties from require('buffer')
    copyProps(buffer, exports);
    exports.Buffer = SafeBuffer;
}
function SafeBuffer(arg, encodingOrOffset, length) {
    return Buffer(arg, encodingOrOffset, length);
}
SafeBuffer.prototype = Object.create(Buffer.prototype);
// Copy static methods from Buffer
copyProps(Buffer, SafeBuffer);
SafeBuffer.from = function(arg, encodingOrOffset, length) {
    if (typeof arg === 'number') {
        throw new TypeError('Argument must not be a number');
    }
    return Buffer(arg, encodingOrOffset, length);
};
SafeBuffer.alloc = function(size, fill, encoding) {
    if (typeof size !== 'number') {
        throw new TypeError('Argument must be a number');
    }
    var buf = Buffer(size);
    if (fill !== undefined) {
        if (typeof encoding === 'string') {
            buf.fill(fill, encoding);
        } else {
            buf.fill(fill);
        }
    } else {
        buf.fill(0);
    }
    return buf;
};
SafeBuffer.allocUnsafe = function(size) {
    if (typeof size !== 'number') {
        throw new TypeError('Argument must be a number');
    }
    return Buffer(size);
};
SafeBuffer.allocUnsafeSlow = function(size) {
    if (typeof size !== 'number') {
        throw new TypeError('Argument must be a number');
    }
    return buffer.SlowBuffer(size);
};
}}),
"[project]/node_modules/string_decoder/lib/string_decoder.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
/*<replacement>*/ var Buffer = __turbopack_context__.r("[project]/node_modules/safe-buffer/index.js [app-client] (ecmascript)").Buffer;
/*</replacement>*/ var isEncoding = Buffer.isEncoding || function(encoding) {
    encoding = '' + encoding;
    switch(encoding && encoding.toLowerCase()){
        case 'hex':
        case 'utf8':
        case 'utf-8':
        case 'ascii':
        case 'binary':
        case 'base64':
        case 'ucs2':
        case 'ucs-2':
        case 'utf16le':
        case 'utf-16le':
        case 'raw':
            return true;
        default:
            return false;
    }
};
function _normalizeEncoding(enc) {
    if (!enc) return 'utf8';
    var retried;
    while(true){
        switch(enc){
            case 'utf8':
            case 'utf-8':
                return 'utf8';
            case 'ucs2':
            case 'ucs-2':
            case 'utf16le':
            case 'utf-16le':
                return 'utf16le';
            case 'latin1':
            case 'binary':
                return 'latin1';
            case 'base64':
            case 'ascii':
            case 'hex':
                return enc;
            default:
                if (retried) return; // undefined
                enc = ('' + enc).toLowerCase();
                retried = true;
        }
    }
}
;
// Do not cache `Buffer.isEncoding` when checking encoding names as some
// modules monkey-patch it to support additional encodings
function normalizeEncoding(enc) {
    var nenc = _normalizeEncoding(enc);
    if (typeof nenc !== 'string' && (Buffer.isEncoding === isEncoding || !isEncoding(enc))) throw new Error('Unknown encoding: ' + enc);
    return nenc || enc;
}
// StringDecoder provides an interface for efficiently splitting a series of
// buffers into a series of JS strings without breaking apart multi-byte
// characters.
exports.StringDecoder = StringDecoder;
function StringDecoder(encoding) {
    this.encoding = normalizeEncoding(encoding);
    var nb;
    switch(this.encoding){
        case 'utf16le':
            this.text = utf16Text;
            this.end = utf16End;
            nb = 4;
            break;
        case 'utf8':
            this.fillLast = utf8FillLast;
            nb = 4;
            break;
        case 'base64':
            this.text = base64Text;
            this.end = base64End;
            nb = 3;
            break;
        default:
            this.write = simpleWrite;
            this.end = simpleEnd;
            return;
    }
    this.lastNeed = 0;
    this.lastTotal = 0;
    this.lastChar = Buffer.allocUnsafe(nb);
}
StringDecoder.prototype.write = function(buf) {
    if (buf.length === 0) return '';
    var r;
    var i;
    if (this.lastNeed) {
        r = this.fillLast(buf);
        if (r === undefined) return '';
        i = this.lastNeed;
        this.lastNeed = 0;
    } else {
        i = 0;
    }
    if (i < buf.length) return r ? r + this.text(buf, i) : this.text(buf, i);
    return r || '';
};
StringDecoder.prototype.end = utf8End;
// Returns only complete characters in a Buffer
StringDecoder.prototype.text = utf8Text;
// Attempts to complete a partial non-UTF-8 character using bytes from a Buffer
StringDecoder.prototype.fillLast = function(buf) {
    if (this.lastNeed <= buf.length) {
        buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
        return this.lastChar.toString(this.encoding, 0, this.lastTotal);
    }
    buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
    this.lastNeed -= buf.length;
};
// Checks the type of a UTF-8 byte, whether it's ASCII, a leading byte, or a
// continuation byte. If an invalid byte is detected, -2 is returned.
function utf8CheckByte(byte) {
    if (byte <= 0x7F) return 0;
    else if (byte >> 5 === 0x06) return 2;
    else if (byte >> 4 === 0x0E) return 3;
    else if (byte >> 3 === 0x1E) return 4;
    return byte >> 6 === 0x02 ? -1 : -2;
}
// Checks at most 3 bytes at the end of a Buffer in order to detect an
// incomplete multi-byte UTF-8 character. The total number of bytes (2, 3, or 4)
// needed to complete the UTF-8 character (if applicable) are returned.
function utf8CheckIncomplete(self, buf, i) {
    var j = buf.length - 1;
    if (j < i) return 0;
    var nb = utf8CheckByte(buf[j]);
    if (nb >= 0) {
        if (nb > 0) self.lastNeed = nb - 1;
        return nb;
    }
    if (--j < i || nb === -2) return 0;
    nb = utf8CheckByte(buf[j]);
    if (nb >= 0) {
        if (nb > 0) self.lastNeed = nb - 2;
        return nb;
    }
    if (--j < i || nb === -2) return 0;
    nb = utf8CheckByte(buf[j]);
    if (nb >= 0) {
        if (nb > 0) {
            if (nb === 2) nb = 0;
            else self.lastNeed = nb - 3;
        }
        return nb;
    }
    return 0;
}
// Validates as many continuation bytes for a multi-byte UTF-8 character as
// needed or are available. If we see a non-continuation byte where we expect
// one, we "replace" the validated continuation bytes we've seen so far with
// a single UTF-8 replacement character ('\ufffd'), to match v8's UTF-8 decoding
// behavior. The continuation byte check is included three times in the case
// where all of the continuation bytes for a character exist in the same buffer.
// It is also done this way as a slight performance increase instead of using a
// loop.
function utf8CheckExtraBytes(self, buf, p) {
    if ((buf[0] & 0xC0) !== 0x80) {
        self.lastNeed = 0;
        return '\ufffd';
    }
    if (self.lastNeed > 1 && buf.length > 1) {
        if ((buf[1] & 0xC0) !== 0x80) {
            self.lastNeed = 1;
            return '\ufffd';
        }
        if (self.lastNeed > 2 && buf.length > 2) {
            if ((buf[2] & 0xC0) !== 0x80) {
                self.lastNeed = 2;
                return '\ufffd';
            }
        }
    }
}
// Attempts to complete a multi-byte UTF-8 character using bytes from a Buffer.
function utf8FillLast(buf) {
    var p = this.lastTotal - this.lastNeed;
    var r = utf8CheckExtraBytes(this, buf, p);
    if (r !== undefined) return r;
    if (this.lastNeed <= buf.length) {
        buf.copy(this.lastChar, p, 0, this.lastNeed);
        return this.lastChar.toString(this.encoding, 0, this.lastTotal);
    }
    buf.copy(this.lastChar, p, 0, buf.length);
    this.lastNeed -= buf.length;
}
// Returns all complete UTF-8 characters in a Buffer. If the Buffer ended on a
// partial character, the character's bytes are buffered until the required
// number of bytes are available.
function utf8Text(buf, i) {
    var total = utf8CheckIncomplete(this, buf, i);
    if (!this.lastNeed) return buf.toString('utf8', i);
    this.lastTotal = total;
    var end = buf.length - (total - this.lastNeed);
    buf.copy(this.lastChar, 0, end);
    return buf.toString('utf8', i, end);
}
// For UTF-8, a replacement character is added when ending on a partial
// character.
function utf8End(buf) {
    var r = buf && buf.length ? this.write(buf) : '';
    if (this.lastNeed) return r + '\ufffd';
    return r;
}
// UTF-16LE typically needs two bytes per character, but even if we have an even
// number of bytes available, we need to check if we end on a leading/high
// surrogate. In that case, we need to wait for the next two bytes in order to
// decode the last character properly.
function utf16Text(buf, i) {
    if ((buf.length - i) % 2 === 0) {
        var r = buf.toString('utf16le', i);
        if (r) {
            var c = r.charCodeAt(r.length - 1);
            if (c >= 0xD800 && c <= 0xDBFF) {
                this.lastNeed = 2;
                this.lastTotal = 4;
                this.lastChar[0] = buf[buf.length - 2];
                this.lastChar[1] = buf[buf.length - 1];
                return r.slice(0, -1);
            }
        }
        return r;
    }
    this.lastNeed = 1;
    this.lastTotal = 2;
    this.lastChar[0] = buf[buf.length - 1];
    return buf.toString('utf16le', i, buf.length - 1);
}
// For UTF-16LE we do not explicitly append special replacement characters if we
// end on a partial character, we simply let v8 handle that.
function utf16End(buf) {
    var r = buf && buf.length ? this.write(buf) : '';
    if (this.lastNeed) {
        var end = this.lastTotal - this.lastNeed;
        return r + this.lastChar.toString('utf16le', 0, end);
    }
    return r;
}
function base64Text(buf, i) {
    var n = (buf.length - i) % 3;
    if (n === 0) return buf.toString('base64', i);
    this.lastNeed = 3 - n;
    this.lastTotal = 3;
    if (n === 1) {
        this.lastChar[0] = buf[buf.length - 1];
    } else {
        this.lastChar[0] = buf[buf.length - 2];
        this.lastChar[1] = buf[buf.length - 1];
    }
    return buf.toString('base64', i, buf.length - n);
}
function base64End(buf) {
    var r = buf && buf.length ? this.write(buf) : '';
    if (this.lastNeed) return r + this.lastChar.toString('base64', 0, 3 - this.lastNeed);
    return r;
}
// Pass bytes on through for single-byte encodings (e.g. ascii, latin1, hex)
function simpleWrite(buf) {
    return buf.toString(this.encoding);
}
function simpleEnd(buf) {
    return buf && buf.length ? this.write(buf) : '';
}
}}),
"[project]/node_modules/asn1/lib/ber/errors.js [app-client] (ecmascript)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
// Copyright 2011 Mark Cavage <mcavage@gmail.com> All rights reserved.
module.exports = {
    newInvalidAsn1Error: function(msg) {
        var e = new Error();
        e.name = 'InvalidAsn1Error';
        e.message = msg || '';
        return e;
    }
};
}}),
"[project]/node_modules/asn1/lib/ber/types.js [app-client] (ecmascript)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
// Copyright 2011 Mark Cavage <mcavage@gmail.com> All rights reserved.
module.exports = {
    EOC: 0,
    Boolean: 1,
    Integer: 2,
    BitString: 3,
    OctetString: 4,
    Null: 5,
    OID: 6,
    ObjectDescriptor: 7,
    External: 8,
    Real: 9,
    Enumeration: 10,
    PDV: 11,
    Utf8String: 12,
    RelativeOID: 13,
    Sequence: 16,
    Set: 17,
    NumericString: 18,
    PrintableString: 19,
    T61String: 20,
    VideotexString: 21,
    IA5String: 22,
    UTCTime: 23,
    GeneralizedTime: 24,
    GraphicString: 25,
    VisibleString: 26,
    GeneralString: 28,
    UniversalString: 29,
    CharacterString: 30,
    BMPString: 31,
    Constructor: 32,
    Context: 128
};
}}),
"[project]/node_modules/asn1/lib/ber/reader.js [app-client] (ecmascript)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
// Copyright 2011 Mark Cavage <mcavage@gmail.com> All rights reserved.
var assert = __turbopack_context__.r("[project]/examples/sso-example/node_modules/next/dist/compiled/assert/assert.js [app-client] (ecmascript)");
var Buffer = __turbopack_context__.r("[project]/node_modules/safer-buffer/safer.js [app-client] (ecmascript)").Buffer;
var ASN1 = __turbopack_context__.r("[project]/node_modules/asn1/lib/ber/types.js [app-client] (ecmascript)");
var errors = __turbopack_context__.r("[project]/node_modules/asn1/lib/ber/errors.js [app-client] (ecmascript)");
// --- Globals
var newInvalidAsn1Error = errors.newInvalidAsn1Error;
// --- API
function Reader(data) {
    if (!data || !Buffer.isBuffer(data)) throw new TypeError('data must be a node Buffer');
    this._buf = data;
    this._size = data.length;
    // These hold the "current" state
    this._len = 0;
    this._offset = 0;
}
Object.defineProperty(Reader.prototype, 'length', {
    enumerable: true,
    get: function() {
        return this._len;
    }
});
Object.defineProperty(Reader.prototype, 'offset', {
    enumerable: true,
    get: function() {
        return this._offset;
    }
});
Object.defineProperty(Reader.prototype, 'remain', {
    get: function() {
        return this._size - this._offset;
    }
});
Object.defineProperty(Reader.prototype, 'buffer', {
    get: function() {
        return this._buf.slice(this._offset);
    }
});
/**
 * Reads a single byte and advances offset; you can pass in `true` to make this
 * a "peek" operation (i.e., get the byte, but don't advance the offset).
 *
 * @param {Boolean} peek true means don't move offset.
 * @return {Number} the next byte, null if not enough data.
 */ Reader.prototype.readByte = function(peek) {
    if (this._size - this._offset < 1) return null;
    var b = this._buf[this._offset] & 0xff;
    if (!peek) this._offset += 1;
    return b;
};
Reader.prototype.peek = function() {
    return this.readByte(true);
};
/**
 * Reads a (potentially) variable length off the BER buffer.  This call is
 * not really meant to be called directly, as callers have to manipulate
 * the internal buffer afterwards.
 *
 * As a result of this call, you can call `Reader.length`, until the
 * next thing called that does a readLength.
 *
 * @return {Number} the amount of offset to advance the buffer.
 * @throws {InvalidAsn1Error} on bad ASN.1
 */ Reader.prototype.readLength = function(offset) {
    if (offset === undefined) offset = this._offset;
    if (offset >= this._size) return null;
    var lenB = this._buf[offset++] & 0xff;
    if (lenB === null) return null;
    if ((lenB & 0x80) === 0x80) {
        lenB &= 0x7f;
        if (lenB === 0) throw newInvalidAsn1Error('Indefinite length not supported');
        if (lenB > 4) throw newInvalidAsn1Error('encoding too long');
        if (this._size - offset < lenB) return null;
        this._len = 0;
        for(var i = 0; i < lenB; i++)this._len = (this._len << 8) + (this._buf[offset++] & 0xff);
    } else {
        // Wasn't a variable length
        this._len = lenB;
    }
    return offset;
};
/**
 * Parses the next sequence in this BER buffer.
 *
 * To get the length of the sequence, call `Reader.length`.
 *
 * @return {Number} the sequence's tag.
 */ Reader.prototype.readSequence = function(tag) {
    var seq = this.peek();
    if (seq === null) return null;
    if (tag !== undefined && tag !== seq) throw newInvalidAsn1Error('Expected 0x' + tag.toString(16) + ': got 0x' + seq.toString(16));
    var o = this.readLength(this._offset + 1); // stored in `length`
    if (o === null) return null;
    this._offset = o;
    return seq;
};
Reader.prototype.readInt = function() {
    return this._readTag(ASN1.Integer);
};
Reader.prototype.readBoolean = function() {
    return this._readTag(ASN1.Boolean) === 0 ? false : true;
};
Reader.prototype.readEnumeration = function() {
    return this._readTag(ASN1.Enumeration);
};
Reader.prototype.readString = function(tag, retbuf) {
    if (!tag) tag = ASN1.OctetString;
    var b = this.peek();
    if (b === null) return null;
    if (b !== tag) throw newInvalidAsn1Error('Expected 0x' + tag.toString(16) + ': got 0x' + b.toString(16));
    var o = this.readLength(this._offset + 1); // stored in `length`
    if (o === null) return null;
    if (this.length > this._size - o) return null;
    this._offset = o;
    if (this.length === 0) return retbuf ? Buffer.alloc(0) : '';
    var str = this._buf.slice(this._offset, this._offset + this.length);
    this._offset += this.length;
    return retbuf ? str : str.toString('utf8');
};
Reader.prototype.readOID = function(tag) {
    if (!tag) tag = ASN1.OID;
    var b = this.readString(tag, true);
    if (b === null) return null;
    var values = [];
    var value = 0;
    for(var i = 0; i < b.length; i++){
        var byte = b[i] & 0xff;
        value <<= 7;
        value += byte & 0x7f;
        if ((byte & 0x80) === 0) {
            values.push(value);
            value = 0;
        }
    }
    value = values.shift();
    values.unshift(value % 40);
    values.unshift(value / 40 >> 0);
    return values.join('.');
};
Reader.prototype._readTag = function(tag) {
    assert.ok(tag !== undefined);
    var b = this.peek();
    if (b === null) return null;
    if (b !== tag) throw newInvalidAsn1Error('Expected 0x' + tag.toString(16) + ': got 0x' + b.toString(16));
    var o = this.readLength(this._offset + 1); // stored in `length`
    if (o === null) return null;
    if (this.length > 4) throw newInvalidAsn1Error('Integer too long: ' + this.length);
    if (this.length > this._size - o) return null;
    this._offset = o;
    var fb = this._buf[this._offset];
    var value = 0;
    for(var i = 0; i < this.length; i++){
        value <<= 8;
        value |= this._buf[this._offset++] & 0xff;
    }
    if ((fb & 0x80) === 0x80 && i !== 4) value -= 1 << i * 8;
    return value >> 0;
};
// --- Exported API
module.exports = Reader;
}}),
"[project]/node_modules/asn1/lib/ber/writer.js [app-client] (ecmascript)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
// Copyright 2011 Mark Cavage <mcavage@gmail.com> All rights reserved.
var assert = __turbopack_context__.r("[project]/examples/sso-example/node_modules/next/dist/compiled/assert/assert.js [app-client] (ecmascript)");
var Buffer = __turbopack_context__.r("[project]/node_modules/safer-buffer/safer.js [app-client] (ecmascript)").Buffer;
var ASN1 = __turbopack_context__.r("[project]/node_modules/asn1/lib/ber/types.js [app-client] (ecmascript)");
var errors = __turbopack_context__.r("[project]/node_modules/asn1/lib/ber/errors.js [app-client] (ecmascript)");
// --- Globals
var newInvalidAsn1Error = errors.newInvalidAsn1Error;
var DEFAULT_OPTS = {
    size: 1024,
    growthFactor: 8
};
// --- Helpers
function merge(from, to) {
    assert.ok(from);
    assert.equal(typeof from, 'object');
    assert.ok(to);
    assert.equal(typeof to, 'object');
    var keys = Object.getOwnPropertyNames(from);
    keys.forEach(function(key) {
        if (to[key]) return;
        var value = Object.getOwnPropertyDescriptor(from, key);
        Object.defineProperty(to, key, value);
    });
    return to;
}
// --- API
function Writer(options) {
    options = merge(DEFAULT_OPTS, options || {});
    this._buf = Buffer.alloc(options.size || 1024);
    this._size = this._buf.length;
    this._offset = 0;
    this._options = options;
    // A list of offsets in the buffer where we need to insert
    // sequence tag/len pairs.
    this._seq = [];
}
Object.defineProperty(Writer.prototype, 'buffer', {
    get: function() {
        if (this._seq.length) throw newInvalidAsn1Error(this._seq.length + ' unended sequence(s)');
        return this._buf.slice(0, this._offset);
    }
});
Writer.prototype.writeByte = function(b) {
    if (typeof b !== 'number') throw new TypeError('argument must be a Number');
    this._ensure(1);
    this._buf[this._offset++] = b;
};
Writer.prototype.writeInt = function(i, tag) {
    if (typeof i !== 'number') throw new TypeError('argument must be a Number');
    if (typeof tag !== 'number') tag = ASN1.Integer;
    var sz = 4;
    while(((i & 0xff800000) === 0 || (i & 0xff800000) === 0xff800000 >> 0) && sz > 1){
        sz--;
        i <<= 8;
    }
    if (sz > 4) throw newInvalidAsn1Error('BER ints cannot be > 0xffffffff');
    this._ensure(2 + sz);
    this._buf[this._offset++] = tag;
    this._buf[this._offset++] = sz;
    while(sz-- > 0){
        this._buf[this._offset++] = (i & 0xff000000) >>> 24;
        i <<= 8;
    }
};
Writer.prototype.writeNull = function() {
    this.writeByte(ASN1.Null);
    this.writeByte(0x00);
};
Writer.prototype.writeEnumeration = function(i, tag) {
    if (typeof i !== 'number') throw new TypeError('argument must be a Number');
    if (typeof tag !== 'number') tag = ASN1.Enumeration;
    return this.writeInt(i, tag);
};
Writer.prototype.writeBoolean = function(b, tag) {
    if (typeof b !== 'boolean') throw new TypeError('argument must be a Boolean');
    if (typeof tag !== 'number') tag = ASN1.Boolean;
    this._ensure(3);
    this._buf[this._offset++] = tag;
    this._buf[this._offset++] = 0x01;
    this._buf[this._offset++] = b ? 0xff : 0x00;
};
Writer.prototype.writeString = function(s, tag) {
    if (typeof s !== 'string') throw new TypeError('argument must be a string (was: ' + typeof s + ')');
    if (typeof tag !== 'number') tag = ASN1.OctetString;
    var len = Buffer.byteLength(s);
    this.writeByte(tag);
    this.writeLength(len);
    if (len) {
        this._ensure(len);
        this._buf.write(s, this._offset);
        this._offset += len;
    }
};
Writer.prototype.writeBuffer = function(buf, tag) {
    if (typeof tag !== 'number') throw new TypeError('tag must be a number');
    if (!Buffer.isBuffer(buf)) throw new TypeError('argument must be a buffer');
    this.writeByte(tag);
    this.writeLength(buf.length);
    this._ensure(buf.length);
    buf.copy(this._buf, this._offset, 0, buf.length);
    this._offset += buf.length;
};
Writer.prototype.writeStringArray = function(strings) {
    if (!strings instanceof Array) throw new TypeError('argument must be an Array[String]');
    var self = this;
    strings.forEach(function(s) {
        self.writeString(s);
    });
};
// This is really to solve DER cases, but whatever for now
Writer.prototype.writeOID = function(s, tag) {
    if (typeof s !== 'string') throw new TypeError('argument must be a string');
    if (typeof tag !== 'number') tag = ASN1.OID;
    if (!/^([0-9]+\.){3,}[0-9]+$/.test(s)) throw new Error('argument is not a valid OID string');
    function encodeOctet(bytes, octet) {
        if (octet < 128) {
            bytes.push(octet);
        } else if (octet < 16384) {
            bytes.push(octet >>> 7 | 0x80);
            bytes.push(octet & 0x7F);
        } else if (octet < 2097152) {
            bytes.push(octet >>> 14 | 0x80);
            bytes.push((octet >>> 7 | 0x80) & 0xFF);
            bytes.push(octet & 0x7F);
        } else if (octet < 268435456) {
            bytes.push(octet >>> 21 | 0x80);
            bytes.push((octet >>> 14 | 0x80) & 0xFF);
            bytes.push((octet >>> 7 | 0x80) & 0xFF);
            bytes.push(octet & 0x7F);
        } else {
            bytes.push((octet >>> 28 | 0x80) & 0xFF);
            bytes.push((octet >>> 21 | 0x80) & 0xFF);
            bytes.push((octet >>> 14 | 0x80) & 0xFF);
            bytes.push((octet >>> 7 | 0x80) & 0xFF);
            bytes.push(octet & 0x7F);
        }
    }
    var tmp = s.split('.');
    var bytes = [];
    bytes.push(parseInt(tmp[0], 10) * 40 + parseInt(tmp[1], 10));
    tmp.slice(2).forEach(function(b) {
        encodeOctet(bytes, parseInt(b, 10));
    });
    var self = this;
    this._ensure(2 + bytes.length);
    this.writeByte(tag);
    this.writeLength(bytes.length);
    bytes.forEach(function(b) {
        self.writeByte(b);
    });
};
Writer.prototype.writeLength = function(len) {
    if (typeof len !== 'number') throw new TypeError('argument must be a Number');
    this._ensure(4);
    if (len <= 0x7f) {
        this._buf[this._offset++] = len;
    } else if (len <= 0xff) {
        this._buf[this._offset++] = 0x81;
        this._buf[this._offset++] = len;
    } else if (len <= 0xffff) {
        this._buf[this._offset++] = 0x82;
        this._buf[this._offset++] = len >> 8;
        this._buf[this._offset++] = len;
    } else if (len <= 0xffffff) {
        this._buf[this._offset++] = 0x83;
        this._buf[this._offset++] = len >> 16;
        this._buf[this._offset++] = len >> 8;
        this._buf[this._offset++] = len;
    } else {
        throw newInvalidAsn1Error('Length too long (> 4 bytes)');
    }
};
Writer.prototype.startSequence = function(tag) {
    if (typeof tag !== 'number') tag = ASN1.Sequence | ASN1.Constructor;
    this.writeByte(tag);
    this._seq.push(this._offset);
    this._ensure(3);
    this._offset += 3;
};
Writer.prototype.endSequence = function() {
    var seq = this._seq.pop();
    var start = seq + 3;
    var len = this._offset - start;
    if (len <= 0x7f) {
        this._shift(start, len, -2);
        this._buf[seq] = len;
    } else if (len <= 0xff) {
        this._shift(start, len, -1);
        this._buf[seq] = 0x81;
        this._buf[seq + 1] = len;
    } else if (len <= 0xffff) {
        this._buf[seq] = 0x82;
        this._buf[seq + 1] = len >> 8;
        this._buf[seq + 2] = len;
    } else if (len <= 0xffffff) {
        this._shift(start, len, 1);
        this._buf[seq] = 0x83;
        this._buf[seq + 1] = len >> 16;
        this._buf[seq + 2] = len >> 8;
        this._buf[seq + 3] = len;
    } else {
        throw newInvalidAsn1Error('Sequence too long');
    }
};
Writer.prototype._shift = function(start, len, shift) {
    assert.ok(start !== undefined);
    assert.ok(len !== undefined);
    assert.ok(shift);
    this._buf.copy(this._buf, start + shift, start, start + len);
    this._offset += shift;
};
Writer.prototype._ensure = function(len) {
    assert.ok(len);
    if (this._size - this._offset < len) {
        var sz = this._size * this._options.growthFactor;
        if (sz - this._offset < len) sz += len;
        var buf = Buffer.alloc(sz);
        this._buf.copy(buf, 0, 0, this._offset);
        this._buf = buf;
        this._size = sz;
    }
};
// --- Exported API
module.exports = Writer;
}}),
"[project]/node_modules/asn1/lib/ber/index.js [app-client] (ecmascript)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
// Copyright 2011 Mark Cavage <mcavage@gmail.com> All rights reserved.
var errors = __turbopack_context__.r("[project]/node_modules/asn1/lib/ber/errors.js [app-client] (ecmascript)");
var types = __turbopack_context__.r("[project]/node_modules/asn1/lib/ber/types.js [app-client] (ecmascript)");
var Reader = __turbopack_context__.r("[project]/node_modules/asn1/lib/ber/reader.js [app-client] (ecmascript)");
var Writer = __turbopack_context__.r("[project]/node_modules/asn1/lib/ber/writer.js [app-client] (ecmascript)");
// --- Exports
module.exports = {
    Reader: Reader,
    Writer: Writer
};
for(var t in types){
    if (types.hasOwnProperty(t)) module.exports[t] = types[t];
}
for(var e in errors){
    if (errors.hasOwnProperty(e)) module.exports[e] = errors[e];
}
}}),
"[project]/node_modules/asn1/lib/index.js [app-client] (ecmascript)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
// Copyright 2011 Mark Cavage <mcavage@gmail.com> All rights reserved.
// If you have no idea what ASN.1 or BER is, see this:
// ftp://ftp.rsa.com/pub/pkcs/ascii/layman.asc
var Ber = __turbopack_context__.r("[project]/node_modules/asn1/lib/ber/index.js [app-client] (ecmascript)");
// --- Exported API
module.exports = {
    Ber: Ber,
    BerReader: Ber.Reader,
    BerWriter: Ber.Writer
};
}}),
"[project]/node_modules/safer-buffer/safer.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
/* eslint-disable node/no-deprecated-api */ var __TURBOPACK__imported__module__$5b$project$5d2f$examples$2f$sso$2d$example$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/examples/sso-example/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
var buffer = __turbopack_context__.r("[project]/node_modules/buffer/index.js [app-client] (ecmascript)");
var Buffer = buffer.Buffer;
var safer = {};
var key;
for(key in buffer){
    if (!buffer.hasOwnProperty(key)) continue;
    if (key === 'SlowBuffer' || key === 'Buffer') continue;
    safer[key] = buffer[key];
}
var Safer = safer.Buffer = {};
for(key in Buffer){
    if (!Buffer.hasOwnProperty(key)) continue;
    if (key === 'allocUnsafe' || key === 'allocUnsafeSlow') continue;
    Safer[key] = Buffer[key];
}
safer.Buffer.prototype = Buffer.prototype;
if (!Safer.from || Safer.from === Uint8Array.from) {
    Safer.from = function(value, encodingOrOffset, length) {
        if (typeof value === 'number') {
            throw new TypeError('The "value" argument must not be of type number. Received type ' + typeof value);
        }
        if (value && typeof value.length === 'undefined') {
            throw new TypeError('The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type ' + typeof value);
        }
        return Buffer(value, encodingOrOffset, length);
    };
}
if (!Safer.alloc) {
    Safer.alloc = function(size, fill, encoding) {
        if (typeof size !== 'number') {
            throw new TypeError('The "size" argument must be of type number. Received type ' + typeof size);
        }
        if (size < 0 || size >= 2 * (1 << 30)) {
            throw new RangeError('The value "' + size + '" is invalid for option "size"');
        }
        var buf = Buffer(size);
        if (!fill || fill.length === 0) {
            buf.fill(0);
        } else if (typeof encoding === 'string') {
            buf.fill(fill, encoding);
        } else {
            buf.fill(fill);
        }
        return buf;
    };
}
if (!safer.kStringMaxLength) {
    try {
        safer.kStringMaxLength = __TURBOPACK__imported__module__$5b$project$5d2f$examples$2f$sso$2d$example$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].binding('buffer').kStringMaxLength;
    } catch (e) {
    // we can't determine kStringMaxLength in environments where process.binding
    // is unsupported, so let's not set it
    }
}
if (!safer.constants) {
    safer.constants = {
        MAX_LENGTH: safer.kMaxLength
    };
    if (safer.kStringMaxLength) {
        safer.constants.MAX_STRING_LENGTH = safer.kStringMaxLength;
    }
}
module.exports = safer;
}}),
"[project]/node_modules/@xmldom/is-dom-node/dist/index.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.assertIsDocumentFragmentNode = exports.assertIsDocumentTypeNode = exports.assertIsDocumentNode = exports.assertIsCommentNode = exports.assertIsProcessingInstructionNode = exports.assertIsCDATASectionNode = exports.assertIsTextNode = exports.assertIsAttributeNode = exports.assertIsElementNode = exports.isDocumentFragmentNode = exports.isDocumentTypeNode = exports.isDocumentNode = exports.isCommentNode = exports.isProcessingInstructionNode = exports.isCDATASectionNode = exports.isTextNode = exports.isAttributeNode = exports.isElementNode = exports.assertIsArrayOfNodes = exports.isArrayOfNodes = exports.assertIsNodeLike = exports.isNodeLike = exports.NodeTypes = void 0;
var NodeTypes;
(function(NodeTypes) {
    NodeTypes[NodeTypes["ELEMENT_NODE"] = 1] = "ELEMENT_NODE";
    NodeTypes[NodeTypes["ATTRIBUTE_NODE"] = 2] = "ATTRIBUTE_NODE";
    NodeTypes[NodeTypes["TEXT_NODE"] = 3] = "TEXT_NODE";
    NodeTypes[NodeTypes["CDATA_SECTION_NODE"] = 4] = "CDATA_SECTION_NODE";
    NodeTypes[NodeTypes["PROCESSING_INSTRUCTION_NODE"] = 7] = "PROCESSING_INSTRUCTION_NODE";
    NodeTypes[NodeTypes["COMMENT_NODE"] = 8] = "COMMENT_NODE";
    NodeTypes[NodeTypes["DOCUMENT_NODE"] = 9] = "DOCUMENT_NODE";
    NodeTypes[NodeTypes["DOCUMENT_TYPE_NODE"] = 10] = "DOCUMENT_TYPE_NODE";
    NodeTypes[NodeTypes["DOCUMENT_FRAGMENT_NODE"] = 11] = "DOCUMENT_FRAGMENT_NODE";
})(NodeTypes || (exports.NodeTypes = NodeTypes = {}));
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isNodeLike(value) {
    return value && typeof value === "object" && Number.isInteger(value.nodeType) && value.nodeType >= 1 && value.nodeType <= 11 && typeof value.nodeName === "string" && typeof value.appendChild === "function" && typeof value.removeChild === "function";
}
exports.isNodeLike = isNodeLike;
function assertIsNodeLike(value) {
    if (!isNodeLike(value)) {
        throw new Error("Value is not a Node-like object. Received: ".concat(value));
    }
}
exports.assertIsNodeLike = assertIsNodeLike;
function isArrayOfNodes(value) {
    return Array.isArray(value) && value.every(isNodeLike);
}
exports.isArrayOfNodes = isArrayOfNodes;
function assertIsArrayOfNodes(value) {
    if (!isArrayOfNodes(value)) {
        throw new Error("Value is not an array of Nodes");
    }
}
exports.assertIsArrayOfNodes = assertIsArrayOfNodes;
function isNodeOfType(type, value) {
    return isNodeLike(value) && value.nodeType === type;
}
function assertIsNodeOfType(type, value) {
    const typeName = Object.keys(NodeTypes).find((key)=>NodeTypes[key] === type);
    if (!isNodeOfType(type, value)) {
        throw new Error("Value is not of type ".concat(typeName));
    }
}
const isElementNode = (value)=>isNodeOfType(NodeTypes.ELEMENT_NODE, value);
exports.isElementNode = isElementNode;
const isAttributeNode = (value)=>isNodeOfType(NodeTypes.ATTRIBUTE_NODE, value);
exports.isAttributeNode = isAttributeNode;
const isTextNode = (value)=>isNodeOfType(NodeTypes.TEXT_NODE, value);
exports.isTextNode = isTextNode;
const isCDATASectionNode = (value)=>isNodeOfType(NodeTypes.CDATA_SECTION_NODE, value);
exports.isCDATASectionNode = isCDATASectionNode;
const isProcessingInstructionNode = (value)=>isNodeOfType(NodeTypes.PROCESSING_INSTRUCTION_NODE, value);
exports.isProcessingInstructionNode = isProcessingInstructionNode;
const isCommentNode = (value)=>isNodeOfType(NodeTypes.COMMENT_NODE, value);
exports.isCommentNode = isCommentNode;
const isDocumentNode = (value)=>isNodeOfType(NodeTypes.DOCUMENT_NODE, value);
exports.isDocumentNode = isDocumentNode;
const isDocumentTypeNode = (value)=>isNodeOfType(NodeTypes.DOCUMENT_TYPE_NODE, value);
exports.isDocumentTypeNode = isDocumentTypeNode;
const isDocumentFragmentNode = (value)=>isNodeOfType(NodeTypes.DOCUMENT_FRAGMENT_NODE, value);
exports.isDocumentFragmentNode = isDocumentFragmentNode;
const assertIsElementNode = (value)=>{
    assertIsNodeOfType(NodeTypes.ELEMENT_NODE, value);
};
exports.assertIsElementNode = assertIsElementNode;
const assertIsAttributeNode = (value)=>assertIsNodeOfType(NodeTypes.ATTRIBUTE_NODE, value);
exports.assertIsAttributeNode = assertIsAttributeNode;
const assertIsTextNode = (value)=>assertIsNodeOfType(NodeTypes.TEXT_NODE, value);
exports.assertIsTextNode = assertIsTextNode;
const assertIsCDATASectionNode = (value)=>assertIsNodeOfType(NodeTypes.CDATA_SECTION_NODE, value);
exports.assertIsCDATASectionNode = assertIsCDATASectionNode;
const assertIsProcessingInstructionNode = (value)=>assertIsNodeOfType(NodeTypes.PROCESSING_INSTRUCTION_NODE, value);
exports.assertIsProcessingInstructionNode = assertIsProcessingInstructionNode;
const assertIsCommentNode = (value)=>assertIsNodeOfType(NodeTypes.COMMENT_NODE, value);
exports.assertIsCommentNode = assertIsCommentNode;
const assertIsDocumentNode = (value)=>assertIsNodeOfType(NodeTypes.DOCUMENT_NODE, value);
exports.assertIsDocumentNode = assertIsDocumentNode;
const assertIsDocumentTypeNode = (value)=>assertIsNodeOfType(NodeTypes.DOCUMENT_TYPE_NODE, value);
exports.assertIsDocumentTypeNode = assertIsDocumentTypeNode;
const assertIsDocumentFragmentNode = (value)=>assertIsNodeOfType(NodeTypes.DOCUMENT_FRAGMENT_NODE, value);
exports.assertIsDocumentFragmentNode = assertIsDocumentFragmentNode; //# sourceMappingURL=index.js.map
}}),
"[project]/node_modules/xml-crypto/lib/utils.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
var __TURBOPACK__imported__module__$5b$project$5d2f$examples$2f$sso$2d$example$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/examples/sso-example/node_modules/next/dist/compiled/buffer/index.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.validateDigestValue = exports.findAncestorNs = exports.derToPem = exports.pemToDer = exports.normalizePem = exports.BASE64_REGEX = exports.EXTRACT_X509_CERTS = exports.PEM_FORMAT_REGEX = exports.encodeSpecialCharactersInText = exports.encodeSpecialCharactersInAttribute = exports.findChilds = exports.findChildren = exports.findAttr = exports.isArrayHasLength = void 0;
const xpath = __turbopack_context__.r("[project]/node_modules/xml-crypto/node_modules/xpath/xpath.js [app-client] (ecmascript)");
const isDomNode = __turbopack_context__.r("[project]/node_modules/@xmldom/is-dom-node/dist/index.js [app-client] (ecmascript)");
function isArrayHasLength(array) {
    return Array.isArray(array) && array.length > 0;
}
exports.isArrayHasLength = isArrayHasLength;
function attrEqualsExplicitly(attr, localName, namespace) {
    return attr.localName === localName && (attr.namespaceURI === namespace || namespace == null);
}
function attrEqualsImplicitly(attr, localName, namespace, node) {
    return attr.localName === localName && (!attr.namespaceURI && (node === null || node === void 0 ? void 0 : node.namespaceURI) === namespace || namespace == null);
}
function findAttr(element, localName, namespace) {
    for(let i = 0; i < element.attributes.length; i++){
        const attr = element.attributes[i];
        if (attrEqualsExplicitly(attr, localName, namespace) || attrEqualsImplicitly(attr, localName, namespace, element)) {
            return attr;
        }
    }
    return null;
}
exports.findAttr = findAttr;
function findChildren(node, localName, namespace) {
    var _node_documentElement;
    const element = (_node_documentElement = node.documentElement) !== null && _node_documentElement !== void 0 ? _node_documentElement : node;
    const res = [];
    for(let i = 0; i < element.childNodes.length; i++){
        const child = element.childNodes[i];
        if (isDomNode.isElementNode(child) && child.localName === localName && (child.namespaceURI === namespace || namespace == null)) {
            res.push(child);
        }
    }
    return res;
}
exports.findChildren = findChildren;
/** @deprecated */ function findChilds(node, localName, namespace) {
    return findChildren(node, localName, namespace);
}
exports.findChilds = findChilds;
const xml_special_to_encoded_attribute = {
    "&": "&amp;",
    "<": "&lt;",
    '"': "&quot;",
    "\r": "&#xD;",
    "\n": "&#xA;",
    "\t": "&#x9;"
};
const xml_special_to_encoded_text = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\r": "&#xD;"
};
function encodeSpecialCharactersInAttribute(attributeValue) {
    return attributeValue.replace(/([&<"\r\n\t])/g, function(str, item) {
        /** Special character normalization.
         * @see:
         * - https://www.w3.org/TR/xml-c14n#ProcessingModel (Attribute Nodes)
         * - https://www.w3.org/TR/xml-c14n#Example-Chars
         */ return xml_special_to_encoded_attribute[item];
    });
}
exports.encodeSpecialCharactersInAttribute = encodeSpecialCharactersInAttribute;
function encodeSpecialCharactersInText(text) {
    return text.replace(/([&<>\r])/g, function(str, item) {
        /** Special character normalization.
         * @see:
         * - https://www.w3.org/TR/xml-c14n#ProcessingModel (Text Nodes)
         * - https://www.w3.org/TR/xml-c14n#Example-Chars
         */ return xml_special_to_encoded_text[item];
    });
}
exports.encodeSpecialCharactersInText = encodeSpecialCharactersInText;
/**
 * PEM format has wide range of usages, but this library
 * is enforcing RFC7468 which focuses on PKIX, PKCS and CMS.
 *
 * https://www.rfc-editor.org/rfc/rfc7468
 *
 * PEM_FORMAT_REGEX is validating given PEM file against RFC7468 'stricttextualmsg' definition.
 *
 * With few exceptions;
 *  - 'posteb' MAY have 'eol', but it is not mandatory.
 *  - 'preeb' and 'posteb' lines are limited to 64 characters, but
 *     should not cause any issues in context of PKIX, PKCS and CMS.
 */ exports.PEM_FORMAT_REGEX = new RegExp("^-----BEGIN [A-Z\x20]{1,48}-----([^-]*)-----END [A-Z\x20]{1,48}-----$", "s");
exports.EXTRACT_X509_CERTS = new RegExp("-----BEGIN CERTIFICATE-----[^-]*-----END CERTIFICATE-----", "g");
exports.BASE64_REGEX = new RegExp("^(?:[A-Za-z0-9\\+\\/]{4}\\n{0,1})*(?:[A-Za-z0-9\\+\\/]{2}==|[A-Za-z0-9\\+\\/]{3}=)?$", "s");
/**
 * -----BEGIN [LABEL]-----
 * base64([DATA])
 * -----END [LABEL]-----
 *
 * Above is shown what PEM file looks like. As can be seen, base64 data
 * can be in single line or multiple lines.
 *
 * This function normalizes PEM presentation to;
 *  - contain PEM header and footer as they are given
 *  - normalize line endings to '\n'
 *  - normalize line length to maximum of 64 characters
 *  - ensure that 'preeb' has line ending '\n'
 *
 * With a couple of notes:
 *  - 'eol' is normalized to '\n'
 *
 * @param pem The PEM string to normalize to RFC7468 'stricttextualmsg' definition
 */ function normalizePem(pem) {
    var _pem_trim_replace_match;
    return "".concat(((_pem_trim_replace_match = pem.trim().replace(/(\r\n|\r)/g, "\n").match(/.{1,64}/g)) !== null && _pem_trim_replace_match !== void 0 ? _pem_trim_replace_match : []).join("\n"), "\n");
}
exports.normalizePem = normalizePem;
/**
 * @param pem The PEM-encoded base64 certificate to strip headers from
 */ function pemToDer(pem) {
    if (!exports.PEM_FORMAT_REGEX.test(pem.trim())) {
        throw new Error("Invalid PEM format.");
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$examples$2f$sso$2d$example$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from(pem.replace(/(\r\n|\r)/g, "").replace(/-----BEGIN [A-Z\x20]{1,48}-----\n?/, "").replace(/-----END [A-Z\x20]{1,48}-----\n?/, ""), "base64");
}
exports.pemToDer = pemToDer;
/**
 * @param der The DER-encoded base64 certificate to add PEM headers too
 * @param pemLabel The label of the header and footer to add
 */ function derToPem(der, pemLabel) {
    const base64Der = __TURBOPACK__imported__module__$5b$project$5d2f$examples$2f$sso$2d$example$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].isBuffer(der) ? der.toString("base64").trim() : der.replace(/(\r\n|\r)/g, "").trim();
    if (exports.PEM_FORMAT_REGEX.test(base64Der)) {
        return normalizePem(base64Der);
    }
    if (exports.BASE64_REGEX.test(base64Der.replace(/ /g, ""))) {
        if (pemLabel == null) {
            throw new Error("PEM label is required when DER is given.");
        }
        const pem = "-----BEGIN ".concat(pemLabel, "-----\n").concat(base64Der.replace(/ /g, ""), "\n-----END ").concat(pemLabel, "-----");
        return normalizePem(pem);
    }
    throw new Error("Unknown DER format.");
}
exports.derToPem = derToPem;
function collectAncestorNamespaces(node) {
    let nsArray = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
    if (!isDomNode.isElementNode(node.parentNode)) {
        return nsArray;
    }
    const parent = node.parentNode;
    if (!parent) {
        return nsArray;
    }
    if (parent.attributes && parent.attributes.length > 0) {
        for(let i = 0; i < parent.attributes.length; i++){
            const attr = parent.attributes[i];
            if (attr && attr.nodeName && attr.nodeName.search(/^xmlns:?/) !== -1) {
                nsArray.push({
                    prefix: attr.nodeName.replace(/^xmlns:?/, ""),
                    namespaceURI: attr.nodeValue || ""
                });
            }
        }
    }
    return collectAncestorNamespaces(parent, nsArray);
}
function findNSPrefix(subset) {
    const subsetAttributes = subset.attributes;
    for(let k = 0; k < subsetAttributes.length; k++){
        const nodeName = subsetAttributes[k].nodeName;
        if (nodeName.search(/^xmlns:?/) !== -1) {
            return nodeName.replace(/^xmlns:?/, "");
        }
    }
    return subset.prefix || "";
}
function isElementSubset(docSubset) {
    return docSubset.every((node)=>isDomNode.isElementNode(node));
}
/**
 * Extract ancestor namespaces in order to import it to root of document subset
 * which is being canonicalized for non-exclusive c14n.
 *
 * @param doc - Usually a product from `new xmldom.DOMParser().parseFromString()`
 * @param docSubsetXpath - xpath query to get document subset being canonicalized
 * @param namespaceResolver - xpath namespace resolver
 * @returns i.e. [{prefix: "saml", namespaceURI: "urn:oasis:names:tc:SAML:2.0:assertion"}]
 */ function findAncestorNs(doc, docSubsetXpath, namespaceResolver) {
    if (docSubsetXpath == null) {
        return [];
    }
    const docSubset = xpath.selectWithResolver(docSubsetXpath, doc, namespaceResolver);
    if (!isArrayHasLength(docSubset)) {
        return [];
    }
    if (!isElementSubset(docSubset)) {
        throw new Error("Document subset must be list of elements");
    }
    // Remove duplicate on ancestor namespace
    const ancestorNs = collectAncestorNamespaces(docSubset[0]);
    const ancestorNsWithoutDuplicate = [];
    for(let i = 0; i < ancestorNs.length; i++){
        let notOnTheList = true;
        for(const v in ancestorNsWithoutDuplicate){
            if (ancestorNsWithoutDuplicate[v].prefix === ancestorNs[i].prefix) {
                notOnTheList = false;
                break;
            }
        }
        if (notOnTheList) {
            ancestorNsWithoutDuplicate.push(ancestorNs[i]);
        }
    }
    // Remove namespaces which are already declared in the subset with the same prefix
    const returningNs = [];
    const subsetNsPrefix = findNSPrefix(docSubset[0]);
    for (const ancestorNs of ancestorNsWithoutDuplicate){
        if (ancestorNs.prefix !== subsetNsPrefix) {
            returningNs.push(ancestorNs);
        }
    }
    return returningNs;
}
exports.findAncestorNs = findAncestorNs;
function validateDigestValue(digest, expectedDigest) {
    const buffer = __TURBOPACK__imported__module__$5b$project$5d2f$examples$2f$sso$2d$example$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from(digest, "base64");
    const expectedBuffer = __TURBOPACK__imported__module__$5b$project$5d2f$examples$2f$sso$2d$example$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from(expectedDigest, "base64");
    if (typeof buffer.equals === "function") {
        return buffer.equals(expectedBuffer);
    }
    if (buffer.length !== expectedBuffer.length) {
        return false;
    }
    for(let i = 0; i < buffer.length; i++){
        if (buffer[i] !== expectedBuffer[i]) {
            return false;
        }
    }
    return true;
}
exports.validateDigestValue = validateDigestValue; //# sourceMappingURL=utils.js.map
}}),
"[project]/node_modules/xml-crypto/lib/c14n-canonicalization.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.C14nCanonicalizationWithComments = exports.C14nCanonicalization = void 0;
const utils = __turbopack_context__.r("[project]/node_modules/xml-crypto/lib/utils.js [app-client] (ecmascript)");
const isDomNode = __turbopack_context__.r("[project]/node_modules/@xmldom/is-dom-node/dist/index.js [app-client] (ecmascript)");
class C14nCanonicalization {
    attrCompare(a, b) {
        if (!a.namespaceURI && b.namespaceURI) {
            return -1;
        }
        if (!b.namespaceURI && a.namespaceURI) {
            return 1;
        }
        const left = a.namespaceURI + a.localName;
        const right = b.namespaceURI + b.localName;
        if (left === right) {
            return 0;
        } else if (left < right) {
            return -1;
        } else {
            return 1;
        }
    }
    nsCompare(a, b) {
        const attr1 = a.prefix;
        const attr2 = b.prefix;
        if (attr1 === attr2) {
            return 0;
        }
        return attr1.localeCompare(attr2);
    }
    renderAttrs(node) {
        let i;
        let attr;
        const attrListToRender = [];
        if (isDomNode.isCommentNode(node)) {
            return this.renderComment(node);
        }
        if (node.attributes) {
            for(i = 0; i < node.attributes.length; ++i){
                attr = node.attributes[i];
                //ignore namespace definition attributes
                if (attr.name.indexOf("xmlns") === 0) {
                    continue;
                }
                attrListToRender.push(attr);
            }
        }
        attrListToRender.sort(this.attrCompare);
        const res = attrListToRender.map((attr)=>{
            return " ".concat(attr.name, '="').concat(utils.encodeSpecialCharactersInAttribute(attr.value), '"');
        });
        return res.join("");
    }
    /**
     * Create the string of all namespace declarations that should appear on this element
     *
     * @param node The node we now render
     * @param prefixesInScope The prefixes defined on this node parents which are a part of the output set
     * @param defaultNs The current default namespace
     * @param defaultNsForPrefix
     * @param ancestorNamespaces Import ancestor namespaces if it is specified
     * @api private
     */ renderNs(node, prefixesInScope, defaultNs, defaultNsForPrefix, ancestorNamespaces) {
        let i;
        let attr;
        const res = [];
        let newDefaultNs = defaultNs;
        const nsListToRender = [];
        const currNs = node.namespaceURI || "";
        //handle the namespace of the node itself
        if (node.prefix) {
            if (prefixesInScope.indexOf(node.prefix) === -1) {
                nsListToRender.push({
                    prefix: node.prefix,
                    namespaceURI: node.namespaceURI || defaultNsForPrefix[node.prefix]
                });
                prefixesInScope.push(node.prefix);
            }
        } else if (defaultNs !== currNs) {
            //new default ns
            newDefaultNs = node.namespaceURI || "";
            res.push(' xmlns="', newDefaultNs, '"');
        }
        //handle the attributes namespace
        if (node.attributes) {
            for(i = 0; i < node.attributes.length; ++i){
                attr = node.attributes[i];
                //handle all prefixed attributes that are included in the prefix list and where
                //the prefix is not defined already. New prefixes can only be defined by `xmlns:`.
                if (attr.prefix === "xmlns" && prefixesInScope.indexOf(attr.localName) === -1) {
                    nsListToRender.push({
                        prefix: attr.localName,
                        namespaceURI: attr.value
                    });
                    prefixesInScope.push(attr.localName);
                }
                //handle all prefixed attributes that are not xmlns definitions and where
                //the prefix is not defined already
                if (attr.prefix && prefixesInScope.indexOf(attr.prefix) === -1 && attr.prefix !== "xmlns" && attr.prefix !== "xml") {
                    nsListToRender.push({
                        prefix: attr.prefix,
                        namespaceURI: attr.namespaceURI
                    });
                    prefixesInScope.push(attr.prefix);
                }
            }
        }
        if (utils.isArrayHasLength(ancestorNamespaces)) {
            // Remove namespaces which are already present in nsListToRender
            for (const ancestorNamespace of ancestorNamespaces){
                let alreadyListed = false;
                for (const nsToRender of nsListToRender){
                    if (nsToRender.prefix === ancestorNamespace.prefix && nsToRender.namespaceURI === ancestorNamespace.namespaceURI) {
                        alreadyListed = true;
                    }
                }
                if (!alreadyListed) {
                    nsListToRender.push(ancestorNamespace);
                }
            }
        }
        nsListToRender.sort(this.nsCompare);
        //render namespaces
        res.push(...nsListToRender.map((attr)=>{
            if (attr.prefix) {
                return " xmlns:".concat(attr.prefix, '="').concat(attr.namespaceURI, '"');
            }
            return ' xmlns="'.concat(attr.namespaceURI, '"');
        }));
        return {
            rendered: res.join(""),
            newDefaultNs
        };
    }
    /**
     * @param node Node
     */ processInner(node, prefixesInScope, defaultNs, defaultNsForPrefix, ancestorNamespaces) {
        if (isDomNode.isCommentNode(node)) {
            return this.renderComment(node);
        }
        if (node.data) {
            return utils.encodeSpecialCharactersInText(node.data);
        }
        if (isDomNode.isElementNode(node)) {
            let i;
            let pfxCopy;
            const ns = this.renderNs(node, prefixesInScope, defaultNs, defaultNsForPrefix, ancestorNamespaces);
            const res = [
                "<",
                node.tagName,
                ns.rendered,
                this.renderAttrs(node),
                ">"
            ];
            for(i = 0; i < node.childNodes.length; ++i){
                pfxCopy = prefixesInScope.slice(0);
                res.push(this.processInner(node.childNodes[i], pfxCopy, ns.newDefaultNs, defaultNsForPrefix, []));
            }
            res.push("</", node.tagName, ">");
            return res.join("");
        }
        throw new Error("Unable to canonicalize node type: ".concat(node.nodeType));
    }
    // Thanks to deoxxa/xml-c14n for comment renderer
    renderComment(node) {
        if (!this.includeComments) {
            return "";
        }
        const isOutsideDocument = node.ownerDocument === node.parentNode;
        let isBeforeDocument = false;
        let isAfterDocument = false;
        if (isOutsideDocument) {
            let nextNode = node;
            let previousNode = node;
            while(nextNode !== null){
                if (nextNode === node.ownerDocument.documentElement) {
                    isBeforeDocument = true;
                    break;
                }
                nextNode = nextNode.nextSibling;
            }
            while(previousNode !== null){
                if (previousNode === node.ownerDocument.documentElement) {
                    isAfterDocument = true;
                    break;
                }
                previousNode = previousNode.previousSibling;
            }
        }
        const afterDocument = isAfterDocument ? "\n" : "";
        const beforeDocument = isBeforeDocument ? "\n" : "";
        const encodedText = utils.encodeSpecialCharactersInText(node.data);
        return "".concat(afterDocument, "<!--").concat(encodedText, "-->").concat(beforeDocument);
    }
    /**
     * Perform canonicalization of the given node
     *
     * @param node
     * @api public
     */ process(node, options) {
        options = options || {};
        const defaultNs = options.defaultNs || "";
        const defaultNsForPrefix = options.defaultNsForPrefix || {};
        const ancestorNamespaces = options.ancestorNamespaces || [];
        const prefixesInScope = [];
        for(let i = 0; i < ancestorNamespaces.length; i++){
            prefixesInScope.push(ancestorNamespaces[i].prefix);
        }
        const res = this.processInner(node, prefixesInScope, defaultNs, defaultNsForPrefix, ancestorNamespaces);
        return res;
    }
    getAlgorithmName() {
        return "http://www.w3.org/TR/2001/REC-xml-c14n-20010315";
    }
    constructor(){
        this.includeComments = false;
        this.includeComments = false;
    }
}
exports.C14nCanonicalization = C14nCanonicalization;
/**
 * Add c14n#WithComments here (very simple subclass)
 */ class C14nCanonicalizationWithComments extends C14nCanonicalization {
    getAlgorithmName() {
        return "http://www.w3.org/TR/2001/REC-xml-c14n-20010315#WithComments";
    }
    constructor(){
        super();
        this.includeComments = true;
    }
}
exports.C14nCanonicalizationWithComments = C14nCanonicalizationWithComments; //# sourceMappingURL=c14n-canonicalization.js.map
}}),
"[project]/node_modules/xml-crypto/lib/exclusive-canonicalization.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ExclusiveCanonicalizationWithComments = exports.ExclusiveCanonicalization = void 0;
const utils = __turbopack_context__.r("[project]/node_modules/xml-crypto/lib/utils.js [app-client] (ecmascript)");
const isDomNode = __turbopack_context__.r("[project]/node_modules/@xmldom/is-dom-node/dist/index.js [app-client] (ecmascript)");
function isPrefixInScope(prefixesInScope, prefix, namespaceURI) {
    let ret = false;
    prefixesInScope.forEach(function(pf) {
        if (pf.prefix === prefix && pf.namespaceURI === namespaceURI) {
            ret = true;
        }
    });
    return ret;
}
class ExclusiveCanonicalization {
    attrCompare(a, b) {
        if (!a.namespaceURI && b.namespaceURI) {
            return -1;
        }
        if (!b.namespaceURI && a.namespaceURI) {
            return 1;
        }
        const left = a.namespaceURI + a.localName;
        const right = b.namespaceURI + b.localName;
        if (left === right) {
            return 0;
        } else if (left < right) {
            return -1;
        } else {
            return 1;
        }
    }
    nsCompare(a, b) {
        const attr1 = a.prefix;
        const attr2 = b.prefix;
        if (attr1 === attr2) {
            return 0;
        }
        return attr1.localeCompare(attr2);
    }
    renderAttrs(node) {
        let i;
        let attr;
        const res = [];
        const attrListToRender = [];
        if (isDomNode.isCommentNode(node)) {
            return this.renderComment(node);
        }
        if (node.attributes) {
            for(i = 0; i < node.attributes.length; ++i){
                attr = node.attributes[i];
                //ignore namespace definition attributes
                if (attr.name.indexOf("xmlns") === 0) {
                    continue;
                }
                attrListToRender.push(attr);
            }
        }
        attrListToRender.sort(this.attrCompare);
        for (attr of attrListToRender){
            res.push(" ", attr.name, '="', utils.encodeSpecialCharactersInAttribute(attr.value), '"');
        }
        return res.join("");
    }
    /**
     * Create the string of all namespace declarations that should appear on this element
     *
     * @param {Node} node. The node we now render
     * @param {Array} prefixesInScope. The prefixes defined on this node
     *                parents which are a part of the output set
     * @param {String} defaultNs. The current default namespace
     * @return {String}
     * @api private
     */ renderNs(node, prefixesInScope, defaultNs, defaultNsForPrefix, inclusiveNamespacesPrefixList) {
        let i;
        let attr;
        const res = [];
        let newDefaultNs = defaultNs;
        const nsListToRender = [];
        const currNs = node.namespaceURI || "";
        //handle the namespaceof the node itself
        if (node.prefix) {
            if (!isPrefixInScope(prefixesInScope, node.prefix, node.namespaceURI || defaultNsForPrefix[node.prefix])) {
                nsListToRender.push({
                    prefix: node.prefix,
                    namespaceURI: node.namespaceURI || defaultNsForPrefix[node.prefix]
                });
                prefixesInScope.push({
                    prefix: node.prefix,
                    namespaceURI: node.namespaceURI || defaultNsForPrefix[node.prefix]
                });
            }
        } else if (defaultNs !== currNs) {
            //new default ns
            newDefaultNs = node.namespaceURI;
            res.push(' xmlns="', newDefaultNs, '"');
        }
        //handle the attributes namespace
        if (node.attributes) {
            for(i = 0; i < node.attributes.length; ++i){
                attr = node.attributes[i];
                //handle all prefixed attributes that are included in the prefix list and where
                //the prefix is not defined already
                if (attr.prefix && !isPrefixInScope(prefixesInScope, attr.localName, attr.value) && inclusiveNamespacesPrefixList.indexOf(attr.localName) >= 0) {
                    nsListToRender.push({
                        prefix: attr.localName,
                        namespaceURI: attr.value
                    });
                    prefixesInScope.push({
                        prefix: attr.localName,
                        namespaceURI: attr.value
                    });
                }
                //handle all prefixed attributes that are not xmlns definitions and where
                //the prefix is not defined already
                if (attr.prefix && !isPrefixInScope(prefixesInScope, attr.prefix, attr.namespaceURI) && attr.prefix !== "xmlns" && attr.prefix !== "xml") {
                    nsListToRender.push({
                        prefix: attr.prefix,
                        namespaceURI: attr.namespaceURI
                    });
                    prefixesInScope.push({
                        prefix: attr.prefix,
                        namespaceURI: attr.namespaceURI
                    });
                }
            }
        }
        nsListToRender.sort(this.nsCompare);
        //render namespaces
        for (const p of nsListToRender){
            res.push(" xmlns:", p.prefix, '="', p.namespaceURI, '"');
        }
        return {
            rendered: res.join(""),
            newDefaultNs: newDefaultNs
        };
    }
    /**
     * @param node Node
     */ processInner(node, prefixesInScope, defaultNs, defaultNsForPrefix, inclusiveNamespacesPrefixList) {
        if (isDomNode.isCommentNode(node)) {
            return this.renderComment(node);
        }
        if (node.data) {
            return utils.encodeSpecialCharactersInText(node.data);
        }
        if (isDomNode.isElementNode(node)) {
            let i;
            let pfxCopy;
            const ns = this.renderNs(node, prefixesInScope, defaultNs, defaultNsForPrefix, inclusiveNamespacesPrefixList);
            const res = [
                "<",
                node.tagName,
                ns.rendered,
                this.renderAttrs(node),
                ">"
            ];
            for(i = 0; i < node.childNodes.length; ++i){
                pfxCopy = prefixesInScope.slice(0);
                res.push(this.processInner(node.childNodes[i], pfxCopy, ns.newDefaultNs, defaultNsForPrefix, inclusiveNamespacesPrefixList));
            }
            res.push("</", node.tagName, ">");
            return res.join("");
        }
        throw new Error("Unable to exclusive canonicalize node type: ".concat(node.nodeType));
    }
    // Thanks to deoxxa/xml-c14n for comment renderer
    renderComment(node) {
        if (!this.includeComments) {
            return "";
        }
        const isOutsideDocument = node.ownerDocument === node.parentNode;
        let isBeforeDocument = false;
        let isAfterDocument = false;
        if (isOutsideDocument) {
            let nextNode = node;
            let previousNode = node;
            while(nextNode != null){
                if (nextNode === node.ownerDocument.documentElement) {
                    isBeforeDocument = true;
                    break;
                }
                nextNode = nextNode.nextSibling;
            }
            while(previousNode != null){
                if (previousNode === node.ownerDocument.documentElement) {
                    isAfterDocument = true;
                    break;
                }
                previousNode = previousNode.previousSibling;
            }
        }
        const afterDocument = isAfterDocument ? "\n" : "";
        const beforeDocument = isBeforeDocument ? "\n" : "";
        const encodedText = utils.encodeSpecialCharactersInText(node.data);
        return "".concat(afterDocument, "<!--").concat(encodedText, "-->").concat(beforeDocument);
    }
    /**
     * Perform canonicalization of the given element node
     *
     * @api public
     */ process(elem, options) {
        options = options || {};
        let inclusiveNamespacesPrefixList = options.inclusiveNamespacesPrefixList || [];
        const defaultNs = options.defaultNs || "";
        const defaultNsForPrefix = options.defaultNsForPrefix || {};
        const ancestorNamespaces = options.ancestorNamespaces || [];
        /**
         * If the inclusiveNamespacesPrefixList has not been explicitly provided then look it up in CanonicalizationMethod/InclusiveNamespaces
         */ if (!utils.isArrayHasLength(inclusiveNamespacesPrefixList)) {
            const CanonicalizationMethod = utils.findChildren(elem, "CanonicalizationMethod");
            if (CanonicalizationMethod.length !== 0) {
                const inclusiveNamespaces = utils.findChildren(CanonicalizationMethod[0], "InclusiveNamespaces");
                if (inclusiveNamespaces.length !== 0) {
                    inclusiveNamespacesPrefixList = (inclusiveNamespaces[0].getAttribute("PrefixList") || "").split(" ");
                }
            }
        }
        /**
         * If you have a PrefixList then use it and the ancestors to add the necessary namespaces
         */ if (utils.isArrayHasLength(inclusiveNamespacesPrefixList)) {
            inclusiveNamespacesPrefixList.forEach(function(prefix) {
                if ("TURBOPACK compile-time truthy", 1) {
                    ancestorNamespaces.forEach(function(ancestorNamespace) {
                        if (prefix === ancestorNamespace.prefix) {
                            elem.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:".concat(prefix), ancestorNamespace.namespaceURI);
                        }
                    });
                }
            });
        }
        const res = this.processInner(elem, [], defaultNs, defaultNsForPrefix, inclusiveNamespacesPrefixList);
        return res;
    }
    getAlgorithmName() {
        return "http://www.w3.org/2001/10/xml-exc-c14n#";
    }
    constructor(){
        this.includeComments = false;
        this.includeComments = false;
    }
}
exports.ExclusiveCanonicalization = ExclusiveCanonicalization;
class ExclusiveCanonicalizationWithComments extends ExclusiveCanonicalization {
    getAlgorithmName() {
        return "http://www.w3.org/2001/10/xml-exc-c14n#WithComments";
    }
    constructor(){
        super();
        this.includeComments = true;
    }
}
exports.ExclusiveCanonicalizationWithComments = ExclusiveCanonicalizationWithComments; //# sourceMappingURL=exclusive-canonicalization.js.map
}}),
"[project]/node_modules/xml-crypto/lib/enveloped-signature.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.EnvelopedSignature = void 0;
const xpath = __turbopack_context__.r("[project]/node_modules/xml-crypto/node_modules/xpath/xpath.js [app-client] (ecmascript)");
const isDomNode = __turbopack_context__.r("[project]/node_modules/@xmldom/is-dom-node/dist/index.js [app-client] (ecmascript)");
class EnvelopedSignature {
    process(node, options) {
        if (null == options.signatureNode) {
            const signature = xpath.select1("./*[local-name(.)='Signature' and namespace-uri(.)='http://www.w3.org/2000/09/xmldsig#']", node);
            if (isDomNode.isNodeLike(signature) && signature.parentNode) {
                signature.parentNode.removeChild(signature);
            }
            return node;
        }
        const signatureNode = options.signatureNode;
        const expectedSignatureValue = xpath.select1(".//*[local-name(.)='SignatureValue']/text()", signatureNode);
        if (isDomNode.isTextNode(expectedSignatureValue)) {
            const expectedSignatureValueData = expectedSignatureValue.data;
            const signatures = xpath.select(".//*[local-name(.)='Signature' and namespace-uri(.)='http://www.w3.org/2000/09/xmldsig#']", node);
            for (const nodeSignature of Array.isArray(signatures) ? signatures : []){
                const signatureValue = xpath.select1(".//*[local-name(.)='SignatureValue']/text()", nodeSignature);
                if (isDomNode.isTextNode(signatureValue)) {
                    const signatureValueData = signatureValue.data;
                    if (expectedSignatureValueData === signatureValueData) {
                        if (nodeSignature.parentNode) {
                            nodeSignature.parentNode.removeChild(nodeSignature);
                        }
                    }
                }
            }
        }
        return node;
    }
    getAlgorithmName() {
        return "http://www.w3.org/2000/09/xmldsig#enveloped-signature";
    }
    constructor(){
        this.includeComments = false;
        this.includeComments = false;
    }
}
exports.EnvelopedSignature = EnvelopedSignature; //# sourceMappingURL=enveloped-signature.js.map
}}),
"[project]/node_modules/xml-crypto/lib/hash-algorithms.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Sha512 = exports.Sha256 = exports.Sha1 = void 0;
const crypto = __turbopack_context__.r("[project]/examples/sso-example/node_modules/next/dist/compiled/crypto-browserify/index.js [app-client] (ecmascript)");
class Sha1 {
    constructor(){
        this.getHash = function(xml) {
            const shasum = crypto.createHash("sha1");
            shasum.update(xml, "utf8");
            const res = shasum.digest("base64");
            return res;
        };
        this.getAlgorithmName = function() {
            return "http://www.w3.org/2000/09/xmldsig#sha1";
        };
    }
}
exports.Sha1 = Sha1;
class Sha256 {
    constructor(){
        this.getHash = function(xml) {
            const shasum = crypto.createHash("sha256");
            shasum.update(xml, "utf8");
            const res = shasum.digest("base64");
            return res;
        };
        this.getAlgorithmName = function() {
            return "http://www.w3.org/2001/04/xmlenc#sha256";
        };
    }
}
exports.Sha256 = Sha256;
class Sha512 {
    constructor(){
        this.getHash = function(xml) {
            const shasum = crypto.createHash("sha512");
            shasum.update(xml, "utf8");
            const res = shasum.digest("base64");
            return res;
        };
        this.getAlgorithmName = function() {
            return "http://www.w3.org/2001/04/xmlenc#sha512";
        };
    }
}
exports.Sha512 = Sha512; //# sourceMappingURL=hash-algorithms.js.map
}}),
"[project]/node_modules/xml-crypto/lib/types.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
/* eslint-disable no-unused-vars */ // Type definitions for @node-saml/xml-crypto
// Project: https://github.com/node-saml/xml-crypto#readme
// Original definitions by: Eric Heikes <https://github.com/eheikes>
//                          Max Chehab <https://github.com/maxchehab>
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createOptionalCallbackFunction = void 0;
/**
 * ### Sign
 * #### Properties
 * - {@link SignedXml#privateKey} [required]
 * - {@link SignedXml#publicCert} [optional]
 * - {@link SignedXml#signatureAlgorithm} [optional]
 * - {@link SignedXml#canonicalizationAlgorithm} [optional]
 * #### Api
 *  - {@link SignedXml#addReference}
 *  - {@link SignedXml#computeSignature}
 *  - {@link SignedXml#getSignedXml}
 *  - {@link SignedXml#getSignatureXml}
 *  - {@link SignedXml#getOriginalXmlWithIds}
 *
 * ### Verify
 * #### Properties
 * -  {@link SignedXml#publicCert} [optional]
 * #### Api
 *  - {@link SignedXml#loadSignature}
 *  - {@link SignedXml#checkSignature}
 */ function isErrorFirstCallback(possibleCallback) {
    return typeof possibleCallback === "function";
}
/**
 * This function will add a callback version of a sync function.
 *
 * This follows the factory pattern.
 * Just call this function, passing the function that you'd like to add a callback version of.
 */ function createOptionalCallbackFunction(syncVersion) {
    return function() {
        for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
            args[_key] = arguments[_key];
        }
        const possibleCallback = args[args.length - 1];
        if (isErrorFirstCallback(possibleCallback)) {
            try {
                const result = syncVersion(...args.slice(0, -1));
                possibleCallback(null, result);
            } catch (err) {
                possibleCallback(err instanceof Error ? err : new Error("Unknown error"));
            }
        } else {
            return syncVersion(...args);
        }
    };
}
exports.createOptionalCallbackFunction = createOptionalCallbackFunction; //# sourceMappingURL=types.js.map
}}),
"[project]/node_modules/xml-crypto/lib/signature-algorithms.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.HmacSha1 = exports.RsaSha512 = exports.RsaSha256 = exports.RsaSha1 = void 0;
const crypto = __turbopack_context__.r("[project]/examples/sso-example/node_modules/next/dist/compiled/crypto-browserify/index.js [app-client] (ecmascript)");
const types_1 = __turbopack_context__.r("[project]/node_modules/xml-crypto/lib/types.js [app-client] (ecmascript)");
class RsaSha1 {
    constructor(){
        this.getSignature = (0, types_1.createOptionalCallbackFunction)((signedInfo, privateKey)=>{
            const signer = crypto.createSign("RSA-SHA1");
            signer.update(signedInfo);
            const res = signer.sign(privateKey, "base64");
            return res;
        });
        this.verifySignature = (0, types_1.createOptionalCallbackFunction)((material, key, signatureValue)=>{
            const verifier = crypto.createVerify("RSA-SHA1");
            verifier.update(material);
            const res = verifier.verify(key, signatureValue, "base64");
            return res;
        });
        this.getAlgorithmName = ()=>{
            return "http://www.w3.org/2000/09/xmldsig#rsa-sha1";
        };
    }
}
exports.RsaSha1 = RsaSha1;
class RsaSha256 {
    constructor(){
        this.getSignature = (0, types_1.createOptionalCallbackFunction)((signedInfo, privateKey)=>{
            const signer = crypto.createSign("RSA-SHA256");
            signer.update(signedInfo);
            const res = signer.sign(privateKey, "base64");
            return res;
        });
        this.verifySignature = (0, types_1.createOptionalCallbackFunction)((material, key, signatureValue)=>{
            const verifier = crypto.createVerify("RSA-SHA256");
            verifier.update(material);
            const res = verifier.verify(key, signatureValue, "base64");
            return res;
        });
        this.getAlgorithmName = ()=>{
            return "http://www.w3.org/2001/04/xmldsig-more#rsa-sha256";
        };
    }
}
exports.RsaSha256 = RsaSha256;
class RsaSha512 {
    constructor(){
        this.getSignature = (0, types_1.createOptionalCallbackFunction)((signedInfo, privateKey)=>{
            const signer = crypto.createSign("RSA-SHA512");
            signer.update(signedInfo);
            const res = signer.sign(privateKey, "base64");
            return res;
        });
        this.verifySignature = (0, types_1.createOptionalCallbackFunction)((material, key, signatureValue)=>{
            const verifier = crypto.createVerify("RSA-SHA512");
            verifier.update(material);
            const res = verifier.verify(key, signatureValue, "base64");
            return res;
        });
        this.getAlgorithmName = ()=>{
            return "http://www.w3.org/2001/04/xmldsig-more#rsa-sha512";
        };
    }
}
exports.RsaSha512 = RsaSha512;
class HmacSha1 {
    constructor(){
        this.getSignature = (0, types_1.createOptionalCallbackFunction)((signedInfo, privateKey)=>{
            const signer = crypto.createHmac("SHA1", privateKey);
            signer.update(signedInfo);
            const res = signer.digest("base64");
            return res;
        });
        this.verifySignature = (0, types_1.createOptionalCallbackFunction)((material, key, signatureValue)=>{
            const verifier = crypto.createHmac("SHA1", key);
            verifier.update(material);
            const res = verifier.digest("base64");
            return res === signatureValue;
        });
        this.getAlgorithmName = ()=>{
            return "http://www.w3.org/2000/09/xmldsig#hmac-sha1";
        };
    }
}
exports.HmacSha1 = HmacSha1; //# sourceMappingURL=signature-algorithms.js.map
}}),
"[project]/node_modules/xml-crypto/lib/signed-xml.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
var __TURBOPACK__imported__module__$5b$project$5d2f$examples$2f$sso$2d$example$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/examples/sso-example/node_modules/next/dist/compiled/buffer/index.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SignedXml = void 0;
const isDomNode = __turbopack_context__.r("[project]/node_modules/@xmldom/is-dom-node/dist/index.js [app-client] (ecmascript)");
const xmldom = __turbopack_context__.r("[project]/node_modules/@xmldom/xmldom/lib/index.js [app-client] (ecmascript)");
const util_1 = __turbopack_context__.r("[project]/node_modules/util/util.js [app-client] (ecmascript)");
const xpath = __turbopack_context__.r("[project]/node_modules/xml-crypto/node_modules/xpath/xpath.js [app-client] (ecmascript)");
const c14n = __turbopack_context__.r("[project]/node_modules/xml-crypto/lib/c14n-canonicalization.js [app-client] (ecmascript)");
const envelopedSignatures = __turbopack_context__.r("[project]/node_modules/xml-crypto/lib/enveloped-signature.js [app-client] (ecmascript)");
const execC14n = __turbopack_context__.r("[project]/node_modules/xml-crypto/lib/exclusive-canonicalization.js [app-client] (ecmascript)");
const hashAlgorithms = __turbopack_context__.r("[project]/node_modules/xml-crypto/lib/hash-algorithms.js [app-client] (ecmascript)");
const signatureAlgorithms = __turbopack_context__.r("[project]/node_modules/xml-crypto/lib/signature-algorithms.js [app-client] (ecmascript)");
const utils = __turbopack_context__.r("[project]/node_modules/xml-crypto/lib/utils.js [app-client] (ecmascript)");
class SignedXml {
    /**
     * Due to key-confusion issues, it's risky to have both hmac
     * and digital signature algorithms enabled at the same time.
     * This enables HMAC and disables other signing algorithms.
     */ enableHMAC() {
        this.SignatureAlgorithms = {
            "http://www.w3.org/2000/09/xmldsig#hmac-sha1": signatureAlgorithms.HmacSha1
        };
        this.getKeyInfoContent = SignedXml.noop;
    }
    /**
     * Builds the contents of a KeyInfo element as an XML string.
     *
     * For example, if the value of the prefix argument is 'foo', then
     * the resultant XML string will be "<foo:X509Data></foo:X509Data>"
     *
     * @return an XML string representation of the contents of a KeyInfo element, or `null` if no `KeyInfo` element should be included
     */ static getKeyInfoContent(param) {
        let { publicCert, prefix } = param;
        if (publicCert == null) {
            return null;
        }
        prefix = prefix ? "".concat(prefix, ":") : "";
        let x509Certs = "";
        if (__TURBOPACK__imported__module__$5b$project$5d2f$examples$2f$sso$2d$example$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].isBuffer(publicCert)) {
            publicCert = publicCert.toString("latin1");
        }
        let publicCertMatches = [];
        if (typeof publicCert === "string") {
            publicCertMatches = publicCert.match(utils.EXTRACT_X509_CERTS) || [];
        }
        if (publicCertMatches.length > 0) {
            x509Certs = publicCertMatches.map((c)=>"<".concat(prefix, "X509Certificate>").concat(utils.pemToDer(c).toString("base64"), "</").concat(prefix, "X509Certificate>")).join("");
        }
        return "<".concat(prefix, "X509Data>").concat(x509Certs, "</").concat(prefix, "X509Data>");
    }
    /**
     * Returns the value of the signing certificate based on the contents of the
     * specified KeyInfo.
     *
     * @param keyInfo KeyInfo element (@see https://www.w3.org/TR/2008/REC-xmldsig-core-20080610/#sec-X509Data)
     * @return the signing certificate as a string in PEM format
     */ static getCertFromKeyInfo(keyInfo) {
        if (keyInfo != null) {
            const cert = xpath.select1(".//*[local-name(.)='X509Certificate']", keyInfo);
            if (isDomNode.isNodeLike(cert)) {
                var _cert_textContent;
                return utils.derToPem((_cert_textContent = cert.textContent) !== null && _cert_textContent !== void 0 ? _cert_textContent : "", "CERTIFICATE");
            }
        }
        return null;
    }
    checkSignature(xml, callback) {
        if (callback != null && typeof callback !== "function") {
            throw new Error("Last parameter must be a callback function");
        }
        this.signedXml = xml;
        const doc = new xmldom.DOMParser().parseFromString(xml);
        // Reset the references as only references from our re-parsed signedInfo node can be trusted
        this.references = [];
        const unverifiedSignedInfoCanon = this.getCanonSignedInfoXml(doc);
        if (!unverifiedSignedInfoCanon) {
            if (callback) {
                callback(new Error("Canonical signed info cannot be empty"), false);
                return;
            }
            throw new Error("Canonical signed info cannot be empty");
        }
        // unsigned, verify later to keep with consistent callback behavior
        const parsedUnverifiedSignedInfo = new xmldom.DOMParser().parseFromString(unverifiedSignedInfoCanon, "text/xml");
        const unverifiedSignedInfoDoc = parsedUnverifiedSignedInfo.documentElement;
        if (!unverifiedSignedInfoDoc) {
            if (callback) {
                callback(new Error("Could not parse unverifiedSignedInfoCanon into a document"), false);
                return;
            }
            throw new Error("Could not parse unverifiedSignedInfoCanon into a document");
        }
        const references = utils.findChildren(unverifiedSignedInfoDoc, "Reference");
        if (!utils.isArrayHasLength(references)) {
            if (callback) {
                callback(new Error("could not find any Reference elements"), false);
                return;
            }
            throw new Error("could not find any Reference elements");
        }
        // TODO: In a future release we'd like to load the Signature and its References at the same time,
        // however, in the `.loadSignature()` method we don't have the entire document,
        // which we need to to keep the inclusive namespaces
        for (const reference of references){
            this.loadReference(reference);
        }
        /* eslint-disable-next-line deprecation/deprecation */ if (!this.getReferences().every((ref)=>this.validateReference(ref, doc))) {
            /* Trustworthiness can only be determined if SignedInfo's (which holds References' DigestValue(s)
               which were validated at this stage) signature is valid. Execution does not proceed to validate
               signature phase thus each References' DigestValue must be considered to be untrusted (attacker
               might have injected any data with new new references and/or recalculated new DigestValue for
               altered Reference(s)). Returning any content via `signedReferences` would give false sense of
               trustworthiness if/when SignedInfo's (which holds references' DigestValues) signature is not
               valid(ated). Put simply: if one fails, they are all not trustworthy.
            */ this.signedReferences = [];
            this.references.forEach((ref)=>{
                ref.signedReference = undefined;
            });
            // TODO: add this breaking change here later on for even more security: `this.references = [];`
            if (callback) {
                callback(new Error("Could not validate all references"), false);
                return;
            }
            // We return false because some references validated, but not all
            // We should actually be throwing an error here, but that would be a breaking change
            // See https://www.w3.org/TR/xmldsig-core/#sec-CoreValidation
            return false;
        }
        // (Stage B authentication step, show that the `signedInfoCanon` is signed)
        // First find the key & signature algorithm, these should match
        // Stage B: Take the signature algorithm and key and verify the `SignatureValue` against the canonicalized `SignedInfo`
        const signer = this.findSignatureAlgorithm(this.signatureAlgorithm);
        const key = this.getCertFromKeyInfo(this.keyInfo) || this.publicCert || this.privateKey;
        if (key == null) {
            throw new Error("KeyInfo or publicCert or privateKey is required to validate signature");
        }
        // Check the signature verification to know whether to reset signature value or not.
        const sigRes = signer.verifySignature(unverifiedSignedInfoCanon, key, this.signatureValue);
        if (sigRes === true) {
            if (callback) {
                callback(null, true);
            } else {
                return true;
            }
        } else {
            // Ideally, we would start by verifying the `signedInfoCanon` first,
            // but that may cause some breaking changes, so we'll handle that in v7.x.
            // If we were validating `signedInfoCanon` first, we wouldn't have to reset this array.
            this.signedReferences = [];
            this.references.forEach((ref)=>{
                ref.signedReference = undefined;
            });
            // TODO: add this breaking change here later on for even more security: `this.references = [];`
            if (callback) {
                callback(new Error("invalid signature: the signature value ".concat(this.signatureValue, " is incorrect")));
                return; // return early
            } else {
                throw new Error("invalid signature: the signature value ".concat(this.signatureValue, " is incorrect"));
            }
        }
    }
    getCanonSignedInfoXml(doc) {
        if (this.signatureNode == null) {
            throw new Error("No signature found.");
        }
        if (typeof this.canonicalizationAlgorithm !== "string") {
            throw new Error("Missing canonicalizationAlgorithm when trying to get signed info for XML");
        }
        const signedInfo = utils.findChildren(this.signatureNode, "SignedInfo");
        if (signedInfo.length === 0) {
            throw new Error("could not find SignedInfo element in the message");
        }
        if (signedInfo.length > 1) {
            throw new Error("could not get canonicalized signed info for a signature that contains multiple SignedInfo nodes");
        }
        if (this.canonicalizationAlgorithm === "http://www.w3.org/TR/2001/REC-xml-c14n-20010315" || this.canonicalizationAlgorithm === "http://www.w3.org/TR/2001/REC-xml-c14n-20010315#WithComments") {
            if (!doc || typeof doc !== "object") {
                throw new Error("When canonicalization method is non-exclusive, whole xml dom must be provided as an argument");
            }
        }
        /**
         * Search for ancestor namespaces before canonicalization.
         */ const ancestorNamespaces = utils.findAncestorNs(doc, "//*[local-name()='SignedInfo']");
        const c14nOptions = {
            ancestorNamespaces: ancestorNamespaces
        };
        return this.getCanonXml([
            this.canonicalizationAlgorithm
        ], signedInfo[0], c14nOptions);
    }
    getCanonReferenceXml(doc, ref, node) {
        /**
         * Search for ancestor namespaces before canonicalization.
         */ if (Array.isArray(ref.transforms)) {
            ref.ancestorNamespaces = utils.findAncestorNs(doc, ref.xpath, this.namespaceResolver);
        }
        const c14nOptions = {
            inclusiveNamespacesPrefixList: ref.inclusiveNamespacesPrefixList,
            ancestorNamespaces: ref.ancestorNamespaces
        };
        return this.getCanonXml(ref.transforms, node, c14nOptions);
    }
    calculateSignatureValue(doc, callback) {
        const signedInfoCanon = this.getCanonSignedInfoXml(doc);
        const signer = this.findSignatureAlgorithm(this.signatureAlgorithm);
        if (this.privateKey == null) {
            throw new Error("Private key is required to compute signature");
        }
        if (typeof callback === "function") {
            signer.getSignature(signedInfoCanon, this.privateKey, callback);
        } else {
            this.signatureValue = signer.getSignature(signedInfoCanon, this.privateKey);
        }
    }
    findSignatureAlgorithm(name) {
        if (name == null) {
            throw new Error("signatureAlgorithm is required");
        }
        const algo = this.SignatureAlgorithms[name];
        if (algo) {
            return new algo();
        } else {
            throw new Error("signature algorithm '".concat(name, "' is not supported"));
        }
    }
    findCanonicalizationAlgorithm(name) {
        if (name != null) {
            const algo = this.CanonicalizationAlgorithms[name];
            if (algo) {
                return new algo();
            }
        }
        throw new Error("canonicalization algorithm '".concat(name, "' is not supported"));
    }
    findHashAlgorithm(name) {
        const algo = this.HashAlgorithms[name];
        if (algo) {
            return new algo();
        } else {
            throw new Error("hash algorithm '".concat(name, "' is not supported"));
        }
    }
    validateElementAgainstReferences(elemOrXpath, doc) {
        let elem;
        if (typeof elemOrXpath === "string") {
            const firstElem = xpath.select1(elemOrXpath, doc);
            isDomNode.assertIsElementNode(firstElem);
            elem = firstElem;
        } else {
            elem = elemOrXpath;
        }
        /* eslint-disable-next-line deprecation/deprecation */ for (const ref of this.getReferences()){
            var _ref_uri;
            const uri = ((_ref_uri = ref.uri) === null || _ref_uri === void 0 ? void 0 : _ref_uri[0]) === "#" ? ref.uri.substring(1) : ref.uri;
            for (const attr of this.idAttributes){
                const elemId = elem.getAttribute(attr);
                if (uri === elemId) {
                    ref.xpath = "//*[@*[local-name(.)='".concat(attr, "']='").concat(uri, "']");
                    break; // found the correct element, no need to check further
                }
            }
            const canonXml = this.getCanonReferenceXml(doc, ref, elem);
            const hash = this.findHashAlgorithm(ref.digestAlgorithm);
            const digest = hash.getHash(canonXml);
            if (utils.validateDigestValue(digest, ref.digestValue)) {
                return ref;
            }
        }
        throw new Error("No references passed validation");
    }
    validateReference(ref, doc) {
        var _ref_uri;
        const uri = ((_ref_uri = ref.uri) === null || _ref_uri === void 0 ? void 0 : _ref_uri[0]) === "#" ? ref.uri.substring(1) : ref.uri;
        let elem = null;
        if (uri === "") {
            elem = xpath.select1("//*", doc);
        } else if ((uri === null || uri === void 0 ? void 0 : uri.indexOf("'")) !== -1) {
            // xpath injection
            throw new Error("Cannot validate a uri with quotes inside it");
        } else {
            let num_elements_for_id = 0;
            for (const attr of this.idAttributes){
                const tmp_elemXpath = "//*[@*[local-name(.)='".concat(attr, "']='").concat(uri, "']");
                const tmp_elem = xpath.select(tmp_elemXpath, doc);
                if (utils.isArrayHasLength(tmp_elem)) {
                    num_elements_for_id += tmp_elem.length;
                    if (num_elements_for_id > 1) {
                        throw new Error("Cannot validate a document which contains multiple elements with the " + "same value for the ID / Id / Id attributes, in order to prevent " + "signature wrapping attack.");
                    }
                    elem = tmp_elem[0];
                    ref.xpath = tmp_elemXpath;
                }
            }
        }
        ref.getValidatedNode = (0, util_1.deprecate)((xpathSelector)=>{
            xpathSelector = xpathSelector || ref.xpath;
            if (typeof xpathSelector !== "string" || ref.validationError != null) {
                return null;
            }
            const selectedValue = xpath.select1(xpathSelector, doc);
            return isDomNode.isNodeLike(selectedValue) ? selectedValue : null;
        }, "`ref.getValidatedNode()` is deprecated and insecure. Use `ref.signedReference` or `this.getSignedReferences()` instead.");
        if (!isDomNode.isNodeLike(elem)) {
            const validationError = new Error("invalid signature: the signature references an element with uri ".concat(ref.uri, " but could not find such element in the xml"));
            ref.validationError = validationError;
            return false;
        }
        const canonXml = this.getCanonReferenceXml(doc, ref, elem);
        const hash = this.findHashAlgorithm(ref.digestAlgorithm);
        const digest = hash.getHash(canonXml);
        if (!utils.validateDigestValue(digest, ref.digestValue)) {
            const validationError = new Error("invalid signature: for uri ".concat(ref.uri, " calculated digest is ").concat(digest, " but the xml to validate supplies digest ").concat(ref.digestValue));
            ref.validationError = validationError;
            return false;
        }
        // This step can only be done after we have verified the `signedInfo`.
        // We verified that they have same hash,
        // thus the `canonXml` and _only_ the `canonXml` can be trusted.
        // Append this to `signedReferences`.
        this.signedReferences.push(canonXml);
        ref.signedReference = canonXml;
        return true;
    }
    findSignatures(doc) {
        const nodes = xpath.select("//*[local-name(.)='Signature' and namespace-uri(.)='http://www.w3.org/2000/09/xmldsig#']", doc);
        return isDomNode.isArrayOfNodes(nodes) ? nodes : [];
    }
    /**
     * Loads the signature information from the provided XML node or string.
     *
     * @param signatureNode The XML node or string representing the signature.
     */ loadSignature(signatureNode) {
        if (typeof signatureNode === "string") {
            this.signatureNode = signatureNode = new xmldom.DOMParser().parseFromString(signatureNode);
        } else {
            this.signatureNode = signatureNode;
        }
        this.signatureXml = signatureNode.toString();
        const node = xpath.select1(".//*[local-name(.)='CanonicalizationMethod']/@Algorithm", signatureNode);
        if (!isDomNode.isNodeLike(node)) {
            throw new Error("could not find CanonicalizationMethod/@Algorithm element");
        }
        if (isDomNode.isAttributeNode(node)) {
            this.canonicalizationAlgorithm = node.value;
        }
        const signatureAlgorithm = xpath.select1(".//*[local-name(.)='SignatureMethod']/@Algorithm", signatureNode);
        if (isDomNode.isAttributeNode(signatureAlgorithm)) {
            this.signatureAlgorithm = signatureAlgorithm.value;
        }
        const signedInfoNodes = utils.findChildren(this.signatureNode, "SignedInfo");
        if (!utils.isArrayHasLength(signedInfoNodes)) {
            throw new Error("no signed info node found");
        }
        if (signedInfoNodes.length > 1) {
            throw new Error("could not load signature that contains multiple SignedInfo nodes");
        }
        // Try to operate on the c14n version of `signedInfo`. This forces the initial `getReferences()`
        // API call to always return references that are loaded under the canonical `SignedInfo`
        // in the case that the client access the `.references` **before** signature verification.
        // Ensure canonicalization algorithm is exclusive, otherwise we'd need the entire document
        let canonicalizationAlgorithmForSignedInfo = this.canonicalizationAlgorithm;
        if (!canonicalizationAlgorithmForSignedInfo || canonicalizationAlgorithmForSignedInfo === "http://www.w3.org/TR/2001/REC-xml-c14n-20010315" || canonicalizationAlgorithmForSignedInfo === "http://www.w3.org/TR/2001/REC-xml-c14n-20010315#WithComments") {
            canonicalizationAlgorithmForSignedInfo = "http://www.w3.org/2001/10/xml-exc-c14n#";
        }
        const temporaryCanonSignedInfo = this.getCanonXml([
            canonicalizationAlgorithmForSignedInfo
        ], signedInfoNodes[0]);
        const temporaryCanonSignedInfoXml = new xmldom.DOMParser().parseFromString(temporaryCanonSignedInfo, "text/xml");
        const signedInfoDoc = temporaryCanonSignedInfoXml.documentElement;
        this.references = [];
        const references = utils.findChildren(signedInfoDoc, "Reference");
        if (!utils.isArrayHasLength(references)) {
            throw new Error("could not find any Reference elements");
        }
        for (const reference of references){
            this.loadReference(reference);
        }
        const signatureValue = xpath.select1(".//*[local-name(.)='SignatureValue']/text()", signatureNode);
        if (isDomNode.isTextNode(signatureValue)) {
            this.signatureValue = signatureValue.data.replace(/\r?\n/g, "");
        }
        const keyInfo = xpath.select1(".//*[local-name(.)='KeyInfo']", signatureNode);
        if (isDomNode.isNodeLike(keyInfo)) {
            this.keyInfo = keyInfo;
        }
    }
    /**
     * Load the reference xml node to a model
     *
     */ loadReference(refNode) {
        let nodes = utils.findChildren(refNode, "DigestMethod");
        if (nodes.length === 0) {
            throw new Error("could not find DigestMethod in reference ".concat(refNode.toString()));
        }
        const digestAlgoNode = nodes[0];
        const attr = utils.findAttr(digestAlgoNode, "Algorithm");
        if (!attr) {
            throw new Error("could not find Algorithm attribute in node ".concat(digestAlgoNode.toString()));
        }
        const digestAlgo = attr.value;
        nodes = utils.findChildren(refNode, "DigestValue");
        if (nodes.length === 0) {
            throw new Error("could not find DigestValue node in reference ".concat(refNode.toString()));
        }
        if (nodes.length > 1) {
            throw new Error("could not load reference for a node that contains multiple DigestValue nodes: ".concat(refNode.toString()));
        }
        const digestValue = nodes[0].textContent;
        if (!digestValue) {
            throw new Error("could not find the value of DigestValue in ".concat(refNode.toString()));
        }
        const transforms = [];
        let inclusiveNamespacesPrefixList = [];
        nodes = utils.findChildren(refNode, "Transforms");
        if (nodes.length !== 0) {
            const transformsNode = nodes[0];
            const transformsAll = utils.findChildren(transformsNode, "Transform");
            for (const transform of transformsAll){
                const transformAttr = utils.findAttr(transform, "Algorithm");
                if (transformAttr) {
                    transforms.push(transformAttr.value);
                }
            }
            // This is a little strange, we are looking for children of the last child of `transformsNode`
            const inclusiveNamespaces = utils.findChildren(transformsAll[transformsAll.length - 1], "InclusiveNamespaces");
            if (utils.isArrayHasLength(inclusiveNamespaces)) {
                // Should really only be one prefix list, but maybe there's some circumstances where more than one to let's handle it
                inclusiveNamespacesPrefixList = inclusiveNamespaces.flatMap((namespace)=>{
                    var _namespace_getAttribute;
                    return ((_namespace_getAttribute = namespace.getAttribute("PrefixList")) !== null && _namespace_getAttribute !== void 0 ? _namespace_getAttribute : "").split(" ");
                }).filter((value)=>value.length > 0);
            }
        }
        if (utils.isArrayHasLength(this.implicitTransforms)) {
            this.implicitTransforms.forEach(function(t) {
                transforms.push(t);
            });
        }
        /**
         * DigestMethods take an octet stream rather than a node set. If the output of the last transform is a node set, we
         * need to canonicalize the node set to an octet stream using non-exclusive canonicalization. If there are no
         * transforms, we need to canonicalize because URI dereferencing for a same-document reference will return a node-set.
         * @see:
         * https://www.w3.org/TR/xmldsig-core1/#sec-DigestMethod
         * https://www.w3.org/TR/xmldsig-core1/#sec-ReferenceProcessingModel
         * https://www.w3.org/TR/xmldsig-core1/#sec-Same-Document
         */ if (transforms.length === 0 || transforms[transforms.length - 1] === "http://www.w3.org/2000/09/xmldsig#enveloped-signature") {
            transforms.push("http://www.w3.org/TR/2001/REC-xml-c14n-20010315");
        }
        const refUri = isDomNode.isElementNode(refNode) ? refNode.getAttribute("URI") || undefined : undefined;
        this.addReference({
            transforms,
            digestAlgorithm: digestAlgo,
            uri: refUri,
            digestValue,
            inclusiveNamespacesPrefixList,
            isEmptyUri: false
        });
    }
    /**
     * Adds a reference to the signature.
     *
     * @param xpath The XPath expression to select the XML nodes to be referenced.
     * @param transforms An array of transform algorithms to be applied to the selected nodes.
     * @param digestAlgorithm The digest algorithm to use for computing the digest value.
     * @param uri The URI identifier for the reference. If empty, an empty URI will be used.
     * @param digestValue The expected digest value for the reference.
     * @param inclusiveNamespacesPrefixList The prefix list for inclusive namespace canonicalization.
     * @param isEmptyUri Indicates whether the URI is empty. Defaults to `false`.
     */ addReference(param) {
        let { xpath, transforms, digestAlgorithm, uri = "", digestValue, inclusiveNamespacesPrefixList = [], isEmptyUri = false } = param;
        if (digestAlgorithm == null) {
            throw new Error("digestAlgorithm is required");
        }
        if (!utils.isArrayHasLength(transforms)) {
            throw new Error("transforms must contain at least one transform algorithm");
        }
        this.references.push({
            xpath,
            transforms,
            digestAlgorithm,
            uri,
            digestValue,
            inclusiveNamespacesPrefixList,
            isEmptyUri,
            getValidatedNode: ()=>{
                throw new Error("Reference has not been validated yet; Did you call `sig.checkSignature()`?");
            }
        });
    }
    /**
     * Returns the list of references.
     */ getReferences() {
        // TODO: Refactor once `getValidatedNode` is removed
        /* Once we completely remove the deprecated `getValidatedNode()` method,
        we can change this to return a clone to prevent accidental mutations,
        e.g.:
        return [...this.references];
        */ return this.references;
    }
    getSignedReferences() {
        return [
            ...this.signedReferences
        ];
    }
    computeSignature(xml, options, callbackParam) {
        let callback;
        if (typeof options === "function" && callbackParam == null) {
            callback = options;
            options = {};
        } else {
            callback = callbackParam;
            options = options !== null && options !== void 0 ? options : {};
        }
        const doc = new xmldom.DOMParser().parseFromString(xml);
        let xmlNsAttr = "xmlns";
        const signatureAttrs = [];
        let currentPrefix;
        const validActions = [
            "append",
            "prepend",
            "before",
            "after"
        ];
        const prefix = options.prefix;
        const attrs = options.attrs || {};
        const location = options.location || {};
        const existingPrefixes = options.existingPrefixes || {};
        this.namespaceResolver = {
            lookupNamespaceURI: function(prefix) {
                return prefix ? existingPrefixes[prefix] : null;
            }
        };
        // defaults to the root node
        location.reference = location.reference || "/*";
        // defaults to append action
        location.action = location.action || "append";
        if (validActions.indexOf(location.action) === -1) {
            const err = new Error("location.action option has an invalid action: ".concat(location.action, ", must be any of the following values: ").concat(validActions.join(", ")));
            if (!callback) {
                throw err;
            } else {
                callback(err);
                return;
            }
        }
        // automatic insertion of `:`
        if (prefix) {
            xmlNsAttr += ":".concat(prefix);
            currentPrefix = "".concat(prefix, ":");
        } else {
            currentPrefix = "";
        }
        Object.keys(attrs).forEach(function(name) {
            if (name !== "xmlns" && name !== xmlNsAttr) {
                signatureAttrs.push("".concat(name, '="').concat(attrs[name], '"'));
            }
        });
        // add the xml namespace attribute
        signatureAttrs.push("".concat(xmlNsAttr, '="http://www.w3.org/2000/09/xmldsig#"'));
        let signatureXml = "<".concat(currentPrefix, "Signature ").concat(signatureAttrs.join(" "), ">");
        signatureXml += this.createSignedInfo(doc, prefix);
        signatureXml += this.getKeyInfo(prefix);
        signatureXml += "</".concat(currentPrefix, "Signature>");
        this.originalXmlWithIds = doc.toString();
        let existingPrefixesString = "";
        Object.keys(existingPrefixes).forEach(function(key) {
            existingPrefixesString += "xmlns:".concat(key, '="').concat(existingPrefixes[key], '" ');
        });
        // A trick to remove the namespaces that already exist in the xml
        // This only works if the prefix and namespace match with those in the xml
        const dummySignatureWrapper = "<Dummy ".concat(existingPrefixesString, ">").concat(signatureXml, "</Dummy>");
        const nodeXml = new xmldom.DOMParser().parseFromString(dummySignatureWrapper);
        // Because we are using a dummy wrapper hack described above, we know there will be a `firstChild`
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const signatureDoc = nodeXml.documentElement.firstChild;
        const referenceNode = xpath.select1(location.reference, doc);
        if (!isDomNode.isNodeLike(referenceNode)) {
            const err2 = new Error("the following xpath cannot be used because it was not found: ".concat(location.reference));
            if (!callback) {
                throw err2;
            } else {
                callback(err2);
                return;
            }
        }
        if (location.action === "append") {
            referenceNode.appendChild(signatureDoc);
        } else if (location.action === "prepend") {
            referenceNode.insertBefore(signatureDoc, referenceNode.firstChild);
        } else if (location.action === "before") {
            if (referenceNode.parentNode == null) {
                throw new Error("`location.reference` refers to the root node (by default), so we can't insert `before`");
            }
            referenceNode.parentNode.insertBefore(signatureDoc, referenceNode);
        } else if (location.action === "after") {
            if (referenceNode.parentNode == null) {
                throw new Error("`location.reference` refers to the root node (by default), so we can't insert `after`");
            }
            referenceNode.parentNode.insertBefore(signatureDoc, referenceNode.nextSibling);
        }
        this.signatureNode = signatureDoc;
        const signedInfoNodes = utils.findChildren(this.signatureNode, "SignedInfo");
        if (signedInfoNodes.length === 0) {
            const err3 = new Error("could not find SignedInfo element in the message");
            if (!callback) {
                throw err3;
            } else {
                callback(err3);
                return;
            }
        }
        const signedInfoNode = signedInfoNodes[0];
        if (typeof callback === "function") {
            // Asynchronous flow
            this.calculateSignatureValue(doc, (err, signature)=>{
                if (err) {
                    callback(err);
                } else {
                    this.signatureValue = signature || "";
                    signatureDoc.insertBefore(this.createSignature(prefix), signedInfoNode.nextSibling);
                    this.signatureXml = signatureDoc.toString();
                    this.signedXml = doc.toString();
                    callback(null, this);
                }
            });
        } else {
            // Synchronous flow
            this.calculateSignatureValue(doc);
            signatureDoc.insertBefore(this.createSignature(prefix), signedInfoNode.nextSibling);
            this.signatureXml = signatureDoc.toString();
            this.signedXml = doc.toString();
        }
    }
    getKeyInfo(prefix) {
        const currentPrefix = prefix ? "".concat(prefix, ":") : "";
        let keyInfoAttrs = "";
        if (this.keyInfoAttributes) {
            Object.keys(this.keyInfoAttributes).forEach((name)=>{
                keyInfoAttrs += " ".concat(name, '="').concat(this.keyInfoAttributes[name], '"');
            });
        }
        const keyInfoContent = this.getKeyInfoContent({
            publicCert: this.publicCert,
            prefix
        });
        if (keyInfoAttrs || keyInfoContent) {
            return "<".concat(currentPrefix, "KeyInfo").concat(keyInfoAttrs, ">").concat(keyInfoContent, "</").concat(currentPrefix, "KeyInfo>");
        }
        return "";
    }
    /**
     * Generate the Reference nodes (as part of the signature process)
     *
     */ createReferences(doc, prefix) {
        let res = "";
        prefix = prefix || "";
        prefix = prefix ? "".concat(prefix, ":") : prefix;
        /* eslint-disable-next-line deprecation/deprecation */ for (const ref of this.getReferences()){
            var _ref_xpath;
            const nodes = xpath.selectWithResolver((_ref_xpath = ref.xpath) !== null && _ref_xpath !== void 0 ? _ref_xpath : "", doc, this.namespaceResolver);
            if (!utils.isArrayHasLength(nodes)) {
                throw new Error("the following xpath cannot be signed because it was not found: ".concat(ref.xpath));
            }
            for (const node of nodes){
                if (ref.isEmptyUri) {
                    res += "<".concat(prefix, 'Reference URI="">');
                } else {
                    const id = this.ensureHasId(node);
                    ref.uri = id;
                    res += "<".concat(prefix, 'Reference URI="#').concat(id, '">');
                }
                res += "<".concat(prefix, "Transforms>");
                for (const trans of ref.transforms || []){
                    const transform = this.findCanonicalizationAlgorithm(trans);
                    res += "<".concat(prefix, 'Transform Algorithm="').concat(transform.getAlgorithmName(), '"');
                    if (utils.isArrayHasLength(ref.inclusiveNamespacesPrefixList)) {
                        res += ">";
                        res += '<InclusiveNamespaces PrefixList="'.concat(ref.inclusiveNamespacesPrefixList.join(" "), '" xmlns="').concat(transform.getAlgorithmName(), '"/>');
                        res += "</".concat(prefix, "Transform>");
                    } else {
                        res += " />";
                    }
                }
                const canonXml = this.getCanonReferenceXml(doc, ref, node);
                const digestAlgorithm = this.findHashAlgorithm(ref.digestAlgorithm);
                res += "</".concat(prefix, "Transforms>") + "<".concat(prefix, 'DigestMethod Algorithm="').concat(digestAlgorithm.getAlgorithmName(), '" />') + "<".concat(prefix, "DigestValue>").concat(digestAlgorithm.getHash(canonXml), "</").concat(prefix, "DigestValue>") + "</".concat(prefix, "Reference>");
            }
        }
        return res;
    }
    getCanonXml(transforms, node) {
        let options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
        var _options_defaultNsForPrefix;
        options.defaultNsForPrefix = (_options_defaultNsForPrefix = options.defaultNsForPrefix) !== null && _options_defaultNsForPrefix !== void 0 ? _options_defaultNsForPrefix : SignedXml.defaultNsForPrefix;
        options.signatureNode = this.signatureNode;
        const canonXml = node.cloneNode(true); // Deep clone
        let transformedXml = canonXml;
        transforms.forEach((transformName)=>{
            if (isDomNode.isNodeLike(transformedXml)) {
                // If, after processing, `transformedNode` is a string, we can't do anymore transforms on it
                const transform = this.findCanonicalizationAlgorithm(transformName);
                transformedXml = transform.process(transformedXml, options);
            }
        //TODO: currently transform.process may return either Node or String value (enveloped transformation returns Node, exclusive-canonicalization returns String).
        //This either needs to be more explicit in the API, or all should return the same.
        //exclusive-canonicalization returns String since it builds the Xml by hand. If it had used xmldom it would incorrectly minimize empty tags
        //to <x/> instead of <x></x> and also incorrectly handle some delicate line break issues.
        //enveloped transformation returns Node since if it would return String consider this case:
        //<x xmlns:p='ns'><p:y/></x>
        //if only y is the node to sign then a string would be <p:y/> without the definition of the p namespace. probably xmldom toString() should have added it.
        });
        return transformedXml.toString();
    }
    /**
     * Ensure an element has Id attribute. If not create it with unique value.
     * Work with both normal and wssecurity Id flavour
     */ ensureHasId(node) {
        let attr;
        if (this.idMode === "wssecurity") {
            attr = utils.findAttr(node, "Id", "http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd");
        } else {
            this.idAttributes.some((idAttribute)=>{
                attr = utils.findAttr(node, idAttribute);
                return !!attr; // This will break the loop as soon as a truthy attr is found.
            });
        }
        if (attr) {
            return attr.value;
        }
        //add the attribute
        const id = "_".concat(this.id++);
        if (this.idMode === "wssecurity") {
            node.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:wsu", "http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd");
            node.setAttributeNS("http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd", "wsu:Id", id);
        } else {
            node.setAttribute("Id", id);
        }
        return id;
    }
    /**
     * Create the SignedInfo element
     *
     */ createSignedInfo(doc, prefix) {
        if (typeof this.canonicalizationAlgorithm !== "string") {
            throw new Error("Missing canonicalizationAlgorithm when trying to create signed info for XML");
        }
        const transform = this.findCanonicalizationAlgorithm(this.canonicalizationAlgorithm);
        const algo = this.findSignatureAlgorithm(this.signatureAlgorithm);
        let currentPrefix;
        currentPrefix = prefix || "";
        currentPrefix = currentPrefix ? "".concat(currentPrefix, ":") : currentPrefix;
        let res = "<".concat(currentPrefix, "SignedInfo>");
        res += "<".concat(currentPrefix, 'CanonicalizationMethod Algorithm="').concat(transform.getAlgorithmName(), '"');
        if (utils.isArrayHasLength(this.inclusiveNamespacesPrefixList)) {
            res += ">";
            res += '<InclusiveNamespaces PrefixList="'.concat(this.inclusiveNamespacesPrefixList.join(" "), '" xmlns="').concat(transform.getAlgorithmName(), '"/>');
            res += "</".concat(currentPrefix, "CanonicalizationMethod>");
        } else {
            res += " />";
        }
        res += "<".concat(currentPrefix, 'SignatureMethod Algorithm="').concat(algo.getAlgorithmName(), '" />');
        res += this.createReferences(doc, prefix);
        res += "</".concat(currentPrefix, "SignedInfo>");
        return res;
    }
    /**
     * Create the Signature element
     *
     */ createSignature(prefix) {
        let xmlNsAttr = "xmlns";
        if (prefix) {
            xmlNsAttr += ":".concat(prefix);
            prefix += ":";
        } else {
            prefix = "";
        }
        const signatureValueXml = "<".concat(prefix, "SignatureValue>").concat(this.signatureValue, "</").concat(prefix, "SignatureValue>");
        //the canonicalization requires to get a valid xml node.
        //we need to wrap the info in a dummy signature since it contains the default namespace.
        const dummySignatureWrapper = "<".concat(prefix, "Signature ").concat(xmlNsAttr, '="http://www.w3.org/2000/09/xmldsig#">').concat(signatureValueXml, "</").concat(prefix, "Signature>");
        const doc = new xmldom.DOMParser().parseFromString(dummySignatureWrapper);
        // Because we are using a dummy wrapper hack described above, we know there will be a `firstChild`
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return doc.documentElement.firstChild;
    }
    /**
     * Returns just the signature part, must be called only after {@link computeSignature}
     *
     * @returns The signature XML.
     */ getSignatureXml() {
        return this.signatureXml;
    }
    /**
     * Returns the original xml with Id attributes added on relevant elements (required for validation), must be called only after {@link computeSignature}
     *
     * @returns The original XML with IDs.
     */ getOriginalXmlWithIds() {
        return this.originalXmlWithIds;
    }
    /**
     * Returns the original xml document with the signature in it, must be called only after {@link computeSignature}
     *
     * @returns The signed XML.
     */ getSignedXml() {
        return this.signedXml;
    }
    /**
     * The SignedXml constructor provides an abstraction for sign and verify xml documents. The object is constructed using
     * @param options {@link SignedXmlOptions}
     */ constructor(options = {}){
        /**
         * One of the supported signature algorithms.
         * @see {@link SignatureAlgorithmType}
         */ this.signatureAlgorithm = undefined;
        /**
         * Rules used to convert an XML document into its canonical form.
         */ this.canonicalizationAlgorithm = undefined;
        /**
         * It specifies a list of namespace prefixes that should be considered "inclusive" during the canonicalization process.
         */ this.inclusiveNamespacesPrefixList = [];
        this.namespaceResolver = {
            lookupNamespaceURI: function() {
                throw new Error("Not implemented");
            }
        };
        this.implicitTransforms = [];
        this.keyInfoAttributes = {};
        this.getKeyInfoContent = SignedXml.getKeyInfoContent;
        this.getCertFromKeyInfo = SignedXml.getCertFromKeyInfo;
        // Internal state
        this.id = 0;
        this.signedXml = "";
        this.signatureXml = "";
        this.signatureNode = null;
        this.signatureValue = "";
        this.originalXmlWithIds = "";
        this.keyInfo = null;
        /**
         * Contains the references that were signed.
         * @see {@link Reference}
         */ this.references = [];
        /**
         * Contains the canonicalized XML of the references that were validly signed.
         *
         * This populates with the canonical XML of the reference only after
         * verifying the signature is cryptographically authentic.
         */ this.signedReferences = [];
        /**
         *  To add a new transformation algorithm create a new class that implements the {@link TransformationAlgorithm} interface, and register it here. More info: {@link https://github.com/node-saml/xml-crypto#customizing-algorithms|Customizing Algorithms}
         */ this.CanonicalizationAlgorithms = {
            "http://www.w3.org/TR/2001/REC-xml-c14n-20010315": c14n.C14nCanonicalization,
            "http://www.w3.org/TR/2001/REC-xml-c14n-20010315#WithComments": c14n.C14nCanonicalizationWithComments,
            "http://www.w3.org/2001/10/xml-exc-c14n#": execC14n.ExclusiveCanonicalization,
            "http://www.w3.org/2001/10/xml-exc-c14n#WithComments": execC14n.ExclusiveCanonicalizationWithComments,
            "http://www.w3.org/2000/09/xmldsig#enveloped-signature": envelopedSignatures.EnvelopedSignature
        };
        // TODO: In v7.x we may consider deprecating sha1
        /**
         * To add a new hash algorithm create a new class that implements the {@link HashAlgorithm} interface, and register it here. More info: {@link https://github.com/node-saml/xml-crypto#customizing-algorithms|Customizing Algorithms}
         */ this.HashAlgorithms = {
            "http://www.w3.org/2000/09/xmldsig#sha1": hashAlgorithms.Sha1,
            "http://www.w3.org/2001/04/xmlenc#sha256": hashAlgorithms.Sha256,
            "http://www.w3.org/2001/04/xmlenc#sha512": hashAlgorithms.Sha512
        };
        // TODO: In v7.x we may consider deprecating sha1
        /**
         * To add a new signature algorithm create a new class that implements the {@link SignatureAlgorithm} interface, and register it here. More info: {@link https://github.com/node-saml/xml-crypto#customizing-algorithms|Customizing Algorithms}
         */ this.SignatureAlgorithms = {
            "http://www.w3.org/2000/09/xmldsig#rsa-sha1": signatureAlgorithms.RsaSha1,
            "http://www.w3.org/2001/04/xmldsig-more#rsa-sha256": signatureAlgorithms.RsaSha256,
            "http://www.w3.org/2001/04/xmldsig-more#rsa-sha512": signatureAlgorithms.RsaSha512
        };
        const { idMode, idAttribute, privateKey, publicCert, signatureAlgorithm, canonicalizationAlgorithm, inclusiveNamespacesPrefixList, implicitTransforms, keyInfoAttributes, getKeyInfoContent, getCertFromKeyInfo } = options;
        // Options
        this.idMode = idMode;
        this.idAttributes = [
            "Id",
            "ID",
            "id"
        ];
        if (idAttribute) {
            this.idAttributes.unshift(idAttribute);
        }
        this.privateKey = privateKey;
        this.publicCert = publicCert;
        this.signatureAlgorithm = signatureAlgorithm !== null && signatureAlgorithm !== void 0 ? signatureAlgorithm : this.signatureAlgorithm;
        this.canonicalizationAlgorithm = canonicalizationAlgorithm;
        if (typeof inclusiveNamespacesPrefixList === "string") {
            this.inclusiveNamespacesPrefixList = inclusiveNamespacesPrefixList.split(" ");
        } else if (utils.isArrayHasLength(inclusiveNamespacesPrefixList)) {
            this.inclusiveNamespacesPrefixList = inclusiveNamespacesPrefixList;
        }
        this.implicitTransforms = implicitTransforms !== null && implicitTransforms !== void 0 ? implicitTransforms : this.implicitTransforms;
        this.keyInfoAttributes = keyInfoAttributes !== null && keyInfoAttributes !== void 0 ? keyInfoAttributes : this.keyInfoAttributes;
        this.getKeyInfoContent = getKeyInfoContent !== null && getKeyInfoContent !== void 0 ? getKeyInfoContent : this.getKeyInfoContent;
        this.getCertFromKeyInfo = getCertFromKeyInfo !== null && getCertFromKeyInfo !== void 0 ? getCertFromKeyInfo : SignedXml.noop;
        this.CanonicalizationAlgorithms;
        this.HashAlgorithms;
        this.SignatureAlgorithms;
    }
}
exports.SignedXml = SignedXml;
SignedXml.defaultNsForPrefix = {
    ds: "http://www.w3.org/2000/09/xmldsig#"
};
SignedXml.noop = ()=>null; //# sourceMappingURL=signed-xml.js.map
}}),
"[project]/node_modules/xml-crypto/lib/index.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
var __createBinding = ("TURBOPACK member replacement", __turbopack_context__.e) && ("TURBOPACK member replacement", __turbopack_context__.e).__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __exportStar = ("TURBOPACK member replacement", __turbopack_context__.e) && ("TURBOPACK member replacement", __turbopack_context__.e).__exportStar || function(m, exports1) {
    for(var p in m)if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports1, p)) __createBinding(exports1, m, p);
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SignedXml = exports.ExclusiveCanonicalizationWithComments = exports.ExclusiveCanonicalization = exports.C14nCanonicalizationWithComments = exports.C14nCanonicalization = void 0;
var c14n_canonicalization_1 = __turbopack_context__.r("[project]/node_modules/xml-crypto/lib/c14n-canonicalization.js [app-client] (ecmascript)");
Object.defineProperty(exports, "C14nCanonicalization", {
    enumerable: true,
    get: function() {
        return c14n_canonicalization_1.C14nCanonicalization;
    }
});
Object.defineProperty(exports, "C14nCanonicalizationWithComments", {
    enumerable: true,
    get: function() {
        return c14n_canonicalization_1.C14nCanonicalizationWithComments;
    }
});
var exclusive_canonicalization_1 = __turbopack_context__.r("[project]/node_modules/xml-crypto/lib/exclusive-canonicalization.js [app-client] (ecmascript)");
Object.defineProperty(exports, "ExclusiveCanonicalization", {
    enumerable: true,
    get: function() {
        return exclusive_canonicalization_1.ExclusiveCanonicalization;
    }
});
Object.defineProperty(exports, "ExclusiveCanonicalizationWithComments", {
    enumerable: true,
    get: function() {
        return exclusive_canonicalization_1.ExclusiveCanonicalizationWithComments;
    }
});
var signed_xml_1 = __turbopack_context__.r("[project]/node_modules/xml-crypto/lib/signed-xml.js [app-client] (ecmascript)");
Object.defineProperty(exports, "SignedXml", {
    enumerable: true,
    get: function() {
        return signed_xml_1.SignedXml;
    }
});
__exportStar(__turbopack_context__.r("[project]/node_modules/xml-crypto/lib/types.js [app-client] (ecmascript)"), exports);
__exportStar(__turbopack_context__.r("[project]/node_modules/xml-crypto/lib/utils.js [app-client] (ecmascript)"), exports); //# sourceMappingURL=index.js.map
}}),
"[project]/node_modules/escape-html/index.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
/*!
 * escape-html
 * Copyright(c) 2012-2013 TJ Holowaychuk
 * Copyright(c) 2015 Andreas Lubbe
 * Copyright(c) 2015 Tiancheng "Timothy" Gu
 * MIT Licensed
 */ /**
 * Module variables.
 * @private
 */ var matchHtmlRegExp = /["'&<>]/;
/**
 * Module exports.
 * @public
 */ module.exports = escapeHtml;
/**
 * Escape special characters in the given string of html.
 *
 * @param  {string} string The string to escape for inserting into HTML
 * @return {string}
 * @public
 */ function escapeHtml(string) {
    var str = '' + string;
    var match = matchHtmlRegExp.exec(str);
    if (!match) {
        return str;
    }
    var escape;
    var html = '';
    var index = 0;
    var lastIndex = 0;
    for(index = match.index; index < str.length; index++){
        switch(str.charCodeAt(index)){
            case 34:
                escape = '&quot;';
                break;
            case 38:
                escape = '&amp;';
                break;
            case 39:
                escape = '&#39;';
                break;
            case 60:
                escape = '&lt;';
                break;
            case 62:
                escape = '&gt;';
                break;
            default:
                continue;
        }
        if (lastIndex !== index) {
            html += str.substring(lastIndex, index);
        }
        lastIndex = index + 1;
        html += escape;
    }
    return lastIndex !== index ? html + str.substring(lastIndex, index) : html;
}
}}),
"[project]/node_modules/@authenio/xml-encryption/lib/templates/encrypted-key.tpl.xml.js [app-client] (ecmascript)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
var escapehtml = __turbopack_context__.r("[project]/node_modules/escape-html/index.js [app-client] (ecmascript)");
module.exports = (param)=>{
    let { contentEncryptionMethod, keyInfo, encryptedContent } = param;
    return '\n<xenc:EncryptedData Type="http://www.w3.org/2001/04/xmlenc#Element" xmlns:xenc="http://www.w3.org/2001/04/xmlenc#">\n  <xenc:EncryptionMethod Algorithm="'.concat(escapehtml(contentEncryptionMethod), '" />\n  ').concat(keyInfo, "\n  <xenc:CipherData>\n    <xenc:CipherValue>").concat(escapehtml(encryptedContent), "</xenc:CipherValue>\n  </xenc:CipherData>\n</xenc:EncryptedData>\n");
};
}}),
"[project]/node_modules/@authenio/xml-encryption/lib/templates/keyinfo.tpl.xml.js [app-client] (ecmascript)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
var escapehtml = __turbopack_context__.r("[project]/node_modules/escape-html/index.js [app-client] (ecmascript)");
module.exports = (param)=>{
    let { encryptionPublicCert, encryptedKey, keyEncryptionMethod } = param;
    return '\n<KeyInfo xmlns="http://www.w3.org/2000/09/xmldsig#">\n  <e:EncryptedKey xmlns:e="http://www.w3.org/2001/04/xmlenc#">\n    <e:EncryptionMethod Algorithm="'.concat(escapehtml(keyEncryptionMethod), '">\n      <DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1" />\n    </e:EncryptionMethod>\n    <KeyInfo>\n      ').concat(encryptionPublicCert, "\n    </KeyInfo>\n    <e:CipherData>\n      <e:CipherValue>").concat(escapehtml(encryptedKey), "</e:CipherValue>\n    </e:CipherData>\n  </e:EncryptedKey>\n</KeyInfo>\n");
};
}}),
"[project]/node_modules/@authenio/xml-encryption/lib/utils.js [app-client] (ecmascript)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
var path = __turbopack_context__.r("[project]/examples/sso-example/node_modules/next/dist/compiled/path-browserify/index.js [app-client] (ecmascript)"), fs = (()=>{
    const e = new Error("Cannot find module 'fs'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
var templates = {
    'encrypted-key': __turbopack_context__.r("[project]/node_modules/@authenio/xml-encryption/lib/templates/encrypted-key.tpl.xml.js [app-client] (ecmascript)"),
    'keyinfo': __turbopack_context__.r("[project]/node_modules/@authenio/xml-encryption/lib/templates/keyinfo.tpl.xml.js [app-client] (ecmascript)")
};
function renderTemplate(file, data) {
    return templates[file](data);
}
function pemToCert(pem) {
    var cert = /-----BEGIN CERTIFICATE-----([^-]*)-----END CERTIFICATE-----/g.exec(pem);
    if (cert.length > 0) {
        return cert[1].replace(/[\n|\r\n]/g, '');
    }
    return null;
}
;
function warnInsecureAlgorithm(algorithm) {
    let enabled = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
    if (enabled) {
        console.warn(algorithm + " is no longer recommended due to security reasons. Please deprecate its use as soon as possible.");
    }
}
module.exports = {
    renderTemplate: renderTemplate,
    pemToCert: pemToCert,
    warnInsecureAlgorithm: warnInsecureAlgorithm
};
}}),
"[project]/node_modules/@authenio/xml-encryption/lib/xmlenc.js [app-client] (ecmascript)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
var __TURBOPACK__imported__module__$5b$project$5d2f$examples$2f$sso$2d$example$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/examples/sso-example/node_modules/next/dist/compiled/buffer/index.js [app-client] (ecmascript)");
var crypto = __turbopack_context__.r("[project]/examples/sso-example/node_modules/next/dist/compiled/crypto-browserify/index.js [app-client] (ecmascript)");
var xmldom = __turbopack_context__.r("[project]/node_modules/@xmldom/xmldom/lib/index.js [app-client] (ecmascript)");
var xpath = __turbopack_context__.r("[project]/node_modules/xpath/xpath.js [app-client] (ecmascript)");
var utils = __turbopack_context__.r("[project]/node_modules/@authenio/xml-encryption/lib/utils.js [app-client] (ecmascript)");
const insecureAlgorithms = [
    //https://www.w3.org/TR/xmlenc-core1/#rsav15note
    'http://www.w3.org/2001/04/xmlenc#rsa-1_5',
    //https://csrc.nist.gov/News/2017/Update-to-Current-Use-and-Deprecation-of-TDEA
    'http://www.w3.org/2001/04/xmlenc#tripledes-cbc'
];
function encryptKeyInfoWithScheme(symmetricKey, options, scheme, callback1) {
    const padding = scheme === 'RSA-OAEP' ? crypto.constants.RSA_PKCS1_OAEP_PADDING : crypto.constants.RSA_PKCS1_PADDING;
    const symmetricKeyBuffer = __TURBOPACK__imported__module__$5b$project$5d2f$examples$2f$sso$2d$example$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].isBuffer(symmetricKey) ? symmetricKey : __TURBOPACK__imported__module__$5b$project$5d2f$examples$2f$sso$2d$example$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from(symmetricKey, 'utf-8');
    try {
        var encrypted = crypto.publicEncrypt({
            key: options.rsa_pub,
            padding: padding
        }, symmetricKeyBuffer);
        var base64EncodedEncryptedKey = encrypted.toString('base64');
        var params = {
            encryptedKey: base64EncodedEncryptedKey,
            encryptionPublicCert: '<X509Data><X509Certificate>' + utils.pemToCert(options.pem.toString()) + '</X509Certificate></X509Data>',
            keyEncryptionMethod: options.keyEncryptionAlgorithm
        };
        var result = utils.renderTemplate('keyinfo', params);
        callback1(null, result);
    } catch (e) {
        callback1(e);
    }
}
function encryptKeyInfo(symmetricKey, options, callback1) {
    if (!options) return callback1(new Error('must provide options'));
    if (!options.rsa_pub) return callback1(new Error('must provide options.rsa_pub with public key RSA'));
    if (!options.pem) return callback1(new Error('must provide options.pem with certificate'));
    if (!options.keyEncryptionAlgorithm) return callback1(new Error('encryption without encrypted key is not supported yet'));
    if (options.disallowEncryptionWithInsecureAlgorithm && insecureAlgorithms.indexOf(options.keyEncryptionAlgorithm) >= 0) {
        return callback1(new Error('encryption algorithm ' + options.keyEncryptionAlgorithm + 'is not secure'));
    }
    switch(options.keyEncryptionAlgorithm){
        case 'http://www.w3.org/2001/04/xmlenc#rsa-oaep-mgf1p':
            return encryptKeyInfoWithScheme(symmetricKey, options, 'RSA-OAEP', callback1);
        case 'http://www.w3.org/2001/04/xmlenc#rsa-1_5':
            utils.warnInsecureAlgorithm(options.keyEncryptionAlgorithm, options.warnInsecureAlgorithm);
            return encryptKeyInfoWithScheme(symmetricKey, options, 'RSAES-PKCS1-V1_5', callback1);
        default:
            return callback1(new Error('encryption key algorithm not supported'));
    }
}
function encrypt(content, options, callback1) {
    if (!options) return callback1(new Error('must provide options'));
    if (!content) return callback1(new Error('must provide content to encrypt'));
    if (!options.rsa_pub) return callback1(new Error('rsa_pub option is mandatory and you should provide a valid RSA public key'));
    if (!options.pem) return callback1(new Error('pem option is mandatory and you should provide a valid x509 certificate encoded as PEM'));
    if (options.disallowEncryptionWithInsecureAlgorithm && (insecureAlgorithms.indexOf(options.keyEncryptionAlgorithm) >= 0 || insecureAlgorithms.indexOf(options.encryptionAlgorithm) >= 0)) {
        return callback1(new Error('encryption algorithm ' + options.keyEncryptionAlgorithm + ' is not secure'));
    }
    options.input_encoding = options.input_encoding || 'utf8';
    function generate_symmetric_key(cb) {
        switch(options.encryptionAlgorithm){
            case 'http://www.w3.org/2001/04/xmlenc#aes128-cbc':
                crypto.randomBytes(16, cb); // generate a symmetric random key 16 bytes length
                break;
            case 'http://www.w3.org/2001/04/xmlenc#aes256-cbc':
                crypto.randomBytes(32, cb); // generate a symmetric random key 32 bytes length
                break;
            case 'http://www.w3.org/2009/xmlenc11#aes128-gcm':
                crypto.randomBytes(16, cb); // generate a symmetric random key 16 bytes length
                break;
            case 'http://www.w3.org/2009/xmlenc11#aes256-gcm':
                crypto.randomBytes(32, cb); // generate a symmetric random key 32 bytes length
                break;
            case 'http://www.w3.org/2001/04/xmlenc#tripledes-cbc':
                utils.warnInsecureAlgorithm(options.encryptionAlgorithm, options.warnInsecureAlgorithm);
                crypto.randomBytes(24, cb); // generate a symmetric random key 24 bytes (192 bits) length
                break;
            default:
                crypto.randomBytes(32, cb); // generate a symmetric random key 32 bytes length
        }
    }
    function encrypt_content(symmetricKey, cb) {
        switch(options.encryptionAlgorithm){
            case 'http://www.w3.org/2001/04/xmlenc#aes128-cbc':
                encryptWithAlgorithm('aes-128-cbc', symmetricKey, 16, content, options.input_encoding, function(err, encryptedContent) {
                    if (err) return cb(err);
                    cb(null, encryptedContent);
                });
                break;
            case 'http://www.w3.org/2001/04/xmlenc#aes256-cbc':
                encryptWithAlgorithm('aes-256-cbc', symmetricKey, 16, content, options.input_encoding, function(err, encryptedContent) {
                    if (err) return cb(err);
                    cb(null, encryptedContent);
                });
                break;
            case 'http://www.w3.org/2009/xmlenc11#aes128-gcm':
                encryptWithAlgorithm('aes-128-gcm', symmetricKey, 12, content, options.input_encoding, function(err, encryptedContent) {
                    if (err) return cb(err);
                    cb(null, encryptedContent);
                });
                break;
            case 'http://www.w3.org/2009/xmlenc11#aes256-gcm':
                encryptWithAlgorithm('aes-256-gcm', symmetricKey, 12, content, options.input_encoding, function(err, encryptedContent) {
                    if (err) return cb(err);
                    cb(null, encryptedContent);
                });
                break;
            case 'http://www.w3.org/2001/04/xmlenc#tripledes-cbc':
                utils.warnInsecureAlgorithm(options.encryptionAlgorithm, options.warnInsecureAlgorithm);
                encryptWithAlgorithm('des-ede3-cbc', symmetricKey, 8, content, options.input_encoding, function(err, encryptedContent) {
                    if (err) return cb(err);
                    cb(null, encryptedContent);
                });
                break;
            default:
                cb(new Error('encryption algorithm not supported'));
        }
    }
    function encrypt_key(symmetricKey, encryptedContent, cb) {
        encryptKeyInfo(symmetricKey, options, function(err, keyInfo) {
            if (err) return cb(err);
            var result = utils.renderTemplate('encrypted-key', {
                encryptedContent: encryptedContent.toString('base64'),
                keyInfo: keyInfo,
                contentEncryptionMethod: options.encryptionAlgorithm
            });
            cb(null, result);
        });
    }
    generate_symmetric_key(function(genKeyError, symmetricKey) {
        if (genKeyError) {
            return callback1(genKeyError);
        }
        encrypt_content(symmetricKey, function(encryptContentError, encryptedContent) {
            if (encryptContentError) {
                return callback1(encryptContentError);
            }
            encrypt_key(symmetricKey, encryptedContent, function(encryptKeyError, result) {
                if (encryptKeyError) {
                    return callback1(encryptKeyError);
                }
                callback1(null, result);
            });
        });
    });
}
function decrypt(xml, options, callback1) {
    if (!options) return callback1(new Error('must provide options'));
    if (!xml) return callback1(new Error('must provide XML to encrypt'));
    if (!options.key) return callback1(new Error('key option is mandatory and you should provide a valid RSA private key'));
    try {
        var doc = typeof xml === 'string' ? new xmldom.DOMParser().parseFromString(xml) : xml;
        var symmetricKey = decryptKeyInfo(doc, options);
        var encryptionMethod = xpath.select("//*[local-name(.)='EncryptedData']/*[local-name(.)='EncryptionMethod']", doc)[0];
        var encryptionAlgorithm = encryptionMethod.getAttribute('Algorithm');
        if (options.disallowDecryptionWithInsecureAlgorithm && insecureAlgorithms.indexOf(encryptionAlgorithm) >= 0) {
            return callback1(new Error('encryption algorithm ' + encryptionAlgorithm + ' is not secure, fail to decrypt'));
        }
        var encryptedContent = xpath.select("//*[local-name(.)='EncryptedData']/*[local-name(.)='CipherData']/*[local-name(.)='CipherValue']", doc)[0];
        var encrypted = __TURBOPACK__imported__module__$5b$project$5d2f$examples$2f$sso$2d$example$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from(encryptedContent.textContent, 'base64');
        switch(encryptionAlgorithm){
            case 'http://www.w3.org/2001/04/xmlenc#aes128-cbc':
                return callback1(null, decryptWithAlgorithm('aes-128-cbc', symmetricKey, 16, encrypted));
            case 'http://www.w3.org/2001/04/xmlenc#aes256-cbc':
                return callback1(null, decryptWithAlgorithm('aes-256-cbc', symmetricKey, 16, encrypted));
            case 'http://www.w3.org/2001/04/xmlenc#tripledes-cbc':
                utils.warnInsecureAlgorithm(encryptionAlgorithm, options.warnInsecureAlgorithm);
                return callback1(null, decryptWithAlgorithm('des-ede3-cbc', symmetricKey, 8, encrypted));
            case 'http://www.w3.org/2009/xmlenc11#aes128-gcm':
                return callback1(null, decryptWithAlgorithm('aes-128-gcm', symmetricKey, 12, encrypted));
            case 'http://www.w3.org/2009/xmlenc11#aes256-gcm':
                return callback1(null, decryptWithAlgorithm('aes-256-gcm', symmetricKey, 12, encrypted));
            default:
                return callback1(new Error('encryption algorithm ' + encryptionAlgorithm + ' not supported'));
        }
    } catch (e) {
        return callback1(e);
    }
}
function decryptKeyInfo(doc, options) {
    if (typeof doc === 'string') doc = new xmldom.DOMParser().parseFromString(doc);
    var keyRetrievalMethodUri;
    var keyInfo = xpath.select("//*[local-name(.)='KeyInfo' and namespace-uri(.)='http://www.w3.org/2000/09/xmldsig#']", doc)[0];
    var keyEncryptionMethod = xpath.select("//*[local-name(.)='KeyInfo']/*[local-name(.)='EncryptedKey']/*[local-name(.)='EncryptionMethod']", doc)[0];
    if (!keyEncryptionMethod) {
        var keyRetrievalMethod = xpath.select("//*[local-name(.)='EncryptedData']/*[local-name(.)='KeyInfo']/*[local-name(.)='RetrievalMethod']", doc)[0];
        keyRetrievalMethodUri = keyRetrievalMethod ? keyRetrievalMethod.getAttribute('URI') : null;
        keyEncryptionMethod = keyRetrievalMethodUri ? xpath.select("//*[local-name(.)='EncryptedKey' and @Id='" + keyRetrievalMethodUri.substring(1) + "']/*[local-name(.)='EncryptionMethod']", doc)[0] : null;
    }
    if (!keyEncryptionMethod) {
        throw new Error('cant find encryption algorithm');
    }
    var keyEncryptionAlgorithm = keyEncryptionMethod.getAttribute('Algorithm');
    if (options.disallowDecryptionWithInsecureAlgorithm && insecureAlgorithms.indexOf(keyEncryptionAlgorithm) >= 0) {
        throw new Error('encryption algorithm ' + keyEncryptionAlgorithm + ' is not secure, fail to decrypt');
    }
    var encryptedKey = keyRetrievalMethodUri ? xpath.select("//*[local-name(.)='EncryptedKey' and @Id='" + keyRetrievalMethodUri.substring(1) + "']/*[local-name(.)='CipherData']/*[local-name(.)='CipherValue']", keyInfo)[0] : xpath.select("//*[local-name(.)='CipherValue']", keyInfo)[0];
    switch(keyEncryptionAlgorithm){
        case 'http://www.w3.org/2001/04/xmlenc#rsa-oaep-mgf1p':
            return decryptKeyInfoWithScheme(encryptedKey, options, 'RSA-OAEP');
        case 'http://www.w3.org/2001/04/xmlenc#rsa-1_5':
            utils.warnInsecureAlgorithm(keyEncryptionAlgorithm, options.warnInsecureAlgorithm);
            return decryptKeyInfoWithScheme(encryptedKey, options, 'RSAES-PKCS1-V1_5');
        default:
            throw new Error('key encryption algorithm ' + keyEncryptionAlgorithm + ' not supported');
    }
}
function decryptKeyInfoWithScheme(encryptedKey, options, scheme) {
    var padding = scheme === 'RSA-OAEP' ? crypto.constants.RSA_PKCS1_OAEP_PADDING : crypto.constants.RSA_PKCS1_PADDING;
    var key = __TURBOPACK__imported__module__$5b$project$5d2f$examples$2f$sso$2d$example$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from(encryptedKey.textContent, 'base64');
    var decrypted = crypto.privateDecrypt({
        key: options.key,
        padding: padding
    }, key);
    return __TURBOPACK__imported__module__$5b$project$5d2f$examples$2f$sso$2d$example$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from(decrypted, 'binary');
}
function encryptWithAlgorithm(algorithm, symmetricKey, ivLength, content, encoding, callback1) {
    // create a random iv for algorithm
    crypto.randomBytes(ivLength, function(err, iv) {
        if (err) return callback1(err);
        var cipher = crypto.createCipheriv(algorithm, symmetricKey, iv);
        // encrypted content
        var encrypted = cipher.update(content, encoding, 'binary') + cipher.final('binary');
        var authTag = algorithm.slice(-3) === "gcm" ? cipher.getAuthTag() : __TURBOPACK__imported__module__$5b$project$5d2f$examples$2f$sso$2d$example$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from("");
        //Format mentioned: https://www.w3.org/TR/xmlenc-core1/#sec-AES-GCM
        var r = __TURBOPACK__imported__module__$5b$project$5d2f$examples$2f$sso$2d$example$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].concat([
            iv,
            __TURBOPACK__imported__module__$5b$project$5d2f$examples$2f$sso$2d$example$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from(encrypted, 'binary'),
            authTag
        ]);
        return callback1(null, r);
    });
}
function decryptWithAlgorithm(algorithm, symmetricKey, ivLength, content) {
    var decipher = crypto.createDecipheriv(algorithm, symmetricKey, content.slice(0, ivLength));
    decipher.setAutoPadding(false);
    if (algorithm.slice(-3) === "gcm") {
        decipher.setAuthTag(content.slice(-16));
        content = content.slice(0, -16);
    }
    var decrypted = decipher.update(content.slice(ivLength), null, 'binary') + decipher.final('binary');
    if (algorithm.slice(-3) !== "gcm") {
        // Remove padding bytes equal to the value of the last byte of the returned data.
        // Padding for GCM not required per: https://www.w3.org/TR/xmlenc-core1/#sec-AES-GCM
        var padding = decrypted.charCodeAt(decrypted.length - 1);
        if (1 <= padding && padding <= ivLength) {
            decrypted = decrypted.substr(0, decrypted.length - padding);
        } else {
            callback(new Error('padding length invalid'));
            return;
        }
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$examples$2f$sso$2d$example$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from(decrypted, 'binary').toString('utf8');
}
exports = module.exports = {
    decrypt: decrypt,
    encrypt: encrypt,
    encryptKeyInfo: encryptKeyInfo,
    decryptKeyInfo: decryptKeyInfo
};
}}),
"[project]/node_modules/@authenio/xml-encryption/lib/index.js [app-client] (ecmascript)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
exports = module.exports = __turbopack_context__.r("[project]/node_modules/@authenio/xml-encryption/lib/xmlenc.js [app-client] (ecmascript)");
}}),
"[project]/node_modules/xml-escape/index.js [app-client] (ecmascript)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
var escape = module.exports = function escape(string, ignore) {
    var pattern;
    if (string === null || string === undefined) return;
    ignore = (ignore || '').replace(/[^&"<>\']/g, '');
    pattern = '([&"<>\'])'.replace(new RegExp('[' + ignore + ']', 'g'), '');
    return string.replace(new RegExp(pattern, 'g'), function(str, item) {
        return escape.map[item];
    });
};
var map = escape.map = {
    '>': '&gt;',
    '<': '&lt;',
    "'": '&apos;',
    '"': '&quot;',
    '&': '&amp;'
};
}}),
"[project]/node_modules/xml/lib/escapeForXML.js [app-client] (ecmascript)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
var XML_CHARACTER_MAP = {
    '&': '&amp;',
    '"': '&quot;',
    "'": '&apos;',
    '<': '&lt;',
    '>': '&gt;'
};
function escapeForXML(string) {
    return string && string.replace ? string.replace(/([&"<>'])/g, function(str, item) {
        return XML_CHARACTER_MAP[item];
    }) : string;
}
module.exports = escapeForXML;
}}),
"[project]/node_modules/xml/lib/xml.js [app-client] (ecmascript)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
var __TURBOPACK__imported__module__$5b$project$5d2f$examples$2f$sso$2d$example$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/examples/sso-example/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var escapeForXML = __turbopack_context__.r("[project]/node_modules/xml/lib/escapeForXML.js [app-client] (ecmascript)");
var Stream = __turbopack_context__.r("[project]/examples/sso-example/node_modules/next/dist/compiled/stream-browserify/index.js [app-client] (ecmascript)").Stream;
var DEFAULT_INDENT = '    ';
function xml(input, options) {
    if (typeof options !== 'object') {
        options = {
            indent: options
        };
    }
    var stream = options.stream ? new Stream() : null, output = "", interrupted = false, indent = !options.indent ? '' : options.indent === true ? DEFAULT_INDENT : options.indent, instant = true;
    function delay(func) {
        if (!instant) {
            func();
        } else {
            __TURBOPACK__imported__module__$5b$project$5d2f$examples$2f$sso$2d$example$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].nextTick(func);
        }
    }
    function append(interrupt, out) {
        if (out !== undefined) {
            output += out;
        }
        if (interrupt && !interrupted) {
            stream = stream || new Stream();
            interrupted = true;
        }
        if (interrupt && interrupted) {
            var data = output;
            delay(function() {
                stream.emit('data', data);
            });
            output = "";
        }
    }
    function add(value, last) {
        format(append, resolve(value, indent, indent ? 1 : 0), last);
    }
    function end() {
        if (stream) {
            var data = output;
            delay(function() {
                stream.emit('data', data);
                stream.emit('end');
                stream.readable = false;
                stream.emit('close');
            });
        }
    }
    function addXmlDeclaration(declaration) {
        var encoding = declaration.encoding || 'UTF-8', attr = {
            version: '1.0',
            encoding: encoding
        };
        if (declaration.standalone) {
            attr.standalone = declaration.standalone;
        }
        add({
            '?xml': {
                _attr: attr
            }
        });
        output = output.replace('/>', '?>');
    }
    // disable delay delayed
    delay(function() {
        instant = false;
    });
    if (options.declaration) {
        addXmlDeclaration(options.declaration);
    }
    if (input && input.forEach) {
        input.forEach(function(value, i) {
            var last;
            if (i + 1 === input.length) last = end;
            add(value, last);
        });
    } else {
        add(input, end);
    }
    if (stream) {
        stream.readable = true;
        return stream;
    }
    return output;
}
function element() {
    var input = Array.prototype.slice.call(arguments), self = {
        _elem: resolve(input)
    };
    self.push = function(input) {
        if (!this.append) {
            throw new Error("not assigned to a parent!");
        }
        var that = this;
        var indent = this._elem.indent;
        format(this.append, resolve(input, indent, this._elem.icount + (indent ? 1 : 0)), function() {
            that.append(true);
        });
    };
    self.close = function(input) {
        if (input !== undefined) {
            this.push(input);
        }
        if (this.end) {
            this.end();
        }
    };
    return self;
}
function create_indent(character, count) {
    return new Array(count || 0).join(character || '');
}
function resolve(data, indent, indent_count) {
    indent_count = indent_count || 0;
    var indent_spaces = create_indent(indent, indent_count);
    var name;
    var values = data;
    var interrupt = false;
    if (typeof data === 'object') {
        var keys = Object.keys(data);
        name = keys[0];
        values = data[name];
        if (values && values._elem) {
            values._elem.name = name;
            values._elem.icount = indent_count;
            values._elem.indent = indent;
            values._elem.indents = indent_spaces;
            values._elem.interrupt = values;
            return values._elem;
        }
    }
    var attributes = [], content = [];
    var isStringContent;
    function get_attributes(obj) {
        var keys = Object.keys(obj);
        keys.forEach(function(key) {
            attributes.push(attribute(key, obj[key]));
        });
    }
    switch(typeof values){
        case 'object':
            if (values === null) break;
            if (values._attr) {
                get_attributes(values._attr);
            }
            if (values._cdata) {
                content.push(('<![CDATA[' + values._cdata).replace(/\]\]>/g, ']]]]><![CDATA[>') + ']]>');
            }
            if (values.forEach) {
                isStringContent = false;
                content.push('');
                values.forEach(function(value) {
                    if (typeof value == 'object') {
                        var _name = Object.keys(value)[0];
                        if (_name == '_attr') {
                            get_attributes(value._attr);
                        } else {
                            content.push(resolve(value, indent, indent_count + 1));
                        }
                    } else {
                        //string
                        content.pop();
                        isStringContent = true;
                        content.push(escapeForXML(value));
                    }
                });
                if (!isStringContent) {
                    content.push('');
                }
            }
            break;
        default:
            //string
            content.push(escapeForXML(values));
    }
    return {
        name: name,
        interrupt: interrupt,
        attributes: attributes,
        content: content,
        icount: indent_count,
        indents: indent_spaces,
        indent: indent
    };
}
function format(append, elem, end) {
    if (typeof elem != 'object') {
        return append(false, elem);
    }
    var len = elem.interrupt ? 1 : elem.content.length;
    function proceed() {
        while(elem.content.length){
            var value = elem.content.shift();
            if (value === undefined) continue;
            if (interrupt(value)) return;
            format(append, value);
        }
        append(false, (len > 1 ? elem.indents : '') + (elem.name ? '</' + elem.name + '>' : '') + (elem.indent && !end ? '\n' : ''));
        if (end) {
            end();
        }
    }
    function interrupt(value) {
        if (value.interrupt) {
            value.interrupt.append = append;
            value.interrupt.end = proceed;
            value.interrupt = false;
            append(true);
            return true;
        }
        return false;
    }
    append(false, elem.indents + (elem.name ? '<' + elem.name : '') + (elem.attributes.length ? ' ' + elem.attributes.join(' ') : '') + (len ? elem.name ? '>' : '' : elem.name ? '/>' : '') + (elem.indent && len > 1 ? '\n' : ''));
    if (!len) {
        return append(false, elem.indent ? '\n' : '');
    }
    if (!interrupt(elem)) {
        proceed();
    }
}
function attribute(key, value) {
    return key + '=' + '"' + escapeForXML(value) + '"';
}
module.exports = xml;
module.exports.element = module.exports.Element = element;
}}),
"[project]/packages/sso/node_modules/fast-xml-parser/src/util.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "getAllMatches": ()=>getAllMatches,
    "getValue": ()=>getValue,
    "isEmptyObject": ()=>isEmptyObject,
    "isExist": ()=>isExist,
    "isName": ()=>isName,
    "merge": ()=>merge,
    "nameRegexp": ()=>nameRegexp
});
'use strict';
const nameStartChar = ':A-Za-z_\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD';
const nameChar = nameStartChar + '\\-.\\d\\u00B7\\u0300-\\u036F\\u203F-\\u2040';
const nameRegexp = '[' + nameStartChar + '][' + nameChar + ']*';
const regexName = new RegExp('^' + nameRegexp + '$');
function getAllMatches(string, regex) {
    const matches = [];
    let match = regex.exec(string);
    while(match){
        const allmatches = [];
        allmatches.startIndex = regex.lastIndex - match[0].length;
        const len = match.length;
        for(let index = 0; index < len; index++){
            allmatches.push(match[index]);
        }
        matches.push(allmatches);
        match = regex.exec(string);
    }
    return matches;
}
const isName = function(string) {
    const match = regexName.exec(string);
    return !(match === null || typeof match === 'undefined');
};
function isExist(v) {
    return typeof v !== 'undefined';
}
function isEmptyObject(obj) {
    return Object.keys(obj).length === 0;
}
function merge(target, a, arrayMode) {
    if (a) {
        const keys = Object.keys(a); // will return an array of own properties
        const len = keys.length; //don't make it inline
        for(let i = 0; i < len; i++){
            if (arrayMode === 'strict') {
                target[keys[i]] = [
                    a[keys[i]]
                ];
            } else {
                target[keys[i]] = a[keys[i]];
            }
        }
    }
}
function getValue(v) {
    if (exports.isExist(v)) {
        return v;
    } else {
        return '';
    }
} // const fakeCall = function(a) {return a;};
 // const fakeCallNoReturn = function() {};
}),
"[project]/packages/sso/node_modules/fast-xml-parser/src/validator.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "validate": ()=>validate
});
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$sso$2f$node_modules$2f$fast$2d$xml$2d$parser$2f$src$2f$util$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/sso/node_modules/fast-xml-parser/src/util.js [app-client] (ecmascript)");
'use strict';
;
const defaultOptions = {
    allowBooleanAttributes: false,
    unpairedTags: []
};
function validate(xmlData, options) {
    options = Object.assign({}, defaultOptions, options);
    //xmlData = xmlData.replace(/(\r\n|\n|\r)/gm,"");//make it single line
    //xmlData = xmlData.replace(/(^\s*<\?xml.*?\?>)/g,"");//Remove XML starting tag
    //xmlData = xmlData.replace(/(<!DOCTYPE[\s\w\"\.\/\-\:]+(\[.*\])*\s*>)/g,"");//Remove DOCTYPE
    const tags = [];
    let tagFound = false;
    //indicates that the root tag has been closed (aka. depth 0 has been reached)
    let reachedRoot = false;
    if (xmlData[0] === '\ufeff') {
        // check for byte order mark (BOM)
        xmlData = xmlData.substr(1);
    }
    for(let i = 0; i < xmlData.length; i++){
        if (xmlData[i] === '<' && xmlData[i + 1] === '?') {
            i += 2;
            i = readPI(xmlData, i);
            if (i.err) return i;
        } else if (xmlData[i] === '<') {
            //starting of tag
            //read until you reach to '>' avoiding any '>' in attribute value
            let tagStartPos = i;
            i++;
            if (xmlData[i] === '!') {
                i = readCommentAndCDATA(xmlData, i);
                continue;
            } else {
                let closingTag = false;
                if (xmlData[i] === '/') {
                    //closing tag
                    closingTag = true;
                    i++;
                }
                //read tagname
                let tagName = '';
                for(; i < xmlData.length && xmlData[i] !== '>' && xmlData[i] !== ' ' && xmlData[i] !== '\t' && xmlData[i] !== '\n' && xmlData[i] !== '\r'; i++){
                    tagName += xmlData[i];
                }
                tagName = tagName.trim();
                //console.log(tagName);
                if (tagName[tagName.length - 1] === '/') {
                    //self closing tag without attributes
                    tagName = tagName.substring(0, tagName.length - 1);
                    //continue;
                    i--;
                }
                if (!validateTagName(tagName)) {
                    let msg;
                    if (tagName.trim().length === 0) {
                        msg = "Invalid space after '<'.";
                    } else {
                        msg = "Tag '" + tagName + "' is an invalid name.";
                    }
                    return getErrorObject('InvalidTag', msg, getLineNumberForPosition(xmlData, i));
                }
                const result = readAttributeStr(xmlData, i);
                if (result === false) {
                    return getErrorObject('InvalidAttr', "Attributes for '" + tagName + "' have open quote.", getLineNumberForPosition(xmlData, i));
                }
                let attrStr = result.value;
                i = result.index;
                if (attrStr[attrStr.length - 1] === '/') {
                    //self closing tag
                    const attrStrStart = i - attrStr.length;
                    attrStr = attrStr.substring(0, attrStr.length - 1);
                    const isValid = validateAttributeString(attrStr, options);
                    if (isValid === true) {
                        tagFound = true;
                    //continue; //text may presents after self closing tag
                    } else {
                        //the result from the nested function returns the position of the error within the attribute
                        //in order to get the 'true' error line, we need to calculate the position where the attribute begins (i - attrStr.length) and then add the position within the attribute
                        //this gives us the absolute index in the entire xml, which we can use to find the line at last
                        return getErrorObject(isValid.err.code, isValid.err.msg, getLineNumberForPosition(xmlData, attrStrStart + isValid.err.line));
                    }
                } else if (closingTag) {
                    if (!result.tagClosed) {
                        return getErrorObject('InvalidTag', "Closing tag '" + tagName + "' doesn't have proper closing.", getLineNumberForPosition(xmlData, i));
                    } else if (attrStr.trim().length > 0) {
                        return getErrorObject('InvalidTag', "Closing tag '" + tagName + "' can't have attributes or invalid starting.", getLineNumberForPosition(xmlData, tagStartPos));
                    } else if (tags.length === 0) {
                        return getErrorObject('InvalidTag', "Closing tag '" + tagName + "' has not been opened.", getLineNumberForPosition(xmlData, tagStartPos));
                    } else {
                        const otg = tags.pop();
                        if (tagName !== otg.tagName) {
                            let openPos = getLineNumberForPosition(xmlData, otg.tagStartPos);
                            return getErrorObject('InvalidTag', "Expected closing tag '" + otg.tagName + "' (opened in line " + openPos.line + ", col " + openPos.col + ") instead of closing tag '" + tagName + "'.", getLineNumberForPosition(xmlData, tagStartPos));
                        }
                        //when there are no more tags, we reached the root level.
                        if (tags.length == 0) {
                            reachedRoot = true;
                        }
                    }
                } else {
                    const isValid = validateAttributeString(attrStr, options);
                    if (isValid !== true) {
                        //the result from the nested function returns the position of the error within the attribute
                        //in order to get the 'true' error line, we need to calculate the position where the attribute begins (i - attrStr.length) and then add the position within the attribute
                        //this gives us the absolute index in the entire xml, which we can use to find the line at last
                        return getErrorObject(isValid.err.code, isValid.err.msg, getLineNumberForPosition(xmlData, i - attrStr.length + isValid.err.line));
                    }
                    //if the root level has been reached before ...
                    if (reachedRoot === true) {
                        return getErrorObject('InvalidXml', 'Multiple possible root nodes found.', getLineNumberForPosition(xmlData, i));
                    } else if (options.unpairedTags.indexOf(tagName) !== -1) {
                    //don't push into stack
                    } else {
                        tags.push({
                            tagName,
                            tagStartPos
                        });
                    }
                    tagFound = true;
                }
                //skip tag text value
                //It may include comments and CDATA value
                for(i++; i < xmlData.length; i++){
                    if (xmlData[i] === '<') {
                        if (xmlData[i + 1] === '!') {
                            //comment or CADATA
                            i++;
                            i = readCommentAndCDATA(xmlData, i);
                            continue;
                        } else if (xmlData[i + 1] === '?') {
                            i = readPI(xmlData, ++i);
                            if (i.err) return i;
                        } else {
                            break;
                        }
                    } else if (xmlData[i] === '&') {
                        const afterAmp = validateAmpersand(xmlData, i);
                        if (afterAmp == -1) return getErrorObject('InvalidChar', "char '&' is not expected.", getLineNumberForPosition(xmlData, i));
                        i = afterAmp;
                    } else {
                        if (reachedRoot === true && !isWhiteSpace(xmlData[i])) {
                            return getErrorObject('InvalidXml', "Extra text at the end", getLineNumberForPosition(xmlData, i));
                        }
                    }
                } //end of reading tag text value
                if (xmlData[i] === '<') {
                    i--;
                }
            }
        } else {
            if (isWhiteSpace(xmlData[i])) {
                continue;
            }
            return getErrorObject('InvalidChar', "char '" + xmlData[i] + "' is not expected.", getLineNumberForPosition(xmlData, i));
        }
    }
    if (!tagFound) {
        return getErrorObject('InvalidXml', 'Start tag expected.', 1);
    } else if (tags.length == 1) {
        return getErrorObject('InvalidTag', "Unclosed tag '" + tags[0].tagName + "'.", getLineNumberForPosition(xmlData, tags[0].tagStartPos));
    } else if (tags.length > 0) {
        return getErrorObject('InvalidXml', "Invalid '" + JSON.stringify(tags.map((t)=>t.tagName), null, 4).replace(/\r?\n/g, '') + "' found.", {
            line: 1,
            col: 1
        });
    }
    return true;
}
;
function isWhiteSpace(char) {
    return char === ' ' || char === '\t' || char === '\n' || char === '\r';
}
/**
 * Read Processing insstructions and skip
 * @param {*} xmlData
 * @param {*} i
 */ function readPI(xmlData, i) {
    const start = i;
    for(; i < xmlData.length; i++){
        if (xmlData[i] == '?' || xmlData[i] == ' ') {
            //tagname
            const tagname = xmlData.substr(start, i - start);
            if (i > 5 && tagname === 'xml') {
                return getErrorObject('InvalidXml', 'XML declaration allowed only at the start of the document.', getLineNumberForPosition(xmlData, i));
            } else if (xmlData[i] == '?' && xmlData[i + 1] == '>') {
                //check if valid attribut string
                i++;
                break;
            } else {
                continue;
            }
        }
    }
    return i;
}
function readCommentAndCDATA(xmlData, i) {
    if (xmlData.length > i + 5 && xmlData[i + 1] === '-' && xmlData[i + 2] === '-') {
        //comment
        for(i += 3; i < xmlData.length; i++){
            if (xmlData[i] === '-' && xmlData[i + 1] === '-' && xmlData[i + 2] === '>') {
                i += 2;
                break;
            }
        }
    } else if (xmlData.length > i + 8 && xmlData[i + 1] === 'D' && xmlData[i + 2] === 'O' && xmlData[i + 3] === 'C' && xmlData[i + 4] === 'T' && xmlData[i + 5] === 'Y' && xmlData[i + 6] === 'P' && xmlData[i + 7] === 'E') {
        let angleBracketsCount = 1;
        for(i += 8; i < xmlData.length; i++){
            if (xmlData[i] === '<') {
                angleBracketsCount++;
            } else if (xmlData[i] === '>') {
                angleBracketsCount--;
                if (angleBracketsCount === 0) {
                    break;
                }
            }
        }
    } else if (xmlData.length > i + 9 && xmlData[i + 1] === '[' && xmlData[i + 2] === 'C' && xmlData[i + 3] === 'D' && xmlData[i + 4] === 'A' && xmlData[i + 5] === 'T' && xmlData[i + 6] === 'A' && xmlData[i + 7] === '[') {
        for(i += 8; i < xmlData.length; i++){
            if (xmlData[i] === ']' && xmlData[i + 1] === ']' && xmlData[i + 2] === '>') {
                i += 2;
                break;
            }
        }
    }
    return i;
}
const doubleQuote = '"';
const singleQuote = "'";
/**
 * Keep reading xmlData until '<' is found outside the attribute value.
 * @param {string} xmlData
 * @param {number} i
 */ function readAttributeStr(xmlData, i) {
    let attrStr = '';
    let startChar = '';
    let tagClosed = false;
    for(; i < xmlData.length; i++){
        if (xmlData[i] === doubleQuote || xmlData[i] === singleQuote) {
            if (startChar === '') {
                startChar = xmlData[i];
            } else if (startChar !== xmlData[i]) {
            //if vaue is enclosed with double quote then single quotes are allowed inside the value and vice versa
            } else {
                startChar = '';
            }
        } else if (xmlData[i] === '>') {
            if (startChar === '') {
                tagClosed = true;
                break;
            }
        }
        attrStr += xmlData[i];
    }
    if (startChar !== '') {
        return false;
    }
    return {
        value: attrStr,
        index: i,
        tagClosed: tagClosed
    };
}
/**
 * Select all the attributes whether valid or invalid.
 */ const validAttrStrRegxp = new RegExp('(\\s*)([^\\s=]+)(\\s*=)?(\\s*([\'"])(([\\s\\S])*?)\\5)?', 'g');
//attr, ="sd", a="amit's", a="sd"b="saf", ab  cd=""
function validateAttributeString(attrStr, options) {
    //console.log("start:"+attrStr+":end");
    //if(attrStr.trim().length === 0) return true; //empty string
    const matches = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$sso$2f$node_modules$2f$fast$2d$xml$2d$parser$2f$src$2f$util$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAllMatches"])(attrStr, validAttrStrRegxp);
    const attrNames = {};
    for(let i = 0; i < matches.length; i++){
        if (matches[i][1].length === 0) {
            //nospace before attribute name: a="sd"b="saf"
            return getErrorObject('InvalidAttr', "Attribute '" + matches[i][2] + "' has no space in starting.", getPositionFromMatch(matches[i]));
        } else if (matches[i][3] !== undefined && matches[i][4] === undefined) {
            return getErrorObject('InvalidAttr', "Attribute '" + matches[i][2] + "' is without value.", getPositionFromMatch(matches[i]));
        } else if (matches[i][3] === undefined && !options.allowBooleanAttributes) {
            //independent attribute: ab
            return getErrorObject('InvalidAttr', "boolean attribute '" + matches[i][2] + "' is not allowed.", getPositionFromMatch(matches[i]));
        }
        /* else if(matches[i][6] === undefined){//attribute without value: ab=
                    return { err: { code:"InvalidAttr",msg:"attribute " + matches[i][2] + " has no value assigned."}};
                } */ const attrName = matches[i][2];
        if (!validateAttrName(attrName)) {
            return getErrorObject('InvalidAttr', "Attribute '" + attrName + "' is an invalid name.", getPositionFromMatch(matches[i]));
        }
        if (!attrNames.hasOwnProperty(attrName)) {
            //check for duplicate attribute.
            attrNames[attrName] = 1;
        } else {
            return getErrorObject('InvalidAttr', "Attribute '" + attrName + "' is repeated.", getPositionFromMatch(matches[i]));
        }
    }
    return true;
}
function validateNumberAmpersand(xmlData, i) {
    let re = /\d/;
    if (xmlData[i] === 'x') {
        i++;
        re = /[\da-fA-F]/;
    }
    for(; i < xmlData.length; i++){
        if (xmlData[i] === ';') return i;
        if (!xmlData[i].match(re)) break;
    }
    return -1;
}
function validateAmpersand(xmlData, i) {
    // https://www.w3.org/TR/xml/#dt-charref
    i++;
    if (xmlData[i] === ';') return -1;
    if (xmlData[i] === '#') {
        i++;
        return validateNumberAmpersand(xmlData, i);
    }
    let count = 0;
    for(; i < xmlData.length; i++, count++){
        if (xmlData[i].match(/\w/) && count < 20) continue;
        if (xmlData[i] === ';') break;
        return -1;
    }
    return i;
}
function getErrorObject(code, message, lineNumber) {
    return {
        err: {
            code: code,
            msg: message,
            line: lineNumber.line || lineNumber,
            col: lineNumber.col
        }
    };
}
function validateAttrName(attrName) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$sso$2f$node_modules$2f$fast$2d$xml$2d$parser$2f$src$2f$util$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isName"])(attrName);
}
// const startsWithXML = /^xml/i;
function validateTagName(tagname) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$sso$2f$node_modules$2f$fast$2d$xml$2d$parser$2f$src$2f$util$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isName"])(tagname) /* && !tagname.match(startsWithXML) */ ;
}
//this function returns the line number for the character at the given index
function getLineNumberForPosition(xmlData, index) {
    const lines = xmlData.substring(0, index).split(/\r?\n/);
    return {
        line: lines.length,
        // column number is last line's length + 1, because column numbering starts at 1:
        col: lines[lines.length - 1].length + 1
    };
}
//this function returns the position of the first character of match within attrStr
function getPositionFromMatch(match) {
    return match.startIndex + match[1].length;
}
}),
"[project]/packages/sso/node_modules/fast-xml-parser/src/fxp.js [app-client] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "XMLValidator": ()=>XMLValidator
});
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$sso$2f$node_modules$2f$fast$2d$xml$2d$parser$2f$src$2f$validator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/sso/node_modules/fast-xml-parser/src/validator.js [app-client] (ecmascript)");
'use strict';
;
;
;
const XMLValidator = {
    validate: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$sso$2f$node_modules$2f$fast$2d$xml$2d$parser$2f$src$2f$validator$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validate"]
};
;
}),
"[project]/node_modules/better-sqlite3/lib/util.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
exports.getBooleanOption = (options, key)=>{
    let value = false;
    if (key in options && typeof (value = options[key]) !== 'boolean') {
        throw new TypeError('Expected the "'.concat(key, '" option to be a boolean'));
    }
    return value;
};
exports.cppdb = Symbol();
exports.inspect = Symbol.for('nodejs.util.inspect.custom');
}}),
"[project]/node_modules/better-sqlite3/lib/methods/wrappers.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
const { cppdb } = __turbopack_context__.r("[project]/node_modules/better-sqlite3/lib/util.js [app-client] (ecmascript)");
exports.prepare = function prepare(sql) {
    return this[cppdb].prepare(sql, this, false);
};
exports.exec = function exec(sql) {
    this[cppdb].exec(sql);
    return this;
};
exports.close = function close() {
    this[cppdb].close();
    return this;
};
exports.loadExtension = function loadExtension() {
    for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
        args[_key] = arguments[_key];
    }
    this[cppdb].loadExtension(...args);
    return this;
};
exports.defaultSafeIntegers = function defaultSafeIntegers() {
    for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
        args[_key] = arguments[_key];
    }
    this[cppdb].defaultSafeIntegers(...args);
    return this;
};
exports.unsafeMode = function unsafeMode() {
    for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
        args[_key] = arguments[_key];
    }
    this[cppdb].unsafeMode(...args);
    return this;
};
exports.getters = {
    name: {
        get: function name() {
            return this[cppdb].name;
        },
        enumerable: true
    },
    open: {
        get: function open() {
            return this[cppdb].open;
        },
        enumerable: true
    },
    inTransaction: {
        get: function inTransaction() {
            return this[cppdb].inTransaction;
        },
        enumerable: true
    },
    readonly: {
        get: function readonly() {
            return this[cppdb].readonly;
        },
        enumerable: true
    },
    memory: {
        get: function memory() {
            return this[cppdb].memory;
        },
        enumerable: true
    }
};
}}),
"[project]/node_modules/better-sqlite3/lib/methods/transaction.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
const { cppdb } = __turbopack_context__.r("[project]/node_modules/better-sqlite3/lib/util.js [app-client] (ecmascript)");
const controllers = new WeakMap();
module.exports = function transaction(fn) {
    if (typeof fn !== 'function') throw new TypeError('Expected first argument to be a function');
    const db = this[cppdb];
    const controller = getController(db, this);
    const { apply } = Function.prototype;
    // Each version of the transaction function has these same properties
    const properties = {
        default: {
            value: wrapTransaction(apply, fn, db, controller.default)
        },
        deferred: {
            value: wrapTransaction(apply, fn, db, controller.deferred)
        },
        immediate: {
            value: wrapTransaction(apply, fn, db, controller.immediate)
        },
        exclusive: {
            value: wrapTransaction(apply, fn, db, controller.exclusive)
        },
        database: {
            value: this,
            enumerable: true
        }
    };
    Object.defineProperties(properties.default.value, properties);
    Object.defineProperties(properties.deferred.value, properties);
    Object.defineProperties(properties.immediate.value, properties);
    Object.defineProperties(properties.exclusive.value, properties);
    // Return the default version of the transaction function
    return properties.default.value;
};
// Return the database's cached transaction controller, or create a new one
const getController = (db, self)=>{
    let controller = controllers.get(db);
    if (!controller) {
        const shared = {
            commit: db.prepare('COMMIT', self, false),
            rollback: db.prepare('ROLLBACK', self, false),
            savepoint: db.prepare('SAVEPOINT `\t_bs3.\t`', self, false),
            release: db.prepare('RELEASE `\t_bs3.\t`', self, false),
            rollbackTo: db.prepare('ROLLBACK TO `\t_bs3.\t`', self, false)
        };
        controllers.set(db, controller = {
            default: Object.assign({
                begin: db.prepare('BEGIN', self, false)
            }, shared),
            deferred: Object.assign({
                begin: db.prepare('BEGIN DEFERRED', self, false)
            }, shared),
            immediate: Object.assign({
                begin: db.prepare('BEGIN IMMEDIATE', self, false)
            }, shared),
            exclusive: Object.assign({
                begin: db.prepare('BEGIN EXCLUSIVE', self, false)
            }, shared)
        });
    }
    return controller;
};
// Return a new transaction function by wrapping the given function
const wrapTransaction = (apply, fn, db, param)=>{
    let { begin, commit, rollback, savepoint, release, rollbackTo } = param;
    return function sqliteTransaction() {
        let before, after, undo;
        if (db.inTransaction) {
            before = savepoint;
            after = release;
            undo = rollbackTo;
        } else {
            before = begin;
            after = commit;
            undo = rollback;
        }
        before.run();
        try {
            const result = apply.call(fn, this, arguments);
            if (result && typeof result.then === 'function') {
                throw new TypeError('Transaction function cannot return a promise');
            }
            after.run();
            return result;
        } catch (ex) {
            if (db.inTransaction) {
                undo.run();
                if (undo !== rollback) after.run();
            }
            throw ex;
        }
    };
};
}}),
"[project]/node_modules/better-sqlite3/lib/methods/pragma.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
const { getBooleanOption, cppdb } = __turbopack_context__.r("[project]/node_modules/better-sqlite3/lib/util.js [app-client] (ecmascript)");
module.exports = function pragma(source, options) {
    if (options == null) options = {};
    if (typeof source !== 'string') throw new TypeError('Expected first argument to be a string');
    if (typeof options !== 'object') throw new TypeError('Expected second argument to be an options object');
    const simple = getBooleanOption(options, 'simple');
    const stmt = this[cppdb].prepare("PRAGMA ".concat(source), this, true);
    return simple ? stmt.pluck().get() : stmt.all();
};
}}),
"[project]/node_modules/better-sqlite3/lib/methods/backup.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
const fs = (()=>{
    const e = new Error("Cannot find module 'fs'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
const path = __turbopack_context__.r("[project]/examples/sso-example/node_modules/next/dist/compiled/path-browserify/index.js [app-client] (ecmascript)");
const { promisify } = __turbopack_context__.r("[project]/node_modules/util/util.js [app-client] (ecmascript)");
const { cppdb } = __turbopack_context__.r("[project]/node_modules/better-sqlite3/lib/util.js [app-client] (ecmascript)");
const fsAccess = promisify(fs.access);
module.exports = async function backup(filename, options) {
    if (options == null) options = {};
    // Validate arguments
    if (typeof filename !== 'string') throw new TypeError('Expected first argument to be a string');
    if (typeof options !== 'object') throw new TypeError('Expected second argument to be an options object');
    // Interpret options
    filename = filename.trim();
    const attachedName = 'attached' in options ? options.attached : 'main';
    const handler = 'progress' in options ? options.progress : null;
    // Validate interpreted options
    if (!filename) throw new TypeError('Backup filename cannot be an empty string');
    if (filename === ':memory:') throw new TypeError('Invalid backup filename ":memory:"');
    if (typeof attachedName !== 'string') throw new TypeError('Expected the "attached" option to be a string');
    if (!attachedName) throw new TypeError('The "attached" option cannot be an empty string');
    if (handler != null && typeof handler !== 'function') throw new TypeError('Expected the "progress" option to be a function');
    // Make sure the specified directory exists
    await fsAccess(path.dirname(filename)).catch(()=>{
        throw new TypeError('Cannot save backup because the directory does not exist');
    });
    const isNewFile = await fsAccess(filename).then(()=>false, ()=>true);
    return runBackup(this[cppdb].backup(this, attachedName, filename, isNewFile), handler || null);
};
const runBackup = (backup, handler)=>{
    let rate = 0;
    let useDefault = true;
    return new Promise((resolve, reject)=>{
        setImmediate(function step() {
            try {
                const progress = backup.transfer(rate);
                if (!progress.remainingPages) {
                    backup.close();
                    resolve(progress);
                    return;
                }
                if (useDefault) {
                    useDefault = false;
                    rate = 100;
                }
                if (handler) {
                    const ret = handler(progress);
                    if (ret !== undefined) {
                        if (typeof ret === 'number' && ret === ret) rate = Math.max(0, Math.min(0x7fffffff, Math.round(ret)));
                        else throw new TypeError('Expected progress callback to return a number or undefined');
                    }
                }
                setImmediate(step);
            } catch (err) {
                backup.close();
                reject(err);
            }
        });
    });
};
}}),
"[project]/node_modules/better-sqlite3/lib/methods/serialize.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
const { cppdb } = __turbopack_context__.r("[project]/node_modules/better-sqlite3/lib/util.js [app-client] (ecmascript)");
module.exports = function serialize(options) {
    if (options == null) options = {};
    // Validate arguments
    if (typeof options !== 'object') throw new TypeError('Expected first argument to be an options object');
    // Interpret and validate options
    const attachedName = 'attached' in options ? options.attached : 'main';
    if (typeof attachedName !== 'string') throw new TypeError('Expected the "attached" option to be a string');
    if (!attachedName) throw new TypeError('The "attached" option cannot be an empty string');
    return this[cppdb].serialize(attachedName);
};
}}),
"[project]/node_modules/better-sqlite3/lib/methods/function.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
const { getBooleanOption, cppdb } = __turbopack_context__.r("[project]/node_modules/better-sqlite3/lib/util.js [app-client] (ecmascript)");
module.exports = function defineFunction(name, options, fn) {
    // Apply defaults
    if (options == null) options = {};
    if (typeof options === 'function') {
        fn = options;
        options = {};
    }
    // Validate arguments
    if (typeof name !== 'string') throw new TypeError('Expected first argument to be a string');
    if (typeof fn !== 'function') throw new TypeError('Expected last argument to be a function');
    if (typeof options !== 'object') throw new TypeError('Expected second argument to be an options object');
    if (!name) throw new TypeError('User-defined function name cannot be an empty string');
    // Interpret options
    const safeIntegers = 'safeIntegers' in options ? +getBooleanOption(options, 'safeIntegers') : 2;
    const deterministic = getBooleanOption(options, 'deterministic');
    const directOnly = getBooleanOption(options, 'directOnly');
    const varargs = getBooleanOption(options, 'varargs');
    let argCount = -1;
    // Determine argument count
    if (!varargs) {
        argCount = fn.length;
        if (!Number.isInteger(argCount) || argCount < 0) throw new TypeError('Expected function.length to be a positive integer');
        if (argCount > 100) throw new RangeError('User-defined functions cannot have more than 100 arguments');
    }
    this[cppdb].function(fn, name, argCount, safeIntegers, deterministic, directOnly);
    return this;
};
}}),
"[project]/node_modules/better-sqlite3/lib/methods/aggregate.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
const { getBooleanOption, cppdb } = __turbopack_context__.r("[project]/node_modules/better-sqlite3/lib/util.js [app-client] (ecmascript)");
module.exports = function defineAggregate(name, options) {
    // Validate arguments
    if (typeof name !== 'string') throw new TypeError('Expected first argument to be a string');
    if (typeof options !== 'object' || options === null) throw new TypeError('Expected second argument to be an options object');
    if (!name) throw new TypeError('User-defined function name cannot be an empty string');
    // Interpret options
    const start = 'start' in options ? options.start : null;
    const step = getFunctionOption(options, 'step', true);
    const inverse = getFunctionOption(options, 'inverse', false);
    const result = getFunctionOption(options, 'result', false);
    const safeIntegers = 'safeIntegers' in options ? +getBooleanOption(options, 'safeIntegers') : 2;
    const deterministic = getBooleanOption(options, 'deterministic');
    const directOnly = getBooleanOption(options, 'directOnly');
    const varargs = getBooleanOption(options, 'varargs');
    let argCount = -1;
    // Determine argument count
    if (!varargs) {
        argCount = Math.max(getLength(step), inverse ? getLength(inverse) : 0);
        if (argCount > 0) argCount -= 1;
        if (argCount > 100) throw new RangeError('User-defined functions cannot have more than 100 arguments');
    }
    this[cppdb].aggregate(start, step, inverse, result, name, argCount, safeIntegers, deterministic, directOnly);
    return this;
};
const getFunctionOption = (options, key, required)=>{
    const value = key in options ? options[key] : null;
    if (typeof value === 'function') return value;
    if (value != null) throw new TypeError('Expected the "'.concat(key, '" option to be a function'));
    if (required) throw new TypeError('Missing required option "'.concat(key, '"'));
    return null;
};
const getLength = (param)=>{
    let { length } = param;
    if (Number.isInteger(length) && length >= 0) return length;
    throw new TypeError('Expected function.length to be a positive integer');
};
}}),
"[project]/node_modules/better-sqlite3/lib/methods/table.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
var __TURBOPACK__imported__module__$5b$project$5d2f$examples$2f$sso$2d$example$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/examples/sso-example/node_modules/next/dist/compiled/buffer/index.js [app-client] (ecmascript)");
'use strict';
const { cppdb } = __turbopack_context__.r("[project]/node_modules/better-sqlite3/lib/util.js [app-client] (ecmascript)");
module.exports = function defineTable(name, factory) {
    // Validate arguments
    if (typeof name !== 'string') throw new TypeError('Expected first argument to be a string');
    if (!name) throw new TypeError('Virtual table module name cannot be an empty string');
    // Determine whether the module is eponymous-only or not
    let eponymous = false;
    if (typeof factory === 'object' && factory !== null) {
        eponymous = true;
        factory = defer(parseTableDefinition(factory, 'used', name));
    } else {
        if (typeof factory !== 'function') throw new TypeError('Expected second argument to be a function or a table definition object');
        factory = wrapFactory(factory);
    }
    this[cppdb].table(factory, name, eponymous);
    return this;
};
function wrapFactory(factory) {
    return function virtualTableFactory(moduleName, databaseName, tableName) {
        for(var _len = arguments.length, args = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++){
            args[_key - 3] = arguments[_key];
        }
        const thisObject = {
            module: moduleName,
            database: databaseName,
            table: tableName
        };
        // Generate a new table definition by invoking the factory
        const def = apply.call(factory, thisObject, args);
        if (typeof def !== 'object' || def === null) {
            throw new TypeError('Virtual table module "'.concat(moduleName, '" did not return a table definition object'));
        }
        return parseTableDefinition(def, 'returned', moduleName);
    };
}
function parseTableDefinition(def, verb, moduleName) {
    // Validate required properties
    if (!hasOwnProperty.call(def, 'rows')) {
        throw new TypeError('Virtual table module "'.concat(moduleName, '" ').concat(verb, ' a table definition without a "rows" property'));
    }
    if (!hasOwnProperty.call(def, 'columns')) {
        throw new TypeError('Virtual table module "'.concat(moduleName, '" ').concat(verb, ' a table definition without a "columns" property'));
    }
    // Validate "rows" property
    const rows = def.rows;
    if (typeof rows !== 'function' || Object.getPrototypeOf(rows) !== GeneratorFunctionPrototype) {
        throw new TypeError('Virtual table module "'.concat(moduleName, '" ').concat(verb, ' a table definition with an invalid "rows" property (should be a generator function)'));
    }
    // Validate "columns" property
    let columns = def.columns;
    if (!Array.isArray(columns) || !(columns = [
        ...columns
    ]).every((x)=>typeof x === 'string')) {
        throw new TypeError('Virtual table module "'.concat(moduleName, '" ').concat(verb, ' a table definition with an invalid "columns" property (should be an array of strings)'));
    }
    if (columns.length !== new Set(columns).size) {
        throw new TypeError('Virtual table module "'.concat(moduleName, '" ').concat(verb, " a table definition with duplicate column names"));
    }
    if (!columns.length) {
        throw new RangeError('Virtual table module "'.concat(moduleName, '" ').concat(verb, " a table definition with zero columns"));
    }
    // Validate "parameters" property
    let parameters;
    if (hasOwnProperty.call(def, 'parameters')) {
        parameters = def.parameters;
        if (!Array.isArray(parameters) || !(parameters = [
            ...parameters
        ]).every((x)=>typeof x === 'string')) {
            throw new TypeError('Virtual table module "'.concat(moduleName, '" ').concat(verb, ' a table definition with an invalid "parameters" property (should be an array of strings)'));
        }
    } else {
        parameters = inferParameters(rows);
    }
    if (parameters.length !== new Set(parameters).size) {
        throw new TypeError('Virtual table module "'.concat(moduleName, '" ').concat(verb, " a table definition with duplicate parameter names"));
    }
    if (parameters.length > 32) {
        throw new RangeError('Virtual table module "'.concat(moduleName, '" ').concat(verb, " a table definition with more than the maximum number of 32 parameters"));
    }
    for (const parameter of parameters){
        if (columns.includes(parameter)) {
            throw new TypeError('Virtual table module "'.concat(moduleName, '" ').concat(verb, ' a table definition with column "').concat(parameter, '" which was ambiguously defined as both a column and parameter'));
        }
    }
    // Validate "safeIntegers" option
    let safeIntegers = 2;
    if (hasOwnProperty.call(def, 'safeIntegers')) {
        const bool = def.safeIntegers;
        if (typeof bool !== 'boolean') {
            throw new TypeError('Virtual table module "'.concat(moduleName, '" ').concat(verb, ' a table definition with an invalid "safeIntegers" property (should be a boolean)'));
        }
        safeIntegers = +bool;
    }
    // Validate "directOnly" option
    let directOnly = false;
    if (hasOwnProperty.call(def, 'directOnly')) {
        directOnly = def.directOnly;
        if (typeof directOnly !== 'boolean') {
            throw new TypeError('Virtual table module "'.concat(moduleName, '" ').concat(verb, ' a table definition with an invalid "directOnly" property (should be a boolean)'));
        }
    }
    // Generate SQL for the virtual table definition
    const columnDefinitions = [
        ...parameters.map(identifier).map((str)=>"".concat(str, " HIDDEN")),
        ...columns.map(identifier)
    ];
    return [
        "CREATE TABLE x(".concat(columnDefinitions.join(', '), ");"),
        wrapGenerator(rows, new Map(columns.map((x, i)=>[
                x,
                parameters.length + i
            ])), moduleName),
        parameters,
        safeIntegers,
        directOnly
    ];
}
function wrapGenerator(generator, columnMap, moduleName) {
    return function* virtualTable() {
        for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
            args[_key] = arguments[_key];
        }
        /*
			We must defensively clone any buffers in the arguments, because
			otherwise the generator could mutate one of them, which would cause
			us to return incorrect values for hidden columns, potentially
			corrupting the database.
		 */ const output = args.map((x)=>__TURBOPACK__imported__module__$5b$project$5d2f$examples$2f$sso$2d$example$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].isBuffer(x) ? __TURBOPACK__imported__module__$5b$project$5d2f$examples$2f$sso$2d$example$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].from(x) : x);
        for(let i = 0; i < columnMap.size; ++i){
            output.push(null); // Fill with nulls to prevent gaps in array (v8 optimization)
        }
        for (const row of generator(...args)){
            if (Array.isArray(row)) {
                extractRowArray(row, output, columnMap.size, moduleName);
                yield output;
            } else if (typeof row === 'object' && row !== null) {
                extractRowObject(row, output, columnMap, moduleName);
                yield output;
            } else {
                throw new TypeError('Virtual table module "'.concat(moduleName, "\" yielded something that isn't a valid row object"));
            }
        }
    };
}
function extractRowArray(row, output, columnCount, moduleName) {
    if (row.length !== columnCount) {
        throw new TypeError('Virtual table module "'.concat(moduleName, '" yielded a row with an incorrect number of columns'));
    }
    const offset = output.length - columnCount;
    for(let i = 0; i < columnCount; ++i){
        output[i + offset] = row[i];
    }
}
function extractRowObject(row, output, columnMap, moduleName) {
    let count = 0;
    for (const key of Object.keys(row)){
        const index = columnMap.get(key);
        if (index === undefined) {
            throw new TypeError('Virtual table module "'.concat(moduleName, '" yielded a row with an undeclared column "').concat(key, '"'));
        }
        output[index] = row[key];
        count += 1;
    }
    if (count !== columnMap.size) {
        throw new TypeError('Virtual table module "'.concat(moduleName, '" yielded a row with missing columns'));
    }
}
function inferParameters(param) {
    let { length } = param;
    if (!Number.isInteger(length) || length < 0) {
        throw new TypeError('Expected function.length to be a positive integer');
    }
    const params = [];
    for(let i = 0; i < length; ++i){
        params.push("$".concat(i + 1));
    }
    return params;
}
const { hasOwnProperty } = Object.prototype;
const { apply } = Function.prototype;
const GeneratorFunctionPrototype = Object.getPrototypeOf(function*() {});
const identifier = (str)=>'"'.concat(str.replace(/"/g, '""'), '"');
const defer = (x)=>()=>x;
}}),
"[project]/node_modules/better-sqlite3/lib/methods/inspect.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
const DatabaseInspection = function Database() {};
module.exports = function inspect(depth, opts) {
    return Object.assign(new DatabaseInspection(), this);
};
}}),
"[project]/node_modules/better-sqlite3/lib/sqlite-error.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
const descriptor = {
    value: 'SqliteError',
    writable: true,
    enumerable: false,
    configurable: true
};
function SqliteError(message, code) {
    if (new.target !== SqliteError) {
        return new SqliteError(message, code);
    }
    if (typeof code !== 'string') {
        throw new TypeError('Expected second argument to be a string');
    }
    Error.call(this, message);
    descriptor.value = '' + message;
    Object.defineProperty(this, 'message', descriptor);
    Error.captureStackTrace(this, SqliteError);
    this.code = code;
}
Object.setPrototypeOf(SqliteError, Error);
Object.setPrototypeOf(SqliteError.prototype, Error.prototype);
Object.defineProperty(SqliteError.prototype, 'name', descriptor);
module.exports = SqliteError;
}}),
"[project]/node_modules/better-sqlite3/lib/database.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
var __TURBOPACK__imported__module__$5b$project$5d2f$examples$2f$sso$2d$example$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/examples/sso-example/node_modules/next/dist/compiled/buffer/index.js [app-client] (ecmascript)");
'use strict';
const fs = (()=>{
    const e = new Error("Cannot find module 'fs'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
const path = __turbopack_context__.r("[project]/examples/sso-example/node_modules/next/dist/compiled/path-browserify/index.js [app-client] (ecmascript)");
const util = __turbopack_context__.r("[project]/node_modules/better-sqlite3/lib/util.js [app-client] (ecmascript)");
const SqliteError = __turbopack_context__.r("[project]/node_modules/better-sqlite3/lib/sqlite-error.js [app-client] (ecmascript)");
let DEFAULT_ADDON;
function Database(filenameGiven, options) {
    if (new.target == null) {
        return new Database(filenameGiven, options);
    }
    // Apply defaults
    let buffer;
    if (__TURBOPACK__imported__module__$5b$project$5d2f$examples$2f$sso$2d$example$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$buffer$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Buffer"].isBuffer(filenameGiven)) {
        buffer = filenameGiven;
        filenameGiven = ':memory:';
    }
    if (filenameGiven == null) filenameGiven = '';
    if (options == null) options = {};
    // Validate arguments
    if (typeof filenameGiven !== 'string') throw new TypeError('Expected first argument to be a string');
    if (typeof options !== 'object') throw new TypeError('Expected second argument to be an options object');
    if ('readOnly' in options) throw new TypeError('Misspelled option "readOnly" should be "readonly"');
    if ('memory' in options) throw new TypeError('Option "memory" was removed in v7.0.0 (use ":memory:" filename instead)');
    // Interpret options
    const filename = filenameGiven.trim();
    const anonymous = filename === '' || filename === ':memory:';
    const readonly = util.getBooleanOption(options, 'readonly');
    const fileMustExist = util.getBooleanOption(options, 'fileMustExist');
    const timeout = 'timeout' in options ? options.timeout : 5000;
    const verbose = 'verbose' in options ? options.verbose : null;
    const nativeBinding = 'nativeBinding' in options ? options.nativeBinding : null;
    // Validate interpreted options
    if (readonly && anonymous && !buffer) throw new TypeError('In-memory/temporary databases cannot be readonly');
    if (!Number.isInteger(timeout) || timeout < 0) throw new TypeError('Expected the "timeout" option to be a positive integer');
    if (timeout > 0x7fffffff) throw new RangeError('Option "timeout" cannot be greater than 2147483647');
    if (verbose != null && typeof verbose !== 'function') throw new TypeError('Expected the "verbose" option to be a function');
    if (nativeBinding != null && typeof nativeBinding !== 'string' && typeof nativeBinding !== 'object') throw new TypeError('Expected the "nativeBinding" option to be a string or addon object');
    // Load the native addon
    let addon;
    if (nativeBinding == null) {
        addon = DEFAULT_ADDON || (DEFAULT_ADDON = __turbopack_context__.r("[project]/node_modules/bindings/bindings.js [app-client] (ecmascript)")('better_sqlite3.node'));
    } else if (typeof nativeBinding === 'string') {
        // See <https://webpack.js.org/api/module-variables/#__non_webpack_require__-webpack-specific>
        const requireFunc = typeof __non_webpack_require__ === 'function' ? __non_webpack_require__ : ("TURBOPACK member replacement", __turbopack_context__.t);
        addon = requireFunc(path.resolve(nativeBinding).replace(/(\.node)?$/, '.node'));
    } else {
        // See <https://github.com/WiseLibs/better-sqlite3/issues/972>
        addon = nativeBinding;
    }
    if (!addon.isInitialized) {
        addon.setErrorConstructor(SqliteError);
        addon.isInitialized = true;
    }
    // Make sure the specified directory exists
    if (!anonymous && !fs.existsSync(path.dirname(filename))) {
        throw new TypeError('Cannot open database because the directory does not exist');
    }
    Object.defineProperties(this, {
        [util.cppdb]: {
            value: new addon.Database(filename, filenameGiven, anonymous, readonly, fileMustExist, timeout, verbose || null, buffer || null)
        },
        ...wrappers.getters
    });
}
const wrappers = __turbopack_context__.r("[project]/node_modules/better-sqlite3/lib/methods/wrappers.js [app-client] (ecmascript)");
Database.prototype.prepare = wrappers.prepare;
Database.prototype.transaction = __turbopack_context__.r("[project]/node_modules/better-sqlite3/lib/methods/transaction.js [app-client] (ecmascript)");
Database.prototype.pragma = __turbopack_context__.r("[project]/node_modules/better-sqlite3/lib/methods/pragma.js [app-client] (ecmascript)");
Database.prototype.backup = __turbopack_context__.r("[project]/node_modules/better-sqlite3/lib/methods/backup.js [app-client] (ecmascript)");
Database.prototype.serialize = __turbopack_context__.r("[project]/node_modules/better-sqlite3/lib/methods/serialize.js [app-client] (ecmascript)");
Database.prototype.function = __turbopack_context__.r("[project]/node_modules/better-sqlite3/lib/methods/function.js [app-client] (ecmascript)");
Database.prototype.aggregate = __turbopack_context__.r("[project]/node_modules/better-sqlite3/lib/methods/aggregate.js [app-client] (ecmascript)");
Database.prototype.table = __turbopack_context__.r("[project]/node_modules/better-sqlite3/lib/methods/table.js [app-client] (ecmascript)");
Database.prototype.loadExtension = wrappers.loadExtension;
Database.prototype.exec = wrappers.exec;
Database.prototype.close = wrappers.close;
Database.prototype.defaultSafeIntegers = wrappers.defaultSafeIntegers;
Database.prototype.unsafeMode = wrappers.unsafeMode;
Database.prototype[util.inspect] = __turbopack_context__.r("[project]/node_modules/better-sqlite3/lib/methods/inspect.js [app-client] (ecmascript)");
module.exports = Database;
}}),
"[project]/node_modules/better-sqlite3/lib/index.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { m: module, e: exports } = __turbopack_context__;
{
module.exports = __turbopack_context__.r("[project]/node_modules/better-sqlite3/lib/database.js [app-client] (ecmascript)");
module.exports.SqliteError = __turbopack_context__.r("[project]/node_modules/better-sqlite3/lib/sqlite-error.js [app-client] (ecmascript)");
}}),
"[project]/node_modules/file-uri-to-path/index.js [app-client] (ecmascript)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
/**
 * Module dependencies.
 */ var sep = __turbopack_context__.r("[project]/examples/sso-example/node_modules/next/dist/compiled/path-browserify/index.js [app-client] (ecmascript)").sep || '/';
/**
 * Module exports.
 */ module.exports = fileUriToPath;
/**
 * File URI to Path function.
 *
 * @param {String} uri
 * @return {String} path
 * @api public
 */ function fileUriToPath(uri) {
    if ('string' != typeof uri || uri.length <= 7 || 'file://' != uri.substring(0, 7)) {
        throw new TypeError('must pass in a file:// URI to convert to a file path');
    }
    var rest = decodeURI(uri.substring(7));
    var firstSlash = rest.indexOf('/');
    var host = rest.substring(0, firstSlash);
    var path = rest.substring(firstSlash + 1);
    // 2.  Scheme Definition
    // As a special case, <host> can be the string "localhost" or the empty
    // string; this is interpreted as "the machine from which the URL is
    // being interpreted".
    if ('localhost' == host) host = '';
    if (host) {
        host = sep + sep + host;
    }
    // 3.2  Drives, drive letters, mount points, file system root
    // Drive letters are mapped into the top of a file URI in various ways,
    // depending on the implementation; some applications substitute
    // vertical bar ("|") for the colon after the drive letter, yielding
    // "file:///c|/tmp/test.txt".  In some cases, the colon is left
    // unchanged, as in "file:///c:/tmp/test.txt".  In other cases, the
    // colon is simply omitted, as in "file:///c/tmp/test.txt".
    path = path.replace(/^(.+)\|/, '$1:');
    // for Windows, we need to invert the path separators from what a URI uses
    if (sep == '\\') {
        path = path.replace(/\//g, '\\');
    }
    if (/^.+\:/.test(path)) {
    // has Windows drive at beginning of path
    } else {
        // unix path…
        path = sep + path;
    }
    return host + path;
}
}}),
"[project]/node_modules/bindings/bindings.js [app-client] (ecmascript)": ((__turbopack_context__) => {

var { m: module, e: exports } = __turbopack_context__;
{
/**
 * Module dependencies.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$examples$2f$sso$2d$example$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/examples/sso-example/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var fs = (()=>{
    const e = new Error("Cannot find module 'fs'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})(), path = __turbopack_context__.r("[project]/examples/sso-example/node_modules/next/dist/compiled/path-browserify/index.js [app-client] (ecmascript)"), fileURLToPath = __turbopack_context__.r("[project]/node_modules/file-uri-to-path/index.js [app-client] (ecmascript)"), join = path.join, dirname = path.dirname, exists = fs.accessSync && function(path) {
    try {
        fs.accessSync(path);
    } catch (e) {
        return false;
    }
    return true;
} || fs.existsSync || path.existsSync, defaults = {
    arrow: __TURBOPACK__imported__module__$5b$project$5d2f$examples$2f$sso$2d$example$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NODE_BINDINGS_ARROW || ' → ',
    compiled: __TURBOPACK__imported__module__$5b$project$5d2f$examples$2f$sso$2d$example$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NODE_BINDINGS_COMPILED_DIR || 'compiled',
    platform: __TURBOPACK__imported__module__$5b$project$5d2f$examples$2f$sso$2d$example$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].platform,
    arch: __TURBOPACK__imported__module__$5b$project$5d2f$examples$2f$sso$2d$example$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].arch,
    nodePreGyp: 'node-v' + __TURBOPACK__imported__module__$5b$project$5d2f$examples$2f$sso$2d$example$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].versions.modules + '-' + __TURBOPACK__imported__module__$5b$project$5d2f$examples$2f$sso$2d$example$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].platform + '-' + __TURBOPACK__imported__module__$5b$project$5d2f$examples$2f$sso$2d$example$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].arch,
    version: __TURBOPACK__imported__module__$5b$project$5d2f$examples$2f$sso$2d$example$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].versions.node,
    bindings: 'bindings.node',
    try: [
        // node-gyp's linked version in the "build" dir
        [
            'module_root',
            'build',
            'bindings'
        ],
        // node-waf and gyp_addon (a.k.a node-gyp)
        [
            'module_root',
            'build',
            'Debug',
            'bindings'
        ],
        [
            'module_root',
            'build',
            'Release',
            'bindings'
        ],
        // Debug files, for development (legacy behavior, remove for node v0.9)
        [
            'module_root',
            'out',
            'Debug',
            'bindings'
        ],
        [
            'module_root',
            'Debug',
            'bindings'
        ],
        // Release files, but manually compiled (legacy behavior, remove for node v0.9)
        [
            'module_root',
            'out',
            'Release',
            'bindings'
        ],
        [
            'module_root',
            'Release',
            'bindings'
        ],
        // Legacy from node-waf, node <= 0.4.x
        [
            'module_root',
            'build',
            'default',
            'bindings'
        ],
        // Production "Release" buildtype binary (meh...)
        [
            'module_root',
            'compiled',
            'version',
            'platform',
            'arch',
            'bindings'
        ],
        // node-qbs builds
        [
            'module_root',
            'addon-build',
            'release',
            'install-root',
            'bindings'
        ],
        [
            'module_root',
            'addon-build',
            'debug',
            'install-root',
            'bindings'
        ],
        [
            'module_root',
            'addon-build',
            'default',
            'install-root',
            'bindings'
        ],
        // node-pre-gyp path ./lib/binding/{node_abi}-{platform}-{arch}
        [
            'module_root',
            'lib',
            'binding',
            'nodePreGyp',
            'bindings'
        ]
    ]
};
/**
 * The main `bindings()` function loads the compiled bindings for a given module.
 * It uses V8's Error API to determine the parent filename that this function is
 * being invoked from, which is then used to find the root directory.
 */ function bindings(opts) {
    // Argument surgery
    if (typeof opts == 'string') {
        opts = {
            bindings: opts
        };
    } else if (!opts) {
        opts = {};
    }
    // maps `defaults` onto `opts` object
    Object.keys(defaults).map(function(i) {
        if (!(i in opts)) opts[i] = defaults[i];
    });
    // Get the module root
    if (!opts.module_root) {
        opts.module_root = exports.getRoot(exports.getFileName());
    }
    // Ensure the given bindings name ends with .node
    if (path.extname(opts.bindings) != '.node') {
        opts.bindings += '.node';
    }
    // https://github.com/webpack/webpack/issues/4175#issuecomment-342931035
    var requireFunc = typeof __webpack_require__ === 'function' ? __non_webpack_require__ : ("TURBOPACK member replacement", __turbopack_context__.t);
    var tries = [], i = 0, l = opts.try.length, n, b, err;
    for(; i < l; i++){
        n = join.apply(null, opts.try[i].map(function(p) {
            return opts[p] || p;
        }));
        tries.push(n);
        try {
            b = opts.path ? requireFunc.resolve(n) : requireFunc(n);
            if (!opts.path) {
                b.path = n;
            }
            return b;
        } catch (e) {
            if (e.code !== 'MODULE_NOT_FOUND' && e.code !== 'QUALIFIED_PATH_RESOLUTION_FAILED' && !/not find/i.test(e.message)) {
                throw e;
            }
        }
    }
    err = new Error('Could not locate the bindings file. Tried:\n' + tries.map(function(a) {
        return opts.arrow + a;
    }).join('\n'));
    err.tries = tries;
    throw err;
}
module.exports = exports = bindings;
/**
 * Gets the filename of the JavaScript file that invokes this function.
 * Used to help find the root directory of a module.
 * Optionally accepts an filename argument to skip when searching for the invoking filename
 */ exports.getFileName = function getFileName(calling_file) {
    var origPST = Error.prepareStackTrace, origSTL = Error.stackTraceLimit, dummy = {}, fileName;
    Error.stackTraceLimit = 10;
    Error.prepareStackTrace = function(e, st) {
        for(var i = 0, l = st.length; i < l; i++){
            fileName = st[i].getFileName();
            if (fileName !== ("TURBOPACK compile-time value", "/ROOT/node_modules/bindings/bindings.js")) {
                if (calling_file) {
                    if (fileName !== calling_file) {
                        return;
                    }
                } else {
                    return;
                }
            }
        }
    };
    // run the 'prepareStackTrace' function above
    Error.captureStackTrace(dummy);
    dummy.stack;
    // cleanup
    Error.prepareStackTrace = origPST;
    Error.stackTraceLimit = origSTL;
    // handle filename that starts with "file://"
    var fileSchema = 'file://';
    if (fileName.indexOf(fileSchema) === 0) {
        fileName = fileURLToPath(fileName);
    }
    return fileName;
};
/**
 * Gets the root directory of a module, given an arbitrary filename
 * somewhere in the module tree. The "root directory" is the directory
 * containing the `package.json` file.
 *
 *   In:  /home/nate/node-native-module/lib/index.js
 *   Out: /home/nate/node-native-module
 */ exports.getRoot = function getRoot(file) {
    var dir = dirname(file), prev;
    while(true){
        if (dir === '.') {
            // Avoids an infinite loop in rare cases, like the REPL
            dir = __TURBOPACK__imported__module__$5b$project$5d2f$examples$2f$sso$2d$example$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].cwd();
        }
        if (exists(join(dir, 'package.json')) || exists(join(dir, 'node_modules'))) {
            // Found the 'package.json' file or 'node_modules' dir; we're done
            return dir;
        }
        if (prev === dir) {
            // Got to the top
            throw new Error('Could not find module root given file: "' + file + '". Do you have a `package.json` file? ');
        }
        // Try the parent dir next
        prev = dir;
        dir = join(dir, '..');
    }
};
}}),
}]);

//# sourceMappingURL=_10351c29._.js.map