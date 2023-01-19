// @ts-check
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./src/env/server.mjs"));

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    hedraVersion: '0.6.31',
    hedraSupportedPythonVersions: [
      '3.8',
      '3.9',
      '3.10',
      '3.11'
    ],
    bannerAnnouncement: 'Hedra 0.6.31 is available!',
    bannerAnnouncementLink: "hedra-0-6-31"
  },
  async redirects() {
    return [
      {
        source: '/docs',
        destination: '/docs/Introduction#welcome',
        permanent: true,
      },
    ]
  },
};
export default config;
