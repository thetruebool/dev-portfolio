import React, { useState, useEffect } from 'react';
import Typewriter from 'typewriter-effect';
import endpoints from '../constants/endpoints';
import Social from './Social';
import FallbackSpinner from './FallbackSpinner';

const styles = {
  nameStyle: {
    fontSize: '5em',
  },
  inlineChild: {
    display: 'inline-block',
  },
  mainContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0,
    transition: 'opacity 0.5s ease-in-out',
  },
};

function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.home, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  useEffect(() => {
    // Trigger fade in after data is fetched
    if (data) {
      const timer = setTimeout(() => {
        document.getElementById('main-container').style.opacity = 1;
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [data]);

  return data ? (
    <div id="main-container" style={styles.mainContainer}>
      <h1 style={styles.nameStyle}>{data?.name}</h1>
      <div style={{ flexDirection: 'row' }}>
        <h2 style={styles.inlineChild}>I&apos;m&nbsp;</h2>
        <Typewriter
          options={{
            loop: true,
            autoStart: true,
            strings: data?.roles,
          }}
        />
      </div>
      <Social />
    </div>
  ) : (
    <FallbackSpinner />
  );
}

export default Home;
