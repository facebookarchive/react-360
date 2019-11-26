/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import classnames from "classnames";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";

const features = [
  {
    title: <>Cross Platform</>,
    imageUrl: "img/xplat.png",
    description: <>Build experiences for desktop, mobile, and VR</>
  },
  {
    title: <>Immersive Media</>,
    imageUrl: "img/360_3d.png",
    description: <>Supports a variety of 360 and 3D media</>
  }
];

const Index = () => {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;

  return (
    <Layout
      title={`${siteConfig.title} - ${siteConfig.tagline}`}
      description={siteConfig.tagline}
    >
      <header className={classnames("hero hero--primary", styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <div className={styles.sections}>
            <div>
              <p className="hero__subtitle">
                Create exciting 360 and VR experiences using React
              </p>
              <p>
                Deploy your creation across the web to desktop, mobile, and VR
                devices
              </p>
              <div className={styles.buttons}>
                <Link
                  className={classnames(
                    "button button--secondary button--lg",
                    styles.button
                  )}
                  to={useBaseUrl("docs/setup")}
                >
                  Get Started
                </Link>
                <Link
                  className="button button--secondary button--lg"
                  to={useBaseUrl("docs/example-slideshow")}
                >
                  View Examples
                </Link>
              </div>
            </div>
            <div className="splash_image">
              <img className={styles.splashImage} src="img/react_devices_v2.png" />
            </div>
          </div>
        </div>
      </header>
      <main>
        {features && features.length && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map(({ title, imageUrl, description }, idx) => (
                  <div
                    key={idx}
                    className={classnames("col col--6", styles.featureBlock)}
                  >
                    {imageUrl && (
                      <div className="text--center">
                        <img
                          className={styles.featureImage}
                          src={useBaseUrl(imageUrl)}
                          alt={title}
                        />
                      </div>
                    )}
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
        <div className={classnames("container", styles.mountWrapper)}>
          <iframe
            src={useBaseUrl("/sample/index.html")}
            className={styles.mountExample}
          />
        </div>
      </main>
    </Layout>
  );
};

export default Index;
