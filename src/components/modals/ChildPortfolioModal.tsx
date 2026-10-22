import React from 'react';
import { useFinance } from '../../context/FinanceContext';

export const ChildPortfolioModal: React.FC = () => {
  const {
    selectedChildForPortfolio,
    setSelectedChildForPortfolio,
    setSelectedChildForDeposit,
  } = useFinance();

  if (!selectedChildForPortfolio) return null;

  const child = selectedChildForPortfolio;
  const formatIDR = (val: number) => `Rp ${val.toLocaleString('id-ID')}`;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest w-full max-w-md rounded-t-3xl sm:rounded-2xl p-5 shadow-2xl border border-surface-container-low flex flex-col gap-4 max-h-[85vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-surface-container-low">
          <div className="flex items-center gap-2.5">
            <img
              src={child.photoUrl}
              alt={child.name}
              className="w-11 h-11 rounded-full object-cover border border-surface-container shadow-xs"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-display font-bold text-base text-on-surface">
                  Portofolio {child.name}
                </h3>
                <span className="px-2 py-0.2 rounded-full text-[10px] font-bold bg-secondary-container text-on-secondary-fixed-variant">
                  {child.statusBadge}
                </span>
              </div>
              <p className="text-xs text-on-surface-variant">
                {child.age} • {child.level}
              </p>
            </div>
          </div>
          <button
            onClick={() => setSelectedChildForPortfolio(null)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low cursor-pointer"
          >
            <span className="material-symbols-outlined !text-[20px]">close</span>
          </button>
        </div>

        {/* Milestone Goal Box */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-secondary-container/40 via-surface-container-low to-secondary-container/20 border border-secondary-container/30 flex flex-col gap-2">
          <span className="text-[11px] font-semibold text-primary uppercase tracking-wider">
            Target Studi Utama
          </span>
          <div className="font-display font-bold text-base text-on-surface">
            {child.targetName}
          </div>
          <div className="flex items-baseline justify-between pt-1">
            <span className="font-bold text-primary text-base tabular-nums">
              {formatIDR(child.currentAmount)}
            </span>
            <span className="text-xs text-on-surface-variant tabular-nums">
              dari target {formatIDR(child.targetAmount)} ({child.percentage}%)
            </span>
          </div>
          <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden mt-0.5">
            <div
              className={`h-full rounded-full ${child.progressColorClass}`}
              style={{ width: `${Math.min(child.percentage, 100)}%` }}
            ></div>
          </div>
        </div>

        {/* Breakdown of Instruments */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-bold text-on-surface">Komposisi Instrumen Syariah</span>
          <div className="space-y-2">
            {child.portfolioBreakdown.map((item, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-surface-container-low/70 border border-surface-container-low flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined !text-[16px]">account_balance</span>
                  </div>
                  <div>
                    <span className="font-semibold text-on-surface block">{item.label}</span>
                    <span className="text-[11px] text-on-surface-variant">{item.type}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-bold text-on-surface block tabular-nums">
                    {formatIDR(item.value)}
                  </span>
                  <span className="text-[10px] text-secondary font-semibold">
                    {item.percentage}% dari portofolio
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Regular auto debit details */}
        <div className="p-3 rounded-xl bg-surface-container-low text-xs flex items-center justify-between border border-surface-container-low">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary !text-[18px]">event_repeat</span>
            <div>
              <span className="font-semibold text-on-surface block">Rencana Setoran Rutin</span>
              <span className="text-[11px] text-on-surface-variant">{child.depositDateInfo}</span>
            </div>
          </div>
          <span className="font-bold text-primary tabular-nums">
            {formatIDR(child.monthlyDeposit)}
          </span>
        </div>

        {/* Action button */}
        <div className="flex items-center gap-2 pt-1 border-t border-surface-container-low">
          <button
            onClick={() => setSelectedChildForPortfolio(null)}
            className="flex-1 py-2.5 rounded-xl bg-surface-container-low text-on-surface-variant text-xs font-semibold hover:bg-surface-container transition-colors cursor-pointer"
          >
            Tutup
          </button>
          <button
            onClick={() => {
              setSelectedChildForPortfolio(null);
              setSelectedChildForDeposit(child);
            }}
            className="flex-1 py-2.5 rounded-xl bg-primary text-on-primary text-xs font-semibold hover:bg-primary-container transition-colors shadow-sm flex items-center justify-center gap-1 cursor-pointer font-display"
          >
            <span className="material-symbols-outlined !text-[16px]">add</span>
            <span>Tambah Setoran</span>
          </button>
        </div>
      </div>
    </div>
  );
};
