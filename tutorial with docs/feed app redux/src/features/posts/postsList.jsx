import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { PostAuthor } from "./PostAuthor";
import { selectPosts } from "./postSlice";
import { ReactionButtons } from "./ReactionButtons";
import TimeAgo from "./TimeAgo";


const PostsList = () => {
  const posts = useSelector(selectPosts);
  const dispatch = useDispatch();

  // sorting the posts in reverse chronological order by datetime
  const orderedPosts = posts.slice()
    .sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {orderedPosts.map((post) => (
        <article className="post-excerpt" key={post.id}>
          <h3>{post.title}</h3>
          <p className="post-content">{post.content.substring(0, 100)}</p>
          <PostAuthor userId={post.user} />
          <TimeAgo timestamp={post.date}/>
          <ReactionButtons post={post} />
          <Link to={`/posts/${post.id}`} className="button muted-button">
            View Post
          </Link>
        </article>
      ))}
    </section>
  );
};

export default PostsList;
