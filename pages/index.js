import React from 'react'
import Link from "next/link"

const Index = () => {
  return (
    <>
      <h1>Next! WordPress! GraphQL! now!</h1>
      <div>
        <Link href={'/posts'}>Go to BLOG!!!</Link>
      </div>
    </>
  )
}

export default Index