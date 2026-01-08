
import React, { useState, useEffect, useCallback } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import IdeaEvaluator from './components/IdeaEvaluator';
import HistoryView from './components/HistoryView';
import Guide from './components/Guide';
import ProfileSettings from './components/ProfileSettings';
import AuthModal from './components/AuthModal';
import { UserProfile, NavigationTab, IdeaEvaluation } from './types';
import { MessageCircle, X } from 'lucide-react';
import Chatbot from './components/Chatbot';

const App: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [activeTab, setActiveTab] = useState<NavigationTab>(NavigationTab.DASHBOARD);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [evaluations, setEvaluations] = useState<IdeaEvaluation[]>([]);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Load state from "Database" (LocalStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem('flareonix_user');
    const storedEvals = localStorage.getItem('flareonix_evals');
    
    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedEvals) setEvaluations(JSON.parse(storedEvals));
  }, []);

  const saveEvaluation = useCallback((evalData: IdeaEvaluation) => {
    const updated = [evalData, ...evaluations];
    setEvaluations(updated);
    localStorage.setItem('flareonix_evals', JSON.stringify(updated));
  }, [evaluations]);

  const handleLogout = () => {
    localStorage.removeItem('flareonix_user');
    setUser(null);
  };

  const handleLogin = (profile: UserProfile) => {
    localStorage.setItem('flareonix_user', JSON.stringify(profile));
    setUser(profile);
    setIsAuthOpen(false);
  };

  const renderContent = () => {
    if (!user && !isAuthOpen && activeTab !== NavigationTab.GUIDE) {
      return (
        <div className="flex flex-col items-center justify-center h-screen text-center p-6">
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Welcome to Flareonix
          </h1>
          <p className="text-gray-400 max-w-md mb-8">
            The world's most advanced AI-driven platform for startup idea clarity and readiness.
          </p>
          <button 
            onClick={() => setIsAuthOpen(true)}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-full font-semibold transition-all shadow-lg shadow-blue-500/20"
          >
            Get Started
          </button>
        </div>
      );
    }

    switch (activeTab) {
      case NavigationTab.DASHBOARD:
        return <Dashboard user={user} evaluations={evaluations} onNavigate={setActiveTab} />;
      case NavigationTab.EVALUATE:
        return <IdeaEvaluator user={user} onSave={saveEvaluation} />;
      case NavigationTab.HISTORY:
        return <HistoryView evaluations={evaluations} />;
      case NavigationTab.GUIDE:
        return <Guide />;
      case NavigationTab.SETTINGS:
        return <ProfileSettings user={user} onUpdate={setUser} onLogout={handleLogout} />;
      default:
        return <Dashboard user={user} evaluations={evaluations} onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#030712] text-gray-100">
      {user && (
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          user={user} 
        />
      )}
      
      <main className="flex-1 overflow-y-auto relative p-6 md:p-10">
        <div className="max-w-6xl mx-auto pb-20">
          {renderContent()}
        </div>
      </main>

      {/* Floating Chatbot */}
      <div className="fixed bottom-6 right-6 z-50">
        {isChatOpen ? (
          <div className="w-[380px] h-[500px] shadow-2xl rounded-2xl overflow-hidden border border-gray-800 animate-in slide-in-from-bottom-5">
             <div className="bg-gray-900 border-b border-gray-800 p-4 flex justify-between items-center">
                <span className="font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  Flareonix Support
                </span>
                <button onClick={() => setIsChatOpen(false)} className="text-gray-400 hover:text-white">
                  <X size={20} />
                </button>
             </div>
             <Chatbot />
          </div>
        ) : (
          <button 
            onClick={() => setIsChatOpen(true)}
            className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-all hover:scale-110"
          >
            <MessageCircle size={24} />
          </button>
        )}
      </div>

      {isAuthOpen && <AuthModal onLogin={handleLogin} onClose={() => setIsAuthOpen(false)} />}
    </div>
  );
};

export default App;
