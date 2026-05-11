import React from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle, AlertCircle, FileText, Download } from 'lucide-react';

const StatusTracker = () => {
  const applications = [
    { 
        id: 1, 
        scheme: 'PM-Kisan Samman Nidhi', 
        status: 'Approved', 
        date: '2026-04-15', 
        amount: '₹6,000',
        color: 'text-teal-400', 
        bg: 'bg-teal-500/10',
        border: 'border-teal-500/20'
    },
    { 
        id: 2, 
        scheme: 'Post-Matric Scholarship', 
        status: 'Under Review', 
        date: '2026-05-01', 
        amount: '₹12,000',
        color: 'text-violet-400',
        bg: 'bg-violet-500/10',
        border: 'border-violet-500/20'
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12 py-8">
      <div className="text-center space-y-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md mb-2 shadow-glow-brand"
        >
            <Clock className="w-8 h-8 text-brand-400" />
        </motion.div>
        <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-extrabold tracking-tight"
        >
            Application <span className="text-gradient">Tracker</span>
        </motion.h1>
        <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 max-w-lg mx-auto text-lg"
        >
            Monitor the progress of your scheme applications in real-time with full transparency.
        </motion.p>
      </div>

      <div className="space-y-8">
        {applications.map((app, idx) => (
          <motion.div 
            key={app.id}
            className="glass-card p-8 rounded-3xl space-y-8 relative overflow-hidden group"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.15, type: 'spring', bounce: 0.3 }}
          >
            {/* Top gradient highlight based on status */}
            <div className={`absolute top-0 left-0 right-0 h-1 ${app.status === 'Approved' ? 'bg-gradient-to-r from-teal-500 to-emerald-400' : 'bg-gradient-to-r from-violet-500 to-brand-400'}`} />

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                  <h3 className="text-2xl font-display font-bold group-hover:text-brand-300 transition-colors">{app.scheme}</h3>
                  <p className="text-slate-400 text-sm mt-1 flex items-center gap-2">
                      <FileText className="w-4 h-4" /> Application ID: #APP-{2026000 + app.id}
                  </p>
              </div>
              <div className="flex flex-col items-end gap-2">
                  <span className={`px-4 py-1.5 rounded-xl border ${app.bg} ${app.color} ${app.border} text-sm font-bold flex items-center gap-2 shadow-sm`}>
                    {app.status === 'Approved' ? <CheckCircle className="w-4 h-4" /> : <Clock className="w-4 h-4 animate-spin-slow" />}
                    {app.status.toUpperCase()}
                  </span>
                  <span className="text-lg font-bold text-slate-200 bg-navy-950/50 px-3 py-1 rounded-lg border border-white/5">{app.amount}</span>
              </div>
            </div>

            <div className="bg-navy-950/50 p-6 rounded-2xl border border-white/5 relative">
              {/* Vertical Progress Line */}
              <div className={`absolute left-9 sm:left-11 top-10 bottom-10 w-0.5 ${app.status === 'Approved' ? 'bg-teal-500/50' : 'bg-brand-500/30'}`} />
              
              <div className="space-y-8 relative">
                {/* Step 1 */}
                <div className="flex items-start gap-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-full flex items-center justify-center z-10 shadow-glow-teal shrink-0">
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="pt-1 sm:pt-2">
                    <p className="font-bold text-lg text-white">Application Submitted</p>
                    <p className="text-sm text-slate-400 mt-0.5">Documents verified and submitted successfully.</p>
                    <p className="text-xs font-mono text-slate-500 mt-2 bg-navy-900 inline-block px-2 py-1 rounded border border-white/5">2026-04-01 • 10:30 AM</p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-start gap-6">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center z-10 shrink-0 shadow-lg ${app.status === 'Approved' ? 'bg-gradient-to-br from-teal-400 to-emerald-500 shadow-teal-500/30' : 'bg-gradient-to-br from-brand-500 to-violet-500 shadow-glow-brand'}`}>
                    {app.status === 'Approved' ? <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" /> : <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-white animate-pulse" />}
                  </div>
                  <div className="pt-1 sm:pt-2">
                    <p className="font-bold text-lg text-white">Department Review</p>
                    <p className="text-sm text-slate-400 mt-0.5">Application is being evaluated by the respective nodal officer.</p>
                    <p className="text-xs font-mono text-slate-500 mt-2 bg-navy-900 inline-block px-2 py-1 rounded border border-white/5">2026-04-10 • 14:15 PM</p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-start gap-6">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center z-10 shrink-0 ${app.status === 'Approved' ? 'bg-gradient-to-br from-teal-400 to-emerald-500 shadow-glow-teal' : 'bg-navy-800 border-2 border-white/10'}`}>
                    {app.status === 'Approved' ? <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" /> : <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-slate-500" />}
                  </div>
                  <div className="pt-1 sm:pt-2">
                    <p className={`font-bold text-lg ${app.status === 'Approved' ? 'text-white' : 'text-slate-400'}`}>Final Approval & Disbursal</p>
                    <p className="text-sm text-slate-500 mt-0.5">
                        {app.status === 'Approved' ? 'Benefits successfully transferred to linked bank account.' : 'Pending clearance from finance department.'}
                    </p>
                    {app.status === 'Approved' && (
                        <p className="text-xs font-mono text-teal-400 mt-2 bg-teal-500/10 inline-block px-2 py-1 rounded border border-teal-500/20">{app.date} • Disbursed</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {app.status === 'Approved' && (
                <div className="flex justify-end mt-4">
                    <button className="flex items-center gap-2 text-sm font-semibold bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-lg transition-colors text-white">
                        <Download className="w-4 h-4" /> Download Certificate
                    </button>
                </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StatusTracker;
