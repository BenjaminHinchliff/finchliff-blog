/** @type {import('next').NextConfig} */

const prod = process.env.NODE_ENV === 'production';

const ContentSecurityPolicy = `
	base-uri 'self';
  	default-src 'self';
  	script-src 'self' ${prod ? '' : '\'unsafe-eval\''};
	img-src 'self' data:;
  	style-src 'self' 'unsafe-inline';
  	font-src 'self';
`;

const securityHeaders = [
	{
		key: 'X-DNS-Prefetch-Control',
		value: 'on',
	},
	{
		key: 'Strict-Transport-Security',
		value: 'max-age=63072000; includeSubDomains; preload',
	},
	{
		key: 'X-XSS-Protection',
		value: '1; mode=block',
	},
	{
		key: 'X-Frame-Options',
		value: 'SAMEORIGIN',
	},
	{
		key: 'Permissions-Policy',
		value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
	},
	{
		key: 'X-Content-Type-Options',
		value: 'nosniff',
	},
	{
		key: 'Referrer-Policy',
		value: 'origin-when-cross-origin',
	},
	{
		key: 'Content-Security-Policy',
		value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim(),
	},
];

module.exports = {
	reactStrictMode: true,
	i18n: {
		locales: ['en-US'],
		defaultLocale: 'en-US',
	},
	async headers() {
		return [
			{
				source: '/:path*',
				headers: securityHeaders,
			},
		];
	},
};
