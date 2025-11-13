import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import mdx from "fumadocs-mdx/vite";

export default defineConfig({
    server: {
        port: 3000,
    },
    plugins: [
        mdx(await import("./source.config")),
        tailwindcss(),
        tsConfigPaths({
            projects: ["./tsconfig.json"],
        }),
        tanstackStart({
            prerender: {
                enabled: false,
            },
        }),
        // react's vite plugin must come after start's vite plugin
        viteReact(),
    ],
});
