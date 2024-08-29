import React from 'react';
import './About.css'; // Optional: You can add custom styles here if needed

const About = () => {
  return (
    <div className='main-container'>
      <div className="about-container">
        <h2>About the Project</h2>
        <p>
          <strong>NoteKeeper</strong> is a simple and intuitive note-taking application that allows users to create, update, and delete their personal notes. The application is built with React.js and leverages the Context API for state management, ensuring a smooth and responsive user experience.
        </p>

        <h3>Key Features</h3>
        <ul>
          <li><strong>Create Notes:</strong> Quickly add new notes with a title and description, helping you keep track of important information.</li>
          <li><strong>Edit Notes:</strong> Easily update existing notes to modify their content as needed.</li>
          <li><strong>Delete Notes:</strong> Remove unwanted notes with a single click, keeping your workspace clutter-free.</li>
          <li><strong>User-Friendly Interface:</strong> Features a clean and modern design, making it easy to navigate and use.</li>
          <li><strong>Responsive Design:</strong> Fully responsive, ensuring a seamless experience across different devices and screen sizes.</li>
        </ul>

        <h3>Technologies Used</h3>
        <ul>
          <li><strong>React.js:</strong> The frontend is built using React.js, a popular JavaScript library for building user interfaces.</li>
          <li><strong>Context API:</strong> State management is handled using React's Context API, allowing for efficient data flow throughout the application.</li>
          <li><strong>CSS:</strong> Custom styles are applied using CSS to enhance the visual appeal, including modern card layouts, icons, and responsive design elements.</li>
          <li><strong>Font Awesome:</strong> Icons provided by Font Awesome give the application a polished and professional look.</li>
        </ul>

        <h3>Future Enhancements</h3>
        <ul>
          <li><strong>Search Functionality:</strong> Implement a search feature to quickly find notes based on their content or title.</li>
          <li><strong>Tagging System:</strong> Introduce a tagging system that allows categorizing notes for easier organization.</li>
          <li><strong>Rich Text Editing:</strong> Allow users to format their notes with bold, italic, and other text styles for better readability.</li>
        </ul>

        <p>
          <strong>NoteKeeper</strong> is designed to be a straightforward and effective tool for managing personal notes, whether for daily tasks, study notes, or quick reminders. The project demonstrates the power of React.js in building dynamic web applications, with a focus on creating a pleasant user experience.
        </p>
      </div>
    </div>
  );
}

export default About;
