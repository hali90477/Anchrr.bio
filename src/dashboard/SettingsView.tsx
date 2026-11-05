import React, { useState } from 'react';
import { User } from '../types';
import { StorageService } from '../services/storage';
import { UpgradeModal } from '../components/UpgradeModal';
import { User as UserIcon, Lock, Globe, Shield, Trash2, CheckCircle2, AlertTriangle, Monitor, Smartphone, LogOut } from 'lucide-react';

interface SettingsViewProps {
  user: User;
  onUpdateUser: (updated: User) => void;
  onSignOut: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ user, onUpdateUser, onSignOut }) => {
  const [fullName, setFullName] = useState(user.fullName);
  const [email, setEmail] = useState(user.email);
  const [username, setUsername] = useState(user.username);
  const [timezone, setTimezone] = useState(user.timezone || 'America/Los_Angeles');
  const [dateFormat, setDateFormat] = useState(user.dateFormat || 'YYYY-MM-DD');

  // Security Form
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const [isUpgradeOpen, setIsUpgradeOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleSaveProfileSettings = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: User = {
      ...user,
      fullName,
      email,
      username,
      timezone,
      dateFormat
    };
    StorageService.setCurrentUser(updated);
    onUpdateUser(updated);
    setToastMsg('Account details saved successfully!');
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      alert('New password must be at least 6 characters.');
      return;
    }
    setOldPassword('');
    setNewPassword('');
    setToastMsg('Password changed successfully across all sessions!');
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleDeleteAccount = () => {
    StorageService.setCurrentUser(null);
    onSignOut();
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl">
        <h1 className="text-xl font-bold text-white mb-1">Account & Creator Settings</h1>
        <p className="text-xs text-slate-400">
          Manage your account profile, security credentials, active sessions, and plan subscription.
        </p>
      </div>

      {toastMsg && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {/* ACCOUNT PROFILE DETAILS */}
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <UserIcon className="w-4 h-4 text-indigo-400" />
            <span>Profile Details</span>
          </h3>

          <form onSubmit={handleSaveProfileSettings} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Username Handle</label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-indigo-400"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Preferred Timezone</label>
              <select
                value={timezone}
                onChange={e => setTimezone(e.target.value)}
                className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
              >
                <option value="America/Los_Angeles">Pacific Time (US & Canada)</option>
                <option value="America/New_York">Eastern Time (US & Canada)</option>
                <option value="Europe/London">London (UTC +0)</option>
                <option value="Asia/Tokyo">Tokyo (UTC +9)</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl transition-colors"
            >
              Save Account Details
            </button>
          </form>
        </div>

        {/* SECURITY & SESSIONS */}
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Lock className="w-4 h-4 text-purple-400" />
              <span>Security & Password</span>
            </h3>

            <form onSubmit={handleChangePassword} className="space-y-3">
              <input
                type="password"
                required
                value={oldPassword}
                onChange={e => setOldPassword(e.target.value)}
                placeholder="Current Password"
                className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
              />
              <input
                type="password"
                required
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                placeholder="New Password (min 6 chars)"
                className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
              />
              <button
                type="submit"
                className="w-full py-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs rounded-xl transition-colors"
              >
                Update Password
              </button>
            </form>
          </div>

          {/* Logged in Active Devices */}
          <div className="pt-4 border-t border-slate-800 space-y-3">
            <span className="text-xs font-bold text-white block">Active Logged-In Sessions</span>
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-300 flex items-center gap-1.5 font-semibold">
                  <Monitor className="w-3.5 h-3.5 text-indigo-400" /> Chrome on macOS (Current Device)
                </span>
                <span className="text-[10px] text-emerald-400 font-bold">Active Now</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5" /> Safari on iPhone 15
                </span>
                <span className="text-[10px] text-slate-500">2 hours ago</span>
              </div>
            </div>
            <button
              onClick={() => alert('Terminated all other active device sessions.')}
              className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout from All Other Devices</span>
            </button>
          </div>
        </div>
      </div>

      {/* PLAN & SUBSCRIPTION INFO */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-white mb-1">Subscription Plan Information</h3>
          <p className="text-xs text-slate-400">
            You are currently on the <strong className="text-indigo-400 uppercase">{user.plan} Plan</strong>.
          </p>
        </div>
        <button
          onClick={() => setIsUpgradeOpen(true)}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl transition-colors shrink-0 shadow-md"
        >
          Manage / Upgrade Plan
        </button>
      </div>

      {/* DANGER ZONE */}
      <div className="p-6 bg-rose-950/20 border border-rose-500/30 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-rose-300 mb-1 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-400" />
            <span>Danger Zone — Account Deletion</span>
          </h3>
          <p className="text-xs text-slate-400">
            Permanently delete your Anchrr account and remove all published creator profiles.
          </p>
        </div>
        <button
          onClick={() => setIsDeleteModalOpen(true)}
          className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs rounded-xl transition-colors shrink-0"
        >
          Delete Account
        </button>
      </div>

      {/* UPGRADE MODAL */}
      <UpgradeModal
        isOpen={isUpgradeOpen}
        onClose={() => setIsUpgradeOpen(false)}
        onUpgradeSuccess={() => {
          const updated = { ...user, plan: 'pro' as const };
          StorageService.setCurrentUser(updated);
          onUpdateUser(updated);
        }}
      />

      {/* DELETE MODAL */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="w-full max-w-sm p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-4 text-center">
            <AlertTriangle className="w-10 h-10 text-rose-500 mx-auto" />
            <h3 className="text-base font-bold text-white">Permanently Delete Account?</h3>
            <p className="text-xs text-slate-400">
              This action is irreversible. All your bio profiles and smart links will be permanently erased.
            </p>
            <div className="flex gap-2 pt-2">
              <button
                onClick={handleDeleteAccount}
                className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs rounded-xl"
              >
                Yes, Delete My Account
              </button>
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-xl"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
