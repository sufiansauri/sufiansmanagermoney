import React, { useState } from 'react';
import { useFinance } from '../../context/FinanceContext';

export const DepositModal: React.FC = () => {
  const { selectedChildForDeposit, setSelectedChildForDeposit, depositToChildSavings } = useFinance();
  const [depositAmount, setDepositAmount] = useState('500000');
  const [depositNote, setDepositNote] = useState('');
  const [sourceAccount, setSourceAccount] = useState('BSI');

  if (!selectedChildForDeposit) return null;

  const formatIDR = (val: number) => `Rp ${val.toLocaleString('id-ID')}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseInt(depositAmount.replace(/\D/g, ''), 10);
    if (!parsed || parsed <= 0) return;

    depositToChildSavings(
      selectedChildForDeposit.id,
      parsed,
      depositNote || `Setoran rutin untuk ${selectedChildForDeposit.name}`
    );
    setSelectedChildForDeposit(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest w-full max-w-md rounded-t-3xl sm:rounded-2xl p-5 shadow-2xl border border-surface-container-low flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-surface-container-low">
          <div className="flex items-center gap-2.5">
            <img
              src={selectedChildForDeposit.photoUrl}
              alt={selectedChildForDeposit.name}
              className="w-10 h-10 rounded-full object-cover border border-surface-container"
            />
            <div>
              <h3 className="font-display font-bold text-base text-on-surface">
                Setoran Tabungan {selectedChildForDeposit.name}
              </h3>
              <p className="text-xs text-on-surface-variant">
                Target: {selectedChildForDeposit.targetName}
              </p>
            </div>
          </div>
          <button
            onClick={() => setSelectedChildForDeposit(null)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low cursor-pointer"
          >
            <span className="material-symbols-outlined !text-[20px]">close</span>
          </button>
        </div>

        {/* Current status banner */}
        <div className="p-3 rounded-xl bg-surface-container-low flex items-center justify-between text-xs border border-surface-container-low">
          <div>
            <span className="text-on-surface-variant block">Saldo Terkumpul</span>
            <span className="font-bold text-on-surface text-sm tabular-nums">
              {formatIDR(selectedChildForDeposit.currentAmount)}
            </span>
          </div>
          <div className="text-right">
            <span className="text-on-surface-variant block">Target Dana</span>
            <span className="font-bold text-primary text-sm tabular-nums">
              {formatIDR(selectedChildForDeposit.targetAmount)}
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          <div>
            <label className="text-xs font-semibold text-on-surface-variant block mb-1">
              Nominal Setoran (Rp)
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-base font-bold text-on-surface-variant">Rp</span>
              <input
                type="number"
                required
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-surface-container-high bg-surface-container-low/40 text-base font-bold font-display text-on-surface focus:ring-2 focus:ring-primary/20 outline-none tabular-nums"
              />
            </div>
            {/* Quick chips */}
            <div className="flex items-center gap-1.5 mt-2">
              {[250000, 500000, 1000000, 2000000].map((val) => (
                <button
                  type="button"
                  key={val}
                  onClick={() => setDepositAmount(val.toString())}
                  className="flex-1 py-1 rounded-lg bg-surface-container-low text-[11px] font-semibold text-on-surface-variant hover:bg-surface-container cursor-pointer text-center"
                >
                  +{val >= 1000000 ? `${val / 1000000}jt` : `${val / 1000}rb`}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-on-surface-variant block mb-1">
              Sumber Rekening Debet
            </label>
            <select
              value={sourceAccount}
              onChange={(e) => setSourceAccount(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-surface-container-high bg-surface-container-low/40 focus:ring-2 focus:ring-primary/20 outline-none cursor-pointer"
            >
              <option value="BSI">BSI (Tabungan Utama Operasional)</option>
              <option value="BCA">BCA (Hasil Usaha Dapur Qori)</option>
              <option value="Jago Syariah">Jago Syariah (Kantong Khusus)</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-on-surface-variant block mb-1">
              Catatan Doa / Niat
            </label>
            <input
              type="text"
              placeholder="Mis: Tabungan berkah bulanan untuk biaya masuk pesantren"
              value={depositNote}
              onChange={(e) => setDepositNote(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-surface-container-high bg-surface-container-low/40 focus:ring-2 focus:ring-primary/20 outline-none"
            />
          </div>

          <div className="flex items-center gap-2 pt-2 border-t border-surface-container-low">
            <button
              type="button"
              onClick={() => setSelectedChildForDeposit(null)}
              className="flex-1 py-2.5 rounded-xl bg-surface-container-low text-on-surface-variant text-xs font-semibold hover:bg-surface-container transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl bg-primary text-on-primary text-xs font-semibold hover:bg-primary-container transition-colors shadow-sm flex items-center justify-center gap-1.5 cursor-pointer font-display"
            >
              <span className="material-symbols-outlined !text-[16px]">check</span>
              <span>Konfirmasi Setor</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
