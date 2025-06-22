interface SocialSharingProps {
  donor: { name: string }
  onClose: () => void
}

export function SocialSharingComponent({ donor, onClose }: SocialSharingProps) {
  return (
    <div className="p-4 border rounded">
      <p>Share {donor.name}&apos;s profile</p>
      <button onClick={onClose}>Close</button>
    </div>
  )
}
