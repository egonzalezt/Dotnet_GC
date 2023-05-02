import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'What is Garbage Collector',
    Svg: require('@site/static/img/dotnet_bot_presenting.svg').default,
    description: (
      <>
        .NET's garbage collector manages the allocation and release of memory for your application. Each time you create a new object, the common language runtime allocates memory for the object from the managed heap.
      </>
    ),
  },
  {
    title: 'Why is important',
    Svg: require('@site/static/img/my-dotnet-bot-mod.svg').default,
    description: (
      <>
        Memory is not infinite. Eventually the garbage collector must perform a collection in order to free some memory.
      </>
    ),
  },
  {
    title: 'Performance',
    Svg: require('@site/static/img/dotnet-bot_builder.svg').default,
    description: (
      <>
        Is important to know about Garbage collector this helps you to build better programs and understand how you can avoid Memory leaks and build more efficient applications
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
