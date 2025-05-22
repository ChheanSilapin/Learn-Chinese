import React from 'react';
import '../style/Advertisement.css';

// Sample ad data - in a real app, this would come from an ad service
const sampleAds = [
  {
    id: 1,
    title: "Learn Chinese Fast",
    description: "Premium course with native speakers",
    imageUrl: "https://placehold.co/300x200/e6f7ff/1890ff?text=Chinese+Course",
    link: "https://example.com/chinese-course",
    type: "banner"
  },
  {
    id: 2,
    title: "Chinese Dictionary App",
    description: "Download our app for instant translations",
    imageUrl: "https://placehold.co/300x200/fff7e6/fa8c16?text=Dictionary+App",
    link: "https://example.com/dictionary-app",
    type: "sidebar"
  },
  {
    id: 3,
    title: "Study in China",
    description: "Immersive language programs in Beijing",
    imageUrl: "https://placehold.co/300x200/f6ffed/52c41a?text=Study+Abroad",
    link: "https://example.com/study-abroad",
    type: "banner"
  },

];

/**
 * Advertisement component that displays ads
 * @param {Object} props
 * @param {string} props.type - Type of ad to display ('banner', 'sidebar', or 'random')
 * @param {number} props.count - Number of ads to display (default: 1)
 * @param {string} props.className - Additional CSS class for styling
 */
const Advertisement = ({ type = 'banner', count = 1, className = '' }) => {
  // Filter ads by type or get random ads if type is 'random'
  const getAds = () => {
    let filteredAds = sampleAds;
    
    if (type !== 'random') {
      filteredAds = sampleAds.filter(ad => ad.type === type);
    }
    
    // Shuffle and get the requested number of ads
    return filteredAds
      .sort(() => 0.5 - Math.random())
      .slice(0, count);
  };

  const adsToShow = getAds();

  return (
    <div className={`ad-container ${type}-ad ${className}`}>
      {adsToShow.map(ad => (
        <div key={ad.id} className="ad-item">
          <a href={ad.link} target="_blank" rel="noopener noreferrer" className="ad-link">
            <img src={ad.imageUrl} alt={ad.title} className="ad-image" />
            <div className="ad-content">
              <h3 className="ad-title">{ad.title}</h3>
              <p className="ad-description">{ad.description}</p>
            </div>
            <div className="ad-badge">Ad</div>
          </a>
        </div>
      ))}
    </div>
  );
};

export default Advertisement;
