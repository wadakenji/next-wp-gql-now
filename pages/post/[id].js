import React from 'react'
import {useRouter} from 'next/router'
import gql from "graphql-tag"
import {useQuery} from '@apollo/react-hooks'
import Link from "next/link"


const query = gql`
    query GET_POST(
        $id: ID!
    ) {
        post(idType: DATABASE_ID, id: $id) {
            author {
                id
                name
            }
            categories {
                edges {
                    node {
                        categoryId
                        name
                    }
                }
            }
            content
            date
            postId
            title
        }
    }
`

const Post = () => {
  const router = useRouter()
  const {id} = router.query

  const {loading, error, data} = useQuery(query, {
    variables: {
      id
    }
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>GraphQL Error!</p>

  return (
    <>
      <h1>{data.post.title}</h1>
      <div>
        <div>{data.post.date}</div>
        <Link href={'/author/' + data.post.author.userId}>
          <a>
            <div>{data.post.author.name}</div>
          </a>
        </Link>
        <div>{data.post.categories.edges.map(c => (
          <Link href={'/category/' + c.node.categoryId}>
            <a>
              <div>{c.node.name}</div>
            </a>
          </Link>
        ))}</div>
      </div>
      <div dangerouslySetInnerHTML={{
        __html: data.post.content
      }}/>
    </>
  )
}

export default Post