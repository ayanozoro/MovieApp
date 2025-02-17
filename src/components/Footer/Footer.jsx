import React from 'react';
import './Footer.css';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__about">
          <h3>About Movie Web</h3>
          <p>
            Your go-to platform for the latest movies and TV shows. We provide trailers, ratings, and download options in multiple qualities.
          </p>
        </div>
        <div className="footer__social">
          <h3>Follow Us</h3>
          <div className="footer__icons">
            <a href="https://www.facebook.com" target="_blank" rel="noreferrer"><FaFacebook /></a>
            <a href="https://www.twitter.com" target="_blank" rel="noreferrer"><FaTwitter /></a>
            <a href="https://www.instagram.com" target="_blank" rel="noreferrer"><FaInstagram /></a>
            <a href="https://www.youtube.com" target="_blank" rel="noreferrer"><FaYoutube /></a>
          </div>
        </div>
        <div className="footer__contact">
          <h3>Contact Us</h3>
          <p>Email: support@movieweb.com</p>
          <p>Phone: +91 3444356567</p>
        </div>
      </div>
      <div className="footer__bottom">
        <p>&copy; {new Date().getFullYear()} Movie Web. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

