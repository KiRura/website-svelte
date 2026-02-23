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
				sizes: {
					navbar: { value: "3.6rem" },
				},
				spacing: {
					navbar: { value: "{sizes.navbar}" },
				},
			},
			recipes: {
				container: {
					base: {
						animationName: "fade-in",
						animationDuration: "slow",
					},
				},
				link: {
					variants: {
						variant: {
							plain: {
								color: "orange.fg",
								_hover: {
									textDecorationColor: "orange.fg",
								},
							},
							underline: {
								color: "orange.fg",
								textDecorationColor: "orange.fg",
							},
						},
					},
					defaultVariants: {
						variant: "underline",
					},
				},
				button: {
					variants: {
						variant: {
							bgoutline: {
								borderWidth: "1px",
								"--outline-color-legacy": "colors.colorPalette.muted",
								"--outline-color": "colors.colorPalette.border",
								backgroundColor: "bg",
								borderColor:
									"var(--outline-color, var(--outline-color-legacy))",
								color: "colorPalette.fg",
								_hover: {
									bg: "colorPalette.subtle",
								},
								_expanded: {
									bg: "colorPalette.subtle",
								},
							},
						},
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
