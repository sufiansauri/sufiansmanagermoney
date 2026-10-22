import React from 'react';
import { useFinance } from '../../context/FinanceContext';

export const SavingsScreen: React.FC = () => {
  const {
    childrenSavings,
    goldHolding,
    setSelectedChildForDeposit,
    setSelectedChildForPortfolio,
    setChildToEdit,
    setIsEducationCalculatorOpen,
    setIsGoldHistoryModalOpen,
    setIsNewSavingsModalOpen,
    setIsFamilyProfileModalOpen,
  } = useFinance();

  const formatIDR = (val: number) => `Rp ${val.toLocaleString('id-ID')}`;

  const totalSavings = childrenSavings.reduce((acc, c) => acc + c.currentAmount, 0);
  const totalTarget = childrenSavings.reduce((acc, c) => acc + c.targetAmount, 0);
  const totalPercentage = totalTarget > 0 ? ((totalSavings / totalTarget) * 100).toFixed(1) : '0';

  return (
    <div className="flex flex-col w-full px-4 pb-6 gap-5">
      {/* Top Title & Sharia Akad Banner */}
      <div className="flex flex-col pt-2">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary-container/70 w-fit mb-2 border border-secondary-container/80">
            <span className="material-symbols-outlined text-secondary !text-[16px]">verified_user</span>
            <span className="font-label-sm text-xs text-on-secondary-fixed-variant font-semibold">
              Akad Mudharabah &amp; Wadiah Syariah
            </span>
          </div>
          <button
            onClick={() => setIsFamilyProfileModalOpen(true)}
            className="text-primary hover:text-primary-container text-xs font-semibold flex items-center gap-1 cursor-pointer"
            title="Pengaturan profil & nama"
          >
            <span className="material-symbols-outlined !text-[16px]">settings</span>
            <span>Ubah Profil</span>
          </button>
        </div>
        <h2 className="font-display text-xl md:text-2xl font-bold text-on-surface tracking-tight">
          Tabungan &amp; Dana Pendidikan Anak
        </h2>
        <p className="font-body-md text-xs md:text-sm text-on-surface-variant mt-0.5">
          Menyiapkan masa depan buah hati dengan akad syariah yang berkah
        </p>
      </div>

      {/* Hero Card: Total Portofolio Buah Hati */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary-container to-secondary p-5 text-on-primary shadow-md">
        <div className="absolute -right-6 -bottom-8 opacity-10 pointer-events-none">
          <span className="material-symbols-outlined !text-[140px]">savings</span>
        </div>
        <div className="relative z-10 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-xs text-on-primary-container uppercase tracking-wider font-semibold">
              Total Portofolio {childrenSavings.length} Buah Hati
            </span>
            <span className="px-2 py-0.5 rounded-full bg-surface-container-lowest/20 backdrop-blur-md text-on-primary font-label-sm text-xs flex items-center gap-1">
              <span className="material-symbols-outlined !text-[14px]">trending_up</span> +Rp 2.100.000 bln ini
            </span>
          </div>

          <div className="flex flex-col">
            <span className="font-display font-bold text-2xl md:text-3xl tracking-tight tabular-nums text-white">
              {formatIDR(totalSavings)}
            </span>
            <span className="font-body-sm text-xs text-on-primary-container mt-0.5">
              Target Total Pendidikan: {formatIDR(totalTarget)}
            </span>
          </div>

          <div className="flex flex-col gap-1.5 pt-1">
            <div className="flex justify-between items-center text-on-primary-container text-xs">
              <span className="font-label-sm">Akumulasi Target Tercapai</span>
              <span className="font-label-md font-bold text-on-primary tabular-nums">
                {totalPercentage}%
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-on-primary/20 overflow-hidden">
              <div
                className="h-full bg-secondary-fixed rounded-full transition-all duration-700 ease-out"
                style={{ width: `${Math.min(parseFloat(totalPercentage), 100)}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* 2 Metric Badges */}
      <div className="grid grid-cols-2 gap-2.5">
        <div className="flex flex-col p-3.5 rounded-xl bg-surface-container-lowest shadow-sm gap-1 border border-surface-container-low">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-secondary-fixed/50 flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined !text-[16px]">sync</span>
            </div>
            <span className="font-label-sm text-xs text-on-surface-variant font-medium">Auto-Debet</span>
          </div>
          <span className="font-headline-sm text-sm md:text-base font-bold text-on-surface mt-1 tabular-nums">
            Rp 2.100.000
          </span>
          <span className="font-body-sm text-xs text-on-surface-variant">Rutin tgl 25 / bln</span>
        </div>

        <div className="flex flex-col p-3.5 rounded-xl bg-surface-container-lowest shadow-sm gap-1 border border-surface-container-low">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-tertiary-fixed/60 flex items-center justify-center text-tertiary">
              <span className="material-symbols-outlined !text-[16px]">stars</span>
            </div>
            <span className="font-label-sm text-xs text-on-surface-variant font-medium">Logam Mulia</span>
          </div>
          <span className="font-headline-sm text-sm md:text-base font-bold text-on-surface mt-1">
            {goldHolding.totalGrams} Gram
          </span>
          <span className="font-body-sm text-xs text-secondary font-semibold">
            {goldHolding.growthYoY}
          </span>
        </div>
      </div>

      {/* Children Section Header */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <h3 className="font-headline-sm text-base font-bold text-on-surface">
            Pos Tabungan Buah Hati
          </h3>
          <p className="font-body-sm text-xs text-on-surface-variant">
            Portofolio khusus per anak sesuai jenjang studi
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="px-2.5 py-1 rounded-full bg-surface-container text-primary font-label-sm text-xs font-semibold">
            {childrenSavings.length} Pos
          </span>
        </div>
      </div>

      {/* Children Cards List */}
      <div className="flex flex-col gap-3.5">
        {childrenSavings.map((child, index) => (
          <div
            key={child.id}
            className="flex flex-col rounded-2xl bg-surface-container-lowest shadow-sm overflow-hidden transition-all border border-surface-container-low"
          >
            <div className="p-4 flex flex-col gap-3">
              {/* Header inside Child Card */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      className="w-12 h-12 rounded-full object-cover shadow-xs border border-surface-container"
                      alt={child.name}
                      src={child.photoUrl}
                    />
                    <div
                      className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-on-primary ${
                        index % 3 === 0
                          ? 'bg-primary'
                          : index % 3 === 1
                          ? 'bg-secondary'
                          : 'bg-tertiary'
                      }`}
                    >
                      <span className="font-label-sm text-[10px] font-bold text-white">
                        {index + 1}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <span className="font-headline-sm text-sm font-bold text-on-surface">
                        {child.name}
                      </span>
                      <button
                        onClick={() => setChildToEdit(child)}
                        className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                        title="Edit data anak"
                      >
                        <span className="material-symbols-outlined !text-[15px]">edit</span>
                      </button>
                    </div>
                    <span className="font-body-sm text-xs text-on-surface-variant">
                      {child.age} • {child.level}
                    </span>
                  </div>
                </div>

                <span
                  className={`px-2.5 py-1 rounded-full font-label-sm text-xs font-semibold flex items-center gap-1 ${child.statusBadgeClass}`}
                >
                  {child.statusBadge === 'Hampir Lunas' && (
                    <span className="material-symbols-outlined !text-[14px]">bolt</span>
                  )}
                  {child.statusBadge}
                </span>
              </div>

              {/* Progress Box */}
              <div className="p-3 rounded-xl bg-surface-container-low flex flex-col gap-1.5 border border-surface-container-low">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-label-sm text-on-surface-variant truncate">Target: {child.targetName}</span>
                  <span
                    className={`font-label-sm font-bold ${
                      index % 3 === 0
                        ? 'text-primary'
                        : index % 3 === 1
                        ? 'text-secondary'
                        : 'text-tertiary'
                    }`}
                  >
                    {child.percentage}%
                  </span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="font-headline-sm text-sm md:text-base text-on-surface font-bold tabular-nums">
                    {formatIDR(child.currentAmount)}
                  </span>
                  <span className="font-body-sm text-xs text-on-surface-variant tabular-nums">
                    dari {formatIDR(child.targetAmount)}
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-surface-container-highest overflow-hidden mt-1">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ease-out ${child.progressColorClass}`}
                    style={{ width: `${Math.min(child.percentage, 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* Asset Allocation & Monthly Deposit */}
              <div className="grid grid-cols-2 gap-2 text-on-surface-variant font-body-sm text-xs">
                <div className="flex items-center gap-1.5 truncate">
                  <span
                    className={`material-symbols-outlined !text-[18px] ${
                      index % 3 === 0 ? 'text-tertiary' : 'text-secondary'
                    }`}
                  >
                    {child.iconAsset}
                  </span>
                  <span className="truncate">{child.assetDistribution}</span>
                </div>
                <div className="flex items-center gap-1.5 justify-end">
                  <span className="material-symbols-outlined text-secondary !text-[18px]">
                    calendar_month
                  </span>
                  <span className="truncate">{child.depositDateInfo}</span>
                </div>
              </div>

              {/* Dual Action Buttons */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => setSelectedChildForPortfolio(child)}
                  className="flex-1 py-2.5 px-3 rounded-lg bg-surface-container text-on-surface font-label-md text-xs font-semibold flex items-center justify-center gap-1 hover:bg-surface-container-high active:scale-95 transition-all cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined !text-[18px]">analytics</span>
                  <span>Portofolio</span>
                </button>
                <button
                  onClick={() => setSelectedChildForDeposit(child)}
                  className="flex-1 py-2.5 px-3 rounded-lg bg-primary text-on-primary font-label-md text-xs font-semibold flex items-center justify-center gap-1 shadow-sm hover:bg-primary-container active:scale-95 transition-all cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined !text-[18px]">add</span>
                  <span>Setoran</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Simpanan Logam Mulia Fisik Card */}
      <div className="flex flex-col p-4 rounded-2xl bg-surface-container-lowest shadow-sm gap-3 border border-surface-container-low">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-tertiary-fixed/60 flex items-center justify-center text-tertiary">
              <span className="material-symbols-outlined !text-[18px]">hevc</span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-lg text-xs md:text-sm font-bold text-on-surface">
                Simpanan Logam Mulia Fisik
              </span>
              <span className="font-body-sm text-[11px] text-on-surface-variant">
                Lindung nilai inflasi pendidikan
              </span>
            </div>
          </div>
          <span className="font-label-sm text-xs font-bold text-secondary bg-secondary-fixed/50 px-2 py-0.5 rounded-full">
            {goldHolding.growthYoY}
          </span>
        </div>

        <div className="p-3 rounded-xl bg-surface-container-low flex items-center justify-between border border-surface-container-low">
          <div className="flex flex-col">
            <span className="font-label-sm text-xs text-on-surface-variant">Total Cadangan Emas</span>
            <span className="font-headline-sm text-xs md:text-sm font-bold text-on-surface">
              {goldHolding.totalGrams} Gram ({goldHolding.certType})
            </span>
          </div>
          <div className="flex flex-col text-right">
            <span className="font-label-sm text-xs text-on-surface-variant">Estimasi Nilai Pasar</span>
            <span className="font-headline-sm text-xs md:text-sm font-bold text-primary tabular-nums">
              {formatIDR(goldHolding.totalMarketValue)}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between text-on-surface-variant font-body-sm text-xs pt-0.5">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined !text-[16px] text-primary">lock</span>
            <span>{goldHolding.storageLocation}</span>
          </span>
          <button
            onClick={() => setIsGoldHistoryModalOpen(true)}
            className="text-primary font-label-md text-xs font-semibold flex items-center gap-0.5 hover:underline cursor-pointer"
            type="button"
          >
            <span>Lihat Riwayat Emas</span>
            <span className="material-symbols-outlined !text-[16px]">chevron_right</span>
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2.5 pt-1">
        <button
          onClick={() => setIsNewSavingsModalOpen(true)}
          className="w-full py-3.5 px-4 rounded-xl bg-primary text-on-primary font-label-lg text-xs md:text-sm font-semibold flex items-center justify-center gap-2 shadow-sm hover:bg-primary-container active:scale-[0.98] transition-all cursor-pointer"
          type="button"
        >
          <span className="material-symbols-outlined !text-[20px]">add_circle</span>
          <span>+ Buat Pos Tabungan Baru</span>
        </button>

        <button
          onClick={() => setIsEducationCalculatorOpen(true)}
          className="w-full py-3 px-4 rounded-xl bg-surface-container text-on-surface font-label-lg text-xs md:text-sm font-semibold flex items-center justify-center gap-2 hover:bg-surface-container-high active:scale-[0.98] transition-all cursor-pointer"
          type="button"
        >
          <span className="material-symbols-outlined !text-[20px] text-tertiary">calculate</span>
          <span>Kalkulator Biaya Pendidikan Syariah</span>
        </button>
      </div>
    </div>
  );
};
