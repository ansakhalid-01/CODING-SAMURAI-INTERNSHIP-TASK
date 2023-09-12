import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Articles() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // Fetch articles data from a JSON file or API
    fetch('data.json') 
      .then((response) => response.json())
      .then((data) => {
        setArticles(data.articles);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <section className='article-listings'>
      <h1>List of Articles</h1>
      <div className="article-container">
        {articles.map((article, index) => (
          <div className="article" key={index}>
          <img src={article.image} alt="Article Image" />
            <h3>
            <Link to={`/articles/${encodeURIComponent(article.title)}`}>
  {article.title}
</Link>

            </h3>
            <p>{article.excerpt}</p>
            <span className="publication-date">
              Published on: {article.published_date}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Articles;
