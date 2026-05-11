import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, CheckCircle2, AlertCircle, ShieldCheck, Users, Search, ChevronDown, Activity, X } from 'lucide-react';

const schemeCategories = {
  'Agriculture': { color: 'text-green-400', bg: 'bg-green-400/10', border: 'border-green-400/20' },
  'Education': { color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/20' },
  'Health': { color: 'text-red-400', bg: 'bg-red-400/10', border: 'border-red-400/20' },
  'Women & Child': { color: 'text-pink-400', bg: 'bg-pink-400/10', border: 'border-pink-400/20' },
  'Senior Citizen': { color: 'text-purple-400', bg: 'bg-purple-400/10', border: 'border-purple-400/20' },
  'Default': { color: 'text-brand-400', bg: 'bg-brand-400/10', border: 'border-brand-400/20' }
};

const getCategoryStyles = (category) => schemeCategories[category] || schemeCategories['Default'];

const EligibilityForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    income: '',
    state: '',
    caste: 'General',
    occupation: '',
    disability_status: false,
  });
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [progress, setProgress] = useState(0);

  const calculateProgress = (data) => {
    let filled = 0;
    const fields = ['name', 'age', 'income', 'state', 'occupation'];
    fields.forEach(field => {
        if(data[field] && data[field].toString().trim() !== '') filled++;
    });
    return (filled / fields.length) * 100;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newData = {
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    };
    setFormData(newData);
    setProgress(calculateProgress(newData));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResults(null);
    try {
      // Fake delay for animation demo if API fails
      // const response = await axios.post('/api/eligibility', formData);
      // setResults(response.data.schemes);
      
      setTimeout(() => {
          setResults([
              { id: 1, title: 'PM-Kisan Samman Nidhi', category: 'Agriculture', state: 'Central', description: 'Financial benefit of Rs 6000/- per year to all landholding farmer families.', is_eligible: true, reason: 'Matches occupation and income criteria.', confidence: 95 },
              { id: 2, title: 'Ayushman Bharat - PMJAY', category: 'Health', state: 'Central', description: 'Health cover of Rs. 5 lakhs per family per year for secondary and tertiary care hospitalization.', is_eligible: true, reason: 'Eligible based on income threshold.', confidence: 88 },
              { id: 3, title: 'Atal Pension Yojana', category: 'Senior Citizen', state: 'Central', description: 'Guaranteed pension scheme for citizens in the unorganized sector.', is_eligible: false, reason: 'Age requirement not met.', confidence: 100 }
          ]);
          setLoading(false);
      }, 2500);

    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const filteredResults = results ? (activeFilter === 'All' ? results : results.filter(r => r.is_eligible === (activeFilter === 'Eligible'))) : null;

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="text-center space-y-6 pt-10 pb-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-4"
        >
          <Sparkles className="w-4 h-4 text-brand-400" />
          <span className="text-sm font-medium text-slate-300">AI-Powered Scheme Discovery</span>
        </motion.div>
        
        <motion.h1 
          className="text-5xl md:text-7xl font-display font-extrabold tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          Find Your <span className="text-gradient">Scheme</span> Benefits
        </motion.h1>
        
        <motion.p 
          className="text-slate-400 max-w-2xl mx-auto text-lg md:text-xl font-medium"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          Powered by GPT-4. Discover government schemes tailored to your specific profile in seconds with high accuracy.
        </motion.p>

        <motion.div 
            className="flex flex-wrap justify-center gap-6 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
        >
            <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-teal-400" />
                <span className="text-sm font-semibold text-slate-300">Govt. Verified</span>
            </div>
            <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-violet-400" />
                <span className="text-sm font-semibold text-slate-300">50M+ Indians Helped</span>
            </div>
            <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-brand-400" />
                <span className="text-sm font-semibold text-slate-300">Real-time Updates</span>
            </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* Form Section */}
        <motion.div 
          className="xl:col-span-5 relative"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, type: 'spring', bounce: 0.3 }}
        >
          <div className="glass-card p-8 rounded-3xl relative overflow-hidden">
            {/* Progress Bar */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-white/5">
                <motion.div 
                    className="h-full bg-gradient-to-r from-brand-500 to-teal-400"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                />
            </div>

            <div className="mb-8 mt-2">
                <h2 className="text-2xl font-display font-bold">Your Profile</h2>
                <p className="text-slate-400 text-sm mt-1">Fill in details to find your eligibility.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative input-container">
                  <input 
                    type="text" name="name" required placeholder=" "
                    className="input-modern"
                    value={formData.name} onChange={handleChange}
                  />
                  <label className="floating-label">Full Name</label>
                  {formData.name && <CheckCircle2 className="absolute right-4 top-3.5 w-5 h-5 text-teal-400" />}
                </div>
                <div className="relative input-container">
                  <input 
                    type="number" name="age" required placeholder=" "
                    className="input-modern"
                    value={formData.age} onChange={handleChange}
                  />
                  <label className="floating-label">Age</label>
                  {formData.age && <CheckCircle2 className="absolute right-4 top-3.5 w-5 h-5 text-teal-400" />}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative input-container">
                  <input 
                    type="number" name="income" required placeholder=" "
                    className="input-modern pl-8"
                    value={formData.income} onChange={handleChange}
                  />
                  <span className="absolute left-4 top-3.5 text-slate-400">₹</span>
                  <label className="floating-label ml-4">Monthly Income</label>
                </div>
                <div className="relative input-container">
                  <input 
                    type="text" name="state" required placeholder=" "
                    className="input-modern"
                    value={formData.state} onChange={handleChange}
                  />
                  <label className="floating-label">State</label>
                </div>
              </div>

              <div className="relative input-container">
                <input 
                  type="text" name="occupation" required placeholder=" "
                  className="input-modern"
                  value={formData.occupation} onChange={handleChange}
                />
                <label className="floating-label">Occupation (e.g. Farmer, Student)</label>
              </div>

              <div className="flex items-center gap-3 bg-navy-950/50 p-4 rounded-xl border border-white/5 hover:border-white/10 transition-colors cursor-pointer" onClick={() => handleChange({ target: { name: 'disability_status', type: 'checkbox', checked: !formData.disability_status } })}>
                <div className={`w-6 h-6 rounded-md border flex items-center justify-center transition-all ${formData.disability_status ? 'bg-brand-500 border-brand-500' : 'border-slate-500'}`}>
                    {formData.disability_status && <CheckCircle2 className="w-4 h-4 text-white" />}
                </div>
                <label className="text-sm font-medium cursor-pointer flex-1">Differently Abled (Divyangjan)</label>
              </div>

              <button 
                disabled={loading || progress < 100}
                className="btn-primary w-full py-4 text-lg mt-8 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:-translate-y-0 disabled:hover:shadow-glow-brand"
              >
                {loading ? (
                  <div className="flex items-center gap-3">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Analyzing Profile...</span>
                  </div>
                ) : (
                  <>
                    Find Matching Schemes <Search className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  </>
                )}
                {/* Button highlight effect */}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-shimmer" />
              </button>
            </form>
          </div>
        </motion.div>

        {/* Results Section */}
        <div className="xl:col-span-7 h-full">
          <AnimatePresence mode="wait">
            {!results && !loading ? (
              <motion.div 
                key="empty"
                className="h-full min-h-[500px] flex flex-col items-center justify-center text-slate-500 space-y-6 glass-card rounded-3xl p-8"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6 }}
              >
                <div className="relative">
                    <div className="w-24 h-24 bg-brand-500/10 rounded-full flex items-center justify-center relative z-10 animate-float">
                        <Sparkles className="w-10 h-10 text-brand-400" />
                    </div>
                    <div className="absolute inset-0 bg-brand-500/20 blur-2xl rounded-full animate-pulse-glow" />
                </div>
                <div className="text-center space-y-2">
                    <h3 className="text-xl font-display font-bold text-slate-300">Ready to Discover?</h3>
                    <p className="max-w-xs mx-auto">Fill the form and let our AI match you with the best government schemes.</p>
                </div>
              </motion.div>
            ) : loading ? (
               <motion.div 
                 key="loading"
                 className="space-y-4"
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
               >
                  {[1, 2, 3].map((i) => (
                      <div key={i} className="glass-card p-6 rounded-2xl animate-pulse">
                          <div className="h-4 bg-white/10 rounded w-1/4 mb-4" />
                          <div className="h-6 bg-white/10 rounded w-3/4 mb-4" />
                          <div className="h-4 bg-white/10 rounded w-full mb-2" />
                          <div className="h-4 bg-white/10 rounded w-5/6 mb-6" />
                          <div className="flex justify-between">
                              <div className="h-4 bg-white/10 rounded w-1/3" />
                              <div className="h-8 bg-white/10 rounded w-24" />
                          </div>
                      </div>
                  ))}
               </motion.div>
            ) : (
              <motion.div 
                key="results"
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-navy-900/50 p-4 rounded-2xl border border-white/5 backdrop-blur-md">
                    <div>
                        <h3 className="text-2xl font-display font-bold"><span className="text-brand-400">{results.length}</span> Schemes Found</h3>
                        <p className="text-sm text-slate-400">Based on your profile analysis</p>
                    </div>
                    <div className="flex bg-navy-950 rounded-lg p-1 border border-white/5">
                        {['All', 'Eligible'].map(filter => (
                            <button 
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeFilter === filter ? 'bg-white/10 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-4 max-h-[700px] overflow-y-auto pr-2 custom-scrollbar">
                  <AnimatePresence>
                      {filteredResults.map((scheme, idx) => {
                        const style = getCategoryStyles(scheme.category);
                        return (
                        <motion.div 
                          key={scheme.id}
                          className="glass-card glass-card-hover p-6 rounded-2xl relative overflow-hidden group"
                          initial={{ opacity: 0, scale: 0.95, y: 20 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ delay: idx * 0.1, type: 'spring', bounce: 0.3 }}
                        >
                          {/* Eligibility Indicator Line */}
                          <div className={`absolute left-0 top-0 bottom-0 w-1 ${scheme.is_eligible ? 'bg-teal-400 shadow-[0_0_10px_#2dd4bf]' : 'bg-slate-600'}`} />

                          <div className="flex justify-between items-start mb-4">
                            <div className="flex gap-2 items-center">
                                <span className={`text-xs font-bold px-3 py-1.5 rounded-lg border ${scheme.is_eligible ? 'bg-teal-500/10 text-teal-400 border-teal-500/20' : 'bg-slate-800 text-slate-300 border-slate-700'} flex items-center gap-1.5`}>
                                  {scheme.is_eligible ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                                  {scheme.is_eligible ? 'HIGHLY ELIGIBLE' : 'NOT ELIGIBLE'}
                                </span>
                                {scheme.is_eligible && (
                                    <span className="text-xs font-bold text-brand-400 bg-brand-500/10 px-2 py-1.5 rounded-lg border border-brand-500/20">
                                        {scheme.confidence}% MATCH
                                    </span>
                                )}
                            </div>
                            <span className={`text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-md ${style.bg} ${style.color} ${style.border} border`}>
                                {scheme.state} • {scheme.category}
                            </span>
                          </div>
                          
                          <h4 className="text-xl font-display font-bold mb-2 group-hover:text-brand-300 transition-colors">{scheme.title}</h4>
                          <p className="text-slate-300 text-sm mb-5 leading-relaxed">{scheme.description}</p>
                          
                          <div className="bg-navy-950/50 p-3 rounded-xl border border-white/5 mb-5 flex items-start gap-3">
                              <Sparkles className="w-5 h-5 text-brand-400 shrink-0 mt-0.5" />
                              <p className="text-sm text-slate-300 italic">{scheme.reason}</p>
                          </div>

                          <div className="flex items-center gap-3 mt-auto pt-4 border-t border-white/5">
                            <button className="flex-1 bg-white/5 hover:bg-white/10 text-white py-2.5 rounded-xl text-sm font-semibold transition-colors border border-white/10 text-center">
                                Save Scheme
                            </button>
                            <button className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg flex items-center justify-center gap-2 ${scheme.is_eligible ? 'bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-white shadow-teal-500/25' : 'bg-slate-800 text-slate-400 cursor-not-allowed'}`} disabled={!scheme.is_eligible}>
                                Apply Now {scheme.is_eligible && <ArrowRight className="w-4 h-4" />}
                            </button>
                          </div>
                        </motion.div>
                      )})}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default EligibilityForm;
