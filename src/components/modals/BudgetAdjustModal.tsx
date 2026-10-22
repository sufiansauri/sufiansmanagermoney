import React, { useState } from 'react';
import { useFinance } from '../../context/FinanceContext';

export const BudgetAdjustModal: React.FC = () => {
  const { isBudgetAdjustModalOpen, setIsBudgetAdjustModalOpen, budgetCategories, updateBudgetLimit } = useFinance();
  const [limits, setLimits] = useState<{ [key: string]: number }>(() => {
    const map: { [key: string]: number } = {};
    budgetCategories.forEach((b) => {
      map[b.id] = b.limit;
    });
    return map;
  });

  if (!isBudgetAdjustModalOpen) return null;

  const formatIDR = (val: number) => `Rp ${val.toLocaleString('id-ID')}`;

  const handleSave = () => {
    Object.entries(limits).forEach(([id, limit]) => {
      updateBudgetLimit(id, limit);
    });
    setIsBudgetAdjustModalOpen(false);
  };

  const handleLimitChange = (id: string, val: string) => {
    const num = parseInt(val.replace(/\D/g, ''), 10) || 0;
    setLimits((prev) => ({
      ...prev,
      [id]: num,
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest w-full max-w-lg rounded-t-3xl sm:rounded-2xl p-5 shadow-2xl border border-surface-container-low flex flex-col gap-4 max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-2 border-b border-surface-container-low">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-primary">
              <span className="material-symbols-outlined !text-[20px]">tune</span>
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-on-surface">Sesuaikan Plafon Anggaran</h3>
              <p className="text-xs text-on-surface-variant">Atur alokasi batasan belanja bulanan keluarga</p>
            </div>
          </div>
          <button
            onClick={() => setIsBudgetAdjustModalOpen(false)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low cursor-pointer"
          >
            <span className="material-symbols-outlined !text-[20px]">close</span>
          </button>
        </div>

        <div className="space-y-3">
          {budgetCategories.map((cat) => {
            const currentVal = limits[cat.id] ?? cat.limit;
            return (
              <div
                key={cat.id}
                className="p-3 rounded-xl bg-surface-container-low/60 border border-surface-container-low flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className={`w-8 h-8 rounded-lg ${cat.iconBg} ${cat.iconColor} flex items-center justify-center shrink-0`}>
                    <span className="material-symbols-outlined !text-[18px]">{cat.icon}</span>
                  </div>
                  <div className="min-w-0">
                    <span className="font-bold text-xs text-on-surface block truncate">{cat.title}</span>
                    <span className="text-[10px] text-on-surface-variant block">Terpakai: {formatIDR(cat.spent)}</span>
                  </div>
                </div>

                <div className="w-36 shrink-0">
                  <input
                    type="number"
                    value={currentVal}
                    onChange={(e) => handleLimitChange(cat.id, e.target.value)}
                    className="w-full text-xs font-bold p-2 rounded-lg border border-surface-container-high bg-white focus:ring-1 focus:ring-primary outline-none text-right tabular-nums"
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-2 pt-2 border-t border-surface-container-low">
          <button
            onClick={() => setIsBudgetAdjustModalOpen(false)}
            className="flex-1 py-2.5 rounded-xl bg-surface-container-low text-on-surface-variant text-xs font-semibold hover:bg-surface-container cursor-pointer"
          >
            Batal
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-2.5 rounded-xl bg-primary text-on-primary text-xs font-semibold hover:bg-primary-container shadow-sm cursor-pointer"
          >
            Simpan Perubahan
          </button>
        </div>
      </div>
    </div>
  );
};
