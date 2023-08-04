/** @type {import('next').NextConfig} */
const nextConfig = {
	async redirects() {
		return [
			{
				source: "/",
				destination: "/books",
				permanent: true,
			},
		];
	},
};

module.exports = nextConfig;
