import React from 'react'
import {useSelector} from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { PostAuthor } from './PostAuthor'
import { ReactionButtons } from './ReactionButtons'
import TimeAgo from './TimeAgo'

export default function SinglePostPage() {
    const { postId } = useParams()
    
    const post = useSelector (state => {
        return state.posts.find(p => p.id === postId)
    })

    if (!post){
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        )
    }

  return (
    <section>
      <article className="post">
        <h2>{post.title}</h2>
        <p className="post-content">{post.content}</p>
        <PostAuthor userId={post.user}/>
        <TimeAgo timestamp={post.date}/>
        <ReactionButtons post={post} />
        <Link to={`/editPost/${post.id}`} className="button">
            Edit Post
        </Link>
      </article>
    </section>
  )
}
