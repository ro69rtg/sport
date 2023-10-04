import { fileURLToPath, URL } from "node:url";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import svgLoader from 'vite-svg-loader'


export default ({ mode }) => {
	const env = loadEnv(mode, process.cwd(), "");
	return defineConfig({
		define: {
			"process.env": env,
		},
		plugins: [vue(), svgLoader()],
		server: {
			host: true,
			port: 8080,
		},
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: `@import "@/assets/styles/vars.scss";`
				}
			}
		},

		resolve: {
			alias: {
				"@": fileURLToPath(new URL("./src", import.meta.url)),
			},
		},
	});
};