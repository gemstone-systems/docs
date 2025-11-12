import { createFileRoute, notFound } from "@tanstack/react-router";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { createServerFn } from "@tanstack/react-start";
import { source } from "@/lib/source";
import type * as PageTree from "fumadocs-core/page-tree";
import { useMemo } from "react";
import { docs } from "@/.source";
import {
    DocsBody,
    DocsDescription,
    DocsPage,
    DocsTitle,
} from "fumadocs-ui/page";
import defaultMdxComponents from "fumadocs-ui/mdx";
import { createClientLoader } from "fumadocs-mdx/runtime/vite";
import { baseOptions } from "@/lib/layout.shared";

export const Route = createFileRoute("/$")({
    component: Page,
    loader: async ({ params }) => {
        const slugs = params._splat?.split("/") ?? [];
        const data = await loader({ data: slugs });
        await clientLoader.preload(data.path);
        return data;
    },
});

const loader = createServerFn({
    method: "GET",
})
    .inputValidator((slugs: Array<string>) => slugs)
    .handler(async ({ data: slugs }) => {
        const page = source.getPage(slugs);
        if (!page) throw notFound();

        return {
            tree: source.pageTree as object,
            path: page.path,
        };
    });

const clientLoader = createClientLoader(docs.doc, {
    id: "docs",
    component({ toc, frontmatter, default: MDX }) {
        return (
            <DocsPage toc={toc} tableOfContent={{ style: "clerk" }}>
                <DocsTitle>{frontmatter.title}</DocsTitle>
                <DocsDescription>{frontmatter.description}</DocsDescription>
                <DocsBody className="font-light">
                    <MDX
                        components={{
                            ...defaultMdxComponents,
                        }}
                    />
                </DocsBody>
            </DocsPage>
        );
    },
});

function Page() {
    const data = Route.useLoaderData();
    const Content = clientLoader.getComponent(data.path);
    const tree = useMemo(
        () => transformPageTree(data.tree as PageTree.Folder),
        [data.tree],
    );

    return (
        <DocsLayout
            {...baseOptions()}
            tree={tree}
            links={[
                {
                    type: "icon",
                    url: "https://github.com/gemstone-systems/",
                    label: "github",
                    text: "Github",
                    icon: (
                        <svg role="img" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                        </svg>
                    ),
                    external: true,
                },
            ]}
        >
            <Content />
        </DocsLayout>
    );
}

function transformPageTree(root: PageTree.Root): PageTree.Root {
    function mapNode<T extends PageTree.Node>(item: T): T {
        if (typeof item.icon === "string") {
            item = {
                ...item,
                icon: (
                    <span
                        dangerouslySetInnerHTML={{
                            __html: item.icon,
                        }}
                    />
                ),
            };
        }

        if (item.type === "folder") {
            return {
                ...item,
                index: item.index ? mapNode(item.index) : undefined,
                children: item.children.map(mapNode),
            };
        }

        return item;
    }

    return {
        ...root,
        children: root.children.map(mapNode),
        fallback: root.fallback ? transformPageTree(root.fallback) : undefined,
    };
}
