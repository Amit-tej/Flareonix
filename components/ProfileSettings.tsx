
import React from 'react';
import { UserProfile } from '../types';
import { LogOut, User, Building, Trash2 } from 'lucide-react';

interface ProfileSettingsProps {
  user: UserProfile | null;
  onUpdate: (user: UserProfile) => void;
  onLogout: () => void;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({ user, onLogout }) => {
  if (!user) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-3xl font-bold mb-2">Account Settings</h1>
        <p className="text-gray-400">Manage your profile and startup identity.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-8 rounded-2xl">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <User className="text-blue-400" size={20} />
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-gray-500 mb-2">Display Name</label>
                <input 
                  disabled
                  value={user.name}
                  className="w-full bg-gray-900/50 border border-gray-800 px-4 py-3 rounded-xl text-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-2">Email Address</label>
                <input 
                  disabled
                  value={user.email}
                  className="w-full bg-gray-900/50 border border-gray-800 px-4 py-3 rounded-xl text-gray-400"
                />
              </div>
            </div>
          </div>

          <div className="glass-card p-8 rounded-2xl">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Building className="text-purple-400" size={20} />
              Company Details
            </h2>
            {user.isExistingCompany ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-gray-500 mb-2">Company Name</label>
                  <input 
                    disabled
                    value={user.companyName}
                    className="w-full bg-gray-900/50 border border-gray-800 px-4 py-3 rounded-xl text-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-2">Industry</label>
                  <input 
                    disabled
                    value={user.industry}
                    className="w-full bg-gray-900/50 border border-gray-800 px-4 py-3 rounded-xl text-gray-400"
                  />
                </div>
              </div>
            ) : (
              <p className="text-gray-500 italic">No existing company registered.</p>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card p-8 rounded-2xl">
            <h2 className="text-xl font-bold mb-4">Security</h2>
            <p className="text-sm text-gray-400 mb-6">Log out of your current session across all devices.</p>
            <button 
              onClick={onLogout}
              className="w-full py-3 border border-red-500/30 text-red-400 hover:bg-red-500/10 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
            >
              <LogOut size={18} />
              Sign Out
            </button>
          </div>

          <div className="glass-card p-8 rounded-2xl border-red-900/20">
            <h2 className="text-xl font-bold mb-4 text-red-400">Danger Zone</h2>
            <p className="text-sm text-gray-500 mb-6">Permanently delete your account and all research history. This action cannot be undone.</p>
            <button className="w-full py-3 bg-red-900/20 hover:bg-red-900/40 text-red-400 rounded-xl font-semibold transition-all flex items-center justify-center gap-2">
              <Trash2 size={18} />
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
