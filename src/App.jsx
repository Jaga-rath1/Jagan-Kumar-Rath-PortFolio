import React, { useState } from 'react';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero3DCanvas from './components/Hero3DCanvas';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import SkillUniverse from './components/SkillUniverse';
import Projects from './components/Projects';
import DataScienceLab from './components/DataScienceLab';
import Education from './components/Education';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative min-h-screen bg-[#030014] text-slate-100 overflow-x-hidden selection:bg-purple-600 selection:text-white">
      {/* Cinematic Intro Loading Screen */}
      {isLoading && <LoadingScreen onFinish={() => setIsLoading(false)} />}

      {/* Global 3D Space Background Canvas */}
      <Hero3DCanvas />

      {/* Floating Glass Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="relative z-10 flex flex-col">
        <Hero />
        <About />
        <Experience />
        <SkillUniverse />
        <Projects />
        <DataScienceLab />
        <Education />
        <Certifications />
        <Contact />
      </main>

      {/* Floating WhatsApp Contact Button */}
      <WhatsAppButton />

      {/* Footer */}
      <Footer />
    </div>
  );
}

