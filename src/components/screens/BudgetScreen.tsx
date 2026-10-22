import React, { useState } from 'react';
import { useFinance } from '../../context/FinanceContext';

export const BudgetScreen: React.FC = () => {
  const {
    budgetCategories,
    selectedMonth,
    totalPlafon,
    totalPengeluaran,
    sisaPlafon,
    setIsBudgetAdjustModalOpen,
    setIsNewSavingsModalOpen,
    setIsSyncLogModalOpen,
    addSubItemToBudget,
  } = useFinance();

  const [activeTabFilter, setActiveTabFilter] = useState<'semua' | 'keluarga' | 'zakat' | 'bisnis'>('semua');
  const [expandedCards, setExpandedCards] = useState<{ [key: string]: boolean }>({
    'b-1': true, // Keep first open by default
  });
  const [subItemModalBudget, setSubItemModalBudget] = useState<string | null>(null);
  const [subItemName, setSubItemName] = useState('');
  const [subItemAmount, setSubItemAmount] = useState('');

  const formatIDR = (val: number) => `Rp ${val.toLocaleString('id-ID')}`;

  const toggleCard = (id: string) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredCategories = budgetCategories.filter((cat) => {
    if (activeTabFilter === 'semua') return true;
    if (activeTabFilter === 'keluarga') return cat.tagGroup === 'keluarga' || cat.tagGroup === 'operasional';
    if (activeTabFilter === 'zakat') return cat.tagGroup === 'zakat';
    if (activeTabFilter === 'bisnis') return cat.tagGroup === 'bisnis';
    return true;
  });

  const overallPercentage = Math.round((totalPengeluaran / totalPlafon) * 100);
  // Semicircular stroke math (arc length ~ 188.5)
  const arcLength = 188.5;
  const strokeOffset = arcLength - (arcLength * overallPercentage) / 100;

  const handleAddSubItemSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subItemModalBudget || !subItemName || !subItemAmount) return;
    const amountNum = parseInt(subItemAmount.replace(/\D/g, ''), 10) || 0;
    addSubItemToBudget(subItemModalBudget, subItemName, amountNum);
    setSubItemName('');
    setSubItemAmount('');
    setSubItemModalBudget(null);
  };

  return (
    <div className="flex flex-col w-full px-4 pb-6 gap-4">
      {/* Sub-header & Month Selector Strip */}
      <section className="flex flex-col gap-1 mt-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span
              className="material-symbols-outlined text-primary !text-[20px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              savings
            </span>
            <h1 className="font-headline-sm text-base md:text-lg font-bold text-on-surface tracking-tight">
              Anggaran Bulanan
            </h1>
          </div>
          <div className="flex items-center gap-1 bg-surface-container-low px-2.5 py-1 rounded-full text-on-surface-variant border border-surface-container-low">
            <span className="material-symbols-outlined !text-[16px] text-primary">calendar_today</span>
            <span className="font-label-sm text-xs font-semibold">{selectedMonth}</span>
          </div>
        </div>
        <p className="font-body-sm text-xs text-on-surface-variant">
          Plafon alokasi berkah &amp; belanja terpadu Sufian &amp; Qori
        </p>
      </section>

      {/* Health Card: Gauge & Daily Spending Advisor */}
      <section className="flex flex-col bg-surface-container-lowest rounded-xl p-4 shadow-sm relative overflow-hidden border border-surface-container-low">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
              <span className="font-label-sm text-[11px] text-primary uppercase font-bold tracking-wider">
                Status Anggaran
              </span>
            </div>
            <span className="font-headline-md text-lg md:text-xl font-bold text-on-surface tracking-tight">
              Aman &amp; Terkendali
            </span>
          </div>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-fixed-variant font-label-sm text-xs font-semibold shrink-0">
            <span
              className="material-symbols-outlined !text-[15px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              verified
            </span>
            Sehat
          </span>
        </div>

        {/* Semicircular Meter SVG Gauge */}
        <div className="flex flex-col items-center justify-center my-1">
          <div className="relative w-48 h-28 flex items-center justify-center">
            <svg className="w-48 h-28" viewBox="0 0 160 90">
              <path
                d="M 20 80 A 60 60 0 0 1 140 80"
                fill="none"
                stroke="#e5eeff"
                strokeLinecap="round"
                strokeWidth="14"
              ></path>
              <path
                d="M 20 80 A 60 60 0 0 1 140 80"
                fill="none"
                stroke="#008378"
                strokeDasharray="188.5"
                strokeDashoffset={strokeOffset}
                strokeLinecap="round"
                strokeWidth="14"
                className="transition-all duration-700 ease-out"
              ></path>
            </svg>
            <div className="absolute bottom-1 flex flex-col items-center">
              <span className="font-display font-bold text-3xl text-on-surface leading-none tabular-nums">
                {overallPercentage}%
              </span>
              <span className="font-label-sm text-xs text-on-surface-variant mt-0.5">
                Telah Terpakai
              </span>
            </div>
          </div>
        </div>

        {/* Spending Breakdown & Daily Recommendation */}
        <div className="grid grid-cols-2 gap-2 mt-1 bg-surface-container-low rounded-xl p-3 border border-surface-container-low">
          <div className="flex flex-col p-1">
            <span className="font-label-sm text-xs text-on-surface-variant">Total Plafon</span>
            <span className="font-label-lg text-sm text-on-surface font-bold tabular-nums">
              {formatIDR(totalPlafon)}
            </span>
            <span className="font-body-sm text-xs text-secondary mt-0.5 tabular-nums">
              Terpakai: {formatIDR(totalPengeluaran)}
            </span>
          </div>
          <div className="flex flex-col p-1 border-l border-surface-container-high/40 pl-2.5">
            <span className="font-label-sm text-xs text-on-surface-variant">Sisa 11 Hari Lagi</span>
            <span className="font-label-lg text-sm text-primary font-bold tabular-nums">
              {formatIDR(sisaPlafon)}
            </span>
            <div className="flex items-center gap-1 mt-0.5 text-on-surface-variant">
              <span className="material-symbols-outlined !text-[13px] text-tertiary">info</span>
              <span className="font-label-sm text-[11px] text-tertiary font-medium">
                Maks. Rp 338rb/hr
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
        <button
          onClick={() => setActiveTabFilter('semua')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 shadow-sm transition-all cursor-pointer ${
            activeTabFilter === 'semua'
              ? 'bg-primary text-on-primary'
              : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface'
          }`}
          type="button"
        >
          Semua ({budgetCategories.length})
        </button>
        <button
          onClick={() => setActiveTabFilter('keluarga')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all cursor-pointer ${
            activeTabFilter === 'keluarga'
              ? 'bg-primary text-on-primary shadow-sm'
              : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface'
          }`}
          type="button"
        >
          Keluarga &amp; Dapur
        </button>
        <button
          onClick={() => setActiveTabFilter('zakat')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all cursor-pointer ${
            activeTabFilter === 'zakat'
              ? 'bg-primary text-on-primary shadow-sm'
              : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface'
          }`}
          type="button"
        >
          Zakat &amp; Syariah
        </button>
        <button
          onClick={() => setActiveTabFilter('bisnis')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all cursor-pointer ${
            activeTabFilter === 'bisnis'
              ? 'bg-primary text-on-primary shadow-sm'
              : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface'
          }`}
          type="button"
        >
          Bisnis Sampingan
        </button>
      </div>

      {/* Budget Allocation Categories Accordion */}
      <section className="flex flex-col gap-3">
        {filteredCategories.map((cat) => {
          const isExpanded = !!expandedCards[cat.id];
          const remaining = cat.limit - cat.spent;

          return (
            <div
              key={cat.id}
              className="flex flex-col bg-surface-container-lowest rounded-xl p-4 shadow-sm transition-all duration-200 border border-surface-container-low"
            >
              {/* Header / Click to Toggle */}
              <div
                className="flex items-start justify-between cursor-pointer select-none"
                onClick={() => toggleCard(cat.id)}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-10 h-10 rounded-xl ${cat.iconBg} flex items-center justify-center shrink-0 ${cat.iconColor}`}
                  >
                    <span className="material-symbols-outlined !text-[22px]">{cat.icon}</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-label-lg text-sm text-on-surface font-bold truncate">
                        {cat.title}
                      </span>
                      <span
                        className={`inline-flex px-1.5 py-0.5 rounded-full font-label-sm text-[11px] font-semibold shrink-0 ${
                          cat.percentage >= 90
                            ? 'bg-secondary-fixed text-on-secondary-fixed'
                            : cat.percentage >= 80
                            ? 'bg-tertiary-fixed text-on-tertiary-fixed'
                            : 'bg-surface-container text-on-surface-variant'
                        }`}
                      >
                        {cat.percentage}%
                      </span>
                    </div>
                    <span className="font-body-sm text-xs text-on-surface-variant truncate">
                      {cat.subtitle}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <div className="text-right">
                    <div className="font-label-lg text-xs md:text-sm text-on-surface font-bold tabular-nums">
                      {formatIDR(cat.spent)}
                    </div>
                    <div className="font-body-sm text-[11px] text-on-surface-variant tabular-nums">
                      dr {formatIDR(cat.limit)}
                    </div>
                  </div>
                  <span
                    className={`material-symbols-outlined text-outline-variant transition-transform duration-200 !text-[20px] ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                  >
                    expand_more
                  </span>
                </div>
              </div>

              {/* Linear Progress Bar */}
              <div className="w-full bg-surface-container-low h-2 rounded-full overflow-hidden mt-3">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    cat.id === 'b-1'
                      ? 'bg-tertiary-container'
                      : cat.id === 'b-3'
                      ? 'bg-primary-container'
                      : cat.id === 'b-4'
                      ? 'bg-secondary'
                      : cat.id === 'b-6'
                      ? 'bg-secondary-fixed-dim'
                      : 'bg-primary'
                  }`}
                  style={{ width: `${Math.min(cat.percentage, 100)}%` }}
                ></div>
              </div>

              {/* Status footer line */}
              <div className="flex items-center justify-between mt-1.5 text-on-surface-variant text-xs">
                <span
                  className={`font-label-sm flex items-center gap-1 ${
                    cat.statusWarning
                      ? 'text-tertiary font-semibold'
                      : cat.id === 'b-3'
                      ? 'text-primary font-semibold'
                      : 'text-on-surface-variant'
                  }`}
                >
                  {cat.statusWarning && (
                    <span className="material-symbols-outlined !text-[13px]">warning</span>
                  )}
                  {cat.id === 'b-3' && (
                    <span className="material-symbols-outlined !text-[14px]">verified</span>
                  )}
                  {cat.id === 'b-4' && (
                    <span className="material-symbols-outlined !text-[14px] text-secondary">
                      trending_up
                    </span>
                  )}
                  {cat.id === 'b-5' && (
                    <span className="material-symbols-outlined !text-[13px] text-secondary">
                      check_circle
                    </span>
                  )}
                  <span>{cat.statusText}</span>
                </span>
                <span className="font-label-sm font-semibold text-secondary tabular-nums">
                  Sisa {formatIDR(remaining)}
                </span>
              </div>

              {/* Collapsible Detailed Breakdown */}
              {isExpanded && (
                <div className="flex flex-col gap-2 pt-3 mt-3 bg-surface-container-low/50 rounded-lg p-2.5 border border-surface-container-low">
                  {cat.subItems.map((sub) => (
                    <div
                      key={sub.id}
                      className="flex items-center justify-between text-xs py-0.5"
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/70"></span>
                        <span className="text-on-surface-variant">{sub.name}</span>
                      </div>
                      <span className="font-semibold text-on-surface tabular-nums">
                        {formatIDR(sub.amount)}
                      </span>
                    </div>
                  ))}

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-surface-container-low">
                    <button
                      onClick={() => setSubItemModalBudget(cat.id)}
                      className="text-primary font-label-sm text-xs font-semibold flex items-center gap-0.5 hover:underline cursor-pointer"
                      type="button"
                    >
                      <span className="material-symbols-outlined !text-[15px]">add</span>
                      <span>+ Tambah Sub-pos</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </section>

      {/* Forecast & Strategic Budget Insights Card */}
      <section className="flex flex-col bg-surface-container-lowest rounded-xl p-4 shadow-sm gap-3 relative overflow-hidden border border-surface-container-low">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-fixed-variant shrink-0">
            <span className="material-symbols-outlined !text-[20px]">auto_graph</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-label-lg text-sm font-bold text-on-surface">
              Prediksi Penutupan Bulan
            </span>
            <span className="font-body-sm text-xs text-on-surface-variant">
              Berdasarkan ritme belanja 20 hari terakhir
            </span>
          </div>
        </div>

        <div className="bg-surface-container-low rounded-xl p-3 flex flex-col gap-1.5 border border-surface-container-low">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-xs text-on-surface-variant">Estimasi Surplus Kas</span>
            <span className="font-label-md text-sm font-bold text-primary tabular-nums">
              +Rp 1.450.000
            </span>
          </div>
          <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
            MasyaAllah! Jika rata-rata harian dijaga di bawah <strong>Rp 338.000</strong>, sisa dana
            bisa langsung dialihkan ke <em>Tabungan Qurban 2027</em> atau <em>Dana Darurat Keluarga</em>.
          </p>
        </div>

        {/* Dual Actions */}
        <div className="grid grid-cols-2 gap-2 mt-1">
          <button
            onClick={() => setIsBudgetAdjustModalOpen(true)}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-surface-container-high text-primary font-label-md text-xs font-semibold hover:bg-surface-variant transition-colors cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined !text-[18px]">tune</span>
            <span>Sesuaikan Pos</span>
          </button>

          <button
            onClick={() => setIsNewSavingsModalOpen(true)}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-primary text-on-primary font-label-md text-xs font-semibold hover:bg-primary-container transition-colors shadow-sm cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined !text-[18px]">add</span>
            <span>Pos Baru</span>
          </button>
        </div>
      </section>

      {/* Partner Shared Review Note */}
      <div className="flex items-center justify-between p-3 bg-surface-container-low rounded-xl border border-surface-container-low">
        <div className="flex items-center gap-2">
          <div className="flex -space-x-1.5 overflow-hidden">
            <div className="w-6 h-6 rounded-full bg-secondary text-on-secondary flex items-center justify-center text-[10px] font-bold ring-1 ring-surface">
              S
            </div>
            <div className="w-6 h-6 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center text-[10px] font-bold ring-1 ring-surface">
              Q
            </div>
          </div>
          <span className="font-label-sm text-xs text-on-surface-variant">
            Sinkronisasi terakhir: Hari ini, 16:42 WIB
          </span>
        </div>
        <button
          onClick={() => setIsSyncLogModalOpen(true)}
          className="font-label-sm text-xs text-primary font-semibold hover:underline cursor-pointer"
          type="button"
        >
          Lihat Log
        </button>
      </div>

      {/* Add Sub-item Modal */}
      {subItemModalBudget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-surface-container-lowest w-full max-w-sm rounded-2xl p-5 shadow-2xl border border-surface-container-low flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-on-surface">Tambah Rincian Sub-pos</span>
              <button
                onClick={() => setSubItemModalBudget(null)}
                className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-surface-container-low cursor-pointer"
              >
                <span className="material-symbols-outlined !text-[18px]">close</span>
              </button>
            </div>
            <form onSubmit={handleAddSubItemSubmit} className="flex flex-col gap-3">
              <div>
                <label className="text-xs font-semibold text-on-surface-variant block mb-1">
                  Nama Pengeluaran
                </label>
                <input
                  type="text"
                  required
                  placeholder="Mis: Minyak Goreng & Beras"
                  value={subItemName}
                  onChange={(e) => setSubItemName(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-surface-container-high bg-surface-container-low/40 focus:ring-2 focus:ring-primary/20 outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-on-surface-variant block mb-1">
                  Nominal (Rp)
                </label>
                <input
                  type="number"
                  required
                  placeholder="Mis: 150000"
                  value={subItemAmount}
                  onChange={(e) => setSubItemAmount(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-surface-container-high bg-surface-container-low/40 focus:ring-2 focus:ring-primary/20 outline-none tabular-nums"
                />
              </div>
              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSubItemModalBudget(null)}
                  className="flex-1 py-2 rounded-xl text-xs font-semibold bg-surface-container-low text-on-surface-variant hover:bg-surface-container cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl text-xs font-semibold bg-primary text-on-primary hover:bg-primary-container cursor-pointer shadow-sm"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
