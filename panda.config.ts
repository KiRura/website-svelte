import { defineConfig, defineRecipe } from "@pandacss/dev";

export default defineConfig({
	presets: ["@chakra-ui/panda-preset"],
	include: ["./src/**/*.{js,jsx,ts,tsx,svelte}"],
	outdir: "src/styled-system",
	minify: true,
	hash: true,
	conditions: {
		light: "[data-color-mode=light] &",
		dark: "[data-color-mode=dark] &",
	},
	preflight: true,

	theme: {
		extend: {
			tokens: {
				fonts: {
					heading: { value: `Inter, "Noto Sans JP", sans-serif` },
					body: { value: `Inter, "Noto Sans JP", sans-serif` },
					mono: { value: `"Google Sans Code", "M PLUS 1 Code", monospace` },
				},
			},
			recipes: {
				container: defineRecipe({
					className: "container",
					base: {
						animationName: "fade-in",
						animationDuration: "slow",
					},
				}),
			},
		},
	},
});
