/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/site-config.html for all the possible
// site configuration options.

const siteConfig = {
  title: 'React 360' /* title for your website */,
  tagline: 'Create amazing 360 experiences',
  url: 'https://facebook.github.io' /* your website url */,
  editUrl: 'https://github.com/facebook/react-360/tree/master/docs/',
  baseUrl: '/react-360/' /* base url for your project */,

  // Used for publishing and more
  projectName: 'react-360',
  organizationName: 'facebook',

  // For no header links in the top nav bar -> headerLinks: [],
  headerLinks: [
    {doc: 'setup', label: 'Docs'},
    {doc: 'example-slideshow', label: 'Examples'},
    {blog: true, label: 'Blog'},
    {href: 'https://github.com/facebook/react-360', label: 'GitHub'},
  ],

  /* path to images for header/footer */
  headerIcon: 'img/logo.svg',
  footerIcon: 'img/logo.svg',
  favicon: 'img/favicon.png',

  /* colors for website */
  colors: {
    primaryColor: '#1c1e22',
    secondaryColor: '#639dda',
  },

  /* custom fonts for website */
  /*fonts: {
    myFont: [
      "Times New Roman",
      "Serif"
    ],
    myOtherFont: [
      "-apple-system",
      "system-ui"
    ]
  },*/

  // This copyright info is used in /core/Footer.js and blog rss/atom feeds.
  copyright:
    'Copyright © ' +
    new Date().getFullYear() +
    ' Facebook Inc.',

  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks
    theme: 'default',
  },

  // Add custom scripts here that would be placed in <script> tags
  scripts: [],

  /* On page navigation for the current documentation page */
  onPageNav: 'separate',

  /* Open Graph and Twitter card images */
  ogImage: 'img/docusaurus.png',
  twitterImage: 'img/docusaurus.png',

  // You may provide arbitrary config keys to be used as needed by your
  // template. For example, if you need your repo's URL...
  //   repoUrl: 'https://github.com/facebook/test-site',
};

module.exports = siteConfig;
