import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navbar } from "./app/Navbar";
import PostsList from "./features/posts/postsList";
import AddPostForm from "./features/posts/addPostForm";

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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
