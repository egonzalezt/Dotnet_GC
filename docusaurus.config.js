// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const organizationName = "egonzalezt";
const projectName = "Dotnet_GC";

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Profiling Blog',
  tagline: 'Learn about .NET Profiling',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: `https://${organizationName}.github.io`,
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: `/${projectName}/`,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName, // Usually your GitHub org/user name.
  projectName, // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        // (...)
        docs: {
          // (...)
          editUrl: `https://github.com/${organizationName}/${projectName}/tree/main/`,
        },
        blog: {
          // (...)
          editUrl: `https://github.com/${organizationName}/${projectName}/tree/main/`,
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'Profiling Blog',
        logo: {
          alt: 'Profiling Blog Logo',
          src: 'img/logo.svg',
        },
        items: [

          {to: '/docs/intro', label: 'Docs', position: 'left'},
          {to: '/blog', label: 'Blog', position: 'left'},
          {
            href: 'https://github.com/egonzalezt/Dotnet_GC',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'GC DOCS',
                to: '/docs/intro',
              },
              {
                label: 'Garbage Collector (GC)',
                to: '/docs/category/garbage-collector-gc',
              },
              {
                label: 'OS Memory',
                to: '/docs/category/os-memory',
              },
              {
                label: 'Performance',
                to: '/docs/category/performance',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/egonzalezt/Dotnet_GC',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} egonzalezt. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['csharp'],
      },
    }),
};

module.exports = config;
