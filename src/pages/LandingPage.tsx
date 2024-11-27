import React, { useEffect, useState } from 'react';
import styles from '../styles/LandingPage.module.css';
import mainImage from '../assets/main_image.jpg';
import bannerImage from '../assets/banner.jpg';
// import utilityIcon from '../assets/utility-icon.jpg';
import devsIcon from '../assets/devs-image.jpg';
// import earlyIcon from '../assets/early-icon.jpg';
import MTMTerminal from '../components/MTMTerminal';
import axios from 'axios';
import dexscreenerIcon from '../assets/dexscreener.png';
import dextoolsIcon from '../assets/dextools.png';
import twitterIcon from '../assets/twitter.png';
import telegramIcon from '../assets/telegram.png';

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
  const [shownIndices, setShownIndices] = useState<Set<number>>(new Set());
  const [showTerminal, setShowTerminal] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const timestamp = new Date().getTime();
        const response = await axios.get(
          `https://mtm-mtm-mark-market-agent-data.s3.us-east-2.amazonaws.com/current.json?t=${timestamp}`, 
          {
            headers: {
              'Accept': 'application/json',
            }
          }
        );
        setTokenData(response.data);
      } catch (error) {
        console.error('Error fetching token data:', error);
      }
    };

    fetchData();

    // Set up an interval to fetch data every 30 seconds
    const interval = setInterval(fetchData, 30000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(true);
    }, 2000);

    return () => clearTimeout(timer);
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
    const shortenAddressForMobile = (address: string) => {
      if (window.innerWidth <= 768) {
        return `${address.slice(0, 5)}...${address.slice(-5)}`;
      }
      return address;
    };

    // Extract just the recommendation word (Buy, Sell, or Hold)
    const recommendation = token.result.split('Recommendation')[1]
      .split(':')[1]
      .trim()
      .match(/(Buy|Sell|Hold)/i)?.[0] || 'Hold';

    return `> FETCHING NEXT TRENDING TOKEN FROM DEXTOOLS...
> TOKEN IDENTIFIED: ${token.token_data.name}
> SYMBOL: ${token.token_data.symbol}
> CONTRACT: ${shortenAddressForMobile(contractAddress)}📋
> HOLDERS: ${token.token_data.holders.toLocaleString()}
------------------------------
PERFORMING MARK TO MARKET ANALYSIS...
Current Price: $${token.token_data.current_price_usd.toFixed(6)}
MTM Price: ${token.result.split('MTM Price')[1].split(':')[1].split('-')[0].trim()}
------------------------------
RECOMMENDATION: ${recommendation}`;
  };

  const nextEntry = () => {
    setShownIndices(prev => new Set(prev).add(currentIndex));
    setCurrentIndex((prev) => (prev + 1) % tokenData.length);
  };

  const prevEntry = () => {
    setShownIndices(prev => new Set(prev).add(currentIndex));
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
        
        <h1 className={styles.mainTitle}>
          Mark to Market
        </h1>
        <p>Mark I is an AI agent that helps you make better trading decisions. Mark works for your bags.</p>
        
        {/* Add contract address */}
        <div className={styles.contractAddress} 
             onClick={() => copyToClipboard("97RggLo3zV5kFGYW4yoQTxr4Xkz4Vg2WPHzNYXXWpump")}>
          <span className={styles.contractLabel}>Contract:</span>
          <code className={styles.addressCode}>
            97RggLo3zV5kFGYW4yoQTxr4Xkz4Vg2WPHzNYXXWpump
          </code>
          <span className={styles.copyIcon}>📋</span>
        </div>
        <div className={styles.socialButtons}>
          <a 
            href="https://dexscreener.com/solana/aetz9zvedn2xvwsucyyhdhbuh2uxqhbayfzsibl9q3am" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.socialButton}
          >
            <img src={dexscreenerIcon} alt="Dexscreener" />
          </a>
          <a 
            href="https://www.dextools.io/app/en/solana/pair-explorer/97RggLo3zV5kFGYW4yoQTxr4Xkz4Vg2WPHzNYXXWpump" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.socialButton}
          >
            <img src={dextoolsIcon} alt="Dextools" />
          </a>
          <a 
            href="https://x.com/mark_to_market0" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.socialButton}
          >
            <img src={twitterIcon} alt="X" />
          </a>
          <a 
            href="https://t.me/mark_to_market_chat" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.socialButton}
          >
            <img src={telegramIcon} alt="Telegram" />
          </a>
        </div>
      </section>

      {/* New Terminal Section */}
      <section className={styles.terminalSection}>
        <div className="terminal-container relative max-w-4xl mx-auto p-8">
          <div className="flex flex-col items-center gap-4">
            {/* Terminal */}
            <div className="terminal-frame border-2 border-green-500 p-4 bg-black rounded w-full md:w-[800px]">
              <div className="flex flex-col gap-2 mb-4">
                <span className="text-white text-sm font-mono">MARK I GENERIC INSTANCE (V0.1)</span>
                <div className="flex items-center gap-2">
                  <div className={`animate-pulse w-2 h-2 rounded-full ${showTerminal ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                  <span className="text-green-500 text-sm font-mono">
                    {showTerminal ? 'LIVE' : 'AWAITING USER INITIATION'}
                  </span>
                </div>
              </div>
              
              <div className="cursor-pointer">
                {!showTerminal && (
                  showWelcome ? (
                    <MTMTerminal 
                      content={`Welcome to Mark I, fellow degen.\n\nDare to wield the Mark-to-Market Scale, where prosperity meets ruin. Born of cosmic forces, this ancient artifact reveals the truth of value—at a cost. With glowing scales and the haunting sigil MTM, step into the reckoning. Discover wealth beyond imagination or face the abyss.\n\nPress 'Mark to Market' to begin your journey.`}
                      speed={50}
                      skipAnimation={false}
                    />
                  ) : (
                    <pre className="font-mono text-green-500 whitespace-pre-wrap select-none user-select-none">
                      _
                    </pre>
                  )
                )}
                
                {showTerminal && tokenData.length > 0 && (
                  <div 
                    onClick={(e) => {
                      const text = e.target as HTMLElement;
                      if (text.textContent?.includes(tokenData[currentIndex].token_data.address)) {
                        copyToClipboard(tokenData[currentIndex].token_data.address);
                      }
                    }}
                  >
                    <MTMTerminal 
                      content={formatTokenData(tokenData[currentIndex])} 
                      speed={25}
                      skipAnimation={shownIndices.has(currentIndex)}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Button or Navigation */}
            {!showTerminal ? (
              <button 
                onClick={() => setShowTerminal(true)}
                className="w-full md:w-[800px] py-4 px-6 text-green-500 border-2 border-green-500 
                          rounded hover:bg-green-500/10 transition-colors duration-300
                          font-mono text-xl focus:outline-none"
              >
                Mark to Market
              </button>
            ) : (
              <div className="flex justify-center gap-8">
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
            )}
          </div>
        </div>
      </section>

      {/* Update the features section */}
      {/* <section className={styles.features}>
        <div className={styles.featuresIntro}>
          <h2>More Info</h2>
        </div>
        
        {features.map((feature, index) => (
          <div key={index} className={styles.featureCard}>
            <img src={feature.icon} alt={feature.title} className={styles.featureIcon} />
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </section> */}

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
            {/* <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Contact</a> */}
            <h3>MTM 2024</h3>
          </div>
        </div>
      </footer>
    </div>
  );
};

const features = [
  {
    icon: devsIcon,
    title: "Marking",
    description: "100% of the time, without fail this is to market"
  },
  {
    icon: devsIcon,
    title: "Market",
    description: "This is the place to which we faithfully and dutifully mark"
  },
  {
    icon: devsIcon,
    title: "You're still early",
    description: "Frontrun the masses and get your hands on some $MTM, the key to Marking to Market with Mark I."
  }
];

export default LandingPage;
