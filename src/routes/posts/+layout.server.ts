import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ setHeaders }) => {
	setHeaders({
		"cache-control": "max-age=240, must-revalidate",
	});
};
