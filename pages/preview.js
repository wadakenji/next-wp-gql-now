import React from 'react'
import Post from "../components/Post"

const Preview = ({post}) => {
  return (
    <>
      <Post {...post}/>
    </>
  )
}

export async function getStaticProps(context) {
  return {
    props: {
      post: context.previewData ? context.previewData : null
    }
  }
}

export default Preview