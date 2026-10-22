import React, { useState } from 'react';
import { useFinance } from '../../context/FinanceContext';

export const DashboardScreen: React.FC = () => {
  const {
    totalKas,
    bankBalances,
    totalPemasukan,
    totalPengeluaran,
    transactions,
    setActiveTab,
    openRecordModalWithType,
    setIsBudgetAdjustModalOpen,
  } = useFinance();

  const [balanceViewMode, setBalanceViewMode] = useState<'semua' | 'harian'>('semua');

  // Format IDR helper
  const formatIDR = (val: number) => {
    return `Rp ${val.toLocaleString('id-ID')}`;
  };

  const recentTransactions = transactions.slice(0, 5);

  return (
    <div className="flex flex-col w-full pb-6">
      <div className="px-4 pt-3 pb-6 flex flex-col gap-5">
        {/* Hero Saldo Card (Teal Gradient Surface) */}
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary-container to-secondary p-5 text-on-primary shadow-[0_12px_28px_-6px_rgba(0,104,95,0.28)]">
          <div className="absolute -right-6 -bottom-8 w-36 h-36 rounded-full bg-primary-fixed-dim/15 blur-2xl pointer-events-none"></div>
          <div className="absolute -left-4 -top-6 w-28 h-28 rounded-full bg-secondary-fixed/20 blur-xl pointer-events-none"></div>

          {/* Top Row inside Balance Card */}
          <div className="relative z-10 flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-1.5">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-on-primary/15 text-primary-fixed">
                <span className="material-symbols-outlined !text-[15px]">account_balance_wallet</span>
              </span>
              <span className="font-label-sm text-[11px] text-on-primary-container tracking-wide uppercase font-semibold">
                Total Saldo Kas Bersih
              </span>
            </div>

            <div className="inline-flex p-0.5 rounded-full bg-on-primary/15 text-on-primary text-[11px] font-medium">
              <button
                onClick={() => setBalanceViewMode('semua')}
                className={`px-2.5 py-0.5 rounded-full transition-all cursor-pointer ${
                  balanceViewMode === 'semua'
                    ? 'bg-on-primary text-primary font-semibold shadow-sm'
                    : 'text-on-primary-container hover:text-on-primary'
                }`}
                type="button"
              >
                Semua
              </button>
              <button
                onClick={() => setBalanceViewMode('harian')}
                className={`px-2 py-0.5 rounded-full transition-all cursor-pointer ${
                  balanceViewMode === 'harian'
                    ? 'bg-on-primary text-primary font-semibold shadow-sm'
                    : 'text-on-primary-container hover:text-on-primary'
                }`}
                type="button"
              >
                Harian
              </button>
            </div>
          </div>

          {/* Main Balance Display */}
          <div className="relative z-10 flex flex-col gap-1 mb-4">
            <div className="flex items-baseline gap-2">
              <span className="font-display font-bold text-3xl md:text-4xl tracking-tight text-white tabular-nums">
                {balanceViewMode === 'semua' ? formatIDR(totalKas) : formatIDR(totalKas - 12000000)}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm text-xs font-semibold">
                <span className="material-symbols-outlined !text-[13px]">trending_up</span> +8.4%
              </span>
              <span className="font-body-sm text-xs text-on-primary-container/90">
                tumbuh vs September
              </span>
            </div>
          </div>

          {/* Bank Badges Horizontal Pill Strip */}
          <div className="relative z-10 pt-3 border-t border-on-primary/15 flex items-center gap-2 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-on-primary/10 backdrop-blur-md shrink-0">
              <span className="w-2 h-2 rounded-full bg-primary-fixed"></span>
              <span className="font-label-sm text-xs font-medium text-white/90">BSI:</span>
              <span className="font-label-sm text-xs font-bold text-primary-fixed tabular-nums">
                {formatIDR(bankBalances.bsi)}
              </span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-on-primary/10 backdrop-blur-md shrink-0">
              <span className="w-2 h-2 rounded-full bg-surface-variant"></span>
              <span className="font-label-sm text-xs font-medium text-white/90">BCA:</span>
              <span className="font-label-sm text-xs font-bold text-surface-container-highest tabular-nums">
                {formatIDR(bankBalances.bca)}
              </span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-on-primary/10 backdrop-blur-md shrink-0">
              <span className="w-2 h-2 rounded-full bg-tertiary-fixed"></span>
              <span className="font-label-sm text-xs font-medium text-white/90">Jago Syariah:</span>
              <span className="font-label-sm text-xs font-bold text-tertiary-fixed tabular-nums">
                {formatIDR(bankBalances.jago)}
              </span>
            </div>
          </div>
        </section>

        {/* Quick Action Launchpad */}
        <section className="grid grid-cols-4 gap-2">
          <button
            onClick={() => openRecordModalWithType('inflow')}
            className="flex flex-col items-center justify-center gap-1.5 p-2.5 rounded-2xl bg-surface-container-lowest text-on-surface shadow-[0_2px_8px_-2px_rgba(15,23,42,0.04)] active:scale-95 transition-all cursor-pointer hover:bg-secondary-container/20 border border-surface-container-low"
            type="button"
          >
            <div className="w-10 h-10 rounded-xl bg-secondary-container flex items-center justify-center text-primary">
              <span className="material-symbols-outlined !text-[22px]">south_west</span>
            </div>
            <span className="font-label-sm text-xs text-center font-medium">Masuk</span>
          </button>

          <button
            onClick={() => openRecordModalWithType('outflow')}
            className="flex flex-col items-center justify-center gap-1.5 p-2.5 rounded-2xl bg-surface-container-lowest text-on-surface shadow-[0_2px_8px_-2px_rgba(15,23,42,0.04)] active:scale-95 transition-all cursor-pointer hover:bg-error-container/20 border border-surface-container-low"
            type="button"
          >
            <div className="w-10 h-10 rounded-xl bg-error-container flex items-center justify-center text-error">
              <span className="material-symbols-outlined !text-[22px]">north_east</span>
            </div>
            <span className="font-label-sm text-xs text-center font-medium">Keluar</span>
          </button>

          <button
            onClick={() => openRecordModalWithType('transfer')}
            className="flex flex-col items-center justify-center gap-1.5 p-2.5 rounded-2xl bg-surface-container-lowest text-on-surface shadow-[0_2px_8px_-2px_rgba(15,23,42,0.04)] active:scale-95 transition-all cursor-pointer hover:bg-surface-container-high/40 border border-surface-container-low"
            type="button"
          >
            <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-on-surface-variant">
              <span className="material-symbols-outlined !text-[22px]">swap_horiz</span>
            </div>
            <span className="font-label-sm text-xs text-center font-medium">Transfer</span>
          </button>

          <button
            onClick={() => openRecordModalWithType('zakat')}
            className="flex flex-col items-center justify-center gap-1.5 p-2.5 rounded-2xl bg-surface-container-lowest text-on-surface shadow-[0_2px_8px_-2px_rgba(15,23,42,0.04)] active:scale-95 transition-all cursor-pointer hover:bg-tertiary-fixed/30 border border-surface-container-low"
            type="button"
          >
            <div className="w-10 h-10 rounded-xl bg-tertiary-fixed flex items-center justify-center text-tertiary">
              <span className="material-symbols-outlined !text-[22px]">volunteer_activism</span>
            </div>
            <span className="font-label-sm text-xs text-center font-medium">Zakat 2.5%</span>
          </button>
        </section>

        {/* Pemasukan vs Pengeluaran Split Metrics */}
        <section className="grid grid-cols-2 gap-3">
          {/* Inflow */}
          <div className="flex flex-col justify-between p-3.5 rounded-2xl bg-surface-container-lowest shadow-[0_2px_8px_-2px_rgba(15,23,42,0.04)] border border-surface-container-low">
            <div className="flex items-center justify-between mb-2">
              <span className="font-label-sm text-xs text-on-surface-variant font-medium">Pemasukan</span>
              <span className="w-7 h-7 rounded-full bg-secondary-container flex items-center justify-center text-primary">
                <span className="material-symbols-outlined !text-[16px]">arrow_downward</span>
              </span>
            </div>
            <div>
              <div className="font-display font-bold text-lg text-on-surface tracking-tight tabular-nums">
                {formatIDR(totalPemasukan)}
              </div>
              <p className="font-label-sm text-xs text-on-surface-variant mt-0.5 truncate">
                Gaji &amp; Usaha Makanan
              </p>
            </div>
          </div>

          {/* Outflow */}
          <div className="flex flex-col justify-between p-3.5 rounded-2xl bg-surface-container-lowest shadow-[0_2px_8px_-2px_rgba(15,23,42,0.04)] border border-surface-container-low">
            <div className="flex items-center justify-between mb-2">
              <span className="font-label-sm text-xs text-on-surface-variant font-medium">Pengeluaran</span>
              <span className="w-7 h-7 rounded-full bg-error-container flex items-center justify-center text-error">
                <span className="material-symbols-outlined !text-[16px]">arrow_upward</span>
              </span>
            </div>
            <div>
              <div className="font-display font-bold text-lg text-on-surface tracking-tight tabular-nums">
                {formatIDR(totalPengeluaran)}
              </div>
              <p className="font-label-sm text-xs text-on-surface-variant mt-0.5 truncate">
                Maks: Rp 18.000.000
              </p>
            </div>
          </div>
        </section>

        {/* Monthly Budget Health Bar */}
        <section className="p-4 rounded-2xl bg-surface-container-lowest shadow-[0_2px_8px_-2px_rgba(15,23,42,0.04)] flex flex-col gap-2.5 border border-surface-container-low">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-container opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
              </span>
              <span className="font-headline-sm text-sm font-semibold text-on-surface">
                Kesehatan Anggaran
              </span>
            </div>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-fixed-variant font-label-sm text-xs font-semibold">
              Sangat Sehat
            </span>
          </div>

          {/* Segmented Bar Visualization */}
          <div className="space-y-1.5">
            <div className="w-full h-2.5 bg-surface-container rounded-full overflow-hidden flex">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: '68%' }}
              ></div>
            </div>
            <div className="flex justify-between items-center text-on-surface-variant font-label-sm text-xs">
              <span>Pace 68% (Hari ke-20 dari 31)</span>
              <span className="font-semibold text-primary">Sisa Rp 3.720.000</span>
            </div>
          </div>
        </section>

        {/* Alokasi & Pos Rumah Tangga (Detailed Cards) */}
        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary !text-[20px]">category</span>
              <h2 className="font-headline-sm text-base font-bold text-on-surface">
                Alokasi &amp; Pos Rumah Tangga
              </h2>
            </div>
            <button
              onClick={() => setActiveTab('anggaran')}
              className="font-label-sm text-xs text-primary font-semibold hover:underline cursor-pointer"
              type="button"
            >
              Kelola Pos
            </button>
          </div>

          {/* Card 1: Belanja & Dapur */}
          <div className="p-4 rounded-2xl bg-surface-container-lowest shadow-[0_2px_8px_-2px_rgba(15,23,42,0.04)] flex flex-col gap-2.5 border border-surface-container-low">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-secondary-container flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined !text-[22px]">shopping_basket</span>
                </div>
                <div>
                  <h3 className="font-headline-sm text-sm font-semibold text-on-surface">
                    Belanja &amp; Dapur
                  </h3>
                  <p className="font-body-sm text-xs text-on-surface-variant">
                    Sembako, pasar mingguan &amp; utilitas
                  </p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm text-xs font-medium">
                Aman
              </span>
            </div>
            <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
              <div className="bg-primary h-full rounded-full" style={{ width: '77%' }}></div>
            </div>
            <div className="flex items-center justify-between font-label-sm text-xs">
              <span className="font-semibold text-on-surface">
                Rp 4.250.000 <span className="text-on-surface-variant font-normal">/ Rp 5.500.000</span>
              </span>
              <span className="text-on-surface-variant">Terpakai 77%</span>
            </div>
          </div>

          {/* Card 2: Pendidikan & Anak (3 Sub-Wallets) */}
          <div className="p-4 rounded-2xl bg-surface-container-lowest shadow-[0_2px_8px_-2px_rgba(15,23,42,0.04)] flex flex-col gap-3 border border-surface-container-low">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-on-surface">
                  <span className="material-symbols-outlined !text-[22px]">school</span>
                </div>
                <div>
                  <h3 className="font-headline-sm text-sm font-semibold text-on-surface">
                    Pendidikan 3 Anak
                  </h3>
                  <p className="font-body-sm text-xs text-on-surface-variant">
                    SPP, les privat &amp; gizi balita
                  </p>
                </div>
              </div>
              <span className="font-label-sm text-xs font-bold text-primary">
                Rp 3.500.000 Total
              </span>
            </div>
            <div className="flex flex-col gap-2 pt-1 border-t border-surface-container">
              {/* Abdussyakur */}
              <div className="flex items-center justify-between py-1">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-primary-fixed-dim/40 flex items-center justify-center text-primary font-bold text-xs">
                    A
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-sm text-xs font-semibold text-on-surface">
                      Abdussyakur
                    </span>
                    <span className="font-body-sm text-on-surface-variant text-[11px]">
                      SD Islam Terpadu
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-label-sm text-xs font-semibold text-on-surface">
                    Rp 1.800.000
                  </span>
                  <span className="font-body-sm text-on-surface-variant text-[11px] block">
                    / Rp 2.000.000
                  </span>
                </div>
              </div>

              {/* Ubay Ansor */}
              <div className="flex items-center justify-between py-1">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary font-bold text-xs">
                    U
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-sm text-xs font-semibold text-on-surface">
                      Ubay Ansor
                    </span>
                    <span className="font-body-sm text-on-surface-variant text-[11px]">
                      TK Al-Azhar
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-label-sm text-xs font-semibold text-on-surface">
                    Rp 950.000
                  </span>
                  <span className="font-body-sm text-on-surface-variant text-[11px] block">
                    / Rp 1.200.000
                  </span>
                </div>
              </div>

              {/* Sarah Shalihah */}
              <div className="flex items-center justify-between py-1">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-tertiary-fixed flex items-center justify-center text-tertiary font-bold text-xs">
                    S
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-sm text-xs font-semibold text-on-surface">
                      Sarah Shalihah
                    </span>
                    <span className="font-body-sm text-on-surface-variant text-[11px]">
                      Nutrisi &amp; Posyandu Balita
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-label-sm text-xs font-semibold text-on-surface">
                    Rp 750.000
                  </span>
                  <span className="font-body-sm text-on-surface-variant text-[11px] block">
                    / Rp 1.000.000
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Zakat, Infak & Sedekah (ZIS) */}
          <div className="p-4 rounded-2xl bg-surface-container-lowest shadow-[0_2px_8px_-2px_rgba(15,23,42,0.04)] flex flex-col gap-2.5 border border-surface-container-low">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-tertiary-fixed flex items-center justify-center text-tertiary">
                  <span className="material-symbols-outlined !text-[22px]">favorite</span>
                </div>
                <div>
                  <h3 className="font-headline-sm text-sm font-semibold text-on-surface">
                    Zakat &amp; Sedekah Maal
                  </h3>
                  <p className="font-body-sm text-xs text-on-surface-variant">
                    Nisab Emas 85g terpenuhi
                  </p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm text-xs font-semibold">
                Tuntas 100%
              </span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-surface-container-low">
              <div className="flex flex-col">
                <span className="font-label-sm text-xs text-on-surface-variant">
                  Kewajiban Zakat Maal (2.5%)
                </span>
                <span className="font-display font-bold text-base text-tertiary">
                  Rp 1.218.750
                </span>
              </div>
              <div className="flex items-center gap-1 text-primary font-label-sm text-xs font-semibold">
                <span className="material-symbols-outlined !text-[18px]">verified</span>
                <span>Tersalurkan</span>
              </div>
            </div>
          </div>

          {/* Card 4: Bisnis Dapur Qori & Server Sufian */}
          <div className="grid grid-cols-2 gap-3">
            {/* Bisnis Dapur Qori */}
            <div className="p-3.5 rounded-2xl bg-surface-container-lowest shadow-[0_2px_8px_-2px_rgba(15,23,42,0.04)] flex flex-col justify-between border border-surface-container-low">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-lg bg-secondary-container flex items-center justify-center text-secondary">
                    <span className="material-symbols-outlined !text-[16px]">bakery_dining</span>
                  </div>
                  <span className="font-label-sm text-xs font-bold text-on-surface">
                    Dapur Qori
                  </span>
                </div>
                <span className="font-body-sm text-xs text-on-surface-variant block">
                  Omset: Rp 8.4jt
                </span>
                <span className="font-headline-sm text-sm font-bold text-primary block mt-0.5">
                  +Rp 2.650.000
                </span>
              </div>
              <span className="font-label-sm text-[11px] text-secondary font-medium mt-2">
                Margin 31% Bersih
              </span>
            </div>

            {/* Hobi & Pengembangan Diri Sufian */}
            <div className="p-3.5 rounded-2xl bg-surface-container-lowest shadow-[0_2px_8px_-2px_rgba(15,23,42,0.04)] flex flex-col justify-between border border-surface-container-low">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-lg bg-surface-container flex items-center justify-center text-on-surface-variant">
                    <span className="material-symbols-outlined !text-[16px]">dns</span>
                  </div>
                  <span className="font-label-sm text-xs font-bold text-on-surface">
                    Server &amp; Edu
                  </span>
                </div>
                <span className="font-body-sm text-xs text-on-surface-variant block">
                  Budget: Rp 1.5jt
                </span>
                <span className="font-headline-sm text-sm font-bold text-on-surface block mt-0.5">
                  Rp 1.100.000
                </span>
              </div>
              <span className="font-label-sm text-[11px] text-on-surface-variant mt-2">
                Sisa Rp 400.000
              </span>
            </div>
          </div>
        </section>

        {/* Multi-User Activity Stream (Suami & Istri) */}
        <section className="flex flex-col gap-3 pt-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary !text-[20px]">history_edu</span>
              <h2 className="font-headline-sm text-base font-bold text-on-surface">
                Aktivitas Bersama Terkini
              </h2>
            </div>
            <button
              onClick={() => setActiveTab('transaksi')}
              className="font-label-sm text-xs text-primary font-semibold hover:underline cursor-pointer"
              type="button"
            >
              Lihat Semua
            </button>
          </div>

          <div className="flex flex-col rounded-2xl bg-surface-container-lowest shadow-[0_2px_8px_-2px_rgba(15,23,42,0.04)] overflow-hidden border border-surface-container-low">
            {recentTransactions.map((tx, idx) => {
              const isOutflow = tx.type === 'outflow';
              const isInflow = tx.type === 'inflow';
              const isTransfer = tx.type === 'transfer';
              const isZakat = tx.type === 'zakat';

              const prefix = isOutflow ? '-' : isInflow ? '+' : isTransfer ? '⇄ ' : '-';
              const amountClass = isOutflow
                ? 'text-error'
                : isInflow
                ? 'text-primary'
                : isTransfer
                ? 'text-primary'
                : 'text-tertiary';

              return (
                <div
                  key={tx.id}
                  onClick={() => setActiveTab('transaksi')}
                  className={`p-3.5 flex items-center justify-between hover:bg-surface-container-low/50 transition-colors cursor-pointer ${
                    idx < recentTransactions.length - 1 ? 'border-b border-surface-container-low' : ''
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${tx.iconBgColor || 'bg-surface-container text-primary'}`}
                    >
                      <span className="material-symbols-outlined !text-[20px]">{tx.iconName}</span>
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-label-md text-xs font-semibold text-on-surface truncate">
                        {tx.title}
                      </span>
                      <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-surface-container text-on-surface-variant font-label-sm text-[10px]">
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              tx.member === 'Qori'
                                ? 'bg-secondary'
                                : tx.member === 'Sufian'
                                ? 'bg-primary'
                                : 'bg-tertiary'
                            }`}
                          ></span>{' '}
                          {tx.member} {tx.memberRole ? `(${tx.memberRole})` : ''}
                        </span>
                        <span className="font-body-sm text-on-surface-variant text-[11px]">
                          • {tx.groupDate} {tx.time ? tx.time.slice(0, 5) : ''}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right shrink-0 pl-2">
                    <span className={`font-label-lg text-xs md:text-sm font-bold tabular-nums block ${amountClass}`}>
                      {prefix}
                      {formatIDR(tx.amount)}
                    </span>
                    <span className="font-label-sm text-[10px] text-on-surface-variant block">
                      {tx.account}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Warm Family Financial Affirmation Note */}
        <div className="p-3.5 rounded-2xl bg-secondary-container/30 flex items-center gap-3 border border-secondary-container/40">
          <div className="w-8 h-8 rounded-full bg-secondary-container text-primary flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined !text-[18px]">handshake</span>
          </div>
          <p className="font-body-sm text-xs text-on-secondary-fixed-variant leading-relaxed">
            &ldquo;Keluarga sakinah tumbuh dari rezeki halal yang teratur dan saling transparan.&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
};
