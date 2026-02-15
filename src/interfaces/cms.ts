import type { MicroCMSImage } from "microcms-js-sdk";

interface Post {
	title: string;
	subtitle?: string;
	coverImage?: MicroCMSImage;
}

interface PostWithContent extends Post {
	content: string;
}

export type { Post, PostWithContent };
