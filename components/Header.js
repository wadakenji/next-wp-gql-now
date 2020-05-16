import React from 'react'
import Link from "next/link"

const Header = () => {
  return (
    <header>
      <Link href={'/'}>Top</Link>
      <Link href={'/author'}>Authors</Link>
      <Link href={'/category'}>Categories</Link>
    </header>
  )
}

export default Header