export type TransactionType = 'inflow' | 'outflow' | 'transfer' | 'zakat';
export type BankAccount = 'BSI' | 'BCA' | 'Jago Syariah' | 'BSI Debit' | 'QRIS BSI' | 'BSI Masuk' | 'BCA QRIS' | 'BCA Virtual Acc' | 'QRIS Jago Syariah' | 'Kas Tunai' | string;

export interface FamilyMemberInfo {
  id: 'member1' | 'member2' | 'together';
  name: string;
  role: string;
  emoji: string;
  avatarUrl?: string;
}

export interface FamilyProfile {
  familyName: string;
  subTitle: string;
  member1: FamilyMemberInfo;
  member2: FamilyMemberInfo;
  businessName: string;
  avatarUrl: string;
}

export interface Transaction {
  id: string;
  title: string;
  subtitle: string;
  amount: number;
  type: TransactionType;
  member: string; // Member name e.g. "Ayah", "Ibu", or "Bersama"
  memberRole?: string;
  category: string;
  account: BankAccount;
  dateStr: string;
  groupDate: string;
  time: string;
  hasReceipt?: boolean;
  notes?: string;
  iconName: string;
  iconBgColor?: string;
}

export interface SubCategoryItem {
  id: string;
  name: string;
  amount: number;
}

export interface BudgetCategory {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  spent: number;
  limit: number;
  percentage: number;
  statusText: string;
  statusWarning?: boolean;
  tagGroup: 'keluarga' | 'zakat' | 'bisnis' | 'operasional' | 'rekreasi';
  subItems: SubCategoryItem[];
  extraHighlight?: string;
}

export interface ChildSavingsGoal {
  id: string;
  name: string;
  age: string;
  level: string;
  photoUrl: string;
  badgeNumber: number;
  statusBadge: string;
  statusBadgeClass: string;
  targetName: string;
  currentAmount: number;
  targetAmount: number;
  percentage: number;
  monthlyDeposit: number;
  depositDateInfo: string;
  assetDistribution: string;
  iconAsset: string;
  progressColorClass: string;
  portfolioBreakdown: {
    label: string;
    value: number;
    percentage: number;
    type: string;
  }[];
}

export interface GoldHolding {
  totalGrams: number;
  certType: string;
  marketPricePerGram: number;
  totalMarketValue: number;
  growthYoY: string;
  storageLocation: string;
  items: {
    id: string;
    date: string;
    weight: number;
    buyPricePerGram: number;
    serial: string;
    allocatedFor: string;
  }[];
}

export interface FamilyNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'info' | 'warning' | 'success';
  read: boolean;
}
