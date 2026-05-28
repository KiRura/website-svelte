import { defineConfig } from "@pandacss/dev";

export default defineConfig({
	presets: ["@chakra-ui/panda-preset"],
	include: ["./src/**/*.{js,jsx,ts,tsx,svelte}"],
	outdir: "styled-system",
	minify: true,
	conditions: {
		light: "@media (prefers-color-scheme: light)",
		dark: "@media (prefers-color-scheme: dark)",
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
			semanticTokens: {
				colors: {
					bg: {
						DEFAULT: {
							value: {
								_dark: "#090501",
							},
						},
					},
				},
			},
			recipes: {
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
				icon: {
					variants: {
						size: {
							xs: {
								minWidth: "3",
							},
							sm: {
								minWidth: "4",
							},
							md: {
								minWidth: "5",
							},
							lg: {
								minWidth: "6",
							},
							xl: {
								minWidth: "7",
							},
							"2xl": {
								minWidth: "8",
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
				card: {
					variants: {
						variant: {
							elevated: {
								root: {
									borderWidth: "1px",
									borderColor: "border",
								},
							},
							bgoutline: {
								root: {
									bg: "bg",
									borderWidth: "1px",
									borderColor: "border",
								},
							},
							bgelevated: {
								root: {
									bg: "bg",
									borderWidth: "1px",
									borderColor: "border",
									boxShadow: "md",
								},
							},
						},
						hover: {
							true: {
								root: {
									_hover: {
										bg: "bg.muted",
									},
									transition: "background",
								},
							},
						},
					},
				},
			},
		},
	},
});
