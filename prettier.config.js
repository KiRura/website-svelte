// @ts-check

/** @type {import("prettier").Config} */
const config = {
	useTabs: true,
	plugins: ["prettier-plugin-svelte"],
	overrides: [{ files: "*.svelte", options: { parser: "svelte" } }],
};

export default config;
