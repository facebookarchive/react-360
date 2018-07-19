/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');
const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

const siteConfig = require(process.cwd() + '/siteConfig.js');

function imgUrl(img) {
  return siteConfig.baseUrl + 'img/' + img;
}

function docUrl(doc, language) {
  return siteConfig.baseUrl + 'docs/' + (language ? language + '/' : '') + doc;
}

function pageUrl(page, language) {
  return siteConfig.baseUrl + (language ? language + '/' : '') + page;
}

class Button extends React.Component {
  render() {
    return (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={this.props.href} target={this.props.target}>
          {this.props.children}
        </a>
      </div>
    );
  }
}

Button.defaultProps = {
  target: '_self',
};

const SplashContainer = props => (
  <div className="homeContainer">
    <div className="homeSplashFade">
      <div className="wrapper homeWrapper">{props.children}</div>
    </div>
  </div>
);

class HomeSplash extends React.Component {
  render() {
    let language = this.props.language || '';
    return (
      <SplashContainer>
        <h2 className="projectTitle">
          React <span style={{color: '#0880fa'}}>360</span>
        </h2>
        <div className="splash_sections">
          <div className="splash_description">
            <h3>
              Create exciting 360 and VR experiences using React
            </h3>
            <h4>
              Deploy your creation across the web to desktop, mobile, and VR devices
            </h4>
            <div className="section promoSection">
              <div className="promoRow">
                <div className="pluginRowBlock">
                  <Button href={docUrl('setup.html', language)}>Get Started</Button>
                  <Button href={docUrl('example-slideshow.html', language)}>View Examples</Button>
                </div>
              </div>
            </div>
          </div>
          <div className="splash_image">
            <img src={imgUrl('react_devices.png')} />
          </div>
        </div>
      </SplashContainer>
    );
  }
}

const Block = props => (
  <Container
    padding={['bottom', 'top']}
    id={props.id}
    background={props.background}>
    <GridBlock align="center" contents={props.children} layout={props.layout} />
  </Container>
);

const Features = props => (
  <Block layout="twoColumn">
    {[
      {
        content: 'Build experiences for desktop, mobile, and VR',
        image: imgUrl('xplat.png'),
        imageAlign: 'top',
        title: 'Cross Platform',
      },
      {
        content: 'Supports a variety of 360 and 3D media',
        image: imgUrl('360_3d.png'),
        imageAlign: 'top',
        title: 'Immersive Media',
      },
    ]}
  </Block>
);

class Index extends React.Component {
  render() {
    let language = this.props.language || '';

    return (
      <div>
        <HomeSplash language={language} />
        <div className="mainContainer">
          <Features />
          <Container background="light">
            <iframe src="/react-360/sample/index.html" id="mount_example"/>
          </Container>
        </div>
      </div>
    );
  }
}

module.exports = Index;
