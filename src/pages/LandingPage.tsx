import React, { useEffect, useState } from 'react';
import styles from '../styles/LandingPage.module.css';
import mainImage from '../assets/main_image.jpg';
import bannerImage from '../assets/banner.jpg';
// import utilityIcon from '../assets/utility-icon.jpg';
import devsIcon from '../assets/devs-image.jpg';
// import earlyIcon from '../assets/early-icon.jpg';
import MTMTerminal from '../components/MTMTerminal';
import axios from 'axios';

interface TokenData {
  name: string;
  symbol: string;
  address: string;
  description: string;
  holders: number;
  current_price_usd: number;
}

interface TokenEntry {
  token_data: TokenData;
  result: string;
}

const LandingPage: React.FC = () => {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      document.documentElement.style.setProperty('--mouse-x', `${x}%`);
      document.documentElement.style.setProperty('--mouse-y', `${y}%`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [tokenData, setTokenData] = useState<TokenEntry[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://mtm-mtm-mark-market-agent-data.s3.us-east-2.amazonaws.com/current.json');
        setTokenData(response.data);
      } catch (error) {
        console.error('Error fetching token data:', error);
      }
    };

    fetchData();
  }, []);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      console.log('Copied to clipboard');
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const formatTokenData = (token: TokenEntry) => {
    const contractAddress = token.token_data.address;
    return `
> INITIALIZING TOKEN SCAN...
> TOKEN IDENTIFIED: ${token.token_data.name}
> SYMBOL: ${token.token_data.symbol}
> CONTRACT: ${contractAddress} 📋
> HOLDERS: ${token.token_data.holders.toLocaleString()}
------------------------------
MARKET ANALYSIS:
Current Price: $${token.token_data.current_price_usd.toFixed(6)}
MTM Price: ${token.result.split('MTM Price')[1].split(':')[1].split('-')[0].trim()}
${token.result.split('MTM Price')[1].split('-')[1].trim().replace('"', '')}

`;
  };

  const nextEntry = () => {
    setCurrentIndex((prev) => (prev + 1) % tokenData.length);
  };

  const prevEntry = () => {
    setCurrentIndex((prev) => (prev - 1 + tokenData.length) % tokenData.length);
  };

  return (
    <div className={styles.landingPage}>
      <div className={styles.gradientOrb1} />
      <div className={styles.gradientOrb2} />
      
      {/* Header */}
      {/* <header className={styles.header}>
        <div className={styles.logo}>M2M</div>
      </header> */}

      {/* Main Card */}
      <section className={styles.mainCard}>
        <div className={styles.banner}>
          <img src={bannerImage} alt="Banner" className={styles.bannerImage} />
        </div>
        
        <h1>
          Marking to Market.
        </h1>
        <p>A mobile-first agent (Mark I) that helps people make better trading decisions.</p>
        {/* <div className={styles.mainCardImage}>
          <img src={mainImage} alt="Platform Preview" />
          <div className={styles.imageGlow} />
        </div> */}
      </section>

      {/* New Terminal Section */}
      <section className={styles.terminalSection}>
        <div className="terminal-container relative max-w-4xl mx-auto p-8">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="terminal-frame border-2 border-green-500 p-4 bg-black rounded w-full md:w-[800px]">
              {tokenData.length > 0 && (
                <div 
                  onClick={(e) => {
                    const text = e.target as HTMLElement;
                    if (text.textContent?.includes(tokenData[currentIndex].token_data.address)) {
                      copyToClipboard(tokenData[currentIndex].token_data.address);
                    }
                  }}
                  className="cursor-pointer"
                >
                  <MTMTerminal 
                    content={formatTokenData(tokenData[currentIndex])} 
                    speed={25}
                  />
                </div>
              )}
            </div>
            
            <div className="flex flex-row md:hidden justify-center gap-8 mt-4">
              <button 
                onClick={prevEntry}
                className="flex flex-col items-center gap-2 text-green-500 
                          hover:text-green-400 focus:outline-none transition-colors"
                aria-label="Previous token"
              >
                <span className="text-2xl font-mono">←</span>
                <span className="text-sm">Previous token</span>
              </button>
              
              <button 
                onClick={nextEntry}
                className="flex flex-col items-center gap-2 text-green-500 
                          hover:text-green-400 focus:outline-none transition-colors"
                aria-label="Next token"
              >
                <span className="text-2xl font-mono">→</span>
                <span className="text-sm">Next token</span>
              </button>
            </div>
            
            <div className="hidden md:flex items-center gap-4">
              <button 
                onClick={prevEntry}
                className="flex flex-col items-center gap-2 text-green-500 
                          hover:text-green-400 focus:outline-none transition-colors"
                aria-label="Previous token"
              >
                <span className="text-2xl font-mono">←</span>
                <span className="text-sm">Previous token</span>
              </button>
              
              <button 
                onClick={nextEntry}
                className="flex flex-col items-center gap-2 text-green-500 
                          hover:text-green-400 focus:outline-none transition-colors"
                aria-label="Next token"
              >
                <span className="text-2xl font-mono">→</span>
                <span className="text-sm">Next token</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className={styles.features}>
        {features.map((feature, index) => (
          <div key={index} className={styles.featureCard}>
            <img src={feature.icon} alt={feature.title} className={styles.featureIcon} />
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </section>

      {/* Simple CTA */}
      {/* <section className={styles.cta}>
        <h2>Ready to get started?</h2>
        <button className={styles.ctaButton}>
          Start Free Trial
          <span className={styles.buttonSparkle}>✨</span>
        </button>
      </section> */}

      {/* Minimal Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.logo}>M2M</div>
          <div className={styles.footerLinks}>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

const features = [
  {
    icon: devsIcon,
    title: "Utility",
    description: "What do we do? Mark to Market."
  },
  {
    icon: devsIcon,
    title: "Real devs",
    description: "More than your average PF launcher, but still a community of degens."
  },
  {
    icon: devsIcon,
    title: "You're still early",
    description: "Get in before the masses"
  }
];

export default LandingPage;
