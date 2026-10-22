import React, { useState, useMemo } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { Transaction } from '../../types/finance';

export const TransactionsScreen: React.FC = () => {
  const { transactions, selectedMonth, deleteTransaction, familyProfile } = useFinance();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMember, setSelectedMember] = useState<'semua' | 'member1' | 'member2'>('semua');
  const [selectedCategory, setSelectedCategory] = useState<string>('semua');
  const [activeTransactionDetail, setActiveTransactionDetail] = useState<Transaction | null>(null);

  const formatIDR = (val: number) => `Rp ${val.toLocaleString('id-ID')}`;

  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      // Member filter
      if (selectedMember === 'member1' && tx.member !== familyProfile.member1.name && tx.member !== 'Ayah' && tx.member !== 'Sufian') {
        return false;
      }
      if (selectedMember === 'member2' && tx.member !== familyProfile.member2.name && tx.member !== 'Ibu' && tx.member !== 'Qori') {
        return false;
      }

      // Category filter
      if (selectedCategory === 'pengeluaran' && tx.type !== 'outflow') return false;
      if (selectedCategory === 'pemasukan' && tx.type !== 'inflow') return false;
      if (selectedCategory === 'transfer' && tx.type !== 'transfer') return false;
      if (selectedCategory === 'zakat' && tx.type !== 'zakat') return false;
      if (selectedCategory === 'bisnis' && !tx.category.toLowerCase().includes('bisnis')) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = tx.title.toLowerCase().includes(q);
        const matchSubtitle = tx.subtitle.toLowerCase().includes(q);
        const matchCategory = tx.category.toLowerCase().includes(q);
        const matchAccount = tx.account.toLowerCase().includes(q);
        const matchNotes = tx.notes ? tx.notes.toLowerCase().includes(q) : false;
        if (!matchTitle && !matchSubtitle && !matchCategory && !matchAccount && !matchNotes) {
          return false;
        }
      }

      return true;
    });
  }, [transactions, selectedMember, selectedCategory, searchQuery, familyProfile]);

  // Group transactions by date
  const groupedTransactions = useMemo(() => {
    const groups: { [key: string]: Transaction[] } = {};
    filteredTransactions.forEach((tx) => {
      const groupKey = tx.groupDate || tx.dateStr;
      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(tx);
    });
    return groups;
  }, [filteredTransactions]);

  const dateSubtotals: { [key: string]: string } = {
    'Hari Ini': '+Rp 380.000 netto',
    Kemarin: '-Rp 570.000',
    '18 Oktober 2026': '2 Transaksi',
    '15 Oktober 2026': '+Rp 4.000.000',
  };

  return (
    <div className="flex flex-col w-full pb-6">
      {/* Top Hero / Warm Monthly Flow Header Card */}
      <div className="px-4 pt-3 pb-2">
        <div className="relative overflow-hidden bg-surface-container-lowest rounded-xl shadow-[0_2px_12px_-2px_rgba(15,23,42,0.06),0_1px_4px_-1px_rgba(0,104,95,0.04)] p-4 border border-surface-container-low">
          <div className="absolute -right-6 -bottom-8 w-28 h-28 rounded-full bg-secondary-container/40 pointer-events-none blur-xl"></div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
                <span className="material-symbols-outlined !text-[16px]">account_balance_wallet</span>
              </div>
              <div>
                <span className="font-label-sm text-xs text-on-surface-variant">
                  Arus Kas Bersih ({selectedMonth})
                </span>
                <div className="font-headline-sm text-base md:text-lg text-primary flex items-baseline gap-1 font-bold">
                  <span>+Rp 10.220.000</span>
                  <span className="font-label-sm text-xs text-secondary font-medium">Alhamdulillah</span>
                </div>
              </div>
            </div>
            <div
              className="w-8 h-8 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant"
              title="Statistik Ringkas"
            >
              <span className="material-symbols-outlined !text-[18px]">insights</span>
            </div>
          </div>

          {/* Inflow vs Outflow Mini Pillars */}
          <div className="grid grid-cols-2 gap-2 pt-2 bg-surface-container-low/70 rounded-lg p-2.5">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-secondary-container flex items-center justify-center shrink-0 text-secondary">
                <span className="material-symbols-outlined !text-[18px]">arrow_downward_alt</span>
              </div>
              <div className="min-w-0">
                <p className="font-label-sm text-xs text-on-surface-variant truncate">Pemasukan</p>
                <p className="font-label-lg text-xs md:text-sm text-secondary font-semibold truncate tabular-nums">
                  +Rp 24.500.000
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-error-container flex items-center justify-center shrink-0 text-error">
                <span className="material-symbols-outlined !text-[18px]">arrow_upward_alt</span>
              </div>
              <div className="min-w-0">
                <p className="font-label-sm text-xs text-on-surface-variant truncate">Pengeluaran</p>
                <p className="font-label-lg text-xs md:text-sm text-error font-semibold truncate tabular-nums">
                  -Rp 14.280.000
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter Area */}
      <div className="px-4 pt-2 space-y-2.5">
        {/* Search Bar */}
        <div className="relative flex items-center">
          <span className="absolute left-3.5 text-on-surface-variant material-symbols-outlined !text-[20px] pointer-events-none">
            search
          </span>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface-container-lowest text-on-surface placeholder:text-outline text-sm rounded-xl pl-10 pr-10 py-2.5 shadow-[0_2px_8px_-2px_rgba(15,23,42,0.03)] outline-none focus:ring-2 focus:ring-primary/20 border border-surface-container-low transition-all"
            placeholder="Cari transaksi, toko, atau catatan..."
            type="text"
          />
          {searchQuery ? (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 w-7 h-7 flex items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container cursor-pointer"
            >
              <span className="material-symbols-outlined !text-[16px]">close</span>
            </button>
          ) : (
            <div
              className="absolute right-2.5 w-7 h-7 flex items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container"
              title="Filter Lanjutan"
            >
              <span className="material-symbols-outlined !text-[18px]">tune</span>
            </div>
          )}
        </div>

        {/* Family Member Contributor Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 no-scrollbar">
          <button
            onClick={() => setSelectedMember('semua')}
            className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm transition-transform active:scale-95 cursor-pointer ${
              selectedMember === 'semua'
                ? 'bg-primary text-on-primary'
                : 'bg-surface-container-lowest text-on-surface hover:bg-secondary-container/30 border border-surface-container-low'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined !text-[15px]">group</span>
            <span>Semua Anggota</span>
          </button>

          <button
            onClick={() => setSelectedMember('member1')}
            className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm transition-transform active:scale-95 cursor-pointer ${
              selectedMember === 'member1'
                ? 'bg-primary text-on-primary'
                : 'bg-surface-container-lowest text-on-surface hover:bg-secondary-container/30 border border-surface-container-low'
            }`}
            type="button"
          >
            <span className="w-4 h-4 rounded-full bg-surface-container-high flex items-center justify-center text-[10px]">
              {familyProfile.member1.emoji}
            </span>
            <span>{familyProfile.member1.name}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
          </button>

          <button
            onClick={() => setSelectedMember('member2')}
            className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm transition-transform active:scale-95 cursor-pointer ${
              selectedMember === 'member2'
                ? 'bg-primary text-on-primary'
                : 'bg-surface-container-lowest text-on-surface hover:bg-secondary-container/30 border border-surface-container-low'
            }`}
            type="button"
          >
            <span className="w-4 h-4 rounded-full bg-tertiary-fixed flex items-center justify-center text-[10px]">
              {familyProfile.member2.emoji}
            </span>
            <span>{familyProfile.member2.name}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
          </button>
        </div>

        {/* Category Type Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          <button
            onClick={() => setSelectedCategory('semua')}
            className={`shrink-0 px-3 py-1 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
              selectedCategory === 'semua'
                ? 'bg-secondary-container text-on-secondary-fixed-variant'
                : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
            }`}
            type="button"
          >
            Semua Kategori
          </button>
          <button
            onClick={() => setSelectedCategory('pengeluaran')}
            className={`shrink-0 px-3 py-1 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
              selectedCategory === 'pengeluaran'
                ? 'bg-secondary-container text-on-secondary-fixed-variant'
                : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
            }`}
            type="button"
          >
            💸 Pengeluaran
          </button>
          <button
            onClick={() => setSelectedCategory('pemasukan')}
            className={`shrink-0 px-3 py-1 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
              selectedCategory === 'pemasukan'
                ? 'bg-secondary-container text-on-secondary-fixed-variant'
                : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
            }`}
            type="button"
          >
            💰 Pemasukan
          </button>
          <button
            onClick={() => setSelectedCategory('transfer')}
            className={`shrink-0 px-3 py-1 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
              selectedCategory === 'transfer'
                ? 'bg-secondary-container text-on-secondary-fixed-variant'
                : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
            }`}
            type="button"
          >
            ⇄ Transfer
          </button>
          <button
            onClick={() => setSelectedCategory('zakat')}
            className={`shrink-0 px-3 py-1 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
              selectedCategory === 'zakat'
                ? 'bg-secondary-container text-on-secondary-fixed-variant'
                : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
            }`}
            type="button"
          >
            🤲 Zakat &amp; Infaq
          </button>
          <button
            onClick={() => setSelectedCategory('bisnis')}
            className={`shrink-0 px-3 py-1 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
              selectedCategory === 'bisnis'
                ? 'bg-secondary-container text-on-secondary-fixed-variant'
                : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
            }`}
            type="button"
          >
            🏪 Bisnis Sampingan
          </button>
        </div>
      </div>

      {/* Grouped Activity Feed */}
      <div className="px-4 pt-3 pb-8 space-y-4">
        {Object.keys(groupedTransactions).length === 0 ? (
          <div className="text-center py-12 bg-surface-container-lowest rounded-2xl border border-surface-container-low p-6">
            <span className="material-symbols-outlined !text-4xl text-on-surface-variant mb-2">
              receipt_long
            </span>
            <p className="font-semibold text-on-surface text-sm">Tidak ada transaksi ditemukan</p>
            <p className="text-xs text-on-surface-variant mt-1">
              Coba sesuaikan kata kunci pencarian atau filter anggota keluarga.
            </p>
          </div>
        ) : (
          Object.entries(groupedTransactions).map(([dateGroup, items]) => {
            const dateSubtotal = dateSubtotals[dateGroup] || `${items.length} Transaksi`;

            return (
              <div key={dateGroup} className="space-y-2">
                {/* Date Heading with Subtotal */}
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-primary"></span>
                    <h2 className="font-label-lg text-xs font-bold text-on-surface tracking-tight">
                      {dateGroup}
                    </h2>
                    <span className="font-label-sm text-xs text-on-surface-variant">
                      · {items[0]?.dateStr || selectedMonth}
                    </span>
                  </div>
                  <span className="font-label-sm text-xs text-secondary font-semibold">
                    {dateSubtotal}
                  </span>
                </div>

                {/* Transaction Items */}
                {items.map((tx) => {
                  const isOutflow = tx.type === 'outflow';
                  const isInflow = tx.type === 'inflow';
                  const isTransfer = tx.type === 'transfer';

                  const prefix = isOutflow ? '-' : isInflow ? '+' : isTransfer ? '⇄ ' : '-';
                  const amountClass = isOutflow
                    ? 'text-error'
                    : isInflow
                    ? 'text-secondary font-bold'
                    : isTransfer
                    ? 'text-primary'
                    : 'text-tertiary';

                  return (
                    <article
                      key={tx.id}
                      onClick={() => setActiveTransactionDetail(tx)}
                      className="bg-surface-container-lowest rounded-xl p-3 shadow-[0_2px_8px_-2px_rgba(15,23,42,0.03)] hover:shadow-md transition-shadow active:scale-[0.99] cursor-pointer border border-surface-container-low"
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${tx.iconBgColor || 'bg-surface-container text-primary'}`}
                        >
                          <span className="material-symbols-outlined !text-[20px]">{tx.iconName}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <h3 className="font-label-lg text-xs md:text-sm text-on-surface font-semibold truncate leading-snug">
                                {tx.title}
                              </h3>
                              <p className="font-body-sm text-xs text-on-surface-variant truncate">
                                {tx.subtitle}
                              </p>
                            </div>
                            <div className="text-right shrink-0">
                              <span className={`font-headline-sm text-xs md:text-sm font-bold leading-none block tabular-nums ${amountClass}`}>
                                {prefix}
                                {formatIDR(tx.amount)}
                              </span>
                              <span className="font-label-sm text-[10px] text-outline mt-0.5 block">
                                {tx.time}
                              </span>
                            </div>
                          </div>

                          {/* Metadata footer */}
                          <div className="flex items-center justify-between pt-2.5 mt-2 bg-surface-container-low/50 -mx-3 -mb-3 px-3 py-1.5 rounded-b-xl border-t border-surface-container-low/40">
                            <div className="flex items-center gap-1.5 overflow-hidden">
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-surface-container-high/60 text-on-surface-variant font-label-sm text-[11px] truncate">
                                {tx.category}
                              </span>
                              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-secondary-container/40 text-on-secondary-fixed-variant font-label-sm text-[11px]">
                                <span className="material-symbols-outlined !text-[12px]">credit_card</span>
                                {tx.account}
                              </span>
                              {tx.hasReceipt && (
                                <span
                                  className="material-symbols-outlined text-primary !text-[14px]"
                                  title="Ada struk belanja terlampir"
                                >
                                  receipt
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-1 shrink-0">
                              <span className="w-4 h-4 rounded-full bg-tertiary-fixed text-[9px] flex items-center justify-center shadow-xs">
                                {tx.member === familyProfile.member2.name || tx.member === 'Ibu'
                                  ? familyProfile.member2.emoji
                                  : tx.member === familyProfile.member1.name || tx.member === 'Ayah'
                                  ? familyProfile.member1.emoji
                                  : '🤝'}
                              </span>
                              <span className="font-label-sm text-xs text-on-surface-variant font-medium">
                                {tx.member}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            );
          })
        )}

        {/* Delightful Family Financial Note / Barakah Tip */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-secondary-container/50 via-surface-container-low to-secondary-container/30 flex items-center gap-3 border border-secondary-container/40">
          <div className="w-9 h-9 rounded-full bg-surface-container-lowest flex items-center justify-center shrink-0 text-primary shadow-xs">
            <span className="material-symbols-outlined !text-[20px]">auto_stories</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-label-md text-xs text-primary font-semibold">Pengingat Berkah Bersama</p>
            <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
              &ldquo;Keluarga yang saling transparan dalam rezeki diliputi kerukunan dan kemudahan.&rdquo;
            </p>
          </div>
        </div>
      </div>

      {/* Transaction Detail Drawer / Modal */}
      {activeTransactionDetail && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200">
          <div className="bg-surface-container-lowest w-full max-w-lg rounded-t-3xl sm:rounded-2xl p-5 shadow-2xl border border-surface-container-low flex flex-col gap-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b border-surface-container-low">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary !text-[24px]">
                  {activeTransactionDetail.iconName}
                </span>
                <span className="font-display font-bold text-base text-on-surface">Detail Transaksi</span>
              </div>
              <button
                onClick={() => setActiveTransactionDetail(null)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low cursor-pointer"
              >
                <span className="material-symbols-outlined !text-[20px]">close</span>
              </button>
            </div>

            <div className="text-center py-2 bg-surface-container-low/50 rounded-2xl">
              <span className="text-xs text-on-surface-variant font-medium">Nominal Transaksi</span>
              <div
                className={`text-2xl font-display font-bold tabular-nums mt-0.5 ${
                  activeTransactionDetail.type === 'outflow'
                    ? 'text-error'
                    : activeTransactionDetail.type === 'inflow'
                    ? 'text-secondary'
                    : 'text-primary'
                }`}
              >
                {activeTransactionDetail.type === 'outflow' ? '-' : '+'}
                {formatIDR(activeTransactionDetail.amount)}
              </div>
              <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-surface-container text-on-surface-variant mt-1.5">
                {activeTransactionDetail.category}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-surface-container-low/40 p-2.5 rounded-xl">
                <span className="text-on-surface-variant block text-[11px]">Judul Transaksi</span>
                <span className="font-semibold text-on-surface block mt-0.5">{activeTransactionDetail.title}</span>
              </div>
              <div className="bg-surface-container-low/40 p-2.5 rounded-xl">
                <span className="text-on-surface-variant block text-[11px]">Pencatat</span>
                <span className="font-semibold text-on-surface block mt-0.5">
                  {activeTransactionDetail.member} {activeTransactionDetail.memberRole ? `(${activeTransactionDetail.memberRole})` : ''}
                </span>
              </div>
              <div className="bg-surface-container-low/40 p-2.5 rounded-xl">
                <span className="text-on-surface-variant block text-[11px]">Tanggal &amp; Waktu</span>
                <span className="font-semibold text-on-surface block mt-0.5">
                  {activeTransactionDetail.dateStr} • {activeTransactionDetail.time}
                </span>
              </div>
              <div className="bg-surface-container-low/40 p-2.5 rounded-xl">
                <span className="text-on-surface-variant block text-[11px]">Sumber Rekening</span>
                <span className="font-semibold text-on-surface block mt-0.5">{activeTransactionDetail.account}</span>
              </div>
            </div>

            {activeTransactionDetail.notes && (
              <div className="bg-secondary-container/20 p-3 rounded-xl border border-secondary-container/30">
                <span className="text-[11px] font-semibold text-primary block">Catatan Tambahan</span>
                <p className="text-xs text-on-surface mt-1 leading-relaxed">
                  {activeTransactionDetail.notes}
                </p>
              </div>
            )}

            {activeTransactionDetail.hasReceipt && (
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-surface-container-low text-xs text-on-surface-variant">
                <span className="material-symbols-outlined text-primary !text-[18px]">receipt</span>
                <span>Struk fisik terverifikasi dan diarsipkan pada folder cloud keluarga.</span>
              </div>
            )}

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => {
                  deleteTransaction(activeTransactionDetail.id);
                  setActiveTransactionDetail(null);
                }}
                className="flex-1 py-2.5 px-3 rounded-xl bg-error-container text-error text-xs font-semibold hover:bg-error-container/80 transition-colors flex items-center justify-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined !text-[16px]">delete</span>
                <span>Hapus Transaksi</span>
              </button>
              <button
                onClick={() => setActiveTransactionDetail(null)}
                className="flex-1 py-2.5 px-3 rounded-xl bg-primary text-on-primary text-xs font-semibold hover:bg-primary-container transition-colors flex items-center justify-center gap-1 cursor-pointer shadow-sm"
              >
                <span className="material-symbols-outlined !text-[16px]">check</span>
                <span>Tutup</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
