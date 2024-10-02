import React from 'react';
import './About.css';

export default function AboutPage() {
  return (
    <div className="aboutContainer">
      <header className="aboutHeader">
        <h1>About Event Photo Manager</h1>
        <p>
          Event Photo Manager is designed to help you effortlessly upload, organize,
          and share your event photos. Our platform ensures your memories are well
          preserved and easily accessible.
        </p>
      </header>

      <main className="aboutContent">
        <section className="aboutSection">
          <h2>Our Mission</h2>
          <p>
            To make event photo management seamless, secure, and accessible for everyone.
          </p>
        </section>

        <section className="aboutSection">
          <h2>Features</h2>
          <ul>
            <li>Easy photo uploads</li>
            <li>Advanced face recognition</li>
            <li>Secure sharing options</li>
          </ul>
        </section>

        <section className="aboutSection">
          <h2>Contact Us</h2>
          <p>
            For any inquiries, feel free to reach out to us at
            <a href="mailto:picreco2024@gmail.com"> support@picreco.com</a>.
          </p>
        </section>
      </main>

      <footer className="aboutFooter">
        <p>&copy; 2024 Event Photo Manager. All rights reserved.</p>
      </footer>
    </div>
  );
}
