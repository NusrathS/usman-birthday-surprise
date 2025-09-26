import React, { useState, useEffect, useRef } from 'react';

const BirthdaySurpriseApp: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [senderName, setSenderName] = useState('');
  const [birthdayDate, setBirthdayDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const particlesRef = useRef<HTMLDivElement>(null);

  // Create floating particles
  const createFloatingParticles = () => {
    if (!particlesRef.current) return;
    
    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 4) + 's';
        particlesRef.current?.appendChild(particle);
        
        setTimeout(() => {
          if (particle.parentNode) {
            particle.remove();
          }
        }, 8000);
      }, i * 300);
    }
  };

  // Update progress bar
  const updateProgress = (step: number) => {
    const progressFill = document.getElementById('progressFill');
    if (progressFill) {
      const progress = (step / 3) * 100;
      progressFill.style.width = progress + '%';
    }
  };

  // Show toast notification
  const showToast = (message: string) => {
    const toast = document.createElement('div');
    toast.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: rgba(255, 255, 255, 0.9);
      color: #333;
      padding: 15px 25px;
      border-radius: 25px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
      z-index: 10000;
      font-weight: 600;
      animation: slideInUp 0.5s ease-out;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.style.animation = 'slideInUp 0.5s ease-out reverse';
      setTimeout(() => {
        if (toast.parentNode) {
          toast.remove();
        }
      }, 500);
    }, 3000);
  };

  // Create enhanced confetti
  const createEnhancedConfetti = () => {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff'];
    
    for (let i = 0; i < 150; i++) {
      setTimeout(() => {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 2 + 's';
        confetti.style.animationDuration = (Math.random() * 2 + 3) + 's';
        document.body.appendChild(confetti);
        
        setTimeout(() => {
          if (confetti.parentNode) {
            confetti.remove();
          }
        }, 5000);
      }, i * 50);
    }
  };

  // Create fireworks
  const createFireworks = () => {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#feca57', '#ff9ff3'];
    
    for (let i = 0; i < 8; i++) {
      setTimeout(() => {
        const firework = document.createElement('div');
        firework.className = 'firework';
        firework.style.left = Math.random() * 100 + 'vw';
        firework.style.top = Math.random() * 50 + 'vh';
        firework.style.color = colors[Math.floor(Math.random() * colors.length)];
        document.body.appendChild(firework);
        
        setTimeout(() => {
          if (firework.parentNode) {
            firework.remove();
          }
        }, 1000);
      }, i * 800);
    }
  };

  // Handle next step
  const handleNextStep = (step: number) => {
    if (step === 2) {
      if (!senderName.trim()) {
        showToast('Please enter your name first!');
        return;
      }
      if (senderName.toLowerCase() !== 'nusrath') {
        showToast('Hey Hari, it\'s Nusrath! Please enter the correct name.');
        setSenderName('');
        return;
      }
    }
    
    setCurrentStep(step);
    updateProgress(step);
  };

  // Reveal surprise
  const revealSurprise = () => {
    if (!birthdayDate) {
      showToast('Please select a celebration date!');
      return;
    }

    if (birthdayDate !== '1998-09-27') {
      showToast('Oops! That's not the right date. Try again!');
      setBirthdayDate('');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setCurrentStep(3);
      updateProgress(3);
      setLoading(false);
      createFireworks();
      createEnhancedConfetti();
    }, 2000);
  };

  // Handle click for easter egg
  const handleClick = () => {
    const newClickCount = clickCount + 1;
    setClickCount(newClickCount);
    
    if (newClickCount === 10) {
      showToast('You found a secret! Extra confetti!');
      createEnhancedConfetti();
      setClickCount(0);
    }
  };

  // Keyboard support
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (currentStep === 1 && senderName.trim()) {
        handleNextStep(2);
      } else if (currentStep === 2 && birthdayDate) {
        revealSurprise();
      }
    }
  };

  // Initialize effects
  useEffect(() => {
    updateProgress(1);
    createFloatingParticles();
    
    const interval = setInterval(createFloatingParticles, 6000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div onClick={handleClick} onKeyPress={handleKeyPress}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;800&display=swap');
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        :root {
            --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
            --secondary-gradient: linear-gradient(45deg, #ff6b6b, #ee5a24, #feca57);
            --success-gradient: linear-gradient(45deg, #56ab2f, #a8e6cf);
            --text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
            --glass-bg: rgba(255, 255, 255, 0.15);
            --glass-border: rgba(255, 255, 255, 0.25);
        }

        body {
            font-family: 'Poppins', sans-serif;
            background: var(--primary-gradient);
            background-size: 400% 400%;
            animation: gradientShift 8s ease infinite;
            min-height: 100vh;
            color: white;
            overflow-x: hidden;
            position: relative;
        }

        .app-container {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        @keyframes gradientShift {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
        }

        .particles {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
        }

        .particle {
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(255, 255, 255, 0.6);
            border-radius: 50%;
            animation: float 6s infinite linear;
        }

        @keyframes float {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-10vh) rotate(360deg);
                opacity: 0;
            }
        }

        .container {
            max-width: 600px;
            width: 90%;
            text-align: center;
            padding: 20px;
            position: relative;
        }

        .progress-bar {
            width: 100%;
            height: 4px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 2px;
            margin-bottom: 30px;
            overflow: hidden;
        }

        .progress-fill {
            height: 100%;
            background: var(--secondary-gradient);
            border-radius: 2px;
            transition: width 0.8s ease;
            width: 0%;
        }

        .step {
            display: none;
            animation: slideInUp 1s ease-out;
        }

        .step.active {
            display: block;
        }

        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(50px) scale(0.9);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }

        @keyframes bounceIn {
            0% {
                transform: scale(0.3) rotate(-10deg);
                opacity: 0;
            }
            50% {
                transform: scale(1.05) rotate(5deg);
            }
            70% {
                transform: scale(0.9) rotate(-2deg);
            }
            100% {
                transform: scale(1) rotate(0deg);
                opacity: 1;
            }
        }

        @keyframes heartBeat {
            0%, 100% { transform: scale(1); }
            14% { transform: scale(1.3); }
            28% { transform: scale(1); }
            42% { transform: scale(1.3); }
            70% { transform: scale(1); }
        }

        .icon {
            width: 100px;
            height: 100px;
            background: var(--glass-bg);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 30px;
            font-size: 40px;
            animation: bounceIn 1.2s ease-out;
            backdrop-filter: blur(20px);
            border: 3px solid var(--glass-border);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
            position: relative;
            overflow: hidden;
        }

        .icon::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
            animation: shimmer 3s infinite;
        }

        @keyframes shimmer {
            0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
            100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
        }

        h1 {
            font-size: clamp(2rem, 5vw, 3.5rem);
            margin-bottom: 20px;
            font-weight: 800;
            text-shadow: var(--text-shadow);
            background: linear-gradient(45deg, #fff, #ffd700, #fff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: textGlow 2s ease-in-out infinite alternate;
        }

        @keyframes textGlow {
            from { filter: drop-shadow(0 0 5px rgba(255, 215, 0, 0.5)); }
            to { filter: drop-shadow(0 0 20px rgba(255, 215, 0, 0.8)); }
        }

        h2 {
            font-size: clamp(1.5rem, 4vw, 2.5rem);
            margin-bottom: 20px;
            font-weight: 700;
            text-shadow: var(--text-shadow);
        }

        p {
            font-size: clamp(1rem, 2.5vw, 1.3rem);
            margin-bottom: 25px;
            opacity: 0.95;
            line-height: 1.7;
            text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
        }

        .glass-card {
            background: var(--glass-bg);
            backdrop-filter: blur(20px);
            border-radius: 25px;
            border: 1px solid var(--glass-border);
            padding: 30px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease;
        }

        .glass-card:hover {
            transform: translateY(-5px);
        }

        .input-group {
            margin: 30px 0;
            text-align: left;
        }

        .input-group label {
            display: block;
            margin-bottom: 15px;
            font-size: 1.2rem;
            font-weight: 600;
            text-align: center;
        }

        input[type="text"], input[type="date"] {
            width: 100%;
            padding: 18px 25px;
            border: none;
            border-radius: 50px;
            font-size: 1.1rem;
            background: rgba(255, 255, 255, 0.9);
            color: #333;
            outline: none;
            transition: all 0.4s ease;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
            font-family: 'Poppins', sans-serif;
        }

        input[type="text"]:focus, input[type="date"]:focus {
            transform: translateY(-3px);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            background: white;
            border: 2px solid #ffd700;
        }

        .btn {
            background: var(--secondary-gradient);
            border: none;
            padding: 18px 45px;
            border-radius: 50px;
            color: white;
            font-size: 1.2rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.4s ease;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            margin-top: 25px;
            position: relative;
            overflow: hidden;
            font-family: 'Poppins', sans-serif;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
            transition: left 0.5s;
        }

        .btn:hover::before {
            left: 100%;
        }

        .btn:hover {
            transform: translateY(-5px) scale(1.05);
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
            animation: heartBeat 1s;
        }

        .birthday-message {
            background: var(--glass-bg);
            padding: 40px;
            border-radius: 30px;
            backdrop-filter: blur(20px);
            border: 2px solid var(--glass-border);
            margin: 20px 0;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
            position: relative;
            overflow: hidden;
        }

        .birthday-name {
            font-size: clamp(2rem, 6vw, 4rem);
            font-weight: 900;
            background: linear-gradient(45deg, #ffd700, #ffed4a, #feca57, #ff9ff3);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin: 30px 0;
            text-shadow: var(--text-shadow);
            animation: rainbow 3s linear infinite;
        }

        @keyframes rainbow {
            0%, 100% { filter: hue-rotate(0deg); }
            50% { filter: hue-rotate(180deg); }
        }

        .celebration-emoji {
            font-size: clamp(3rem, 8vw, 6rem);
            animation: bounceIn 1.5s ease-out, heartBeat 2s infinite 2s;
            margin: 25px 0;
            display: inline-block;
        }

        .balloons {
            position: absolute;
            top: 20px;
            width: 100%;
            display: flex;
            justify-content: space-around;
            pointer-events: none;
        }

        .balloon {
            width: 30px;
            height: 40px;
            border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
            position: relative;
            animation: balloonFloat 3s ease-in-out infinite;
        }

        .balloon:nth-child(1) { background: #ff6b6b; animation-delay: 0s; }
        .balloon:nth-child(2) { background: #4ecdc4; animation-delay: 0.5s; }
        .balloon:nth-child(3) { background: #45b7d1; animation-delay: 1s; }
        .balloon:nth-child(4) { background: #96ceb4; animation-delay: 1.5s; }
        .balloon:nth-child(5) { background: #feca57; animation-delay: 2s; }

        .balloon::after {
            content: '';
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            width: 1px;
            height: 50px;
            background: rgba(255, 255, 255, 0.3);
        }

        @keyframes balloonFloat {
            0%, 100% { transform: translateY(0px) rotate(-5deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
        }

        .memory-card {
            background: var(--glass-bg);
            border-radius: 20px;
            padding: 25px;
            margin: 20px 0;
            backdrop-filter: blur(15px);
            border: 1px solid var(--glass-border);
            transition: transform 0.3s ease;
        }

        .memory-card:hover {
            transform: scale(1.02);
        }

        .photo-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 20px;
            margin: 40px 0;
        }

        .photo-placeholder {
            aspect-ratio: 1;
            background: linear-gradient(45deg, var(--glass-bg), rgba(255, 255, 255, 0.05));
            border-radius: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2.5rem;
            backdrop-filter: blur(15px);
            border: 2px solid var(--glass-border);
            transition: all 0.4s ease;
            position: relative;
            overflow: hidden;
        }

        .photo-placeholder:hover {
            transform: scale(1.1) rotate(5deg);
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
        }

        .photo-placeholder::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
            transition: transform 0.5s;
            transform: translateX(-100%) translateY(-100%);
        }

        .photo-placeholder:hover::before {
            transform: translateX(100%) translateY(100%);
        }

        .loading {
            margin: 20px 0;
        }

        .loading-dots {
            display: flex;
            justify-content: center;
            gap: 5px;
        }

        .loading-dot {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.8);
            animation: loadingPulse 1.5s ease-in-out infinite;
        }

        .loading-dot:nth-child(2) { animation-delay: 0.2s; }
        .loading-dot:nth-child(3) { animation-delay: 0.4s; }

        @keyframes loadingPulse {
            0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
            40% { transform: scale(1.2); opacity: 1; }
        }

        .firework {
            position: fixed;
            pointer-events: none;
            z-index: 1000;
        }

        .firework::before {
            content: '';
            position: absolute;
            width: 4px;
            height: 4px;
            border-radius: 50%;
            box-shadow: 
                0 0 6px currentColor,
                0 0 12px currentColor,
                0 0 18px currentColor;
            animation: fireworkExplode 1s ease-out forwards;
        }

        @keyframes fireworkExplode {
            0% {
                transform: scale(0);
                opacity: 1;
            }
            100% {
                transform: scale(20);
                opacity: 0;
            }
        }

        .confetti {
            position: fixed;
            width: 12px;
            height: 12px;
            border-radius: 2px;
            animation: confetti-fall 4s linear infinite;
            z-index: 1000;
        }

        @keyframes confetti-fall {
            0% {
                transform: translateY(-100vh) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(100vh) rotate(720deg);
                opacity: 0;
            }
        }

        @media (max-width: 768px) {
            .container {
                width: 95%;
                padding: 15px;
            }

            .icon {
                width: 80px;
                height: 80px;
                font-size: 32px;
            }

            .birthday-message {
                padding: 25px;
            }

            .photo-grid {
                grid-template-columns: repeat(2, 1fr);
                gap: 15px;
            }

            .balloons {
                top: 10px;
            }

            .balloon {
                width: 20px;
                height: 25px;
            }

            .btn {
                padding: 15px 35px;
                font-size: 1rem;
            }
        }
      `}</style>

      <div className="app-container">
        {/* Floating particles */}
        <div ref={particlesRef} className="particles"></div>

        <div className="container">
          {/* Progress bar */}
          <div className="progress-bar">
            <div className="progress-fill" id="progressFill"></div>
          </div>

          {/* Step 1: Welcome */}
          <div className={`step ${currentStep === 1 ? 'active' : ''}`}>
            <div className="glass-card">
              <div className="icon">🎊</div>
              <h1>Special Alert!</h1>
              <h2>Someone Amazing is Getting Older! 🎉</h2>
              <p>But don't worry... they're only getting more awesome! ✨</p>
              
              <div className="input-group">
                <label>👋 Who's sending this special surprise?</label>
                <input 
                  type="text" 
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="Enter your name..." 
                  maxLength={30}
                />
              </div>
              
              <button className="btn" onClick={() => handleNextStep(2)}>
                Continue the Magic →
              </button>
            </div>
          </div>

          {/* Step 2: Build Anticipation */}
          <div className={`step ${currentStep === 2 ? 'active' : ''}`}>
            <div className="glass-card">
              <div className="icon">🎭</div>
              <h2>Perfect! Now let's set the stage...</h2>
              <p>Every great celebration needs the perfect timing! 🕐</p>
              
              <div className="input-group">
                <label>📅 When should we celebrate this special person?</label>
                <input 
                  type="date" 
                  value={birthdayDate}
                  onChange={(e) => setBirthdayDate(e.target.value)}
                />
              </div>
              
              {loading && (
                <div className="loading">
                  <p>Preparing something magical...</p>
                  <div className="loading-dots">
                    <div className="loading-dot"></div>
                    <div className="loading-dot"></div>
                    <div className="loading-dot"></div>
                  </div>
                </div>
              )}
              
              <button className="btn" onClick={revealSurprise}>
                🎪 Reveal the Big Surprise! ✨
              </button>
            </div>
          </div>

          {/* Step 3: The Grand Reveal */}
          <div className={`step ${currentStep === 3 ? 'active' : ''}`}>
            <div className="balloons">
              <div className="balloon"></div>
              <div className="balloon"></div>
              <div className="balloon"></div>
              <div className="balloon"></div>
              <div className="balloon"></div>
            </div>

            <div className="birthday-message">
              <h1>🎉 HAPPY BIRTHDAY 🎉</h1>
              <div className="birthday-name">HARI KRISHNA BANDLA!</div>
              <div className="celebration-emoji">🎂</div>
              
              <div className="memory-card">
                <p><strong>Another year of incredible achievements!</strong> 🌟</p>
                <p>Your dedication, creativity, and positive energy make every project better. May this new year bring you even more success, joy, and amazing opportunities!</p>
              </div>

              <div className="memory-card">
                <p><strong>What makes you special:</strong></p>
                <p>✨ Your innovative problem-solving skills<br/>
                🤝 The way you bring teams together<br/>
                💡 Your brilliant ideas that inspire us all<br/>
                😊 The positive energy you share every day</p>
              </div>
              
              <div className="photo-grid">
                <div className="photo-placeholder">🎯</div>
                <div className="photo-placeholder">📸</div>
                <div className="photo-placeholder">🌟</div>
                <div className="photo-placeholder">🎨</div>
                <div className="photo-placeholder">🚀</div>
                <div className="photo-placeholder">💫</div>
              </div>
              
              <div className="memory-card" style={{marginTop: '30px'}}>
                <p style={{fontSize: '1.4rem', fontWeight: 600}}>
                  "Here's to another year of greatness, friendship, and making amazing things happen together!" 🥳
                </p>
                <p style={{marginTop: '20px', fontStyle: 'italic', color: '#ffd700'}}>
                  With lots of appreciation and best wishes,<br/>
                  <span style={{fontWeight: 'bold', fontSize: '1.2rem'}}>{senderName || 'Nusrath'}</span> 💝
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BirthdaySurpriseApp;
