import React, { useState, useEffect } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { TransactionType, BankAccount } from '../../types/finance';

export const RecordTransactionModal: React.FC = () => {
  const {
    isRecordModalOpen,
    setIsRecordModalOpen,
    recordModalInitialType,
    addTransaction,
    currentUser,
    familyProfile,
  } = useFinance();

  const [txType, setTxType] = useState<TransactionType>('outflow');
  const [amount, setAmount] = useState('');
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState('Belanja & Dapur');
  const [member, setMember] = useState<string>('Bersama');
  const [account, setAccount] = useState<BankAccount>('BSI Debit');
  const [notes, setNotes] = useState('');
  const [hasReceipt, setHasReceipt] = useState(false);

  useEffect(() => {
    if (recordModalInitialType) {
      setTxType(recordModalInitialType);
      if (recordModalInitialType === 'inflow') {
        setCategory('Bisnis Sampingan');
        setMember(familyProfile.member2.name);
      } else if (recordModalInitialType === 'zakat') {
        setCategory('Zakat & Infaq');
        setTitle('Sedekah Berkah');
        setMember(familyProfile.member1.name);
      } else if (recordModalInitialType === 'transfer') {
        setCategory('Transfer Internal');
        setTitle('Alokasi Tabungan');
        setMember('Bersama');
      }
    }
    if (currentUser) {
      setMember(currentUser);
    }
  }, [recordModalInitialType, currentUser, isRecordModalOpen, familyProfile]);

  if (!isRecordModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAmount = parseInt(amount.replace(/\D/g, ''), 10);
    if (!parsedAmount || parsedAmount <= 0) return;

    const finalTitle = title.trim() || (txType === 'inflow' ? 'Pemasukan Baru' : 'Pengeluaran Baru');
    const finalSubtitle = subtitle.trim() || `Transaksi ${category}`;

    const iconMap: { [key: string]: string } = {
      'Belanja & Dapur': 'shopping_cart',
      'Pendidikan Anak': 'school',
      'Zakat & Infaq': 'volunteer_activism',
      'Bisnis Sampingan': 'storefront',
      'Operasional & Utilitas': 'bolt',
      'Diri & Rekreasi': 'park',
      Transport: 'local_gas_station',
      'Bisnis & Freelance': 'laptop_mac',
      'Transfer Internal': 'swap_horiz',
    };

    const iconBgMap: { [key: string]: string } = {
      outflow: 'bg-error-container/60 text-error',
      inflow: 'bg-secondary-container text-secondary',
      transfer: 'bg-surface-container-high text-primary',
      zakat: 'bg-tertiary-fixed/60 text-tertiary',
    };

    const role =
      member === familyProfile.member1.name
        ? familyProfile.member1.role
        : member === familyProfile.member2.name
        ? familyProfile.member2.role
        : 'Bersama';

    addTransaction({
      title: finalTitle,
      subtitle: finalSubtitle,
      amount: parsedAmount,
      type: txType,
      member,
      memberRole: role,
      category,
      account,
      dateStr: '20 Okt 2026',
      groupDate: 'Hari Ini',
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
      hasReceipt,
      notes,
      iconName: iconMap[category] || 'payments',
      iconBgColor: iconBgMap[txType],
    });

    // Reset & close
    setAmount('');
    setTitle('');
    setSubtitle('');
    setNotes('');
    setHasReceipt(false);
    setIsRecordModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest w-full max-w-lg rounded-t-3xl sm:rounded-2xl p-5 shadow-2xl border border-surface-container-low flex flex-col gap-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-surface-container-low">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-primary">
              <span className="material-symbols-outlined !text-[20px]">add</span>
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-on-surface">Catat Transaksi Berkah</h3>
              <p className="text-[11px] text-on-surface-variant">Saling terbuka dan transparan dalam keuangan keluarga</p>
            </div>
          </div>
          <button
            onClick={() => setIsRecordModalOpen(false)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low cursor-pointer"
          >
            <span className="material-symbols-outlined !text-[20px]">close</span>
          </button>
        </div>

        {/* Transaction Type Segmented Switcher */}
        <div className="grid grid-cols-4 gap-1 p-1 bg-surface-container-low rounded-xl">
          <button
            type="button"
            onClick={() => setTxType('outflow')}
            className={`py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1 transition-all cursor-pointer ${
              txType === 'outflow'
                ? 'bg-error-container text-error shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined !text-[14px]">north_east</span>
            <span>Keluar</span>
          </button>

          <button
            type="button"
            onClick={() => setTxType('inflow')}
            className={`py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1 transition-all cursor-pointer ${
              txType === 'inflow'
                ? 'bg-secondary-container text-secondary font-bold shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined !text-[14px]">south_west</span>
            <span>Masuk</span>
          </button>

          <button
            type="button"
            onClick={() => setTxType('transfer')}
            className={`py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1 transition-all cursor-pointer ${
              txType === 'transfer'
                ? 'bg-surface-container-high text-primary font-bold shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined !text-[14px]">swap_horiz</span>
            <span>Transfer</span>
          </button>

          <button
            type="button"
            onClick={() => setTxType('zakat')}
            className={`py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1 transition-all cursor-pointer ${
              txType === 'zakat'
                ? 'bg-tertiary-fixed text-on-tertiary-fixed font-bold shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined !text-[14px]">volunteer_activism</span>
            <span>Zakat</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          {/* Amount input */}
          <div>
            <label className="text-xs font-semibold text-on-surface-variant block mb-1">
              Nominal Transaksi (Rp)
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-base font-bold text-on-surface-variant">Rp</span>
              <input
                type="number"
                required
                autoFocus
                placeholder="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-surface-container-high bg-surface-container-low/40 text-lg font-bold font-display text-on-surface focus:ring-2 focus:ring-primary/20 outline-none tabular-nums"
              />
            </div>
            {/* Quick chips */}
            <div className="flex items-center gap-1.5 mt-2 overflow-x-auto no-scrollbar">
              {[50000, 100000, 250000, 500000, 1000000].map((quickVal) => (
                <button
                  type="button"
                  key={quickVal}
                  onClick={() => setAmount(quickVal.toString())}
                  className="px-2.5 py-1 rounded-lg bg-surface-container-low text-[11px] font-semibold text-on-surface-variant hover:bg-surface-container cursor-pointer shrink-0"
                >
                  +{quickVal >= 1000000 ? `${quickVal / 1000000}jt` : `${quickVal / 1000}rb`}
                </button>
              ))}
            </div>
          </div>

          {/* Title & Subtitle */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label className="text-xs font-semibold text-on-surface-variant block mb-1">
                Judul / Toko / Keperluan
              </label>
              <input
                type="text"
                required
                placeholder="Mis: Supermarket Bahan Makanan"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-surface-container-high bg-surface-container-low/40 focus:ring-2 focus:ring-primary/20 outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-on-surface-variant block mb-1">
                Rincian Singkat
              </label>
              <input
                type="text"
                placeholder="Mis: Belanja kebutuhan pangan mingguan"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-surface-container-high bg-surface-container-low/40 focus:ring-2 focus:ring-primary/20 outline-none"
              />
            </div>
          </div>

          {/* Category & Member */}
          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="text-xs font-semibold text-on-surface-variant block mb-1">
                Kategori Pos
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-surface-container-high bg-surface-container-low/40 focus:ring-2 focus:ring-primary/20 outline-none cursor-pointer"
              >
                <option value="Belanja & Dapur">Belanja &amp; Dapur</option>
                <option value="Pendidikan Anak">Pendidikan Anak</option>
                <option value="Zakat & Infaq">Zakat &amp; Infaq</option>
                <option value="Bisnis Sampingan">Bisnis Sampingan</option>
                <option value="Operasional & Utilitas">Operasional &amp; Utilitas</option>
                <option value="Diri & Rekreasi">Diri &amp; Rekreasi</option>
                <option value="Transport">Transport</option>
                <option value="Bisnis & Freelance">Bisnis &amp; Freelance</option>
                <option value="Transfer Internal">Transfer Internal</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-on-surface-variant block mb-1">
                Dicatat Oleh
              </label>
              <select
                value={member}
                onChange={(e) => setMember(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-surface-container-high bg-surface-container-low/40 focus:ring-2 focus:ring-primary/20 outline-none cursor-pointer"
              >
                <option value={familyProfile.member2.name}>
                  {familyProfile.member2.emoji} {familyProfile.member2.name} ({familyProfile.member2.role})
                </option>
                <option value={familyProfile.member1.name}>
                  {familyProfile.member1.emoji} {familyProfile.member1.name} ({familyProfile.member1.role})
                </option>
                <option value="Bersama">🤝 Bersama</option>
              </select>
            </div>
          </div>

          {/* Account Source */}
          <div>
            <label className="text-xs font-semibold text-on-surface-variant block mb-1">
              Sumber Rekening / Metode
            </label>
            <select
              value={account}
              onChange={(e) => setAccount(e.target.value as BankAccount)}
              className="w-full text-xs p-2.5 rounded-xl border border-surface-container-high bg-surface-container-low/40 focus:ring-2 focus:ring-primary/20 outline-none cursor-pointer"
            >
              <option value="BSI Debit">BSI Debit (Operasional)</option>
              <option value="BSI">BSI (Tabungan Utama)</option>
              <option value="BCA">BCA (Hasil Usaha Mandiri)</option>
              <option value="Jago Syariah">Jago Syariah (Kantong Anak)</option>
              <option value="QRIS BSI">QRIS BSI</option>
              <option value="Kas Tunai">Dompet Tunai Fisik</option>
            </select>
          </div>

          {/* Receipt simulator toggle */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-surface-container-low/50 border border-surface-container-low">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary !text-[20px]">photo_camera</span>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-on-surface">Lampirkan Foto Struk</span>
                <span className="text-[10px] text-on-surface-variant">Arsipkan bukti transaksi ke cloud keluarga</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setHasReceipt(!hasReceipt)}
              className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                hasReceipt ? 'bg-primary' : 'bg-surface-container-high'
              }`}
            >
              <span
                className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                  hasReceipt ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Notes */}
          <div>
            <label className="text-xs font-semibold text-on-surface-variant block mb-1">
              Catatan Berkah (Opsional)
            </label>
            <textarea
              rows={2}
              placeholder="Tambahkan rincian untuk catatan bersama pasangan..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-surface-container-high bg-surface-container-low/40 focus:ring-2 focus:ring-primary/20 outline-none resize-none"
            />
          </div>

          {/* Submit */}
          <div className="flex items-center gap-2 pt-2 border-t border-surface-container-low">
            <button
              type="button"
              onClick={() => setIsRecordModalOpen(false)}
              className="flex-1 py-3 rounded-xl bg-surface-container-low text-on-surface-variant text-xs font-semibold hover:bg-surface-container transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-2 py-3 rounded-xl bg-primary text-on-primary text-xs font-semibold hover:bg-primary-container transition-colors shadow-sm flex items-center justify-center gap-1.5 cursor-pointer font-display"
            >
              <span className="material-symbols-outlined !text-[18px]">check</span>
              <span>Simpan Catatan Transaksi</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
