
import React, { useState } from 'react';
import { UserProfile } from '../types';
import { Rocket, Shield, Mail, Lock, User as UserIcon } from 'lucide-react';

interface AuthModalProps {
  onLogin: (profile: UserProfile) => void;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onLogin, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    name: '',
    email: '',
    companyName: '',
    industry: '',
    isExistingCompany: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mockProfile: UserProfile = {
      id: Math.random().toString(36).substr(2, 9),
      name: form.name || 'Founder',
      email: form.email || 'founder@flareonix.io',
      companyName: form.companyName,
      industry: form.industry,
      isExistingCompany: form.isExistingCompany
    };
    onLogin(mockProfile);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#030712]/80 backdrop-blur-md">
      <div className="glass-card w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
        <div className="p-8 bg-gradient-to-br from-blue-600 to-indigo-700 text-white text-center">
          <Rocket size={48} className="mx-auto mb-4" />
          <h2 className="text-3xl font-bold">Flareonix</h2>
          <p className="opacity-80">Empowering clarity for the next generation of founders.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input 
                required
                type="text" 
                placeholder="Full Name"
                className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-800 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                value={form.name}
                onChange={(e) => setForm({...form, name: e.target.value})}
              />
            </div>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input 
                required
                type="email" 
                placeholder="Email Address"
                className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-800 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                value={form.email}
                onChange={(e) => setForm({...form, email: e.target.value})}
              />
            </div>

            <div className="flex items-center gap-3 p-4 bg-blue-600/5 border border-blue-600/20 rounded-xl">
              <input 
                type="checkbox" 
                id="existing"
                checked={form.isExistingCompany}
                onChange={(e) => setForm({...form, isExistingCompany: e.target.checked})}
                className="w-5 h-5 rounded border-gray-700 bg-gray-900 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="existing" className="text-sm font-medium text-gray-300 cursor-pointer">
                I already have an existing company
              </label>
            </div>

            {form.isExistingCompany && (
              <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                 <input 
                  type="text" 
                  placeholder="Company Name"
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  value={form.companyName}
                  onChange={(e) => setForm({...form, companyName: e.target.value})}
                />
                <input 
                  type="text" 
                  placeholder="Primary Industry"
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  value={form.industry}
                  onChange={(e) => setForm({...form, industry: e.target.value})}
                />
              </div>
            )}
          </div>

          <button 
            type="submit"
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg transition-all shadow-lg shadow-blue-500/20 active:scale-95"
          >
            Create Your Account
          </button>

          <p className="text-center text-sm text-gray-500">
            By continuing, you agree to Flareonix's Terms of Service and Privacy Policy.
          </p>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
