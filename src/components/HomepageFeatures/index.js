import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'What you will learn',
    Svg: require('@site/static/img/dotnet_bot_presenting.svg').default,
    description: (
      <>
        You will learn about fundamental CPU and Memory issues as well as tips and recommendations for profiling applications with different tools to detect possible optimization problems and how to fix them.
      </>
    ),
  },
  {
    title: 'Why is important',
    Svg: require('@site/static/img/my-dotnet-bot-mod.svg').default,
    description: (
      <>
        Resources are not infinite, is important to find the best method or way to make your programs more efficient because this helps you to reduce costs and problems.
      </>
    ),
  },
  {
    title: 'Performance',
    Svg: require('@site/static/img/dotnet-bot_builder.svg').default,
    description: (
      <>
        Is important to know about the resources that are not unlimited in this case Hardware Resources to build better applications, because more efficient applications make happy to our customers.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
