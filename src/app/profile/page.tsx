// app/profile/page.jsx
"use client";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileHeader } from "@/components/profile/profile-header";
import { ProfileSidebar } from "@/components/profile/profile-sidebar";
import { ProfileOverviewTab } from "@/components/profile/tabs/overview-tab";
import { ProfileBadgesTab } from "@/components/profile/tabs/badges-tab";
import { ProfileRewardsTab } from "@/components/profile/tabs/rewards-tab";
import { ProfileHealthTab } from "@/components/profile/tabs/health-tab";
import { SocialSharingComponent } from "@/components/social-sharing-component";

const donorProfile = {
  name: "John Doe",
  email: "john.doe@example.com",
  bloodType: "O+",
  totalDonations: 5,
  points: 750,
  nextBadgePoints: 1000,
  lastDonation: "2023-02-15",
  joinedDate: "2022-10-01",
  badges: [
    // Add badge objects
  ],
  rewards: [
    // Add reward objects
  ],
  achievements: [
    // Add achievement objects
  ],
  activeDonation: null,
  healthData: {
    lastTestDate: "2023-02-10",
    bloodPressure: "120/80",
    hemoglobin: 14.2,
    ironLevel: 95,
    cholesterol: {
      total: 180,
      hdl: 60,
      ldl: 100,
    },
    bloodSugar: 85,
    reports: [],
  },
};

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showSocialSharing, setShowSocialSharing] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      <ProfileHeader />
      <main className="flex-1 container mx-auto py-6">
        <div className="flex flex-col gap-6 md:flex-row">
          <ProfileSidebar profile={donorProfile} onShareClick={() => setShowSocialSharing(true)} />
          <div className="md:w-2/3">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="badges">Badges</TabsTrigger>
                <TabsTrigger value="rewards">Rewards</TabsTrigger>
                <TabsTrigger value="health">Health Insights</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-6 pt-4">
                <ProfileOverviewTab
                  earnedBadges={[]}
                  availableRewards={[]}
                  achievements={[]}
                  activeDonation={donorProfile.activeDonation}
                  onViewAllBadges={() => setActiveTab("badges")}
                  onViewAllRewards={() => setActiveTab("rewards")}
                />
              </TabsContent>
              <TabsContent value="badges" className="pt-4">
                <ProfileBadgesTab earnedBadges={[]} inProgressBadges={[]} />
              </TabsContent>
              <TabsContent value="rewards" className="pt-4">
                <ProfileRewardsTab availableRewards={[]} redeemedRewards={[]} />
              </TabsContent>
              <TabsContent value="health" className="pt-4">
                <ProfileHealthTab healthData={donorProfile.healthData} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      {showSocialSharing && <SocialSharingComponent donor={donorProfile} onClose={() => setShowSocialSharing(false)} />}
    </div>
  );
}
