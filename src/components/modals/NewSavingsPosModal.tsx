import React, { useState } from 'react';
import { useFinance, SARAH_PHOTO_URL } from '../../context/FinanceContext';

export const NewSavingsPosModal: React.FC = () => {
  const { isNewSavingsModalOpen, setIsNewSavingsModalOpen, addNewChildSavings } = useFinance();

  const [name, setName] = useState('');
  const [age, setAge] = useState('7 Tahun');
  const [level, setLevel] = useState('Kelas 1 SD');
  const [targetName, setTargetName] = useState('');
  const [currentAmount, setCurrentAmount] = useState('2000000');
  const [targetAmount, setTargetAmount] = useState('20000000');
  const [monthlyDeposit, setMonthlyDeposit] = useState('500000');
  const [assetDistribution, setAssetDistribution] = useState('Tabungan Syariah & Sukuk');

  if (!isNewSavingsModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !targetName.trim()) return;

    const cur = parseInt(currentAmount.replace(/\D/g, ''), 10) || 0;
    const tgt = parseInt(targetAmount.replace(/\D/g, ''), 10) || 10000000;
    const dep = parseInt(monthlyDeposit.replace(/\D/g, ''), 10) || 500000;

    addNewChildSavings({
      name,
      age,
      level,
      photoUrl: SARAH_PHOTO_URL,
      badgeNumber: 4,
      statusBadge: 'Baru Mulai',
      statusBadgeClass: 'bg-primary-container text-on-primary-container font-semibold',
      targetName,
      currentAmount: cur,
      targetAmount: tgt,
      monthlyDeposit: dep,
      depositDateInfo: `Rp ${(dep).toLocaleString('id-ID')}/bln`,
      assetDistribution,
      iconAsset: 'savings',
      progressColorClass: 'bg-primary',
      portfolioBreakdown: [
        { label: 'Kas Tabungan Mudharabah', value: cur, percentage: 100, type: 'Simpanan Anak' },
      ],
    });

    setIsNewSavingsModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest w-full max-w-lg rounded-t-3xl sm:rounded-2xl p-5 shadow-2xl border border-surface-container-low flex flex-col gap-4 max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-2 border-b border-surface-container-low">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container">
              <span className="material-symbols-outlined !text-[20px]">add_circle</span>
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-on-surface">Buat Pos Tabungan Baru</h3>
              <p className="text-xs text-on-surface-variant">Rencanakan dana pendidikan &amp; masa depan buah hati</p>
            </div>
          </div>
          <button
            onClick={() => setIsNewSavingsModalOpen(false)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low cursor-pointer"
          >
            <span className="material-symbols-outlined !text-[20px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-xs">
          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="font-semibold text-on-surface-variant block mb-1">Nama Buah Hati</label>
              <input
                type="text"
                required
                placeholder="Mis: Fatimah Az-Zahra"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-surface-container-high bg-surface-container-low/40 focus:ring-1 focus:ring-primary outline-none"
              />
            </div>
            <div>
              <label className="font-semibold text-on-surface-variant block mb-1">Usia &amp; Kelas</label>
              <input
                type="text"
                placeholder="Mis: 7 Tahun • Kelas 1 SDIT"
                value={`${age} • ${level}`}
                onChange={(e) => {
                  const parts = e.target.value.split('•');
                  setAge(parts[0]?.trim() || '');
                  setLevel(parts[1]?.trim() || '');
                }}
                className="w-full p-2.5 rounded-xl border border-surface-container-high bg-surface-container-low/40 focus:ring-1 focus:ring-primary outline-none"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-on-surface-variant block mb-1">Target Institusi / Tujuan Studi</label>
            <input
              type="text"
              required
              placeholder="Mis: Masuk Pondok Modern Darussalam"
              value={targetName}
              onChange={(e) => setTargetName(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-surface-container-high bg-surface-container-low/40 focus:ring-1 focus:ring-primary outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="font-semibold text-on-surface-variant block mb-1">Saldo Awal (Rp)</label>
              <input
                type="number"
                value={currentAmount}
                onChange={(e) => setCurrentAmount(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-surface-container-high bg-surface-container-low/40 focus:ring-1 focus:ring-primary outline-none tabular-nums"
              />
            </div>
            <div>
              <label className="font-semibold text-on-surface-variant block mb-1">Target Dana Total (Rp)</label>
              <input
                type="number"
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-surface-container-high bg-surface-container-low/40 focus:ring-1 focus:ring-primary outline-none tabular-nums font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="font-semibold text-on-surface-variant block mb-1">Rencana Auto-Debet / bln (Rp)</label>
              <input
                type="number"
                value={monthlyDeposit}
                onChange={(e) => setMonthlyDeposit(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-surface-container-high bg-surface-container-low/40 focus:ring-1 focus:ring-primary outline-none tabular-nums"
              />
            </div>
            <div>
              <label className="font-semibold text-on-surface-variant block mb-1">Fokus Instrumen Syariah</label>
              <input
                type="text"
                value={assetDistribution}
                onChange={(e) => setAssetDistribution(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-surface-container-high bg-surface-container-low/40 focus:ring-1 focus:ring-primary outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2 border-t border-surface-container-low">
            <button
              type="button"
              onClick={() => setIsNewSavingsModalOpen(false)}
              className="flex-1 py-2.5 rounded-xl bg-surface-container-low text-on-surface-variant text-xs font-semibold hover:bg-surface-container cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl bg-primary text-on-primary text-xs font-semibold hover:bg-primary-container shadow-sm cursor-pointer"
            >
              Buat Pos Sekarang
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
