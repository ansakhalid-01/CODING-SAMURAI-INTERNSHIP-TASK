import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import the Link component
import '../App.css';

function LatestArticles() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await fetch('data.json'); 
        const data = await response.json();

        // Access the articles array from the JSON data
        const articlesData = data.articles;

        // Set the articles in the state
        setArticles(articlesData.slice(0, 3)); // Display the first three articles

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    // Call the fetchArticles function to populate the latest articles
    fetchArticles();
  }, []);

  return (
    <div className="latest-articles">
      <h2>Latest Articles</h2>
      <div className="article-container">
      {articles.map((article, index) => (
  <div className="article" key={index}>
    <img src={article.image} alt="Article Image" className="article-image" />
    <h3>
      {/* Use the Link component to navigate to the individual article */}
      <Link to={`/articles/${encodeURIComponent(article.title)}`}>{article.title}</Link>
    </h3>
    <p>{article.excerpt}</p>
    <span className="publication-date">Published on: {article.published_date}</span>
  </div>
))}
      </div>
    </div>
  );
}

export default LatestArticles;
