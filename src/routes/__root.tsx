/// <reference types="vite/client" />

import {
	createRootRoute,
	HeadContent,
	Outlet,
	Scripts,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import { AppSidebar, TopBar } from "@/components/layout";
import { SidebarProvider } from "@/components/ui/sidebar";
import { WorkspaceProvider } from "@/modules/context/workspace-context";
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
				title: "MylowDesk",
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
	function getCookie(name: string): string | null {
		if (typeof window !== "undefined" && document.cookie !== "") {
			const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
			if (match) {
				return match[2];
			}
		}
		return null;
	}
	const defaultOpen = getCookie("sidebar_state") === "true";
	return (
		<RootDocument>
			<WorkspaceProvider>
				<SidebarProvider defaultOpen={defaultOpen}>
					<AppSidebar />
					<div className="flex min-h-screen w-full bg-background text-foreground">
						<div className="flex-1 flex flex-col">
							<TopBar />
							<main className="flex-1 overflow-auto">
								<Outlet />
							</main>
						</div>
					</div>
				</SidebarProvider>
			</WorkspaceProvider>
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
