import React from "react";
import "../style/Video.css";
import Advertisement from "./Advertisement";

const videos = [
  {
    title: "Daily Chinese Conversation",
    url: "https://www.youtube.com/embed/0ZJ3ZAFW2lY",
  },
  {
    title: "Chinese Grammar Basics for Beginners",
    url: "https://www.youtube.com/embed/2lR-vH4OJb8",
  },
  {
    title: "Chinese Vocabulary Booster: 50 Words",
    url: "https://www.youtube.com/embed/xF1cwUBr2xI",
  },
];

const Video = () => {
  return (
    <div className="video-container">
      <h2>Learning Videos</h2>
      <p>
        Watch helpful videos to enhance your listening, vocabulary, and grammar
        skills.
      </p>

      {/* Top ad */}
      <Advertisement type="banner" count={1} />

      <div className="video-grid">
        {videos.map((video, index) => (
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

      {/* Bottom ad */}
      <Advertisement type="banner" count={1} />

      <div className="content-with-sidebar">
        <div className="main-content">
          <h3>Why Learn Chinese?</h3>
          <p>
            Chinese is one of the most widely spoken languages in the world.
            Learning Chinese opens up opportunities for business, travel, and
            cultural exchange. Start your journey today with our carefully
            selected video resources.
          </p>
        </div>
        <div className="sidebar">
          {/* Sidebar ad */}
          <Advertisement type="sidebar" count={1} />
        </div>
      </div>
    </div>
  );
};

export default Video;
