'use client'

import Image from 'next/image'

const ExploreBtn = () => {
  return (
    <a href="#events" className="mt-7 mx-auto inline-block">
      <button type="button" id="explore-btn" className="flex items-center gap-2">
        Explore Events
        <Image src="/icons/arrow-down.svg" alt="arrow-down" width={24} height={24} />
      </button>
    </a>
  )
}

export default ExploreBtn