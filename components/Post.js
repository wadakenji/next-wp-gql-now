import React from 'react'
import Link from "next/link"

const Post = ({title, date, author, categories, content}) => {
  return (
    <>
      <h1>{title}</h1>
      <div>
        <div>{date}</div>
        <Link href={'/author/' + author?.userId}>
          <a>
            <div>{author?.name}</div>
          </a>
        </Link>
        <div>{categories?.edges.map(c => (
          <Link href={'/category/' + c.node.categoryId} key={c.node.categoryId}>
            <a>
              <div>{c.node.name}</div>
            </a>
          </Link>
        ))}</div>
      </div>
      <div dangerouslySetInnerHTML={{
        __html: content
      }}/>
    </>
  )
}

export default Post