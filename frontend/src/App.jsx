import React, { useState } from 'react';
import { 
  Shield, 
  Search, 
  Upload, 
  Activity, 
  Zap, 
  CheckCircle, 
  AlertTriangle,
  Globe,
  Lock,
  Menu,
  X,
  ChevronRight,
  Fingerprint
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// --- Components ---

const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
      active 
        ? 'bg-sentinel-primary/10 text-sentinel-primary border border-sentinel-primary/20' 
        : 'text-gray-400 hover:bg-white/5 hover:text-white'
    }`}
  >
    <Icon size={20} />
    <span className="font-medium">{label}</span>
    {active && <motion.div layoutId="active-pill" className="ml-auto w-1 h-4 bg-sentinel-primary rounded-full" />}
  </button>
);

const StatCard = ({ label, value, trend, icon: Icon }) => (
  <div className="glass p-6 rounded-2xl flex flex-col gap-2">
    <div className="flex justify-between items-start">
      <div className="p-2 bg-white/5 rounded-lg text-sentinel-secondary">
        <Icon size={20} />
      </div>
      <span className={`text-xs font-bold px-2 py-1 rounded-full ${trend > 0 ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
        {trend > 0 ? '+' : ''}{trend}%
      </span>
    </div>
    <span className="text-gray-400 text-sm font-medium">{label}</span>
    <span className="text-2xl font-bold">{value}</span>
  </div>
);

// --- Sections ---

const propagationData = [
  { time: '00:00', views: 4000, unauthorized: 24 },
  { time: '01:00', views: 5000, unauthorized: 139 },
  { time: '02:00', views: 8000, unauthorized: 980 },
  { time: '03:00', views: 27800, unauthorized: 3908 },
  { time: '04:00', views: 18900, unauthorized: 4800 },
  { time: '05:00', views: 23900, unauthorized: 3800 },
  { time: '06:00', views: 34900, unauthorized: 4300 },
];

const Dashboard = ({ onNewProtection }) => (
  <div className="p-8 flex flex-col gap-8">
    <header className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold">Sentinel Command Center</h1>
        <p className="text-gray-400 mt-1">Real-time global monitoring & protection active.</p>
      </div>
      <button 
        onClick={onNewProtection}
        className="sentinel-gradient px-6 py-2.5 rounded-xl text-black font-bold flex items-center gap-2 hover:scale-105 transition-transform"
      >
        <Upload size={18} />
        New Protection
      </button>
    </header>

    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <StatCard label="Protected Assets" value="1,284" trend={12} icon={Shield} />
      <StatCard label="Scans Performed" value="452.9K" trend={24} icon={Search} />
      <StatCard label="Unauthorized Detections" value="42" trend={-8} icon={AlertTriangle} />
      <StatCard label="Verification Speed" value="1.2s" trend={5} icon={Zap} />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 glass p-6 rounded-3xl min-h-[400px] flex flex-col">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Globe className="text-sentinel-secondary" size={20} />
          Global Propagation Map
        </h3>
        <div className="w-full flex-1 min-h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={propagationData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00ff88" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#00ff88" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorUnauth" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ff4d4f" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#ff4d4f" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="time" stroke="#4b5563" />
              <YAxis stroke="#4b5563" />
              <Tooltip contentStyle={{ backgroundColor: '#161b22', borderColor: '#30363d', borderRadius: '12px' }} />
              <Area type="monotone" dataKey="views" stroke="#00ff88" fillOpacity={1} fill="url(#colorViews)" />
              <Area type="monotone" dataKey="unauthorized" stroke="#ff4d4f" fillOpacity={1} fill="url(#colorUnauth)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="glass p-6 rounded-3xl">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Activity className="text-sentinel-primary" size={20} />
          Recent Alerts
        </h3>
        <div className="flex flex-col gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="p-4 bg-white/5 rounded-xl border border-white/5 flex gap-4 items-center hover:bg-white/10 transition-colors cursor-pointer">
              <div className="w-12 h-12 rounded-lg bg-gray-800 flex-shrink-0 flex items-center justify-center">
                <AlertTriangle size={20} className={i === 1 ? "text-red-500" : "text-yellow-500"} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold">Unauthorized Highlight</p>
                <p className="text-xs text-gray-400">TikTok • {i * 2}m ago • {90 - i}% Match</p>
              </div>
              <ChevronRight size={16} className="text-gray-600" />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const UploadView = () => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('idle'); // idle, uploading, hashing, blockchain, complete
  const [result, setResult] = useState(null);
  
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleProtect = async () => {
    if (!file) return;
    setStatus('uploading');
    
    await new Promise(r => setTimeout(r, 1000));
    setStatus('hashing');
    
    await new Promise(r => setTimeout(r, 1500));
    setStatus('blockchain');
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch('/protect', {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      setResult(data.asset);
      setStatus('complete');
    } catch (error) {
      console.error("Failed to protect asset", error);
      setStatus('idle');
    }
  };

  if (status === 'complete' && result) {
    return (
      <div className="p-8 h-full flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass p-10 rounded-[40px] max-w-2xl w-full flex flex-col items-center text-center border-sentinel-primary/30"
        >
          <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 mb-6 border border-green-500/30">
            <CheckCircle size={48} />
          </div>
          <h2 className="text-3xl font-bold mb-2">Asset Protected & Verified</h2>
          <p className="text-gray-400 mb-8">Your media is now secured with a forensic watermark and registered on Polygon.</p>
          
          <div className="w-full bg-white/5 rounded-2xl p-6 text-left space-y-4 mb-8">
            <div>
              <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Perceptual Hash (pHash)</p>
              <p className="font-mono text-sm break-all text-sentinel-secondary bg-black/30 p-3 rounded-lg border border-white/5">
                {result.phash}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Blockchain Transaction</p>
              <p className="font-mono text-sm break-all text-sentinel-primary bg-black/30 p-3 rounded-lg border border-white/5 flex items-center gap-2">
                <Lock size={14} />
                {result.blockchain_tx}
              </p>
            </div>
          </div>
          
          <button 
            onClick={() => { setStatus('idle'); setFile(null); setResult(null); }}
            className="text-gray-400 hover:text-white transition-colors font-medium"
          >
            Protect another asset
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Protect New Asset</h1>
        <p className="text-gray-400 mt-1">Upload media to apply forensic watermark and blockchain registry.</p>
      </header>
      
      <div className="max-w-3xl mx-auto glass border-dashed border-2 border-sentinel-primary/20 p-20 rounded-[40px] flex flex-col items-center justify-center text-center relative overflow-hidden">
        
        {status !== 'idle' && (
          <div className="absolute inset-0 bg-sentinel-dark/90 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              className="w-16 h-16 border-4 border-sentinel-primary/20 border-t-sentinel-primary rounded-full mb-6"
            />
            <h3 className="text-xl font-bold mb-2">
              {status === 'uploading' && 'Uploading media securely...'}
              {status === 'hashing' && 'Applying forensic watermark...'}
              {status === 'blockchain' && 'Registering on Polygon...'}
            </h3>
            <p className="text-gray-400 text-sm">Please do not close this window</p>
          </div>
        )}

        <div className="w-20 h-20 bg-sentinel-primary/10 rounded-3xl flex items-center justify-center text-sentinel-primary mb-6">
          <Upload size={40} />
        </div>
        <h3 className="text-2xl font-bold mb-2">Drop your media here</h3>
        <p className="text-gray-500 mb-8">Supports MP4, MOV, JPG, PNG up to 500MB</p>
        
        <input 
          type="file" 
          id="file-upload" 
          className="hidden" 
          onChange={handleFileChange}
          accept="video/*,image/*"
        />
        
        {!file ? (
          <label 
            htmlFor="file-upload" 
            className="sentinel-gradient px-8 py-3 rounded-2xl text-black font-bold cursor-pointer hover:scale-105 transition-transform inline-block"
          >
            Browse Files
          </label>
        ) : (
          <div className="flex flex-col items-center">
            <p className="mb-4 text-sentinel-secondary font-medium bg-sentinel-secondary/10 px-4 py-2 rounded-lg">
              Selected: {file.name}
            </p>
            <button 
              onClick={handleProtect}
              className="sentinel-gradient px-8 py-3 rounded-2xl text-black font-bold flex items-center gap-2 hover:scale-105 transition-transform shadow-[0_0_20px_-5px_rgba(0,255,136,0.5)]"
            >
              <Shield size={18} />
              Initialize Protection
            </button>
          </div>
        )}
      </div>
    </div>
  );
};


const LandingPage = ({ onGetStarted }) => (
  <div className="min-h-screen flex flex-col relative overflow-hidden">
    <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-sentinel-primary/20 blur-[120px] rounded-full" />
    <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-sentinel-secondary/20 blur-[120px] rounded-full" />

    <nav className="flex justify-between items-center px-8 py-6 z-50">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 sentinel-gradient rounded-xl flex items-center justify-center text-black">
          <Shield size={24} strokeWidth={2.5} />
        </div>
        <span className="text-2xl font-bold tracking-tight">SportSentinel <span className="text-sentinel-primary text-sm align-top ml-1">AI</span></span>
      </div>
      <div className="hidden md:flex items-center gap-8 text-gray-400 font-medium">
        <a href="#" className="hover:text-white transition-colors">Technology</a>
        <a href="#" className="hover:text-white transition-colors">Features</a>
        <a href="#" className="hover:text-white transition-colors">Pricing</a>
      </div>
      <button 
        onClick={onGetStarted}
        className="glass px-6 py-2 rounded-xl font-bold hover:border-sentinel-primary transition-colors"
      >
        Sign In
      </button>
    </nav>

    <main className="flex-1 flex flex-col items-center justify-center px-4 z-10 text-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8"
      >
        <span className="w-2 h-2 rounded-full bg-sentinel-primary animate-pulse-sentinel" />
        <span className="text-sm font-semibold text-gray-300">Hackathon MVP v1.0 Live</span>
      </motion.div>

      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-6xl md:text-8xl font-black mb-6 tracking-tight"
      >
        Protect Your <span className="text-gradient">Sport IP</span><br />Everywhere, Always.
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-xl text-gray-400 max-w-2xl mb-10 leading-relaxed"
      >
        The world's first AI + Blockchain digital bodyguard for sports media. 
        Instant watermarking, immutable proof, and real-time sentinel tracking.
      </motion.p>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <button 
          onClick={onGetStarted}
          className="sentinel-gradient px-8 py-4 rounded-2xl text-black text-lg font-black flex items-center gap-2 hover:scale-105 transition-all shadow-[0_0_40px_-10px_rgba(0,255,136,0.5)]"
        >
          Launch Protocol
          <ChevronRight size={20} />
        </button>
        <button className="glass px-8 py-4 rounded-2xl text-lg font-bold hover:bg-white/5 transition-all">
          Watch Demo
        </button>
      </motion.div>
    </main>

    <footer className="py-8 text-gray-600 text-sm font-medium flex justify-center gap-8">
      <span>Built for Hackathon 2026</span>
      <span>•</span>
      <span>Polygon Blockchain</span>
      <span>•</span>
      <span>Vision AI</span>
    </footer>
  </div>
);

// --- Main App Shell ---

export default function App() {
  const [view, setView] = useState('landing'); // 'landing' | 'dashboard' | 'upload' | 'alerts'
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  if (view === 'landing') return <LandingPage onGetStarted={() => setView('dashboard')} />;

  return (
    <div className="flex min-h-screen bg-sentinel-dark">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 glass border-r border-white/5 transform transition-transform duration-300 md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 flex flex-col h-full">
          <div className="flex items-center gap-2 mb-10 px-2">
            <div className="w-8 h-8 sentinel-gradient rounded-lg flex items-center justify-center text-black">
              <Shield size={20} strokeWidth={3} />
            </div>
            <span className="text-xl font-black tracking-tight">SportSentinel</span>
          </div>

          <div className="flex flex-col gap-2 flex-1">
            <SidebarItem icon={Activity} label="Dashboard" active={view === 'dashboard'} onClick={() => setView('dashboard')} />
            <SidebarItem icon={Upload} label="Protect Asset" active={view === 'upload'} onClick={() => setView('upload')} />
            <SidebarItem icon={Search} label="Global Tracker" active={view === 'alerts'} onClick={() => setView('alerts')} />
            <SidebarItem icon={Fingerprint} label="Verification" />
            <SidebarItem icon={Lock} label="Blockchain Proof" />
          </div>

          <div className="mt-auto p-4 bg-white/5 rounded-2xl border border-white/5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-sentinel-primary/20 flex items-center justify-center text-sentinel-primary">
                <CheckCircle size={20} />
              </div>
              <div>
                <p className="text-sm font-bold">Sentinel Active</p>
                <p className="text-xs text-gray-500">Polygon Mainnet</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 h-screen overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {view === 'dashboard' && <Dashboard onNewProtection={() => setView('upload')} />}
            {view === 'upload' && <UploadView />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
