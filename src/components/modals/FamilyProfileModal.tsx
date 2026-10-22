import React, { useState, useEffect } from 'react';
import { useFinance } from '../../context/FinanceContext';

export const FamilyProfileModal: React.FC = () => {
  const {
    isFamilyProfileModalOpen,
    setIsFamilyProfileModalOpen,
    familyProfile,
    updateFamilyProfile,
    resetAllData,
  } = useFinance();

  const [familyName, setFamilyName] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [member1Name, setMember1Name] = useState('');
  const [member1Role, setMember1Role] = useState('');
  const [member1Emoji, setMember1Emoji] = useState('🧔');
  const [member2Name, setMember2Name] = useState('');
  const [member2Role, setMember2Role] = useState('');
  const [member2Emoji, setMember2Emoji] = useState('🧕');
  const [businessName, setBusinessName] = useState('');

  useEffect(() => {
    if (familyProfile) {
      setFamilyName(familyProfile.familyName);
      setSubTitle(familyProfile.subTitle);
      setMember1Name(familyProfile.member1.name);
      setMember1Role(familyProfile.member1.role);
      setMember1Emoji(familyProfile.member1.emoji);
      setMember2Name(familyProfile.member2.name);
      setMember2Role(familyProfile.member2.role);
      setMember2Emoji(familyProfile.member2.emoji);
      setBusinessName(familyProfile.businessName);
    }
  }, [familyProfile, isFamilyProfileModalOpen]);

  if (!isFamilyProfileModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFamilyProfile({
      familyName: familyName.trim() || 'Keluarga Berkah',
      subTitle: subTitle.trim() || 'Pencatatan Keuangan Syariah',
      member1: {
        id: 'member1',
        name: member1Name.trim() || 'Ayah',
        role: member1Role.trim() || 'Suami',
        emoji: member1Emoji || '🧔',
      },
      member2: {
        id: 'member2',
        name: member2Name.trim() || 'Ibu',
        role: member2Role.trim() || 'Istri',
        emoji: member2Emoji || '🧕',
      },
      businessName: businessName.trim() || 'Usaha Mandiri',
    });
    setIsFamilyProfileModalOpen(false);
  };

  const handleReset = () => {
    if (window.confirm('Apakah Anda yakin ingin mengatur ulang data ke data default umum?')) {
      resetAllData();
      setIsFamilyProfileModalOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest w-full max-w-lg rounded-t-3xl sm:rounded-2xl p-5 shadow-2xl border border-surface-container-low flex flex-col gap-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-surface-container-low">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-primary">
              <span className="material-symbols-outlined !text-[20px]">manage_accounts</span>
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-on-surface">
                Pengaturan Profil &amp; Nama Keluarga
              </h3>
              <p className="text-xs text-on-surface-variant">
                Sesuaikan nama keluarga dan anggota untuk penggunaan pribadi Anda
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsFamilyProfileModalOpen(false)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low cursor-pointer"
          >
            <span className="material-symbols-outlined !text-[20px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 text-xs">
          {/* Family Heading */}
          <div className="p-3 bg-surface-container-low/60 rounded-xl flex flex-col gap-2.5 border border-surface-container-low">
            <span className="font-bold text-on-surface text-xs flex items-center gap-1.5 text-primary">
              <span className="material-symbols-outlined !text-[16px]">home</span>
              Identitas Keluarga
            </span>
            <div>
              <label className="font-semibold text-on-surface-variant block mb-1">
                Nama Label Keluarga (Tampil di Header &amp; Laporan)
              </label>
              <input
                type="text"
                required
                placeholder="Mis: Keluarga Kami, Keluarga Barakah, dsb."
                value={familyName}
                onChange={(e) => setFamilyName(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-surface-container-high bg-white focus:ring-1 focus:ring-primary outline-none font-semibold text-on-surface"
              />
            </div>
            <div>
              <label className="font-semibold text-on-surface-variant block mb-1">
                Keterangan / Slogan Keluarga
              </label>
              <input
                type="text"
                placeholder="Mis: Keuangan Sakinah &amp; Berkah Syariah"
                value={subTitle}
                onChange={(e) => setSubTitle(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-surface-container-high bg-white focus:ring-1 focus:ring-primary outline-none"
              />
            </div>
          </div>

          {/* Member 1 (Suami / Ayah) */}
          <div className="p-3 bg-surface-container-low/60 rounded-xl flex flex-col gap-2.5 border border-surface-container-low">
            <span className="font-bold text-on-surface text-xs flex items-center gap-1.5 text-secondary">
              <span className="text-base">{member1Emoji}</span>
              Anggota 1 (Suami / Ayah / Pasangan 1)
            </span>
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2">
                <label className="font-semibold text-on-surface-variant block mb-1">
                  Nama Panggilan
                </label>
                <input
                  type="text"
                  required
                  placeholder="Mis: Ayah, Budi, dsb."
                  value={member1Name}
                  onChange={(e) => setMember1Name(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-surface-container-high bg-white focus:ring-1 focus:ring-primary outline-none font-semibold"
                />
              </div>
              <div>
                <label className="font-semibold text-on-surface-variant block mb-1">
                  Peran
                </label>
                <input
                  type="text"
                  placeholder="Suami"
                  value={member1Role}
                  onChange={(e) => setMember1Role(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-surface-container-high bg-white focus:ring-1 focus:ring-primary outline-none"
                />
              </div>
            </div>
          </div>

          {/* Member 2 (Istri / Ibu) */}
          <div className="p-3 bg-surface-container-low/60 rounded-xl flex flex-col gap-2.5 border border-surface-container-low">
            <span className="font-bold text-on-surface text-xs flex items-center gap-1.5 text-tertiary">
              <span className="text-base">{member2Emoji}</span>
              Anggota 2 (Istri / Ibu / Pasangan 2)
            </span>
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2">
                <label className="font-semibold text-on-surface-variant block mb-1">
                  Nama Panggilan
                </label>
                <input
                  type="text"
                  required
                  placeholder="Mis: Ibu, Siti, dsb."
                  value={member2Name}
                  onChange={(e) => setMember2Name(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-surface-container-high bg-white focus:ring-1 focus:ring-primary outline-none font-semibold"
                />
              </div>
              <div>
                <label className="font-semibold text-on-surface-variant block mb-1">
                  Peran
                </label>
                <input
                  type="text"
                  placeholder="Istri"
                  value={member2Role}
                  onChange={(e) => setMember2Role(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-surface-container-high bg-white focus:ring-1 focus:ring-primary outline-none"
                />
              </div>
            </div>
          </div>

          {/* Business / Side Venture Name */}
          <div className="p-3 bg-surface-container-low/60 rounded-xl flex flex-col gap-2 border border-surface-container-low">
            <span className="font-bold text-on-surface text-xs flex items-center gap-1.5 text-primary">
              <span className="material-symbols-outlined !text-[16px]">storefront</span>
              Nama Usaha Sampingan / Bisnis Keluarga
            </span>
            <input
              type="text"
              placeholder="Mis: Usaha Mandiri, Toko Berkah, Katering Keluarga"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-surface-container-high bg-white focus:ring-1 focus:ring-primary outline-none font-semibold"
            />
          </div>

          {/* Privacy Note */}
          <div className="p-3 rounded-xl bg-secondary-container/30 text-on-secondary-fixed-variant text-[11px] leading-relaxed flex items-start gap-2 border border-secondary-container/40">
            <span className="material-symbols-outlined !text-[16px] text-primary shrink-0 mt-0.5">
              shield
            </span>
            <span>
              Seluruh nama dan data keuangan disimpan secara lokal di peramban Anda (Local Storage),
              tidak dibagikan ke pihak ketiga atau server publik.
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-between pt-2 border-t border-surface-container-low gap-2">
            <button
              type="button"
              onClick={handleReset}
              className="py-2.5 px-3 rounded-xl bg-error-container/40 text-error text-xs font-semibold hover:bg-error-container/70 transition-colors cursor-pointer"
            >
              Reset Data Default
            </button>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsFamilyProfileModalOpen(false)}
                className="py-2.5 px-3 rounded-xl bg-surface-container-low text-on-surface-variant text-xs font-semibold hover:bg-surface-container cursor-pointer"
              >
                Batal
              </button>
              <button
                type="submit"
                className="py-2.5 px-4 rounded-xl bg-primary text-on-primary text-xs font-semibold hover:bg-primary-container shadow-sm cursor-pointer"
              >
                Simpan Profil
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
