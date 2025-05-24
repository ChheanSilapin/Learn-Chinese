import { useEffect, useRef } from 'react';
import '../style/Advertisement.css';

// Sample ad data - in a real app, this would come from an ad service
const sampleAds = [
  {
    id: 1,
    type: "banner",
    adCode: `<script type="text/javascript">
    atOptions = {
        'key' : '88766f3d2fa03e6d0c422d04fb80bb75',
        'format' : 'iframe',
        'height' : 90,
        'width' : 728,
        'params' : {}
    };
</script>
<script type="text/javascript" src="//www.highperformanceformat.com/88766f3d2fa03e6d0c422d04fb80bb75/invoke.js"></script>`
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
 * ScriptAd component that properly handles script-based ads
 */
const ScriptAd = ({ adCode }) => {
  const adRef = useRef(null);

  useEffect(() => {
    if (adRef.current && adCode) {
      const container = adRef.current;

      // Clear any existing content
      container.innerHTML = '';

      // Add a unique ID for this ad instance
      const adId = `ad-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      container.id = adId;

      // Set up the ad configuration globally
      if (typeof window !== 'undefined') {
        const globalWindow = window;
        globalWindow.atOptions = {
          'key': '88766f3d2fa03e6d0c422d04fb80bb75',
          'format': 'iframe',
          'height': 90,
          'width': 728,
          'params': {}
        };
      }

      // Add the script directly to the container
      const scriptElement = document.createElement('script');
      scriptElement.type = 'text/javascript';
      scriptElement.async = true;
      scriptElement.src = 'https://www.highperformanceformat.com/88766f3d2fa03e6d0c422d04fb80bb75/invoke.js';

      scriptElement.onerror = () => {
        container.innerHTML = '<div style="background: #f0f0f0; padding: 20px; text-align: center; border: 1px dashed #ccc; color: #666;">Advertisement Space</div>';
      };

      // Append script to container
      container.appendChild(scriptElement);

      // Cleanup function
      return () => {
        if (container) {
          container.innerHTML = '';
        }
      };
    }
  }, [adCode]);

  return <div ref={adRef} className="ad-item ad-script-item" style={{ minHeight: '90px', textAlign: 'center' }} />;
};

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

    // Prioritize script-based ads (real ads) over placeholder ads
    const scriptAds = filteredAds.filter(ad => ad.adCode);
    const imageAds = filteredAds.filter(ad => !ad.adCode);

    // Return script ads first, then image ads if needed
    const prioritizedAds = [...scriptAds, ...imageAds];
    return prioritizedAds.slice(0, count);
  };

  const adsToShow = getAds();

  return (
    <div className={`ad-container ${type}-ad ${className}`}>
      {adsToShow.map(ad => (
        ad.adCode ? (
          <ScriptAd key={ad.id} adCode={ad.adCode} />
        ) : (
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
        )
      ))}
    </div>
  );
};

export default Advertisement;
