import React, { useState ,useEffect} from 'react';
import '../App.css';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Retrieve messages from local storage when the component mounts
    const savedMessages = localStorage.getItem('messages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newMessage = {
      name: name,
      email: email,
      message: message,
    };

    // Add the new message to the messages array
    setMessages([...messages, newMessage]);

    // Save the updated messages array to local storage
    localStorage.setItem('messages', JSON.stringify([...messages, newMessage]));

    setName('');
    setEmail('');
    setMessage('');

    // Show the success message modal
    setModalVisible(true);

    // Automatically close the modal after 3 seconds
    setTimeout(() => {
      setModalVisible(false);
    }, 3000);
  };
  return (
    <section className="contact-page">
      <h1>Contact Me</h1>

      <div className="contact-form">
        <form id="contactForm" onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Your Name"
            name="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Your Email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            rows="5"
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>

          <button type="submit">Send Message</button>
        </form>
      </div>
      
       {/* Modal for success message */}
       {isModalVisible && (
        <div className="modal">
          <div className="modal-content">
            <p>Message sent successfully!</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Contact;
