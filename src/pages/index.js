import React, { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';

import useTypewriter from 'react-typewriter-hook/build/useTypewriter';

let index = 0;


function HomepageHeader () {

  const { siteConfig } = useDocusaurusContext();



  return (
    <header className={clsx('hero--primary', styles.heroBanner)}>
      <div className="container" >
        <div style={{ marginTop: "7rem" }}>
          <h1 className={clsx('hero__title', styles.container_title)}>{siteConfig.title}</h1>
          <p className={clsx('hero__subtitle', styles.container_subtitle)}>{siteConfig.tagline}</p>
        </div>
      </div>
    </header>
  );
}

export default function Home () {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <HomepageHeader />
    </Layout>
  );
}
