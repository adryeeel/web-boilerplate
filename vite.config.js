import path from "path";
import { defineConfig } from "vite";

const pagesRoot = path.resolve(__dirname, "src/pages");

/** @type {import('vite').UserConfig} */
export default defineConfig({
	resolve: {
		alias: {
			"@sass-utils": path.resolve(__dirname, "src/styles/sass/utilities"),
			"@home": path.resolve(pagesRoot, "home/sass"),
			"@login": path.resolve(pagesRoot, "login/sass"),
		},
	},
	server: {
		open: "/src/pages/home/index.html",
	},
	build: {
		rollupOptions: {
			input: {
				home: path.resolve(pagesRoot, "home/index.html"),
				login: path.resolve(pagesRoot, "login/index.html"),
			},
		},
	},
});
