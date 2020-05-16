import React from 'react'

const PaginationBtn = ({fetchMore, postsPerPage, hasPreviousPage, hasNextPage, startCursor, endCursor}) => {
  return (
    <>
      {hasPreviousPage && <button onClick={() => {
        fetchMore({
          variables: {
            first: null,
            after: null,
            last: postsPerPage,
            before: startCursor
          },
          updateQuery: (previousResult, {fetchMoreResult}) => {
            return fetchMoreResult
          }
        })
      }}>Prev</button>}

      {hasNextPage && <button onClick={() => {
        fetchMore({
          variables: {
            first: postsPerPage,
            after: endCursor,
            last: null,
            before: null
          },
          updateQuery: (previousResult, {fetchMoreResult}) => {
            return fetchMoreResult
          }
        })
      }}>Next</button>}
    </>
  )
}

export default PaginationBtn