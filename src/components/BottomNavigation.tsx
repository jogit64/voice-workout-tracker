
import React from 'react';
import { Home, Mic, History } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'home', label: 'Accueil', icon: Home },
    { id: 'record', label: 'Enregistrer', icon: Mic },
    { id: 'history', label: 'Historique', icon: History },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 safe-area-pb">
      <div className="flex justify-around items-center h-16 px-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex flex-col items-center justify-center px-3 py-2 rounded-xl transition-all duration-200",
                isActive 
                  ? "bg-gradient-to-r from-blue-500 to-orange-500 text-white shadow-lg scale-105" 
                  : "text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400"
              )}
            >
              <Icon size={20} className={cn("mb-1", isActive && "animate-pulse")} />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;
