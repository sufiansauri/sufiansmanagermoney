import React, { useState } from 'react';
import { useFinance } from '../../context/FinanceContext';

export const ReportsScreen: React.FC = () => {
  const {
    totalKas,
    totalPemasukan,
    totalPengeluaran,
    goldHolding,
    childrenSavings,
    selectedMonth,
  } = useFinance();

  const [activeSubTab, setActiveSubTab] = useState<'kesehatan' | 'zakat' | 'rekap'>('kesehatan');
  const [customZakatGoldPrice, setCustomZakatGoldPrice] = useState('1300000');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const formatIDR = (val: number) => `Rp ${val.toLocaleString('id-ID')}`;

  const totalChildSavings = childrenSavings.reduce((acc, c) => acc + c.currentAmount, 0);
  const totalNetWealth = totalKas + goldHolding.totalMarketValue + totalChildSavings;

  // Zakat calculation
  const goldPriceNum = parseInt(customZakatGoldPrice.replace(/\D/g, ''), 10) || 1300000;
  const nisabThreshold = 85 * goldPriceNum; // 85 grams of gold
  const zakatEligibleAssets = totalKas + goldHolding.totalMarketValue;
  const isNisabReached = zakatEligibleAssets >= nisabThreshold;
  const zakatObligation = isNisabReached ? Math.round(zakatEligibleAssets * 0.025) : 0;

  const handleDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="flex flex-col w-full px-4 pb-6 gap-4">
      {/* Title */}
      <section className="flex flex-col gap-1 mt-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span
              className="material-symbols-outlined text-primary !text-[20px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              bar_chart
            </span>
            <h1 className="font-headline-sm text-base md:text-lg font-bold text-on-surface tracking-tight">
              Laporan Keuangan &amp; Zakat
            </h1>
          </div>
          <div className="flex items-center gap-1 bg-surface-container-low px-2.5 py-1 rounded-full text-on-surface-variant border border-surface-container-low">
            <span className="material-symbols-outlined !text-[16px] text-primary">calendar_today</span>
            <span className="font-label-sm text-xs font-semibold">{selectedMonth}</span>
          </div>
        </div>
        <p className="font-body-sm text-xs text-on-surface-variant">
          Audit transparansi kekayaan, rasio berkah, dan kewajiban zakat keluarga
        </p>
      </section>

      {/* Sub Tabs */}
      <div className="flex items-center gap-1.5 bg-surface-container-low p-1 rounded-xl">
        <button
          onClick={() => setActiveSubTab('kesehatan')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
            activeSubTab === 'kesehatan'
              ? 'bg-surface-container-lowest text-primary shadow-xs'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          Rasio Syariah
        </button>
        <button
          onClick={() => setActiveSubTab('zakat')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
            activeSubTab === 'zakat'
              ? 'bg-surface-container-lowest text-primary shadow-xs'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          Kalkulator Zakat
        </button>
        <button
          onClick={() => setActiveSubTab('rekap')}
          className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
            activeSubTab === 'rekap'
              ? 'bg-surface-container-lowest text-primary shadow-xs'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          Ekspor Laporan
        </button>
      </div>

      {/* Net Wealth Card */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-primary via-primary-container to-secondary text-on-primary shadow-sm relative overflow-hidden">
        <div className="flex items-center justify-between text-xs text-on-primary-container font-semibold uppercase tracking-wider mb-1">
          <span>Total Kekayaan Bersih Keluarga</span>
          <span className="px-2 py-0.5 rounded-full bg-white/20 text-white text-[11px]">Bebas Riba</span>
        </div>
        <div className="text-2xl md:text-3xl font-display font-bold text-white tabular-nums tracking-tight">
          {formatIDR(totalNetWealth)}
        </div>
        <div className="grid grid-cols-3 gap-2 pt-3 mt-3 border-t border-white/20 text-[11px]">
          <div>
            <span className="text-on-primary-container/80 block">Kas Bank</span>
            <span className="font-bold text-white tabular-nums">{formatIDR(totalKas)}</span>
          </div>
          <div>
            <span className="text-on-primary-container/80 block">Logam Mulia (45g)</span>
            <span className="font-bold text-white tabular-nums">{formatIDR(goldHolding.totalMarketValue)}</span>
          </div>
          <div>
            <span className="text-on-primary-container/80 block">Tabungan Anak</span>
            <span className="font-bold text-white tabular-nums">{formatIDR(totalChildSavings)}</span>
          </div>
        </div>
      </div>

      {/* TAB 1: RASIO SYARIAH */}
      {activeSubTab === 'kesehatan' && (
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-3.5 rounded-xl bg-surface-container-lowest shadow-sm border border-surface-container-low flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-on-surface-variant font-medium">Bebas Riba</span>
                  <span className="w-6 h-6 rounded-full bg-secondary-container text-secondary flex items-center justify-center">
                    <span className="material-symbols-outlined !text-[15px]">verified</span>
                  </span>
                </div>
                <div className="font-display font-bold text-xl text-primary">100%</div>
                <p className="text-[11px] text-on-surface-variant mt-0.5">Nol pinjaman ribawi &amp; kartu kredit bunga</p>
              </div>
              <span className="inline-block mt-2 px-2 py-0.5 bg-secondary-fixed text-on-secondary-fixed text-[10px] font-semibold rounded-full w-fit">
                Sesuai Syariat
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-surface-container-lowest shadow-sm border border-surface-container-low flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-on-surface-variant font-medium">Rasio Tabungan</span>
                  <span className="w-6 h-6 rounded-full bg-surface-container-high text-primary flex items-center justify-center">
                    <span className="material-symbols-outlined !text-[15px]">trending_up</span>
                  </span>
                </div>
                <div className="font-display font-bold text-xl text-primary">31.2%</div>
                <p className="text-[11px] text-on-surface-variant mt-0.5">Alokasi investasi &amp; pendidikan masa depan</p>
              </div>
              <span className="inline-block mt-2 px-2 py-0.5 bg-secondary-container text-on-secondary-fixed-variant text-[10px] font-semibold rounded-full w-fit">
                Target &ge;20% Tercapai
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-surface-container-lowest shadow-sm border border-surface-container-low flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-on-surface-variant font-medium">Rasio Kebajikan (ZIS)</span>
                  <span className="w-6 h-6 rounded-full bg-tertiary-fixed text-tertiary flex items-center justify-center">
                    <span className="material-symbols-outlined !text-[15px]">volunteer_activism</span>
                  </span>
                </div>
                <div className="font-display font-bold text-xl text-tertiary">7.8%</div>
                <p className="text-[11px] text-on-surface-variant mt-0.5">Zakat penghasilan, infaq subuh, sedekah yatim</p>
              </div>
              <span className="inline-block mt-2 px-2 py-0.5 bg-tertiary-fixed text-on-tertiary-fixed text-[10px] font-semibold rounded-full w-fit">
                Sangat Dermawan
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-surface-container-lowest shadow-sm border border-surface-container-low flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-on-surface-variant font-medium">Dana Darurat</span>
                  <span className="w-6 h-6 rounded-full bg-surface-container text-on-surface-variant flex items-center justify-center">
                    <span className="material-symbols-outlined !text-[15px]">shield</span>
                  </span>
                </div>
                <div className="font-display font-bold text-xl text-on-surface">6.2 Bulan</div>
                <p className="text-[11px] text-on-surface-variant mt-0.5">Simpanan likuid dalam Deposito Syariah BSI</p>
              </div>
              <span className="inline-block mt-2 px-2 py-0.5 bg-secondary-fixed text-on-secondary-fixed text-[10px] font-semibold rounded-full w-fit">
                Batas Aman Tercukupi
              </span>
            </div>
          </div>

          {/* Monthly Comparison */}
          <div className="p-4 rounded-xl bg-surface-container-lowest shadow-sm border border-surface-container-low flex flex-col gap-2.5">
            <h3 className="font-bold text-xs text-on-surface">Tren Arus Kas 4 Bulan Terakhir</h3>
            <div className="space-y-2 pt-1 text-xs">
              <div>
                <div className="flex justify-between text-on-surface-variant mb-1">
                  <span>Juli 2026</span>
                  <span className="font-semibold text-primary">+Rp 8.900.000 (Surplus)</span>
                </div>
                <div className="w-full bg-surface-container-low h-2 rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-on-surface-variant mb-1">
                  <span>Agustus 2026</span>
                  <span className="font-semibold text-primary">+Rp 9.400.000 (Surplus)</span>
                </div>
                <div className="w-full bg-surface-container-low h-2 rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: '70%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-on-surface-variant mb-1">
                  <span>September 2026</span>
                  <span className="font-semibold text-primary">+Rp 9.850.000 (Surplus)</span>
                </div>
                <div className="w-full bg-surface-container-low h-2 rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: '74%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-on-surface font-semibold mb-1">
                  <span>Oktober 2026 (Berjalan)</span>
                  <span className="text-secondary">+Rp 10.220.000 (Proyeksi)</span>
                </div>
                <div className="w-full bg-surface-container-low h-2 rounded-full overflow-hidden">
                  <div className="bg-secondary h-full rounded-full" style={{ width: '79%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: KALKULATOR ZAKAT MAAL */}
      {activeSubTab === 'zakat' && (
        <div className="flex flex-col gap-3">
          <div className="p-4 rounded-xl bg-surface-container-lowest shadow-sm border border-surface-container-low flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-tertiary !text-[22px]">balance</span>
              <div>
                <h3 className="font-bold text-sm text-on-surface">Simulasi &amp; Ketentuan Zakat Maal</h3>
                <p className="text-xs text-on-surface-variant">Nisab setara 85 gram emas murni dengan kepemilikan 1 tahun (haul)</p>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-on-surface-variant block mb-1">
                Estimasi Harga Emas Terkini (Rp / gram)
              </label>
              <input
                type="number"
                value={customZakatGoldPrice}
                onChange={(e) => setCustomZakatGoldPrice(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-surface-container-high bg-surface-container-low/40 focus:ring-2 focus:ring-primary/20 outline-none tabular-nums"
              />
            </div>

            <div className="p-3 rounded-xl bg-surface-container-low flex flex-col gap-2 text-xs border border-surface-container-low">
              <div className="flex justify-between items-center">
                <span className="text-on-surface-variant">Nisab Zakat Maal (85g Emas)</span>
                <span className="font-bold text-on-surface tabular-nums">{formatIDR(nisabThreshold)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-on-surface-variant">Harta Wajib Zakat (Kas + Emas)</span>
                <span className="font-bold text-primary tabular-nums">{formatIDR(zakatEligibleAssets)}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-surface-container-high/60">
                <span className="font-semibold text-on-surface">Status Kewajiban Zakat</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                    isNisabReached ? 'bg-secondary-fixed text-on-secondary-fixed' : 'bg-surface-container text-on-surface-variant'
                  }`}
                >
                  {isNisabReached ? 'Wajib Zakat (Mencapai Nisab)' : 'Belum Wajib'}
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-tertiary-fixed/30 border border-tertiary-fixed/60 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[11px] font-semibold text-tertiary">Kadar Zakat Maal (2.5%)</span>
                <span className="font-display font-bold text-lg text-tertiary tabular-nums">
                  {formatIDR(zakatObligation)}
                </span>
              </div>
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-fixed-variant text-xs font-bold">
                <span className="material-symbols-outlined !text-[16px]">verified</span>
                <span>Tersalurkan Rutin</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: EKSPOR LAPORAN */}
      {activeSubTab === 'rekap' && (
        <div className="flex flex-col gap-3">
          <div className="p-4 rounded-xl bg-surface-container-lowest shadow-sm border border-surface-container-low flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary !text-[22px]">download</span>
              <div>
                <h3 className="font-bold text-sm text-on-surface">Unduh &amp; Ekspor Rekap Keluarga</h3>
                <p className="text-xs text-on-surface-variant">Dokumen terstruktur untuk arsip keluarga sakinah</p>
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <div className="p-3 rounded-xl bg-surface-container-low flex items-center justify-between text-xs border border-surface-container-low">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-error !text-[22px]">picture_as_pdf</span>
                  <div>
                    <span className="font-bold text-on-surface block">Laporan Keuangan Bulanan ({selectedMonth})</span>
                    <span className="text-[11px] text-on-surface-variant">Lengkap dengan rincian per pos &amp; verifikasi syariah</span>
                  </div>
                </div>
                <button
                  onClick={handleDownload}
                  className="px-3 py-1.5 rounded-lg bg-primary text-on-primary text-xs font-semibold hover:bg-primary-container transition-colors cursor-pointer"
                >
                  Unduh PDF
                </button>
              </div>

              <div className="p-3 rounded-xl bg-surface-container-low flex items-center justify-between text-xs border border-surface-container-low">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary !text-[22px]">table_view</span>
                  <div>
                    <span className="font-bold text-on-surface block">Buku Kas &amp; Riwayat Transaksi (Excel / CSV)</span>
                    <span className="text-[11px] text-on-surface-variant">Format tabel mutasi untuk rekap pembukuan mandiri</span>
                  </div>
                </div>
                <button
                  onClick={handleDownload}
                  className="px-3 py-1.5 rounded-lg bg-secondary-container text-on-secondary-fixed-variant text-xs font-semibold hover:bg-secondary-fixed transition-colors cursor-pointer"
                >
                  Unduh XLS
                </button>
              </div>
            </div>

            {downloadSuccess && (
              <div className="p-3 rounded-xl bg-secondary-fixed/50 text-on-secondary-fixed-variant text-xs flex items-center gap-2 animate-in fade-in">
                <span className="material-symbols-outlined text-secondary !text-[18px]">check_circle</span>
                <span>Berkas laporan berhasil diekspor dan siap dicetak / dibagikan bersama pasangan.</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
