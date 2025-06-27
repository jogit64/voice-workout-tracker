
import React, { useState } from 'react';
import { ThemeProvider } from '@/components/ThemeProvider';
import Header from '@/components/Header';
import BottomNavigation from '@/components/BottomNavigation';
import HomePage from '@/components/HomePage';
import RecordPage from '@/components/RecordPage';
import HistoryPage from '@/components/HistoryPage';

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');

  const getPageTitle = () => {
    switch (activeTab) {
      case 'home':
        return 'Tableau de bord';
      case 'record':
        return 'Enregistrement vocal';
      case 'history':
        return 'Historique des séances';
      default:
        return 'FitVoice';
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage onStartRecording={() => setActiveTab('record')} />;
      case 'record':
        return <RecordPage />;
      case 'history':
        return <HistoryPage />;
      default:
        return <HomePage onStartRecording={() => setActiveTab('record')} />;
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <Header title={getPageTitle()} />
        
        <main className="px-4 py-6 pb-20 max-w-md mx-auto">
          {renderContent()}
        </main>

        <BottomNavigation 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        />
      </div>
    </ThemeProvider>
  );
};

export default Index;
