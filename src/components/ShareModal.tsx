import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { Copy, Check, Share2, X, Twitter, Linkedin, MessageCircle, Send } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  url: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, title, url }) => {
  const [copied, setCopied] = useState(false);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');

  useEffect(() => {
    if (isOpen && url) {
      QRCode.toDataURL(url, { width: 200, margin: 1, color: { dark: '#0f172a', light: '#ffffff' } })
        .then(data => setQrCodeDataUrl(data))
        .catch(err => console.error('QR code generation failed:', err));
    }
  }, [isOpen, url]);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(`Check out ${title} on Anchrr:`);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-md p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-100 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="p-2.5 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-xl">
            <Share2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Share Profile</h3>
            <p className="text-xs text-slate-400">Share "{title}" with your audience</p>
          </div>
        </div>

        {/* QR Code preview */}
        {qrCodeDataUrl && (
          <div className="flex flex-col items-center justify-center p-4 mb-5 bg-slate-950 border border-slate-800/80 rounded-xl">
            <img src={qrCodeDataUrl} alt="QR Code" className="w-36 h-36 rounded-lg bg-white p-2 shadow-md" />
            <span className="mt-2 text-[11px] font-medium text-slate-400 uppercase tracking-wider">Scan to Open Bio Profile</span>
          </div>
        )}

        {/* Copy Link bar */}
        <div className="mb-5">
          <label className="block mb-1.5 text-xs font-semibold text-slate-300">Public Profile Link</label>
          <div className="flex items-center gap-2 p-1.5 bg-slate-950 border border-slate-800 rounded-xl">
            <input
              type="text"
              readOnly
              value={url}
              className="w-full px-3 py-1.5 text-xs font-mono text-slate-200 bg-transparent outline-none truncate"
            />
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Link</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Social Share Buttons */}
        <div>
          <span className="block mb-2 text-xs font-semibold text-slate-300">Quick Share</span>
          <div className="grid grid-cols-4 gap-2">
            <a
              href={`https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center p-2.5 text-slate-300 hover:text-white bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl transition-colors group"
            >
              <Twitter className="w-5 h-5 mb-1 text-sky-400 group-hover:scale-110 transition-transform" />
              <span className="text-[11px] font-medium">X / Twitter</span>
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center p-2.5 text-slate-300 hover:text-white bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl transition-colors group"
            >
              <Linkedin className="w-5 h-5 mb-1 text-blue-500 group-hover:scale-110 transition-transform" />
              <span className="text-[11px] font-medium">LinkedIn</span>
            </a>
            <a
              href={`https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center p-2.5 text-slate-300 hover:text-white bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl transition-colors group"
            >
              <MessageCircle className="w-5 h-5 mb-1 text-emerald-400 group-hover:scale-110 transition-transform" />
              <span className="text-[11px] font-medium">WhatsApp</span>
            </a>
            <a
              href={`mailto:?subject=${encodedText}&body=${encodedUrl}`}
              className="flex flex-col items-center justify-center p-2.5 text-slate-300 hover:text-white bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl transition-colors group"
            >
              <Send className="w-5 h-5 mb-1 text-indigo-400 group-hover:scale-110 transition-transform" />
              <span className="text-[11px] font-medium">Email</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
