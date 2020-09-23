/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = {
  title: "React 360",
  tagline: "Create amazing 360 experiences",
  url: "https://facebook.github.io",
  baseUrl: "/react-360/",
  favicon: "img/favicon.png",
  projectName: "react-360",
  organizationName: "facebook",
  themeConfig: {
    navbar: {
      title: "React 360",
      logo: {
        alt: "React 360 Logo",
        src: "img/logo.svg"
      },
      links: [
        { to: "docs/setup", label: "Docs", position: "right" },
        { to: "docs/example-slideshow", label: "Examples", position: "right" },
        { to: "blog", label: "Blog", position: "right" },
        {
          href: "https://github.com/facebook/react-360",
          label: "GitHub",
          position: "right"
        }
      ]
    },
    footer: {
      style: "dark",
      logo: {
        alt: "Facebook Open Source Logo",
        src: "https://docusaurus.io/img/oss_logo.png",
        href: "https://opensource.facebook.com/"
      },
      copyright: `Copyright © ${new Date().getFullYear()} Facebook, Inc.`
    },
    image: "img/logo.svg"
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          path: "../docs",
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: "https://github.com/facebook/react-360/tree/master/docs/"
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css")
        }
      }
    ]
  ]
};
