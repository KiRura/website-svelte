import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ setHeaders }) => {
	setHeaders({
		"cache-control": "max-age=31536000",
	});
};
