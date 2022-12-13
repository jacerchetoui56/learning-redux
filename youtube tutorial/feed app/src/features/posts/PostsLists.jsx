import { useSelector, useDispatch } from "react-redux";
import {
  selectAllPosts,
  selectPostIds,
  getPostsError,
  getPostsStatus,
} from "./postsSlice";

import { PostsExcerpt } from "./PostsExcerpt";

const PostsList = () => {
  const dispatch = useDispatch();
  // const posts = useSelector(selectAllPosts);
  const postIds = useSelector(selectPostIds);
  const postsStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  //   useEffect(() => {
  //     console.log("postsStatus", postsStatus);
  //     if (postsStatus === "idle") {
  //       dispatch(fetchPosts());
  //     }
  //   }, [postsStatus, dispatch]); //* we're checking everytime if we need to fetch posts or not after every render

  let content;
  if (postsStatus === "loading") {
    content = <h4>Loading...</h4>;
  } else if (postsStatus === "succeeded") {
    content = postIds.map((postId) => (
      <PostsExcerpt key={postId} postId={postId} />
    ));
  } else if (postsStatus === "failed") {
    content = <p>{error}</p>;
  }

  return <section>{content}</section>;
};

export default PostsList;
