/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule HeaderLinks
 */

var React = require('React');
var AlgoliaDocSearch = require('AlgoliaDocSearch');

var HeaderLinks = React.createClass({
  linksInternal: [
    {section: 'docs', href: 'docs/getting-started.html', text: 'Docs', target: '.nav-docs'},
  ],
  linksExternal: [
    {section: 'github', href: 'https://github.com/facebook/react-vr', text: 'GitHub'},
    {section: 'react', href: 'http://facebook.github.io/react', text: 'React'},
    {section: 'react native', href: 'http://facebook.github.io/react-native', text: 'React Native'},
  ],

  makeLinks: function(links) {
    return links.map(function(link) {
      return (
        <li key={link.section}>
          <a
            href={link.href}
            className={link.section === this.props.section ? 'active' : ''}
            data-target={link.target}>
            {link.text}
          </a>
        </li>
      );
    }, this);
  },

  render: function() {
    return (
      <div className="nav-site-wrapper">
        <ul className="nav-site nav-site-internal">
          {this.makeLinks(this.linksInternal)}
        </ul>

        <ul className="nav-site nav-site-external">
          {this.makeLinks(this.linksExternal)}
        </ul>
      </div>
    );
  }
});

module.exports = HeaderLinks;
