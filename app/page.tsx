import EventCard from '@/components/EventCard'
import ExploreBtn from '@/components/ExploreBtn'
import React from 'react'
import { events } from '@/lib/constants'
import { IEvent } from '@/database/event.model'

const page = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/events`, {cache: 'no-store'})
  const { events } = await response.json();
  
  return (
    <section className="flex flex-col items-center">
      <h1 className='text-center'>The hub for Every Dev <br/> Event You cant miss</h1>
      <p className='text-center mt-5'>Hackathons, Meetups, & Conferences, All in one place</p>
      <ExploreBtn />
      <div className = "mt-20 space-y-7">
        <h3>Featured Events</h3>
  <ul className="events">
    {events && events.length > 0 &&events.map((event: IEvent) => (
      <li key={event.title} className='list-none'><EventCard {...event}/> </li>
    ))}
  </ul>
      </div>
    </section>
  )
}

export default page