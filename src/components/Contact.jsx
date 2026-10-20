import React, { useState } from 'react';
import { Mail, Phone, Download, Copy, Check, Send, Sparkles } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import confetti from 'canvas-confetti';
import { personalInfo } from '../data/portfolioData';
import ContactOrb3D from './ContactOrb3D';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setCopied(true);
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#a855f7', '#c084fc', '#ffffff']
      });
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Graceful fallback
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus('Please complete all required fields.');
      return;
    }

    setIsSubmitting(true);
    setFormStatus('Opening your default email client with your message pre-filled...');

    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.75 },
      colors: ['#a855f7', '#6366f1', '#e2e8f0']
    });

    const mailtoSubject = encodeURIComponent(
      formData.subject || `Portfolio Inquiry from ${formData.name}`
    );
    const mailtoBody = encodeURIComponent(
      `Hello Jagan,\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}\n`
    );

    // Open real mailto client
    setTimeout(() => {
      window.location.href = `mailto:${personalInfo.email}?subject=${mailtoSubject}&body=${mailtoBody}`;
      setIsSubmitting(false);
      setFormStatus('Direct mail composition initiated via mailto:rathjaga83@gmail.com.');
    }, 600);
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[46rem] h-[30rem] bg-purple-950/30 rounded-full blur-[170px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full silver-badge mb-4">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-[10px] font-mono tracking-widest uppercase text-purple-200">
              LET'S BUILD SOMETHING EXTRAORDINARY
            </span>
          </div>
          
          <h2 className="font-heading font-black text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-[1.05]">
            <span className="block silver-gradient-text">HAVE AN IDEA?</span>
            <span className="block silver-violet-text">LET'S BUILD IT.</span>
          </h2>

          <p className="mt-6 text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
            I'm interested in meaningful engineering challenges, collaborative projects, and opportunities to build useful technology across the MERN Stack and data-driven systems.
          </p>
        </div>

        {/* 2-Column Contact Chamber */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Contacts & 3D Globe */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* 3D Contact Orb Card */}
            <div className="rounded-2xl glass-panel p-6 border border-white/10 flex flex-col items-center justify-center relative overflow-hidden">
              <ContactOrb3D />
              <div className="text-center mt-2">
                <p className="text-xs font-mono uppercase tracking-widest text-purple-300">
                  DIGITAL UNIVERSE · CORE CONNECTION
                </p>
                <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                  Based in India · Open to Remote & Global Engineering
                </p>
              </div>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-3">
              {/* Email with 1-Click Copy */}
              <div className="rounded-xl glass-card border border-white/10 p-4 flex items-center justify-between gap-4">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center gap-3 group focus:outline-none"
                >
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center group-hover:border-purple-400/50 transition-colors">
                    <Mail className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">Email Address</span>
                    <span className="text-xs sm:text-sm font-mono text-slate-100 group-hover:text-purple-300 transition-colors">
                      {personalInfo.email}
                    </span>
                  </div>
                </a>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors focus:outline-none"
                  title="Copy email to clipboard"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Phone */}
              <div className="rounded-xl glass-card border border-white/10 p-4 flex items-center justify-between">
                <a
                  href={`tel:${personalInfo.phone.replace(/\s+/g, '')}`}
                  className="flex items-center gap-3 group focus:outline-none"
                >
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center group-hover:border-purple-400/50 transition-colors">
                    <Phone className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">Phone / Mobile</span>
                    <span className="text-xs sm:text-sm font-mono text-slate-100 group-hover:text-purple-300 transition-colors">
                      {personalInfo.phone}
                    </span>
                  </div>
                </a>
              </div>

              {/* Social and Resume Row */}
              <div className="grid grid-cols-3 gap-2.5 pt-1">
                <a
                  href={personalInfo.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl glass-card border border-white/10 hover:border-purple-400/40 flex flex-col items-center justify-center text-center transition-all group"
                >
                  <LinkedinIcon className="w-5 h-5 text-purple-300 group-hover:scale-110 transition-transform mb-1" />
                  <span className="text-[11px] font-medium text-slate-300">LinkedIn</span>
                </a>

                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl glass-card border border-white/10 hover:border-purple-400/40 flex flex-col items-center justify-center text-center transition-all group"
                >
                  <GithubIcon className="w-5 h-5 text-purple-300 group-hover:scale-110 transition-transform mb-1" />
                  <span className="text-[11px] font-medium text-slate-300">GitHub</span>
                </a>

                <a
                  href={personalInfo.resumePath}
                  download="Jagan-Kumar-Rath-Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl glass-card border border-white/10 hover:border-purple-400/40 flex flex-col items-center justify-center text-center transition-all group"
                >
                  <Download className="w-5 h-5 text-purple-300 group-hover:scale-110 transition-transform mb-1" />
                  <span className="text-[11px] font-medium text-slate-300">Resume</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Direct Message Form */}
          <div className="lg:col-span-7 rounded-2xl glass-panel p-6 sm:p-8 border border-white/10 shadow-xl">
            <div className="mb-6 pb-4 border-b border-white/[0.08]">
              <h3 className="font-heading font-bold text-xl text-white">
                Send a Direct Message
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Fill out the form below. Since there is no remote server database for form handling, this opens your email client directly pre-filled with your message.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                    Your Name *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Alex Sharma"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 focus:border-purple-400/60 focus:outline-none focus:ring-1 focus:ring-purple-400 text-sm text-slate-100 placeholder:text-slate-500 font-sans"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                    Your Email *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="e.g. alex@company.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 focus:border-purple-400/60 focus:outline-none focus:ring-1 focus:ring-purple-400 text-sm text-slate-100 placeholder:text-slate-500 font-sans"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="e.g. Collaboration on MERN Project / Engineering Opportunity"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 focus:border-purple-400/60 focus:outline-none focus:ring-1 focus:ring-purple-400 text-sm text-slate-100 placeholder:text-slate-500 font-sans"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                  Your Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Share details about your project, idea, or questions..."
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 focus:border-purple-400/60 focus:outline-none focus:ring-1 focus:ring-purple-400 text-sm text-slate-100 placeholder:text-slate-500 font-sans resize-none"
                />
              </div>

              {formStatus && (
                <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/30 text-xs font-mono text-purple-200">
                  {formStatus}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-heading font-semibold text-sm text-white bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 border border-purple-400/40 shadow-xl shadow-purple-950/50 hover:scale-[1.01] transition-all focus:outline-none focus:ring-2 focus:ring-purple-400 disabled:opacity-50"
              >
                <span>{isSubmitting ? 'Preparing Transmission...' : 'Transmit Message'}</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
