import React, { useState, useEffect } from 'react';
import { WifiOff, DownloadCloud, Check } from 'lucide-react';

export const OfflineIndicator: React.FC = () => {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsOnline(navigator.onLine);
      const handleOnline = () => setIsOnline(true);
      const handleOffline = () => setIsOnline(false);
      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);
      return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
      };
    }
  }, []);

  if (isOnline) {
    return null;
  }

  return (
    <div className="no-print fixed bottom-4 left-4 z-50 flex items-center gap-2.5 rounded-2xl bg-[#14213D] px-4 py-2.5 text-xs font-semibold text-white shadow-xl border border-[#E07A5F]/40 animate-fade-in">
      <div className="w-2 h-2 rounded-full bg-[#E07A5F] animate-ping" />
      <WifiOff className="w-4 h-4 text-[#F4A261]" />
      <div className="flex flex-col">
        <span className="font-bold text-white">Offline Mode Active</span>
        <span className="text-[10px] text-gray-300">
          Weekly activity packs & worksheets cached locally
        </span>
      </div>
    </div>
  );
};
