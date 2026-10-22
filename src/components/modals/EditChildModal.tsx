import React, { useState, useEffect } from 'react';
import { useFinance } from '../../context/FinanceContext';

export const EditChildModal: React.FC = () => {
  const { childToEdit, setChildToEdit, updateChildSavings, deleteChildSavings } = useFinance();

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [level, setLevel] = useState('');
  const [targetName, setTargetName] = useState('');
  const [currentAmount, setCurrentAmount] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [monthlyDeposit, setMonthlyDeposit] = useState('');
  const [statusBadge, setStatusBadge] = useState('Aktif');

  useEffect(() => {
    if (childToEdit) {
      setName(childToEdit.name);
      setAge(childToEdit.age);
      setLevel(childToEdit.level);
      setTargetName(childToEdit.targetName);
      setCurrentAmount(childToEdit.currentAmount.toString());
      setTargetAmount(childToEdit.targetAmount.toString());
      setMonthlyDeposit(childToEdit.monthlyDeposit.toString());
      setStatusBadge(childToEdit.statusBadge);
    }
  }, [childToEdit]);

  if (!childToEdit) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cur = parseInt(currentAmount.replace(/\D/g, ''), 10) || 0;
    const tgt = parseInt(targetAmount.replace(/\D/g, ''), 10) || 1000000;
    const dep = parseInt(monthlyDeposit.replace(/\D/g, ''), 10) || 500000;

    let badgeClass = 'bg-secondary-container text-on-secondary-fixed-variant';
    if (statusBadge === 'Hampir Lunas') {
      badgeClass = 'bg-secondary-fixed text-on-secondary-fixed font-bold';
    } else if (statusBadge === 'Awal Mulai') {
      badgeClass = 'bg-tertiary-fixed text-on-tertiary-fixed font-semibold';
    }

    updateChildSavings(childToEdit.id, {
      name: name.trim() || childToEdit.name,
      age: age.trim() || childToEdit.age,
      level: level.trim() || childToEdit.level,
      targetName: targetName.trim() || childToEdit.targetName,
      currentAmount: cur,
      targetAmount: tgt,
      monthlyDeposit: dep,
      depositDateInfo: `Rp ${dep.toLocaleString('id-ID')}/bln`,
      statusBadge,
      statusBadgeClass: badgeClass,
    });

    setChildToEdit(null);
  };

  const handleDelete = () => {
    if (window.confirm(`Hapus pos tabungan ${childToEdit.name}?`)) {
      deleteChildSavings(childToEdit.id);
      setChildToEdit(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest w-full max-w-md rounded-t-3xl sm:rounded-2xl p-5 shadow-2xl border border-surface-container-low flex flex-col gap-4 max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-2 border-b border-surface-container-low">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-primary">
              <span className="material-symbols-outlined !text-[20px]">edit</span>
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-on-surface">
                Ubah Data Pos Tabungan Buah Hati
              </h3>
              <p className="text-xs text-on-surface-variant">Sesuaikan nama, usia, dan target dana studi</p>
            </div>
          </div>
          <button
            onClick={() => setChildToEdit(null)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low cursor-pointer"
          >
            <span className="material-symbols-outlined !text-[20px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-xs">
          <div>
            <label className="font-semibold text-on-surface-variant block mb-1">
              Nama Buah Hati
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-surface-container-high bg-surface-container-low/40 focus:ring-1 focus:ring-primary outline-none font-semibold text-on-surface"
            />
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="font-semibold text-on-surface-variant block mb-1">Usia</label>
              <input
                type="text"
                placeholder="Mis: 9 Tahun"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-surface-container-high bg-surface-container-low/40 focus:ring-1 focus:ring-primary outline-none"
              />
            </div>
            <div>
              <label className="font-semibold text-on-surface-variant block mb-1">Kelas / Tingkat</label>
              <input
                type="text"
                placeholder="Mis: Kelas 4 SD"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-surface-container-high bg-surface-container-low/40 focus:ring-1 focus:ring-primary outline-none"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-on-surface-variant block mb-1">
              Target Institusi / Dana Studi
            </label>
            <input
              type="text"
              required
              value={targetName}
              onChange={(e) => setTargetName(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-surface-container-high bg-surface-container-low/40 focus:ring-1 focus:ring-primary outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="font-semibold text-on-surface-variant block mb-1">
                Saldo Terkumpul Saat Ini (Rp)
              </label>
              <input
                type="number"
                value={currentAmount}
                onChange={(e) => setCurrentAmount(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-surface-container-high bg-surface-container-low/40 focus:ring-1 focus:ring-primary outline-none tabular-nums font-bold"
              />
            </div>
            <div>
              <label className="font-semibold text-on-surface-variant block mb-1">
                Target Dana Total (Rp)
              </label>
              <input
                type="number"
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-surface-container-high bg-surface-container-low/40 focus:ring-1 focus:ring-primary outline-none tabular-nums font-bold text-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="font-semibold text-on-surface-variant block mb-1">
                Rencana Tabungan / Bln (Rp)
              </label>
              <input
                type="number"
                value={monthlyDeposit}
                onChange={(e) => setMonthlyDeposit(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-surface-container-high bg-surface-container-low/40 focus:ring-1 focus:ring-primary outline-none tabular-nums"
              />
            </div>
            <div>
              <label className="font-semibold text-on-surface-variant block mb-1">
                Status Capaian
              </label>
              <select
                value={statusBadge}
                onChange={(e) => setStatusBadge(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-surface-container-high bg-surface-container-low/40 focus:ring-1 focus:ring-primary outline-none cursor-pointer"
              >
                <option value="Aktif">Aktif</option>
                <option value="Hampir Lunas">Hampir Lunas</option>
                <option value="Awal Mulai">Awal Mulai</option>
                <option value="Tercapai">Tercapai 100%</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-surface-container-low">
            <button
              type="button"
              onClick={handleDelete}
              className="py-2.5 px-3 rounded-xl bg-error-container/40 text-error text-xs font-semibold hover:bg-error-container/80 transition-colors cursor-pointer"
            >
              Hapus Pos
            </button>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setChildToEdit(null)}
                className="py-2.5 px-3 rounded-xl bg-surface-container-low text-on-surface-variant text-xs font-semibold hover:bg-surface-container cursor-pointer"
              >
                Batal
              </button>
              <button
                type="submit"
                className="py-2.5 px-4 rounded-xl bg-primary text-on-primary text-xs font-semibold hover:bg-primary-container shadow-sm cursor-pointer"
              >
                Simpan
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
