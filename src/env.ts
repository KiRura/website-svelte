import { defineEnvVars } from "@sveltejs/kit/env";

export const variables = defineEnvVars({
	MICROCMS_API_KEY: { static: true },
	MICROCMS_SUBDOMAIN: { static: true },
});
