import React, {useState} from 'react'
import {useRouter} from 'next/router'
import Post from "../components/Post"

const Preview = () => {
  const router = useRouter()
  const {title, date, content, author, categories} = router.query

  if (!Object.keys(router.query).length) {
    const [title, setTitle] = useState('')
    const [date, setDate] = useState('')
    const [content, setContent] = useState('')
    const [author, setAuthor] = useState({})
    const [categories, setCategories] = useState({})

    return (
      <>
        <div>
          <div><label htmlFor="title">Title: <input type="text" id="title" onChange={(e) => {
            setTitle(e.target.value)
          }}/></label></div>
          <div><label htmlFor="date">Date: <input type="text" id="date" placeholder="文字列で" onChange={(e) => {
            setDate(e.target.value)
          }}/></label></div>
          <div><label htmlFor="author-name">AuthorName: <input type="text" id="authore-name" onChange={(e) => {
            setAuthor({name: e.target.value})
          }}/></label></div>
          <div><label htmlFor="category-name">CategoryName: <input type="text" id="category-name" onChange={(e) => {
            setCategories({edges: [{node: {name: e.target.value}}]})
          }}/></label></div>
          <div><label htmlFor="content">Content: <textarea id="content" placeholder="htmlタグで" onChange={(e) => {
            setContent(e.target.value)
          }}/></label>
          </div>
        </div>

        <div>
          <button onClick={() => {
            router.push({
              pathname: '/preview',
              query: {
                title,
                date,
                content,
                author: JSON.stringify(author),
                categories: JSON.stringify(categories)
              },
            })
          }
          }>Preview
          </button>
        </div>
      </>
    )
  }


  return (
    <>
      <Post title={title}
            date={date}
            content={content}
            author={author && JSON.parse(author)}
            categories={categories && JSON.parse(categories)}/>
    </>
  )
}

export default Preview