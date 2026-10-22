import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import {
  Transaction,
  BudgetCategory,
  ChildSavingsGoal,
  GoldHolding,
  FamilyNotification,
  FamilyProfile,
} from '../types/finance';

import maleProfileAvatar from '../assets/images/male_profile_avatar_1792642934440.jpg';
import toddlerBoyAvatar from '../assets/images/toddler_boy_avatar_1792642935513.jpg';

export const APP_LOGO_URL =
  'https://lh3.googleusercontent.com/aida/AEtjO1WVMsfJCEK_3fpoce6sxEspNp2MtD_VnZWzXcrfeIUmgHYMbk50FM9nkC6DzrWjQFZIiah2Ic8hX4RPWgwZpdc8HAYqZ8ECI_f5BjEK0K7TumN6a1q7U5N_dVlDdyHNGJvaUb-AhYWg-6LHL96k3ujaweRG0s01goJxDEtJYVlrUs5KLgRXHXoAwAesT2O_5al56chf7BqKYiFpjIW1b8m7CePktNpse6MIQbsG97fKgll_DsLZdxqvNRg';

export const PROFILE_PHOTO_URL = maleProfileAvatar || '/assets/images/male_profile_avatar_1792642934440.jpg';

export const ABDUSSYAKUR_PHOTO_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAxJAhL3ItChGcU2MvFdA0heOdLrAQADE7az8cKXGtlpsbEPRIscJISDVtSMikOfNMvkmHZuK55FMk8u135elUgMz-9rKgXTwUQacZgGrH2NdcfeDpKpafcJlZdfW65N70QmdfLXWKIJxWICRGjYHSA7bfG9yxW2s6f_K2Jke9rX-X9QLqQKU4hvMDfkpajQ6SDFgqa6w3t6sqeQVUEpniOd0zZfe1OTuuqWsSeEe4kAGxfm0yXVnKT';

export const UBAY_PHOTO_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCHJzIm-lrUzzjrXZAd3ISQVQ3ztZBXsfPjUJBUuZQgYP94deRLM2zR4D_P5Vu6NBVLkn-wc2TFMW7QvxJKynDokK_YMsCw4jSWnV7Tpl6jld-L6e3JxJxLqG3Hnec5uGG12ape_AGdAGvb2fbCUmPnqNCaTTy33qRi9aggPVDlGU606Ablv8-1Yi4DAU3KRSoGOmf_cB-0MwVCR_7dD4JUIHftbGMYyJeDUE2fU0KEeKKNbzd8Hc5d';

export const TODDLER_BOY_PHOTO_URL = toddlerBoyAvatar || '/assets/images/toddler_boy_avatar_1792642935513.jpg';
export const SARAH_PHOTO_URL = TODDLER_BOY_PHOTO_URL;

export const defaultFamilyProfile: FamilyProfile = {
  familyName: 'Keluarga Berkah',
  subTitle: 'Pencatatan Keuangan Syariah',
  member1: {
    id: 'member1',
    name: 'Ayah',
    role: 'Suami',
    emoji: '🧔',
  },
  member2: {
    id: 'member2',
    name: 'Ibu',
    role: 'Istri',
    emoji: '🧕',
  },
  businessName: 'Usaha Mandiri',
  avatarUrl: PROFILE_PHOTO_URL,
};

interface FinanceContextType {
  activeTab: 'dashboard' | 'transaksi' | 'anggaran' | 'tabungan-anak' | 'laporan';
  setActiveTab: (tab: 'dashboard' | 'transaksi' | 'anggaran' | 'tabungan-anak' | 'laporan') => void;
  selectedMonth: string;
  setSelectedMonth: (month: string) => void;
  familyProfile: FamilyProfile;
  updateFamilyProfile: (profile: Partial<FamilyProfile>) => void;
  transactions: Transaction[];
  addTransaction: (tx: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
  budgetCategories: BudgetCategory[];
  updateBudgetLimit: (id: string, newLimit: number) => void;
  updateBudgetCategory: (id: string, updated: Partial<BudgetCategory>) => void;
  addSubItemToBudget: (budgetId: string, name: string, amount: number) => void;
  addNewBudgetCategory: (category: Omit<BudgetCategory, 'id' | 'percentage'>) => void;
  childrenSavings: ChildSavingsGoal[];
  depositToChildSavings: (childId: string, amount: number, note?: string) => void;
  addNewChildSavings: (goal: Omit<ChildSavingsGoal, 'id' | 'percentage'>) => void;
  updateChildSavings: (id: string, updated: Partial<ChildSavingsGoal>) => void;
  deleteChildSavings: (id: string) => void;
  goldHolding: GoldHolding;
  addGoldPurchase: (grams: number, pricePerGram: number, allocatedFor: string) => void;
  bankBalances: {
    bsi: number;
    bca: number;
    jago: number;
  };
  totalKas: number;
  totalPemasukan: number;
  totalPengeluaran: number;
  totalPlafon: number;
  sisaPlafon: number;
  notifications: FamilyNotification[];
  unreadCount: number;
  markNotificationsAsRead: () => void;
  isRecordModalOpen: boolean;
  setIsRecordModalOpen: (open: boolean) => void;
  recordModalInitialType?: 'inflow' | 'outflow' | 'transfer' | 'zakat';
  openRecordModalWithType: (type?: 'inflow' | 'outflow' | 'transfer' | 'zakat') => void;
  selectedChildForDeposit: ChildSavingsGoal | null;
  setSelectedChildForDeposit: (child: ChildSavingsGoal | null) => void;
  selectedChildForPortfolio: ChildSavingsGoal | null;
  setSelectedChildForPortfolio: (child: ChildSavingsGoal | null) => void;
  childToEdit: ChildSavingsGoal | null;
  setChildToEdit: (child: ChildSavingsGoal | null) => void;
  isEducationCalculatorOpen: boolean;
  setIsEducationCalculatorOpen: (open: boolean) => void;
  isGoldHistoryModalOpen: boolean;
  setIsGoldHistoryModalOpen: (open: boolean) => void;
  isBudgetAdjustModalOpen: boolean;
  setIsBudgetAdjustModalOpen: (open: boolean) => void;
  isNewSavingsModalOpen: boolean;
  setIsNewSavingsModalOpen: (open: boolean) => void;
  isSyncLogModalOpen: boolean;
  setIsSyncLogModalOpen: (open: boolean) => void;
  isFamilyProfileModalOpen: boolean;
  setIsFamilyProfileModalOpen: (open: boolean) => void;
  currentUser: string;
  setCurrentUser: (user: string) => void;
  resetAllData: () => void;
}

const initialTransactions: Transaction[] = [
  {
    id: 'tx-1',
    title: 'Supermarket & Belanja Pangan',
    subtitle: 'Bahan Dapur Mingguan & Sayur Segar',
    amount: 540000,
    type: 'outflow',
    member: 'Ibu',
    memberRole: 'Istri',
    category: 'Belanja & Dapur',
    account: 'BSI Debit',
    dateStr: '20 Okt 2026',
    groupDate: 'Hari Ini',
    time: '10:15 WIB',
    hasReceipt: true,
    notes: 'Ayam, sayuran hijau, buah-buahan, susu & kebutuhan dapur',
    iconName: 'shopping_cart',
    iconBgColor: 'bg-error-container/60 text-error',
  },
  {
    id: 'tx-2',
    title: 'Penjualan Produk Usaha Keluarga',
    subtitle: 'Pesanan Paket Snack Box & Katering',
    amount: 920000,
    type: 'inflow',
    member: 'Ibu',
    memberRole: 'Istri',
    category: 'Bisnis Sampingan',
    account: 'BCA',
    dateStr: '20 Okt 2026',
    groupDate: 'Hari Ini',
    time: '09:00 WIB',
    notes: 'Pelunasan order paket arisan warga',
    iconName: 'storefront',
    iconBgColor: 'bg-secondary-container text-secondary',
  },
  {
    id: 'tx-3',
    title: 'Paket Buku Sains & Edukasi Islami',
    subtitle: 'Buku apresiasi prestasi hafalan anak',
    amount: 320000,
    type: 'outflow',
    member: 'Ayah',
    memberRole: 'Suami',
    category: 'Pendidikan Anak',
    account: 'Jago Syariah',
    dateStr: '19 Okt 2026',
    groupDate: 'Kemarin',
    time: '19:40 WIB',
    notes: 'Buku literasi sains dan kisah teladan sahabat nabi',
    iconName: 'menu_book',
    iconBgColor: 'bg-surface-container-high text-primary',
  },
  {
    id: 'tx-4',
    title: 'Bensin & Operasional Silaturahim',
    subtitle: 'Bahan bakar kendaraan & e-toll keluarga',
    amount: 250000,
    type: 'outflow',
    member: 'Ayah',
    memberRole: 'Suami',
    category: 'Transport',
    account: 'BSI',
    dateStr: '19 Okt 2026',
    groupDate: 'Kemarin',
    time: '14:15 WIB',
    notes: 'Bahan bakar penuh & saldo kartu tol operasional',
    iconName: 'local_gas_station',
    iconBgColor: 'bg-error-container/60 text-error',
  },
  {
    id: 'tx-5',
    title: 'Alokasi Tabungan Pendidikan Anak',
    subtitle: 'Alokasi otomatis target jenjang lanjutan',
    amount: 500000,
    type: 'transfer',
    member: 'Bersama',
    memberRole: 'Bersama',
    category: 'Transfer Internal',
    account: 'BSI ➜ Kantong Jago',
    dateStr: '18 Okt 2026',
    groupDate: '18 Oktober 2026',
    time: '11:00 WIB',
    notes: 'Auto-saving tabungan pendidikan berkah',
    iconName: 'swap_horiz',
    iconBgColor: 'bg-surface-container-high text-primary',
  },
  {
    id: 'tx-6',
    title: 'Sedekah Subuh Rutin 7 Hari',
    subtitle: 'Infaq Beras Santri Penghafal Quran',
    amount: 150000,
    type: 'zakat',
    member: 'Ayah',
    memberRole: 'Suami',
    category: 'Zakat & Infaq',
    account: 'QRIS BSI',
    dateStr: '18 Okt 2026',
    groupDate: '18 Oktober 2026',
    time: '05:10 WIB',
    notes: 'Penyaluran berkah subuh untuk pondok pesantren',
    iconName: 'volunteer_activism',
    iconBgColor: 'bg-tertiary-fixed/60 text-tertiary',
  },
  {
    id: 'tx-7',
    title: 'Honor Jasa & Konsultasi Profesional',
    subtitle: 'Pemasukan proyek setup sistem & server',
    amount: 4000000,
    type: 'inflow',
    member: 'Ayah',
    memberRole: 'Suami',
    category: 'Bisnis & Freelance',
    account: 'BSI Masuk',
    dateStr: '15 Okt 2026',
    groupDate: '15 Oktober 2026',
    time: '16:45 WIB',
    notes: 'Penyelesaian proyek implementasi sistem teknologi mandiri',
    iconName: 'laptop_mac',
    iconBgColor: 'bg-secondary-container text-secondary',
  },
];

const initialBudgetCategories: BudgetCategory[] = [
  {
    id: 'b-1',
    title: 'Belanja & Pangan',
    subtitle: 'Bahan masak, galon & gas',
    icon: 'shopping_basket',
    iconBg: 'bg-tertiary-fixed',
    iconColor: 'text-on-tertiary-fixed',
    spent: 4250000,
    limit: 5500000,
    percentage: 77,
    statusText: 'Mendekati 80% kuota',
    statusWarning: true,
    tagGroup: 'keluarga',
    subItems: [
      { id: 'sub-1', name: 'Sayur & Bahan Pokok Pasar', amount: 2450000 },
      { id: 'sub-2', name: 'Supermarket Bulanan', amount: 1480000 },
      { id: 'sub-3', name: 'Isi Galon & Gas Masak', amount: 320000 },
    ],
  },
  {
    id: 'b-2',
    title: 'Pendidikan & Anak',
    subtitle: 'Sekolah, les & nutrisi buah hati',
    icon: 'school',
    iconBg: 'bg-secondary-container',
    iconColor: 'text-on-secondary-fixed-variant',
    spent: 3500000,
    limit: 4500000,
    percentage: 78,
    statusText: 'SPP & Kebutuhan Sekolah Terpenuhi',
    tagGroup: 'keluarga',
    subItems: [
      { id: 'sub-4', name: 'SPP & Kegiatan Ekstrakurikuler', amount: 1800000 },
      { id: 'sub-5', name: 'SPP Sekolah Anak Kedua', amount: 1100000 },
      { id: 'sub-6', name: 'Nutrisi & Kebutuhan Balita', amount: 600000 },
    ],
  },
  {
    id: 'b-3',
    title: 'Zakat & Sedekah',
    subtitle: 'Tuntutan syariah & berkah nafkah',
    icon: 'volunteer_activism',
    iconBg: 'bg-primary-fixed',
    iconColor: 'text-on-primary-fixed',
    spent: 1368750,
    limit: 1500000,
    percentage: 91,
    statusText: '2.5% Zakat Maal Terpenuhi',
    tagGroup: 'zakat',
    subItems: [
      { id: 'sub-7', name: 'Zakat Maal Penghasilan', amount: 1000000 },
      { id: 'sub-8', name: 'Sedekah Subuh Masjid', amount: 218750 },
      { id: 'sub-9', name: 'Santunan Yatim & Duafa', amount: 150000 },
    ],
  },
  {
    id: 'b-4',
    title: 'Usaha Mandiri (Bisnis)',
    subtitle: 'Modal putaran katering & pesanan',
    icon: 'storefront',
    iconBg: 'bg-surface-container-high',
    iconColor: 'text-primary',
    spent: 2150000,
    limit: 3000000,
    percentage: 71,
    statusText: 'Laba Berjalan: +Rp 2.650.000',
    tagGroup: 'bisnis',
    subItems: [
      { id: 'sub-10', name: 'Bahan Baku & Persediaan', amount: 1450000 },
      { id: 'sub-11', name: 'Kemasan Box & Label', amount: 420000 },
      { id: 'sub-12', name: 'Biaya Kurir & Pengiriman', amount: 280000 },
    ],
  },
  {
    id: 'b-5',
    title: 'Operasional & Utilitas',
    subtitle: 'Listrik PLN, WiFi, Air Bersih',
    icon: 'bolt',
    iconBg: 'bg-surface-container',
    iconColor: 'text-on-surface-variant',
    spent: 1620000,
    limit: 1800000,
    percentage: 90,
    statusText: 'Lunas Semua Tagihan Bulanan',
    tagGroup: 'operasional',
    subItems: [
      { id: 'sub-13', name: 'Token Listrik Rumah', amount: 850000 },
      { id: 'sub-14', name: 'Internet Fiber Wifi Rumah', amount: 480000 },
      { id: 'sub-15', name: 'Air PDAM & Iuran Lingkungan', amount: 290000 },
    ],
  },
  {
    id: 'b-6',
    title: 'Diri & Rekreasi',
    subtitle: 'Buku, sarana belajar & akhir pekan',
    icon: 'park',
    iconBg: 'bg-tertiary-fixed',
    iconColor: 'text-on-tertiary-fixed',
    spent: 1400000,
    limit: 1700000,
    percentage: 82,
    statusText: 'Rekreasi Keluarga & Buku',
    tagGroup: 'rekreasi',
    subItems: [
      { id: 'sub-16', name: 'Family Outing Akhir Pekan', amount: 950000 },
      { id: 'sub-17', name: 'Buku Cerita Sahabat & Sirah', amount: 300000 },
      { id: 'sub-18', name: 'Langganan Server & Belajar', amount: 150000 },
    ],
  },
];

const initialChildrenSavings: ChildSavingsGoal[] = [
  {
    id: 'child-1',
    name: 'Anak Pertama',
    age: '9 Tahun',
    level: 'Kelas 4 SD',
    photoUrl: ABDUSSYAKUR_PHOTO_URL,
    badgeNumber: 1,
    statusBadge: 'Aktif',
    statusBadgeClass: 'bg-secondary-container text-on-secondary-fixed-variant',
    targetName: 'SMP & Pesantren Unggulan',
    currentAmount: 32500000,
    targetAmount: 45000000,
    percentage: 72,
    monthlyDeposit: 1000000,
    depositDateInfo: 'Rp 1.000.000/bln (tgl 25)',
    assetDistribution: '25g Emas Antam Fisik',
    iconAsset: 'workspace_premium',
    progressColorClass: 'bg-primary',
    portfolioBreakdown: [
      { label: 'Emas Fisik Antam CertiEye', value: 32500000, percentage: 65, type: 'Emas Fisik (25g)' },
      { label: 'Deposito Mudharabah Syariah', value: 12000000, percentage: 25, type: 'Bagi Hasil 6.2%' },
      { label: 'Kas Operasional Pendidikan', value: 5000000, percentage: 10, type: 'Tabungan Siaga' },
    ],
  },
  {
    id: 'child-2',
    name: 'Anak Kedua',
    age: '5 Tahun',
    level: 'TK B',
    photoUrl: UBAY_PHOTO_URL,
    badgeNumber: 2,
    statusBadge: 'Hampir Lunas',
    statusBadgeClass: 'bg-secondary-fixed text-on-secondary-fixed font-bold',
    targetName: 'Masuk SD Islam Favorit',
    currentAmount: 21300000,
    targetAmount: 25000000,
    percentage: 85,
    monthlyDeposit: 600000,
    depositDateInfo: 'Rp 600.000/bln',
    assetDistribution: 'Sukuk Reksadana Rp 18,5Jt',
    iconAsset: 'account_balance',
    progressColorClass: 'bg-secondary',
    portfolioBreakdown: [
      { label: 'Sukuk Reksadana Syariah', value: 18500000, percentage: 86, type: 'Sukuk Negara Ritel' },
      { label: 'Tabungan Wadiah Syariah', value: 2800000, percentage: 14, type: 'Dana Likuid' },
    ],
  },
  {
    id: 'child-3',
    name: 'Anak Ketiga',
    age: '2 Tahun',
    level: 'Balita Ceria',
    photoUrl: SARAH_PHOTO_URL,
    badgeNumber: 3,
    statusBadge: 'Awal Mulai',
    statusBadgeClass: 'bg-tertiary-fixed text-on-tertiary-fixed font-semibold',
    targetName: 'Pendidikan Dini & Kesehatan',
    currentAmount: 11000000,
    targetAmount: 30000000,
    percentage: 36,
    monthlyDeposit: 500000,
    depositDateInfo: 'Rp 500.000/bln',
    assetDistribution: 'Emas & Kas Mudharabah',
    iconAsset: 'savings',
    progressColorClass: 'bg-tertiary',
    portfolioBreakdown: [
      { label: 'Emas Batangan MiniGold & Antam', value: 7800000, percentage: 70, type: '6 Gram Emas' },
      { label: 'Kas Mudharabah Hasanah', value: 3200000, percentage: 30, type: 'Tabungan Bayi' },
    ],
  },
];

const initialGoldHolding: GoldHolding = {
  totalGrams: 45,
  certType: 'Antam CertiEye',
  marketPricePerGram: 1300000,
  totalMarketValue: 58500000,
  growthYoY: '+14.2% YoY',
  storageLocation: 'Tersimpan di SDB Bank Syariah',
  items: [
    {
      id: 'g-1',
      date: '12 Jan 2024',
      weight: 10,
      buyPricePerGram: 1080000,
      serial: 'AT-889124',
      allocatedFor: 'Pendidikan Anak ke-1',
    },
    {
      id: 'g-2',
      date: '28 Mei 2024',
      weight: 15,
      buyPricePerGram: 1120000,
      serial: 'AT-903421',
      allocatedFor: 'Pendidikan Anak ke-1',
    },
    {
      id: 'g-3',
      date: '10 Nov 2024',
      weight: 10,
      buyPricePerGram: 1160000,
      serial: 'AT-945118',
      allocatedFor: 'Pendidikan Anak ke-2',
    },
    {
      id: 'g-4',
      date: '15 Ags 2025',
      weight: 10,
      buyPricePerGram: 1220000,
      serial: 'AT-998244',
      allocatedFor: 'Pendidikan Anak ke-3',
    },
  ],
};

const initialNotifications: FamilyNotification[] = [
  {
    id: 'notif-1',
    title: 'Belanja Mingguan Dicatat',
    message: 'Belanja kebutuhan pangan tercatat sebesar Rp 540.000 dari rekening operasional.',
    time: '10:15 WIB',
    type: 'info',
    read: false,
  },
  {
    id: 'notif-2',
    title: 'Reminder Zakat Maal',
    message: 'Alhamdulillah nisab 85g emas terpenuhi. Zakat maal keluarga bulan ini tersalurkan 100%.',
    time: 'Kemarin',
    type: 'success',
    read: false,
  },
  {
    id: 'notif-3',
    title: 'Evaluasi Kuota Pangan',
    message: 'Pos Belanja & Pangan mencapai 77% plafon. Sisa Rp 1.250.000 untuk 11 hari ke depan.',
    time: '2 hari lalu',
    type: 'warning',
    read: true,
  },
];

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export const FinanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'transaksi' | 'anggaran' | 'tabungan-anak' | 'laporan'>('dashboard');
  const [selectedMonth, setSelectedMonth] = useState('Okt 2026');

  // Load from localStorage or defaults
  const [familyProfile, setFamilyProfile] = useState<FamilyProfile>(() => {
    try {
      const saved = localStorage.getItem('barakah_family_profile');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (!parsed.avatarUrl || parsed.avatarUrl.includes('AB6AXuAjHX4')) {
          parsed.avatarUrl = PROFILE_PHOTO_URL;
        }
        return parsed;
      }
    } catch {
      // ignore
    }
    return defaultFamilyProfile;
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    try {
      const saved = localStorage.getItem('barakah_transactions');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return initialTransactions;
  });

  const [budgetCategories, setBudgetCategories] = useState<BudgetCategory[]>(() => {
    try {
      const saved = localStorage.getItem('barakah_budgets');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return initialBudgetCategories;
  });

  const [childrenSavings, setChildrenSavings] = useState<ChildSavingsGoal[]>(() => {
    try {
      const saved = localStorage.getItem('barakah_children_savings');
      if (saved) {
        const parsed: ChildSavingsGoal[] = JSON.parse(saved);
        return parsed.map((c) => {
          if (c.photoUrl && c.photoUrl.includes('AB6AXuCzOFQfaYN_gn0')) {
            return { ...c, photoUrl: TODDLER_BOY_PHOTO_URL };
          }
          return c;
        });
      }
    } catch {
      // ignore
    }
    return initialChildrenSavings;
  });

  const [goldHolding, setGoldHolding] = useState<GoldHolding>(() => {
    try {
      const saved = localStorage.getItem('barakah_gold_holding');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return initialGoldHolding;
  });

  const [notifications, setNotifications] = useState<FamilyNotification[]>(initialNotifications);
  const [currentUser, setCurrentUser] = useState<string>('Bersama');

  // Modals state
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);
  const [recordModalInitialType, setRecordModalInitialType] = useState<'inflow' | 'outflow' | 'transfer' | 'zakat'>('outflow');
  const [selectedChildForDeposit, setSelectedChildForDeposit] = useState<ChildSavingsGoal | null>(null);
  const [selectedChildForPortfolio, setSelectedChildForPortfolio] = useState<ChildSavingsGoal | null>(null);
  const [childToEdit, setChildToEdit] = useState<ChildSavingsGoal | null>(null);
  const [isEducationCalculatorOpen, setIsEducationCalculatorOpen] = useState(false);
  const [isGoldHistoryModalOpen, setIsGoldHistoryModalOpen] = useState(false);
  const [isBudgetAdjustModalOpen, setIsBudgetAdjustModalOpen] = useState(false);
  const [isNewSavingsModalOpen, setIsNewSavingsModalOpen] = useState(false);
  const [isSyncLogModalOpen, setIsSyncLogModalOpen] = useState(false);
  const [isFamilyProfileModalOpen, setIsFamilyProfileModalOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('barakah_family_profile', JSON.stringify(familyProfile));
    } catch {}
  }, [familyProfile]);

  useEffect(() => {
    try {
      localStorage.setItem('barakah_transactions', JSON.stringify(transactions));
    } catch {}
  }, [transactions]);

  useEffect(() => {
    try {
      localStorage.setItem('barakah_budgets', JSON.stringify(budgetCategories));
    } catch {}
  }, [budgetCategories]);

  useEffect(() => {
    try {
      localStorage.setItem('barakah_children_savings', JSON.stringify(childrenSavings));
    } catch {}
  }, [childrenSavings]);

  useEffect(() => {
    try {
      localStorage.setItem('barakah_gold_holding', JSON.stringify(goldHolding));
    } catch {}
  }, [goldHolding]);

  // Bank balances
  const bankBalances = useMemo(() => {
    return {
      bsi: 32500000,
      bca: 11250000,
      jago: 5000000,
    };
  }, []);

  const totalKas = bankBalances.bsi + bankBalances.bca + bankBalances.jago;
  const totalPemasukan = 24500000;
  const totalPengeluaran = 14280000;
  const totalPlafon = budgetCategories.reduce((acc, b) => acc + b.limit, 0);
  const sisaPlafon = totalPlafon - totalPengeluaran;

  const updateFamilyProfile = (newProfile: Partial<FamilyProfile>) => {
    setFamilyProfile((prev) => ({
      ...prev,
      ...newProfile,
    }));
  };

  const openRecordModalWithType = (type?: 'inflow' | 'outflow' | 'transfer' | 'zakat') => {
    setRecordModalInitialType(type || 'outflow');
    setIsRecordModalOpen(true);
  };

  const addTransaction = (tx: Omit<Transaction, 'id'>) => {
    const newTx: Transaction = {
      ...tx,
      id: `tx-${Date.now()}`,
    };
    setTransactions((prev) => [newTx, ...prev]);

    const newNotif: FamilyNotification = {
      id: `notif-${Date.now()}`,
      title: `${tx.member} mencatat transaksi baru`,
      message: `${tx.title} senilai Rp ${tx.amount.toLocaleString('id-ID')} (${tx.category})`,
      time: 'Baru saja',
      type: tx.type === 'inflow' ? 'success' : tx.type === 'zakat' ? 'info' : 'warning',
      read: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const updateBudgetLimit = (id: string, newLimit: number) => {
    setBudgetCategories((prev) =>
      prev.map((b) => {
        if (b.id === id) {
          const percentage = Math.round((b.spent / newLimit) * 100);
          return {
            ...b,
            limit: newLimit,
            percentage,
          };
        }
        return b;
      })
    );
  };

  const updateBudgetCategory = (id: string, updated: Partial<BudgetCategory>) => {
    setBudgetCategories((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...updated } : b))
    );
  };

  const addSubItemToBudget = (budgetId: string, name: string, amount: number) => {
    setBudgetCategories((prev) =>
      prev.map((b) => {
        if (b.id === budgetId) {
          const newSpent = b.spent + amount;
          const percentage = Math.round((newSpent / b.limit) * 100);
          return {
            ...b,
            spent: newSpent,
            percentage,
            subItems: [...b.subItems, { id: `sub-${Date.now()}`, name, amount }],
          };
        }
        return b;
      })
    );
  };

  const addNewBudgetCategory = (cat: Omit<BudgetCategory, 'id' | 'percentage'>) => {
    const percentage = Math.round((cat.spent / cat.limit) * 100);
    const newCat: BudgetCategory = {
      ...cat,
      id: `b-${Date.now()}`,
      percentage,
    };
    setBudgetCategories((prev) => [...prev, newCat]);
  };

  const depositToChildSavings = (childId: string, amount: number, note?: string) => {
    setChildrenSavings((prev) =>
      prev.map((c) => {
        if (c.id === childId) {
          const newCurrent = c.currentAmount + amount;
          const percentage = Math.min(100, Math.round((newCurrent / c.targetAmount) * 100));
          return {
            ...c,
            currentAmount: newCurrent,
            percentage,
          };
        }
        return c;
      })
    );

    const targetChild = childrenSavings.find((c) => c.id === childId);
    if (targetChild) {
      addTransaction({
        title: `Setoran Tabungan ${targetChild.name}`,
        subtitle: note || `Alokasi dana target ${targetChild.targetName}`,
        amount,
        type: 'transfer',
        member: currentUser,
        category: 'Pendidikan Anak',
        account: 'BSI ➜ Kas Tabungan',
        dateStr: 'Hari Ini',
        groupDate: 'Hari Ini',
        time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
        notes: note || 'Setoran mandiri tambahan',
        iconName: 'savings',
        iconBgColor: 'bg-primary-container text-on-primary-container',
      });
    }
  };

  const addNewChildSavings = (goal: Omit<ChildSavingsGoal, 'id' | 'percentage'>) => {
    const percentage = Math.round((goal.currentAmount / goal.targetAmount) * 100);
    const newGoal: ChildSavingsGoal = {
      ...goal,
      id: `child-${Date.now()}`,
      percentage,
    };
    setChildrenSavings((prev) => [...prev, newGoal]);
  };

  const updateChildSavings = (id: string, updated: Partial<ChildSavingsGoal>) => {
    setChildrenSavings((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const newGoal = { ...c, ...updated };
          if (newGoal.targetAmount > 0) {
            newGoal.percentage = Math.round((newGoal.currentAmount / newGoal.targetAmount) * 100);
          }
          return newGoal;
        }
        return c;
      })
    );
  };

  const deleteChildSavings = (id: string) => {
    setChildrenSavings((prev) => prev.filter((c) => c.id !== id));
  };

  const addGoldPurchase = (grams: number, pricePerGram: number, allocatedFor: string) => {
    setGoldHolding((prev) => {
      const newTotalGrams = prev.totalGrams + grams;
      const newTotalValue = newTotalGrams * prev.marketPricePerGram;
      return {
        ...prev,
        totalGrams: newTotalGrams,
        totalMarketValue: newTotalValue,
        items: [
          {
            id: `g-${Date.now()}`,
            date: 'Hari Ini',
            weight: grams,
            buyPricePerGram: pricePerGram,
            serial: `AT-${Math.floor(100000 + Math.random() * 900000)}`,
            allocatedFor,
          },
          ...prev.items,
        ],
      };
    });
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const resetAllData = () => {
    setFamilyProfile(defaultFamilyProfile);
    setTransactions(initialTransactions);
    setBudgetCategories(initialBudgetCategories);
    setChildrenSavings(initialChildrenSavings);
    setGoldHolding(initialGoldHolding);
    try {
      localStorage.removeItem('barakah_family_profile');
      localStorage.removeItem('barakah_transactions');
      localStorage.removeItem('barakah_budgets');
      localStorage.removeItem('barakah_children_savings');
      localStorage.removeItem('barakah_gold_holding');
    } catch {}
  };

  return (
    <FinanceContext.Provider
      value={{
        activeTab,
        setActiveTab,
        selectedMonth,
        setSelectedMonth,
        familyProfile,
        updateFamilyProfile,
        transactions,
        addTransaction,
        deleteTransaction,
        budgetCategories,
        updateBudgetLimit,
        updateBudgetCategory,
        addSubItemToBudget,
        addNewBudgetCategory,
        childrenSavings,
        depositToChildSavings,
        addNewChildSavings,
        updateChildSavings,
        deleteChildSavings,
        goldHolding,
        addGoldPurchase,
        bankBalances,
        totalKas,
        totalPemasukan,
        totalPengeluaran,
        totalPlafon,
        sisaPlafon,
        notifications,
        unreadCount,
        markNotificationsAsRead,
        isRecordModalOpen,
        setIsRecordModalOpen,
        recordModalInitialType,
        openRecordModalWithType,
        selectedChildForDeposit,
        setSelectedChildForDeposit,
        selectedChildForPortfolio,
        setSelectedChildForPortfolio,
        childToEdit,
        setChildToEdit,
        isEducationCalculatorOpen,
        setIsEducationCalculatorOpen,
        isGoldHistoryModalOpen,
        setIsGoldHistoryModalOpen,
        isBudgetAdjustModalOpen,
        setIsBudgetAdjustModalOpen,
        isNewSavingsModalOpen,
        setIsNewSavingsModalOpen,
        isSyncLogModalOpen,
        setIsSyncLogModalOpen,
        isFamilyProfileModalOpen,
        setIsFamilyProfileModalOpen,
        currentUser,
        setCurrentUser,
        resetAllData,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
};
