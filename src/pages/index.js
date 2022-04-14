import React, { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import useTypewriter from 'react-typewriter-hook/build/useTypewriter';

let index = 0;


function HomepageHeader () {

  const { siteConfig } = useDocusaurusContext();
  const intervalRef = useRef({});

  const [text, setText] = useState("你好!Hello!こんにちは!Hallo!Привет!Bonjour!Saluton!");
  const content = useTypewriter(text);

  useEffect(
    () => {
      intervalRef.current = setInterval(() => {
        index = index > 2 ? 0 : ++index;
        setText(MagicOcean[index]);
      }, 5000);
      return function clear () {
        clearInterval(intervalRef.current);
      };
    },
    [text]
  );


  return (
    <header className={clsx('hero--primary', styles.heroBanner)}>
      <div className="container">
        <div style={{ marginTop: "2rem" }}>
          <h1 className={clsx('hero__title', styles.container_title)}>{siteConfig.title}</h1>
          <p className={clsx('hero__subtitle', styles.container_subtitle)}>{siteConfig.tagline}</p>
        </div>
        {/* <div className={styles.hello_font}>     {content}</div> */}
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
