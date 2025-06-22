interface OverviewProps {
  earnedBadges: unknown[]
  availableRewards: unknown[]
  achievements: unknown[]
  activeDonation: unknown
  onViewAllBadges: () => void
  onViewAllRewards: () => void
}

export function ProfileOverviewTab({ onViewAllBadges, onViewAllRewards }: OverviewProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold">Overview</h2>
      <button onClick={onViewAllBadges}>View Badges</button>
      <button onClick={onViewAllRewards}>View Rewards</button>
    </div>
  )
}
