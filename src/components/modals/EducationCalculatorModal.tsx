import React, { useState } from 'react';
import { useFinance } from '../../context/FinanceContext';

export const EducationCalculatorModal: React.FC = () => {
  const { isEducationCalculatorOpen, setIsEducationCalculatorOpen } = useFinance();

  const [level, setLevel] = useState('SMP & Pesantren Unggulan');
  const [currentCost, setCurrentCost] = useState('45000000');
  const [years, setYears] = useState('3');
  const [inflationRate, setInflationRate] = useState('10');
  const [goldPrice, setGoldPrice] = useState('1300000');

  if (!isEducationCalculatorOpen) return null;

  const costNum = parseInt(currentCost.replace(/\D/g, ''), 10) || 45000000;
  const yearsNum = parseInt(years, 10) || 1;
  const rateNum = (parseFloat(inflationRate) || 10) / 100;
  const goldPriceNum = parseInt(goldPrice.replace(/\D/g, ''), 10) || 1300000;

  // Future Value Formula: FV = PV * (1 + r)^n
  const futureCost = Math.round(costNum * Math.pow(1 + rateNum, yearsNum));
  const totalMonths = yearsNum * 12;
  const monthlySavingsNeeded = Math.round(futureCost / totalMonths);
  const goldGramsNeeded = Math.round(futureCost / goldPriceNum);
  const goldGramsPerYear = (goldGramsNeeded / yearsNum).toFixed(1);

  const formatIDR = (val: number) => `Rp ${val.toLocaleString('id-ID')}`;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest w-full max-w-lg rounded-t-3xl sm:rounded-2xl p-5 shadow-2xl border border-surface-container-low flex flex-col gap-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-surface-container-low">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-tertiary-fixed flex items-center justify-center text-tertiary">
              <span className="material-symbols-outlined !text-[20px]">calculate</span>
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-on-surface">
                Kalkulator Biaya Pendidikan Syariah
              </h3>
              <p className="text-xs text-on-surface-variant">
                Simulasi inflasi biaya sekolah &amp; strategi lindung nilai emas
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsEducationCalculatorOpen(false)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low cursor-pointer"
          >
            <span className="material-symbols-outlined !text-[20px]">close</span>
          </button>
        </div>

        {/* Form Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div>
            <label className="font-semibold text-on-surface-variant block mb-1">
              Jenjang / Target Studi
            </label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-surface-container-high bg-surface-container-low/40 focus:ring-2 focus:ring-primary/20 outline-none cursor-pointer"
            >
              <option value="SD Islam Terpadu">SD Islam Terpadu (SDIT)</option>
              <option value="SMP & Pesantren Unggulan">SMP &amp; Pesantren Unggulan</option>
              <option value="SMA / Madrasah Aliyah">SMA / Madrasah Aliyah Favorit</option>
              <option value="Perguruan Tinggi / Universitas">Universitas &amp; Kedokteran</option>
            </select>
          </div>

          <div>
            <label className="font-semibold text-on-surface-variant block mb-1">
              Jangka Waktu (Tahun)
            </label>
            <div className="flex items-center gap-1.5">
              {[1, 3, 5, 10, 15].map((y) => (
                <button
                  type="button"
                  key={y}
                  onClick={() => setYears(y.toString())}
                  className={`flex-1 py-2 rounded-xl text-center font-bold transition-all cursor-pointer ${
                    years === y.toString()
                      ? 'bg-primary text-on-primary shadow-xs'
                      : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
                  }`}
                >
                  {y}th
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="font-semibold text-on-surface-variant block mb-1">
              Estimasi Biaya Saat Ini (Rp)
            </label>
            <input
              type="number"
              value={currentCost}
              onChange={(e) => setCurrentCost(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-surface-container-high bg-surface-container-low/40 focus:ring-2 focus:ring-primary/20 outline-none tabular-nums font-semibold"
            />
          </div>

          <div>
            <label className="font-semibold text-on-surface-variant block mb-1">
              Asumsi Inflasi Pendidikan (% / thn)
            </label>
            <input
              type="number"
              value={inflationRate}
              onChange={(e) => setInflationRate(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-surface-container-high bg-surface-container-low/40 focus:ring-2 focus:ring-primary/20 outline-none tabular-nums font-semibold"
            />
          </div>
        </div>

        {/* Results Banner */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-secondary-container/60 via-surface-container-low to-secondary-container/30 border border-secondary-container/50 flex flex-col gap-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-on-surface-variant">
              Proyeksi Biaya Masa Depan ({yearsNum} Tahun Lagi)
            </span>
            <span className="font-label-sm px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold">
              Inflasi +{inflationRate}% / thn
            </span>
          </div>

          <div className="font-display font-bold text-2xl text-primary tabular-nums">
            {formatIDR(futureCost)}
          </div>

          {/* Strategy pills */}
          <div className="grid grid-cols-2 gap-2 pt-1 border-t border-secondary-container/50 text-xs">
            <div className="p-2.5 rounded-xl bg-surface-container-lowest shadow-xs flex flex-col">
              <span className="text-[11px] text-on-surface-variant">Rekomendasi Nabung Bulanan</span>
              <span className="font-bold text-on-surface text-sm tabular-nums mt-0.5">
                {formatIDR(monthlySavingsNeeded)} / bln
              </span>
              <span className="text-[10px] text-secondary mt-0.5 font-medium">Auto-debit Mudharabah</span>
            </div>

            <div className="p-2.5 rounded-xl bg-surface-container-lowest shadow-xs flex flex-col">
              <span className="text-[11px] text-on-surface-variant">Strategi Emas Batangan</span>
              <span className="font-bold text-tertiary text-sm tabular-nums mt-0.5">
                {goldGramsNeeded} Gram Total
              </span>
              <span className="text-[10px] text-on-surface-variant mt-0.5">
                ~{goldGramsPerYear}g emas / tahun
              </span>
            </div>
          </div>
        </div>

        {/* Sharia Insight Note */}
        <div className="p-3 rounded-xl bg-surface-container-low text-xs flex items-center gap-2 border border-surface-container-low">
          <span className="material-symbols-outlined text-primary !text-[20px] shrink-0">
            verified
          </span>
          <p className="text-on-surface-variant leading-relaxed">
            Menyimpan dana pendidikan dalam kombinasi <strong>Logam Mulia Fisik (Antam)</strong> dan{' '}
            <strong>Sukuk Ritel Syariah</strong> terbukti mengimbangi kenaikan inflasi sekolah hingga 10-15% per tahun.
          </p>
        </div>

        <div className="flex items-center gap-2 pt-1 border-t border-surface-container-low">
          <button
            onClick={() => setIsEducationCalculatorOpen(false)}
            className="w-full py-2.5 rounded-xl bg-primary text-on-primary text-xs font-semibold hover:bg-primary-container transition-colors shadow-sm cursor-pointer"
          >
            Tutup Kalkulator
          </button>
        </div>
      </div>
    </div>
  );
};
