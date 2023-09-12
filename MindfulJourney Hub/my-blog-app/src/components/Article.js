import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../App.css';

const Article = () => {
  const { title } = useParams();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState(() => {
    const existingComments = JSON.parse(localStorage.getItem('comments')) || [];
    return existingComments;
  });
  

  useEffect(() => {
    // Fetch and display the article content by title
    async function fetchArticleByTitle(title) {
      try {
        const response = await fetch('/data.json'); // Use the correct path to your JSON file
        const data = await response.json();

        // Access the articles array from the JSON data
        const articles = data.articles;

        // Find the article with the matching title
        const foundArticle = articles.find((a) => a.title === decodeURIComponent(title));

        if (foundArticle) {
          setArticle(foundArticle);
        } else {
          // Handle the case where the article title is not found
          console.error('Article not found.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchArticleByTitle(title);
  }, [title]);

  const addComment = () => {
    const userName = document.getElementById('user-name').value;
    const commentText = document.getElementById('comment-text').value;

    // Generate a timestamp for the comment
    const timestamp = new Date().toLocaleString();

    // Create a new comment object
    const newComment = {
      userName,
      timestamp,
      commentText,
    };

    // Get existing comments from Local Storage or initialize an empty array
    const existingComments = JSON.parse(localStorage.getItem('comments')) || [];

    // Add the new comment to the array of comments
    existingComments.push(newComment);

    // Save the updated comments back to Local Storage
    localStorage.setItem('comments', JSON.stringify(existingComments));

    // Clear the comment textarea and user name input field
    document.getElementById('comment-text').value = '';
    document.getElementById('user-name').value = '';

    // Set the updated comments in state
    setComments(existingComments);
  };

  

  return (
    <section className="article-page">
      {/* Individual Article */}
      {article && (
        <article className="article" id="article-container">
          <h1>{article.title}</h1>
          <p className="author">Written by {article.author} on {article.published_date}</p>
          <img src={article.image} alt={`${article.title} Image`} id="article-image" />
          <div className="article-content">
            <p>{article.content}</p>
          </div>
        </article>
      )}

      {/* Comments Section */}
      <section className="comments">
        <h2>Comments</h2>
        <div className="comment-box">
          <input type="text" id="user-name" placeholder="Your Name" />
          <textarea id="comment-text" rows="4" placeholder="Add your comment" />
          <button onClick={addComment}>Submit</button>
        </div>

        {/* New Comment */}
        <div className="comment-list">
      {comments.map((comment, index) => (
        <div key={index} className="comment">
  <img src="/avatar.jpg" alt="Avatar" className="avatar" />
  <div className="user-info">
    <strong>{comment.userName}</strong>
    <p className="comment-text">{comment.commentText}</p>
  </div>
  <span className="timestamp">{comment.timestamp}</span>
</div>
      ))}
</div>
      </section>
    </section>
  );
};

export default Article;
