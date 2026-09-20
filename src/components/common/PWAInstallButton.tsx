import React, { useState } from 'react';
import { Download, Smartphone, X } from 'lucide-react';
import { usePWAInstall } from '../../hooks/usePWAInstall';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already running as an installed PWA, hide the button
  if (isInstalled) {
    return null;
  }

  // Chromium / Android / Desktop flow
  if (isInstallable) {
    return (
      <button
        onClick={install}
        className="no-print inline-flex items-center gap-1.5 rounded-full bg-[#14213D] px-3.5 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-[#1E2D4A] transition"
      >
        <Download className="w-3.5 h-3.5 text-[#E07A5F]" />
        <span>Install Imbewu App</span>
      </button>
    );
  }

  // iOS Safari flow
  if (isIOS) {
    return (
      <>
        <button
          onClick={() => setShowIOSGuide(true)}
          className="no-print inline-flex items-center gap-1.5 rounded-full border border-[#EADFCF] bg-[#FAF7F2] px-3 py-1 text-xs font-semibold text-[#14213D] hover:bg-[#F4EDE2]"
        >
          <Smartphone className="w-3.5 h-3.5 text-[#E07A5F]" />
          <span>Add to Phone</span>
        </button>

        {showIOSGuide && (
          <div className="no-print fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
            <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl border border-[#EADFCF] text-[#14213D]">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-editorial text-lg font-bold text-[#14213D]">
                  Install Imbewu on iPhone / iPad
                </h3>
                <button
                  onClick={() => setShowIOSGuide(false)}
                  className="p-1 rounded-full text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-[#6B7280] leading-relaxed mb-4">
                Enjoy offline access to printable learning packs even during load-shedding:
              </p>
              <div className="space-y-2 text-xs text-[#4B5563] bg-[#FAF7F2] p-3 rounded-2xl border border-[#EADFCF] mb-4">
                <p>1. Tap the <strong>Share</strong> icon in Safari's bottom toolbar.</p>
                <p>2. Scroll down and tap <strong>Add to Home Screen</strong>.</p>
                <p>3. Tap <strong>Add</strong> in the top right corner.</p>
              </div>
              <button
                onClick={() => setShowIOSGuide(false)}
                className="w-full rounded-full bg-[#14213D] py-2.5 text-xs font-bold text-white hover:bg-[#1E2D4A]"
              >
                Got It
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
