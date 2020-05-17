import React from 'react'
import {useRouter} from 'next/router'
import gql from "graphql-tag"
import {useQuery} from '@apollo/react-hooks'
import Link from "next/link"
import Post from "../../components/Post"


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

const PostPage = () => {
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
      <Post {...data.post}/>
    </>
  )
}

export default PostPage