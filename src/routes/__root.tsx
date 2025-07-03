// src/routes/__root.tsx
/// <reference types="vite/client" />

import {
    createRootRoute,
    HeadContent,
    Outlet,
    Scripts,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Sidebar, TopBar } from "@/components/layout";
import appCss from "@/styles/app.css?url";

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
				title: "TanStack Start Starter",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
		],
	}),
	component: RootComponent,
});

function RootComponent() {
	return (
		<RootDocument>
			<div className="flex min-h-screen bg-background text-foreground">
				<Sidebar />
				<div className="flex-1 flex flex-col">
					<TopBar />
					<main className="flex-1 p-4 overflow-auto">
						<Outlet />
					</main>
				</div>
			</div>
		</RootDocument>
	);
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
	return (
		<html lang="fr">
			<head>
				<HeadContent />
			</head>
			<body>
				{children}
				<Scripts />
			</body>
		</html>
	);
}
