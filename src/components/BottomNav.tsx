import React from 'react';
import { useFinance } from '../context/FinanceContext';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, openRecordModalWithType } = useFinance();

  return (
    <>
      {/* Center Floating Action Button "+ Catat" */}
      <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
        <button
          onClick={() => openRecordModalWithType('outflow')}
          className="flex items-center gap-1.5 px-4 h-11 rounded-full bg-primary text-on-primary shadow-[0_12px_24px_-6px_rgba(15,23,42,0.18),0_4px_8px_-2px_rgba(0,104,95,0.25)] hover:bg-primary-container transition-all active:scale-95 cursor-pointer font-semibold"
          data-path="catat-transaksi"
          type="button"
        >
          <span className="material-symbols-outlined !text-[20px]">add</span>
          <span className="font-label-md text-sm tracking-normal">+ Catat</span>
        </button>
      </div>

      {/* Bottom Nav Bar */}
      <nav
        className="fixed bottom-0 w-full z-40 pb-safe bg-surface/90 backdrop-blur-xl shadow-[0_-2px_12px_rgba(15,23,42,0.04)] border-t border-surface-container-low"
        data-active-classes="text-primary font-semibold"
      >
        <div className="max-w-md mx-auto flex justify-around items-center h-16 px-1">
          {/* Dashboard */}
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex flex-col items-center justify-center gap-0.5 w-16 h-12 transition-colors cursor-pointer ${
              activeTab === 'dashboard'
                ? 'text-primary font-semibold'
                : 'text-on-surface-variant hover:text-primary'
            }`}
            data-path="dashboard"
            type="button"
          >
            <span
              className={`material-symbols-outlined !text-[22px] ${
                activeTab === 'dashboard' ? 'fill-1' : ''
              }`}
            >
              dashboard
            </span>
            <span className="font-label-sm text-[11px]">Dashboard</span>
          </button>

          {/* Transaksi */}
          <button
            onClick={() => setActiveTab('transaksi')}
            className={`flex flex-col items-center justify-center gap-0.5 w-16 h-12 transition-colors cursor-pointer ${
              activeTab === 'transaksi'
                ? 'text-primary font-semibold'
                : 'text-on-surface-variant hover:text-primary'
            }`}
            data-path="transaksi"
            type="button"
          >
            <span
              className={`material-symbols-outlined !text-[22px] ${
                activeTab === 'transaksi' ? 'fill-1' : ''
              }`}
            >
              receipt_long
            </span>
            <span className="font-label-sm text-[11px]">Transaksi</span>
          </button>

          {/* Spacer for Floating + Catat Button */}
          <div aria-hidden="true" className="w-12 h-12 pointer-events-none" />

          {/* Anggaran */}
          <button
            onClick={() => setActiveTab('anggaran')}
            className={`flex flex-col items-center justify-center gap-0.5 w-16 h-12 transition-colors cursor-pointer ${
              activeTab === 'anggaran'
                ? 'text-primary font-semibold'
                : 'text-on-surface-variant hover:text-primary'
            }`}
            data-path="anggaran"
            type="button"
          >
            <span
              className={`material-symbols-outlined !text-[22px] ${
                activeTab === 'anggaran' ? 'fill-1' : ''
              }`}
            >
              pie_chart
            </span>
            <span className="font-label-sm text-[11px]">Anggaran</span>
          </button>

          {/* Tabungan */}
          <button
            onClick={() => setActiveTab('tabungan-anak')}
            className={`flex flex-col items-center justify-center gap-0.5 w-16 h-12 transition-colors cursor-pointer ${
              activeTab === 'tabungan-anak'
                ? 'text-primary font-semibold'
                : 'text-on-surface-variant hover:text-primary'
            }`}
            data-path="tabungan-anak"
            type="button"
          >
            <span
              className={`material-symbols-outlined !text-[22px] ${
                activeTab === 'tabungan-anak' ? 'fill-1' : ''
              }`}
            >
              savings
            </span>
            <span className="font-label-sm text-[11px]">Tabungan</span>
          </button>

          {/* Laporan */}
          <button
            onClick={() => setActiveTab('laporan')}
            className={`flex flex-col items-center justify-center gap-0.5 w-16 h-12 transition-colors cursor-pointer ${
              activeTab === 'laporan'
                ? 'text-primary font-semibold'
                : 'text-on-surface-variant hover:text-primary'
            }`}
            data-path="laporan"
            type="button"
          >
            <span
              className={`material-symbols-outlined !text-[22px] ${
                activeTab === 'laporan' ? 'fill-1' : ''
              }`}
            >
              bar_chart
            </span>
            <span className="font-label-sm text-[11px]">Laporan</span>
          </button>
        </div>
      </nav>
    </>
  );
};
