import React, { useState, useRef, useEffect } from 'react';
import { useFinance, APP_LOGO_URL, PROFILE_PHOTO_URL } from '../context/FinanceContext';
import { FamilyMember } from '../types/finance';

export const Header: React.FC = () => {
  const {
    selectedMonth,
    setSelectedMonth,
    notifications,
    unreadCount,
    markNotificationsAsRead,
    currentUser,
    setCurrentUser,
  } = useFinance();

  const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const monthRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const availableMonths = [
    'Okt 2026',
    'Sep 2026',
    'Ags 2026',
    'Jul 2026',
    'Jun 2026',
  ];

  // Close popovers on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (monthRef.current && !monthRef.current.contains(event.target as Node)) {
        setIsMonthDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 w-full z-50 bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.03)] pt-safe border-b border-surface-container-low/60">
      <div className="max-w-4xl mx-auto h-16 px-4 flex items-center justify-between gap-3">
        {/* Brand Zone */}
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <img
            alt="Family Barakah Finance Logo"
            className="h-8 w-auto object-contain shrink-0"
            src={APP_LOGO_URL}
          />
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-display font-semibold text-lg text-primary tracking-tight truncate leading-tight">
                Barakah Finance
              </span>
            </div>
            <span className="font-label-sm text-[11px] text-on-surface-variant truncate">
              Keluarga Sufian &amp; Qori
            </span>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Month Selector Pill */}
          <div className="relative" ref={monthRef}>
            <button
              onClick={() => setIsMonthDropdownOpen(!isMonthDropdownOpen)}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary-container/60 text-on-secondary-fixed-variant hover:bg-secondary-container transition-colors min-h-[32px] text-xs font-semibold cursor-pointer active:scale-95"
              type="button"
            >
              <span>{selectedMonth}</span>
              <span className="material-symbols-outlined !text-[16px]">expand_more</span>
            </button>

            {isMonthDropdownOpen && (
              <div className="absolute right-0 mt-1.5 w-36 bg-surface-container-lowest rounded-xl shadow-lg border border-surface-container-low py-1 z-50">
                <div className="px-3 py-1 text-[11px] font-semibold text-on-surface-variant border-b border-surface-container-low">
                  Pilih Periode
                </div>
                {availableMonths.map((m) => (
                  <button
                    key={m}
                    onClick={() => {
                      setSelectedMonth(m);
                      setIsMonthDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition-colors ${
                      selectedMonth === m
                        ? 'bg-secondary-container/40 text-primary font-bold'
                        : 'text-on-surface hover:bg-surface-container-low'
                    }`}
                  >
                    <span>{m}</span>
                    {selectedMonth === m && (
                      <span className="material-symbols-outlined !text-[14px] text-primary">check</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notifications Button */}
          <div className="relative" ref={notifRef}>
            <button
              aria-label="Notifikasi Keluarga"
              onClick={() => {
                setIsNotifOpen(!isNotifOpen);
                if (!isNotifOpen) {
                  markNotificationsAsRead();
                }
              }}
              className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container/60 transition-colors relative cursor-pointer active:scale-95"
              type="button"
            >
              <span className="material-symbols-outlined !text-[22px]">notifications</span>
              {unreadCount > 0 && (
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-error ring-2 ring-surface"></span>
              )}
            </button>

            {isNotifOpen && (
              <div className="absolute right-0 mt-1.5 w-80 max-w-[90vw] bg-surface-container-lowest rounded-2xl shadow-xl border border-surface-container-low p-3 z-50">
                <div className="flex items-center justify-between pb-2 border-b border-surface-container-low">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined !text-[18px] text-primary">notifications_active</span>
                    <span className="font-headline-sm text-sm font-bold text-on-surface">Notifikasi Keluarga</span>
                  </div>
                  <span className="text-[11px] text-on-surface-variant">Sinkron Cloud</span>
                </div>
                <div className="divide-y divide-surface-container-low max-h-72 overflow-y-auto no-scrollbar">
                  {notifications.map((n) => (
                    <div key={n.id} className="py-2.5 px-1 flex flex-col gap-0.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-on-surface">{n.title}</span>
                        <span className="text-[10px] text-on-surface-variant">{n.time}</span>
                      </div>
                      <p className="text-xs text-on-surface-variant leading-relaxed">{n.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Family Member Profile */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="relative flex items-center justify-center p-0.5 rounded-full bg-secondary-container hover:ring-2 hover:ring-primary transition-all cursor-pointer active:scale-95"
              title="Profil & Mode Pencatatan"
            >
              <img
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
                src={PROFILE_PHOTO_URL}
              />
              <span
                className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-surface ${
                  currentUser === 'Sufian'
                    ? 'bg-primary'
                    : currentUser === 'Qori'
                    ? 'bg-tertiary'
                    : 'bg-secondary'
                }`}
              />
            </button>

            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-1.5 w-56 bg-surface-container-lowest rounded-2xl shadow-xl border border-surface-container-low p-2.5 z-50">
                <div className="flex items-center gap-2.5 p-2 bg-surface-container-low/60 rounded-xl mb-2">
                  <img src={PROFILE_PHOTO_URL} className="w-9 h-9 rounded-full object-cover" alt="Profile" />
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-bold text-on-surface truncate">Sufian &amp; Qori</span>
                    <span className="text-[10px] text-on-surface-variant">Keluarga Syariah Mandiri</span>
                  </div>
                </div>

                <div className="text-[11px] font-semibold text-on-surface-variant px-2 py-1">
                  Catat Sebagai:
                </div>
                {(['Bersama', 'Sufian', 'Qori'] as FamilyMember[]).map((member) => (
                  <button
                    key={member}
                    onClick={() => {
                      setCurrentUser(member);
                      setIsProfileMenuOpen(false);
                    }}
                    className={`w-full text-left px-2.5 py-1.5 text-xs rounded-lg flex items-center justify-between transition-colors ${
                      currentUser === member
                        ? 'bg-secondary-container text-primary font-bold'
                        : 'text-on-surface hover:bg-surface-container-low'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm">
                        {member === 'Bersama' ? '🤝' : member === 'Sufian' ? '🧔' : '🧕'}
                      </span>
                      <span>{member}</span>
                    </div>
                    {currentUser === member && (
                      <span className="material-symbols-outlined !text-[14px]">check</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
