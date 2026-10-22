import React from 'react';
import { useFinance } from '../../context/FinanceContext';

export const SyncLogModal: React.FC = () => {
  const { isSyncLogModalOpen, setIsSyncLogModalOpen, familyProfile } = useFinance();

  if (!isSyncLogModalOpen) return null;

  const logs = [
    {
      id: 'log-1',
      device: `Perangkat Utama (${familyProfile.member1.name})`,
      user: `${familyProfile.member1.name} (${familyProfile.member1.role})`,
      action: 'Sinkronisasi mutasi rekening operasional syariah',
      time: 'Hari ini, 16:42 WIB',
      status: 'Sukses',
    },
    {
      id: 'log-2',
      device: `Perangkat Pasangan (${familyProfile.member2.name})`,
      user: `${familyProfile.member2.name} (${familyProfile.member2.role})`,
      action: `Catat belanja pangan & pesanan ${familyProfile.businessName}`,
      time: 'Hari ini, 10:18 WIB',
      status: 'Sukses',
    },
    {
      id: 'log-3',
      device: 'Cloud Firestore Sync Engine',
      user: 'Sistem Terpadu',
      action: 'Validasi nisab zakat maal 85 gram emas',
      time: 'Kemarin, 23:59 WIB',
      status: 'Selesai',
    },
    {
      id: 'log-4',
      device: `Perangkat Utama (${familyProfile.member1.name})`,
      user: `${familyProfile.member1.name} (${familyProfile.member1.role})`,
      action: 'Update alokasi tabungan pendidikan anak',
      time: '18 Okt 2026, 11:05 WIB',
      status: 'Sukses',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest w-full max-w-md rounded-t-3xl sm:rounded-2xl p-5 shadow-2xl border border-surface-container-low flex flex-col gap-4 max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-2 border-b border-surface-container-low">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-primary">
              <span className="material-symbols-outlined !text-[20px]">sync</span>
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-on-surface">Log Sinkronisasi Keluarga</h3>
              <p className="text-xs text-on-surface-variant">Transparansi pencatatan {familyProfile.familyName}</p>
            </div>
          </div>
          <button
            onClick={() => setIsSyncLogModalOpen(false)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low cursor-pointer"
          >
            <span className="material-symbols-outlined !text-[20px]">close</span>
          </button>
        </div>

        <div className="space-y-2.5">
          {logs.map((l) => (
            <div
              key={l.id}
              className="p-3 rounded-xl bg-surface-container-low/70 border border-surface-container-low flex flex-col gap-1 text-xs"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-on-surface">{l.user}</span>
                <span className="text-[10px] text-secondary font-semibold bg-secondary-fixed/50 px-2 py-0.2 rounded-full">
                  {l.status}
                </span>
              </div>
              <p className="text-on-surface-variant leading-relaxed">{l.action}</p>
              <div className="flex items-center justify-between text-[11px] text-outline pt-1">
                <span>{l.device}</span>
                <span>{l.time}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 rounded-xl bg-secondary-container/30 border border-secondary-container/40 flex items-center gap-2 text-xs">
          <span className="material-symbols-outlined text-primary !text-[18px]">cloud_done</span>
          <span className="text-on-secondary-fixed-variant">
            Data tersinkron otomatis antar perangkat dengan enkripsi aman keluarga.
          </span>
        </div>

        <div className="flex items-center gap-2 pt-1 border-t border-surface-container-low">
          <button
            onClick={() => setIsSyncLogModalOpen(false)}
            className="w-full py-2.5 rounded-xl bg-primary text-on-primary text-xs font-semibold hover:bg-primary-container transition-colors shadow-sm cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
