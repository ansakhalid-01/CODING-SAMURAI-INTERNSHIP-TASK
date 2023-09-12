import React, { useState, useEffect } from 'react';
import '../App.css';
import LatestArticles from './LatestArticles';

function Home() {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 768);

  useEffect(() => {
    function handleResize() {
      setIsLargeScreen(window.innerWidth >= 768);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Define the CSS styles as JavaScript objects
  const containerStyle = {
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: isLargeScreen ? 'row' : 'column',
    alignItems: 'center',
    textAlign: 'center', 
  };

  const aboutMeStyle = {
    flex: '1', 
    padding: '20px',
  };

  const profileImageStyle = {
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
    border: '4px solid #666',
  };

  return (
    <section className="homepage">
      <h1>Welcome to MindfulJourney Hub</h1>
      <p>Discover the latest articles and insights.</p>
      <div style={containerStyle}>
        <img
          src="profile-picture.png"
          alt="Ansa Khalid - Blog Author"
          style={profileImageStyle}
        />
        <div style={aboutMeStyle}>
          <h2>About Me</h2>
          <p>
            Hello, I'm Ansa Khalid. Welcome to MindfulJourney Hub, where I share my thoughts, insights, and experiences with you. I'm a passionate writer and blogger, and this digital space is where I express my ideas on various topics that intrigue me. My goal is to inspire and inform you through my articles, whether you're interested in technology trends, travel adventures, or the latest developments in science and innovation. Join me on this exciting journey, and together, we'll explore the fascinating world of knowledge and inspiration.
          </p>
        </div>
      </div>
      <LatestArticles />
    </section>
  );
}

export default Home;
