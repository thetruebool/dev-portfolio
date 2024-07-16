import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Container, Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';

const styles = {
  introTextContainer: {
    margin: 10,
    flexDirection: 'column',
    whiteSpace: 'pre-wrap',
    textAlign: 'left',
    fontSize: '1.2em',
    fontWeight: 500,
  },
  introImageContainer: {
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  fadeIn: {
    opacity: 1,
    transition: 'opacity 0.5s ease-in-out',
  },
  fadeOut: {
    opacity: 0,
  },
};

function About(props) {
  const { header } = props;
  const [data, setData] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const parseIntro = (text) => (
    <ReactMarkdown
      children={text}
    />
  );

  useEffect(() => {
    fetch(endpoints.about, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setIsVisible(true); // Trigger fade in after data is fetched
      })
      .catch((err) => err);
  }, []);

  return (
    <>
      <Header title={header} />
      <div className="section-content-container">
        <Container>
          {data ? (
            <Row style={isVisible ? styles.fadeIn : styles.fadeOut}>
              <Col style={styles.introTextContainer}>
                {parseIntro(data.about)}
              </Col>
              <Col style={styles.introImageContainer}>
                <img src={data?.imageSource} alt="profile" />
              </Col>
            </Row>
          ) : (
            <FallbackSpinner />
          )}
        </Container>
      </div>
    </>
  );
}

About.propTypes = {
  header: PropTypes.string.isRequired,
};

export default About;
