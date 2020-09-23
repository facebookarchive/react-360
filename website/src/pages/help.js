/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";

const Help = () => {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout
      title={`${siteConfig.title} - ${siteConfig.tagline}`}
      description={siteConfig.tagline}
    >
      <div className="container">
        <div className="row">
          <div className="col col--6 col--offset-3 padding-vert--lg">
            <h1>Need Help?</h1>
            <p>This project is maintained by a dedicated group of people.</p>

            <h2>Browse Docs</h2>
            <p>
              Learn more using the{" "}
              <Link to={useBaseUrl("docs/getting-started")}>
                documentation on this site.
              </Link>
            </p>

            <h2>Join the community</h2>
            <p>Ask questions about the documentation and project</p>

            <h2>Stay up to date</h2>
            <p>Find out what's new with this project</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Help;
