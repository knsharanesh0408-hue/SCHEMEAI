import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, FileText, Languages, ShieldAlert, Sparkles, Copy, Save } from 'lucide-react';

const GrievanceAssistant = () => {
  const [formData, setFormData] = useState({
    name: '',
    issue: '',
    target_authority: '',
    language: 'English',
  });
  const [loading, setLoading] = useState(false);
  const [letter, setLetter] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLetter(null);
    try {
      // Mock for animation
      setTimeout(() => {
          setLetter("To,\nThe District Collector,\n\nSubject: Non-receipt of PM-Kisan Installment\n\nRespected Sir/Madam,\n\nI am writing to formally lodge a grievance regarding the non-receipt of my PM-Kisan Samman Nidhi installment for the last 3 months. My Aadhaar and bank account are properly linked, and previous installments were received without issue.\n\nI request you to kindly look into this matter and expedite the release of the pending funds as I am severely impacted by this delay.\n\nThank you,\n" + formData.name + "\nDate: 11-05-2026");
          setLoading(false);
      }, 2000);
      // const response = await axios.post('/api/grievance/generate', formData);
      // setLetter(response.data.letter);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
      navigator.clipboard.writeText(letter);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 py-8">
      <div className="text-center space-y-4 relative z-10">
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md mb-2 shadow-glow-violet"
        >
            <ShieldAlert className="w-8 h-8 text-violet-400" />
        </motion.div>
        <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-extrabold tracking-tight"
        >
            Grievance <span className="text-gradient">Assistant</span>
        </motion.h1>
        <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 max-w-xl mx-auto text-lg"
        >
            AI-powered formal complaint generation. Describe your issue, and we'll draft a highly effective letter for the authorities.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        <motion.div 
          className="lg:col-span-5 h-full"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="glass-card p-8 rounded-3xl h-full relative overflow-hidden">
             <div className="absolute -top-20 -right-20 w-40 h-40 bg-brand-500/10 rounded-full blur-3xl" />
             
            <h3 className="text-xl font-display font-bold mb-6 flex items-center gap-2">
                <FileText className="w-5 h-5 text-brand-400" />
                Provide Details
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="relative input-container">
                <input 
                  type="text" required placeholder=" "
                  className="input-modern"
                  value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
                <label className="floating-label">Your Full Name</label>
              </div>
              
              <div className="relative input-container">
                <input 
                  type="text" required placeholder=" "
                  className="input-modern"
                  value={formData.target_authority} onChange={(e) => setFormData({...formData, target_authority: e.target.value})}
                />
                <label className="floating-label">Target Authority (e.g. District Collector)</label>
              </div>
              
              <div className="relative input-container group">
                <Languages className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" />
                <select 
                  className="input-modern pl-12 appearance-none cursor-pointer"
                  value={formData.language} onChange={(e) => setFormData({...formData, language: e.target.value})}
                >
                  <option value="English" className="bg-navy-900">English</option>
                  <option value="Hindi" className="bg-navy-900">Hindi</option>
                  <option value="Tamil" className="bg-navy-900">Tamil</option>
                  <option value="Telugu" className="bg-navy-900">Telugu</option>
                </select>
                <label className="floating-label ml-8">Output Language</label>
              </div>
              
              <div className="relative input-container">
                <textarea 
                  required rows={5} placeholder=" "
                  className="input-modern resize-none"
                  value={formData.issue} onChange={(e) => setFormData({...formData, issue: e.target.value})}
                />
                <label className="floating-label">Describe Your Issue in plain words...</label>
              </div>
              
              <button 
                disabled={loading || !formData.issue}
                className="btn-primary w-full py-4 text-lg mt-4 flex items-center justify-center gap-2 group disabled:opacity-50"
              >
                {loading ? (
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Drafting Letter...</span>
                    </div>
                ) : (
                    <>Generate Formal Draft <Sparkles className="w-5 h-5 group-hover:scale-110 transition-transform" /></>
                )}
              </button>
            </form>
          </div>
        </motion.div>

        <motion.div 
          className="lg:col-span-7 h-full"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="glass-card p-1 rounded-3xl h-full min-h-[500px] flex flex-col bg-gradient-to-b from-white/10 to-transparent">
            <div className="bg-navy-950/80 backdrop-blur-xl w-full h-full rounded-[23px] p-6 sm:p-8 flex flex-col relative overflow-hidden">
                {/* Decorative watermark */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[150px] font-display font-bold text-white/[0.02] pointer-events-none select-none">
                    DRAFT
                </div>

                <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4 relative z-10">
                    <h3 className="font-display font-bold text-lg flex items-center gap-2 text-white">
                        <FileText className="w-5 h-5 text-teal-400" />
                        Generated Document
                    </h3>
                    {letter && (
                        <div className="flex gap-2">
                            <span className="px-3 py-1 text-xs font-bold bg-white/5 border border-white/10 rounded-lg text-slate-300">
                                {formData.language}
                            </span>
                        </div>
                    )}
                </div>
                
                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar relative z-10">
                    <AnimatePresence mode="wait">
                        {!letter && !loading ? (
                            <motion.div 
                                key="empty"
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                className="h-full flex flex-col items-center justify-center text-slate-500 italic space-y-4"
                            >
                                <div className="w-20 h-20 border border-dashed border-white/10 rounded-full flex items-center justify-center">
                                    <FileText className="w-8 h-8 text-white/20" />
                                </div>
                                <p>Your AI-drafted letter will appear here...</p>
                            </motion.div>
                        ) : loading ? (
                            <motion.div 
                                key="loading"
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                className="space-y-4"
                            >
                                <div className="h-4 bg-white/5 rounded w-1/4 mb-8 animate-pulse" />
                                <div className="h-4 bg-white/5 rounded w-3/4 mb-2 animate-pulse" />
                                <div className="h-4 bg-white/5 rounded w-5/6 mb-2 animate-pulse" />
                                <div className="h-4 bg-white/5 rounded w-full mb-6 animate-pulse" />
                                <div className="h-4 bg-white/5 rounded w-2/3 mb-2 animate-pulse" />
                                <div className="h-4 bg-white/5 rounded w-4/5 mb-8 animate-pulse" />
                                <div className="h-4 bg-white/5 rounded w-1/4 mb-2 animate-pulse" />
                            </motion.div>
                        ) : (
                            <motion.div 
                                key="content"
                                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                className="text-slate-300 text-[15px] whitespace-pre-wrap leading-relaxed font-sans"
                            >
                                {letter}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {letter && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-3 sm:gap-4 relative z-10"
                    >
                        <button 
                            onClick={copyToClipboard}
                            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all border ${copied ? 'bg-teal-500/20 text-teal-400 border-teal-500/30' : 'bg-white/5 hover:bg-white/10 text-white border-white/10'}`}
                        >
                            {copied ? <><CheckCircle2 className="w-4 h-4" /> Copied!</> : <><Copy className="w-4 h-4" /> Copy to Clipboard</>}
                        </button>
                        <button className="flex-1 btn-primary flex items-center justify-center gap-2 py-3 text-sm">
                            <Save className="w-4 h-4" /> Save PDF Draft
                        </button>
                    </motion.div>
                )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default GrievanceAssistant;
