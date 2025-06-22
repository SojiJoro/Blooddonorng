// app/components/TwitterFeed.js
'use client'
import { useEffect } from 'react'

export default function TwitterFeed() {
  useEffect(() => {
    if (window && window.twttr) {
      window.twttr.widgets.load()
    }
  }, [])

  return (
    <div>
      <a
        className="twitter-timeline"
        data-theme="light"
        data-link-color="#2B7BB9"
        href="https://twitter.com/BloodDonorNG?ref_src=twsrc%5Etfw"
      >
        Tweets by BloodDonorNG
      </a>
    </div>
  )
}
