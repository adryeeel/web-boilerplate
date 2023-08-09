import path from "path";
import { defineConfig } from "vite";

const pagesRoot = path.resolve(__dirname, "src/pages");

/** @type {import('vite').UserConfig} */
export default defineConfig({
	resolve: {
		alias: {
			"@sass-utils": path.resolve(__dirname, "src/sass/utilities"),
			"@sass": path.resolve(__dirname, "src/sass"),
			"@home": path.resolve(pagesRoot, "home/sass"),
			"@auth": path.resolve(pagesRoot, "auth/sass"),
		},
	},
	server: {
		open: "/src/pages/home/index.html",
	},
	build: {
		rollupOptions: {
			input: {
				home: path.resolve(pagesRoot, "home/index.html"),
				auth: path.resolve(pagesRoot, "auth/index.html"),
			},
		},
	},
});
