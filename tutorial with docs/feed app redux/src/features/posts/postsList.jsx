import { useSelector, useDispatch } from "react-redux";
import { selectPosts } from "./postSlice";

const PostsList = () => {
  const posts = useSelector(selectPosts);
  const dispatch = useDispatch();

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {posts.map((post) => (
        <article className="post-excerpt" key={post.id}>
          <h3>{post.title}</h3>
          <p className="post-content">{post.content.substring(0, 100)}</p>
        </article>
      ))}
    </section>
  );
};


export default PostsList