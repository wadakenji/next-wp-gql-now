import React from 'react'
import gql from "graphql-tag"
import {useQuery} from '@apollo/react-hooks'
import {useRouter} from "next/router"
import PostList from "../../components/PostList"
import PaginationBtn from "../../components/PaginationBtn"

const POSTS_PER_PAGE = 5

const query = gql`
    query GET_POSTS_BY_AUTHOR(
        $categoryId: Int
        $first: Int
        $last: Int
        $after: String
        $before: String
    ){
        posts(where: {categoryId: $categoryId} first: $first, last: $last, after: $after, before: $before) {
            pageInfo {
                hasNextPage
                hasPreviousPage
                startCursor
                endCursor
            }
            edges {
                node {
                    author {
                        name
                        userId
                    }
                    categories {
                        edges {
                            node {
                                categoryId
                                name
                            }
                        }
                    }
                    date
                    excerpt(format: RENDERED)
                    postId
                    title
                    id
                    content
                    featuredImage {
                        sourceUrl
                    }
                }
            }
        }
    }
`

const CategoryPosts = () => {
  const router = useRouter()
  const {id} = router.query

  const {loading, error, data, fetchMore} = useQuery(query, {
    variables: {
      categoryId: id,
      first: POSTS_PER_PAGE,
      last: null,
      after: null,
      before: null
    }
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>GraphQL Error!</p>

  const {posts} = data

  return (
    <>
      <h1>Posts</h1>
      <div>
        <PaginationBtn fetchMore={fetchMore} postsPerPage={POSTS_PER_PAGE}
                       hasPreviousPage={posts.pageInfo.hasPreviousPage} hasNextPage={posts.pageInfo.hasNextPage}
                       startCursor={posts.pageInfo.startCursor} endCursor={posts.pageInfo.endCursor}/>

        <PostList posts={posts}/>
      </div>
    </>
  )
}

export default CategoryPosts