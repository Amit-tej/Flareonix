
import React from 'react';
import { UserProfile, IdeaEvaluation, NavigationTab } from '../types';
import { TrendingUp, Award, Zap, ArrowRight, ShieldCheck, Clock } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface DashboardProps {
  user: UserProfile | null;
  evaluations: IdeaEvaluation[];
  onNavigate: (tab: NavigationTab) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, evaluations, onNavigate }) => {
  const latestEval = evaluations[0];

  // Mock stats
  const stats = [
    { label: 'Ideas Evaluated', value: evaluations.length, icon: <Zap size={20} className="text-yellow-400" /> },
    { label: 'Avg. Readiness', value: evaluations.length > 0 ? '72%' : 'N/A', icon: <TrendingUp size={20} className="text-green-400" /> },
    { label: 'Safe to Launch', value: evaluations.filter(e => e.analysis.successProbability > 70).length, icon: <ShieldCheck size={20} className="text-blue-400" /> },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}!</h1>
        <p className="text-gray-400">Here's a snapshot of your startup readiness journey.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="glass-card p-6 rounded-2xl flex items-center gap-4 hover:border-gray-700 transition-all group">
            <div className="p-3 bg-gray-900 rounded-xl group-hover:scale-110 transition-transform">
              {stat.icon}
            </div>
            <div>
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-card rounded-2xl p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[100px] -z-10"></div>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold">Readiness Score History</h2>
            <select className="bg-gray-900 border-none text-sm text-gray-400 rounded-lg px-2 py-1 outline-none">
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-[250px] w-full">
            {evaluations.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={evaluations.map((e, i) => ({ name: i, score: e.analysis.successProbability })).reverse()}>
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                  <XAxis dataKey="name" hide />
                  <YAxis domain={[0, 100]} stroke="#4b5563" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151' }}
                    itemStyle={{ color: '#3b82f6' }}
                  />
                  <Area type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-600">
                <Clock size={48} className="mb-2 opacity-20" />
                <p>No evaluations yet</p>
              </div>
            )}
          </div>
        </div>

        <div className="glass-card rounded-2xl p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold mb-4">Quick Evaluation</h2>
            <p className="text-sm text-gray-400 mb-6">
              Got a new spark? Run it through our deep-research model to check its real-world feasibility instantly.
            </p>
          </div>
          <button 
            onClick={() => onNavigate(NavigationTab.EVALUATE)}
            className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-xl font-semibold transition-all group shadow-lg shadow-blue-500/20"
          >
            Start New Research
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      <div className="glass-card rounded-2xl p-8">
        <h2 className="text-xl font-bold mb-6">Latest Insights</h2>
        {latestEval ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-xs uppercase tracking-widest text-blue-400 font-bold mb-2">Featured Project</p>
              <h3 className="text-2xl font-bold mb-3">{latestEval.ideaTitle}</h3>
              <p className="text-gray-400 line-clamp-3 mb-4">{latestEval.analysis.summary}</p>
              <div className="flex gap-4">
                <span className="px-3 py-1 bg-green-900/30 text-green-400 text-xs rounded-full border border-green-900/50">
                  {latestEval.analysis.successProbability}% Success Rate
                </span>
                <span className="px-3 py-1 bg-blue-900/30 text-blue-400 text-xs rounded-full border border-blue-900/50">
                  Market Leader Research Done
                </span>
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-sm font-semibold text-gray-500">Key Risk Factors</p>
              {latestEval.analysis.risks.slice(0, 3).map((risk, i) => (
                <div key={i} className="flex items-start gap-3 text-sm text-gray-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0"></div>
                  {risk}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-10 text-gray-500">
            No research reports found. Your analysis results will appear here.
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
