module.exports = {

"[project]/packages/better-auth/dist/plugins/access/index.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "createAccessControl": ()=>createAccessControl,
    "role": ()=>role
});
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DdzSJf$2d$n$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.DdzSJf-n.mjs [app-ssr] (ecmascript)");
;
function role(statements) {
    return {
        authorize (request, connector = "AND") {
            let success = false;
            for (const [requestedResource, requestedActions] of Object.entries(request)){
                const allowedActions = statements[requestedResource];
                if (!allowedActions) {
                    return {
                        success: false,
                        error: `You are not allowed to access resource: ${requestedResource}`
                    };
                }
                if (Array.isArray(requestedActions)) {
                    success = requestedActions.every((requestedAction)=>allowedActions.includes(requestedAction));
                } else {
                    if (typeof requestedActions === "object") {
                        const actions = requestedActions;
                        if (actions.connector === "OR") {
                            success = actions.actions.some((requestedAction)=>allowedActions.includes(requestedAction));
                        } else {
                            success = actions.actions.every((requestedAction)=>allowedActions.includes(requestedAction));
                        }
                    } else {
                        throw new __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DdzSJf$2d$n$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["B"]("Invalid access control request");
                    }
                }
                if (success && connector === "OR") {
                    return {
                        success
                    };
                }
                if (!success && connector === "AND") {
                    return {
                        success: false,
                        error: `unauthorized to access resource "${requestedResource}"`
                    };
                }
            }
            if (success) {
                return {
                    success
                };
            }
            return {
                success: false,
                error: "Not authorized"
            };
        },
        statements
    };
}
function createAccessControl(s) {
    return {
        newRole (statements) {
            return role(statements);
        },
        statements: s
    };
}
;
}),
"[project]/packages/better-auth/dist/plugins/organization/access/index.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "adminAc": ()=>adminAc,
    "defaultAc": ()=>defaultAc,
    "defaultRoles": ()=>defaultRoles,
    "defaultStatements": ()=>defaultStatements,
    "memberAc": ()=>memberAc,
    "ownerAc": ()=>ownerAc
});
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$plugins$2f$access$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/plugins/access/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DdzSJf$2d$n$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.DdzSJf-n.mjs [app-ssr] (ecmascript)");
;
;
const defaultStatements = {
    organization: [
        "update",
        "delete"
    ],
    member: [
        "create",
        "update",
        "delete"
    ],
    invitation: [
        "create",
        "cancel"
    ],
    team: [
        "create",
        "update",
        "delete"
    ]
};
const defaultAc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$plugins$2f$access$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createAccessControl"])(defaultStatements);
const adminAc = defaultAc.newRole({
    organization: [
        "update"
    ],
    invitation: [
        "create",
        "cancel"
    ],
    member: [
        "create",
        "update",
        "delete"
    ],
    team: [
        "create",
        "update",
        "delete"
    ]
});
const ownerAc = defaultAc.newRole({
    organization: [
        "update",
        "delete"
    ],
    member: [
        "create",
        "update",
        "delete"
    ],
    invitation: [
        "create",
        "cancel"
    ],
    team: [
        "create",
        "update",
        "delete"
    ]
});
const memberAc = defaultAc.newRole({
    organization: [],
    member: [],
    invitation: [],
    team: []
});
const defaultRoles = {
    admin: adminAc,
    owner: ownerAc,
    member: memberAc
};
;
}),
"[project]/packages/better-auth/dist/plugins/two-factor/index.mjs [app-ssr] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "TWO_FACTOR_ERROR_CODES": ()=>TWO_FACTOR_ERROR_CODES,
    "twoFactor": ()=>twoFactor
});
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$B4Qoxdgc$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.B4Qoxdgc.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/node_modules/zod/v4/classic/schemas.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$coerce$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__coerce$3e$__ = __turbopack_context__.i("[project]/packages/better-auth/node_modules/zod/v4/classic/coerce.js [app-ssr] (ecmascript) <export * as coerce>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.D4HhkCZJ.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/better-call/dist/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$cookies$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/cookies/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$n2KFGwjY$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.n2KFGwjY.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$8zoxzg$2d$F$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.8zoxzg-F.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DBGfIDnh$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.DBGfIDnh.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$defu$2f$dist$2f$defu$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/defu/dist/defu.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$crypto$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/crypto/index.mjs [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$crypto$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/crypto/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$base64$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/base64.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hmac$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/hmac.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$binary$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/binary.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hash$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/hash.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$otp$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/otp.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$YwDQhoPc$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.YwDQhoPc.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$Ddw8bVyV$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.Ddw8bVyV.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$random$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/random.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$CW6D9eSx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.CW6D9eSx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-fetch/fetch/dist/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/index.mjs [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hex$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/hex.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$VTXNLFMT$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.VTXNLFMT.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DdzSJf$2d$n$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.DdzSJf-n.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$tB5eU6EY$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.tB5eU6EY.mjs [app-ssr] (ecmascript)");
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
;
;
const TWO_FACTOR_ERROR_CODES = {
    OTP_NOT_ENABLED: "OTP not enabled",
    OTP_HAS_EXPIRED: "OTP has expired",
    TOTP_NOT_ENABLED: "TOTP not enabled",
    TWO_FACTOR_NOT_ENABLED: "Two factor isn't enabled",
    BACKUP_CODES_NOT_ENABLED: "Backup codes aren't enabled",
    INVALID_BACKUP_CODE: "Invalid backup code",
    INVALID_CODE: "Invalid code",
    TOO_MANY_ATTEMPTS_REQUEST_NEW_CODE: "Too many attempts. Please request a new code.",
    INVALID_TWO_FACTOR_COOKIE: "Invalid two factor cookie"
};
const TWO_FACTOR_COOKIE_NAME = "two_factor";
const TRUST_DEVICE_COOKIE_NAME = "trust_device";
async function verifyTwoFactor(ctx) {
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["k"])(ctx);
    if (!session) {
        const cookieName = ctx.context.createAuthCookie(TWO_FACTOR_COOKIE_NAME);
        const twoFactorCookie = await ctx.getSignedCookie(cookieName.name, ctx.context.secret);
        if (!twoFactorCookie) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("UNAUTHORIZED", {
                message: TWO_FACTOR_ERROR_CODES.INVALID_TWO_FACTOR_COOKIE
            });
        }
        const verificationToken = await ctx.context.internalAdapter.findVerificationValue(twoFactorCookie);
        if (!verificationToken) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("UNAUTHORIZED", {
                message: TWO_FACTOR_ERROR_CODES.INVALID_TWO_FACTOR_COOKIE
            });
        }
        const user = await ctx.context.internalAdapter.findUserById(verificationToken.value);
        if (!user) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("UNAUTHORIZED", {
                message: TWO_FACTOR_ERROR_CODES.INVALID_TWO_FACTOR_COOKIE
            });
        }
        const dontRememberMe = await ctx.getSignedCookie(ctx.context.authCookies.dontRememberToken.name, ctx.context.secret);
        return {
            valid: async (ctx2)=>{
                const session2 = await ctx2.context.internalAdapter.createSession(verificationToken.value, ctx2, !!dontRememberMe);
                if (!session2) {
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("INTERNAL_SERVER_ERROR", {
                        message: "failed to create session"
                    });
                }
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$cookies$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setSessionCookie"])(ctx2, {
                    session: session2,
                    user
                });
                if (ctx2.body.trustDevice) {
                    const trustDeviceCookie = ctx2.context.createAuthCookie(TRUST_DEVICE_COOKIE_NAME, {
                        maxAge: 30 * 24 * 60 * 60
                    });
                    const token = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hmac$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createHMAC"])("SHA-256", "base64urlnopad").sign(ctx2.context.secret, `${user.id}!${session2.token}`);
                    await ctx2.setSignedCookie(trustDeviceCookie.name, `${token}!${session2.token}`, ctx2.context.secret, trustDeviceCookie.attributes);
                    ctx2.setCookie(ctx2.context.authCookies.dontRememberToken.name, "", {
                        maxAge: 0
                    });
                    ctx2.setCookie(cookieName.name, "", {
                        maxAge: 0
                    });
                }
                return ctx2.json({
                    token: session2.token,
                    user: {
                        id: user.id,
                        email: user.email,
                        emailVerified: user.emailVerified,
                        name: user.name,
                        image: user.image,
                        createdAt: user.createdAt,
                        updatedAt: user.updatedAt
                    }
                });
            },
            invalid: async (errorKey)=>{
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("UNAUTHORIZED", {
                    message: TWO_FACTOR_ERROR_CODES[errorKey]
                });
            },
            session: {
                session: null,
                user
            },
            key: twoFactorCookie
        };
    }
    return {
        valid: async (ctx2)=>{
            return ctx2.json({
                token: session.session.token,
                user: {
                    id: session.user.id,
                    email: session.user.email,
                    emailVerified: session.user.emailVerified,
                    name: session.user.name,
                    image: session.user.image,
                    createdAt: session.user.createdAt,
                    updatedAt: session.user.updatedAt
                }
            });
        },
        invalid: async ()=>{
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("UNAUTHORIZED", {
                message: TWO_FACTOR_ERROR_CODES.INVALID_TWO_FACTOR_COOKIE
            });
        },
        session,
        key: `${session.user.id}!${session.session.id}`
    };
}
function generateBackupCodesFn(options) {
    return Array.from({
        length: options?.amount ?? 10
    }).fill(null).map(()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$B4Qoxdgc$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["g"])(options?.length ?? 10, "a-z", "0-9", "A-Z")).map((code)=>`${code.slice(0, 5)}-${code.slice(5)}`);
}
async function generateBackupCodes(secret, options) {
    const key = secret;
    const backupCodes = options?.customBackupCodesGenerate ? options.customBackupCodesGenerate() : generateBackupCodesFn(options);
    const encCodes = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$crypto$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["symmetricEncrypt"])({
        data: JSON.stringify(backupCodes),
        key
    });
    return {
        backupCodes,
        encryptedBackupCodes: encCodes
    };
}
async function verifyBackupCode(data, key) {
    const codes = await getBackupCodes(data.backupCodes, key);
    if (!codes) {
        return {
            status: false,
            updated: null
        };
    }
    return {
        status: codes.includes(data.code),
        updated: codes.filter((code)=>code !== data.code)
    };
}
async function getBackupCodes(backupCodes, key) {
    const secret = new TextDecoder("utf-8").decode(new TextEncoder().encode(await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$crypto$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["symmetricDecrypt"])({
        key,
        data: backupCodes
    })));
    const data = JSON.parse(secret);
    const result = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["array"](__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"]()).safeParse(data);
    if (result.success) {
        return result.data;
    }
    return null;
}
const backupCode2fa = (options)=>{
    const twoFactorTable = "twoFactor";
    async function storeBackupCodes(ctx, backupCodes) {
        if (options?.storeBackupCodes === "encrypted") {
            return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$crypto$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["symmetricEncrypt"])({
                key: ctx.context.secret,
                data: backupCodes
            });
        }
        if (typeof options?.storeBackupCodes === "object" && "encrypt" in options?.storeBackupCodes) {
            return await options?.storeBackupCodes.encrypt(backupCodes);
        }
        return backupCodes;
    }
    async function decryptBackupCodes(ctx, backupCodes) {
        if (options?.storeBackupCodes === "encrypted") {
            return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$crypto$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["symmetricDecrypt"])({
                key: ctx.context.secret,
                data: backupCodes
            });
        }
        if (typeof options?.storeBackupCodes === "object" && "decrypt" in options?.storeBackupCodes) {
            return await options?.storeBackupCodes.decrypt(backupCodes);
        }
        return backupCodes;
    }
    return {
        id: "backup_code",
        endpoints: {
            /**
       * ### Endpoint
       *
       * POST `/two-factor/verify-backup-code`
       *
       * ### API Methods
       *
       * **server:**
       * `auth.api.verifyBackupCode`
       *
       * **client:**
       * `authClient.twoFactor.verifyBackupCode`
       *
       * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/2fa#api-method-two-factor-verify-backup-code)
       */ verifyBackupCode: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["j"])("/two-factor/verify-backup-code", {
                method: "POST",
                body: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["object"]({
                    code: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"]().meta({
                        description: `A backup code to verify. Eg: "123456"`
                    }),
                    /**
             * Disable setting the session cookie
             */ disableSession: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["boolean"]().meta({
                        description: "If true, the session cookie will not be set."
                    }).optional(),
                    /**
             * if true, the device will be trusted
             * for 30 days. It'll be refreshed on
             * every sign in request within this time.
             */ trustDevice: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["boolean"]().meta({
                        description: "If true, the device will be trusted for 30 days. It'll be refreshed on every sign in request within this time. Eg: true"
                    }).optional()
                }),
                metadata: {
                    openapi: {
                        description: "Verify a backup code for two-factor authentication",
                        responses: {
                            "200": {
                                description: "Backup code verified successfully",
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object",
                                            properties: {
                                                user: {
                                                    type: "object",
                                                    properties: {
                                                        id: {
                                                            type: "string",
                                                            description: "Unique identifier of the user"
                                                        },
                                                        email: {
                                                            type: "string",
                                                            format: "email",
                                                            nullable: true,
                                                            description: "User's email address"
                                                        },
                                                        emailVerified: {
                                                            type: "boolean",
                                                            nullable: true,
                                                            description: "Whether the email is verified"
                                                        },
                                                        name: {
                                                            type: "string",
                                                            nullable: true,
                                                            description: "User's name"
                                                        },
                                                        image: {
                                                            type: "string",
                                                            format: "uri",
                                                            nullable: true,
                                                            description: "User's profile image URL"
                                                        },
                                                        twoFactorEnabled: {
                                                            type: "boolean",
                                                            description: "Whether two-factor authentication is enabled for the user"
                                                        },
                                                        createdAt: {
                                                            type: "string",
                                                            format: "date-time",
                                                            description: "Timestamp when the user was created"
                                                        },
                                                        updatedAt: {
                                                            type: "string",
                                                            format: "date-time",
                                                            description: "Timestamp when the user was last updated"
                                                        }
                                                    },
                                                    required: [
                                                        "id",
                                                        "twoFactorEnabled",
                                                        "createdAt",
                                                        "updatedAt"
                                                    ],
                                                    description: "The authenticated user object with two-factor details"
                                                },
                                                session: {
                                                    type: "object",
                                                    properties: {
                                                        token: {
                                                            type: "string",
                                                            description: "Session token"
                                                        },
                                                        userId: {
                                                            type: "string",
                                                            description: "ID of the user associated with the session"
                                                        },
                                                        createdAt: {
                                                            type: "string",
                                                            format: "date-time",
                                                            description: "Timestamp when the session was created"
                                                        },
                                                        expiresAt: {
                                                            type: "string",
                                                            format: "date-time",
                                                            description: "Timestamp when the session expires"
                                                        }
                                                    },
                                                    required: [
                                                        "token",
                                                        "userId",
                                                        "createdAt",
                                                        "expiresAt"
                                                    ],
                                                    description: "The current session object, included unless disableSession is true"
                                                }
                                            },
                                            required: [
                                                "user",
                                                "session"
                                            ]
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }, async (ctx)=>{
                const { session, valid } = await verifyTwoFactor(ctx);
                const user = session.user;
                const twoFactor = await ctx.context.adapter.findOne({
                    model: twoFactorTable,
                    where: [
                        {
                            field: "userId",
                            value: user.id
                        }
                    ]
                });
                if (!twoFactor) {
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
                        message: TWO_FACTOR_ERROR_CODES.BACKUP_CODES_NOT_ENABLED
                    });
                }
                const decryptedBackupCodes = await decryptBackupCodes(ctx, twoFactor.backupCodes);
                const validate = await verifyBackupCode({
                    backupCodes: decryptedBackupCodes,
                    code: ctx.body.code
                }, ctx.context.secret);
                if (!validate.status) {
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("UNAUTHORIZED", {
                        message: TWO_FACTOR_ERROR_CODES.INVALID_BACKUP_CODE
                    });
                }
                const updatedBackupCodes = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$crypto$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["symmetricEncrypt"])({
                    key: ctx.context.secret,
                    data: JSON.stringify(validate.updated)
                });
                await ctx.context.adapter.updateMany({
                    model: twoFactorTable,
                    update: {
                        backupCodes: updatedBackupCodes
                    },
                    where: [
                        {
                            field: "userId",
                            value: user.id
                        }
                    ]
                });
                if (!ctx.body.disableSession) {
                    return valid(ctx);
                }
                return ctx.json({
                    token: session.session?.token,
                    user: {
                        id: session.user?.id,
                        email: session.user.email,
                        emailVerified: session.user.emailVerified,
                        name: session.user.name,
                        image: session.user.image,
                        createdAt: session.user.createdAt,
                        updatedAt: session.user.updatedAt
                    }
                });
            }),
            /**
       * ### Endpoint
       *
       * POST `/two-factor/generate-backup-codes`
       *
       * ### API Methods
       *
       * **server:**
       * `auth.api.generateBackupCodes`
       *
       * **client:**
       * `authClient.twoFactor.generateBackupCodes`
       *
       * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/2fa#api-method-two-factor-generate-backup-codes)
       */ generateBackupCodes: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["j"])("/two-factor/generate-backup-codes", {
                method: "POST",
                body: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["object"]({
                    password: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"]().meta({
                        description: "The users password."
                    })
                }),
                use: [
                    __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["l"]
                ],
                metadata: {
                    openapi: {
                        description: "Generate new backup codes for two-factor authentication",
                        responses: {
                            "200": {
                                description: "Backup codes generated successfully",
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object",
                                            properties: {
                                                status: {
                                                    type: "boolean",
                                                    description: "Indicates if the backup codes were generated successfully",
                                                    enum: [
                                                        true
                                                    ]
                                                },
                                                backupCodes: {
                                                    type: "array",
                                                    items: {
                                                        type: "string"
                                                    },
                                                    description: "Array of generated backup codes in plain text"
                                                }
                                            },
                                            required: [
                                                "status",
                                                "backupCodes"
                                            ]
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }, async (ctx)=>{
                const user = ctx.context.session.user;
                if (!user.twoFactorEnabled) {
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
                        message: TWO_FACTOR_ERROR_CODES.TWO_FACTOR_NOT_ENABLED
                    });
                }
                await ctx.context.password.checkPassword(user.id, ctx);
                const backupCodes = await generateBackupCodes(ctx.context.secret, options);
                const storedBackupCodes = await storeBackupCodes(ctx, backupCodes.encryptedBackupCodes);
                await ctx.context.adapter.update({
                    model: twoFactorTable,
                    update: {
                        backupCodes: storedBackupCodes
                    },
                    where: [
                        {
                            field: "userId",
                            value: ctx.context.session.user.id
                        }
                    ]
                });
                return ctx.json({
                    status: true,
                    backupCodes: backupCodes.backupCodes
                });
            }),
            /**
       * ### Endpoint
       *
       * GET `/two-factor/view-backup-codes`
       *
       * ### API Methods
       *
       * **server:**
       * `auth.api.viewBackupCodes`
       *
       * **client:**
       * `authClient.twoFactor.viewBackupCodes`
       *
       * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/2fa#api-method-two-factor-view-backup-codes)
       */ viewBackupCodes: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["j"])("/two-factor/view-backup-codes", {
                method: "GET",
                body: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["object"]({
                    userId: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$coerce$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__coerce$3e$__["coerce"].string().meta({
                        description: `The user ID to view all backup codes. Eg: "user-id"`
                    })
                }),
                metadata: {
                    SERVER_ONLY: true
                }
            }, async (ctx)=>{
                const twoFactor = await ctx.context.adapter.findOne({
                    model: twoFactorTable,
                    where: [
                        {
                            field: "userId",
                            value: ctx.body.userId
                        }
                    ]
                });
                if (!twoFactor) {
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
                        message: "Backup codes aren't enabled"
                    });
                }
                const backupCodes = await getBackupCodes(twoFactor.backupCodes, ctx.context.secret);
                if (!backupCodes) {
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
                        message: TWO_FACTOR_ERROR_CODES.BACKUP_CODES_NOT_ENABLED
                    });
                }
                const decryptedBackupCodes = await decryptBackupCodes(ctx, twoFactor.backupCodes);
                return ctx.json({
                    status: true,
                    backupCodes: decryptedBackupCodes
                });
            })
        }
    };
};
const defaultKeyHasher = async (token)=>{
    const hash = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hash$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createHash"])("SHA-256").digest(new TextEncoder().encode(token));
    const hashed = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$base64$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["base64Url"].encode(new Uint8Array(hash), {
        padding: false
    });
    return hashed;
};
const otp2fa = (options)=>{
    const opts = {
        storeOTP: "plain",
        digits: 6,
        ...options,
        period: (options?.period || 3) * 60 * 1e3
    };
    async function storeOTP(ctx, otp) {
        if (opts.storeOTP === "hashed") {
            return await defaultKeyHasher(otp);
        }
        if (typeof opts.storeOTP === "object" && "hash" in opts.storeOTP) {
            return await opts.storeOTP.hash(otp);
        }
        if (typeof opts.storeOTP === "object" && "encrypt" in opts.storeOTP) {
            return await opts.storeOTP.encrypt(otp);
        }
        if (opts.storeOTP === "encrypted") {
            return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$crypto$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["symmetricEncrypt"])({
                key: ctx.context.secret,
                data: otp
            });
        }
        return otp;
    }
    async function decryptOTP(ctx, otp) {
        if (opts.storeOTP === "hashed") {
            return await defaultKeyHasher(otp);
        }
        if (opts.storeOTP === "encrypted") {
            return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$crypto$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["symmetricDecrypt"])({
                key: ctx.context.secret,
                data: otp
            });
        }
        if (typeof opts.storeOTP === "object" && "encrypt" in opts.storeOTP) {
            return await opts.storeOTP.decrypt(otp);
        }
        if (typeof opts.storeOTP === "object" && "hash" in opts.storeOTP) {
            return await opts.storeOTP.hash(otp);
        }
        return otp;
    }
    const send2FaOTP = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["j"])("/two-factor/send-otp", {
        method: "POST",
        body: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["object"]({
            /**
         * if true, the device will be trusted
         * for 30 days. It'll be refreshed on
         * every sign in request within this time.
         */ trustDevice: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["boolean"]().optional().meta({
                description: "If true, the device will be trusted for 30 days. It'll be refreshed on every sign in request within this time. Eg: true"
            })
        }).optional(),
        metadata: {
            openapi: {
                summary: "Send two factor OTP",
                description: "Send two factor OTP to the user",
                responses: {
                    200: {
                        description: "Successful response",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "boolean"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }, async (ctx)=>{
        if (!options || !options.sendOTP) {
            ctx.context.logger.error("send otp isn't configured. Please configure the send otp function on otp options.");
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
                message: "otp isn't configured"
            });
        }
        const { session, key } = await verifyTwoFactor(ctx);
        if (!session.user.twoFactorEnabled) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
                message: TWO_FACTOR_ERROR_CODES.OTP_NOT_ENABLED
            });
        }
        const code = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$B4Qoxdgc$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["g"])(opts.digits, "0-9");
        const hashedCode = await storeOTP(ctx, code);
        await ctx.context.internalAdapter.createVerificationValue({
            value: `${hashedCode}:0`,
            identifier: `2fa-otp-${key}`,
            expiresAt: new Date(Date.now() + opts.period)
        }, ctx);
        await options.sendOTP({
            user: session.user,
            otp: code
        }, ctx.request);
        return ctx.json({
            status: true
        });
    });
    const verifyOTP = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["j"])("/two-factor/verify-otp", {
        method: "POST",
        body: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["object"]({
            code: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"]().meta({
                description: 'The otp code to verify. Eg: "012345"'
            }),
            /**
         * if true, the device will be trusted
         * for 30 days. It'll be refreshed on
         * every sign in request within this time.
         */ trustDevice: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["boolean"]().optional().meta({
                description: "If true, the device will be trusted for 30 days. It'll be refreshed on every sign in request within this time. Eg: true"
            })
        }),
        metadata: {
            openapi: {
                summary: "Verify two factor OTP",
                description: "Verify two factor OTP",
                responses: {
                    "200": {
                        description: "Two-factor OTP verified successfully",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        token: {
                                            type: "string",
                                            description: "Session token for the authenticated session"
                                        },
                                        user: {
                                            type: "object",
                                            properties: {
                                                id: {
                                                    type: "string",
                                                    description: "Unique identifier of the user"
                                                },
                                                email: {
                                                    type: "string",
                                                    format: "email",
                                                    nullable: true,
                                                    description: "User's email address"
                                                },
                                                emailVerified: {
                                                    type: "boolean",
                                                    nullable: true,
                                                    description: "Whether the email is verified"
                                                },
                                                name: {
                                                    type: "string",
                                                    nullable: true,
                                                    description: "User's name"
                                                },
                                                image: {
                                                    type: "string",
                                                    format: "uri",
                                                    nullable: true,
                                                    description: "User's profile image URL"
                                                },
                                                createdAt: {
                                                    type: "string",
                                                    format: "date-time",
                                                    description: "Timestamp when the user was created"
                                                },
                                                updatedAt: {
                                                    type: "string",
                                                    format: "date-time",
                                                    description: "Timestamp when the user was last updated"
                                                }
                                            },
                                            required: [
                                                "id",
                                                "createdAt",
                                                "updatedAt"
                                            ],
                                            description: "The authenticated user object"
                                        }
                                    },
                                    required: [
                                        "token",
                                        "user"
                                    ]
                                }
                            }
                        }
                    }
                }
            }
        }
    }, async (ctx)=>{
        const { session, key, valid, invalid } = await verifyTwoFactor(ctx);
        const toCheckOtp = await ctx.context.internalAdapter.findVerificationValue(`2fa-otp-${key}`);
        const [otp, counter] = toCheckOtp?.value?.split(":") ?? [];
        const decryptedOtp = await decryptOTP(ctx, otp);
        if (!toCheckOtp || toCheckOtp.expiresAt < /* @__PURE__ */ new Date()) {
            if (toCheckOtp) {
                await ctx.context.internalAdapter.deleteVerificationValue(toCheckOtp.id);
            }
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
                message: TWO_FACTOR_ERROR_CODES.OTP_HAS_EXPIRED
            });
        }
        const allowedAttempts = options?.allowedAttempts || 5;
        if (parseInt(counter) >= allowedAttempts) {
            await ctx.context.internalAdapter.deleteVerificationValue(toCheckOtp.id);
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
                message: TWO_FACTOR_ERROR_CODES.TOO_MANY_ATTEMPTS_REQUEST_NEW_CODE
            });
        }
        if (decryptedOtp === ctx.body.code) {
            if (!session.user.twoFactorEnabled) {
                if (!session.session) {
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
                        message: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["B"].FAILED_TO_CREATE_SESSION
                    });
                }
                const updatedUser = await ctx.context.internalAdapter.updateUser(session.user.id, {
                    twoFactorEnabled: true
                });
                const newSession = await ctx.context.internalAdapter.createSession(session.user.id, ctx, false, session.session);
                await ctx.context.internalAdapter.deleteSession(session.session.token);
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$cookies$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setSessionCookie"])(ctx, {
                    session: newSession,
                    user: updatedUser
                });
                return ctx.json({
                    token: newSession.token,
                    user: {
                        id: updatedUser.id,
                        email: updatedUser.email,
                        emailVerified: updatedUser.emailVerified,
                        name: updatedUser.name,
                        image: updatedUser.image,
                        createdAt: updatedUser.createdAt,
                        updatedAt: updatedUser.updatedAt
                    }
                });
            }
            return valid(ctx);
        } else {
            await ctx.context.internalAdapter.updateVerificationValue(toCheckOtp.id, {
                value: `${otp}:${(parseInt(counter, 10) || 0) + 1}`
            });
            return invalid("INVALID_CODE");
        }
    });
    return {
        id: "otp",
        endpoints: {
            /**
       * ### Endpoint
       *
       * POST `/two-factor/send-otp`
       *
       * ### API Methods
       *
       * **server:**
       * `auth.api.send2FaOTP`
       *
       * **client:**
       * `authClient.twoFactor.sendOtp`
       *
       * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/2fa#api-method-two-factor-send-otp)
       */ sendTwoFactorOTP: send2FaOTP,
            /**
       * ### Endpoint
       *
       * POST `/two-factor/verify-otp`
       *
       * ### API Methods
       *
       * **server:**
       * `auth.api.verifyOTP`
       *
       * **client:**
       * `authClient.twoFactor.verifyOtp`
       *
       * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/2fa#api-method-two-factor-verify-otp)
       */ verifyTwoFactorOTP: verifyOTP
        }
    };
};
const totp2fa = (options)=>{
    const opts = {
        ...options,
        digits: options?.digits || 6,
        period: options?.period || 30
    };
    const twoFactorTable = "twoFactor";
    const generateTOTP = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["j"])("/totp/generate", {
        method: "POST",
        body: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["object"]({
            secret: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"]().meta({
                description: "The secret to generate the TOTP code"
            })
        }),
        metadata: {
            openapi: {
                summary: "Generate TOTP code",
                description: "Use this endpoint to generate a TOTP code",
                responses: {
                    200: {
                        description: "Successful response",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        code: {
                                            type: "string"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            SERVER_ONLY: true
        }
    }, async (ctx)=>{
        if (options?.disable) {
            ctx.context.logger.error("totp isn't configured. please pass totp option on two factor plugin to enable totp");
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
                message: "totp isn't configured"
            });
        }
        const code = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$otp$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createOTP"])(ctx.body.secret, {
            period: opts.period,
            digits: opts.digits
        }).totp();
        return {
            code
        };
    });
    const getTOTPURI = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["j"])("/two-factor/get-totp-uri", {
        method: "POST",
        use: [
            __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["l"]
        ],
        body: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["object"]({
            password: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"]().meta({
                description: "User password"
            })
        }),
        metadata: {
            openapi: {
                summary: "Get TOTP URI",
                description: "Use this endpoint to get the TOTP URI",
                responses: {
                    200: {
                        description: "Successful response",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        totpURI: {
                                            type: "string"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }, async (ctx)=>{
        if (options?.disable) {
            ctx.context.logger.error("totp isn't configured. please pass totp option on two factor plugin to enable totp");
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
                message: "totp isn't configured"
            });
        }
        const user = ctx.context.session.user;
        const twoFactor = await ctx.context.adapter.findOne({
            model: twoFactorTable,
            where: [
                {
                    field: "userId",
                    value: user.id
                }
            ]
        });
        if (!twoFactor) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
                message: TWO_FACTOR_ERROR_CODES.TOTP_NOT_ENABLED
            });
        }
        const secret = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$crypto$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["symmetricDecrypt"])({
            key: ctx.context.secret,
            data: twoFactor.secret
        });
        await ctx.context.password.checkPassword(user.id, ctx);
        const totpURI = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$otp$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createOTP"])(secret, {
            digits: opts.digits,
            period: opts.period
        }).url(options?.issuer || ctx.context.appName, user.email);
        return {
            totpURI
        };
    });
    const verifyTOTP = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["j"])("/two-factor/verify-totp", {
        method: "POST",
        body: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["object"]({
            code: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"]().meta({
                description: 'The otp code to verify. Eg: "012345"'
            }),
            /**
         * if true, the device will be trusted
         * for 30 days. It'll be refreshed on
         * every sign in request within this time.
         */ trustDevice: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["boolean"]().meta({
                description: "If true, the device will be trusted for 30 days. It'll be refreshed on every sign in request within this time. Eg: true"
            }).optional()
        }),
        metadata: {
            openapi: {
                summary: "Verify two factor TOTP",
                description: "Verify two factor TOTP",
                responses: {
                    200: {
                        description: "Successful response",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        status: {
                                            type: "boolean"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }, async (ctx)=>{
        if (options?.disable) {
            ctx.context.logger.error("totp isn't configured. please pass totp option on two factor plugin to enable totp");
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
                message: "totp isn't configured"
            });
        }
        const { session, valid, invalid } = await verifyTwoFactor(ctx);
        const user = session.user;
        const twoFactor = await ctx.context.adapter.findOne({
            model: twoFactorTable,
            where: [
                {
                    field: "userId",
                    value: user.id
                }
            ]
        });
        if (!twoFactor) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
                message: TWO_FACTOR_ERROR_CODES.TOTP_NOT_ENABLED
            });
        }
        const decrypted = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$crypto$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["symmetricDecrypt"])({
            key: ctx.context.secret,
            data: twoFactor.secret
        });
        const status = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$otp$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createOTP"])(decrypted, {
            period: opts.period,
            digits: opts.digits
        }).verify(ctx.body.code);
        if (!status) {
            return invalid("INVALID_CODE");
        }
        if (!user.twoFactorEnabled) {
            if (!session.session) {
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
                    message: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["B"].FAILED_TO_CREATE_SESSION
                });
            }
            const updatedUser = await ctx.context.internalAdapter.updateUser(user.id, {
                twoFactorEnabled: true
            }, ctx);
            const newSession = await ctx.context.internalAdapter.createSession(user.id, ctx, false, session.session).catch((e)=>{
                throw e;
            });
            await ctx.context.internalAdapter.deleteSession(session.session.token);
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$cookies$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setSessionCookie"])(ctx, {
                session: newSession,
                user: updatedUser
            });
        }
        return valid(ctx);
    });
    return {
        id: "totp",
        endpoints: {
            /**
       * ### Endpoint
       *
       * POST `/totp/generate`
       *
       * ### API Methods
       *
       * **server:**
       * `auth.api.generateTOTP`
       *
       * **client:**
       * `authClient.totp.generate`
       *
       * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/totp#api-method-totp-generate)
       */ generateTOTP,
            /**
       * ### Endpoint
       *
       * POST `/two-factor/get-totp-uri`
       *
       * ### API Methods
       *
       * **server:**
       * `auth.api.getTOTPURI`
       *
       * **client:**
       * `authClient.twoFactor.getTotpUri`
       *
       * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/two-factor#api-method-two-factor-get-totp-uri)
       */ getTOTPURI,
            verifyTOTP
        }
    };
};
const schema = {
    user: {
        fields: {
            twoFactorEnabled: {
                type: "boolean",
                required: false,
                defaultValue: false,
                input: false
            }
        }
    },
    twoFactor: {
        fields: {
            secret: {
                type: "string",
                required: true,
                returned: false
            },
            backupCodes: {
                type: "string",
                required: true,
                returned: false
            },
            userId: {
                type: "string",
                required: true,
                returned: false,
                references: {
                    model: "user",
                    field: "id"
                }
            }
        }
    }
};
const twoFactor = (options)=>{
    const opts = {
        twoFactorTable: "twoFactor"
    };
    const totp = totp2fa(options?.totpOptions);
    const backupCode = backupCode2fa(options?.backupCodeOptions);
    const otp = otp2fa(options?.otpOptions);
    return {
        id: "two-factor",
        endpoints: {
            ...totp.endpoints,
            ...otp.endpoints,
            ...backupCode.endpoints,
            /**
       * ### Endpoint
       *
       * POST `/two-factor/enable`
       *
       * ### API Methods
       *
       * **server:**
       * `auth.api.enableTwoFactor`
       *
       * **client:**
       * `authClient.twoFactor.enable`
       *
       * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/2fa#api-method-two-factor-enable)
       */ enableTwoFactor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["j"])("/two-factor/enable", {
                method: "POST",
                body: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["object"]({
                    password: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"]().meta({
                        description: "User password"
                    }),
                    issuer: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"]().meta({
                        description: "Custom issuer for the TOTP URI"
                    }).optional()
                }),
                use: [
                    __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["l"]
                ],
                metadata: {
                    openapi: {
                        summary: "Enable two factor authentication",
                        description: "Use this endpoint to enable two factor authentication. This will generate a TOTP URI and backup codes. Once the user verifies the TOTP URI, the two factor authentication will be enabled.",
                        responses: {
                            200: {
                                description: "Successful response",
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object",
                                            properties: {
                                                totpURI: {
                                                    type: "string",
                                                    description: "TOTP URI"
                                                },
                                                backupCodes: {
                                                    type: "array",
                                                    items: {
                                                        type: "string"
                                                    },
                                                    description: "Backup codes"
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }, async (ctx)=>{
                const user = ctx.context.session.user;
                const { password, issuer } = ctx.body;
                const isPasswordValid = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$YwDQhoPc$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["v"])(ctx, {
                    password,
                    userId: user.id
                });
                if (!isPasswordValid) {
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
                        message: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["B"].INVALID_PASSWORD
                    });
                }
                const secret = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$B4Qoxdgc$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["g"])(32);
                const encryptedSecret = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$crypto$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["symmetricEncrypt"])({
                    key: ctx.context.secret,
                    data: secret
                });
                const backupCodes = await generateBackupCodes(ctx.context.secret, options?.backupCodeOptions);
                if (options?.skipVerificationOnEnable) {
                    const updatedUser = await ctx.context.internalAdapter.updateUser(user.id, {
                        twoFactorEnabled: true
                    }, ctx);
                    const newSession = await ctx.context.internalAdapter.createSession(updatedUser.id, ctx, false, ctx.context.session.session);
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$cookies$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setSessionCookie"])(ctx, {
                        session: newSession,
                        user: updatedUser
                    });
                    await ctx.context.internalAdapter.deleteSession(ctx.context.session.session.token);
                }
                await ctx.context.adapter.deleteMany({
                    model: opts.twoFactorTable,
                    where: [
                        {
                            field: "userId",
                            value: user.id
                        }
                    ]
                });
                await ctx.context.adapter.create({
                    model: opts.twoFactorTable,
                    data: {
                        secret: encryptedSecret,
                        backupCodes: backupCodes.encryptedBackupCodes,
                        userId: user.id
                    }
                });
                const totpURI = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$otp$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createOTP"])(secret, {
                    digits: options?.totpOptions?.digits || 6,
                    period: options?.totpOptions?.period
                }).url(issuer || options?.issuer || ctx.context.appName, user.email);
                return ctx.json({
                    totpURI,
                    backupCodes: backupCodes.backupCodes
                });
            }),
            /**
       * ### Endpoint
       *
       * POST `/two-factor/disable`
       *
       * ### API Methods
       *
       * **server:**
       * `auth.api.disableTwoFactor`
       *
       * **client:**
       * `authClient.twoFactor.disable`
       *
       * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/2fa#api-method-two-factor-disable)
       */ disableTwoFactor: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["j"])("/two-factor/disable", {
                method: "POST",
                body: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["object"]({
                    password: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"]().meta({
                        description: "User password"
                    })
                }),
                use: [
                    __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["l"]
                ],
                metadata: {
                    openapi: {
                        summary: "Disable two factor authentication",
                        description: "Use this endpoint to disable two factor authentication.",
                        responses: {
                            200: {
                                description: "Successful response",
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object",
                                            properties: {
                                                status: {
                                                    type: "boolean"
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }, async (ctx)=>{
                const user = ctx.context.session.user;
                const { password } = ctx.body;
                const isPasswordValid = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$YwDQhoPc$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["v"])(ctx, {
                    password,
                    userId: user.id
                });
                if (!isPasswordValid) {
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
                        message: "Invalid password"
                    });
                }
                const updatedUser = await ctx.context.internalAdapter.updateUser(user.id, {
                    twoFactorEnabled: false
                }, ctx);
                await ctx.context.adapter.delete({
                    model: opts.twoFactorTable,
                    where: [
                        {
                            field: "userId",
                            value: updatedUser.id
                        }
                    ]
                });
                const newSession = await ctx.context.internalAdapter.createSession(updatedUser.id, ctx, false, ctx.context.session.session);
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$cookies$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setSessionCookie"])(ctx, {
                    session: newSession,
                    user: updatedUser
                });
                await ctx.context.internalAdapter.deleteSession(ctx.context.session.session.token);
                return ctx.json({
                    status: true
                });
            })
        },
        options,
        hooks: {
            after: [
                {
                    matcher (context) {
                        return context.path === "/sign-in/email" || context.path === "/sign-in/username" || context.path === "/sign-in/phone-number";
                    },
                    handler: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["i"])(async (ctx)=>{
                        const data = ctx.context.newSession;
                        if (!data) {
                            return;
                        }
                        if (!data?.user.twoFactorEnabled) {
                            return;
                        }
                        const trustDeviceCookieName = ctx.context.createAuthCookie(TRUST_DEVICE_COOKIE_NAME);
                        const trustDeviceCookie = await ctx.getSignedCookie(trustDeviceCookieName.name, ctx.context.secret);
                        if (trustDeviceCookie) {
                            const [token, sessionToken] = trustDeviceCookie.split("!");
                            const expectedToken = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hmac$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createHMAC"])("SHA-256", "base64urlnopad").sign(ctx.context.secret, `${data.user.id}!${sessionToken}`);
                            if (token === expectedToken) {
                                const newToken = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hmac$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createHMAC"])("SHA-256", "base64urlnopad").sign(ctx.context.secret, `${data.user.id}!${sessionToken}`);
                                await ctx.setSignedCookie(trustDeviceCookieName.name, `${newToken}!${data.session.token}`, ctx.context.secret, trustDeviceCookieName.attributes);
                                return;
                            }
                        }
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$cookies$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["deleteSessionCookie"])(ctx, true);
                        await ctx.context.internalAdapter.deleteSession(data.session.token);
                        const maxAge = (options?.otpOptions?.period ?? 3) * 60;
                        const twoFactorCookie = ctx.context.createAuthCookie(TWO_FACTOR_COOKIE_NAME, {
                            maxAge
                        });
                        const identifier = `2fa-${(0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$B4Qoxdgc$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["g"])(20)}`;
                        await ctx.context.internalAdapter.createVerificationValue({
                            value: data.user.id,
                            identifier,
                            expiresAt: new Date(Date.now() + maxAge * 1e3)
                        }, ctx);
                        await ctx.setSignedCookie(twoFactorCookie.name, identifier, ctx.context.secret, twoFactorCookie.attributes);
                        return ctx.json({
                            twoFactorRedirect: true
                        });
                    })
                }
            ]
        },
        schema: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$n2KFGwjY$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["m"])(schema, options?.schema),
        rateLimit: [
            {
                pathMatcher (path) {
                    return path.startsWith("/two-factor/");
                },
                window: 10,
                max: 3
            }
        ],
        $ERROR_CODES: TWO_FACTOR_ERROR_CODES
    };
};
;
}),
"[project]/packages/better-auth/dist/plugins/two-factor/index.mjs [app-ssr] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$B4Qoxdgc$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.B4Qoxdgc.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.D4HhkCZJ.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/better-call/dist/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$cookies$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/cookies/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$n2KFGwjY$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.n2KFGwjY.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$8zoxzg$2d$F$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.8zoxzg-F.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DBGfIDnh$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.DBGfIDnh.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$defu$2f$dist$2f$defu$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/defu/dist/defu.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$crypto$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/crypto/index.mjs [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$base64$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/base64.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hmac$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/hmac.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$binary$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/binary.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hash$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/hash.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$otp$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/otp.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$YwDQhoPc$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.YwDQhoPc.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$Ddw8bVyV$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.Ddw8bVyV.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$random$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/random.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$CW6D9eSx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.CW6D9eSx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-fetch/fetch/dist/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/index.mjs [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hex$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/hex.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$VTXNLFMT$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.VTXNLFMT.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DdzSJf$2d$n$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.DdzSJf-n.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$tB5eU6EY$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.tB5eU6EY.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$plugins$2f$two$2d$factor$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/plugins/two-factor/index.mjs [app-ssr] (ecmascript) <locals>");
}),
"[project]/packages/better-auth/dist/plugins/username/index.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "USERNAME_ERROR_CODES": ()=>USERNAME_ERROR_CODES,
    "username": ()=>username
});
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/node_modules/zod/v4/classic/schemas.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.D4HhkCZJ.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/better-call/dist/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$cookies$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/cookies/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$n2KFGwjY$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.n2KFGwjY.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$8zoxzg$2d$F$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.8zoxzg-F.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DBGfIDnh$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.DBGfIDnh.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$defu$2f$dist$2f$defu$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/defu/dist/defu.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$CW6D9eSx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.CW6D9eSx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hash$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/hash.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$base64$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/base64.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$crypto$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/crypto/index.mjs [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/index.mjs [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hex$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/hex.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$B4Qoxdgc$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.B4Qoxdgc.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$random$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/random.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-fetch/fetch/dist/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$VTXNLFMT$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.VTXNLFMT.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DdzSJf$2d$n$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.DdzSJf-n.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$tB5eU6EY$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.tB5eU6EY.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hmac$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/hmac.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$binary$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/binary.mjs [app-ssr] (ecmascript)");
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
;
;
;
;
;
;
;
;
;
const getSchema = (normalizer)=>{
    return {
        user: {
            fields: {
                username: {
                    type: "string",
                    required: false,
                    sortable: true,
                    unique: true,
                    returned: true
                },
                displayUsername: {
                    type: "string",
                    required: false,
                    transform: {
                        input (value) {
                            return value == null ? value : normalizer(value);
                        }
                    }
                }
            }
        }
    };
};
const USERNAME_ERROR_CODES = {
    INVALID_USERNAME_OR_PASSWORD: "invalid username or password",
    EMAIL_NOT_VERIFIED: "email not verified",
    UNEXPECTED_ERROR: "unexpected error",
    USERNAME_IS_ALREADY_TAKEN: "username is already taken. please try another.",
    USERNAME_TOO_SHORT: "username is too short",
    USERNAME_TOO_LONG: "username is too long",
    INVALID_USERNAME: "username is invalid"
};
function defaultUsernameValidator(username2) {
    return /^[a-zA-Z0-9_.]+$/.test(username2);
}
const username = (options)=>{
    const normalizer = (username2)=>{
        if (options?.usernameNormalization === false) {
            return username2;
        }
        if (options?.usernameNormalization) {
            return options.usernameNormalization(username2);
        }
        return username2.toLowerCase();
    };
    return {
        id: "username",
        endpoints: {
            signInUsername: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["j"])("/sign-in/username", {
                method: "POST",
                body: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["object"]({
                    username: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"]().meta({
                        description: "The username of the user"
                    }),
                    password: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"]().meta({
                        description: "The password of the user"
                    }),
                    rememberMe: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["boolean"]().meta({
                        description: "Remember the user session"
                    }).optional(),
                    callbackURL: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"]().meta({
                        description: "The URL to redirect to after email verification"
                    }).optional()
                }),
                metadata: {
                    openapi: {
                        summary: "Sign in with username",
                        description: "Sign in with username",
                        responses: {
                            200: {
                                description: "Success",
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object",
                                            properties: {
                                                token: {
                                                    type: "string",
                                                    description: "Session token for the authenticated session"
                                                },
                                                user: {
                                                    $ref: "#/components/schemas/User"
                                                }
                                            },
                                            required: [
                                                "token",
                                                "user"
                                            ]
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }, async (ctx)=>{
                if (!ctx.body.username || !ctx.body.password) {
                    ctx.context.logger.error("Username or password not found");
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("UNAUTHORIZED", {
                        message: USERNAME_ERROR_CODES.INVALID_USERNAME_OR_PASSWORD
                    });
                }
                const minUsernameLength = options?.minUsernameLength || 3;
                const maxUsernameLength = options?.maxUsernameLength || 30;
                if (ctx.body.username.length < minUsernameLength) {
                    ctx.context.logger.error("Username too short", {
                        username: ctx.body.username
                    });
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("UNPROCESSABLE_ENTITY", {
                        message: USERNAME_ERROR_CODES.USERNAME_TOO_SHORT
                    });
                }
                if (ctx.body.username.length > maxUsernameLength) {
                    ctx.context.logger.error("Username too long", {
                        username: ctx.body.username
                    });
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("UNPROCESSABLE_ENTITY", {
                        message: USERNAME_ERROR_CODES.USERNAME_TOO_LONG
                    });
                }
                const validator = options?.usernameValidator || defaultUsernameValidator;
                if (!validator(ctx.body.username)) {
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("UNPROCESSABLE_ENTITY", {
                        message: USERNAME_ERROR_CODES.INVALID_USERNAME
                    });
                }
                const user = await ctx.context.adapter.findOne({
                    model: "user",
                    where: [
                        {
                            field: "username",
                            value: normalizer(ctx.body.username)
                        }
                    ]
                });
                if (!user) {
                    await ctx.context.password.hash(ctx.body.password);
                    ctx.context.logger.error("User not found", {
                        username: ctx.body.username
                    });
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("UNAUTHORIZED", {
                        message: USERNAME_ERROR_CODES.INVALID_USERNAME_OR_PASSWORD
                    });
                }
                if (!user.emailVerified && ctx.context.options.emailAndPassword?.requireEmailVerification) {
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["u"])(ctx, user);
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("FORBIDDEN", {
                        message: USERNAME_ERROR_CODES.EMAIL_NOT_VERIFIED
                    });
                }
                const account = await ctx.context.adapter.findOne({
                    model: "account",
                    where: [
                        {
                            field: "userId",
                            value: user.id
                        },
                        {
                            field: "providerId",
                            value: "credential"
                        }
                    ]
                });
                if (!account) {
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("UNAUTHORIZED", {
                        message: USERNAME_ERROR_CODES.INVALID_USERNAME_OR_PASSWORD
                    });
                }
                const currentPassword = account?.password;
                if (!currentPassword) {
                    ctx.context.logger.error("Password not found", {
                        username: ctx.body.username
                    });
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("UNAUTHORIZED", {
                        message: USERNAME_ERROR_CODES.INVALID_USERNAME_OR_PASSWORD
                    });
                }
                const validPassword = await ctx.context.password.verify({
                    hash: currentPassword,
                    password: ctx.body.password
                });
                if (!validPassword) {
                    ctx.context.logger.error("Invalid password");
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("UNAUTHORIZED", {
                        message: USERNAME_ERROR_CODES.INVALID_USERNAME_OR_PASSWORD
                    });
                }
                const session = await ctx.context.internalAdapter.createSession(user.id, ctx, ctx.body.rememberMe === false);
                if (!session) {
                    return ctx.json(null, {
                        status: 500,
                        body: {
                            message: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["B"].FAILED_TO_CREATE_SESSION
                        }
                    });
                }
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$cookies$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setSessionCookie"])(ctx, {
                    session,
                    user
                }, ctx.body.rememberMe === false);
                return ctx.json({
                    token: session.token,
                    user: {
                        id: user.id,
                        email: user.email,
                        emailVerified: user.emailVerified,
                        username: user.username,
                        name: user.name,
                        image: user.image,
                        createdAt: user.createdAt,
                        updatedAt: user.updatedAt
                    }
                });
            }),
            isUsernameAvailable: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["j"])("/is-username-available", {
                method: "POST",
                body: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["object"]({
                    username: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"]().meta({
                        description: "The username to check"
                    })
                })
            }, async (ctx)=>{
                const username2 = ctx.body.username;
                if (!username2) {
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("UNPROCESSABLE_ENTITY", {
                        message: USERNAME_ERROR_CODES.INVALID_USERNAME
                    });
                }
                const user = await ctx.context.adapter.findOne({
                    model: "user",
                    where: [
                        {
                            field: "username",
                            value: username2.toLowerCase()
                        }
                    ]
                });
                if (user) {
                    return ctx.json({
                        available: false
                    });
                }
                return ctx.json({
                    available: true
                });
            })
        },
        schema: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$n2KFGwjY$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["m"])(getSchema(normalizer), options?.schema),
        hooks: {
            before: [
                {
                    matcher (context) {
                        return context.path === "/sign-up/email" || context.path === "/update-user";
                    },
                    handler: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["i"])(async (ctx)=>{
                        const username2 = ctx.body.username;
                        if (username2 !== void 0 && typeof username2 === "string") {
                            const minUsernameLength = options?.minUsernameLength || 3;
                            const maxUsernameLength = options?.maxUsernameLength || 30;
                            if (username2.length < minUsernameLength) {
                                throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("UNPROCESSABLE_ENTITY", {
                                    message: USERNAME_ERROR_CODES.USERNAME_TOO_SHORT
                                });
                            }
                            if (username2.length > maxUsernameLength) {
                                throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("UNPROCESSABLE_ENTITY", {
                                    message: USERNAME_ERROR_CODES.USERNAME_TOO_LONG
                                });
                            }
                            const validator = options?.usernameValidator || defaultUsernameValidator;
                            const valid = await validator(username2);
                            if (!valid) {
                                throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("UNPROCESSABLE_ENTITY", {
                                    message: USERNAME_ERROR_CODES.INVALID_USERNAME
                                });
                            }
                            const user = await ctx.context.adapter.findOne({
                                model: "user",
                                where: [
                                    {
                                        field: "username",
                                        value: normalizer(username2)
                                    }
                                ]
                            });
                            const blockChangeSignUp = ctx.path === "/sign-up/email" && user;
                            const blockChangeUpdateUser = ctx.path === "/update-user" && user && ctx.context.session && user.id !== ctx.context.session.session.userId;
                            if (blockChangeSignUp || blockChangeUpdateUser) {
                                throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("UNPROCESSABLE_ENTITY", {
                                    message: USERNAME_ERROR_CODES.USERNAME_IS_ALREADY_TAKEN
                                });
                            }
                        }
                    })
                },
                {
                    matcher (context) {
                        return context.path === "/sign-up/email" || context.path === "/update-user";
                    },
                    handler: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["i"])(async (ctx)=>{
                        if (ctx.body.username) {
                            ctx.body.displayUsername ||= ctx.body.username;
                            ctx.body.username = normalizer(ctx.body.username);
                        }
                    })
                }
            ]
        },
        $ERROR_CODES: USERNAME_ERROR_CODES
    };
};
;
}),
"[project]/packages/better-auth/dist/plugins/bearer/index.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "bearer": ()=>bearer
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/better-call/dist/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$8zoxzg$2d$F$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.8zoxzg-F.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$base64$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/base64.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hmac$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/hmac.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$binary$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/binary.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$cookies$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/cookies/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.D4HhkCZJ.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$n2KFGwjY$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.n2KFGwjY.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DBGfIDnh$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.DBGfIDnh.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$defu$2f$dist$2f$defu$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/defu/dist/defu.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DdzSJf$2d$n$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.DdzSJf-n.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$CW6D9eSx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.CW6D9eSx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$tB5eU6EY$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.tB5eU6EY.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$VTXNLFMT$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.VTXNLFMT.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hash$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/hash.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$crypto$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/crypto/index.mjs [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/index.mjs [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hex$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/hex.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$B4Qoxdgc$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.B4Qoxdgc.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$random$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/random.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-fetch/fetch/dist/index.js [app-ssr] (ecmascript)");
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
;
;
;
;
;
;
;
;
;
const bearer = (options)=>{
    return {
        id: "bearer",
        hooks: {
            before: [
                {
                    matcher (context) {
                        return Boolean(context.request?.headers.get("authorization") || context.headers?.get("authorization"));
                    },
                    handler: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["i"])(async (c)=>{
                        const token = c.request?.headers.get("authorization")?.replace("Bearer ", "") || c.headers?.get("Authorization")?.replace("Bearer ", "");
                        if (!token) {
                            return;
                        }
                        let signedToken = "";
                        if (token.includes(".")) {
                            signedToken = token.replace("=", "");
                        } else {
                            if (options?.requireSignature) {
                                return;
                            }
                            signedToken = (await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["serializeSignedCookie"])("", token, c.context.secret)).replace("=", "");
                        }
                        try {
                            const decodedToken = decodeURIComponent(signedToken);
                            const isValid = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hmac$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createHMAC"])("SHA-256", "base64urlnopad").verify(c.context.secret, decodedToken.split(".")[0], decodedToken.split(".")[1]);
                            if (!isValid) {
                                return;
                            }
                        } catch (e) {
                            return;
                        }
                        const existingHeaders = c.request?.headers || c.headers;
                        const headers = new Headers({
                            ...Object.fromEntries(existingHeaders?.entries())
                        });
                        headers.append("cookie", `${c.context.authCookies.sessionToken.name}=${signedToken}`);
                        return {
                            context: {
                                headers
                            }
                        };
                    })
                }
            ],
            after: [
                {
                    matcher (context) {
                        return true;
                    },
                    handler: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["i"])(async (ctx)=>{
                        const setCookie = ctx.context.responseHeaders?.get("set-cookie");
                        if (!setCookie) {
                            return;
                        }
                        const parsedCookies = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$cookies$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseSetCookieHeader"])(setCookie);
                        const cookieName = ctx.context.authCookies.sessionToken.name;
                        const sessionCookie = parsedCookies.get(cookieName);
                        if (!sessionCookie || !sessionCookie.value || sessionCookie["max-age"] === 0) {
                            return;
                        }
                        const token = sessionCookie.value;
                        const exposedHeaders = ctx.context.responseHeaders?.get("access-control-expose-headers") || "";
                        const headersSet = new Set(exposedHeaders.split(",").map((header)=>header.trim()).filter(Boolean));
                        headersSet.add("set-auth-token");
                        ctx.setHeader("set-auth-token", token);
                        ctx.setHeader("Access-Control-Expose-Headers", Array.from(headersSet).join(", "));
                    })
                }
            ]
        }
    };
};
;
}),
"[project]/packages/better-auth/dist/plugins/magic-link/index.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "magicLink": ()=>magicLink
});
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/node_modules/zod/v4/classic/schemas.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.D4HhkCZJ.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/better-call/dist/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$cookies$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/cookies/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hash$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/hash.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$base64$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/base64.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/index.mjs [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hex$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/hex.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$B4Qoxdgc$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.B4Qoxdgc.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$n2KFGwjY$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.n2KFGwjY.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$8zoxzg$2d$F$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.8zoxzg-F.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DBGfIDnh$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.DBGfIDnh.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$defu$2f$dist$2f$defu$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/defu/dist/defu.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$CW6D9eSx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.CW6D9eSx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$crypto$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/crypto/index.mjs [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-fetch/fetch/dist/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$VTXNLFMT$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.VTXNLFMT.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DdzSJf$2d$n$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.DdzSJf-n.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$tB5eU6EY$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.tB5eU6EY.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hmac$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/hmac.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$binary$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/binary.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$random$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/random.mjs [app-ssr] (ecmascript)");
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
;
;
;
;
;
;
;
;
;
const defaultKeyHasher = async (otp)=>{
    const hash = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hash$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createHash"])("SHA-256").digest(new TextEncoder().encode(otp));
    const hashed = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$base64$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["base64Url"].encode(new Uint8Array(hash), {
        padding: false
    });
    return hashed;
};
const magicLink = (options)=>{
    const opts = {
        storeToken: "plain",
        ...options
    };
    async function storeToken(ctx, token) {
        if (opts.storeToken === "hashed") {
            return await defaultKeyHasher(token);
        }
        if (typeof opts.storeToken === "object" && "type" in opts.storeToken && opts.storeToken.type === "custom-hasher") {
            return await opts.storeToken.hash(token);
        }
        return token;
    }
    return {
        id: "magic-link",
        endpoints: {
            /**
       * ### Endpoint
       *
       * POST `/sign-in/magic-link`
       *
       * ### API Methods
       *
       * **server:**
       * `auth.api.signInMagicLink`
       *
       * **client:**
       * `authClient.signIn.magicLink`
       *
       * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/sign-in#api-method-sign-in-magic-link)
       */ signInMagicLink: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["j"])("/sign-in/magic-link", {
                method: "POST",
                requireHeaders: true,
                body: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["object"]({
                    email: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"]().meta({
                        description: "Email address to send the magic link"
                    }).email(),
                    name: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"]().meta({
                        description: 'User display name. Only used if the user is registering for the first time. Eg: "my-name"'
                    }).optional(),
                    callbackURL: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"]().meta({
                        description: "URL to redirect after magic link verification"
                    }).optional(),
                    newUserCallbackURL: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"]().meta({
                        description: "URL to redirect after new user signup. Only used if the user is registering for the first time."
                    }).optional(),
                    errorCallbackURL: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"]().meta({
                        description: "URL to redirect after error."
                    }).optional()
                }),
                metadata: {
                    openapi: {
                        description: "Sign in with magic link",
                        responses: {
                            200: {
                                description: "Success",
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object",
                                            properties: {
                                                status: {
                                                    type: "boolean"
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }, async (ctx)=>{
                const { email } = ctx.body;
                if (opts.disableSignUp) {
                    const user = await ctx.context.internalAdapter.findUserByEmail(email);
                    if (!user) {
                        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
                            message: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["B"].USER_NOT_FOUND
                        });
                    }
                }
                const verificationToken = opts?.generateToken ? await opts.generateToken(email) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$B4Qoxdgc$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["g"])(32, "a-z", "A-Z");
                const storedToken = await storeToken(ctx, verificationToken);
                await ctx.context.internalAdapter.createVerificationValue({
                    identifier: storedToken,
                    value: JSON.stringify({
                        email,
                        name: ctx.body.name
                    }),
                    expiresAt: new Date(Date.now() + (opts.expiresIn || 60 * 5) * 1e3)
                }, ctx);
                const realBaseURL = new URL(ctx.context.baseURL);
                const url = new URL(`${realBaseURL.pathname}/magic-link/verify`, realBaseURL.origin);
                url.searchParams.set("token", verificationToken);
                url.searchParams.set("callbackURL", ctx.body.callbackURL || "/");
                if (ctx.body.newUserCallbackURL) {
                    url.searchParams.set("newUserCallbackURL", ctx.body.newUserCallbackURL);
                }
                if (ctx.body.errorCallbackURL) {
                    url.searchParams.set("errorCallbackURL", ctx.body.errorCallbackURL);
                }
                await options.sendMagicLink({
                    email,
                    url: url.toString(),
                    token: verificationToken
                }, ctx.request);
                return ctx.json({
                    status: true
                });
            }),
            /**
       * ### Endpoint
       *
       * GET `/magic-link/verify`
       *
       * ### API Methods
       *
       * **server:**
       * `auth.api.magicLinkVerify`
       *
       * **client:**
       * `authClient.magicLink.verify`
       *
       * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/magic-link#api-method-magic-link-verify)
       */ magicLinkVerify: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["j"])("/magic-link/verify", {
                method: "GET",
                query: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["object"]({
                    token: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"]().meta({
                        description: "Verification token"
                    }),
                    callbackURL: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"]().meta({
                        description: 'URL to redirect after magic link verification, if not provided the user will be redirected to the root URL. Eg: "/dashboard"'
                    }).optional(),
                    errorCallbackURL: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"]().meta({
                        description: "URL to redirect after error."
                    }).optional(),
                    newUserCallbackURL: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"]().meta({
                        description: "URL to redirect after new user signup. Only used if the user is registering for the first time."
                    }).optional()
                }),
                use: [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["o"])((ctx)=>{
                        return ctx.query.callbackURL ? decodeURIComponent(ctx.query.callbackURL) : "/";
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["o"])((ctx)=>{
                        return ctx.query.newUserCallbackURL ? decodeURIComponent(ctx.query.newUserCallbackURL) : "/";
                    }),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["o"])((ctx)=>{
                        return ctx.query.errorCallbackURL ? decodeURIComponent(ctx.query.errorCallbackURL) : "/";
                    })
                ],
                requireHeaders: true,
                metadata: {
                    openapi: {
                        description: "Verify magic link",
                        responses: {
                            200: {
                                description: "Success",
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object",
                                            properties: {
                                                session: {
                                                    $ref: "#/components/schemas/Session"
                                                },
                                                user: {
                                                    $ref: "#/components/schemas/User"
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }, async (ctx)=>{
                const token = ctx.query.token;
                const callbackURL = new URL(ctx.query.callbackURL ? decodeURIComponent(ctx.query.callbackURL) : "/", ctx.context.baseURL).toString();
                const errorCallbackURL = new URL(ctx.query.errorCallbackURL ? decodeURIComponent(ctx.query.errorCallbackURL) : callbackURL, ctx.context.baseURL).toString();
                const newUserCallbackURL = new URL(ctx.query.newUserCallbackURL ? decodeURIComponent(ctx.query.newUserCallbackURL) : callbackURL, ctx.context.baseURL).toString();
                callbackURL?.startsWith("http") ? callbackURL : callbackURL ? `${ctx.context.options.baseURL}${callbackURL}` : ctx.context.options.baseURL;
                const storedToken = await storeToken(ctx, token);
                const tokenValue = await ctx.context.internalAdapter.findVerificationValue(storedToken);
                if (!tokenValue) {
                    throw ctx.redirect(`${errorCallbackURL}?error=INVALID_TOKEN`);
                }
                if (tokenValue.expiresAt < /* @__PURE__ */ new Date()) {
                    await ctx.context.internalAdapter.deleteVerificationValue(tokenValue.id);
                    throw ctx.redirect(`${errorCallbackURL}?error=EXPIRED_TOKEN`);
                }
                await ctx.context.internalAdapter.deleteVerificationValue(tokenValue.id);
                const { email, name } = JSON.parse(tokenValue.value);
                let isNewUser = false;
                let user = await ctx.context.internalAdapter.findUserByEmail(email).then((res)=>res?.user);
                if (!user) {
                    if (!opts.disableSignUp) {
                        const newUser = await ctx.context.internalAdapter.createUser({
                            email,
                            emailVerified: true,
                            name: name || ""
                        }, ctx);
                        isNewUser = true;
                        user = newUser;
                        if (!user) {
                            throw ctx.redirect(`${errorCallbackURL}?error=failed_to_create_user`);
                        }
                    } else {
                        throw ctx.redirect(`${errorCallbackURL}?error=new_user_signup_disabled`);
                    }
                }
                if (!user.emailVerified) {
                    await ctx.context.internalAdapter.updateUser(user.id, {
                        emailVerified: true
                    }, ctx);
                }
                const session = await ctx.context.internalAdapter.createSession(user.id, ctx);
                if (!session) {
                    throw ctx.redirect(`${errorCallbackURL}?error=failed_to_create_session`);
                }
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$cookies$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setSessionCookie"])(ctx, {
                    session,
                    user
                });
                if (!ctx.query.callbackURL) {
                    return ctx.json({
                        token: session.token,
                        user: {
                            id: user.id,
                            email: user.email,
                            emailVerified: user.emailVerified,
                            name: user.name,
                            image: user.image,
                            createdAt: user.createdAt,
                            updatedAt: user.updatedAt
                        }
                    });
                }
                if (isNewUser) {
                    throw ctx.redirect(newUserCallbackURL);
                }
                throw ctx.redirect(callbackURL);
            })
        },
        rateLimit: [
            {
                pathMatcher (path) {
                    return path.startsWith("/sign-in/magic-link") || path.startsWith("/magic-link/verify");
                },
                window: opts.rateLimit?.window || 60,
                max: opts.rateLimit?.max || 5
            }
        ]
    };
};
;
}),
"[project]/packages/better-auth/dist/plugins/phone-number/index.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "phoneNumber": ()=>phoneNumber
});
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/node_modules/zod/v4/classic/schemas.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.D4HhkCZJ.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/better-call/dist/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$n2KFGwjY$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.n2KFGwjY.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$B4Qoxdgc$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.B4Qoxdgc.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$cookies$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/cookies/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$8zoxzg$2d$F$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.8zoxzg-F.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DBGfIDnh$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.DBGfIDnh.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$defu$2f$dist$2f$defu$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/defu/dist/defu.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$CW6D9eSx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.CW6D9eSx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hash$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/hash.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$base64$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/base64.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$crypto$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/crypto/index.mjs [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/index.mjs [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hex$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/hex.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-fetch/fetch/dist/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$VTXNLFMT$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.VTXNLFMT.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DdzSJf$2d$n$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.DdzSJf-n.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$tB5eU6EY$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.tB5eU6EY.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hmac$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/hmac.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$binary$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/binary.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$random$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/random.mjs [app-ssr] (ecmascript)");
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
;
;
;
;
;
;
;
;
;
const ERROR_CODES = {
    INVALID_PHONE_NUMBER: "Invalid phone number",
    PHONE_NUMBER_EXIST: "Phone number already exists",
    INVALID_PHONE_NUMBER_OR_PASSWORD: "Invalid phone number or password",
    UNEXPECTED_ERROR: "Unexpected error",
    OTP_NOT_FOUND: "OTP not found",
    OTP_EXPIRED: "OTP expired",
    INVALID_OTP: "Invalid OTP",
    PHONE_NUMBER_NOT_VERIFIED: "Phone number not verified"
};
function generateOTP(size) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$B4Qoxdgc$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["g"])(size, "0-9");
}
const phoneNumber = (options)=>{
    const opts = {
        expiresIn: options?.expiresIn || 300,
        otpLength: options?.otpLength || 6,
        ...options,
        phoneNumber: "phoneNumber",
        phoneNumberVerified: "phoneNumberVerified",
        code: "code",
        createdAt: "createdAt"
    };
    return {
        id: "phone-number",
        endpoints: {
            /**
       * ### Endpoint
       *
       * POST `/sign-in/phone-number`
       *
       * ### API Methods
       *
       * **server:**
       * `auth.api.signInPhoneNumber`
       *
       * **client:**
       * `authClient.signIn.phoneNumber`
       *
       * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/phone-number#api-method-sign-in-phone-number)
       */ signInPhoneNumber: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["j"])("/sign-in/phone-number", {
                method: "POST",
                body: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["object"]({
                    phoneNumber: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"]().meta({
                        description: 'Phone number to sign in. Eg: "+1234567890"'
                    }),
                    password: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"]().meta({
                        description: "Password to use for sign in."
                    }),
                    rememberMe: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["boolean"]().meta({
                        description: "Remember the session. Eg: true"
                    }).optional()
                }),
                metadata: {
                    openapi: {
                        summary: "Sign in with phone number",
                        description: "Use this endpoint to sign in with phone number",
                        responses: {
                            200: {
                                description: "Success",
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object",
                                            properties: {
                                                user: {
                                                    $ref: "#/components/schemas/User"
                                                },
                                                session: {
                                                    $ref: "#/components/schemas/Session"
                                                }
                                            }
                                        }
                                    }
                                }
                            },
                            400: {
                                description: "Invalid phone number or password"
                            }
                        }
                    }
                }
            }, async (ctx)=>{
                const { password, phoneNumber: phoneNumber2 } = ctx.body;
                if (opts.phoneNumberValidator) {
                    const isValidNumber = await opts.phoneNumberValidator(ctx.body.phoneNumber);
                    if (!isValidNumber) {
                        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
                            message: ERROR_CODES.INVALID_PHONE_NUMBER
                        });
                    }
                }
                const user = await ctx.context.adapter.findOne({
                    model: "user",
                    where: [
                        {
                            field: "phoneNumber",
                            value: phoneNumber2
                        }
                    ]
                });
                if (!user) {
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("UNAUTHORIZED", {
                        message: ERROR_CODES.INVALID_PHONE_NUMBER_OR_PASSWORD
                    });
                }
                if (opts.requireVerification) {
                    if (!user.phoneNumberVerified) {
                        const otp = generateOTP(opts.otpLength);
                        await ctx.context.internalAdapter.createVerificationValue({
                            value: otp,
                            identifier: phoneNumber2,
                            expiresAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$CW6D9eSx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["g"])(opts.expiresIn, "sec")
                        }, ctx);
                        await opts.sendOTP?.({
                            phoneNumber: phoneNumber2,
                            code: otp
                        }, ctx.request);
                        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("UNAUTHORIZED", {
                            message: ERROR_CODES.PHONE_NUMBER_NOT_VERIFIED
                        });
                    }
                }
                const accounts = await ctx.context.internalAdapter.findAccountByUserId(user.id);
                const credentialAccount = accounts.find((a)=>a.providerId === "credential");
                if (!credentialAccount) {
                    ctx.context.logger.error("Credential account not found", {
                        phoneNumber: phoneNumber2
                    });
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("UNAUTHORIZED", {
                        message: ERROR_CODES.INVALID_PHONE_NUMBER_OR_PASSWORD
                    });
                }
                const currentPassword = credentialAccount?.password;
                if (!currentPassword) {
                    ctx.context.logger.error("Password not found", {
                        phoneNumber: phoneNumber2
                    });
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("UNAUTHORIZED", {
                        message: ERROR_CODES.UNEXPECTED_ERROR
                    });
                }
                const validPassword = await ctx.context.password.verify({
                    hash: currentPassword,
                    password
                });
                if (!validPassword) {
                    ctx.context.logger.error("Invalid password");
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("UNAUTHORIZED", {
                        message: ERROR_CODES.INVALID_PHONE_NUMBER_OR_PASSWORD
                    });
                }
                const session = await ctx.context.internalAdapter.createSession(user.id, ctx, ctx.body.rememberMe === false);
                if (!session) {
                    ctx.context.logger.error("Failed to create session");
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("UNAUTHORIZED", {
                        message: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["B"].FAILED_TO_CREATE_SESSION
                    });
                }
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$cookies$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setSessionCookie"])(ctx, {
                    session,
                    user
                }, ctx.body.rememberMe === false);
                return ctx.json({
                    token: session.token,
                    user: {
                        id: user.id,
                        email: user.email,
                        emailVerified: user.emailVerified,
                        name: user.name,
                        image: user.image,
                        phoneNumber: user.phoneNumber,
                        phoneNumberVerified: user.phoneNumberVerified,
                        createdAt: user.createdAt,
                        updatedAt: user.updatedAt
                    }
                });
            }),
            /**
       * ### Endpoint
       *
       * POST `/phone-number/send-otp`
       *
       * ### API Methods
       *
       * **server:**
       * `auth.api.sendPhoneNumberOTP`
       *
       * **client:**
       * `authClient.phoneNumber.sendOtp`
       *
       * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/phone-number#api-method-phone-number-send-otp)
       */ sendPhoneNumberOTP: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["j"])("/phone-number/send-otp", {
                method: "POST",
                body: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["object"]({
                    phoneNumber: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"]().meta({
                        description: 'Phone number to send OTP. Eg: "+1234567890"'
                    })
                }),
                metadata: {
                    openapi: {
                        summary: "Send OTP to phone number",
                        description: "Use this endpoint to send OTP to phone number",
                        responses: {
                            200: {
                                description: "Success",
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object",
                                            properties: {
                                                message: {
                                                    type: "string"
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }, async (ctx)=>{
                if (!options?.sendOTP) {
                    ctx.context.logger.warn("sendOTP not implemented");
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("NOT_IMPLEMENTED", {
                        message: "sendOTP not implemented"
                    });
                }
                if (opts.phoneNumberValidator) {
                    const isValidNumber = await opts.phoneNumberValidator(ctx.body.phoneNumber);
                    if (!isValidNumber) {
                        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
                            message: ERROR_CODES.INVALID_PHONE_NUMBER
                        });
                    }
                }
                const code = generateOTP(opts.otpLength);
                await ctx.context.internalAdapter.createVerificationValue({
                    value: `${code}:0`,
                    identifier: ctx.body.phoneNumber,
                    expiresAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$CW6D9eSx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["g"])(opts.expiresIn, "sec")
                }, ctx);
                await options.sendOTP({
                    phoneNumber: ctx.body.phoneNumber,
                    code
                }, ctx.request);
                return ctx.json({
                    message: "code sent"
                });
            }),
            /**
       * ### Endpoint
       *
       * POST `/phone-number/verify`
       *
       * ### API Methods
       *
       * **server:**
       * `auth.api.verifyPhoneNumber`
       *
       * **client:**
       * `authClient.phoneNumber.verify`
       *
       * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/phone-number#api-method-phone-number-verify)
       */ verifyPhoneNumber: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["j"])("/phone-number/verify", {
                method: "POST",
                body: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["object"]({
                    /**
             * Phone number
             */ phoneNumber: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"]().meta({
                        description: 'Phone number to verify. Eg: "+1234567890"'
                    }),
                    /**
             * OTP code
             */ code: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"]().meta({
                        description: 'OTP code. Eg: "123456"'
                    }),
                    /**
             * Disable session creation after verification
             * @default false
             */ disableSession: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["boolean"]().meta({
                        description: "Disable session creation after verification. Eg: false"
                    }).optional(),
                    /**
             * This checks if there is a session already
             * and updates the phone number with the provided
             * phone number
             */ updatePhoneNumber: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["boolean"]().meta({
                        description: "Check if there is a session and update the phone number. Eg: true"
                    }).optional()
                }),
                metadata: {
                    openapi: {
                        summary: "Verify phone number",
                        description: "Use this endpoint to verify phone number",
                        responses: {
                            "200": {
                                description: "Phone number verified successfully",
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object",
                                            properties: {
                                                status: {
                                                    type: "boolean",
                                                    description: "Indicates if the verification was successful",
                                                    enum: [
                                                        true
                                                    ]
                                                },
                                                token: {
                                                    type: "string",
                                                    nullable: true,
                                                    description: "Session token if session is created, null if disableSession is true or no session is created"
                                                },
                                                user: {
                                                    type: "object",
                                                    nullable: true,
                                                    properties: {
                                                        id: {
                                                            type: "string",
                                                            description: "Unique identifier of the user"
                                                        },
                                                        email: {
                                                            type: "string",
                                                            format: "email",
                                                            nullable: true,
                                                            description: "User's email address"
                                                        },
                                                        emailVerified: {
                                                            type: "boolean",
                                                            nullable: true,
                                                            description: "Whether the email is verified"
                                                        },
                                                        name: {
                                                            type: "string",
                                                            nullable: true,
                                                            description: "User's name"
                                                        },
                                                        image: {
                                                            type: "string",
                                                            format: "uri",
                                                            nullable: true,
                                                            description: "User's profile image URL"
                                                        },
                                                        phoneNumber: {
                                                            type: "string",
                                                            description: "User's phone number"
                                                        },
                                                        phoneNumberVerified: {
                                                            type: "boolean",
                                                            description: "Whether the phone number is verified"
                                                        },
                                                        createdAt: {
                                                            type: "string",
                                                            format: "date-time",
                                                            description: "Timestamp when the user was created"
                                                        },
                                                        updatedAt: {
                                                            type: "string",
                                                            format: "date-time",
                                                            description: "Timestamp when the user was last updated"
                                                        }
                                                    },
                                                    required: [
                                                        "id",
                                                        "phoneNumber",
                                                        "phoneNumberVerified",
                                                        "createdAt",
                                                        "updatedAt"
                                                    ],
                                                    description: "User object with phone number details, null if no user is created or found"
                                                }
                                            },
                                            required: [
                                                "status"
                                            ]
                                        }
                                    }
                                }
                            },
                            400: {
                                description: "Invalid OTP"
                            }
                        }
                    }
                }
            }, async (ctx)=>{
                const otp = await ctx.context.internalAdapter.findVerificationValue(ctx.body.phoneNumber);
                if (!otp || otp.expiresAt < /* @__PURE__ */ new Date()) {
                    if (otp && otp.expiresAt < /* @__PURE__ */ new Date()) {
                        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
                            message: "OTP expired"
                        });
                    }
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
                        message: ERROR_CODES.OTP_NOT_FOUND
                    });
                }
                const [otpValue, attempts] = otp.value.split(":");
                const allowedAttempts = options?.allowedAttempts || 3;
                if (attempts && parseInt(attempts) >= allowedAttempts) {
                    await ctx.context.internalAdapter.deleteVerificationValue(otp.id);
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("FORBIDDEN", {
                        message: "Too many attempts"
                    });
                }
                if (otpValue !== ctx.body.code) {
                    await ctx.context.internalAdapter.updateVerificationValue(otp.id, {
                        value: `${otpValue}:${parseInt(attempts || "0") + 1}`
                    });
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
                        message: "Invalid OTP"
                    });
                }
                await ctx.context.internalAdapter.deleteVerificationValue(otp.id);
                if (ctx.body.updatePhoneNumber) {
                    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["k"])(ctx);
                    if (!session) {
                        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("UNAUTHORIZED", {
                            message: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["B"].USER_NOT_FOUND
                        });
                    }
                    const existingUser = await ctx.context.adapter.findMany({
                        model: "user",
                        where: [
                            {
                                field: "phoneNumber",
                                value: ctx.body.phoneNumber
                            }
                        ]
                    });
                    if (existingUser.length) {
                        throw ctx.error("BAD_REQUEST", {
                            message: ERROR_CODES.PHONE_NUMBER_EXIST
                        });
                    }
                    let user2 = await ctx.context.internalAdapter.updateUser(session.user.id, {
                        [opts.phoneNumber]: ctx.body.phoneNumber,
                        [opts.phoneNumberVerified]: true
                    }, ctx);
                    return ctx.json({
                        status: true,
                        token: session.session.token,
                        user: {
                            id: user2.id,
                            email: user2.email,
                            emailVerified: user2.emailVerified,
                            name: user2.name,
                            image: user2.image,
                            phoneNumber: user2.phoneNumber,
                            phoneNumberVerified: user2.phoneNumberVerified,
                            createdAt: user2.createdAt,
                            updatedAt: user2.updatedAt
                        }
                    });
                }
                let user = await ctx.context.adapter.findOne({
                    model: "user",
                    where: [
                        {
                            value: ctx.body.phoneNumber,
                            field: opts.phoneNumber
                        }
                    ]
                });
                if (!user) {
                    if (options?.signUpOnVerification) {
                        user = await ctx.context.internalAdapter.createUser({
                            email: options.signUpOnVerification.getTempEmail(ctx.body.phoneNumber),
                            name: options.signUpOnVerification.getTempName ? options.signUpOnVerification.getTempName(ctx.body.phoneNumber) : ctx.body.phoneNumber,
                            [opts.phoneNumber]: ctx.body.phoneNumber,
                            [opts.phoneNumberVerified]: true
                        }, ctx);
                        if (!user) {
                            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("INTERNAL_SERVER_ERROR", {
                                message: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["B"].FAILED_TO_CREATE_USER
                            });
                        }
                    }
                } else {
                    user = await ctx.context.internalAdapter.updateUser(user.id, {
                        [opts.phoneNumberVerified]: true
                    }, ctx);
                }
                if (!user) {
                    return ctx.json(null);
                }
                await options?.callbackOnVerification?.({
                    phoneNumber: ctx.body.phoneNumber,
                    user
                }, ctx.request);
                if (!user) {
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("INTERNAL_SERVER_ERROR", {
                        message: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["B"].FAILED_TO_UPDATE_USER
                    });
                }
                if (!ctx.body.disableSession) {
                    const session = await ctx.context.internalAdapter.createSession(user.id, ctx);
                    if (!session) {
                        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("INTERNAL_SERVER_ERROR", {
                            message: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["B"].FAILED_TO_CREATE_SESSION
                        });
                    }
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$cookies$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setSessionCookie"])(ctx, {
                        session,
                        user
                    });
                    return ctx.json({
                        status: true,
                        token: session.token,
                        user: {
                            id: user.id,
                            email: user.email,
                            emailVerified: user.emailVerified,
                            name: user.name,
                            image: user.image,
                            phoneNumber: user.phoneNumber,
                            phoneNumberVerified: user.phoneNumberVerified,
                            createdAt: user.createdAt,
                            updatedAt: user.updatedAt
                        }
                    });
                }
                return ctx.json({
                    status: true,
                    token: null,
                    user: {
                        id: user.id,
                        email: user.email,
                        emailVerified: user.emailVerified,
                        name: user.name,
                        image: user.image,
                        phoneNumber: user.phoneNumber,
                        phoneNumberVerified: user.phoneNumberVerified,
                        createdAt: user.createdAt,
                        updatedAt: user.updatedAt
                    }
                });
            }),
            /**
       * @deprecated Use requestPasswordResetPhoneNumber instead. This endpoint will be removed in the next major version.
       */ forgetPasswordPhoneNumber: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["j"])("/phone-number/forget-password", {
                method: "POST",
                body: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["object"]({
                    phoneNumber: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"]().meta({
                        description: `The phone number which is associated with the user. Eg: "+1234567890"`
                    })
                }),
                metadata: {
                    openapi: {
                        description: "Request OTP for password reset via phone number",
                        responses: {
                            "200": {
                                description: "OTP sent successfully for password reset",
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object",
                                            properties: {
                                                status: {
                                                    type: "boolean",
                                                    description: "Indicates if the OTP was sent successfully",
                                                    enum: [
                                                        true
                                                    ]
                                                }
                                            },
                                            required: [
                                                "status"
                                            ]
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }, async (ctx)=>{
                const user = await ctx.context.adapter.findOne({
                    model: "user",
                    where: [
                        {
                            value: ctx.body.phoneNumber,
                            field: opts.phoneNumber
                        }
                    ]
                });
                if (!user) {
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
                        message: "phone number isn't registered"
                    });
                }
                const code = generateOTP(opts.otpLength);
                await ctx.context.internalAdapter.createVerificationValue({
                    value: `${code}:0`,
                    identifier: `${ctx.body.phoneNumber}-request-password-reset`,
                    expiresAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$CW6D9eSx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["g"])(opts.expiresIn, "sec")
                }, ctx);
                await options?.sendForgetPasswordOTP?.({
                    phoneNumber: ctx.body.phoneNumber,
                    code
                }, ctx.request);
                return ctx.json({
                    status: true
                });
            }),
            requestPasswordResetPhoneNumber: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["j"])("/phone-number/request-password-reset", {
                method: "POST",
                body: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["object"]({
                    phoneNumber: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"]()
                }),
                metadata: {
                    openapi: {
                        description: "Request OTP for password reset via phone number",
                        responses: {
                            "200": {
                                description: "OTP sent successfully for password reset",
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object",
                                            properties: {
                                                status: {
                                                    type: "boolean",
                                                    description: "Indicates if the OTP was sent successfully",
                                                    enum: [
                                                        true
                                                    ]
                                                }
                                            },
                                            required: [
                                                "status"
                                            ]
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }, async (ctx)=>{
                const user = await ctx.context.adapter.findOne({
                    model: "user",
                    where: [
                        {
                            value: ctx.body.phoneNumber,
                            field: opts.phoneNumber
                        }
                    ]
                });
                if (!user) {
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
                        message: "phone number isn't registered"
                    });
                }
                const code = generateOTP(opts.otpLength);
                await ctx.context.internalAdapter.createVerificationValue({
                    value: `${code}:0`,
                    identifier: `${ctx.body.phoneNumber}-request-password-reset`,
                    expiresAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$CW6D9eSx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["g"])(opts.expiresIn, "sec")
                }, ctx);
                await options?.sendPasswordResetOTP?.({
                    phoneNumber: ctx.body.phoneNumber,
                    code
                }, ctx.request);
                return ctx.json({
                    status: true
                });
            }),
            resetPasswordPhoneNumber: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["j"])("/phone-number/reset-password", {
                method: "POST",
                body: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["object"]({
                    otp: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"]().meta({
                        description: 'The one time password to reset the password. Eg: "123456"'
                    }),
                    phoneNumber: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"]().meta({
                        description: 'The phone number to the account which intends to reset the password for. Eg: "+1234567890"'
                    }),
                    newPassword: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"]().meta({
                        description: `The new password. Eg: "new-and-secure-password"`
                    })
                }),
                metadata: {
                    openapi: {
                        description: "Reset password using phone number OTP",
                        responses: {
                            "200": {
                                description: "Password reset successfully",
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object",
                                            properties: {
                                                status: {
                                                    type: "boolean",
                                                    description: "Indicates if the password was reset successfully",
                                                    enum: [
                                                        true
                                                    ]
                                                }
                                            },
                                            required: [
                                                "status"
                                            ]
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }, async (ctx)=>{
                const verification = await ctx.context.internalAdapter.findVerificationValue(`${ctx.body.phoneNumber}-request-password-reset`);
                if (!verification) {
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
                        message: ERROR_CODES.OTP_NOT_FOUND
                    });
                }
                if (verification.expiresAt < /* @__PURE__ */ new Date()) {
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
                        message: ERROR_CODES.OTP_EXPIRED
                    });
                }
                const [otpValue, attempts] = verification.value.split(":");
                const allowedAttempts = options?.allowedAttempts || 3;
                if (attempts && parseInt(attempts) >= allowedAttempts) {
                    await ctx.context.internalAdapter.deleteVerificationValue(verification.id);
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("FORBIDDEN", {
                        message: "Too many attempts"
                    });
                }
                if (ctx.body.otp !== otpValue) {
                    await ctx.context.internalAdapter.updateVerificationValue(verification.id, {
                        value: `${otpValue}:${parseInt(attempts || "0") + 1}`
                    });
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
                        message: ERROR_CODES.INVALID_OTP
                    });
                }
                const user = await ctx.context.adapter.findOne({
                    model: "user",
                    where: [
                        {
                            field: "phoneNumber",
                            value: ctx.body.phoneNumber
                        }
                    ]
                });
                if (!user) {
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
                        message: ERROR_CODES.UNEXPECTED_ERROR
                    });
                }
                const hashedPassword = await ctx.context.password.hash(ctx.body.newPassword);
                await ctx.context.internalAdapter.updatePassword(user.id, hashedPassword);
                await ctx.context.internalAdapter.deleteVerificationValue(verification.id);
                return ctx.json({
                    status: true
                });
            })
        },
        schema: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$n2KFGwjY$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["m"])(schema, options?.schema),
        rateLimit: [
            {
                pathMatcher (path) {
                    return path.startsWith("/phone-number");
                },
                window: 60 * 1e3,
                max: 10
            }
        ],
        $ERROR_CODES: ERROR_CODES
    };
};
const schema = {
    user: {
        fields: {
            phoneNumber: {
                type: "string",
                required: false,
                unique: true,
                sortable: true,
                returned: true
            },
            phoneNumberVerified: {
                type: "boolean",
                required: false,
                returned: true,
                input: false
            }
        }
    }
};
;
}),
"[project]/packages/better-auth/dist/plugins/anonymous/index.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "anonymous": ()=>anonymous
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/better-call/dist/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.D4HhkCZJ.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$cookies$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/cookies/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$n2KFGwjY$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.n2KFGwjY.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$8zoxzg$2d$F$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.8zoxzg-F.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DBGfIDnh$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.DBGfIDnh.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$defu$2f$dist$2f$defu$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/defu/dist/defu.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$VTXNLFMT$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.VTXNLFMT.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$CW6D9eSx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.CW6D9eSx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hash$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/hash.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$base64$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/base64.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$crypto$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/crypto/index.mjs [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/index.mjs [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hex$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/hex.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$B4Qoxdgc$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.B4Qoxdgc.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$random$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/random.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-fetch/fetch/dist/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$tB5eU6EY$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.tB5eU6EY.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hmac$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/hmac.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$binary$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/binary.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DdzSJf$2d$n$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.DdzSJf-n.mjs [app-ssr] (ecmascript)");
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
;
;
;
;
;
;
;
;
;
const schema = {
    user: {
        fields: {
            isAnonymous: {
                type: "boolean",
                required: false
            }
        }
    }
};
const anonymous = (options)=>{
    const ERROR_CODES = {
        FAILED_TO_CREATE_USER: "Failed to create user",
        COULD_NOT_CREATE_SESSION: "Could not create session",
        ANONYMOUS_USERS_CANNOT_SIGN_IN_AGAIN_ANONYMOUSLY: "Anonymous users cannot sign in again anonymously"
    };
    return {
        id: "anonymous",
        endpoints: {
            signInAnonymous: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["j"])("/sign-in/anonymous", {
                method: "POST",
                metadata: {
                    openapi: {
                        description: "Sign in anonymously",
                        responses: {
                            200: {
                                description: "Sign in anonymously",
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object",
                                            properties: {
                                                user: {
                                                    $ref: "#/components/schemas/User"
                                                },
                                                session: {
                                                    $ref: "#/components/schemas/Session"
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }, async (ctx)=>{
                const { emailDomainName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$VTXNLFMT$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["g"])(ctx.context.baseURL) } = options || {};
                const id = ctx.context.generateId({
                    model: "user"
                });
                const email = `temp-${id}@${emailDomainName}`;
                const name = await options?.generateName?.(ctx) || "Anonymous";
                const newUser = await ctx.context.internalAdapter.createUser({
                    email,
                    emailVerified: false,
                    isAnonymous: true,
                    name,
                    createdAt: /* @__PURE__ */ new Date(),
                    updatedAt: /* @__PURE__ */ new Date()
                }, ctx);
                if (!newUser) {
                    throw ctx.error("INTERNAL_SERVER_ERROR", {
                        message: ERROR_CODES.FAILED_TO_CREATE_USER
                    });
                }
                const session = await ctx.context.internalAdapter.createSession(newUser.id, ctx);
                if (!session) {
                    return ctx.json(null, {
                        status: 400,
                        body: {
                            message: ERROR_CODES.COULD_NOT_CREATE_SESSION
                        }
                    });
                }
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$cookies$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setSessionCookie"])(ctx, {
                    session,
                    user: newUser
                });
                return ctx.json({
                    token: session.token,
                    user: {
                        id: newUser.id,
                        email: newUser.email,
                        emailVerified: newUser.emailVerified,
                        name: newUser.name,
                        createdAt: newUser.createdAt,
                        updatedAt: newUser.updatedAt
                    }
                });
            })
        },
        hooks: {
            after: [
                {
                    matcher (ctx) {
                        return ctx.path.startsWith("/sign-in") || ctx.path.startsWith("/sign-up") || ctx.path.startsWith("/callback") || ctx.path.startsWith("/oauth2/callback") || ctx.path.startsWith("/magic-link/verify") || ctx.path.startsWith("/email-otp/verify-email") || ctx.path.startsWith("/one-tap/callback") || ctx.path.startsWith("/passkey/verify-authentication");
                    },
                    handler: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["i"])(async (ctx)=>{
                        const setCookie = ctx.context.responseHeaders?.get("set-cookie");
                        const sessionTokenName = ctx.context.authCookies.sessionToken.name;
                        const sessionCookie = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$cookies$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseSetCookieHeader"])(setCookie || "").get(sessionTokenName)?.value.split(".")[0];
                        if (!sessionCookie) {
                            return;
                        }
                        const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["k"])(ctx, {
                            disableRefresh: true
                        });
                        if (!session || !session.user.isAnonymous) {
                            return;
                        }
                        if (ctx.path === "/sign-in/anonymous") {
                            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
                                message: ERROR_CODES.ANONYMOUS_USERS_CANNOT_SIGN_IN_AGAIN_ANONYMOUSLY
                            });
                        }
                        const newSession = ctx.context.newSession;
                        if (!newSession) {
                            return;
                        }
                        if (options?.onLinkAccount) {
                            await options?.onLinkAccount?.({
                                anonymousUser: session,
                                newUser: newSession
                            });
                        }
                        if (!options?.disableDeleteAnonymousUser) {
                            await ctx.context.internalAdapter.deleteUser(session.user.id);
                        }
                    })
                }
            ]
        },
        schema: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$n2KFGwjY$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["m"])(schema, options?.schema),
        $ERROR_CODES: ERROR_CODES
    };
};
;
}),
"[project]/packages/better-auth/dist/plugins/admin/access/index.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "adminAc": ()=>adminAc,
    "defaultAc": ()=>defaultAc,
    "defaultRoles": ()=>defaultRoles,
    "defaultStatements": ()=>defaultStatements,
    "userAc": ()=>userAc
});
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$plugins$2f$access$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/plugins/access/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DdzSJf$2d$n$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.DdzSJf-n.mjs [app-ssr] (ecmascript)");
;
;
const defaultStatements = {
    user: [
        "create",
        "list",
        "set-role",
        "ban",
        "impersonate",
        "delete",
        "set-password",
        "update"
    ],
    session: [
        "list",
        "revoke",
        "delete"
    ]
};
const defaultAc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$plugins$2f$access$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createAccessControl"])(defaultStatements);
const adminAc = defaultAc.newRole({
    user: [
        "create",
        "list",
        "set-role",
        "ban",
        "impersonate",
        "delete",
        "set-password",
        "update"
    ],
    session: [
        "list",
        "revoke",
        "delete"
    ]
});
const userAc = defaultAc.newRole({
    user: [],
    session: []
});
const defaultRoles = {
    admin: adminAc,
    user: userAc
};
;
}),
"[project]/packages/better-auth/dist/plugins/generic-oauth/index.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "genericOAuth": ()=>genericOAuth
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-fetch/fetch/dist/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/better-call/dist/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$node$2f$esm$2f$util$2f$decode_jwt$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jose/dist/node/esm/util/decode_jwt.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/node_modules/zod/v4/classic/schemas.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.D4HhkCZJ.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$cookies$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/cookies/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$n2KFGwjY$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.n2KFGwjY.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$8zoxzg$2d$F$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.8zoxzg-F.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DBGfIDnh$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.DBGfIDnh.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$defu$2f$dist$2f$defu$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/defu/dist/defu.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hash$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/hash.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$base64$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/base64.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/index.mjs [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hex$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/hex.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$B4Qoxdgc$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.B4Qoxdgc.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$CW6D9eSx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.CW6D9eSx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$crypto$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/crypto/index.mjs [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$VTXNLFMT$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.VTXNLFMT.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DdzSJf$2d$n$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.DdzSJf-n.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$tB5eU6EY$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.tB5eU6EY.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hmac$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/hmac.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$binary$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/binary.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$random$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/random.mjs [app-ssr] (ecmascript)");
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
;
;
;
;
;
;
;
;
;
async function getUserInfo(tokens, finalUserInfoUrl) {
    if (tokens.idToken) {
        const decoded = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$node$2f$esm$2f$util$2f$decode_jwt$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["decodeJwt"])(tokens.idToken);
        if (decoded) {
            if (decoded.sub && decoded.email) {
                return {
                    id: decoded.sub,
                    emailVerified: decoded.email_verified,
                    image: decoded.picture,
                    ...decoded
                };
            }
        }
    }
    if (!finalUserInfoUrl) {
        return null;
    }
    const userInfo = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["betterFetch"])(finalUserInfoUrl, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${tokens.accessToken}`
        }
    });
    return {
        id: userInfo.data?.sub,
        emailVerified: userInfo.data?.email_verified,
        email: userInfo.data?.email,
        image: userInfo.data?.picture,
        name: userInfo.data?.name,
        ...userInfo.data
    };
}
const genericOAuth = (options)=>{
    const ERROR_CODES = {
        INVALID_OAUTH_CONFIGURATION: "Invalid OAuth configuration"
    };
    return {
        id: "generic-oauth",
        init: (ctx)=>{
            const genericProviders = options.config.map((c)=>{
                let finalUserInfoUrl = c.userInfoUrl;
                return {
                    id: c.providerId,
                    name: c.providerId,
                    createAuthorizationURL (data) {
                        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["c"])({
                            id: c.providerId,
                            options: {
                                clientId: c.clientId,
                                clientSecret: c.clientSecret,
                                redirectURI: c.redirectURI
                            },
                            authorizationEndpoint: c.authorizationUrl,
                            state: data.state,
                            codeVerifier: c.pkce ? data.codeVerifier : void 0,
                            scopes: c.scopes || [],
                            redirectURI: `${ctx.baseURL}/oauth2/callback/${c.providerId}`
                        });
                    },
                    async validateAuthorizationCode (data) {
                        let finalTokenUrl = c.tokenUrl;
                        if (c.discoveryUrl) {
                            const discovery = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["betterFetch"])(c.discoveryUrl, {
                                method: "GET",
                                headers: c.discoveryHeaders
                            });
                            if (discovery.data) {
                                finalTokenUrl = discovery.data.token_endpoint;
                                finalUserInfoUrl = discovery.data.userinfo_endpoint;
                            }
                        }
                        if (!finalTokenUrl) {
                            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
                                message: "Invalid OAuth configuration. Token URL not found."
                            });
                        }
                        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["v"])({
                            headers: c.authorizationHeaders,
                            code: data.code,
                            codeVerifier: data.codeVerifier,
                            redirectURI: data.redirectURI,
                            options: {
                                clientId: c.clientId,
                                clientSecret: c.clientSecret,
                                redirectURI: c.redirectURI
                            },
                            tokenEndpoint: finalTokenUrl,
                            authentication: c.authentication
                        });
                    },
                    async refreshAccessToken (refreshToken) {
                        let finalTokenUrl = c.tokenUrl;
                        if (c.discoveryUrl) {
                            const discovery = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["betterFetch"])(c.discoveryUrl, {
                                method: "GET",
                                headers: c.discoveryHeaders
                            });
                            if (discovery.data) {
                                finalTokenUrl = discovery.data.token_endpoint;
                            }
                        }
                        if (!finalTokenUrl) {
                            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
                                message: "Invalid OAuth configuration. Token URL not found."
                            });
                        }
                        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["r"])({
                            refreshToken,
                            options: {
                                clientId: c.clientId,
                                clientSecret: c.clientSecret
                            },
                            authentication: c.authentication,
                            tokenEndpoint: finalTokenUrl
                        });
                    },
                    async getUserInfo (tokens) {
                        const userInfo = c.getUserInfo ? await c.getUserInfo(tokens) : await getUserInfo(tokens, finalUserInfoUrl);
                        if (!userInfo) {
                            return null;
                        }
                        return {
                            user: {
                                id: userInfo?.id,
                                email: userInfo?.email,
                                emailVerified: userInfo?.emailVerified,
                                image: userInfo?.image,
                                name: userInfo?.name,
                                ...c.mapProfileToUser?.(userInfo)
                            },
                            data: userInfo
                        };
                    }
                };
            });
            return {
                context: {
                    socialProviders: genericProviders.concat(ctx.socialProviders)
                }
            };
        },
        endpoints: {
            /**
       * ### Endpoint
       *
       * POST `/sign-in/oauth2`
       *
       * ### API Methods
       *
       * **server:**
       * `auth.api.signInWithOAuth2`
       *
       * **client:**
       * `authClient.signIn.oauth2`
       *
       * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/sign-in#api-method-sign-in-oauth2)
       */ signInWithOAuth2: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["j"])("/sign-in/oauth2", {
                method: "POST",
                body: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["object"]({
                    providerId: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"]().meta({
                        description: "The provider ID for the OAuth provider"
                    }),
                    callbackURL: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"]().meta({
                        description: "The URL to redirect to after sign in"
                    }).optional(),
                    errorCallbackURL: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"]().meta({
                        description: "The URL to redirect to if an error occurs"
                    }).optional(),
                    newUserCallbackURL: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"]().meta({
                        description: 'The URL to redirect to after login if the user is new. Eg: "/welcome"'
                    }).optional(),
                    disableRedirect: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["boolean"]().meta({
                        description: "Disable redirect"
                    }).optional(),
                    scopes: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["array"](__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"]()).meta({
                        description: "Scopes to be passed to the provider authorization request."
                    }).optional(),
                    requestSignUp: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["boolean"]().meta({
                        description: "Explicitly request sign-up. Useful when disableImplicitSignUp is true for this provider. Eg: false"
                    }).optional()
                }),
                metadata: {
                    openapi: {
                        description: "Sign in with OAuth2",
                        responses: {
                            200: {
                                description: "Sign in with OAuth2",
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object",
                                            properties: {
                                                url: {
                                                    type: "string"
                                                },
                                                redirect: {
                                                    type: "boolean"
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }, async (ctx)=>{
                const { providerId } = ctx.body;
                const config = options.config.find((c)=>c.providerId === providerId);
                if (!config) {
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
                        message: `No config found for provider ${providerId}`
                    });
                }
                const { discoveryUrl, authorizationUrl, tokenUrl, clientId, clientSecret, scopes, redirectURI, responseType, pkce, prompt, accessType, authorizationUrlParams, responseMode, authentication } = config;
                let finalAuthUrl = authorizationUrl;
                let finalTokenUrl = tokenUrl;
                if (discoveryUrl) {
                    const discovery = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["betterFetch"])(discoveryUrl, {
                        method: "GET",
                        headers: config.discoveryHeaders,
                        onError (context) {
                            ctx.context.logger.error(context.error.message, context.error, {
                                discoveryUrl
                            });
                        }
                    });
                    if (discovery.data) {
                        finalAuthUrl = discovery.data.authorization_endpoint;
                        finalTokenUrl = discovery.data.token_endpoint;
                    }
                }
                if (!finalAuthUrl || !finalTokenUrl) {
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
                        message: ERROR_CODES.INVALID_OAUTH_CONFIGURATION
                    });
                }
                if (authorizationUrlParams) {
                    const withAdditionalParams = new URL(finalAuthUrl);
                    for (const [paramName, paramValue] of Object.entries(authorizationUrlParams)){
                        withAdditionalParams.searchParams.set(paramName, paramValue);
                    }
                    finalAuthUrl = withAdditionalParams.toString();
                }
                const { state, codeVerifier } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["g"])(ctx);
                const authUrl = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["c"])({
                    id: providerId,
                    options: {
                        clientId,
                        redirectURI
                    },
                    authorizationEndpoint: finalAuthUrl,
                    state,
                    codeVerifier: pkce ? codeVerifier : void 0,
                    scopes: ctx.body.scopes ? [
                        ...ctx.body.scopes,
                        ...scopes || []
                    ] : scopes || [],
                    redirectURI: `${ctx.context.baseURL}/oauth2/callback/${providerId}`,
                    prompt,
                    accessType,
                    responseType,
                    responseMode,
                    additionalParams: authorizationUrlParams
                });
                return ctx.json({
                    url: authUrl.toString(),
                    redirect: !ctx.body.disableRedirect
                });
            }),
            oAuth2Callback: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["j"])("/oauth2/callback/:providerId", {
                method: "GET",
                query: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["object"]({
                    code: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"]().meta({
                        description: "The OAuth2 code"
                    }).optional(),
                    error: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"]().meta({
                        description: "The error message, if any"
                    }).optional(),
                    error_description: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"]().meta({
                        description: "The error description, if any"
                    }).optional(),
                    state: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"]().meta({
                        description: "The state parameter from the OAuth2 request"
                    }).optional()
                }),
                metadata: {
                    client: false,
                    openapi: {
                        description: "OAuth2 callback",
                        responses: {
                            200: {
                                description: "OAuth2 callback",
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object",
                                            properties: {
                                                url: {
                                                    type: "string"
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }, async (ctx)=>{
                const defaultErrorURL = ctx.context.options.onAPIError?.errorURL || `${ctx.context.baseURL}/error`;
                if (ctx.query.error || !ctx.query.code) {
                    throw ctx.redirect(`${defaultErrorURL}?error=${ctx.query.error || "oAuth_code_missing"}&error_description=${ctx.query.error_description}`);
                }
                const provider = options.config.find((p)=>p.providerId === ctx.params.providerId);
                if (!provider) {
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
                        message: `No config found for provider ${ctx.params.providerId}`
                    });
                }
                let tokens = void 0;
                const parsedState = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["p"])(ctx);
                const { callbackURL, codeVerifier, errorURL, requestSignUp, newUserURL, link } = parsedState;
                const code = ctx.query.code;
                function redirectOnError(error) {
                    const defaultErrorURL2 = ctx.context.options.onAPIError?.errorURL || `${ctx.context.baseURL}/error`;
                    let url = errorURL || defaultErrorURL2;
                    if (url.includes("?")) {
                        url = `${url}&error=${error}`;
                    } else {
                        url = `${url}?error=${error}`;
                    }
                    throw ctx.redirect(url);
                }
                let finalTokenUrl = provider.tokenUrl;
                let finalUserInfoUrl = provider.userInfoUrl;
                if (provider.discoveryUrl) {
                    const discovery = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["betterFetch"])(provider.discoveryUrl, {
                        method: "GET",
                        headers: provider.discoveryHeaders
                    });
                    if (discovery.data) {
                        finalTokenUrl = discovery.data.token_endpoint;
                        finalUserInfoUrl = discovery.data.userinfo_endpoint;
                    }
                }
                try {
                    if (!finalTokenUrl) {
                        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
                            message: "Invalid OAuth configuration."
                        });
                    }
                    tokens = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["v"])({
                        headers: provider.authorizationHeaders,
                        code,
                        codeVerifier: provider.pkce ? codeVerifier : void 0,
                        redirectURI: `${ctx.context.baseURL}/oauth2/callback/${provider.providerId}`,
                        options: {
                            clientId: provider.clientId,
                            clientSecret: provider.clientSecret,
                            redirectURI: provider.redirectURI
                        },
                        tokenEndpoint: finalTokenUrl,
                        authentication: provider.authentication,
                        additionalParams: provider.tokenUrlParams
                    });
                } catch (e) {
                    ctx.context.logger.error(e && typeof e === "object" && "name" in e ? e.name : "", e);
                    throw redirectOnError("oauth_code_verification_failed");
                }
                if (!tokens) {
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
                        message: "Invalid OAuth configuration."
                    });
                }
                const userInfo = provider.getUserInfo ? await provider.getUserInfo(tokens) : await getUserInfo(tokens, finalUserInfoUrl);
                if (!userInfo) {
                    throw redirectOnError("user_info_is_missing");
                }
                const mapUser = provider.mapProfileToUser ? await provider.mapProfileToUser(userInfo) : userInfo;
                if (!mapUser?.email) {
                    ctx.context.logger.error("Unable to get user info", userInfo);
                    throw redirectOnError("email_is_missing");
                }
                if (link) {
                    if (ctx.context.options.account?.accountLinking?.allowDifferentEmails !== true && link.email !== mapUser.email.toLowerCase()) {
                        return redirectOnError("email_doesn't_match");
                    }
                    const existingAccount = await ctx.context.internalAdapter.findAccountByProviderId(userInfo.id, provider.providerId);
                    if (existingAccount) {
                        if (existingAccount.userId !== link.userId) {
                            return redirectOnError("account_already_linked_to_different_user");
                        }
                        const updateData = Object.fromEntries(Object.entries({
                            accessToken: tokens.accessToken,
                            idToken: tokens.idToken,
                            refreshToken: tokens.refreshToken,
                            accessTokenExpiresAt: tokens.accessTokenExpiresAt,
                            refreshTokenExpiresAt: tokens.refreshTokenExpiresAt,
                            scope: tokens.scopes?.join(",")
                        }).filter(([_, value])=>value !== void 0));
                        await ctx.context.internalAdapter.updateAccount(existingAccount.id, updateData);
                    } else {
                        const newAccount = await ctx.context.internalAdapter.createAccount({
                            userId: link.userId,
                            providerId: provider.providerId,
                            accountId: userInfo.id,
                            accessToken: tokens.accessToken,
                            accessTokenExpiresAt: tokens.accessTokenExpiresAt,
                            refreshTokenExpiresAt: tokens.refreshTokenExpiresAt,
                            scope: tokens.scopes?.join(","),
                            refreshToken: tokens.refreshToken,
                            idToken: tokens.idToken
                        });
                        if (!newAccount) {
                            return redirectOnError("unable_to_link_account");
                        }
                    }
                    let toRedirectTo2;
                    try {
                        const url = callbackURL;
                        toRedirectTo2 = url.toString();
                    } catch  {
                        toRedirectTo2 = callbackURL;
                    }
                    throw ctx.redirect(toRedirectTo2);
                }
                const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["h"])(ctx, {
                    userInfo: {
                        ...userInfo,
                        ...mapUser
                    },
                    account: {
                        providerId: provider.providerId,
                        accountId: userInfo.id,
                        ...tokens,
                        scope: tokens.scopes?.join(",")
                    },
                    callbackURL,
                    disableSignUp: provider.disableImplicitSignUp && !requestSignUp || provider.disableSignUp,
                    overrideUserInfo: provider.overrideUserInfo
                });
                if (result.error) {
                    return redirectOnError(result.error.split(" ").join("_"));
                }
                const { session, user } = result.data;
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$cookies$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setSessionCookie"])(ctx, {
                    session,
                    user
                });
                let toRedirectTo;
                try {
                    const url = result.isRegister ? newUserURL || callbackURL : callbackURL;
                    toRedirectTo = url.toString();
                } catch  {
                    toRedirectTo = result.isRegister ? newUserURL || callbackURL : callbackURL;
                }
                throw ctx.redirect(toRedirectTo);
            }),
            /**
       * ### Endpoint
       *
       * POST `/oauth2/link`
       *
       * ### API Methods
       *
       * **server:**
       * `auth.api.oAuth2LinkAccount`
       *
       * **client:**
       * `authClient.oauth2.link`
       *
       * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/generic-oauth#api-method-oauth2-link)
       */ oAuth2LinkAccount: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["j"])("/oauth2/link", {
                method: "POST",
                body: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["object"]({
                    providerId: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"](),
                    /**
             * Callback URL to redirect to after the user has signed in.
             */ callbackURL: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"](),
                    /**
             * Additional scopes to request when linking the account.
             * This is useful for requesting additional permissions when
             * linking a social account compared to the initial authentication.
             */ scopes: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["array"](__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"]()).meta({
                        description: "Additional scopes to request when linking the account"
                    }).optional(),
                    /**
             * The URL to redirect to if there is an error during the link process.
             */ errorCallbackURL: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"]().meta({
                        description: "The URL to redirect to if there is an error during the link process"
                    }).optional()
                }),
                use: [
                    __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["l"]
                ],
                metadata: {
                    openapi: {
                        description: "Link an OAuth2 account to the current user session",
                        responses: {
                            "200": {
                                description: "Authorization URL generated successfully for linking an OAuth2 account",
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object",
                                            properties: {
                                                url: {
                                                    type: "string",
                                                    format: "uri",
                                                    description: "The authorization URL to redirect the user to for linking the OAuth2 account"
                                                },
                                                redirect: {
                                                    type: "boolean",
                                                    description: "Indicates that the client should redirect to the provided URL",
                                                    enum: [
                                                        true
                                                    ]
                                                }
                                            },
                                            required: [
                                                "url",
                                                "redirect"
                                            ]
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }, async (c)=>{
                const session = c.context.session;
                const provider = options.config.find((p)=>p.providerId === c.body.providerId);
                if (!provider) {
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("NOT_FOUND", {
                        message: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["B"].PROVIDER_NOT_FOUND
                    });
                }
                const { providerId, clientId, clientSecret, redirectURI, authorizationUrl, discoveryUrl, pkce, scopes, prompt, accessType, authorizationUrlParams } = provider;
                let finalAuthUrl = authorizationUrl;
                if (!finalAuthUrl) {
                    if (!discoveryUrl) {
                        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
                            message: ERROR_CODES.INVALID_OAUTH_CONFIGURATION
                        });
                    }
                    const discovery = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["betterFetch"])(discoveryUrl, {
                        method: "GET",
                        headers: provider.discoveryHeaders,
                        onError (context) {
                            c.context.logger.error(context.error.message, context.error, {
                                discoveryUrl
                            });
                        }
                    });
                    if (discovery.data) {
                        finalAuthUrl = discovery.data.authorization_endpoint;
                    }
                }
                if (!finalAuthUrl) {
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
                        message: ERROR_CODES.INVALID_OAUTH_CONFIGURATION
                    });
                }
                const state = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["g"])(c, {
                    userId: session.user.id,
                    email: session.user.email
                });
                const url = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["c"])({
                    id: providerId,
                    options: {
                        clientId,
                        redirectURI: redirectURI || `${c.context.baseURL}/oauth2/callback/${providerId}`
                    },
                    authorizationEndpoint: finalAuthUrl,
                    state: state.state,
                    codeVerifier: pkce ? state.codeVerifier : void 0,
                    scopes: c.body.scopes || scopes || [],
                    redirectURI: redirectURI || `${c.context.baseURL}/oauth2/callback/${providerId}`,
                    prompt,
                    accessType,
                    additionalParams: authorizationUrlParams
                });
                return c.json({
                    url: url.toString(),
                    redirect: true
                });
            })
        },
        $ERROR_CODES: ERROR_CODES
    };
};
;
}),
"[project]/packages/better-auth/dist/plugins/multi-session/index.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "multiSession": ()=>multiSession
});
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/node_modules/zod/v4/classic/schemas.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/better-call/dist/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.D4HhkCZJ.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$cookies$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/cookies/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$n2KFGwjY$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.n2KFGwjY.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$8zoxzg$2d$F$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.8zoxzg-F.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DBGfIDnh$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.DBGfIDnh.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$defu$2f$dist$2f$defu$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/defu/dist/defu.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$CW6D9eSx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.CW6D9eSx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hash$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/hash.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$base64$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/base64.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$crypto$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/crypto/index.mjs [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/index.mjs [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hex$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/hex.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$B4Qoxdgc$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.B4Qoxdgc.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$random$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/random.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-fetch/fetch/dist/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$VTXNLFMT$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.VTXNLFMT.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DdzSJf$2d$n$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.DdzSJf-n.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$tB5eU6EY$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.tB5eU6EY.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hmac$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/hmac.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$binary$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/binary.mjs [app-ssr] (ecmascript)");
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
;
;
;
;
;
;
;
;
;
const multiSession = (options)=>{
    const opts = {
        maximumSessions: 5,
        ...options
    };
    const isMultiSessionCookie = (key)=>key.includes("_multi-");
    const ERROR_CODES = {
        INVALID_SESSION_TOKEN: "Invalid session token"
    };
    return {
        id: "multi-session",
        endpoints: {
            /**
       * ### Endpoint
       *
       * GET `/multi-session/list-device-sessions`
       *
       * ### API Methods
       *
       * **server:**
       * `auth.api.listDeviceSessions`
       *
       * **client:**
       * `authClient.multiSession.listDeviceSessions`
       *
       * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/multi-session#api-method-multi-session-list-device-sessions)
       */ listDeviceSessions: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["j"])("/multi-session/list-device-sessions", {
                method: "GET",
                requireHeaders: true
            }, async (ctx)=>{
                const cookieHeader = ctx.headers?.get("cookie");
                if (!cookieHeader) return ctx.json([]);
                const cookies = Object.fromEntries((0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$cookies$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseCookies"])(cookieHeader));
                const sessionTokens = (await Promise.all(Object.entries(cookies).filter(([key])=>isMultiSessionCookie(key)).map(async ([key])=>await ctx.getSignedCookie(key, ctx.context.secret)))).filter((v)=>v !== null);
                if (!sessionTokens.length) return ctx.json([]);
                const sessions = await ctx.context.internalAdapter.findSessions(sessionTokens);
                const validSessions = sessions.filter((session)=>session && session.session.expiresAt > /* @__PURE__ */ new Date());
                const uniqueUserSessions = validSessions.reduce((acc, session)=>{
                    if (!acc.find((s)=>s.user.id === session.user.id)) {
                        acc.push(session);
                    }
                    return acc;
                }, []);
                return ctx.json(uniqueUserSessions);
            }),
            /**
       * ### Endpoint
       *
       * POST `/multi-session/set-active`
       *
       * ### API Methods
       *
       * **server:**
       * `auth.api.setActiveSession`
       *
       * **client:**
       * `authClient.multiSession.setActive`
       *
       * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/multi-session#api-method-multi-session-set-active)
       */ setActiveSession: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["j"])("/multi-session/set-active", {
                method: "POST",
                body: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["object"]({
                    sessionToken: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"]().meta({
                        description: "The session token to set as active"
                    })
                }),
                requireHeaders: true,
                use: [
                    __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["l"]
                ],
                metadata: {
                    openapi: {
                        description: "Set the active session",
                        responses: {
                            200: {
                                description: "Success",
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object",
                                            properties: {
                                                session: {
                                                    $ref: "#/components/schemas/Session"
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }, async (ctx)=>{
                const sessionToken = ctx.body.sessionToken;
                const multiSessionCookieName = `${ctx.context.authCookies.sessionToken.name}_multi-${sessionToken.toLowerCase()}`;
                const sessionCookie = await ctx.getSignedCookie(multiSessionCookieName, ctx.context.secret);
                if (!sessionCookie) {
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("UNAUTHORIZED", {
                        message: ERROR_CODES.INVALID_SESSION_TOKEN
                    });
                }
                const session = await ctx.context.internalAdapter.findSession(sessionToken);
                if (!session || session.session.expiresAt < /* @__PURE__ */ new Date()) {
                    ctx.setCookie(multiSessionCookieName, "", {
                        ...ctx.context.authCookies.sessionToken.options,
                        maxAge: 0
                    });
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("UNAUTHORIZED", {
                        message: ERROR_CODES.INVALID_SESSION_TOKEN
                    });
                }
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$cookies$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setSessionCookie"])(ctx, session);
                return ctx.json(session);
            }),
            /**
       * ### Endpoint
       *
       * POST `/multi-session/revoke`
       *
       * ### API Methods
       *
       * **server:**
       * `auth.api.revokeDeviceSession`
       *
       * **client:**
       * `authClient.multiSession.revoke`
       *
       * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/multi-session#api-method-multi-session-revoke)
       */ revokeDeviceSession: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["j"])("/multi-session/revoke", {
                method: "POST",
                body: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["object"]({
                    sessionToken: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"]().meta({
                        description: "The session token to revoke"
                    })
                }),
                requireHeaders: true,
                use: [
                    __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["l"]
                ],
                metadata: {
                    openapi: {
                        description: "Revoke a device session",
                        responses: {
                            200: {
                                description: "Success",
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object",
                                            properties: {
                                                status: {
                                                    type: "boolean"
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }, async (ctx)=>{
                const sessionToken = ctx.body.sessionToken;
                const multiSessionCookieName = `${ctx.context.authCookies.sessionToken.name}_multi-${sessionToken.toLowerCase()}`;
                const sessionCookie = await ctx.getSignedCookie(multiSessionCookieName, ctx.context.secret);
                if (!sessionCookie) {
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("UNAUTHORIZED", {
                        message: ERROR_CODES.INVALID_SESSION_TOKEN
                    });
                }
                await ctx.context.internalAdapter.deleteSession(sessionToken);
                ctx.setCookie(multiSessionCookieName, "", {
                    ...ctx.context.authCookies.sessionToken.options,
                    maxAge: 0
                });
                const isActive = ctx.context.session?.session.token === sessionToken;
                if (!isActive) return ctx.json({
                    status: true
                });
                const cookieHeader = ctx.headers?.get("cookie");
                if (cookieHeader) {
                    const cookies = Object.fromEntries((0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$cookies$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseCookies"])(cookieHeader));
                    const sessionTokens = (await Promise.all(Object.entries(cookies).filter(([key])=>isMultiSessionCookie(key)).map(async ([key])=>await ctx.getSignedCookie(key, ctx.context.secret)))).filter((v)=>v !== void 0);
                    const internalAdapter = ctx.context.internalAdapter;
                    if (sessionTokens.length > 0) {
                        const sessions = await internalAdapter.findSessions(sessionTokens);
                        const validSessions = sessions.filter((session)=>session && session.session.expiresAt > /* @__PURE__ */ new Date());
                        if (validSessions.length > 0) {
                            const nextSession = validSessions[0];
                            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$cookies$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setSessionCookie"])(ctx, nextSession);
                        } else {
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$cookies$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["deleteSessionCookie"])(ctx);
                        }
                    } else {
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$cookies$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["deleteSessionCookie"])(ctx);
                    }
                } else {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$cookies$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["deleteSessionCookie"])(ctx);
                }
                return ctx.json({
                    status: true
                });
            })
        },
        hooks: {
            after: [
                {
                    matcher: ()=>true,
                    handler: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["i"])(async (ctx)=>{
                        const cookieString = ctx.context.responseHeaders?.get("set-cookie");
                        if (!cookieString) return;
                        const setCookies = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$cookies$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseSetCookieHeader"])(cookieString);
                        const sessionCookieConfig = ctx.context.authCookies.sessionToken;
                        const sessionToken = ctx.context.newSession?.session.token;
                        if (!sessionToken) return;
                        const cookies = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$cookies$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseCookies"])(ctx.headers?.get("cookie") || "");
                        const cookieName = `${sessionCookieConfig.name}_multi-${sessionToken.toLowerCase()}`;
                        if (setCookies.get(cookieName) || cookies.get(cookieName)) return;
                        const currentMultiSessions = Object.keys(Object.fromEntries(cookies)).filter(isMultiSessionCookie).length + (cookieString.includes("session_token") ? 1 : 0);
                        if (currentMultiSessions >= opts.maximumSessions) {
                            return;
                        }
                        await ctx.setSignedCookie(cookieName, sessionToken, ctx.context.secret, sessionCookieConfig.options);
                    })
                },
                {
                    matcher: (context)=>context.path === "/sign-out",
                    handler: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["i"])(async (ctx)=>{
                        const cookieHeader = ctx.headers?.get("cookie");
                        if (!cookieHeader) return;
                        const cookies = Object.fromEntries((0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$cookies$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseCookies"])(cookieHeader));
                        const ids = Object.keys(cookies).map((key)=>{
                            if (isMultiSessionCookie(key)) {
                                ctx.setCookie(key.toLowerCase(), "", {
                                    ...ctx.context.authCookies.sessionToken.options,
                                    maxAge: 0
                                });
                                const token = cookies[key].split(".")[0];
                                return token;
                            }
                            return null;
                        }).filter((v)=>v !== null);
                        await ctx.context.internalAdapter.deleteSessions(ids);
                    })
                }
            ]
        },
        $ERROR_CODES: ERROR_CODES
    };
};
;
}),
"[project]/packages/better-auth/dist/plugins/email-otp/index.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "emailOTP": ()=>emailOTP
});
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/node_modules/zod/v4/classic/schemas.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/better-call/dist/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.D4HhkCZJ.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$cookies$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/cookies/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$n2KFGwjY$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.n2KFGwjY.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$8zoxzg$2d$F$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.8zoxzg-F.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DBGfIDnh$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.DBGfIDnh.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$defu$2f$dist$2f$defu$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/defu/dist/defu.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$crypto$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/crypto/index.mjs [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$crypto$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/crypto/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$CW6D9eSx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.CW6D9eSx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DQI8AD7d$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.DQI8AD7d.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hash$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/hash.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$base64$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/base64.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$B4Qoxdgc$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.B4Qoxdgc.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-fetch/fetch/dist/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/index.mjs [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hex$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/hex.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$VTXNLFMT$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.VTXNLFMT.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DdzSJf$2d$n$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.DdzSJf-n.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$tB5eU6EY$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.tB5eU6EY.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hmac$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/hmac.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$binary$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/binary.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$random$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/random.mjs [app-ssr] (ecmascript)");
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
const defaultKeyHasher = async (otp)=>{
    const hash = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hash$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createHash"])("SHA-256").digest(new TextEncoder().encode(otp));
    const hashed = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$base64$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["base64Url"].encode(new Uint8Array(hash), {
        padding: false
    });
    return hashed;
};
function splitAtLastColon(input) {
    const idx = input.lastIndexOf(":");
    if (idx === -1) {
        return [
            input,
            ""
        ];
    }
    return [
        input.slice(0, idx),
        input.slice(idx + 1)
    ];
}
const types = [
    "email-verification",
    "sign-in",
    "forget-password"
];
const emailOTP = (options)=>{
    const opts = {
        expiresIn: 5 * 60,
        generateOTP: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$B4Qoxdgc$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["g"])(options.otpLength ?? 6, "0-9"),
        storeOTP: "plain",
        ...options
    };
    const ERROR_CODES = {
        OTP_EXPIRED: "otp expired",
        INVALID_OTP: "Invalid OTP",
        INVALID_EMAIL: "Invalid email",
        USER_NOT_FOUND: "User not found",
        TOO_MANY_ATTEMPTS: "Too many attempts"
    };
    async function storeOTP(ctx, otp) {
        if (opts.storeOTP === "encrypted") {
            return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$crypto$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["symmetricEncrypt"])({
                key: ctx.context.secret,
                data: otp
            });
        }
        if (opts.storeOTP === "hashed") {
            return await defaultKeyHasher(otp);
        }
        if (typeof opts.storeOTP === "object" && "hash" in opts.storeOTP) {
            return await opts.storeOTP.hash(otp);
        }
        if (typeof opts.storeOTP === "object" && "encrypt" in opts.storeOTP) {
            return await opts.storeOTP.encrypt(otp);
        }
        return otp;
    }
    async function verifyStoredOTP(ctx, storedOtp, otp) {
        if (opts.storeOTP === "encrypted") {
            return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$crypto$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["symmetricDecrypt"])({
                key: ctx.context.secret,
                data: storedOtp
            }) === otp;
        }
        if (opts.storeOTP === "hashed") {
            const hashedOtp = await defaultKeyHasher(otp);
            return hashedOtp === storedOtp;
        }
        if (typeof opts.storeOTP === "object" && "hash" in opts.storeOTP) {
            const hashedOtp = await opts.storeOTP.hash(otp);
            return hashedOtp === storedOtp;
        }
        if (typeof opts.storeOTP === "object" && "decrypt" in opts.storeOTP) {
            const decryptedOtp = await opts.storeOTP.decrypt(storedOtp);
            return decryptedOtp === otp;
        }
        return otp === storedOtp;
    }
    const endpoints = {
        /**
     * ### Endpoint
     *
     * POST `/email-otp/send-verification-otp`
     *
     * ### API Methods
     *
     * **server:**
     * `auth.api.sendVerificationOTP`
     *
     * **client:**
     * `authClient.emailOtp.sendVerificationOtp`
     *
     * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/email-otp#api-method-email-otp-send-verification-otp)
     */ sendVerificationOTP: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["j"])("/email-otp/send-verification-otp", {
            method: "POST",
            body: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["object"]({
                email: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"]({}).meta({
                    description: "Email address to send the OTP"
                }),
                type: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["enum"](types).meta({
                    description: "Type of the OTP"
                })
            }),
            metadata: {
                openapi: {
                    description: "Send verification OTP",
                    responses: {
                        200: {
                            description: "Success",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            success: {
                                                type: "boolean"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }, async (ctx)=>{
            if (!options?.sendVerificationOTP) {
                ctx.context.logger.error("send email verification is not implemented");
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
                    message: "send email verification is not implemented"
                });
            }
            const email = ctx.body.email;
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailRegex.test(email)) {
                throw ctx.error("BAD_REQUEST", {
                    message: ERROR_CODES.INVALID_EMAIL
                });
            }
            if (opts.disableSignUp) {
                const user = await ctx.context.internalAdapter.findUserByEmail(email);
                if (!user) {
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
                        message: ERROR_CODES.USER_NOT_FOUND
                    });
                }
            } else if (ctx.body.type === "forget-password") {
                const user = await ctx.context.internalAdapter.findUserByEmail(email);
                if (!user) {
                    return ctx.json({
                        success: true
                    });
                }
            }
            let otp = opts.generateOTP({
                email,
                type: ctx.body.type
            }, ctx.request);
            let storedOTP = await storeOTP(ctx, otp);
            await ctx.context.internalAdapter.createVerificationValue({
                value: `${storedOTP}:0`,
                identifier: `${ctx.body.type}-otp-${email}`,
                expiresAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$CW6D9eSx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["g"])(opts.expiresIn, "sec")
            }, ctx).catch(async (error)=>{
                await ctx.context.internalAdapter.deleteVerificationByIdentifier(`${ctx.body.type}-otp-${email}`);
                await ctx.context.internalAdapter.createVerificationValue({
                    value: `${storedOTP}:0`,
                    identifier: `${ctx.body.type}-otp-${email}`,
                    expiresAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$CW6D9eSx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["g"])(opts.expiresIn, "sec")
                }, ctx);
            });
            await options.sendVerificationOTP({
                email,
                otp,
                type: ctx.body.type
            }, ctx.request);
            return ctx.json({
                success: true
            });
        })
    };
    return {
        id: "email-otp",
        init (ctx) {
            return {
                options: {
                    emailVerification: {
                        ...opts.overrideDefaultEmailVerification ? {
                            async sendVerificationEmail (data, request) {
                                await endpoints.sendVerificationOTP({
                                    //@ts-expect-error - we need to pass the context
                                    context: ctx,
                                    request,
                                    body: {
                                        email: data.user.email,
                                        type: "email-verification"
                                    },
                                    ctx
                                });
                            }
                        } : {}
                    }
                }
            };
        },
        endpoints: {
            ...endpoints,
            createVerificationOTP: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["j"])("/email-otp/create-verification-otp", {
                method: "POST",
                body: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["object"]({
                    email: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"]({}).meta({
                        description: "Email address to send the OTP"
                    }),
                    type: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["enum"](types).meta({
                        required: true,
                        description: "Type of the OTP"
                    })
                }),
                metadata: {
                    SERVER_ONLY: true,
                    openapi: {
                        description: "Create verification OTP",
                        responses: {
                            200: {
                                description: "Success",
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "string"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }, async (ctx)=>{
                const email = ctx.body.email;
                const otp = opts.generateOTP({
                    email,
                    type: ctx.body.type
                }, ctx.request);
                let storedOTP = await storeOTP(ctx, otp);
                await ctx.context.internalAdapter.createVerificationValue({
                    value: `${storedOTP}:0`,
                    identifier: `${ctx.body.type}-otp-${email}`,
                    expiresAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$CW6D9eSx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["g"])(opts.expiresIn, "sec")
                }, ctx);
                return otp;
            }),
            /**
       * ### Endpoint
       *
       * GET `/email-otp/get-verification-otp`
       *
       * ### API Methods
       *
       * **server:**
       * `auth.api.getVerificationOTP`
       *
       * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/email-otp#api-method-email-otp-get-verification-otp)
       */ getVerificationOTP: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["j"])("/email-otp/get-verification-otp", {
                method: "GET",
                query: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["object"]({
                    email: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"]({}).meta({
                        description: "Email address to get the OTP"
                    }),
                    type: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["enum"](types).meta({
                        required: true,
                        description: "Type of the OTP"
                    })
                }),
                metadata: {
                    SERVER_ONLY: true,
                    openapi: {
                        description: "Get verification OTP",
                        responses: {
                            "200": {
                                description: "OTP retrieved successfully or not found/expired",
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object",
                                            properties: {
                                                otp: {
                                                    type: "string",
                                                    nullable: true,
                                                    description: "The stored OTP, or null if not found or expired"
                                                }
                                            },
                                            required: [
                                                "otp"
                                            ]
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }, async (ctx)=>{
                const email = ctx.query.email;
                const verificationValue = await ctx.context.internalAdapter.findVerificationValue(`${ctx.query.type}-otp-${email}`);
                if (!verificationValue || verificationValue.expiresAt < /* @__PURE__ */ new Date()) {
                    return ctx.json({
                        otp: null
                    });
                }
                if (opts.storeOTP === "hashed" || typeof opts.storeOTP === "object" && "hash" in opts.storeOTP) {
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
                        message: "OTP is hashed, cannot return the plain text OTP"
                    });
                }
                let [storedOtp, _attempts] = splitAtLastColon(verificationValue.value);
                let otp = storedOtp;
                if (opts.storeOTP === "encrypted") {
                    otp = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$crypto$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["symmetricDecrypt"])({
                        key: ctx.context.secret,
                        data: storedOtp
                    });
                }
                if (typeof opts.storeOTP === "object" && "decrypt" in opts.storeOTP) {
                    otp = await opts.storeOTP.decrypt(storedOtp);
                }
                return ctx.json({
                    otp
                });
            }),
            /**
       * ### Endpoint
       *
       * POST `/email-otp/verify-email`
       *
       * ### API Methods
       *
       * **server:**
       * `auth.api.verifyEmailOTP`
       *
       * **client:**
       * `authClient.emailOtp.verifyEmail`
       *
       * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/email-otp#api-method-email-otp-verify-email)
       */ verifyEmailOTP: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["j"])("/email-otp/verify-email", {
                method: "POST",
                body: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["object"]({
                    email: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"]({}).meta({
                        description: "Email address to verify"
                    }),
                    otp: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"]().meta({
                        required: true,
                        description: "OTP to verify"
                    })
                }),
                metadata: {
                    openapi: {
                        description: "Verify email OTP",
                        responses: {
                            200: {
                                description: "Success",
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object",
                                            properties: {
                                                status: {
                                                    type: "boolean",
                                                    description: "Indicates if the verification was successful",
                                                    enum: [
                                                        true
                                                    ]
                                                },
                                                token: {
                                                    type: "string",
                                                    nullable: true,
                                                    description: "Session token if autoSignInAfterVerification is enabled, otherwise null"
                                                },
                                                user: {
                                                    $ref: "#/components/schemas/User"
                                                },
                                                required: [
                                                    "status",
                                                    "token",
                                                    "user"
                                                ]
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }, async (ctx)=>{
                const email = ctx.body.email;
                const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                if (!emailRegex.test(email)) {
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
                        message: ERROR_CODES.INVALID_EMAIL
                    });
                }
                const verificationValue = await ctx.context.internalAdapter.findVerificationValue(`email-verification-otp-${email}`);
                if (!verificationValue) {
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
                        message: ERROR_CODES.INVALID_OTP
                    });
                }
                if (verificationValue.expiresAt < /* @__PURE__ */ new Date()) {
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
                        message: ERROR_CODES.OTP_EXPIRED
                    });
                }
                const [otpValue, attempts] = splitAtLastColon(verificationValue.value);
                const allowedAttempts = options?.allowedAttempts || 3;
                if (attempts && parseInt(attempts) >= allowedAttempts) {
                    await ctx.context.internalAdapter.deleteVerificationValue(verificationValue.id);
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("FORBIDDEN", {
                        message: ERROR_CODES.TOO_MANY_ATTEMPTS
                    });
                }
                const verified = await verifyStoredOTP(ctx, otpValue, ctx.body.otp);
                if (!verified) {
                    await ctx.context.internalAdapter.updateVerificationValue(verificationValue.id, {
                        value: `${otpValue}:${parseInt(attempts || "0") + 1}`
                    });
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
                        message: ERROR_CODES.INVALID_OTP
                    });
                }
                await ctx.context.internalAdapter.deleteVerificationValue(verificationValue.id);
                const user = await ctx.context.internalAdapter.findUserByEmail(email);
                if (!user) {
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
                        message: ERROR_CODES.USER_NOT_FOUND
                    });
                }
                const updatedUser = await ctx.context.internalAdapter.updateUser(user.user.id, {
                    email,
                    emailVerified: true
                }, ctx);
                await ctx.context.options.emailVerification?.onEmailVerification?.(updatedUser, ctx.request);
                if (ctx.context.options.emailVerification?.autoSignInAfterVerification) {
                    const session = await ctx.context.internalAdapter.createSession(updatedUser.id, ctx);
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$cookies$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setSessionCookie"])(ctx, {
                        session,
                        user: updatedUser
                    });
                    return ctx.json({
                        status: true,
                        token: session.token,
                        user: {
                            id: updatedUser.id,
                            email: updatedUser.email,
                            emailVerified: updatedUser.emailVerified,
                            name: updatedUser.name,
                            image: updatedUser.image,
                            createdAt: updatedUser.createdAt,
                            updatedAt: updatedUser.updatedAt
                        }
                    });
                }
                return ctx.json({
                    status: true,
                    token: null,
                    user: {
                        id: updatedUser.id,
                        email: updatedUser.email,
                        emailVerified: updatedUser.emailVerified,
                        name: updatedUser.name,
                        image: updatedUser.image,
                        createdAt: updatedUser.createdAt,
                        updatedAt: updatedUser.updatedAt
                    }
                });
            }),
            /**
       * ### Endpoint
       *
       * POST `/sign-in/email-otp`
       *
       * ### API Methods
       *
       * **server:**
       * `auth.api.signInEmailOTP`
       *
       * **client:**
       * `authClient.signIn.emailOtp`
       *
       * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/email-otp#api-method-sign-in-email-otp)
       */ signInEmailOTP: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["j"])("/sign-in/email-otp", {
                method: "POST",
                body: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["object"]({
                    email: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"]({}).meta({
                        description: "Email address to sign in"
                    }),
                    otp: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"]().meta({
                        required: true,
                        description: "OTP sent to the email"
                    })
                }),
                metadata: {
                    openapi: {
                        description: "Sign in with email OTP",
                        responses: {
                            200: {
                                description: "Success",
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object",
                                            properties: {
                                                token: {
                                                    type: "string",
                                                    description: "Session token for the authenticated session"
                                                },
                                                user: {
                                                    $ref: "#/components/schemas/User"
                                                }
                                            },
                                            required: [
                                                "token",
                                                "user"
                                            ]
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }, async (ctx)=>{
                const email = ctx.body.email;
                const verificationValue = await ctx.context.internalAdapter.findVerificationValue(`sign-in-otp-${email}`);
                if (!verificationValue) {
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
                        message: ERROR_CODES.INVALID_OTP
                    });
                }
                if (verificationValue.expiresAt < /* @__PURE__ */ new Date()) {
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
                        message: ERROR_CODES.OTP_EXPIRED
                    });
                }
                const [otpValue, attempts] = splitAtLastColon(verificationValue.value);
                const allowedAttempts = options?.allowedAttempts || 3;
                if (attempts && parseInt(attempts) >= allowedAttempts) {
                    await ctx.context.internalAdapter.deleteVerificationValue(verificationValue.id);
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("FORBIDDEN", {
                        message: ERROR_CODES.TOO_MANY_ATTEMPTS
                    });
                }
                const verified = await verifyStoredOTP(ctx, otpValue, ctx.body.otp);
                if (!verified) {
                    await ctx.context.internalAdapter.updateVerificationValue(verificationValue.id, {
                        value: `${otpValue}:${parseInt(attempts || "0") + 1}`
                    });
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
                        message: ERROR_CODES.INVALID_OTP
                    });
                }
                await ctx.context.internalAdapter.deleteVerificationValue(verificationValue.id);
                const user = await ctx.context.internalAdapter.findUserByEmail(email);
                if (!user) {
                    if (opts.disableSignUp) {
                        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
                            message: ERROR_CODES.USER_NOT_FOUND
                        });
                    }
                    const newUser = await ctx.context.internalAdapter.createUser({
                        email,
                        emailVerified: true,
                        name: ""
                    }, ctx);
                    const session2 = await ctx.context.internalAdapter.createSession(newUser.id, ctx);
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$cookies$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setSessionCookie"])(ctx, {
                        session: session2,
                        user: newUser
                    });
                    return ctx.json({
                        token: session2.token,
                        user: {
                            id: newUser.id,
                            email: newUser.email,
                            emailVerified: newUser.emailVerified,
                            name: newUser.name,
                            image: newUser.image,
                            createdAt: newUser.createdAt,
                            updatedAt: newUser.updatedAt
                        }
                    });
                }
                if (!user.user.emailVerified) {
                    await ctx.context.internalAdapter.updateUser(user.user.id, {
                        emailVerified: true
                    }, ctx);
                }
                const session = await ctx.context.internalAdapter.createSession(user.user.id, ctx);
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$cookies$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setSessionCookie"])(ctx, {
                    session,
                    user: user.user
                });
                return ctx.json({
                    token: session.token,
                    user: {
                        id: user.user.id,
                        email: user.user.email,
                        emailVerified: user.user.emailVerified,
                        name: user.user.name,
                        image: user.user.image,
                        createdAt: user.user.createdAt,
                        updatedAt: user.user.updatedAt
                    }
                });
            }),
            /**
       * ### Endpoint
       *
       * POST `/forget-password/email-otp`
       *
       * ### API Methods
       *
       * **server:**
       * `auth.api.forgetPasswordEmailOTP`
       *
       * **client:**
       * `authClient.forgetPassword.emailOtp`
       *
       * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/email-otp#api-method-forget-password-email-otp)
       */ forgetPasswordEmailOTP: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["j"])("/forget-password/email-otp", {
                method: "POST",
                body: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["object"]({
                    email: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"]().meta({
                        description: "Email address to send the OTP"
                    })
                }),
                metadata: {
                    openapi: {
                        description: "Forget password with email OTP",
                        responses: {
                            200: {
                                description: "Success",
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object",
                                            properties: {
                                                success: {
                                                    type: "boolean",
                                                    description: "Indicates if the OTP was sent successfully"
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }, async (ctx)=>{
                const email = ctx.body.email;
                const user = await ctx.context.internalAdapter.findUserByEmail(email);
                if (!user) {
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
                        message: ERROR_CODES.USER_NOT_FOUND
                    });
                }
                const otp = opts.generateOTP({
                    email,
                    type: "forget-password"
                }, ctx.request);
                let storedOTP = await storeOTP(ctx, otp);
                await ctx.context.internalAdapter.createVerificationValue({
                    value: `${storedOTP}:0`,
                    identifier: `forget-password-otp-${email}`,
                    expiresAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$CW6D9eSx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["g"])(opts.expiresIn, "sec")
                }, ctx);
                await options.sendVerificationOTP({
                    email,
                    otp,
                    type: "forget-password"
                }, ctx.request);
                return ctx.json({
                    success: true
                });
            }),
            /**
       * ### Endpoint
       *
       * POST `/email-otp/reset-password`
       *
       * ### API Methods
       *
       * **server:**
       * `auth.api.resetPasswordEmailOTP`
       *
       * **client:**
       * `authClient.emailOtp.resetPassword`
       *
       * @see [Read our docs to learn more.](https://better-auth.com/docs/plugins/email-otp#api-method-email-otp-reset-password)
       */ resetPasswordEmailOTP: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["j"])("/email-otp/reset-password", {
                method: "POST",
                body: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["object"]({
                    email: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"]().meta({
                        description: "Email address to reset the password"
                    }),
                    otp: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"]().meta({
                        description: "OTP sent to the email"
                    }),
                    password: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"]().meta({
                        description: "New password"
                    })
                }),
                metadata: {
                    openapi: {
                        description: "Reset password with email OTP",
                        responses: {
                            200: {
                                description: "Success",
                                contnt: {
                                    "application/json": {
                                        schema: {
                                            type: "object",
                                            properties: {
                                                success: {
                                                    type: "boolean"
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }, async (ctx)=>{
                const email = ctx.body.email;
                const user = await ctx.context.internalAdapter.findUserByEmail(email, {
                    includeAccounts: true
                });
                if (!user) {
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
                        message: ERROR_CODES.USER_NOT_FOUND
                    });
                }
                const verificationValue = await ctx.context.internalAdapter.findVerificationValue(`forget-password-otp-${email}`);
                if (!verificationValue) {
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
                        message: ERROR_CODES.INVALID_OTP
                    });
                }
                if (verificationValue.expiresAt < /* @__PURE__ */ new Date()) {
                    await ctx.context.internalAdapter.deleteVerificationValue(verificationValue.id);
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
                        message: ERROR_CODES.OTP_EXPIRED
                    });
                }
                const [otpValue, attempts] = splitAtLastColon(verificationValue.value);
                const allowedAttempts = options?.allowedAttempts || 3;
                if (attempts && parseInt(attempts) >= allowedAttempts) {
                    await ctx.context.internalAdapter.deleteVerificationValue(verificationValue.id);
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("FORBIDDEN", {
                        message: ERROR_CODES.TOO_MANY_ATTEMPTS
                    });
                }
                const verified = await verifyStoredOTP(ctx, otpValue, ctx.body.otp);
                if (!verified) {
                    await ctx.context.internalAdapter.updateVerificationValue(verificationValue.id, {
                        value: `${otpValue}:${parseInt(attempts || "0") + 1}`
                    });
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
                        message: ERROR_CODES.INVALID_OTP
                    });
                }
                await ctx.context.internalAdapter.deleteVerificationValue(verificationValue.id);
                const passwordHash = await ctx.context.password.hash(ctx.body.password);
                const account = user.accounts.find((account2)=>account2.providerId === "credential");
                if (!account) {
                    await ctx.context.internalAdapter.createAccount({
                        userId: user.user.id,
                        providerId: "credential",
                        accountId: user.user.id,
                        password: passwordHash
                    }, ctx);
                } else {
                    await ctx.context.internalAdapter.updatePassword(user.user.id, passwordHash, ctx);
                }
                if (!user.user.emailVerified) {
                    await ctx.context.internalAdapter.updateUser(user.user.id, {
                        emailVerified: true
                    }, ctx);
                }
                return ctx.json({
                    success: true
                });
            })
        },
        hooks: {
            after: [
                {
                    matcher (context) {
                        return !!(context.path?.startsWith("/sign-up") && opts.sendVerificationOnSignUp);
                    },
                    handler: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["i"])(async (ctx)=>{
                        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DQI8AD7d$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["g"])(ctx);
                        const email = response?.user.email;
                        if (email) {
                            const otp = opts.generateOTP({
                                email,
                                type: ctx.body.type
                            }, ctx.request);
                            let storedOTP = await storeOTP(ctx, otp);
                            await ctx.context.internalAdapter.createVerificationValue({
                                value: `${storedOTP}:0`,
                                identifier: `email-verification-otp-${email}`,
                                expiresAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$CW6D9eSx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["g"])(opts.expiresIn, "sec")
                            }, ctx);
                            await options.sendVerificationOTP({
                                email,
                                otp,
                                type: "email-verification"
                            }, ctx.request);
                        }
                    })
                }
            ]
        },
        $ERROR_CODES: ERROR_CODES,
        rateLimit: [
            {
                pathMatcher (path) {
                    return path === "/email-otp/send-verification-otp";
                },
                window: 60,
                max: 3
            },
            {
                pathMatcher (path) {
                    return path === "/email-otp/verify-email";
                },
                window: 60,
                max: 3
            },
            {
                pathMatcher (path) {
                    return path === "/sign-in/email-otp";
                },
                window: 60,
                max: 3
            }
        ]
    };
};
;
}),
"[project]/packages/better-auth/dist/plugins/one-tap/index.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "oneTap": ()=>oneTap
});
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/node_modules/zod/v4/classic/schemas.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/better-call/dist/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.D4HhkCZJ.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$cookies$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/cookies/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$n2KFGwjY$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.n2KFGwjY.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$8zoxzg$2d$F$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.8zoxzg-F.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DBGfIDnh$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.DBGfIDnh.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$defu$2f$dist$2f$defu$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/defu/dist/defu.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$node$2f$esm$2f$jwks$2f$remote$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jose/dist/node/esm/jwks/remote.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$node$2f$esm$2f$jwt$2f$verify$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jose/dist/node/esm/jwt/verify.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$CW6D9eSx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.CW6D9eSx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hash$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/hash.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$base64$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/base64.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$crypto$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/crypto/index.mjs [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/index.mjs [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hex$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/hex.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$B4Qoxdgc$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.B4Qoxdgc.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$random$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/random.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-fetch/fetch/dist/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$VTXNLFMT$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.VTXNLFMT.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DdzSJf$2d$n$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.DdzSJf-n.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$tB5eU6EY$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.tB5eU6EY.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hmac$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/hmac.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$binary$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/binary.mjs [app-ssr] (ecmascript)");
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
;
;
;
;
;
;
;
;
;
function toBoolean(value) {
    return value === "true" || value === true;
}
const oneTap = (options)=>({
        id: "one-tap",
        endpoints: {
            oneTapCallback: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["j"])("/one-tap/callback", {
                method: "POST",
                body: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["object"]({
                    idToken: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"]().meta({
                        description: "Google ID token, which the client obtains from the One Tap API"
                    })
                }),
                metadata: {
                    openapi: {
                        summary: "One tap callback",
                        description: "Use this endpoint to authenticate with Google One Tap",
                        responses: {
                            200: {
                                description: "Successful response",
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object",
                                            properties: {
                                                session: {
                                                    $ref: "#/components/schemas/Session"
                                                },
                                                user: {
                                                    $ref: "#/components/schemas/User"
                                                }
                                            }
                                        }
                                    }
                                }
                            },
                            400: {
                                description: "Invalid token"
                            }
                        }
                    }
                }
            }, async (ctx)=>{
                const { idToken } = ctx.body;
                let payload;
                try {
                    const JWKS = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$node$2f$esm$2f$jwks$2f$remote$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createRemoteJWKSet"])(new URL("https://www.googleapis.com/oauth2/v3/certs"));
                    const { payload: verifiedPayload } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$node$2f$esm$2f$jwt$2f$verify$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jwtVerify"])(idToken, JWKS, {
                        issuer: [
                            "https://accounts.google.com",
                            "accounts.google.com"
                        ],
                        audience: options?.clientId || ctx.context.options.socialProviders?.google?.clientId
                    });
                    payload = verifiedPayload;
                } catch (error) {
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
                        message: "invalid id token"
                    });
                }
                const { email, email_verified, name, picture, sub } = payload;
                if (!email) {
                    return ctx.json({
                        error: "Email not available in token"
                    });
                }
                const user = await ctx.context.internalAdapter.findUserByEmail(email);
                if (!user) {
                    if (options?.disableSignup) {
                        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("BAD_GATEWAY", {
                            message: "User not found"
                        });
                    }
                    const newUser = await ctx.context.internalAdapter.createOAuthUser({
                        email,
                        emailVerified: typeof email_verified === "boolean" ? email_verified : toBoolean(email_verified),
                        name,
                        image: picture
                    }, {
                        providerId: "google",
                        accountId: sub
                    }, ctx);
                    if (!newUser) {
                        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("INTERNAL_SERVER_ERROR", {
                            message: "Could not create user"
                        });
                    }
                    const session2 = await ctx.context.internalAdapter.createSession(newUser.user.id, ctx);
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$cookies$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setSessionCookie"])(ctx, {
                        user: newUser.user,
                        session: session2
                    });
                    return ctx.json({
                        token: session2.token,
                        user: {
                            id: newUser.user.id,
                            email: newUser.user.email,
                            emailVerified: newUser.user.emailVerified,
                            name: newUser.user.name,
                            image: newUser.user.image,
                            createdAt: newUser.user.createdAt,
                            updatedAt: newUser.user.updatedAt
                        }
                    });
                }
                const account = await ctx.context.internalAdapter.findAccount(sub);
                if (!account) {
                    const accountLinking = ctx.context.options.account?.accountLinking;
                    const shouldLinkAccount = accountLinking?.enabled && (accountLinking.trustedProviders?.includes("google") || email_verified);
                    if (shouldLinkAccount) {
                        await ctx.context.internalAdapter.linkAccount({
                            userId: user.user.id,
                            providerId: "google",
                            accountId: sub,
                            scope: "openid,profile,email",
                            idToken
                        });
                    } else {
                        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("UNAUTHORIZED", {
                            message: "Google sub doesn't match"
                        });
                    }
                }
                const session = await ctx.context.internalAdapter.createSession(user.user.id, ctx);
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$cookies$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setSessionCookie"])(ctx, {
                    user: user.user,
                    session
                });
                return ctx.json({
                    token: session.token,
                    user: {
                        id: user.user.id,
                        email: user.user.email,
                        emailVerified: user.user.emailVerified,
                        name: user.user.name,
                        image: user.user.image,
                        createdAt: user.user.createdAt,
                        updatedAt: user.user.updatedAt
                    }
                });
            })
        }
    });
;
}),
"[project]/packages/better-auth/dist/plugins/oauth-proxy/index.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "oAuthProxy": ()=>oAuthProxy
});
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/node_modules/zod/v4/classic/schemas.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/better-call/dist/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.D4HhkCZJ.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$8zoxzg$2d$F$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.8zoxzg-F.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$base64$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/base64.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hmac$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/hmac.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$VTXNLFMT$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.VTXNLFMT.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$binary$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/binary.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$n2KFGwjY$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.n2KFGwjY.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DBGfIDnh$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.DBGfIDnh.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$defu$2f$dist$2f$defu$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/defu/dist/defu.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$crypto$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/crypto/index.mjs [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$crypto$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/crypto/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$CW6D9eSx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.CW6D9eSx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hash$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/hash.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-fetch/fetch/dist/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/index.mjs [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hex$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/hex.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$B4Qoxdgc$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.B4Qoxdgc.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$random$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/random.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$cookies$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/cookies/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DdzSJf$2d$n$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.DdzSJf-n.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$tB5eU6EY$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.tB5eU6EY.mjs [app-ssr] (ecmascript)");
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
;
;
;
;
;
;
;
;
;
function getVenderBaseURL() {
    const vercel = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$8zoxzg$2d$F$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["e"].VERCEL_URL ? `https://${__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$8zoxzg$2d$F$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["e"].VERCEL_URL}` : void 0;
    const netlify = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$8zoxzg$2d$F$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["e"].NETLIFY_URL;
    const render = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$8zoxzg$2d$F$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["e"].RENDER_URL;
    const aws = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$8zoxzg$2d$F$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["e"].AWS_LAMBDA_FUNCTION_NAME;
    const google = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$8zoxzg$2d$F$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["e"].GOOGLE_CLOUD_FUNCTION_NAME;
    const azure = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$8zoxzg$2d$F$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["e"].AZURE_FUNCTION_NAME;
    return vercel || netlify || render || aws || google || azure;
}
const oAuthProxy = (opts)=>{
    const resolveCurrentURL = (ctx)=>{
        return new URL(opts?.currentURL || ctx.request?.url || getVenderBaseURL() || ctx.context.baseURL);
    };
    return {
        id: "oauth-proxy",
        endpoints: {
            oAuthProxy: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["j"])("/oauth-proxy-callback", {
                method: "GET",
                query: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["object"]({
                    callbackURL: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"]().meta({
                        description: "The URL to redirect to after the proxy"
                    }),
                    cookies: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"]().meta({
                        description: "The cookies to set after the proxy"
                    })
                }),
                use: [
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["o"])((ctx)=>ctx.query.callbackURL)
                ],
                metadata: {
                    openapi: {
                        description: "OAuth Proxy Callback",
                        parameters: [
                            {
                                in: "query",
                                name: "callbackURL",
                                required: true,
                                description: "The URL to redirect to after the proxy"
                            },
                            {
                                in: "query",
                                name: "cookies",
                                required: true,
                                description: "The cookies to set after the proxy"
                            }
                        ],
                        responses: {
                            302: {
                                description: "Redirect",
                                headers: {
                                    Location: {
                                        description: "The URL to redirect to",
                                        schema: {
                                            type: "string"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }, async (ctx)=>{
                const cookies = ctx.query.cookies;
                const decryptedCookies = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$crypto$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["symmetricDecrypt"])({
                    key: ctx.context.secret,
                    data: cookies
                }).catch((e)=>{
                    ctx.context.logger.error(e);
                    return null;
                });
                const error = ctx.context.options.onAPIError?.errorURL || `${ctx.context.options.baseURL}/api/auth/error`;
                if (!decryptedCookies) {
                    throw ctx.redirect(`${error}?error=OAuthProxy - Invalid cookies or secret`);
                }
                const isSecureContext = resolveCurrentURL(ctx).protocol === "https:";
                const prefix = ctx.context.options.advanced?.cookiePrefix || "better-auth";
                const cookieToSet = isSecureContext ? decryptedCookies : decryptedCookies.replace("Secure;", "").replace(`__Secure-${prefix}`, prefix);
                ctx.setHeader("set-cookie", cookieToSet);
                throw ctx.redirect(ctx.query.callbackURL);
            })
        },
        hooks: {
            after: [
                {
                    matcher (context) {
                        return context.path?.startsWith("/callback") || context.path?.startsWith("/oauth2/callback");
                    },
                    handler: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["i"])(async (ctx)=>{
                        const headers = ctx.context.responseHeaders;
                        const location = headers?.get("location");
                        if (location?.includes("/oauth-proxy-callback?callbackURL")) {
                            if (!location.startsWith("http")) {
                                return;
                            }
                            const locationURL = new URL(location);
                            const origin = locationURL.origin;
                            if (origin === (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$VTXNLFMT$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["g"])(ctx.context.baseURL)) {
                                const newLocation = locationURL.searchParams.get("callbackURL");
                                if (!newLocation) {
                                    return;
                                }
                                ctx.setHeader("location", newLocation);
                                return;
                            }
                            const setCookies = headers?.get("set-cookie");
                            if (!setCookies) {
                                return;
                            }
                            const encryptedCookies = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$crypto$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["symmetricEncrypt"])({
                                key: ctx.context.secret,
                                data: setCookies
                            });
                            const locationWithCookies = `${location}&cookies=${encodeURIComponent(encryptedCookies)}`;
                            ctx.setHeader("location", locationWithCookies);
                        }
                    })
                }
            ],
            before: [
                {
                    matcher (context) {
                        return context.path?.startsWith("/sign-in/social") || context.path?.startsWith("/sign-in/oauth2");
                    },
                    handler: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["i"])(async (ctx)=>{
                        const skipProxy = ctx.request?.headers.get("x-skip-oauth-proxy");
                        if (skipProxy) {
                            return;
                        }
                        const url = resolveCurrentURL(ctx);
                        const productionURL = opts?.productionURL || __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$8zoxzg$2d$F$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["e"].BETTER_AUTH_URL;
                        if (productionURL === ctx.context.options.baseURL) {
                            return;
                        }
                        ctx.body.callbackURL = `${url.origin}${ctx.context.options.basePath || "/api/auth"}/oauth-proxy-callback?callbackURL=${encodeURIComponent(ctx.body.callbackURL || ctx.context.baseURL)}`;
                        return {
                            context: ctx
                        };
                    })
                }
            ]
        }
    };
};
;
}),
"[project]/packages/better-auth/dist/plugins/custom-session/index.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "customSession": ()=>customSession
});
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/node_modules/zod/v4/classic/schemas.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/better-call/dist/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.D4HhkCZJ.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$8zoxzg$2d$F$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.8zoxzg-F.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$base64$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/base64.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hmac$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/hmac.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$binary$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/binary.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$n2KFGwjY$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.n2KFGwjY.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DBGfIDnh$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.DBGfIDnh.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$defu$2f$dist$2f$defu$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/defu/dist/defu.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$CW6D9eSx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.CW6D9eSx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hash$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/hash.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$crypto$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/crypto/index.mjs [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/index.mjs [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hex$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/hex.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$B4Qoxdgc$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.B4Qoxdgc.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$random$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/random.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-fetch/fetch/dist/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$VTXNLFMT$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.VTXNLFMT.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DdzSJf$2d$n$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.DdzSJf-n.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$cookies$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/cookies/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$tB5eU6EY$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.tB5eU6EY.mjs [app-ssr] (ecmascript)");
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
;
;
;
;
;
;
;
;
;
const customSession = (fn, options)=>{
    return {
        id: "custom-session",
        endpoints: {
            getSession: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["j"])("/get-session", {
                method: "GET",
                query: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["optional"](__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["object"]({
                    /**
               * If cookie cache is enabled, it will disable the cache
               * and fetch the session from the database
               */ disableCookieCache: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["boolean"]().meta({
                        description: "Disable cookie cache and fetch session from database"
                    }).or(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"]().transform((v)=>v === "true")).optional(),
                    disableRefresh: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["boolean"]().meta({
                        description: "Disable session refresh. Useful for checking session status, without updating the session"
                    }).optional()
                })),
                metadata: {
                    CUSTOM_SESSION: true,
                    openapi: {
                        description: "Get custom session data",
                        responses: {
                            "200": {
                                description: "Success",
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "array",
                                            nullable: true,
                                            items: {
                                                $ref: "#/components/schemas/Session"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                requireHeaders: true
            }, async (ctx)=>{
                const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["m"])()({
                    ...ctx,
                    asResponse: false,
                    headers: ctx.headers,
                    returnHeaders: true
                }).catch((e)=>{
                    return null;
                });
                if (!session?.response) {
                    return ctx.json(null);
                }
                const fnResult = await fn(session.response, ctx);
                session.headers.forEach((value, key)=>{
                    ctx.setHeader(key, value);
                });
                return ctx.json(fnResult);
            })
        }
    };
};
;
}),
"[project]/packages/better-auth/dist/plugins/open-api/index.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "openAPI": ()=>openAPI
});
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/node_modules/zod/v4/classic/schemas.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/packages/better-auth/node_modules/zod/v4/classic/external.js [app-ssr] (ecmascript) <export * as z>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$api$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/api/index.mjs [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$api$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/api/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$n2KFGwjY$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.n2KFGwjY.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$8zoxzg$2d$F$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.8zoxzg-F.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$random$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/random.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/better-call/dist/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hash$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/hash.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$base64$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/base64.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/index.mjs [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hex$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/hex.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$B4Qoxdgc$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.B4Qoxdgc.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DBGfIDnh$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.DBGfIDnh.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DORkW_Ge$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.DORkW_Ge.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.D4HhkCZJ.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hmac$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/hmac.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$binary$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/binary.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$defu$2f$dist$2f$defu$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/defu/dist/defu.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$cookies$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/cookies/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DdzSJf$2d$n$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.DdzSJf-n.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$CW6D9eSx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.CW6D9eSx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$tB5eU6EY$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.tB5eU6EY.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$VTXNLFMT$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.VTXNLFMT.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DcfNPS8q$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.DcfNPS8q.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$crypto$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/crypto/index.mjs [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-fetch/fetch/dist/index.js [app-ssr] (ecmascript)");
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
;
;
;
function getTypeFromZodType(zodType) {
    if (zodType instanceof __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ZodString"]) {
        return "string";
    } else if (zodType instanceof __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ZodNumber"]) {
        return "number";
    } else if (zodType instanceof __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ZodBoolean"]) {
        return "boolean";
    } else if (zodType instanceof __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ZodObject"]) {
        return "object";
    } else if (zodType instanceof __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ZodArray"]) {
        return "array";
    }
    return "string";
}
function getFieldSchema(field) {
    const schema = {
        type: field.type === "date" ? "string" : field.type
    };
    if (field.defaultValue !== void 0) {
        schema.default = typeof field.defaultValue === "function" ? "Generated at runtime" : field.defaultValue;
    }
    if (field.input === false) {
        schema.readOnly = true;
    }
    return schema;
}
function getParameters(options) {
    const parameters = [];
    if (options.metadata?.openapi?.parameters) {
        parameters.push(...options.metadata.openapi.parameters);
        return parameters;
    }
    if (options.query instanceof __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ZodObject"]) {
        Object.entries(options.query.shape).forEach(([key, value])=>{
            if (value instanceof __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ZodType"]) {
                parameters.push({
                    name: key,
                    in: "query",
                    schema: {
                        type: getTypeFromZodType(value),
                        ..."minLength" in value && value.minLength ? {
                            minLength: value.minLength
                        } : {},
                        description: value.description
                    }
                });
            }
        });
    }
    return parameters;
}
function getRequestBody(options) {
    if (options.metadata?.openapi?.requestBody) {
        return options.metadata.openapi.requestBody;
    }
    if (!options.body) return void 0;
    if (options.body instanceof __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ZodObject"] || options.body instanceof __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ZodOptional"]) {
        const shape = options.body.shape;
        if (!shape) return void 0;
        const properties = {};
        const required = [];
        Object.entries(shape).forEach(([key, value])=>{
            if (value instanceof __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ZodType"]) {
                properties[key] = {
                    type: getTypeFromZodType(value),
                    description: value.description
                };
                if (!(value instanceof __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].ZodOptional)) {
                    required.push(key);
                }
            }
        });
        return {
            required: options.body instanceof __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ZodOptional"] ? false : options.body ? true : false,
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties,
                        required
                    }
                }
            }
        };
    }
    return void 0;
}
function getResponse(responses) {
    return {
        "400": {
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: "string"
                            }
                        },
                        required: [
                            "message"
                        ]
                    }
                }
            },
            description: "Bad Request. Usually due to missing parameters, or invalid parameters."
        },
        "401": {
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: "string"
                            }
                        },
                        required: [
                            "message"
                        ]
                    }
                }
            },
            description: "Unauthorized. Due to missing or invalid authentication."
        },
        "403": {
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: "string"
                            }
                        }
                    }
                }
            },
            description: "Forbidden. You do not have permission to access this resource or to perform this action."
        },
        "404": {
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: "string"
                            }
                        }
                    }
                }
            },
            description: "Not Found. The requested resource was not found."
        },
        "429": {
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: "string"
                            }
                        }
                    }
                }
            },
            description: "Too Many Requests. You have exceeded the rate limit. Try again later."
        },
        "500": {
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: "string"
                            }
                        }
                    }
                }
            },
            description: "Internal Server Error. This is a problem with the server that you cannot fix."
        },
        ...responses
    };
}
function toOpenApiPath(path) {
    return path.split("/").map((part)=>part.startsWith(":") ? `{${part.slice(1)}}` : part).join("/");
}
async function generator(ctx, options) {
    const baseEndpoints = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$api$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getEndpoints"])(ctx, {
        ...options,
        plugins: []
    });
    const tables = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DORkW_Ge$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["g"])(options);
    const models = Object.entries(tables).reduce((acc, [key, value])=>{
        const modelName = key.charAt(0).toUpperCase() + key.slice(1);
        const fields = value.fields;
        const required = [];
        const properties = {
            id: {
                type: "string"
            }
        };
        Object.entries(fields).forEach(([fieldKey, fieldValue])=>{
            if (!fieldValue) return;
            properties[fieldKey] = getFieldSchema(fieldValue);
            if (fieldValue.required && fieldValue.input !== false) {
                required.push(fieldKey);
            }
        });
        acc[modelName] = {
            type: "object",
            properties,
            ...required.length > 0 ? {
                required
            } : {}
        };
        return acc;
    }, {});
    const components = {
        schemas: {
            ...models
        }
    };
    const paths = {};
    Object.entries(baseEndpoints.api).forEach(([_, value])=>{
        if (ctx.options.disabledPaths?.includes(value.path)) return;
        const options2 = value.options;
        if (options2.metadata?.SERVER_ONLY) return;
        const path = toOpenApiPath(value.path);
        if (options2.method === "GET") {
            paths[path] = {
                get: {
                    tags: [
                        "Default",
                        ...options2.metadata?.openapi?.tags || []
                    ],
                    description: options2.metadata?.openapi?.description,
                    operationId: options2.metadata?.openapi?.operationId,
                    security: [
                        {
                            bearerAuth: []
                        }
                    ],
                    parameters: getParameters(options2),
                    responses: getResponse(options2.metadata?.openapi?.responses)
                }
            };
        }
        if (options2.method === "POST") {
            const body = getRequestBody(options2);
            paths[path] = {
                post: {
                    tags: [
                        "Default",
                        ...options2.metadata?.openapi?.tags || []
                    ],
                    description: options2.metadata?.openapi?.description,
                    operationId: options2.metadata?.openapi?.operationId,
                    security: [
                        {
                            bearerAuth: []
                        }
                    ],
                    parameters: getParameters(options2),
                    ...body ? {
                        requestBody: body
                    } : {
                        requestBody: {
                            //set body none
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {}
                                    }
                                }
                            }
                        }
                    },
                    responses: getResponse(options2.metadata?.openapi?.responses)
                }
            };
        }
    });
    for (const plugin of options.plugins || []){
        if (plugin.id === "open-api") {
            continue;
        }
        const pluginEndpoints = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$api$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getEndpoints"])(ctx, {
            ...options,
            plugins: [
                plugin
            ]
        });
        const api = Object.keys(pluginEndpoints.api).map((key)=>{
            if (baseEndpoints.api[key] === void 0) {
                return pluginEndpoints.api[key];
            }
            return null;
        }).filter((x)=>x !== null);
        Object.entries(api).forEach(([key, value])=>{
            if (ctx.options.disabledPaths?.includes(value.path)) return;
            const options2 = value.options;
            if (options2.metadata?.SERVER_ONLY) return;
            const path = toOpenApiPath(value.path);
            if (options2.method === "GET") {
                paths[path] = {
                    get: {
                        tags: options2.metadata?.openapi?.tags || [
                            plugin.id.charAt(0).toUpperCase() + plugin.id.slice(1)
                        ],
                        description: options2.metadata?.openapi?.description,
                        operationId: options2.metadata?.openapi?.operationId,
                        security: [
                            {
                                bearerAuth: []
                            }
                        ],
                        parameters: getParameters(options2),
                        responses: getResponse(options2.metadata?.openapi?.responses)
                    }
                };
            }
            if (options2.method === "POST") {
                paths[path] = {
                    post: {
                        tags: options2.metadata?.openapi?.tags || [
                            plugin.id.charAt(0).toUpperCase() + plugin.id.slice(1)
                        ],
                        description: options2.metadata?.openapi?.description,
                        operationId: options2.metadata?.openapi?.operationId,
                        security: [
                            {
                                bearerAuth: []
                            }
                        ],
                        parameters: getParameters(options2),
                        requestBody: getRequestBody(options2),
                        responses: getResponse(options2.metadata?.openapi?.responses)
                    }
                };
            }
        });
    }
    const res = {
        openapi: "3.1.1",
        info: {
            title: "Better Auth",
            description: "API Reference for your Better Auth Instance",
            version: "1.1.0"
        },
        components: {
            ...components,
            securitySchemes: {
                apiKeyCookie: {
                    type: "apiKey",
                    in: "cookie",
                    name: "apiKeyCookie",
                    description: "API Key authentication via cookie"
                },
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    description: "Bearer token authentication"
                }
            }
        },
        security: [
            {
                apiKeyCookie: [],
                bearerAuth: []
            }
        ],
        servers: [
            {
                url: ctx.baseURL
            }
        ],
        tags: [
            {
                name: "Default",
                description: "Default endpoints that are included with Better Auth by default. These endpoints are not part of any plugin."
            }
        ],
        paths
    };
    return res;
}
const logo = `<svg width="75" height="75" viewBox="0 0 75 75" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<rect width="75" height="75" fill="url(#pattern0_21_12)"/>
<defs>
<pattern id="pattern0_21_12" patternContentUnits="objectBoundingBox" width="1" height="1">
<use xlink:href="#image0_21_12" transform="scale(0.00094697)"/>
</pattern>
<image id="image0_21_12" width="1056" height="1056" xlink:href="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QBARXhpZgAATU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAEIKADAAQAAAABAAAEIAAAAAD/7QA4UGhvdG9zaG9wIDMuMAA4QklNBAQAAAAAAAA4QklNBCUAAAAAABDUHYzZjwCyBOmACZjs+EJ+/+ICKElDQ19QUk9GSUxFAAEBAAACGGFwcGwEAAAAbW50clJHQiBYWVogB+YAAQABAAAAAAAAYWNzcEFQUEwAAAAAQVBQTAAAAAAAAAAAAAAAAAAAAAAAAPbWAAEAAAAA0y1hcHBs7P2jjjiFR8NttL1PetoYLwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKZGVzYwAAAPwAAAAwY3BydAAAASwAAABQd3RwdAAAAXwAAAAUclhZWgAAAZAAAAAUZ1hZWgAAAaQAAAAUYlhZWgAAAbgAAAAUclRSQwAAAcwAAAAgY2hhZAAAAewAAAAsYlRSQwAAAcwAAAAgZ1RSQwAAAcwAAAAgbWx1YwAAAAAAAAABAAAADGVuVVMAAAAUAAAAHABEAGkAcwBwAGwAYQB5ACAAUAAzbWx1YwAAAAAAAAABAAAADGVuVVMAAAA0AAAAHABDAG8AcAB5AHIAaQBnAGgAdAAgAEEAcABwAGwAZQAgAEkAbgBjAC4ALAAgADIAMAAyADJYWVogAAAAAAAA9tUAAQAAAADTLFhZWiAAAAAAAACD3wAAPb////+7WFlaIAAAAAAAAEq/AACxNwAACrlYWVogAAAAAAAAKDgAABELAADIuXBhcmEAAAAAAAMAAAACZmYAAPKnAAANWQAAE9AAAApbc2YzMgAAAAAAAQxCAAAF3v//8yYAAAeTAAD9kP//+6L///2jAAAD3AAAwG7/wAARCAQgBCADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9sAQwACAgICAgIDAgIDBAMDAwQFBAQEBAUHBQUFBQUHCAcHBwcHBwgICAgICAgICgoKCgoKCwsLCwsNDQ0NDQ0NDQ0N/9sAQwECAgIDAwMGAwMGDQkHCQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0N/90ABABC/9oADAMBAAIRAxEAPwD9/KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//Q/fyiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/0f38ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/9L9/KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//T/fyiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/1P38ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/9X9/KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//W/fyiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/1/38ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/9D9/KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//R/fyiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/0v38ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/9P9/KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//U/fyiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/1f38ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/9b9/KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//X/fyiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/0P38ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/9H9/KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//S/fyiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/0/38ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/9T9/KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//V/fyiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/1v38ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAK/Ln/gq38a/in8Dvgp4T8R/CfxFdeG9SvvFMdlcXFoELyW5srqQxnzEcY3op4Gciv1Gr8Z/+C2X/JvXgj/sc4v/AE33lAH4z/8ADwv9tD/oq2tf9823/wAZo/4eF/tof9FW1r/vm2/+M18Z0UAfZn/Dwv8AbQ/6KtrX/fNt/wDGaP8Ah4X+2h/0VbWv++bb/wCM18Z0UAfZn/Dwv9tD/oq2tf8AfNt/8Zo/4eF/tof9FW1r/vm2/wDjNfGdFAH2Z/w8L/bQ/wCira1/3zbf/GaP+Hhf7aH/AEVbWv8Avm2/+M18Z0UAfZn/AA8L/bQ/6KtrX/fNt/8AGaP+Hhf7aH/RVta/75tv/jNfGdFAH2Z/w8L/AG0P+ira1/3zbf8Axmj/AIeF/tof9FW1r/vm2/8AjNfGdFAH63/sVftq/tTfEb9qb4deCfG3xF1TVtD1bVGgvbKdYBHPGIJW2ttiVsblB4I6V/UbX8Z//BPT/k9D4U/9hpv/AEmmr+zCgAooooAKKKKACiiigAooooAKKKKACiiigD+M/wD4eF/tof8ARVta/wC+bb/4zR/w8L/bQ/6KtrX/AHzbf/Ga+M6KAPsz/h4X+2h/0VbWv++bb/4zR/w8L/bQ/wCira1/3zbf/Ga+M6KAPsz/AIeF/tof9FW1r/vm2/8AjNH/AA8L/bQ/6KtrX/fNt/8AGa+M6KAPsz/h4X+2h/0VbWv++bb/AOM0f8PC/wBtD/oq2tf9823/AMZr4zooA+zP+Hhf7aH/AEVbWv8Avm2/+M0f8PC/20P+ira1/wB823/xmvjOigD7M/4eF/tof9FW1r/vm2/+M0f8PC/20P8Aoq2tf9823/xmvjOigD7M/wCHhf7aH/RVta/75tv/AIzR/wAPC/20P+ira1/3zbf/ABmvjOigD7M/4eF/tof9FW1r/vm2/wDjNH/Dwv8AbQ/6KtrX/fNt/wDGa+M6KAPsz/h4X+2h/wBFW1r/AL5tv/jNH/Dwv9tD/oq2tf8AfNt/8Zr4zooA+zP+Hhf7aH/RVta/75tv/jNH/Dwv9tD/AKKtrX/fNt/8Zr4zooA+zP8Ah4X+2h/0VbWv++bb/wCM0f8ADwv9tD/oq2tf9823/wAZr4zooA+zP+Hhf7aH/RVta/75tv8A4zR/w8L/AG0P+ira1/3zbf8AxmvjOigD7M/4eF/tof8ARVta/wC+bb/4zR/w8L/bQ/6KtrX/AHzbf/Ga+M6KAP6tv+CUnxr+Kfxx+CnizxH8WPEV14k1Kx8UyWVvcXYQPHbiytZBGPLRBje7HkZya/Uavxn/AOCJv/JvXjf/ALHOX/032dfsxQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAf//X/fyiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAr8Z/+C2X/JvXgj/sc4v/AE33lfsxX4z/APBbL/k3rwR/2OcX/pvvKAP5m6KKKACiiigAooooAKKKKACiiigAooooA+zP+Cen/J6Hwp/7DTf+k01f2YV/Gf8A8E9P+T0PhT/2Gm/9Jpq/swoAKKKKACiiigAooooAKKKKACiiigAooooA/gDooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA/pk/4Im/8m9eN/8Asc5f/TfZ1+zFfjP/AMETf+TevG//AGOcv/pvs6/ZigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA/9D9/KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACvxn/4LZf8m9eCP+xzi/8ATfeV+zFfjP8A8Fsv+TevBH/Y5xf+m+8oA/mbooooAKKKKACiiigAooooAKKKKACiiigD7M/4J6f8nofCn/sNN/6TTV/ZhX8Z/wDwT0/5PQ+FP/Yab/0mmr+zCgAooooAKKKKACiiigAooooAKKKKACiiigD+AOiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD+mT/gib/yb143/wCxzl/9N9nX7MV+M/8AwRN/5N68b/8AY5y/+m+zr9mKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/0f38ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAK/Gf/gtl/yb14I/7HOL/wBN95X7MV+M/wDwWy/5N68Ef9jnF/6b7ygD+ZuiiigAooooAKKKKACiiigAooooAKKKKAPsz/gnp/yeh8Kf+w03/pNNX9mFfxn/APBPT/k9D4U/9hpv/Saav7MKACiiigAooooAKKKKACiiigAooooAKKKKAP4A6KKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP6ZP+CJv/JvXjf/ALHOX/032dfsxX4z/wDBE3/k3rxv/wBjnL/6b7Ov2YoAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/S/fyiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAr8Z/+C2X/JvXgj/sc4v/AE33lfsxX4z/APBbL/k3rwR/2OcX/pvvKAP5m6KKKACiiigAooooAKKKKACiiigAooooA+zP+Cen/J6Hwp/7DTf+k01f2YV/Gf8A8E9P+T0PhT/2Gm/9Jpq/swoAKKKKACiiigAooooAKKKKACiiigAooooA/gDooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA/pk/4Im/8m9eN/8Asc5f/TfZ1+zFfjP/AMETf+TevG//AGOcv/pvs6/ZigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA/9P9/KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACvxn/4LZf8m9eCP+xzi/8ATfeV+zFfjP8A8Fsv+TevBH/Y5xf+m+8oA/mbooooAKKKKACiiigAooooAKKKKACiiigD7M/4J6f8nofCn/sNN/6TTV/ZhX8Z/wDwT0/5PQ+FP/Yab/0mmr+zCgAooooAKKKKACiiigAooooAKKKKACiiigD+AOiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD+mT/gib/yb143/wCxzl/9N9nX7MV+M/8AwRN/5N68b/8AY5y/+m+zr9mKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/1P38ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAK/Gf/gtl/yb14I/7HOL/wBN95X7MV+M/wDwWy/5N68Ef9jnF/6b7ygD+ZuiiigAooooAKKKKACiiigAooooAKKKKAPsz/gnp/yeh8Kf+w03/pNNX9mFfwq/BT4r638Dvin4d+LHhy0tb7UvDd0bu3t70ObeRzG0eJBGyPjDnowOa/Ub/h9l+0L/ANCR4M/79ah/8m0Af0yUV/M3/wAPsv2hf+hI8Gf9+tQ/+TaP+H2X7Qv/AEJHgz/v1qH/AMm0Af0yUV/M3/w+y/aF/wChI8Gf9+tQ/wDk2j/h9l+0L/0JHgz/AL9ah/8AJtAH9MlFfzN/8Psv2hf+hI8Gf9+tQ/8Ak2j/AIfZftC/9CR4M/79ah/8m0Af0yUV/M3/AMPsv2hf+hI8Gf8AfrUP/k2j/h9l+0L/ANCR4M/79ah/8m0Af0yUV/M3/wAPsv2hf+hI8Gf9+tQ/+TaP+H2X7Qv/AEJHgz/v1qH/AMm0Af0yUV/M3/w+y/aF/wChI8Gf9+tQ/wDk2j/h9l+0L/0JHgz/AL9ah/8AJtAH4z0V/TJ/w5N/Z6/6Hfxn/wB/dP8A/kKj/hyb+z1/0O/jP/v7p/8A8hUAfzN0V/TJ/wAOTf2ev+h38Z/9/dP/APkKj/hyb+z1/wBDv4z/AO/un/8AyFQB/M3RX9Mn/Dk39nr/AKHfxn/390//AOQqP+HJv7PX/Q7+M/8Av7p//wAhUAfzN0V/TJ/w5N/Z6/6Hfxn/AN/dP/8AkKj/AIcm/s9f9Dv4z/7+6f8A/IVAH8zdFf0yf8OTf2ev+h38Z/8Af3T/AP5Co/4cm/s9f9Dv4z/7+6f/APIVAH8zdFf0yf8ADk39nr/od/Gf/f3T/wD5Co/4cm/s9f8AQ7+M/wDv7p//AMhUAfzN0V/TJ/w5N/Z6/wCh38Z/9/dP/wDkKvwV/ag+FGifA74++M/hP4cu7q+03w3fi0t7i9KG4kQxRyZkMaomcueigYoA8FooooAKKKKACiiigAooooAKKKKACiiigD+mT/gib/yb143/AOxzl/8ATfZ1+zFfjP8A8ETf+TevG/8A2Ocv/pvs6/ZigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//9X9/KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACvxn/4LZf8m9eCP+xzi/8ATfeV+zFfjP8A8Fsv+TevBH/Y5xf+m+8oA/mbooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA/v8ooooAKKKKACiiigAooooAKKKKACiiigAr+M//goX/wAnofFb/sNL/wCk0Nf2YV/Gf/wUL/5PQ+K3/YaX/wBJoaAPjOiiigAooooAKKKKACiiigAooooAKKKKAP6ZP+CJv/JvXjf/ALHOX/032dfsxX4z/wDBE3/k3rxv/wBjnL/6b7Ov2YoAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/W/fyiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAr8Z/+C2X/JvXgj/sc4v/AE33lfsxX4z/APBbL/k3rwR/2OcX/pvvKAP5m6KKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP7/KKKKACiiigAooooAKKKKACiiigAooooAK/jP/4KF/8AJ6HxW/7DS/8ApNDX9mFfxn/8FC/+T0Pit/2Gl/8ASaGgD4zooooAKKKKACiiigAooooAKKKKACiiigD+mT/gib/yb143/wCxzl/9N9nX7MV+M/8AwRN/5N68b/8AY5y/+m+zr9mKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/1/38ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAK/Gf/gtl/yb14I/7HOL/wBN95X7MV+M/wDwWy/5N68Ef9jnF/6b7ygD+ZuiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD+/yiiigAooooAKKKKACiiigAooooAKKKKACv4z/+Chf/ACeh8Vv+w0v/AKTQ1/ZhX8Z//BQv/k9D4rf9hpf/AEmhoA+M6KKKACiiigAooooAKKKKACiiigAooooA/pk/4Im/8m9eN/8Asc5f/TfZ1+zFfjP/AMETf+TevG//AGOcv/pvs6/ZigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA/9D9/KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACvxn/4LZf8m9eCP+xzi/8ATfeV+zFfjP8A8Fsv+TevBH/Y5xf+m+8oA/mbooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA/v8ooooAKKKKACiiigAooooAKKKKACiiigAr+M//goX/wAnofFb/sNL/wCk0Nf2YV/Gf/wUL/5PQ+K3/YaX/wBJoaAPjOiiigAooooAKKKKACiiigAooooAKKKKAP6ZP+CJv/JvXjf/ALHOX/032dfsxX4z/wDBE3/k3rxv/wBjnL/6b7Ov2YoAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/R/fyiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAr8Z/+C2X/JvXgj/sc4v/AE33lfsxX4z/APBbL/k3rwR/2OcX/pvvKAP5m6KKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP7/KKKKACiiigAooooAKKKKACiiigAooooAK/jP/4KF/8AJ6HxW/7DS/8ApNDX9mFfxn/8FC/+T0Pit/2Gl/8ASaGgD4zooooAKKKKACiiigAooooAKKKKACiiigD+mT/gib/yb143/wCxzl/9N9nX7MV+M/8AwRN/5N68b/8AY5y/+m+zr9mKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/0v38ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAK/Gf/gtl/yb14I/7HOL/wBN95X7MV+M/wDwWy/5N68Ef9jnF/6b7ygD+ZuiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD+/yiiigAooooAKKKKACiiigAooooAKKKKACv4z/+Chf/ACeh8Vv+w0v/AKTQ1/ZhX8Z//BQv/k9D4rf9hpf/AEmhoA+M6KKKACiiigAooooAKKKKACiiigAooooA/pk/4Im/8m9eN/8Asc5f/TfZ1+zFfjP/AMETf+TevG//AGOcv/pvs6/ZigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA/9P9/KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACvxn/4LZf8m9eCP+xzi/8ATfeV+zFfjP8A8Fsv+TevBH/Y5xf+m+8oA/mbooooAKKKKACiiigAooooAKKKKACiiigD1L4KfCjW/jj8U/Dvwn8OXdrY6l4kujaW9xelxbxuI2kzIY1d8YQ9FJzX6jf8OTf2hf8Aod/Bn/f3UP8A5Cr4z/4J6f8AJ6Hwp/7DTf8ApNNX9mFAH8zf/Dk39oX/AKHfwZ/391D/AOQqP+HJv7Qv/Q7+DP8Av7qH/wAhV/TJRQB/M3/w5N/aF/6HfwZ/391D/wCQqP8Ahyb+0L/0O/gz/v7qH/yFX9MlFAH8zf8Aw5N/aF/6HfwZ/wB/dQ/+QqP+HJv7Qv8A0O/gz/v7qH/yFX9MlFAH8zf/AA5N/aF/6HfwZ/391D/5Co/4cm/tC/8AQ7+DP+/uof8AyFX9MlFAH8zf/Dk39oX/AKHfwZ/391D/AOQqP+HJv7Qv/Q7+DP8Av7qH/wAhV/TJRQB/M3/w5N/aF/6HfwZ/391D/wCQqP8Ahyb+0L/0O/gz/v7qH/yFX9MlFAH4z/8AD7L9nr/oSPGf/frT/wD5No/4fZfs9f8AQkeM/wDv1p//AMm1/M3RQB/TJ/w+y/Z6/wChI8Z/9+tP/wDk2j/h9l+z1/0JHjP/AL9af/8AJtfzN0UAf0yf8Psv2ev+hI8Z/wDfrT//AJNo/wCH2X7PX/QkeM/+/Wn/APybX8zdFAH9Mn/D7L9nr/oSPGf/AH60/wD+TaP+H2X7PX/QkeM/+/Wn/wDybX8zdFAH9Mn/AA+y/Z6/6Ejxn/360/8A+TaP+H2X7PX/AEJHjP8A79af/wDJtfzN0UAf0yf8Psv2ev8AoSPGf/frT/8A5No/4fZfs9f9CR4z/wC/Wn//ACbX8zdFAH9Mn/D7L9nr/oSPGf8A360//wCTa/BX9qD4r6J8cfj74z+LHhy0urHTfEl+Lu3t70ILiNBFHHiQRs6Zyh6MRivBaKACiiigAooooAKKKKACiiigAooooAKKKKAP6ZP+CJv/ACb143/7HOX/ANN9nX7MV+M//BE3/k3rxv8A9jnL/wCm+zr9mKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD//U/fyiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAr8Z/+C2X/JvXgj/sc4v/AE33lfsxX4z/APBbL/k3rwR/2OcX/pvvKAP5m6KKKACiiigAooooAKKKKACiiigAooooA+zP+Cen/J6Hwp/7DTf+k01f2YV/Gf8A8E9P+T0PhT/2Gm/9Jpq/swoAKKKKACiiigAooooAKKKKACiiigAooooA/gDooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA/pk/4Im/8m9eN/8Asc5f/TfZ1+zFfjP/AMETf+TevG//AGOcv/pvs6/ZigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA/9X9/KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACvxn/4LZf8m9eCP+xzi/8ATfeV+zFfjP8A8Fsv+TevBH/Y5xf+m+8oA/mbooooAKKKKACiiigAooooAKKKKACiiigD7M/4J6f8nofCn/sNN/6TTV/ZhX8Z/wDwT0/5PQ+FP/Yab/0mmr+zCgAooooAKKKKACiiigAooooAKKKKACiiigD+AOiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD+mT/gib/yb143/wCxzl/9N9nX7MV+M/8AwRN/5N68b/8AY5y/+m+zr9mKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/1v38ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAK/Gf/gtl/yb14I/7HOL/wBN95X7MV+M/wDwWy/5N68Ef9jnF/6b7ygD+ZuiiigAooooAKKKKACiiigAooooAKKKKAPsz/gnp/yeh8Kf+w03/pNNX9mFfxn/APBPT/k9D4U/9hpv/Saav7MKACiiigAooooAKKKKACiiigAooooAKKKKAP4A6KKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP6ZP+CJv/JvXjf/ALHOX/032dfsxX4z/wDBE3/k3rxv/wBjnL/6b7Ov2YoAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/X/fyiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAr8Z/+C2X/JvXgj/sc4v/AE33lfsxX4z/APBbL/k3rwR/2OcX/pvvKAP5m6KKKACiiigAooooAKKKKACiiigAooooA+zP+Cen/J6Hwp/7DTf+k01f2YV/Gf8A8E9P+T0PhT/2Gm/9Jpq/swoAKKKKACiiigAooooAKKKKACiiigAooooA/gDooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA/pk/4Im/8m9eN/8Asc5f/TfZ1+zFfjP/AMETf+TevG//AGOcv/pvs6/ZigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA/9D9/KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACvxn/4LZf8m9eCP+xzi/8ATfeV+zFfjP8A8Fsv+TevBH/Y5xf+m+8oA/mbooooAKKKKACiiigAooooAKKKKACiiigD7M/4J6f8nofCn/sNN/6TTV/ZhX8Z/wDwT0/5PQ+FP/Yab/0mmr+zCgAooooAKKKKACiiigAooooAKKKKACiiigD+AOiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD+mT/gib/yb143/wCxzl/9N9nX7MV+M/8AwRN/5N68b/8AY5y/+m+zr9mKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/0f38ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAK/Gf/gtl/yb14I/7HOL/wBN95X7MV+XP/BVv4KfFP44/BTwn4c+E/h268SalY+KY724t7QoHjtxZXUZkPmOgxvdRwc5NAH8pNFfZn/DvT9tD/olOtf99W3/AMeo/wCHen7aH/RKda/76tv/AI9QB8Z0V9mf8O9P20P+iU61/wB9W3/x6j/h3p+2h/0SnWv++rb/AOPUAfGdFfZn/DvT9tD/AKJTrX/fVt/8eo/4d6ftof8ARKda/wC+rb/49QB8Z0V9mf8ADvT9tD/olOtf99W3/wAeo/4d6ftof9Ep1r/vq2/+PUAfGdFfZn/DvT9tD/olOtf99W3/AMeo/wCHen7aH/RKda/76tv/AI9QB8Z0V9mf8O9P20P+iU61/wB9W3/x6j/h3p+2h/0SnWv++rb/AOPUAH/BPT/k9D4U/wDYab/0mmr+zCv5cv2Kv2Kv2pvhz+1N8OvG3jb4dappOh6TqjT3t7O0BjgjMEq7m2ys2NzAcA9a/qNoAKKKKACiiigAooooAKKKKACiiigAooooA/gDor7M/wCHen7aH/RKda/76tv/AI9R/wAO9P20P+iU61/31bf/AB6gD4zor7M/4d6ftof9Ep1r/vq2/wDj1H/DvT9tD/olOtf99W3/AMeoA+M6K+zP+Hen7aH/AESnWv8Avq2/+PUf8O9P20P+iU61/wB9W3/x6gD4zor7M/4d6ftof9Ep1r/vq2/+PUf8O9P20P8AolOtf99W3/x6gD4zor7M/wCHen7aH/RKda/76tv/AI9R/wAO9P20P+iU61/31bf/AB6gD4zor7M/4d6ftof9Ep1r/vq2/wDj1H/DvT9tD/olOtf99W3/AMeoA+M6K+zP+Hen7aH/AESnWv8Avq2/+PUf8O9P20P+iU61/wB9W3/x6gD4zor7M/4d6ftof9Ep1r/vq2/+PUf8O9P20P8AolOtf99W3/x6gD4zor7M/wCHen7aH/RKda/76tv/AI9R/wAO9P20P+iU61/31bf/AB6gD4zor7M/4d6ftof9Ep1r/vq2/wDj1H/DvT9tD/olOtf99W3/AMeoA+M6K+zP+Hen7aH/AESnWv8Avq2/+PUf8O9P20P+iU61/wB9W3/x6gD4zor7M/4d6ftof9Ep1r/vq2/+PUf8O9P20P8AolOtf99W3/x6gD4zor7M/wCHen7aH/RKda/76tv/AI9R/wAO9P20P+iU61/31bf/AB6gD9mP+CJv/JvXjf8A7HOX/wBN9nX7MV+XP/BKT4KfFP4HfBTxZ4c+LHh268N6lfeKZL23t7soXktzZWsYkHlu4xvRhyc5FfqNQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAf/9L9/KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//T/fyiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/1P38ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/9X9/KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//W/fyiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/1/38ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/9D9/KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//R/fyiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/0v38ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/9P9/KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//U/fyiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/1f38ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/9b9/KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//X/fyiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/0P38ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/9H9/KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//S/fyiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/0/38ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/9T9/KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//V/fyiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/1v38ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/9f9/KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA//Q/fyiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/2Q=="/>
</defs>
</svg>
`;
const getHTML = (apiReference)=>`<!doctype html>
<html>
  <head>
    <title>Scalar API Reference</title>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1" />
  </head>
  <body>
    <script
      id="api-reference"
      type="application/json">
    ${JSON.stringify(apiReference)}
    <\/script>
	 <script>
      var configuration = {
	  	favicon: "data:image/svg+xml;utf8,${encodeURIComponent(logo)}",
	   	theme: "saturn",
        metaData: {
			title: "Better Auth API",
			description: "API Reference for your Better Auth Instance",
		}
      }

      document.getElementById('api-reference').dataset.configuration =
        JSON.stringify(configuration)
    <\/script>
	  <script src="https://cdn.jsdelivr.net/npm/@scalar/api-reference"><\/script>
  </body>
</html>`;
const openAPI = (options)=>{
    const path = options?.path ?? "/reference";
    return {
        id: "open-api",
        endpoints: {
            generateOpenAPISchema: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["j"])("/open-api/generate-schema", {
                method: "GET"
            }, async (ctx)=>{
                const schema = await generator(ctx.context, ctx.context.options);
                return ctx.json(schema);
            }),
            openAPIReference: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["j"])(path, {
                method: "GET",
                metadata: {
                    isAction: false
                }
            }, async (ctx)=>{
                if (options?.disableDefaultReference) {
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("NOT_FOUND");
                }
                const schema = await generator(ctx.context, ctx.context.options);
                return new Response(getHTML(schema), {
                    headers: {
                        "Content-Type": "text/html"
                    }
                });
            })
        }
    };
};
;
}),
"[project]/packages/better-auth/dist/plugins/captcha/index.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "captcha": ()=>captcha
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-fetch/fetch/dist/index.js [app-ssr] (ecmascript)");
;
const defaultEndpoints = [
    "/sign-up/email",
    "/sign-in/email",
    "/forget-password"
];
const Providers = {
    CLOUDFLARE_TURNSTILE: "cloudflare-turnstile",
    GOOGLE_RECAPTCHA: "google-recaptcha",
    HCAPTCHA: "hcaptcha"
};
const siteVerifyMap = {
    [Providers.CLOUDFLARE_TURNSTILE]: "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    [Providers.GOOGLE_RECAPTCHA]: "https://www.google.com/recaptcha/api/siteverify",
    [Providers.HCAPTCHA]: "https://api.hcaptcha.com/siteverify"
};
const EXTERNAL_ERROR_CODES = {
    VERIFICATION_FAILED: "Captcha verification failed",
    MISSING_RESPONSE: "Missing CAPTCHA response",
    UNKNOWN_ERROR: "Something went wrong"
};
const INTERNAL_ERROR_CODES = {
    MISSING_SECRET_KEY: "Missing secret key",
    SERVICE_UNAVAILABLE: "CAPTCHA service unavailable"
};
const middlewareResponse = ({ message, status })=>({
        response: new Response(JSON.stringify({
            message
        }), {
            status
        })
    });
const cloudflareTurnstile = async ({ siteVerifyURL, captchaResponse, secretKey, remoteIP })=>{
    const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["betterFetch"])(siteVerifyURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            secret: secretKey,
            response: captchaResponse,
            ...remoteIP && {
                remoteip: remoteIP
            }
        })
    });
    if (!response.data || response.error) {
        throw new Error(INTERNAL_ERROR_CODES.SERVICE_UNAVAILABLE);
    }
    if (!response.data.success) {
        return middlewareResponse({
            message: EXTERNAL_ERROR_CODES.VERIFICATION_FAILED,
            status: 403
        });
    }
    return void 0;
};
const encodeToURLParams = (obj)=>{
    if (typeof obj !== "object" || obj === null || Array.isArray(obj)) {
        throw new Error("Input must be a non-null object.");
    }
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(obj)){
        if (value !== void 0 && value !== null) {
            params.append(key, String(value));
        }
    }
    return params.toString();
};
const isV3 = (response)=>{
    return "score" in response && typeof response.score === "number";
};
const googleRecaptcha = async ({ siteVerifyURL, captchaResponse, secretKey, minScore = 0.5, remoteIP })=>{
    const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["betterFetch"])(siteVerifyURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: encodeToURLParams({
            secret: secretKey,
            response: captchaResponse,
            ...remoteIP && {
                remoteip: remoteIP
            }
        })
    });
    if (!response.data || response.error) {
        throw new Error(INTERNAL_ERROR_CODES.SERVICE_UNAVAILABLE);
    }
    if (!response.data.success || isV3(response.data) && response.data.score < minScore) {
        return middlewareResponse({
            message: EXTERNAL_ERROR_CODES.VERIFICATION_FAILED,
            status: 403
        });
    }
    return void 0;
};
const hCaptcha = async ({ siteVerifyURL, captchaResponse, secretKey, siteKey, remoteIP })=>{
    const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["betterFetch"])(siteVerifyURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: encodeToURLParams({
            secret: secretKey,
            response: captchaResponse,
            ...siteKey && {
                sitekey: siteKey
            },
            ...remoteIP && {
                remoteip: remoteIP
            }
        })
    });
    if (!response.data || response.error) {
        throw new Error(INTERNAL_ERROR_CODES.SERVICE_UNAVAILABLE);
    }
    if (!response.data.success) {
        return middlewareResponse({
            message: EXTERNAL_ERROR_CODES.VERIFICATION_FAILED,
            status: 403
        });
    }
    return void 0;
};
const captcha = (options)=>({
        id: "captcha",
        onRequest: async (request, ctx)=>{
            try {
                const endpoints = options.endpoints?.length ? options.endpoints : defaultEndpoints;
                if (!endpoints.some((endpoint)=>request.url.includes(endpoint))) return void 0;
                if (!options.secretKey) {
                    throw new Error(INTERNAL_ERROR_CODES.MISSING_SECRET_KEY);
                }
                const captchaResponse = request.headers.get("x-captcha-response");
                const remoteUserIP = request.headers.get("x-captcha-user-remote-ip") ?? void 0;
                if (!captchaResponse) {
                    return middlewareResponse({
                        message: EXTERNAL_ERROR_CODES.MISSING_RESPONSE,
                        status: 400
                    });
                }
                const siteVerifyURL = options.siteVerifyURLOverride || siteVerifyMap[options.provider];
                const handlerParams = {
                    siteVerifyURL,
                    captchaResponse,
                    secretKey: options.secretKey,
                    remoteIP: remoteUserIP
                };
                if (options.provider === Providers.CLOUDFLARE_TURNSTILE) {
                    return await cloudflareTurnstile(handlerParams);
                }
                if (options.provider === Providers.GOOGLE_RECAPTCHA) {
                    return await googleRecaptcha({
                        ...handlerParams,
                        minScore: options.minScore
                    });
                }
                if (options.provider === Providers.HCAPTCHA) {
                    return await hCaptcha({
                        ...handlerParams,
                        siteKey: options.siteKey
                    });
                }
            } catch (_error) {
                const errorMessage = _error instanceof Error ? _error.message : void 0;
                ctx.logger.error(errorMessage ?? "Unknown error", {
                    endpoint: request.url,
                    message: _error
                });
                return middlewareResponse({
                    message: EXTERNAL_ERROR_CODES.UNKNOWN_ERROR,
                    status: 500
                });
            }
        }
    });
;
}),
"[project]/packages/better-auth/dist/plugins/haveibeenpwned/index.mjs [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "haveIBeenPwned": ()=>haveIBeenPwned
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/better-call/dist/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.D4HhkCZJ.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$8zoxzg$2d$F$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.8zoxzg-F.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$base64$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/base64.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hmac$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/hmac.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$binary$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/binary.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$n2KFGwjY$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.n2KFGwjY.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DBGfIDnh$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.DBGfIDnh.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$defu$2f$dist$2f$defu$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/defu/dist/defu.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hash$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/hash.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-fetch/fetch/dist/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$CW6D9eSx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.CW6D9eSx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$crypto$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/crypto/index.mjs [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/index.mjs [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hex$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/hex.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$B4Qoxdgc$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.B4Qoxdgc.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$random$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/random.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$VTXNLFMT$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.VTXNLFMT.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DdzSJf$2d$n$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.DdzSJf-n.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$cookies$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/cookies/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$tB5eU6EY$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.tB5eU6EY.mjs [app-ssr] (ecmascript)");
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
;
;
;
;
;
;
;
;
;
const ERROR_CODES = {
    PASSWORD_COMPROMISED: "The password you entered has been compromised. Please choose a different password."
};
async function checkPasswordCompromise(password, customMessage) {
    if (!password) return;
    const sha1Hash = (await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hash$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createHash"])("SHA-1", "hex").digest(password)).toUpperCase();
    const prefix = sha1Hash.substring(0, 5);
    const suffix = sha1Hash.substring(5);
    try {
        const { data, error } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["betterFetch"])(`https://api.pwnedpasswords.com/range/${prefix}`, {
            headers: {
                "Add-Padding": "true",
                "User-Agent": "BetterAuth Password Checker"
            }
        });
        if (error) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("INTERNAL_SERVER_ERROR", {
                message: `Failed to check password. Status: ${error.status}`
            });
        }
        const lines = data.split("\n");
        const found = lines.some((line)=>line.split(":")[0].toUpperCase() === suffix.toUpperCase());
        if (found) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
                message: customMessage || ERROR_CODES.PASSWORD_COMPROMISED,
                code: "PASSWORD_COMPROMISED"
            });
        }
    } catch (error) {
        if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]) throw error;
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("INTERNAL_SERVER_ERROR", {
            message: "Failed to check password. Please try again later."
        });
    }
}
const haveIBeenPwned = (options)=>({
        id: "haveIBeenPwned",
        init (ctx) {
            return {
                context: {
                    password: {
                        ...ctx.password,
                        async hash (password) {
                            await checkPasswordCompromise(password, options?.customPasswordCompromisedMessage);
                            return ctx.password.hash(password);
                        }
                    }
                }
            };
        },
        $ERROR_CODES: ERROR_CODES
    });
;
}),
"[project]/packages/better-auth/dist/plugins/index.mjs [app-ssr] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "getMCPProviderMetadata": ()=>getMCPProviderMetadata,
    "mcp": ()=>mcp,
    "oAuthDiscoveryMetadata": ()=>oAuthDiscoveryMetadata,
    "withMcpAuth": ()=>withMcpAuth
});
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DR6QsC6j$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.DR6QsC6j.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$plugins$2f$two$2d$factor$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/plugins/two-factor/index.mjs [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$plugins$2f$username$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/plugins/username/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$plugins$2f$bearer$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/plugins/bearer/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.D4HhkCZJ.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$plugins$2f$magic$2d$link$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/plugins/magic-link/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$plugins$2f$phone$2d$number$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/plugins/phone-number/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$plugins$2f$anonymous$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/plugins/anonymous/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DygEm6OX$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.DygEm6OX.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$plugins$2f$generic$2d$oauth$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/plugins/generic-oauth/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D1SaVuxk$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.D1SaVuxk.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$plugins$2f$multi$2d$session$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/plugins/multi-session/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$plugins$2f$email$2d$otp$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/plugins/email-otp/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$plugins$2f$one$2d$tap$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/plugins/one-tap/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$plugins$2f$oauth$2d$proxy$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/plugins/oauth-proxy/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$plugins$2f$custom$2d$session$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/plugins/custom-session/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$plugins$2f$open$2d$api$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/plugins/open-api/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$HDgvLN7B$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.HDgvLN7B.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$plugins$2f$captcha$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/plugins/captcha/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$Bqt8$2d$7ls$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.Bqt8-7ls.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$plugins$2f$haveibeenpwned$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/plugins/haveibeenpwned/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/node_modules/zod/v4/classic/schemas.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/better-call/dist/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$8zoxzg$2d$F$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.8zoxzg-F.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$base64$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/base64.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hmac$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/hmac.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$VTXNLFMT$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.VTXNLFMT.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$binary$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/binary.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$cookies$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/cookies/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$n2KFGwjY$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.n2KFGwjY.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DGaVMVAI$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.DGaVMVAI.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$plugins$2f$organization$2f$access$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/plugins/organization/access/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$random$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/random.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hash$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/hash.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$node$2f$esm$2f$jwt$2f$sign$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jose/dist/node/esm/jwt/sign.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/index.mjs [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uncrypto$2f$dist$2f$crypto$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/uncrypto/dist/crypto.node.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hex$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/hex.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$B4Qoxdgc$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.B4Qoxdgc.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DBGfIDnh$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.DBGfIDnh.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$defu$2f$dist$2f$defu$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/defu/dist/defu.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$otp$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/otp.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$plugins$2f$admin$2f$access$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/plugins/admin/access/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-fetch/fetch/dist/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$CGrHn1Ih$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.CGrHn1Ih.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$Ddw8bVyV$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.Ddw8bVyV.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$CW6D9eSx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.CW6D9eSx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DdzSJf$2d$n$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.DdzSJf-n.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$ffWeg50w$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.ffWeg50w.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$Dt0CvI2z$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.Dt0CvI2z.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DXqcUO8W$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.DXqcUO8W.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$crypto$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/crypto/index.mjs [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$YwDQhoPc$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.YwDQhoPc.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$tB5eU6EY$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.tB5eU6EY.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DQI8AD7d$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.DQI8AD7d.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$bkwPl2G4$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.bkwPl2G4.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$api$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/api/index.mjs [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DcfNPS8q$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.DcfNPS8q.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DORkW_Ge$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.DORkW_Ge.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$plugins$2f$access$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/plugins/access/index.mjs [app-ssr] (ecmascript)");
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
;
;
;
;
;
;
;
;
function redirectErrorURL(url, error, description) {
    return `${url.includes("?") ? "&" : "?"}error=${error}&error_description=${description}`;
}
async function authorizeMCPOAuth(ctx, options) {
    ctx.setHeader("Access-Control-Allow-Origin", "*");
    ctx.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    ctx.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    ctx.setHeader("Access-Control-Max-Age", "86400");
    const opts = {
        codeExpiresIn: 600,
        defaultScope: "openid",
        ...options,
        scopes: [
            "openid",
            "profile",
            "email",
            "offline_access",
            ...options?.scopes || []
        ]
    };
    if (!ctx.request) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("UNAUTHORIZED", {
            error_description: "request not found",
            error: "invalid_request"
        });
    }
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["k"])(ctx);
    if (!session) {
        await ctx.setSignedCookie("oidc_login_prompt", JSON.stringify(ctx.query), ctx.context.secret, {
            maxAge: 600,
            path: "/",
            sameSite: "lax"
        });
        const queryFromURL = ctx.request.url?.split("?")[1];
        throw ctx.redirect(`${options.loginPage}?${queryFromURL}`);
    }
    const query = ctx.query;
    console.log(query);
    if (!query.client_id) {
        throw ctx.redirect(`${ctx.context.baseURL}/error?error=invalid_client`);
    }
    if (!query.response_type) {
        throw ctx.redirect(redirectErrorURL(`${ctx.context.baseURL}/error`, "invalid_request", "response_type is required"));
    }
    const client = await ctx.context.adapter.findOne({
        model: "oauthApplication",
        where: [
            {
                field: "clientId",
                value: ctx.query.client_id
            }
        ]
    }).then((res)=>{
        if (!res) {
            return null;
        }
        return {
            ...res,
            redirectURLs: res.redirectURLs.split(","),
            metadata: res.metadata ? JSON.parse(res.metadata) : {}
        };
    });
    console.log(client);
    if (!client) {
        throw ctx.redirect(`${ctx.context.baseURL}/error?error=invalid_client`);
    }
    const redirectURI = client.redirectURLs.find((url)=>url === ctx.query.redirect_uri);
    if (!redirectURI || !query.redirect_uri) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
            message: "Invalid redirect URI"
        });
    }
    if (client.disabled) {
        throw ctx.redirect(`${ctx.context.baseURL}/error?error=client_disabled`);
    }
    if (query.response_type !== "code") {
        throw ctx.redirect(`${ctx.context.baseURL}/error?error=unsupported_response_type`);
    }
    const requestScope = query.scope?.split(" ").filter((s)=>s) || opts.defaultScope.split(" ");
    const invalidScopes = requestScope.filter((scope)=>{
        return !opts.scopes.includes(scope);
    });
    if (invalidScopes.length) {
        throw ctx.redirect(redirectErrorURL(query.redirect_uri, "invalid_scope", `The following scopes are invalid: ${invalidScopes.join(", ")}`));
    }
    if ((!query.code_challenge || !query.code_challenge_method) && options.requirePKCE) {
        throw ctx.redirect(redirectErrorURL(query.redirect_uri, "invalid_request", "pkce is required"));
    }
    if (!query.code_challenge_method) {
        query.code_challenge_method = "plain";
    }
    if (![
        "s256",
        options.allowPlainCodeChallengeMethod ? "plain" : "s256"
    ].includes(query.code_challenge_method?.toLowerCase() || "")) {
        throw ctx.redirect(redirectErrorURL(query.redirect_uri, "invalid_request", "invalid code_challenge method"));
    }
    const code = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$B4Qoxdgc$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["g"])(32, "a-z", "A-Z", "0-9");
    const codeExpiresInMs = opts.codeExpiresIn * 1e3;
    const expiresAt = new Date(Date.now() + codeExpiresInMs);
    try {
        await ctx.context.internalAdapter.createVerificationValue({
            value: JSON.stringify({
                clientId: client.clientId,
                redirectURI: query.redirect_uri,
                scope: requestScope,
                userId: session.user.id,
                authTime: session.session.createdAt.getTime(),
                /**
           * If the prompt is set to `consent`, then we need
           * to require the user to consent to the scopes.
           *
           * This means the code now needs to be treated as a
           * consent request.
           *
           * once the user consents, the code will be updated
           * with the actual code. This is to prevent the
           * client from using the code before the user
           * consents.
           */ requireConsent: query.prompt === "consent",
                state: query.prompt === "consent" ? query.state : null,
                codeChallenge: query.code_challenge,
                codeChallengeMethod: query.code_challenge_method,
                nonce: query.nonce
            }),
            identifier: code,
            expiresAt
        }, ctx);
    } catch (e) {
        throw ctx.redirect(redirectErrorURL(query.redirect_uri, "server_error", "An error occurred while processing the request"));
    }
    const redirectURIWithCode = new URL(redirectURI);
    redirectURIWithCode.searchParams.set("code", code);
    redirectURIWithCode.searchParams.set("state", ctx.query.state);
    if (query.prompt !== "consent") {
        throw ctx.redirect(redirectURIWithCode.toString());
    }
    throw ctx.redirect(redirectURIWithCode.toString());
}
const getMCPProviderMetadata = (ctx, options)=>{
    const issuer = ctx.context.options.baseURL;
    const baseURL = ctx.context.baseURL;
    if (!issuer || !baseURL) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("INTERNAL_SERVER_ERROR", {
            error: "invalid_issuer",
            error_description: "issuer or baseURL is not set. If you're the app developer, please make sure to set the `baseURL` in your auth config."
        });
    }
    return {
        issuer,
        authorization_endpoint: `${baseURL}/mcp/authorize`,
        token_endpoint: `${baseURL}/mcp/token`,
        userinfo_endpoint: `${baseURL}/mcp/userinfo`,
        jwks_uri: `${baseURL}/mcp/jwks`,
        registration_endpoint: `${baseURL}/mcp/register`,
        scopes_supported: [
            "openid",
            "profile",
            "email",
            "offline_access"
        ],
        response_types_supported: [
            "code"
        ],
        response_modes_supported: [
            "query"
        ],
        grant_types_supported: [
            "authorization_code",
            "refresh_token"
        ],
        acr_values_supported: [
            "urn:mace:incommon:iap:silver",
            "urn:mace:incommon:iap:bronze"
        ],
        subject_types_supported: [
            "public"
        ],
        id_token_signing_alg_values_supported: [
            "RS256",
            "none"
        ],
        token_endpoint_auth_methods_supported: [
            "client_secret_basic",
            "client_secret_post",
            "none"
        ],
        code_challenge_methods_supported: [
            "S256"
        ],
        claims_supported: [
            "sub",
            "iss",
            "aud",
            "exp",
            "nbf",
            "iat",
            "jti",
            "email",
            "email_verified",
            "name"
        ],
        ...options?.metadata
    };
};
const mcp = (options)=>{
    const opts = {
        codeExpiresIn: 600,
        defaultScope: "openid",
        accessTokenExpiresIn: 3600,
        refreshTokenExpiresIn: 604800,
        allowPlainCodeChallengeMethod: true,
        ...options.oidcConfig,
        loginPage: options.loginPage,
        scopes: [
            "openid",
            "profile",
            "email",
            "offline_access",
            ...options.oidcConfig?.scopes || []
        ]
    };
    const modelName = {
        oauthClient: "oauthApplication",
        oauthAccessToken: "oauthAccessToken"
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$HDgvLN7B$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["o"])(opts);
    return {
        id: "mcp",
        hooks: {
            after: [
                {
                    matcher () {
                        return true;
                    },
                    handler: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["i"])(async (ctx)=>{
                        const cookie = await ctx.getSignedCookie("oidc_login_prompt", ctx.context.secret);
                        const cookieName = ctx.context.authCookies.sessionToken.name;
                        const parsedSetCookieHeader = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$cookies$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseSetCookieHeader"])(ctx.context.responseHeaders?.get("set-cookie") || "");
                        const hasSessionToken = parsedSetCookieHeader.has(cookieName);
                        if (!cookie || !hasSessionToken) {
                            return;
                        }
                        ctx.setCookie("oidc_login_prompt", "", {
                            maxAge: 0
                        });
                        const sessionCookie = parsedSetCookieHeader.get(cookieName)?.value;
                        const sessionToken = sessionCookie?.split(".")[0];
                        if (!sessionToken) {
                            return;
                        }
                        const session = await ctx.context.internalAdapter.findSession(sessionToken);
                        if (!session) {
                            return;
                        }
                        ctx.query = JSON.parse(cookie);
                        ctx.query.prompt = "consent";
                        ctx.context.session = session;
                        const response = await authorizeMCPOAuth(ctx, opts).catch((e)=>{
                            if (e instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]) {
                                if (e.statusCode === 302) {
                                    return ctx.json({
                                        redirect: true,
                                        //@ts-expect-error
                                        url: e.headers.get("location")
                                    });
                                }
                            }
                            throw e;
                        });
                        return response;
                    })
                }
            ]
        },
        endpoints: {
            getMcpOAuthConfig: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["j"])("/.well-known/oauth-authorization-server", {
                method: "GET",
                metadata: {
                    client: false
                }
            }, async (c)=>{
                try {
                    const metadata = getMCPProviderMetadata(c, options);
                    return c.json(metadata);
                } catch (e) {
                    console.log(e);
                    return c.json(null);
                }
            }),
            mcpOAuthAuthroize: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["j"])("/mcp/authorize", {
                method: "GET",
                query: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["record"](__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"](), __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["any"]()),
                metadata: {
                    openapi: {
                        description: "Authorize an OAuth2 request using MCP",
                        responses: {
                            "200": {
                                description: "Authorization response generated successfully",
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object",
                                            additionalProperties: true,
                                            description: "Authorization response, contents depend on the authorize function implementation"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }, async (ctx)=>{
                return authorizeMCPOAuth(ctx, opts);
            }),
            mcpOAuthToken: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["j"])("/mcp/token", {
                method: "POST",
                body: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["record"](__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["any"](), __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["any"]()),
                metadata: {
                    isAction: false
                }
            }, async (ctx)=>{
                ctx.setHeader("Access-Control-Allow-Origin", "*");
                ctx.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
                ctx.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
                ctx.setHeader("Access-Control-Max-Age", "86400");
                let { body } = ctx;
                if (!body) {
                    throw ctx.error("BAD_REQUEST", {
                        error_description: "request body not found",
                        error: "invalid_request"
                    });
                }
                if (body instanceof FormData) {
                    body = Object.fromEntries(body.entries());
                }
                if (!(body instanceof Object)) {
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
                        error_description: "request body is not an object",
                        error: "invalid_request"
                    });
                }
                let { client_id, client_secret } = body;
                const authorization = ctx.request?.headers.get("authorization") || null;
                if (authorization && !client_id && !client_secret && authorization.startsWith("Basic ")) {
                    try {
                        const encoded = authorization.replace("Basic ", "");
                        const decoded = new TextDecoder().decode(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$base64$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["base64"].decode(encoded));
                        if (!decoded.includes(":")) {
                            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("UNAUTHORIZED", {
                                error_description: "invalid authorization header format",
                                error: "invalid_client"
                            });
                        }
                        const [id, secret] = decoded.split(":");
                        if (!id || !secret) {
                            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("UNAUTHORIZED", {
                                error_description: "invalid authorization header format",
                                error: "invalid_client"
                            });
                        }
                        client_id = id;
                        client_secret = secret;
                    } catch (error) {
                        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("UNAUTHORIZED", {
                            error_description: "invalid authorization header format",
                            error: "invalid_client"
                        });
                    }
                }
                const { grant_type, code, redirect_uri, refresh_token, code_verifier } = body;
                if (grant_type === "refresh_token") {
                    if (!refresh_token) {
                        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
                            error_description: "refresh_token is required",
                            error: "invalid_request"
                        });
                    }
                    const token = await ctx.context.adapter.findOne({
                        model: "oauthAccessToken",
                        where: [
                            {
                                field: "refreshToken",
                                value: refresh_token.toString()
                            }
                        ]
                    });
                    if (!token) {
                        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("UNAUTHORIZED", {
                            error_description: "invalid refresh token",
                            error: "invalid_grant"
                        });
                    }
                    if (token.clientId !== client_id?.toString()) {
                        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("UNAUTHORIZED", {
                            error_description: "invalid client_id",
                            error: "invalid_client"
                        });
                    }
                    if (token.refreshTokenExpiresAt < /* @__PURE__ */ new Date()) {
                        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("UNAUTHORIZED", {
                            error_description: "refresh token expired",
                            error: "invalid_grant"
                        });
                    }
                    const accessToken2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$B4Qoxdgc$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["g"])(32, "a-z", "A-Z");
                    const newRefreshToken = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$B4Qoxdgc$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["g"])(32, "a-z", "A-Z");
                    const accessTokenExpiresAt2 = new Date(Date.now() + opts.accessTokenExpiresIn * 1e3);
                    const refreshTokenExpiresAt2 = new Date(Date.now() + opts.refreshTokenExpiresIn * 1e3);
                    await ctx.context.adapter.create({
                        model: modelName.oauthAccessToken,
                        data: {
                            accessToken: accessToken2,
                            refreshToken: newRefreshToken,
                            accessTokenExpiresAt: accessTokenExpiresAt2,
                            refreshTokenExpiresAt: refreshTokenExpiresAt2,
                            clientId: client_id.toString(),
                            userId: token.userId,
                            scopes: token.scopes,
                            createdAt: /* @__PURE__ */ new Date(),
                            updatedAt: /* @__PURE__ */ new Date()
                        }
                    });
                    return ctx.json({
                        access_token: accessToken2,
                        token_type: "bearer",
                        expires_in: opts.accessTokenExpiresIn,
                        refresh_token: newRefreshToken,
                        scope: token.scopes
                    });
                }
                if (!code) {
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
                        error_description: "code is required",
                        error: "invalid_request"
                    });
                }
                if (opts.requirePKCE && !code_verifier) {
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
                        error_description: "code verifier is missing",
                        error: "invalid_request"
                    });
                }
                const verificationValue = await ctx.context.internalAdapter.findVerificationValue(code.toString());
                if (!verificationValue) {
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("UNAUTHORIZED", {
                        error_description: "invalid code",
                        error: "invalid_grant"
                    });
                }
                if (verificationValue.expiresAt < /* @__PURE__ */ new Date()) {
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("UNAUTHORIZED", {
                        error_description: "code expired",
                        error: "invalid_grant"
                    });
                }
                await ctx.context.internalAdapter.deleteVerificationValue(verificationValue.id);
                if (!client_id) {
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("UNAUTHORIZED", {
                        error_description: "client_id is required",
                        error: "invalid_client"
                    });
                }
                if (!grant_type) {
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
                        error_description: "grant_type is required",
                        error: "invalid_request"
                    });
                }
                if (grant_type !== "authorization_code") {
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
                        error_description: "grant_type must be 'authorization_code'",
                        error: "unsupported_grant_type"
                    });
                }
                if (!redirect_uri) {
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
                        error_description: "redirect_uri is required",
                        error: "invalid_request"
                    });
                }
                const client = await ctx.context.adapter.findOne({
                    model: modelName.oauthClient,
                    where: [
                        {
                            field: "clientId",
                            value: client_id.toString()
                        }
                    ]
                }).then((res)=>{
                    if (!res) {
                        return null;
                    }
                    return {
                        ...res,
                        redirectURLs: res.redirectURLs.split(","),
                        metadata: res.metadata ? JSON.parse(res.metadata) : {}
                    };
                });
                if (!client) {
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("UNAUTHORIZED", {
                        error_description: "invalid client_id",
                        error: "invalid_client"
                    });
                }
                if (client.disabled) {
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("UNAUTHORIZED", {
                        error_description: "client is disabled",
                        error: "invalid_client"
                    });
                }
                if (client.type === "public") {
                    if (!code_verifier) {
                        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
                            error_description: "code verifier is required for public clients",
                            error: "invalid_request"
                        });
                    }
                } else {
                    if (!client_secret) {
                        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("UNAUTHORIZED", {
                            error_description: "client_secret is required for confidential clients",
                            error: "invalid_client"
                        });
                    }
                    const isValidSecret = client.clientSecret === client_secret.toString();
                    if (!isValidSecret) {
                        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("UNAUTHORIZED", {
                            error_description: "invalid client_secret",
                            error: "invalid_client"
                        });
                    }
                }
                const value = JSON.parse(verificationValue.value);
                if (value.clientId !== client_id.toString()) {
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("UNAUTHORIZED", {
                        error_description: "invalid client_id",
                        error: "invalid_client"
                    });
                }
                if (value.redirectURI !== redirect_uri.toString()) {
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("UNAUTHORIZED", {
                        error_description: "invalid redirect_uri",
                        error: "invalid_client"
                    });
                }
                if (value.codeChallenge && !code_verifier) {
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
                        error_description: "code verifier is missing",
                        error: "invalid_request"
                    });
                }
                const challenge = value.codeChallengeMethod === "plain" ? code_verifier : await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hash$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createHash"])("SHA-256", "base64urlnopad").digest(code_verifier);
                if (challenge !== value.codeChallenge) {
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("UNAUTHORIZED", {
                        error_description: "code verification failed",
                        error: "invalid_request"
                    });
                }
                const requestedScopes = value.scope;
                await ctx.context.internalAdapter.deleteVerificationValue(verificationValue.id);
                const accessToken = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$B4Qoxdgc$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["g"])(32, "a-z", "A-Z");
                const refreshToken = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$B4Qoxdgc$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["g"])(32, "A-Z", "a-z");
                const accessTokenExpiresAt = new Date(Date.now() + opts.accessTokenExpiresIn * 1e3);
                const refreshTokenExpiresAt = new Date(Date.now() + opts.refreshTokenExpiresIn * 1e3);
                await ctx.context.adapter.create({
                    model: modelName.oauthAccessToken,
                    data: {
                        accessToken,
                        refreshToken,
                        accessTokenExpiresAt,
                        refreshTokenExpiresAt,
                        clientId: client_id.toString(),
                        userId: value.userId,
                        scopes: requestedScopes.join(" "),
                        createdAt: /* @__PURE__ */ new Date(),
                        updatedAt: /* @__PURE__ */ new Date()
                    }
                });
                const user = await ctx.context.internalAdapter.findUserById(value.userId);
                if (!user) {
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("UNAUTHORIZED", {
                        error_description: "user not found",
                        error: "invalid_grant"
                    });
                }
                let secretKey = {
                    alg: "HS256",
                    key: await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$uncrypto$2f$dist$2f$crypto$2e$node$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["subtle"].generateKey({
                        name: "HMAC",
                        hash: "SHA-256"
                    }, true, [
                        "sign",
                        "verify"
                    ])
                };
                const profile = {
                    given_name: user.name.split(" ")[0],
                    family_name: user.name.split(" ")[1],
                    name: user.name,
                    profile: user.image,
                    updated_at: user.updatedAt.toISOString()
                };
                const email = {
                    email: user.email,
                    email_verified: user.emailVerified
                };
                const userClaims = {
                    ...requestedScopes.includes("profile") ? profile : {},
                    ...requestedScopes.includes("email") ? email : {}
                };
                const additionalUserClaims = opts.getAdditionalUserInfoClaim ? opts.getAdditionalUserInfoClaim(user, requestedScopes) : {};
                const idToken = await new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jose$2f$dist$2f$node$2f$esm$2f$jwt$2f$sign$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SignJWT"]({
                    sub: user.id,
                    aud: client_id.toString(),
                    iat: Date.now(),
                    auth_time: ctx.context.session?.session.createdAt.getTime(),
                    nonce: value.nonce,
                    acr: "urn:mace:incommon:iap:silver",
                    // default to silver - ⚠︎ this should be configurable and should be validated against the client's metadata
                    ...userClaims,
                    ...additionalUserClaims
                }).setProtectedHeader({
                    alg: secretKey.alg
                }).setIssuedAt().setExpirationTime(Math.floor(Date.now() / 1e3) + opts.accessTokenExpiresIn).sign(secretKey.key);
                return ctx.json({
                    access_token: accessToken,
                    token_type: "Bearer",
                    expires_in: opts.accessTokenExpiresIn,
                    refresh_token: requestedScopes.includes("offline_access") ? refreshToken : void 0,
                    scope: requestedScopes.join(" "),
                    id_token: requestedScopes.includes("openid") ? idToken : void 0
                }, {
                    headers: {
                        "Cache-Control": "no-store",
                        Pragma: "no-cache"
                    }
                });
            }),
            registerMcpClient: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["j"])("/mcp/register", {
                method: "POST",
                body: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["object"]({
                    redirect_uris: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["array"](__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"]()),
                    token_endpoint_auth_method: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["enum"]([
                        "none",
                        "client_secret_basic",
                        "client_secret_post"
                    ]).default("client_secret_basic").optional(),
                    grant_types: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["array"](__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["enum"]([
                        "authorization_code",
                        "implicit",
                        "password",
                        "client_credentials",
                        "refresh_token",
                        "urn:ietf:params:oauth:grant-type:jwt-bearer",
                        "urn:ietf:params:oauth:grant-type:saml2-bearer"
                    ])).default([
                        "authorization_code"
                    ]).optional(),
                    response_types: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["array"](__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["enum"]([
                        "code",
                        "token"
                    ])).default([
                        "code"
                    ]).optional(),
                    client_name: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"]().optional(),
                    client_uri: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"]().optional(),
                    logo_uri: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"]().optional(),
                    scope: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"]().optional(),
                    contacts: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["array"](__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"]()).optional(),
                    tos_uri: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"]().optional(),
                    policy_uri: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"]().optional(),
                    jwks_uri: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"]().optional(),
                    jwks: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["record"](__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"](), __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["any"]()).optional(),
                    metadata: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["record"](__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["any"](), __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["any"]()).optional(),
                    software_id: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"]().optional(),
                    software_version: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"]().optional(),
                    software_statement: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["string"]().optional()
                }),
                metadata: {
                    openapi: {
                        description: "Register an OAuth2 application",
                        responses: {
                            "200": {
                                description: "OAuth2 application registered successfully",
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object",
                                            properties: {
                                                name: {
                                                    type: "string",
                                                    description: "Name of the OAuth2 application"
                                                },
                                                icon: {
                                                    type: "string",
                                                    nullable: true,
                                                    description: "Icon URL for the application"
                                                },
                                                metadata: {
                                                    type: "object",
                                                    additionalProperties: true,
                                                    nullable: true,
                                                    description: "Additional metadata for the application"
                                                },
                                                clientId: {
                                                    type: "string",
                                                    description: "Unique identifier for the client"
                                                },
                                                clientSecret: {
                                                    type: "string",
                                                    description: "Secret key for the client. Not included for public clients."
                                                },
                                                redirectURLs: {
                                                    type: "array",
                                                    items: {
                                                        type: "string",
                                                        format: "uri"
                                                    },
                                                    description: "List of allowed redirect URLs"
                                                },
                                                type: {
                                                    type: "string",
                                                    description: "Type of the client",
                                                    enum: [
                                                        "web",
                                                        "public"
                                                    ]
                                                },
                                                authenticationScheme: {
                                                    type: "string",
                                                    description: "Authentication scheme used by the client",
                                                    enum: [
                                                        "client_secret",
                                                        "none"
                                                    ]
                                                },
                                                disabled: {
                                                    type: "boolean",
                                                    description: "Whether the client is disabled",
                                                    enum: [
                                                        false
                                                    ]
                                                },
                                                userId: {
                                                    type: "string",
                                                    nullable: true,
                                                    description: "ID of the user who registered the client, null if registered anonymously"
                                                },
                                                createdAt: {
                                                    type: "string",
                                                    format: "date-time",
                                                    description: "Creation timestamp"
                                                },
                                                updatedAt: {
                                                    type: "string",
                                                    format: "date-time",
                                                    description: "Last update timestamp"
                                                }
                                            },
                                            required: [
                                                "name",
                                                "clientId",
                                                "redirectURLs",
                                                "type",
                                                "authenticationScheme",
                                                "disabled",
                                                "createdAt",
                                                "updatedAt"
                                            ]
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }, async (ctx)=>{
                const body = ctx.body;
                const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["k"])(ctx);
                ctx.setHeader("Access-Control-Allow-Origin", "*");
                ctx.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
                ctx.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
                ctx.setHeader("Access-Control-Max-Age", "86400");
                ctx.headers?.set("Access-Control-Max-Age", "86400");
                if ((!body.grant_types || body.grant_types.includes("authorization_code") || body.grant_types.includes("implicit")) && (!body.redirect_uris || body.redirect_uris.length === 0)) {
                    throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
                        error: "invalid_redirect_uri",
                        error_description: "Redirect URIs are required for authorization_code and implicit grant types"
                    });
                }
                if (body.grant_types && body.response_types) {
                    if (body.grant_types.includes("authorization_code") && !body.response_types.includes("code")) {
                        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
                            error: "invalid_client_metadata",
                            error_description: "When 'authorization_code' grant type is used, 'code' response type must be included"
                        });
                    }
                    if (body.grant_types.includes("implicit") && !body.response_types.includes("token")) {
                        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["APIError"]("BAD_REQUEST", {
                            error: "invalid_client_metadata",
                            error_description: "When 'implicit' grant type is used, 'token' response type must be included"
                        });
                    }
                }
                const clientId = opts.generateClientId?.() || (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$B4Qoxdgc$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["g"])(32, "a-z", "A-Z");
                const clientSecret = opts.generateClientSecret?.() || (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$B4Qoxdgc$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["g"])(32, "a-z", "A-Z");
                const clientType = body.token_endpoint_auth_method === "none" ? "public" : "web";
                const finalClientSecret = clientType === "public" ? "" : clientSecret;
                await ctx.context.adapter.create({
                    model: modelName.oauthClient,
                    data: {
                        name: body.client_name,
                        icon: body.logo_uri,
                        metadata: body.metadata ? JSON.stringify(body.metadata) : null,
                        clientId,
                        clientSecret: finalClientSecret,
                        redirectURLs: body.redirect_uris.join(","),
                        type: clientType,
                        authenticationScheme: body.token_endpoint_auth_method || "client_secret_basic",
                        disabled: false,
                        userId: session?.session.userId,
                        createdAt: /* @__PURE__ */ new Date(),
                        updatedAt: /* @__PURE__ */ new Date()
                    }
                });
                const responseData = {
                    client_id: clientId,
                    client_id_issued_at: Math.floor(Date.now() / 1e3),
                    redirect_uris: body.redirect_uris,
                    token_endpoint_auth_method: body.token_endpoint_auth_method || "client_secret_basic",
                    grant_types: body.grant_types || [
                        "authorization_code"
                    ],
                    response_types: body.response_types || [
                        "code"
                    ],
                    client_name: body.client_name,
                    client_uri: body.client_uri,
                    logo_uri: body.logo_uri,
                    scope: body.scope,
                    contacts: body.contacts,
                    tos_uri: body.tos_uri,
                    policy_uri: body.policy_uri,
                    jwks_uri: body.jwks_uri,
                    jwks: body.jwks,
                    software_id: body.software_id,
                    software_version: body.software_version,
                    software_statement: body.software_statement,
                    metadata: body.metadata,
                    ...clientType !== "public" ? {
                        client_secret: finalClientSecret,
                        client_secret_expires_at: 0
                    } : {}
                };
                return ctx.json(responseData, {
                    status: 201,
                    headers: {
                        "Cache-Control": "no-store",
                        Pragma: "no-cache"
                    }
                });
            }),
            getMcpSession: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["j"])("/mcp/get-session", {
                method: "GET",
                requireHeaders: true
            }, async (c)=>{
                const accessToken = c.headers?.get("Authorization")?.replace("Bearer ", "");
                if (!accessToken) {
                    c.headers?.set("WWW-Authenticate", "Bearer");
                    return c.json(null);
                }
                const accessTokenData = await c.context.adapter.findOne({
                    model: modelName.oauthAccessToken,
                    where: [
                        {
                            field: "accessToken",
                            value: accessToken
                        }
                    ]
                });
                if (!accessTokenData) {
                    return c.json(null);
                }
                return c.json(accessTokenData);
            })
        },
        schema: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$HDgvLN7B$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["s"]
    };
};
const withMcpAuth = (auth, handler)=>{
    return async (req)=>{
        const baseURL = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$VTXNLFMT$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["a"])(auth.options.baseURL, auth.options.basePath);
        if (!baseURL && !__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$8zoxzg$2d$F$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["a"]) {
            __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DBGfIDnh$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["a"].warn("Unable to get the baseURL, please check your config!");
        }
        const session = await auth.api.getMcpSession({
            headers: req.headers
        });
        const wwwAuthenticateValue = `Bearer resource_metadata=${baseURL}/api/auth/.well-known/oauth-authorization-server`;
        if (!session) {
            return Response.json({
                jsonrpc: "2.0",
                error: {
                    code: -32e3,
                    message: "Unauthorized: Authentication required",
                    "www-authenticate": wwwAuthenticateValue
                },
                id: null
            }, {
                status: 401,
                headers: {
                    "WWW-Authenticate": wwwAuthenticateValue
                }
            });
        }
        return handler(req, session);
    };
};
const oAuthDiscoveryMetadata = (auth)=>{
    return async (request)=>{
        const res = await auth.api.getMcpOAuthConfig();
        return new Response(JSON.stringify(res), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
                "Access-Control-Max-Age": "86400"
            }
        });
    };
};
;
}),
"[project]/packages/better-auth/dist/plugins/index.mjs [app-ssr] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DR6QsC6j$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.DR6QsC6j.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$plugins$2f$two$2d$factor$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/plugins/two-factor/index.mjs [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$plugins$2f$username$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/plugins/username/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$plugins$2f$bearer$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/plugins/bearer/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D4HhkCZJ$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.D4HhkCZJ.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$plugins$2f$magic$2d$link$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/plugins/magic-link/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$plugins$2f$phone$2d$number$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/plugins/phone-number/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$plugins$2f$anonymous$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/plugins/anonymous/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DygEm6OX$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.DygEm6OX.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$plugins$2f$generic$2d$oauth$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/plugins/generic-oauth/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$D1SaVuxk$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.D1SaVuxk.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$plugins$2f$multi$2d$session$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/plugins/multi-session/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$plugins$2f$email$2d$otp$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/plugins/email-otp/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$plugins$2f$one$2d$tap$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/plugins/one-tap/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$plugins$2f$oauth$2d$proxy$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/plugins/oauth-proxy/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$plugins$2f$custom$2d$session$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/plugins/custom-session/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$plugins$2f$open$2d$api$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/plugins/open-api/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$HDgvLN7B$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.HDgvLN7B.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$plugins$2f$captcha$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/plugins/captcha/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$Bqt8$2d$7ls$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.Bqt8-7ls.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$plugins$2f$haveibeenpwned$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/plugins/haveibeenpwned/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$better$2d$call$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/better-call/dist/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$8zoxzg$2d$F$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.8zoxzg-F.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$base64$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/base64.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hmac$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/hmac.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$VTXNLFMT$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.VTXNLFMT.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$binary$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/binary.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$cookies$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/cookies/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$n2KFGwjY$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.n2KFGwjY.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DGaVMVAI$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.DGaVMVAI.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$plugins$2f$organization$2f$access$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/plugins/organization/access/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$random$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/random.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hash$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/hash.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/index.mjs [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$hex$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/hex.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$B4Qoxdgc$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.B4Qoxdgc.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DBGfIDnh$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.DBGfIDnh.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$defu$2f$dist$2f$defu$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/defu/dist/defu.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$auth$2f$utils$2f$dist$2f$otp$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-auth/utils/dist/otp.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$plugins$2f$admin$2f$access$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/plugins/admin/access/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$better$2d$fetch$2f$fetch$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@better-fetch/fetch/dist/index.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$CGrHn1Ih$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.CGrHn1Ih.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$Ddw8bVyV$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.Ddw8bVyV.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$CW6D9eSx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.CW6D9eSx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DdzSJf$2d$n$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.DdzSJf-n.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$ffWeg50w$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.ffWeg50w.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$Dt0CvI2z$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.Dt0CvI2z.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DXqcUO8W$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.DXqcUO8W.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$crypto$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/crypto/index.mjs [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$YwDQhoPc$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.YwDQhoPc.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$tB5eU6EY$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.tB5eU6EY.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DQI8AD7d$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.DQI8AD7d.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$bkwPl2G4$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.bkwPl2G4.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$api$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/api/index.mjs [app-ssr] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DcfNPS8q$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.DcfNPS8q.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$shared$2f$better$2d$auth$2e$DORkW_Ge$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/shared/better-auth.DORkW_Ge.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$plugins$2f$access$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/plugins/access/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$better$2d$auth$2f$dist$2f$plugins$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/better-auth/dist/plugins/index.mjs [app-ssr] (ecmascript) <locals>");
}),

};

//# sourceMappingURL=packages_better-auth_dist_plugins_f01465bc._.js.map