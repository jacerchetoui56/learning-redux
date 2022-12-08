import { useSelector , useDispatch} from "react-redux";
import { selectAllPosts , fetchPosts, getPostsError, getPostsStatus} from "./postsSlice";

import { useEffect } from "react";
import {PostsExcerpt} from "./PostsExcerpt";

const PostsList = () => {
    const dispatch = useDispatch()
    const posts = useSelector(selectAllPosts)
    const postsStatus = useSelector(getPostsStatus)
    const error = useSelector(getPostsError)

    useEffect(() => {
        if (postsStatus === 'idle') {
            dispatch(fetchPosts())
        }
    }, [postsStatus, dispatch]) //* we're checking everytime if we need to fetch posts or not after every render

    let content;
    if (postsStatus === 'loading') {
        content = <h4>Loading...</h4>;
    } else if (postsStatus === 'succeeded') {
        const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
        content = orderedPosts.map(post => <PostsExcerpt key={post.id} post={post} />)
    } else if (postsStatus === 'failed') {
        content = <p>{error}</p>;
    }

    return (
        <section>
            <h2>Posts</h2>
            {content}
        </section>
    )
}
export default PostsList