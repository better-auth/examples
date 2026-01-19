import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("sign-in", "routes/sign-in.tsx"),
    route("dashboard", "routes/dashboard.tsx"),
    route("two-factor", "routes/two-factor/_index.tsx"),
    route("two-factor/otp", "routes/two-factor/otp/_index.tsx"),
    route("api/auth/*", "routes/api.auth.$.ts"),
] satisfies RouteConfig;
