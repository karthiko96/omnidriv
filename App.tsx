import React, { useState } from 'react';
import { Hero } from './components/Hero';
import { WhyOmniDrive } from './components/WhyOmniDrive';
import { PersonalStorage } from './components/PersonalStorage';
import { SmartStorage } from './components/SmartStorage';
import { TeamWorkspace } from './components/TeamWorkspace';
import { AISearch } from './components/AISearch';
import { LargeFileStorage } from './components/LargeFileStorage';
import { VersionHistory } from './components/VersionHistory';
import { SecureSharing } from './components/SecureSharing';
import { DeveloperAccess } from './components/DeveloperAccess';
import { AIAgentAccess } from './components/AIAgentAccess';
import { BusinessAdmin } from './components/BusinessAdmin';
import { PricingSection } from './components/PricingSection';
import { SecuritySection } from './components/SecuritySection';
import { DesktopApps } from './components/DesktopApps';
import { DownloadCenter } from './components/DownloadCenter';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { TransferTray } from './components/LargeFileTransfer';

import { GetStartedModal } from './components/GetStartedModal';
import { DownloadModal } from './components/DownloadModal';
import { FilePreviewModal } from './components/FilePreviewModal';
import { DriveFile, PlatformType } from './types';

export default function App() {
  const [isGetStartedOpen, setIsGetStartedOpen] = useState(false);
  const [selectedPlanForSignup, setSelectedPlanForSignup] = useState('teams');
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformType>('macos');
  const [inspectedFile, setInspectedFile] = useState<DriveFile | null>(null);

  const handleOpenGetStarted = (plan = 'teams') => {
    setSelectedPlanForSignup(plan);
    setIsGetStartedOpen(true);
  };

  const handleOpenDownload = (platform: PlatformType = 'macos') => {
    setSelectedPlatform(platform);
    setIsDownloadOpen(true);
  };

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#fafaf9] text-neutral-900 selection:bg-neutral-900 selection:text-white font-sans">
      {/* Main content flow */}
      <main>
        {/* Hero Section */}
        <Hero
          onOpenGetStarted={() => handleOpenGetStarted('teams')}
          onOpenDownload={() => handleOpenDownload('macos')}
          onSelectFile={(file) => setInspectedFile(file)}
        />

        {/* 1. Why OmniDrive */}
        <WhyOmniDrive
          onOpenGetStarted={() => handleOpenGetStarted('teams')}
          onExploreSdk={() => handleScrollTo('developers')}
          onSeeEnterprise={() => handleScrollTo('business-admin')}
        />

        {/* 2. Personal storage */}
        <PersonalStorage />

        <SmartStorage />

        {/* 3. Team workspace */}
        <TeamWorkspace />

        {/* 4. AI-powered file search */}
        <AISearch />

        {/* 5. Large-file storage */}
        <LargeFileStorage />

        {/* 6. Version history */}
        <VersionHistory />

        {/* 7. Secure sharing */}
        <SecureSharing />

        {/* 8. Developer/API access */}
        <DeveloperAccess />

        {/* 9. AI-agent access */}
        <AIAgentAccess />

        {/* 10. Business administration */}
        <BusinessAdmin
          onContactSales={() => handleOpenGetStarted('enterprise')}
        />

        {/* 11. Pricing */}
        <PricingSection
          onSelectPlan={(planId) => handleOpenGetStarted(planId)}
        />

        {/* 12. Security */}
        <SecuritySection />

        {/* 13. Download Center */}
        <DesktopApps />

        <DownloadCenter
          onTriggerDownload={(platform) => handleOpenDownload(platform)}
        />

        {/* Common Questions / FAQ */}
        <FAQSection />
      </main>

      {/* Quiet Footer */}
      <Footer
        onOpenGetStarted={() => handleOpenGetStarted('teams')}
        onOpenDownload={() => handleOpenDownload('macos')}
      />

      {/* Interactive Modals */}
      <TransferTray />

      <GetStartedModal
        isOpen={isGetStartedOpen}
        onClose={() => setIsGetStartedOpen(false)}
        initialPlan={selectedPlanForSignup}
      />

      <DownloadModal
        isOpen={isDownloadOpen}
        onClose={() => setIsDownloadOpen(false)}
        defaultPlatform={selectedPlatform}
      />

      <FilePreviewModal
        file={inspectedFile}
        onClose={() => setInspectedFile(null)}
        onOpenShare={() => handleScrollTo('secure-sharing')}
      />
    </div>
  );
}
