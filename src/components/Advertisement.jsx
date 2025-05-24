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
      // Clear any existing content
      adRef.current.innerHTML = '';

      // Create a temporary div to parse the HTML
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = adCode;

      // Execute scripts manually
      const scripts = tempDiv.querySelectorAll('script');
      scripts.forEach(script => {
        const newScript = document.createElement('script');

        if (script.src) {
          newScript.src = script.src;
          newScript.async = true;
        } else {
          newScript.textContent = script.textContent;
        }

        // Add script attributes
        Array.from(script.attributes).forEach(attr => {
          newScript.setAttribute(attr.name, attr.value);
        });

        document.head.appendChild(newScript);
      });

      // Add non-script content to the container
      const nonScriptContent = tempDiv.innerHTML.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
      if (nonScriptContent.trim()) {
        adRef.current.innerHTML = nonScriptContent;
      }
    }
  }, [adCode]);

  return <div ref={adRef} className="ad-item ad-script-item" />;
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
