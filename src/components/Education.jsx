import React, { useEffect, useState, useContext } from 'react';
import { Chrono } from 'react-chrono';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';
import endpoints from '../constants/endpoints';
import Header from './Header';
import FallbackSpinner from './FallbackSpinner';
import '../css/education.css';

function Education(props) {
  const theme = useContext(ThemeContext);
  const { header } = props;
  const [data, setData] = useState(null);
  const [width, setWidth] = useState('50vw');
  const [mode, setMode] = useState('VERTICAL_ALTERNATING');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    fetch(endpoints.education, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setIsVisible(true); // Trigger fade in after data is fetched
      })
      .catch((err) => err);

    // Adjust mode and width based on window width
    const updateDimensions = () => {
      if (window?.innerWidth < 576) {
        setMode('VERTICAL');
        setWidth('90vw');
      } else if (window?.innerWidth >= 576 && window?.innerWidth < 768) {
        setMode('VERTICAL_ALTERNATING');
        setWidth('90vw');
      } else if (window?.innerWidth >= 768 && window?.innerWidth < 1024) {
        setMode('VERTICAL_ALTERNATING');
        setWidth('75vw');
      } else {
        setMode('VERTICAL_ALTERNATING');
        setWidth('50vw');
      }
    };

    // Initial call to set dimensions
    updateDimensions();

    // Event listener for window resize
    window.addEventListener('resize', updateDimensions);

    // Cleanup function for removing event listener
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  return (
    <>
      <Header title={header} />
      {data ? (
        <div className={`section-content-container ${isVisible ? 'fade-in' : 'fade-out'}`} style={{ width }}>
          <Container>
            <Chrono
              hideControls
              allowDynamicUpdate
              useReadMore={false}
              items={data.education}
              cardHeight={250}
              mode={mode}
              theme={{
                primary: theme.accentColor,
                secondary: theme.accentColor,
                cardBgColor: theme.chronoTheme.cardBgColor,
                cardForeColor: theme.chronoTheme.cardForeColor,
                titleColor: theme.chronoTheme.titleColor,
              }}
            >
              <div className="chrono-icons">
                {data.education.map((education) => (
                  education.icon ? (
                    <img
                      key={education.icon.src}
                      src={education.icon.src}
                      alt={education.icon.alt}
                    />
                  ) : null
                ))}
              </div>
            </Chrono>
          </Container>
        </div>
      ) : (
        <FallbackSpinner />
      )}
    </>
  );
}

Education.propTypes = {
  header: PropTypes.string.isRequired,
};

export default Education;
