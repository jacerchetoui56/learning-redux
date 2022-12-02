import React from 'react'
import { useSelector } from 'react-redux'

export const PostAuthor = ({ userId }) => {
  const author = useSelector(state =>
    state.users.find(user => user.id === userId)
  )

  return <span style={{display : 'block', color : 'grey'}}>by {author ? author.name : 'Unknown author'}</span>
}