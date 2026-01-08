import type { PageServerLoad } from "./$types";
import { exec as _exec } from "node:child_process";
import { promisify } from "node:util";
import z from "zod";

const exec = promisify(_exec);
const schema = z
	.object({
		name: z.string(),
		licenseType: z.string(),
		link: z.url().pipe(z.transform((link) => new URL(link))),
		remoteVersion: z.string(),
		installedVersion: z.string(),
		definedVersion: z.string(),
		author: z.string(),
	})
	.array();

export const prerender = true;

export const load: PageServerLoad = async ({ setHeaders }) => {
	setHeaders({
		"cache-control": "no-cache, public",
	});

	const [prod, dev] = await Promise.all([
		exec("./node_modules/.bin/license-report --only=prod"),
		exec("./node_modules/.bin/license-report --only=dev"),
	]);

	return {
		categories: [
			{
				label: "Production",
				deps: schema.parse(JSON.parse(prod.stdout)),
			},
			{
				label: "Development",
				deps: schema.parse(JSON.parse(dev.stdout)),
			},
		],
	};
};
