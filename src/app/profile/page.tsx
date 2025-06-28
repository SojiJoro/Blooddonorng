// app/profile/page.jsx
"use client";
import { useState } from "react";
import Footer from '@/components/Footer';

const donorProfile = {
  name: "John Doe",
  email: "john.doe@example.com",
  bloodType: "O+",
  totalDonations: 15,
  points: 2750,
  nextBadgePoints: 3000,
  lastDonation: "2024-01-15",
  nextEligibleDate: "2024-03-15",
  joinedDate: "2022-10-01",
  location: "Lagos, NG",
  phone: "+234 801 234 5678",
  emergencyContact: {
    name: "Jane Doe",
    phone: "+234 809 876 5432"
  },
  badges: [
    { id: 1, name: "First Time Hero", description: "Completed first donation", earned: true, date: "2022-10-15", icon: "🌟" },
    { id: 2, name: "Regular Donor", description: "Donated 5 times", earned: true, date: "2023-03-20", icon: "💝" },
    { id: 3, name: "Life Saver", description: "Donated 10 times", earned: true, date: "2023-09-10", icon: "🦸" },
    { id: 4, name: "Blood Bank Champion", description: "Donated 20 times", earned: false, progress: 75, icon: "🏆" },
    { id: 5, name: "Community Hero", description: "Referred 3 new donors", earned: false, progress: 33, icon: "👥" }
  ],
  rewards: [
    { id: 1, name: "Coffee Shop Voucher", points: 100, available: true, redeemed: false },
    { id: 2, name: "Movie Theater Ticket", points: 250, available: true, redeemed: false },
    { id: 3, name: "Restaurant Gift Card", points: 500, available: true, redeemed: false },
    { id: 4, name: "Wellness Check-up", points: 1000, available: true, redeemed: true, redeemedDate: "2023-12-01" }
  ],
  healthData: {
    lastTestDate: "2024-01-10",
    bloodPressure: "118/75",
    hemoglobin: 14.8,
    ironLevel: 98,
    cholesterol: {
      total: 175,
      hdl: 65,
      ldl: 95,
    },
    bloodSugar: 82,
    weight: 170,
    height: "5'10\"",
    healthStatus: "Excellent"
  },
  donationHistory: [
    { date: "2024-01-15", location: "City Hospital", type: "Whole Blood", status: "Completed" },
    { date: "2023-11-20", location: "Community Center", type: "Platelets", status: "Completed" },
    { date: "2023-09-10", location: "Blood Drive", type: "Whole Blood", status: "Completed" },
    { date: "2023-07-05", location: "City Hospital", type: "Whole Blood", status: "Completed" },
    { date: "2023-05-12", location: "University Drive", type: "Whole Blood", status: "Completed" }
  ]
};

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showSocialSharing, setShowSocialSharing] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const calculateNextBadgeProgress = () => {
    const nextBadge = donorProfile.badges.find(badge => !badge.earned);
    if (nextBadge) {
      return nextBadge.progress || 0;
    }
    return 100;
  };

  const getHealthStatusColor = (status: string) => {
    switch (status) {
      case 'Excellent': return 'text-primary';
      case 'Good': return 'text-secondary';
      case 'Fair': return 'text-accent';
      default: return 'text-light';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Profile Header */}
      <section className="bg-gradient-to-br from-primary to-secondary py-16">
        <div className="container">
          <div className="glass-card slide-up">
            <div className="p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                {/* Profile Avatar */}
                <div className="relative">
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-accent rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-xl">
                    {donorProfile.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 md:w-8 md:h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {donorProfile.bloodType}
                  </div>
                </div>

                {/* Profile Info */}
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h1 className="text-3xl font-bold text-primary mb-2">{donorProfile.name}</h1>
                      <p className="text-light mb-1">{donorProfile.email}</p>
                      <p className="text-light">{donorProfile.location}</p>
                    </div>
                    <div className="flex gap-3 mt-4 md:mt-0">
                      <button 
                        onClick={() => setEditMode(!editMode)}
                        className="btn btn-outline btn-sm"
                      >
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                        </svg>
                        Edit Profile
                      </button>
                      <button 
                        onClick={() => setShowSocialSharing(true)}
                        className="btn btn-accent btn-sm"
                      >
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/>
                        </svg>
                        Share
                      </button>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-accent">{donorProfile.totalDonations}</div>
                      <div className="text-sm text-light">Total Donations</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{donorProfile.points}</div>
                      <div className="text-sm text-light">Points Earned</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-secondary">{donorProfile.badges.filter(b => b.earned).length}</div>
                      <div className="text-sm text-light">Badges Earned</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">2+</div>
                      <div className="text-sm text-light">Years Active</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Content */}
      <section className="flex-1 py-16 bg-light">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:w-1/3">
              <div className="glass-card slide-up">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-primary mb-6">Quick Actions</h3>
                  <div className="space-y-4">
                    <button className="btn btn-primary btn-md w-full">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                      Schedule Donation
                    </button>
                    <button className="btn btn-outline btn-md w-full">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                      View Rewards
                    </button>
                    <button className="btn btn-outline btn-md w-full">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                      </svg>
                      Download Reports
                    </button>
                  </div>

                  {/* Next Badge Progress */}
                  <div className="mt-8">
                    <h4 className="font-semibold text-primary mb-4">Next Badge Progress</h4>
                    <div className="bg-gray-200 rounded-full h-3 mb-2">
                      <div 
                        className="bg-accent h-3 rounded-full transition-all duration-300"
                        style={{ width: `${calculateNextBadgeProgress()}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-light">
                      {donorProfile.nextBadgePoints - donorProfile.points} points to next badge
                    </p>
                  </div>

                  {/* Health Status */}
                  <div className="mt-8">
                    <h4 className="font-semibold text-primary mb-4">Health Status</h4>
                    <div className="flex items-center justify-between">
                      <span className="text-light">Overall Status:</span>
                      <span className={`font-semibold ${getHealthStatusColor(donorProfile.healthData.healthStatus)}`}>
                        {donorProfile.healthData.healthStatus}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-light">Last Check:</span>
                      <span className="text-primary">{donorProfile.healthData.lastTestDate}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:w-2/3">
              {/* Tab Navigation */}
              <div className="bg-white rounded-lg shadow-lg mb-6 slide-up" style={{ animationDelay: '0.1s' }}>
                <div className="flex overflow-x-auto">
                  {[
                    { id: 'overview', label: 'Overview', icon: '📊' },
                    { id: 'history', label: 'Donation History', icon: '📋' },
                    { id: 'badges', label: 'Badges & Rewards', icon: '🏆' },
                    { id: 'health', label: 'Health Insights', icon: '❤️' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center px-6 py-4 font-medium transition-all ${
                        activeTab === tab.id
                          ? 'border-b-2 border-accent text-accent'
                          : 'text-light hover:text-primary'
                      }`}
                    >
                      <span className="mr-2">{tab.icon}</span>
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="space-y-6">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <div className="space-y-6 fade-in">
                    {/* Recent Activity */}
                    <div className="glass-card">
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-primary mb-6">Recent Activity</h3>
                        <div className="space-y-4">
                          <div className="flex items-center p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-4">
                              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                               <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                              </svg>
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-primary">Successful Donation</h4>
                              <p className="text-light">Donated whole blood at City Hospital</p>
                              <p className="text-sm text-light">{donorProfile.lastDonation}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                              </svg>
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-primary">Badge Earned</h4>
                              <p className="text-light">Life Saver - 10 donations completed</p>
                              <p className="text-sm text-light">2023-09-10</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Impact Summary */}
                    <div className="glass-card">
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-primary mb-6">Your Impact</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="text-center">
                          <div className="w-12 h-12 md:w-16 md:h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                              <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                              </svg>
                            </div>
                            <div className="text-3xl font-bold text-accent mb-2">45</div>
                            <div className="text-sm text-light">Lives Potentially Saved</div>
                          </div>
                          <div className="text-center">
                          <div className="w-12 h-12 md:w-16 md:h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                              <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-8 2h2v4h4v2h-4v4h-2v-4H7v-2h4V5z"/>
                              </svg>
                            </div>
                            <div className="text-3xl font-bold text-primary mb-2">8</div>
                            <div className="text-sm text-light">Hospitals Helped</div>
                          </div>
                          <div className="text-center">
                          <div className="w-12 h-12 md:w-16 md:h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                              <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                              </svg>
                            </div>
                            <div className="text-3xl font-bold text-secondary mb-2">7.5L</div>
                            <div className="text-sm text-light">Blood Donated</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Donation History Tab */}
                {activeTab === 'history' && (
                  <div className="glass-card fade-in">
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-primary mb-6">Donation History</h3>
                      <div className="space-y-4">
                        {donorProfile.donationHistory.map((donation, index) => (
                          <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="flex items-center">
                              <div className="w-10 h-10 md:w-12 md:h-12 bg-accent rounded-full flex items-center justify-center mr-4">
                                <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                                </svg>
                              </div>
                              <div>
                                <h4 className="font-semibold text-primary">{donation.type}</h4>
                                <p className="text-light">{donation.location}</p>
                                <p className="text-sm text-light">{donation.date}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                {donation.status}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-6 text-center">
                        <p className="text-light mb-4">Next eligible donation date: <span className="font-semibold text-primary">{donorProfile.nextEligibleDate}</span></p>
                        <button className="btn btn-primary btn-md">
                          Schedule Next Donation
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Badges & Rewards Tab */}
                {activeTab === 'badges' && (
                  <div className="space-y-6 fade-in">
                    {/* Badges */}
                    <div className="glass-card">
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-primary mb-6">Achievement Badges</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {donorProfile.badges.map((badge) => (
                            <div key={badge.id} className={`p-4 rounded-lg border-2 transition-all ${
                              badge.earned 
                                ? 'bg-primary border-primary text-white' 
                                : 'bg-gray-50 border-gray-200 text-gray-500'
                            }`}>
                              <div className="text-center">
                                <div className="text-3xl mb-2">{badge.icon}</div>
                                <h4 className="font-semibold mb-1">{badge.name}</h4>
                                <p className="text-sm opacity-80 mb-3">{badge.description}</p>
                                {badge.earned ? (
                                  <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded">
                                    Earned {badge.date}
                                  </span>
                                ) : (
                                  <div>
                                    <div className="w-full bg-gray-300 rounded-full h-2 mb-2">
                                      <div 
                                        className="bg-accent h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${badge.progress || 0}%` }}
                                      ></div>
                                    </div>
                                    <span className="text-xs">{badge.progress || 0}% Complete</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Rewards */}
                    <div className="glass-card">
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-primary mb-6">Available Rewards</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {donorProfile.rewards.map((reward) => (
                            <div key={reward.id} className="p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                              <div className="flex items-center justify-between mb-3">
                                <h4 className="font-semibold text-primary">{reward.name}</h4>
                                <span className="text-accent font-bold">{reward.points} pts</span>
                              </div>
                              {reward.redeemed ? (
                                <div className="flex items-center text-green-600">
                                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                  </svg>
                                  Redeemed on {reward.redeemedDate}
                                </div>
                              ) : (
                                <button 
                                  className={`btn btn-sm w-full ${
                                    donorProfile.points >= reward.points 
                                      ? 'btn-accent' 
                                      : 'btn-outline opacity-50 cursor-not-allowed'
                                  }`}
                                  disabled={donorProfile.points < reward.points}
                                >
                                  {donorProfile.points >= reward.points ? 'Redeem Now' : 'Not Enough Points'}
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Health Insights Tab */}
                {activeTab === 'health' && (
                  <div className="space-y-6 fade-in">
                    <div className="glass-card">
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-primary mb-6">Health Metrics</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          <div className="text-center p-4 bg-blue-50 rounded-lg">
                            <div className="text-2xl font-bold text-blue-600 mb-2">{donorProfile.healthData.bloodPressure}</div>
                            <div className="text-sm text-light">Blood Pressure</div>
                            <div className="text-xs text-green-600 mt-1">Normal</div>
                          </div>
                          <div className="text-center p-4 bg-red-50 rounded-lg">
                            <div className="text-2xl font-bold text-red-600 mb-2">{donorProfile.healthData.hemoglobin}</div>
                            <div className="text-sm text-light">Hemoglobin (g/dL)</div>
                            <div className="text-xs text-green-600 mt-1">Excellent</div>
                          </div>
                          <div className="text-center p-4 bg-yellow-50 rounded-lg">
                            <div className="text-2xl font-bold text-yellow-600 mb-2">{donorProfile.healthData.ironLevel}%</div>
                            <div className="text-sm text-light">Iron Level</div>
                            <div className="text-xs text-green-600 mt-1">Good</div>
                          </div>
                          <div className="text-center p-4 bg-purple-50 rounded-lg">
                            <div className="text-2xl font-bold text-purple-600 mb-2">{donorProfile.healthData.cholesterol.total}</div>
                            <div className="text-sm text-light">Cholesterol</div>
                            <div className="text-xs text-green-600 mt-1">Optimal</div>
                          </div>
                          <div className="text-center p-4 bg-green-50 rounded-lg">
                            <div className="text-2xl font-bold text-green-600 mb-2">{donorProfile.healthData.bloodSugar}</div>
                            <div className="text-sm text-light">Blood Sugar</div>
                            <div className="text-xs text-green-600 mt-1">Normal</div>
                          </div>
                          <div className="text-center p-4 bg-indigo-50 rounded-lg">
                            <div className="text-2xl font-bold text-indigo-600 mb-2">{donorProfile.healthData.weight} lbs</div>
                            <div className="text-sm text-light">Weight</div>
                            <div className="text-xs text-green-600 mt-1">Healthy</div>
                          </div>
                        </div>
                        
                        <div className="mt-8 p-4 bg-green-50 rounded-lg border border-green-200">
                          <div className="flex items-center">
                            <svg className="w-6 h-6 text-green-600 mr-3" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                            <div>
                                                            <h4 className="font-semibold text-green-800">Overall Health Status: {donorProfile.healthData.healthStatus}</h4>
                              <p className="text-sm text-green-700">
                                All your health metrics are within normal ranges. You&apos;re eligible for donation.
                                Last health check: {donorProfile.healthData.lastTestDate}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Health Timeline */}
                    <div className="glass-card">
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-primary mb-6">Health Check History</h3>
                        <div className="space-y-4">
                          <div className="flex items-center p-4 bg-white rounded-lg border border-gray-100">
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-primary rounded-full flex items-center justify-center mr-4">
                              <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                              </svg>
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-primary">Comprehensive Health Check</h4>
                              <p className="text-light">All vitals checked and cleared for donation</p>
                              <p className="text-sm text-light">{donorProfile.healthData.lastTestDate}</p>
                            </div>
                            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                              Cleared
                            </span>
                          </div>
                        </div>
                        
                        <div className="mt-6 text-center">
                          <button className="btn btn-outline btn-md">
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
                            </svg>
                            Download Health Report
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Sharing Modal */}
      {showSocialSharing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full scale-in">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-primary">Share Your Impact</h3>
                <button 
                  onClick={() => setShowSocialSharing(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                  </svg>
                </button>
              </div>
              
              <div className="text-center mb-6">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-primary mb-2">
                  I&apos;ve saved {donorProfile.totalDonations * 3} lives through blood donation!
                </h4>
                <p className="text-light">
                  {donorProfile.totalDonations} donations • {donorProfile.points} points earned
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <button className="btn btn-outline btn-md">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                  Twitter
                </button>
                <button className="btn btn-outline btn-md">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}