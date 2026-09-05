import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/layout/Sidebar';
import { TopNavigation } from './components/layout/TopNavigation';
import { ContextFilterBar } from './components/layout/ContextFilterBar';

import { LoginPage } from './components/screens/LoginPage';
import { CDCOverview } from './components/screens/CDCOverview';
import { TalentPool } from './components/screens/TalentPool';
import { StudentProfile } from './components/screens/StudentProfile';
import { Groups } from './components/screens/Groups';
import { GroupDetail } from './components/screens/GroupDetail';
import { GroupIntelligence } from './components/screens/GroupIntelligence';
import { SkillsIntelligence } from './components/screens/SkillsIntelligence';
import { Opportunities } from './components/screens/Opportunities';
import { OpportunityDetail } from './components/screens/OpportunityDetail';
import { Interventions } from './components/screens/Interventions';
import { InterventionDetail } from './components/screens/InterventionDetail';
import { MentorManagement } from './components/screens/MentorManagement';
import { MentorDashboard } from './components/screens/MentorDashboard';
import { StudentDashboard } from './components/screens/StudentDashboard';
import { StudentMyProfile } from './components/screens/StudentMyProfile';

const ScreenRouter: React.FC = () => {
  const { currentScreen } = useApp();

  switch (currentScreen) {
    case 'login':
      return <LoginPage />;
    case 'overview':
      return <CDCOverview />;
    case 'talent-pool':
      return <TalentPool />;
    case 'student-profile':
      return <StudentProfile />;
    case 'groups':
      return <Groups />;
    case 'group-detail':
      return <GroupDetail />;
    case 'group-intelligence':
      return <GroupDetail />;
    case 'skills-intelligence':
      return <SkillsIntelligence />;
    case 'opportunities':
      return <Opportunities />;
    case 'opportunity-detail':
      return <OpportunityDetail />;
    case 'interventions':
      return <Interventions />;
    case 'intervention-detail':
      return <InterventionDetail />;
    case 'mentor-management':
      return <MentorManagement />;
    case 'mentor-dashboard':
      return <MentorDashboard />;
    case 'student-dashboard':
      return <StudentDashboard />;
    case 'student-my-profile':
      return <StudentMyProfile />;
    default:
      return <LoginPage />;
  }
};

export function AppContent() {
  const { currentScreen } = useApp();

  // If on login screen, render full-screen LoginPage without sidebar / topbar
  if (currentScreen === 'login') {
    return <LoginPage />;
  }

  // If on Mentor role experience, render full-screen MentorDashboard
  if (currentScreen === 'mentor-dashboard') {
    return <MentorDashboard />;
  }

  // If on Student role experience, render full-screen StudentDashboard
  if (currentScreen === 'student-dashboard') {
    return <StudentDashboard />;
  }

  // If on Student My Profile screen
  if (currentScreen === 'student-my-profile') {
    return <StudentMyProfile />;
  }

  // CDC Institutional Dashboard Shell
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#F8FAFC] text-slate-800 font-sans select-none">
      {/* 1. Dark Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* 2. Top Navigation Bar */}
        <TopNavigation />

        {/* 3. Context / Filter Bar */}
        <ContextFilterBar />

        {/* 4. Main Dashboard Screen Content */}
        <main className="flex-1 overflow-y-auto">
          <ScreenRouter />
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
