import React, { useEffect, useState } from 'react';
import { useNotification } from '../context/NotificationContext';

const Toast = () => {
  const { notification } = useNotification();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (notification) {
      setIsVisible(true);
    }
  }, [notification]);

  if (!notification) return null;

  const isSuccess = notification.type === 'success';
  
  // Changed from Green/Emerald to Orange/Amber
  const bgColor = isSuccess 
    ? 'bg-gradient-to-r from-orange-500 to-amber-500' 
    : 'bg-gradient-to-r from-red-500 to-pink-500';
  
  const icon = isSuccess ? '✓' : '✕';

  return (
    <>
      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(400px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(400px); opacity: 0; }
        }
        .toast-enter {
          animation: slideInRight 0.3s ease-out;
        }
      `}</style>
      <div className="fixed top-6 right-6" style={{ zIndex: 9999 }}>
        <div
          className={`${bgColor} text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3 toast-enter`}
        >
          <span className="text-2xl font-bold flex-shrink-0">{icon}</span>
          <span className="font-semibold text-sm md:text-base">{notification.message}</span>
        </div>
      </div>
    </>
  );
};

export default Toast;