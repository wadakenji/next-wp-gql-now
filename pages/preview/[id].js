import React from 'react'
import {useRouter} from 'next/router'
import gql from "graphql-tag"
import {useQuery} from '@apollo/react-hooks'
import Post from "../../components/Post"

const query = gql`
    query (
        $id: ID!
    ) {
        post(id: $id, idType: DATABASE_ID) {
            status
            title
            date
            author {
                name
                userId
            }
            content
            categories {
                edges {
                    node {
                        categoryId
                        name
                    }
                }
            }
        }
        revisions(where: {parentIn: [$id]}, first: 1) {
            edges {
                node {
                    ... on Post {
                        slug
                        title
                        date
                        author {
                            name
                            userId
                        }
                        content
                        categories {
                            edges {
                                node {
                                    categoryId
                                    name
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`


const PreviewPage = () => {
  const router = useRouter()

  let postProps = {}

  const {
    loading,
    error,
    data
  } = useQuery(query, {
    variables: {id: router.query.id},
  })

  if (loading) return <p>Loading...</p>
  if (error) {
    console.log(error)
    return (<p>GraphQL Error!</p>)
  }

  const {
    post,
    revisions: {
      edges: [{node: lastRevision}]
    }
  } = data
  if (!post) return <p>Invalid Post ID.</p>

  //公開済みか下書きかで分岐
  switch (post.status) {
    case 'publish':
      const autosaveExists = lastRevision && lastRevision.slug.match(/autosave/)
      //公開済みのときオートセーブデータがあるかどうかで分岐
      if (autosaveExists) {
        //オートセーブがあるときはtitle, contentのみオートセーブのものを使う
        postProps = {
          title: lastRevision.title,
          content: lastRevision.content,
          date: post.date,
          author: post.author,
          categories: post.categories
        }
      } else {
        //オートセーブがないときは公開済みのデータを表示する
        postProps = post
      }
      break
    case 'draft':
      //下書きのときは下書きのデータを表示する
      postProps = post
      break
    default:
      return <p>Invalid Post Status.</p>
  }

  return (
    <>
      <Post {...postProps}/>
    </>
  )
}

export default PreviewPage