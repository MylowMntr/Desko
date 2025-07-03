import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	server: {
		port: 3000,
	},
	plugins: [
		tsConfigPaths(),
		tanstackStart(),
		tailwindcss(),
		VitePWA({
			registerType: "autoUpdate",
			manifest: {
				name: "MylowDesk",
				short_name: "MylowDesk",
				description: "Un dashboard modulaire, multi-workspaces, offline.",
				theme_color: "#18181b", // adapte selon ton thème
				background_color: "#ffffff",
				display: "standalone",
				icons: [
					{
						src: "/icons/icon-192x192.png",
						sizes: "192x192",
						type: "image/png",
					},
					{
						src: "/icons/icon-512x512.png",
						sizes: "512x512",
						type: "image/png",
					},
					// Optionnel: icône maskable
					{
						src: "/icons/icon-512x512.png",
						sizes: "512x512",
						type: "image/png",
						purpose: "any maskable",
					},
				],
			},
			workbox: {
				// Cache les assets et pages pour le mode offline
				globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
			},
		}),
	],
});
