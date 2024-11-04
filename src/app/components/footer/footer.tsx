import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./footer.css";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <div className="footer min-h-96">
        <div className="footer-container">
          <div className="left footer-child">
            <div className="content">
              <h1 className='font-bold text-3xl'>
                <span className="text-3xl font-bold text-[#2388e1]"> Big Data </span > <span className="text-3xl font-bold">- Centre Of Excellence</span>
              </h1>
              <br />
              <p className="cntfooter">
                At Big Data Centre of Excellence, we believe that collaboration
                and teamwork are key to success. Our mission is to help students
                gain knowledge on Big Data technologies and concepts to leverage
                their potential and achieve success in their respective fields.
                Besides making serious endeavors to spread knowledge on Big
                Data, we stand by the stuble acronym of TEAM - "Together
                Everyone Achieves More".
              </p>
            </div>
            <div className="menu">
              <ul>
                <li>
                  <a href="/">Home</a>
                </li>
                <li>
                  <a href="https://bdcoe.co.in/#domains">Domains</a>
                </li>
                <li>
                  <Link href="https://bdcoe.co.in/team">Team</Link>
                </li>
                <li>
                  <Link href="https://bdcoe.co.in/event">Events</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="right footer-child">
            <img src="/footer-logo.svg" alt="logo" className="w-72" />
          </div>
        </div>
      </div>

      <div className="social">
        <ul>
          <li>
            <a href="mailto:bdcoe@akgec.ac.in" target="_blank" rel="noreferrer">
              <i className="fa-brands fa-google"></i>
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/school/big-data-centre-of-excellence/"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fa-brands fa-linkedin"></i>
            </a>
          </li>
          <li>
            <a
              href="https://www.youtube.com/@bigdatacentreofexcellence3334"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fa-brands fa-youtube"></i>
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/bdcoe/"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fa-brands fa-square-instagram"></i>
            </a>
          </li>
          <li>
            <a
              href="https://github.com/Big-Data-Center-of-Excellence"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fa-brands fa-github"></i>
            </a>
          </li>
        </ul>
      </div>
      <div className="copyright">
        Copyright ©️ {new Date().getFullYear()} - Big Data Centre of Excellence
      </div>
    </>
  );
};

export default Footer;
