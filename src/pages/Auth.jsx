import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Lock, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

const Auth = () => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setStep(2);
      setLoading(false);
    }, 1200);
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      window.location.href = '/';
    }, 1500);
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="w-full max-w-md relative">
        {/* Background glow for auth card */}
        <div className="absolute -inset-1 bg-gradient-to-r from-brand-500 via-violet-500 to-teal-400 rounded-3xl blur opacity-20 animate-pulse-glow" />
        
        <motion.div 
          className="glass-card p-8 md:p-10 rounded-3xl relative overflow-hidden"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* Top right decorative element */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-500/20 rounded-full blur-2xl" />

          <div className="text-center space-y-3 mb-10 relative z-10">
            <div className="mx-auto w-16 h-16 bg-navy-950 rounded-2xl flex items-center justify-center border border-white/10 mb-6 shadow-glow-brand">
               {step === 1 ? <Phone className="w-8 h-8 text-brand-400" /> : <ShieldCheck className="w-8 h-8 text-teal-400" />}
            </div>
            <h2 className="text-3xl font-display font-bold">
                {step === 1 ? 'Welcome Back' : 'Verify Identity'}
            </h2>
            <p className="text-slate-400 text-sm px-4">
              {step === 1 ? 'Enter your mobile number to securely access your account' : `We've sent a 6-digit secure code to ${phone}`}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.form 
                key="step1"
                onSubmit={handleSendOtp} 
                className="space-y-6 relative z-10"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <div className="relative input-container group">
                  <Phone className="absolute left-4 top-3.5 w-5 h-5 text-slate-500 group-focus-within:text-brand-400 transition-colors" />
                  <input 
                    type="tel" required placeholder=" "
                    className="input-modern pl-12 font-mono tracking-wider text-lg"
                    value={phone} onChange={(e) => setPhone(e.target.value)}
                  />
                  <label className="floating-label ml-8">Mobile Number</label>
                </div>
                
                <button 
                  disabled={loading || phone.length < 10}
                  className="btn-primary w-full py-4 text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {loading ? (
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                      <>Continue <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></>
                  )}
                </button>
                
                <p className="text-center text-xs text-slate-500 mt-6">
                    By continuing, you agree to SchemeAI's <a href="#" className="text-brand-400 hover:underline">Terms of Service</a> & <a href="#" className="text-brand-400 hover:underline">Privacy Policy</a>.
                </p>
              </motion.form>
            ) : (
              <motion.form 
                key="step2"
                onSubmit={handleVerifyOtp} 
                className="space-y-6 relative z-10"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <div className="relative input-container group">
                  <Lock className="absolute left-4 top-3.5 w-5 h-5 text-slate-500 group-focus-within:text-teal-400 transition-colors" />
                  <input 
                    type="text" required maxLength={6} placeholder=" "
                    className="input-modern pl-12 font-mono tracking-[1em] text-center text-xl focus:ring-teal-500"
                    value={otp} onChange={(e) => setOtp(e.target.value)}
                  />
                  <label className="floating-label ml-8">6-Digit Secure OTP</label>
                </div>
                
                <button 
                  disabled={loading || otp.length !== 6}
                  className="relative overflow-hidden w-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-white font-bold py-4 rounded-xl transition-all shadow-glow-teal flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-glow-teal hover:-translate-y-1"
                >
                  {loading ? (
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                      <>Verify & Login <CheckCircle2 className="w-5 h-5" /></>
                  )}
                </button>
                
                <div className="flex justify-between items-center text-sm px-2">
                    <button 
                    type="button" onClick={() => setStep(1)}
                    className="text-slate-400 hover:text-white transition-colors"
                    >
                    Wrong number?
                    </button>
                    <button type="button" className="text-brand-400 font-medium hover:text-brand-300">
                        Resend Code
                    </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;
