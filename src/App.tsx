import React, { useState, useEffect } from 'react';
import { Heart, Gift, Cake, Sparkles, Calendar, User, ArrowRight, PartyPopper } from 'lucide-react';

const FloatingIcon = ({ icon: Icon, className = "", delay = 0 }: { icon: any, className?: string, delay?: number }) => {
  return (
    <div 
      className={`absolute opacity-20 animate-bounce ${className}`}
      style={{ 
        animationDelay: `${delay}s`,
        animationDuration: '3s',
        animationIterationCount: 'infinite'
      }}
    >
      <Icon size={24} />
    </div>
  );
};

const ConfettiPiece = ({ delay }: { delay: number }) => {
  return (
    <div
      className="absolute w-2 h-2 bg-red-500 animate-pulse"
      style={{
        left: `${Math.random() * 100}%`,
        animationDelay: `${delay}s`,
        animationDuration: '2s',
        animationIterationCount: 'infinite'
      }}
    />
  );
};

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [bestieName, setBestieName] = useState('');
  const [birthdayDate, setBirthdayDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [fadeClass, setFadeClass] = useState('opacity-100');

  const handleBestieSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (bestieName.toLowerCase().trim() === 'nusrath') {
      transitionToNext();
    } else {
      alert('Hmm, that doesn\'t seem right! Try again 😊');
    }
  };

  const handleBirthdaySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const expectedDate = '2003-08-16';
    if (birthdayDate === expectedDate) {
      transitionToNext();
    } else {
      alert('Not quite! Think about when you were born 🎂');
    }
  };

  const transitionToNext = () => {
    setFadeClass('opacity-0');
    setIsLoading(true);
    
    setTimeout(() => {
      setCurrentStep(currentStep + 1);
      setIsLoading(false);
      setFadeClass('opacity-100');
      if (currentStep === 2) {
        setShowCelebration(true);
      }
    }, 800);
  };

  const renderStep1 = () => (
    <div className={`min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-black flex items-center justify-center transition-opacity duration-800 ${fadeClass}`}>
      <div className="relative">
        {/* Floating Icons */}
        <FloatingIcon icon={Heart} className="top-10 left-10 text-red-400" delay={0} />
        <FloatingIcon icon={Gift} className="top-20 right-20 text-white" delay={0.5} />
        <FloatingIcon icon={Sparkles} className="bottom-20 left-20 text-red-300" delay={1} />
        <FloatingIcon icon={Calendar} className="bottom-10 right-10 text-white" delay={1.5} />

        <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-white/20 max-w-md w-full mx-4">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500 rounded-full mb-4">
              <Heart className="text-white" size={32} />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Alert! Another year older! 😂</h1>
             <p className="text-gray-300">But still as awesome as ever...</p>
             </div>

          <form onSubmit={handleBestieSubmit} className="space-y-6">
            <div>
              <label className="block text-white font-medium mb-2">
                <User className="inline mr-2" size={20} />
                Enter the bestie name who sent this to you:
              </label>
              <input
                type="text"
                value={bestieName}
                onChange={(e) => setBestieName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                placeholder="Your bestie's name..."
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105"
            >
              Continue <ArrowRight size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className={`min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-900 flex items-center justify-center transition-opacity duration-800 ${fadeClass}`}>
      <div className="relative">
        {/* More floating icons */}
        <FloatingIcon icon={Cake} className="top-5 left-5 text-red-400" delay={0} />
        <FloatingIcon icon={PartyPopper} className="top-5 right-5 text-white" delay={0.3} />
        <FloatingIcon icon={Sparkles} className="bottom-5 left-5 text-red-300" delay={0.6} />
        <FloatingIcon icon={Gift} className="bottom-5 right-5 text-white" delay={0.9} />

        <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-white/20 max-w-md w-full mx-4">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500 rounded-full mb-4 animate-pulse">
              <Calendar className="text-white" size={32} />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Awesome! One last thing...</h1>
            <p className="text-gray-300">Tell me your birthday so we can celebrate! 🎉</p>
          </div>

          <form onSubmit={handleBirthdaySubmit} className="space-y-6">
            <div>
              <label className="block text-white font-medium mb-2">
                <Calendar className="inline mr-2" size={20} />
                Enter your birthday:
              </label>
              <input
                type="date"
                value={birthdayDate}
                onChange={(e) => setBirthdayDate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105"
            >
              Reveal Surprise <Sparkles size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className={`min-h-screen bg-gradient-to-br from-red-900 via-black to-gray-900 flex items-center justify-center transition-opacity duration-800 ${fadeClass} relative overflow-hidden`}>
      {/* Confetti */}
      {showCelebration && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <ConfettiPiece key={i} delay={i * 0.1} />
          ))}
        </div>
      )}

      {/* Floating celebration icons */}
      <FloatingIcon icon={Heart} className="top-10 left-10 text-red-400" delay={0} />
      <FloatingIcon icon={Heart} className="top-20 right-20 text-white" delay={0.5} />
      <FloatingIcon icon={Sparkles} className="bottom-20 left-20 text-red-300" delay={1} />
      <FloatingIcon icon={PartyPopper} className="bottom-10 right-10 text-white" delay={1.5} />
      <FloatingIcon icon={Gift} className="top-1/2 left-5 text-red-400" delay={2} />
      <FloatingIcon icon={Cake} className="top-1/3 right-5 text-white" delay={2.5} />

      <div className="text-center max-w-4xl mx-4 relative z-10">
        {/* Birthday Cake Animation */}
        <div className="mb-8 relative">
          <div className="inline-block relative">
            <div className="w-32 h-24 bg-gradient-to-t from-amber-700 to-amber-600 rounded-lg relative mx-auto mb-4">
              {/* Cake layers */}
              <div className="absolute top-0 left-2 right-2 h-4 bg-white rounded-t-lg"></div>
              <div className="absolute top-3 left-1 right-1 h-4 bg-red-400 rounded"></div>
              <div className="absolute top-6 left-2 right-2 h-4 bg-white rounded"></div>
              
              {/* Candle */}
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-1 h-6 bg-yellow-600 rounded-full"></div>
              
              {/* Flame */}
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 animate-pulse">
          HAPPY BIRTHDAY
        </h1>
        <h2 className="text-4xl md:text-6xl font-bold text-red-400 mb-8">
          USMAN! 🎉
        </h2>

        <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-white/20 mb-8">
          <p className="text-xl md:text-2xl text-white mb-6 leading-relaxed">
            Another year of amazing memories, incredible friendship, May this year bring you even more success, happiness, and reasons to smile.
             Thanks for being not just a friend, but family. 
          </p>
          <p className="text-lg text-gray-300 mb-4">
            7+ years of friendship and still counting... 
          </p>
          <p className="text-lg text-gray-300">
            From your bestie, <span className="font-bold text-red-400">Nusrath</span> ❤️
          </p>
        </div>

        {/* Photo Gallery Section */}
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-white/20">
          <h3 className="text-2xl font-bold text-white mb-4 flex items-center justify-center gap-2">
            <Heart className="text-red-400" />
            Memory Lane
            <Heart className="text-red-400" />
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="aspect-square rounded-xl overflow-hidden border-2 border-white/20 hover:border-red-400 transition-all duration-300 transform hover:scale-105">
              <img 
                src="/usman1.jpg" 
                alt="Usman with his bike" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-square rounded-xl overflow-hidden border-2 border-white/20 hover:border-red-400 transition-all duration-300 transform hover:scale-105">
              <img 
                src="/usman2.jpg" 
                alt="Usman with his bike 2" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-square rounded-xl overflow-hidden border-2 border-white/20 hover:border-red-400 transition-all duration-300 transform hover:scale-105">
              <img 
                src="/usman3.jpg" 
                alt="Usman outdoor adventure" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-square rounded-xl overflow-hidden border-2 border-white/20 hover:border-red-400 transition-all duration-300 transform hover:scale-105">
              <img 
                src="/usman4.jpg" 
                alt="Usman outdoor adventure" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="mt-8">
          <p className="text-red-400 text-xl font-semibold animate-bounce">
            🎂 Make a wish! 🎂
          </p>
        </div>
      </div>
    </div>
  );

  const renderLoading = () => (
    <div className="min-h-screen bg-gradient-to-br from-black to-red-900 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-red-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-white text-xl">Preparing your surprise...</p>
      </div>
    </div>
  );

  if (isLoading) return renderLoading();

  switch (currentStep) {
    case 1:
      return renderStep1();
    case 2:
      return renderStep2();
    case 3:
      return renderStep3();
    default:
      return renderStep1();
  }
}

export default App;