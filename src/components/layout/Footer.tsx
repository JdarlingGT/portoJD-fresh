import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, FileText, Music } from 'lucide-react';

const Footer = () => {
  const [showHepCTA, setShowHepCTA] = useState(false);

  useEffect(() => {
    const pageViews = parseInt(localStorage.getItem('pageViews') || '0') + 1;
    const firstVisit = localStorage.getItem('firstVisit') || Date.now().toString();
    const timeElapsed = Date.now() - parseInt(firstVisit);

    localStorage.setItem('pageViews', pageViews.toString());

    // Show after 3 page views and 5 minutes (300000 ms)
    if (pageViews >= 3 && timeElapsed >= 300000) {
      setShowHepCTA(true);
    }
  }, []);

  const playHepSong = () => {
    // Assuming the audio file is at /assets/hep/audio/heps-duet.mp3
    const audio = new Audio('/assets/hep/audio/heps-duet.mp3');
    audio.play();
  };

  return (
    <footer className="bg-[#0A0A0A] text-slate-400">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p>&copy; {new Date().getFullYear()} Jacob Darling. All Rights Reserved.</p>
          </div>

          <div className="flex items-center space-x-6">
            <a
              href="https://github.com/JdarlingGT"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/in/jacobdarling"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <Link
              to="/resume"
              className="hover:text-white transition-colors"
              aria-label="Resume"
            >
              <FileText className="w-5 h-5" />
            </Link>
          </div>

          {showHepCTA && (
            <button
              onClick={playHepSong}
              className="flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-4 py-2 rounded-lg hover:from-cyan-600 hover:to-purple-600 transition-all"
            >
              <Music className="w-4 h-4" />
              <span>Play Hep's Song</span>
            </button>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
