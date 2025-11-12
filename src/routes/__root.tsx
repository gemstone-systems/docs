/// <reference types="vite/client" />
import {
    Outlet,
    createRootRoute,
    HeadContent,
    Scripts,
} from "@tanstack/react-router";
import appCss from "../styles/app.css?url";
import { RootProvider } from "fumadocs-ui/provider/tanstack";

export const Route = createRootRoute({
    head: () => ({
        meta: [
            {
                charSet: "utf-8",
            },
            {
                name: "viewport",
                content: "width=device-width, initial-scale=1",
            },
            {
                title: `${import.meta.env.DEV ? "(dev) " : ""}Gemstone Documentation | Gemstone Systems`,
            },
        ],
        links: [{ rel: "stylesheet", href: appCss }],
    }),
    component: RootComponent,
});

function RootComponent() {
    return (
        <RootDocument>
            <Outlet />
        </RootDocument>
    );
}

function RootDocument({ children }: { children: React.ReactNode }) {
    return (
        <html suppressHydrationWarning>
            <head>
                <HeadContent />
            </head>
            <body className="flex flex-col min-h-screen">
                <RootProvider>{children}</RootProvider>
                <Scripts />
            </body>
        </html>
    );
}
