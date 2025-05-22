import React from 'react';


const Listening = () => {
  return (
    <div className="listening-container">
      <h2>Listening Practice</h2>
      <p>Improve your comprehension by listening to native speakers in various contexts.</p>

      <section>
        <h3>Audio Clips</h3>
        <ul>
          <li>
            <strong>Daily Conversation:</strong>
            <audio controls src="/audio/daily-conversation.mp3">
              Your browser does not support the audio element.
            </audio>
          </li>
          <li>
            <strong>News Report:</strong>
            <audio controls src="/audio/news-report.mp3">
              Your browser does not support the audio element.
            </audio>
          </li>
          <li>
            <strong>Story Time:</strong>
            <audio controls src="/audio/story-time.mp3">
              Your browser does not support the audio element.
            </audio>
          </li>
        </ul>
      </section>

      <section>
        <h3>Tips for Effective Listening</h3>
        <ol>
          <li>Listen actively — try to summarize what you hear.</li>
          <li>Repeat short clips and mimic pronunciation.</li>
          <li>Use subtitles first, then listen without them.</li>
        </ol>
      </section>
    </div>
  );
};

export default Listening;
