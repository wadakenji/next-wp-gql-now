import React from 'react'
import gql from "graphql-tag"
import {useQuery} from '@apollo/react-hooks'
import Link from "next/link"


const CATEGORIES_PER_PAGE = 20

const query = gql`
    query GET_CATEGORIES(
        $first: Int
        $last: Int
        $after: String
        $before: String
    ){
        categories(first: $first, last: $last, after: $after, before: $before) {
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
                    categoryId
                }
            }
        }
    }
`

const Categories = () => {

  const {loading, error, data, fetchMore} = useQuery(query, {
    variables: {
      first: CATEGORIES_PER_PAGE,
      last: null,
      after: null,
      before: null
    }
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>GraphQL Error!</p>

  const {categories} = data

  return (
    <>
      <h1>Categories</h1>
      <div>
        {categories.pageInfo.hasPreviousPage && <button onClick={() => {
          fetchMore({
            variables: {
              first: null,
              after: null,
              last: CATEGORIES_PER_PAGE,
              before: categories.pageInfo.startCursor
            },
            updateQuery: (previousResult, {fetchMoreResult}) => {
              return fetchMoreResult
            }
          })
        }}>Prev</button>}

        {categories.pageInfo.hasNextPage && <button onClick={() => {
          fetchMore({
            variables: {
              first: CATEGORIES_PER_PAGE,
              after: categories.pageInfo.endCursor,
              last: null,
              before: null
            },
            updateQuery: (previousResult, {fetchMoreResult}) => {
              return fetchMoreResult
            }
          })
        }}>Next</button>}

        {categories.edges.map(c => (
          <div key={c.node.id}>
            <Link href={'/category/' + c.node.categoryId}>
              <a>
                <h3>{c.node.name}</h3>
              </a>
            </Link>
            <hr/>
          </div>
        ))}
      </div>
    </>
  )
}

export default Categories