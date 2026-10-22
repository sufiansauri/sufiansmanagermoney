/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { FinanceProvider, useFinance } from './context/FinanceContext';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { DashboardScreen } from './components/screens/DashboardScreen';
import { TransactionsScreen } from './components/screens/TransactionsScreen';
import { BudgetScreen } from './components/screens/BudgetScreen';
import { SavingsScreen } from './components/screens/SavingsScreen';
import { ReportsScreen } from './components/screens/ReportsScreen';
import { RecordTransactionModal } from './components/modals/RecordTransactionModal';
import { DepositModal } from './components/modals/DepositModal';
import { ChildPortfolioModal } from './components/modals/ChildPortfolioModal';
import { EducationCalculatorModal } from './components/modals/EducationCalculatorModal';
import { GoldHistoryModal } from './components/modals/GoldHistoryModal';
import { BudgetAdjustModal } from './components/modals/BudgetAdjustModal';
import { NewSavingsPosModal } from './components/modals/NewSavingsPosModal';
import { SyncLogModal } from './components/modals/SyncLogModal';

const AppContent: React.FC = () => {
  const { activeTab } = useFinance();

  return (
    <div className="bg-surface font-body-md text-body-md text-on-surface antialiased flex flex-col min-h-screen relative selection:bg-secondary-container selection:text-primary">
      {/* Fixed Header */}
      <Header />

      {/* Main Screen Content container */}
      <main className="flex flex-col relative w-full pt-16 pb-28 bg-surface min-h-screen max-w-xl mx-auto">
        {activeTab === 'dashboard' && <DashboardScreen />}
        {activeTab === 'transaksi' && <TransactionsScreen />}
        {activeTab === 'anggaran' && <BudgetScreen />}
        {activeTab === 'tabungan-anak' && <SavingsScreen />}
        {activeTab === 'laporan' && <ReportsScreen />}
      </main>

      {/* Fixed Bottom Navigation + Floating Catat Button */}
      <BottomNav />

      {/* Interactive Global Modals */}
      <RecordTransactionModal />
      <DepositModal />
      <ChildPortfolioModal />
      <EducationCalculatorModal />
      <GoldHistoryModal />
      <BudgetAdjustModal />
      <NewSavingsPosModal />
      <SyncLogModal />
    </div>
  );
};

export default function App() {
  return (
    <FinanceProvider>
      <AppContent />
    </FinanceProvider>
  );
}
