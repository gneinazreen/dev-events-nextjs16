'use client';
import { createBooking } from '@/lib/actions/booking.actions';
import {useState} from 'react';
import posthog from 'posthog-js';
const BookEvent = ({eventId, slug}: {eventId: string, slug: string}) => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const handleSubmit = async (e: React.FormEvent) => {
       e.preventDefault()
        const {success} = await createBooking({eventId, slug, email})
       if(success) {
        setSubmitted(true)
        posthog.capture('event_booked', {eventId,slug, email})

       }else{
            console.error("Booking creation failed")
            posthog.captureException("Booking creation failed")
        } 
       e.preventDefault();
       setTimeout(() => {
        setSubmitted(true);
       },1000)
       
        }
  return (
    <div id= "book-event">
        {submitted ? (
            <p className="text-sm">Thank you for booking your spot! A confirmation email has been sent to {email}.</p>
        ): (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <label htmlFor="email">Email Address</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Enter your email address'
                />
                <button type="submit" onClick={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                }}>
                    Book Event
                </button>
            </form>
        )}
    </div>
  )
}

export default BookEvent