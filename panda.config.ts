import { defineConfig } from "@pandacss/dev";

export default defineConfig({
	presets: ["@chakra-ui/panda-preset"],
	include: ["./src/**/*.{js,jsx,ts,tsx,svelte}"],
	outdir: "src/styled-system",
	minify: true,
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
				colors: {
					black: { value: "#000000" },
				},
			},
			semanticTokens: {
				colors: {
					fg: {
						DEFAULT: {
							value: {
								_dark: "{colors.white}",
							},
						},
					},
				},
			},
			recipes: {
				container: {
					base: {
						animationName: "fade-in",
						animationDuration: "slow",
					},
				},
			},
			slotRecipes: {
				table: {
					variants: {
						striped: {
							true: {
								row: {
									"&:nth-of-type(odd) td": {
										bg: "bg.subtle",
									},
								},
							},
						},
					},
				},
			},
		},
	},
});
