
import React from 'react';
import { Rocket, Target, ShieldCheck, Zap, Info } from 'lucide-react';
import { FLAREONIX_INFO } from '../constants.tsx';

const Guide: React.FC = () => {
  const steps = [
    {
      title: "Input Your Spark",
      desc: "Paste your raw startup idea into our Clarity Engine. Be as detailed or as brief as you want.",
      icon: <Zap className="text-yellow-400" />
    },
    {
      title: "AI Deep Research",
      desc: "Flareonix uses Gemini-3-Pro to scour the web for real competitors, market trends, and failed similar startups.",
      icon: <Target className="text-blue-400" />
    },
    {
      title: "Receive Readiness Score",
      desc: "Get an honest percentage evaluation of your success probability based on current market saturation and demand.",
      icon: <ShieldCheck className="text-green-400" />
    },
    {
      title: "Strategic Pivot",
      desc: "If your score is low, our AI suggests a 'Version 2.0' of your idea to significantly improve its market readiness.",
      icon: <Rocket className="text-purple-400" />
    }
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-4">Mastering Startup Readiness</h1>
        <p className="text-gray-400">{FLAREONIX_INFO.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {steps.map((step, idx) => (
          <div key={idx} className="glass-card p-8 rounded-3xl relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-600/5 group-hover:bg-blue-600/10 transition-colors rounded-full -z-10"></div>
            <div className="w-12 h-12 rounded-xl bg-gray-900 flex items-center justify-center mb-6 shadow-lg">
              {step.icon}
            </div>
            <h3 className="text-xl font-bold mb-3">{step.title}</h3>
            <p className="text-gray-400 leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>

      <div className="glass-card p-10 rounded-3xl bg-gradient-to-r from-blue-900/20 to-indigo-900/20 border-blue-500/20">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="shrink-0">
            <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center shadow-2xl shadow-blue-500/40">
              <Info size={40} />
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Why Flareonix?</h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              90% of startups fail, often because they start with assumptions rather than clarity. Flareonix aims to build a 
              transparent and inclusive startup ecosystem where ideas are understood deeply before they are executed.
            </p>
            <div className="flex flex-wrap gap-4">
              <span className="px-4 py-2 bg-blue-600/20 rounded-full text-blue-400 text-sm font-semibold">Real-world Research</span>
              <span className="px-4 py-2 bg-blue-600/20 rounded-full text-blue-400 text-sm font-semibold">Brutal Honesty</span>
              <span className="px-4 py-2 bg-blue-600/20 rounded-full text-blue-400 text-sm font-semibold">Strategic Improvement</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guide;
