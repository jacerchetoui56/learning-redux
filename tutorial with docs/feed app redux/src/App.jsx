import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navbar } from "./app/Navbar";
import PostsList from "./features/posts/postsList";
import AddPostForm from "./features/posts/addPostForm";
import SinglePostPage from "./features/posts/SinglePostPage";
import { EditPostForm } from "./features/posts/EditPostForm";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <AddPostForm />
                <PostsList />
              </>
            }
          />
          <Route  path="/posts/:postId" element={<SinglePostPage />}/>
          <Route  path="/editPost/:postId" element={<EditPostForm />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
