interface ProfileSidebarProps {
  profile: { name: string }
  onShareClick?: () => void
}

export function ProfileSidebar({ profile, onShareClick }: ProfileSidebarProps) {
  return (
    <aside className="mb-4">
      <div className="font-semibold">Sidebar for {profile.name}</div>
      {onShareClick && (
        <button onClick={onShareClick} className="text-blue-600">Share</button>
      )}
    </aside>
  )
}
