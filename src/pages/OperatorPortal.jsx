import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, FileText, Activity, Clock, Server, Search, CheckCircle2, MoreVertical, Wifi, WifiOff } from 'lucide-react';

const OperatorPortal = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [queue, setQueue] = useState([
    { id: 1, name: 'Rajesh Kumar', token: 'T-001', status: 'Processing', service: 'Aadhaar Update', time: '10:15 AM' },
    { id: 2, name: 'Priya Sharma', token: 'T-002', status: 'Waiting', service: 'Income Certificate', time: '10:30 AM' },
    { id: 3, name: 'Amit Singh', token: 'T-003', status: 'Waiting', service: 'Farmer Scheme App', time: '10:45 AM' },
    { id: 4, name: 'Lakshmi Devi', token: 'T-004', status: 'Waiting', service: 'Ration Card Link', time: '11:00 AM' },
  ]);

  return (
    <div className="space-y-10 py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 relative z-10">
        <div className="space-y-2">
          <div className="flex items-center gap-3 mb-2">
              <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold border ${isOnline ? 'bg-teal-500/10 text-teal-400 border-teal-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                  {isOnline ? <><Wifi className="w-3.5 h-3.5" /> ONLINE SYNCHRONIZED</> : <><WifiOff className="w-3.5 h-3.5" /> OFFLINE MODE</>}
              </span>
              <span className="text-slate-400 text-xs font-mono">Terminal ID: ESEV-4921</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-extrabold tracking-tight">E-Sevai <span className="text-gradient">Operator</span> Portal</h1>
          <p className="text-slate-400">Streamlined queue management and bulk document processing.</p>
        </div>
        
        <div className="flex gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card px-5 py-4 rounded-2xl flex items-center gap-4 min-w-[160px]"
          >
            <div className="w-12 h-12 bg-brand-500/20 rounded-xl flex items-center justify-center shadow-glow-brand">
              <Users className="w-6 h-6 text-brand-400" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Queue Size</p>
              <p className="text-2xl font-display font-bold text-white">{queue.length}</p>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card px-5 py-4 rounded-2xl flex items-center gap-4 min-w-[160px]"
          >
            <div className="w-12 h-12 bg-teal-500/20 rounded-xl flex items-center justify-center shadow-glow-teal">
              <Activity className="w-6 h-6 text-teal-400" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Avg Wait</p>
              <p className="text-2xl font-display font-bold text-white">12m</p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Queue Management */}
        <motion.div 
            className="xl:col-span-2 space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-display font-bold flex items-center gap-2">
                <Clock className="w-5 h-5 text-brand-400" /> Live Queue
            </h3>
            <div className="relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                <input type="text" placeholder="Search tokens..." className="bg-navy-950 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-brand-500 transition-colors w-48" />
            </div>
          </div>

          <div className="glass-card rounded-3xl overflow-hidden border border-white/10">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-white/5 text-slate-300 text-xs uppercase tracking-wider font-semibold border-b border-white/10">
                    <th className="px-6 py-5">Token</th>
                    <th className="px-6 py-5">Applicant</th>
                    <th className="px-6 py-5">Requested Service</th>
                    <th className="px-6 py-5">Status</th>
                    <th className="px-6 py-5 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5 bg-navy-900/30">
                    <AnimatePresence>
                    {queue.map((item, idx) => (
                    <motion.tr 
                        key={item.id} 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="hover:bg-white/[0.02] transition-colors group"
                    >
                        <td className="px-6 py-5">
                            <span className="font-mono font-bold text-brand-400 bg-brand-500/10 px-2 py-1 rounded border border-brand-500/20">{item.token}</span>
                            <div className="text-[10px] text-slate-500 mt-1">{item.time}</div>
                        </td>
                        <td className="px-6 py-5">
                            <p className="font-bold text-slate-200">{item.name}</p>
                            <p className="text-xs text-slate-500">ID: XXXX-XXXX-{1000 + item.id}</p>
                        </td>
                        <td className="px-6 py-5">
                            <span className="text-sm text-slate-300">{item.service}</span>
                        </td>
                        <td className="px-6 py-5">
                            <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold flex items-center w-max gap-1.5 ${
                            item.status === 'Processing' ? 'bg-brand-500 text-white shadow-glow-brand' : 'bg-navy-800 text-slate-400 border border-white/5'
                            }`}>
                            {item.status === 'Processing' && <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
                            {item.status.toUpperCase()}
                            </span>
                        </td>
                        <td className="px-6 py-5 text-right">
                            <div className="flex justify-end gap-2">
                                <button className="p-2 bg-white/5 hover:bg-brand-500/20 text-slate-400 hover:text-brand-400 rounded-lg transition-colors border border-transparent hover:border-brand-500/30">
                                    <CheckCircle2 className="w-4 h-4" />
                                </button>
                                <button className="p-2 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white rounded-lg transition-colors border border-transparent hover:border-white/10">
                                    <MoreVertical className="w-4 h-4" />
                                </button>
                            </div>
                        </td>
                    </motion.tr>
                    ))}
                    </AnimatePresence>
                </tbody>
                </table>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions & Status */}
        <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="glass-card p-6 rounded-3xl space-y-5">
            <h3 className="text-lg font-display font-bold flex items-center gap-2">
              <Server className="w-5 h-5 text-violet-400" /> Operational Controls
            </h3>
            <div className="space-y-3">
              <button className="w-full bg-navy-800 hover:bg-navy-700 p-4 rounded-xl text-sm font-semibold transition-all border border-white/5 hover:border-white/10 text-left flex items-center justify-between group">
                <span className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                    Bulk Document Compression
                </span>
                <span className="bg-gradient-to-r from-brand-500 to-violet-500 px-2 py-0.5 rounded text-[10px] font-bold shadow-glow-brand">NEW</span>
              </button>
              
              <button className="w-full bg-navy-800 hover:bg-navy-700 p-4 rounded-xl text-sm font-semibold transition-all border border-white/5 hover:border-white/10 text-left flex items-center gap-3 group">
                <Users className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                Generate Walk-in Token
              </button>

              <button className="w-full bg-navy-800 hover:bg-navy-700 p-4 rounded-xl text-sm font-semibold transition-all border border-white/5 hover:border-white/10 text-left flex items-center gap-3 group">
                <Activity className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                Run Diagnostics
              </button>
            </div>
            
            <div className="pt-4 border-t border-white/10">
                <button 
                    onClick={() => setIsOnline(!isOnline)}
                    className={`w-full py-4 rounded-xl text-sm font-bold transition-all shadow-lg flex items-center justify-center gap-2 ${isOnline ? 'bg-navy-950 border border-red-500/30 text-red-400 hover:bg-red-500/10' : 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-glow-teal hover:scale-[1.02]'}`}
                >
                    {isOnline ? 'Go Offline (Sync Ready)' : 'Reconnect to Server'}
                </button>
            </div>
          </div>

          {/* Mini Stats Card */}
          <div className="bg-gradient-to-br from-brand-900/40 to-violet-900/40 border border-brand-500/20 p-6 rounded-3xl relative overflow-hidden group">
              <div className="absolute -right-6 -bottom-6 opacity-10 group-hover:scale-110 transition-transform duration-700">
                  <Activity className="w-32 h-32 text-brand-400" />
              </div>
              <h4 className="text-sm font-bold text-brand-300 mb-1">Today's Performance</h4>
              <p className="text-3xl font-display font-bold text-white">124 <span className="text-lg text-slate-400 font-medium">processed</span></p>
              <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-teal-400">
                  <span className="bg-teal-500/20 p-1 rounded"><Activity className="w-3 h-3" /></span>
                  +12% faster than average
              </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OperatorPortal;
