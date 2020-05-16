import React from 'react'
import gql from "graphql-tag"
import {useQuery} from '@apollo/react-hooks'
import Link from "next/link"


const AUTHORS_PER_PAGE = 20

const query = gql`
    query GET_AUTHORS(
        $first: Int
        $last: Int
        $after: String
        $before: String
    ){
        users(first: $first, last: $last, after: $after, before: $before) {
            pageInfo {
                hasNextPage
                hasPreviousPage
                startCursor
                endCursor
            }
            edges {
                node {
                    name
                    id
                    userId
                }
            }
        }
    }
`

const Authors = () => {

  const {loading, error, data, fetchMore} = useQuery(query, {
    variables: {
      first: AUTHORS_PER_PAGE,
      last: null,
      after: null,
      before: null
    }
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>GraphQL Error!</p>

  const {users} = data

  return (
    <>
      <h1>Authors</h1>
      <div>
        {users.pageInfo.hasPreviousPage && <button onClick={() => {
          fetchMore({
            variables: {
              first: null,
              after: null,
              last: AUTHORS_PER_PAGE,
              before: users.pageInfo.startCursor
            },
            updateQuery: (previousResult, {fetchMoreResult}) => {
              return fetchMoreResult
            }
          })
        }}>Prev</button>}

        {users.pageInfo.hasNextPage && <button onClick={() => {
          fetchMore({
            variables: {
              first: AUTHORS_PER_PAGE,
              after: users.pageInfo.endCursor,
              last: null,
              before: null
            },
            updateQuery: (previousResult, {fetchMoreResult}) => {
              return fetchMoreResult
            }
          })
        }}>Next</button>}

        {users.edges.map(u => (
          <div key={u.node.id}>
            <Link href={'/author/' + u.node.userId}>
              <a>
                <h3>{u.node.name}</h3>
              </a>
            </Link>
            <hr/>
          </div>
        ))}
      </div>
    </>
  )
}

export default Authors