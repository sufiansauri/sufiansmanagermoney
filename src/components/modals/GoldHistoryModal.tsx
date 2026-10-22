import React, { useState } from 'react';
import { useFinance } from '../../context/FinanceContext';

export const GoldHistoryModal: React.FC = () => {
  const { isGoldHistoryModalOpen, setIsGoldHistoryModalOpen, goldHolding, addGoldPurchase } = useFinance();
  const [showAddGold, setShowAddGold] = useState(false);
  const [newWeight, setNewWeight] = useState('5');
  const [newBuyPrice, setNewBuyPrice] = useState('1300000');
  const [newAllocation, setNewAllocation] = useState('Pendidikan Anak');

  if (!isGoldHistoryModalOpen) return null;

  const formatIDR = (val: number) => `Rp ${val.toLocaleString('id-ID')}`;

  const handleAddGoldSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseInt(newWeight, 10) || 5;
    const p = parseInt(newBuyPrice.replace(/\D/g, ''), 10) || 1300000;
    addGoldPurchase(w, p, newAllocation);
    setShowAddGold(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest w-full max-w-lg rounded-t-3xl sm:rounded-2xl p-5 shadow-2xl border border-surface-container-low flex flex-col gap-4 max-h-[88vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-surface-container-low">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-tertiary-fixed flex items-center justify-center text-tertiary">
              <span className="material-symbols-outlined !text-[20px]">stars</span>
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-on-surface">
                Riwayat Cadangan Emas Fisik
              </h3>
              <p className="text-xs text-on-surface-variant">
                Logam Mulia PT Antam Tbk (CertiEye Terverifikasi)
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsGoldHistoryModalOpen(false)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low cursor-pointer"
          >
            <span className="material-symbols-outlined !text-[20px]">close</span>
          </button>
        </div>

        {/* Overview Banner */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-tertiary-fixed/60 via-surface-container-low to-tertiary-fixed/30 border border-tertiary-fixed/40 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-on-surface-variant uppercase tracking-wider font-semibold block">
              Total Portofolio Emas
            </span>
            <div className="font-display font-bold text-2xl text-on-surface tabular-nums">
              {goldHolding.totalGrams} Gram
            </div>
            <span className="text-xs text-secondary font-bold inline-flex items-center gap-1 mt-0.5">
              <span className="material-symbols-outlined !text-[14px]">trending_up</span>
              {goldHolding.growthYoY}
            </span>
          </div>
          <div className="text-right">
            <span className="text-[11px] text-on-surface-variant block">Nilai Pasar Sekarang</span>
            <span className="font-display font-bold text-base text-primary tabular-nums block mt-0.5">
              {formatIDR(goldHolding.totalMarketValue)}
            </span>
            <span className="text-[10px] text-on-surface-variant block mt-0.5">
              @ {formatIDR(goldHolding.marketPricePerGram)} / gr
            </span>
          </div>
        </div>

        {/* Safety storage note */}
        <div className="p-2.5 rounded-xl bg-surface-container-low flex items-center justify-between text-xs border border-surface-container-low">
          <div className="flex items-center gap-1.5 text-on-surface-variant">
            <span className="material-symbols-outlined text-primary !text-[16px]">lock</span>
            <span>{goldHolding.storageLocation}</span>
          </div>
          <span className="text-secondary font-semibold">Terasuransikan</span>
        </div>

        {/* List of Gold Batches */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-on-surface">Kepingan Emas Terdaftar</span>
            <button
              onClick={() => setShowAddGold(!showAddGold)}
              className="text-primary text-xs font-semibold hover:underline flex items-center gap-0.5 cursor-pointer"
            >
              <span className="material-symbols-outlined !text-[16px]">add</span>
              <span>Catat Kepingan Baru</span>
            </button>
          </div>

          {showAddGold && (
            <form onSubmit={handleAddGoldSubmit} className="p-3 rounded-xl bg-surface-container-low flex flex-col gap-2.5 border border-surface-container-low">
              <span className="text-xs font-bold text-on-surface">Tambah Pembelian Emas</span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <label className="text-[11px] text-on-surface-variant block mb-1">Berat (Gram)</label>
                  <input
                    type="number"
                    value={newWeight}
                    onChange={(e) => setNewWeight(e.target.value)}
                    className="w-full p-2 rounded-lg border border-surface-container-high bg-white focus:ring-1 focus:ring-primary outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-on-surface-variant block mb-1">Harga Beli / Gram (Rp)</label>
                  <input
                    type="number"
                    value={newBuyPrice}
                    onChange={(e) => setNewBuyPrice(e.target.value)}
                    className="w-full p-2 rounded-lg border border-surface-container-high bg-white focus:ring-1 focus:ring-primary outline-none tabular-nums"
                  />
                </div>
              </div>
              <div>
                <label className="text-[11px] text-on-surface-variant block mb-1">Peruntukan Pos</label>
                <input
                  type="text"
                  value={newAllocation}
                  onChange={(e) => setNewAllocation(e.target.value)}
                  className="w-full text-xs p-2 rounded-lg border border-surface-container-high bg-white focus:ring-1 focus:ring-primary outline-none"
                />
              </div>
              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowAddGold(false)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-on-surface-variant hover:bg-surface-container cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-primary text-on-primary hover:bg-primary-container cursor-pointer shadow-xs"
                >
                  Simpan Emas
                </button>
              </div>
            </form>
          )}

          <div className="space-y-2">
            {goldHolding.items.map((item) => {
              const currentValue = item.weight * goldHolding.marketPricePerGram;
              const purchaseValue = item.weight * item.buyPricePerGram;
              const profit = currentValue - purchaseValue;

              return (
                <div
                  key={item.id}
                  className="p-3 rounded-xl bg-surface-container-lowest border border-surface-container-low shadow-xs flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-tertiary-fixed/60 flex items-center justify-center text-tertiary font-bold">
                      {item.weight}g
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-on-surface">Keping {item.weight} Gram</span>
                        <span className="text-[10px] text-on-surface-variant font-mono">{item.serial}</span>
                      </div>
                      <span className="text-[11px] text-on-surface-variant block">
                        {item.allocatedFor} • Beli: {item.date}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-on-surface block tabular-nums">
                      {formatIDR(currentValue)}
                    </span>
                    <span className="text-[10px] text-secondary font-semibold tabular-nums">
                      +{formatIDR(profit)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-2 pt-1 border-t border-surface-container-low">
          <button
            onClick={() => setIsGoldHistoryModalOpen(false)}
            className="w-full py-2.5 rounded-xl bg-primary text-on-primary text-xs font-semibold hover:bg-primary-container transition-colors shadow-sm cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
