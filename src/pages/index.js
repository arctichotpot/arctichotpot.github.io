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

  const [magicName, setMagicName] = useState("你好!Hello!こんにちは!Hallo!Привет!Bonjour!Saluton!");
  const name = useTypewriter(magicName);

  useEffect(
    () => {
      intervalRef.current = setInterval(() => {
        // index = index + 1 > 2 ? 0 : ++index + 1;
        index = index > 2 ? 0 : ++index;
        setMagicName(MagicOcean[index]);
      }, 5000);
      return function clear () {
        clearInterval(intervalRef.current);
      };
    },
    [magicName]
  );


  return (
    <header className={clsx('hero--primary', styles.heroBanner)}>
      <div className="container">
        <div className={styles.hello_font}>     {name}</div>
        <div style={{ marginTop: "10rem" }}>
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
