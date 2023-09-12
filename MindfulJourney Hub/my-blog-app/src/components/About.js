import React from 'react';
import '../App.css';

const About = () => {
  return (
    <section className="about-page">
      <h1>About Me</h1>
      <div className="introduction">
        <h2>Introduction</h2>
        <p>
          Hello, I'm Ansa Khalid, and I'm delighted to welcome you to MindfulJourney Hub. This digital space is where I express my thoughts, insights, and creative ideas, spanning a diverse array of captivating subjects that have captured my imagination.
        </p>
        <p>
          As an avid explorer of technology, travel enthusiast, and science aficionado, I'm on a continuous journey of discovery and learning. Through this blog, I aspire to share my knowledge and experiences, offering you a unique window into the world of cutting-edge technology, thrilling adventures, and the wonders of scientific inquiry.
        </p>
        <p>
          Join me in this exciting adventure as we embark on a quest for knowledge and inspiration.
        </p>
      </div>
      <div className="interests">
        <h2>My Interests</h2>
        <ul>
          <li>Technology and Gadgets</li>
          <li>Travel and Adventure</li>
          <li>Science and Innovation</li>
        </ul>
      </div>
      <div className="purpose">
      <h2>Purpose of My Blog</h2>
        <p>
          The purpose of this blog is to share my knowledge, experiences, and passion with the world. I aim to inspire others, spark meaningful discussions, and provide valuable insights on a wide range of topics. Whether you're interested in the latest tech trends, seeking travel inspiration, or exploring the wonders of science, you'll find something here to engage your curiosity.
        </p>
      </div>
      <div className="author-info">
        <h2>About the Author</h2>
        <img src="/profile-picture.png" alt="Ansa Khalid" className="profile-picture" />
        <p>
        Allow me to introduce myself more comprehensively. I am currently pursuing a degree in Software Engineering, and I have a deep-rooted passion for the tech industry. Over the years, I've closely followed the rapid advancements in technology, exploring the latest gadgets, software, and emerging trends.
        </p>
        <p>
        When I'm not deeply engrossed in the realm of technology, I'm out exploring the wonders of our planet. My adventures take me to new and diverse destinations, allowing me to immerse myself in various cultures and embark on exhilarating journeys. These experiences are some of my most cherished moments of joy.
        </p>
        <p>
          Science, too, holds a special place in my heart. The pursuit of knowledge and understanding drives me to delve into the mysteries of the universe, from the smallest particles to the vast cosmos.
        </p>
        <p>
          Thank you for joining me on this journey. I hope you find my blog both informative and inspiring. Feel free to reach out, share your thoughts, and connect with me as we explore the exciting realms of technology, travel, and science together.
        </p>
      </div>
    </section>
  );
};

export default About;
