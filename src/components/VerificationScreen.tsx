import React, { useState } from 'react';
import { Mail, RefreshCw, Edit2, CheckCircle, ArrowRight } from 'lucide-react';
import { StorageService } from '../services/storage';
import { User } from '../types';

interface VerificationScreenProps {
  user: User;
  onVerified: (user: User) => void;
  onSignOut: () => void;
}

export const VerificationScreen: React.FC<VerificationScreenProps> = ({ user, onVerified, onSignOut }) => {
  const [email, setEmail] = useState(user.email);
  const [isEditing, setIsEditing] = useState(false);
  const [resent, setResent] = useState(false);

  const handleResend = () => {
    setResent(true);
    setTimeout(() => setResent(false), 4000);
  };

  const handleSaveEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = { ...user, email };
    StorageService.setCurrentUser(updated);
    setIsEditing(false);
  };

  const handleSimulateVerification = () => {
    const verifiedUser = { ...user, emailVerified: true };
    StorageService.setCurrentUser(verifiedUser);
    onVerified(verifiedUser);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-950 text-slate-100">
      <div className="w-full max-w-md p-6 md:p-8 bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl text-center">
        <div className="inline-flex items-center justify-center p-4 mb-4 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-2xl">
          <Mail className="w-8 h-8" />
        </div>

        <h2 className="text-2xl font-bold text-white mb-2">Verify Your Email Address</h2>
        <p className="text-xs text-slate-400 mb-6 leading-relaxed">
          We sent a verification link to <strong className="text-indigo-400">{user.email}</strong>. Please verify your email to access your creator workspace.
        </p>

        {isEditing ? (
          <form onSubmit={handleSaveEmail} className="mb-6 space-y-3">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
              placeholder="Correct email address"
            />
            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl transition-colors"
              >
                Save & Resend
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-xl"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="flex items-center justify-center gap-2 mb-6">
            <button
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-indigo-400 underline transition-colors"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>Correct Email Address</span>
            </button>
          </div>
        )}

        <div className="space-y-3">
          <button
            onClick={handleSimulateVerification}
            className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-4 h-4" />
            <span>I've Verified My Email (Simulate Click)</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={handleResend}
            disabled={resent}
            className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${resent ? 'animate-spin' : ''}`} />
            <span>{resent ? 'Verification Email Resent!' : 'Resend Verification Email'}</span>
          </button>

          <button
            onClick={onSignOut}
            className="w-full py-2 text-xs text-slate-400 hover:text-slate-200 transition-colors"
          >
            Sign Out / Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};
