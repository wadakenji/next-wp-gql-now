import React from 'react'
import Link from "next/link"

const PostList = ({posts}) => {
  return (
    <>
      {posts.edges.map(p => (
        <div key={p.node.id}>
          <Link href={`/post/` + p.node.postId}>
            <a>
              <h3>{p.node.title}</h3>
            </a>
          </Link>
          <div>{p.node.date}</div>
          <Link href={`/author/` + p.node.author.userId}>
            <a>
              <div>{p.node.author.name}</div>
            </a>
          </Link>
          {p.node.categories.edges.map(c => (
            <Link href={'/category/' + c.node.categoryId} key={c.node.categoryId}>
              <a>
                <div>{c.node.name}</div>
              </a>
            </Link>
          ))}
          <div dangerouslySetInnerHTML={{
            __html: p.node.excerpt
          }}/>
          <Link href={`/post/` + p.node.postId}>
            <a>
              <img src={p.node.featuredImage?.sourceUrl} style={{width: '50%'}}/>
            </a>
          </Link>
          <hr/>
        </div>
      ))}
    </>
  )
}

export default PostList