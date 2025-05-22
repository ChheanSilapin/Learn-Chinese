import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Navigation from "./components/Navigation";
import Quizzes from "./components/Quizzes";
import Video from "./components/Video";
import Advertisement from "./components/Advertisement";

// Featured videos for the home page
const featuredVideos = [
  {
    title: "Introduction to Chinese Characters",
    url: "https://www.youtube.com/embed/T5FNvW19GbA",
  },
  {
    title: "Basic Chinese Greetings",
    url: "https://www.youtube.com/embed/RSJIkSB4PV4",
  },
  {
    title: "Chinese Numbers 1-10",
    url: "https://www.youtube.com/embed/2eLP3FuuEVs",
  },
];

const Home = () => (
  <div className="home-container">
    
    

    {/* Top banner ad */}
   

    <div className="featured-videos">
      <h2>Featured Videos</h2>
      <div className="video-grid">
        {featuredVideos.map((video, index) => (
          <div className="video-card" key={index}>
            <iframe
              src={video.url}
              title={video.title}
              style={{ border: "none" }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <h4>{video.title}</h4>
          </div>
        ))}
      </div>
    </div>

    {/* Bottom banner ad */}
    <Advertisement type="banner" count={2} />
  </div>
);

const App = () => {
  return (
    <Router>
      <div className="app">
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quizzes" element={<Quizzes />} />
            <Route path="/video" element={<Video />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
