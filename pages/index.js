import React from 'react'
import gql from "graphql-tag"
import {graphql} from 'react-apollo'

const query = gql`
    {
        posts {
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

const Index = ({data: {loading, posts}}) => {
  if (loading) return <p>Loading...</p>

  posts = posts.edges


  return (
    <>
      <h1>Next! WordPress! GraphQL! now!</h1>
      <div>
        {posts.map(p => (
          <>
            <h3>{p.node.title}</h3>
            <div>{p.node.date}</div>
            <div>{p.node.author.name}</div>
            <div>{p.node.excerpt}</div>
            <img src={p.node.featuredImage?.sourceUrl} style={{width: '50%'}}/>
            <hr/>
          </>
        ))}
      </div>
    </>
  )
}

export default graphql(query)(Index)