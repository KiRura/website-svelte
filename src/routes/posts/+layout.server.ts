import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = ({ setHeaders }) => {
	setHeaders({
		"cache-control": "public, max-age=120, stale-while-revalidate=10800",
	});
};
