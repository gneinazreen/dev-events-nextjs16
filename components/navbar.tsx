import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
const Navbar = () => {
  return (
    <header>
        <nav>
            <Link href="/" className='logo'>
            <Image src="/icons/logo.png" alt="logo" width={24} height={24} />
           <p>DevEvent</p>
           <ul>
            <Link href="/"></Link>
            <Link href="/"></Link>
            <Link href="/"></Link>
           </ul>
            </Link>
            
        </nav>
        </header>
  )
}

export default Navbar