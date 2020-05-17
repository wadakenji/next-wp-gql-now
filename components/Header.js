import React from 'react'
import Link from "next/link"

const Header = () => {
  return (
    <header>
      <Link href={'/'}><a>Top</a></Link>
      <Link href={'/author'}><a>Authors</a></Link>
      <Link href={'/category'}><a>Categories</a></Link>
      <Link href={'/preview'}><a>Preview</a></Link>
    </header>
  )
}

export default Header