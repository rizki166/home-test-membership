
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./page/register";
import Login from "./page/login";
import Dashboard from "./page/Dashboard";
import DataVideo from "./page/DataVideo";
import LayoutsAdmin from "./layout/layoutAdmin";
import DataArticle from "./page/DataArticle";
import Layouts from "./layout/layoutUser";
import Home from "./page/home";
import VideoPage from "./page/videoPage";
import ArticlePage from "./page/articlePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layouts />}>
          <Route path="/home" element={<Home />} />
          <Route path="userVideo" element={<VideoPage />} />
          <Route path="userArticle" element={<ArticlePage />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/admin" element={<LayoutsAdmin />}>
          <Route index element={<Dashboard />} />
          <Route path="video" element={<DataVideo />} />
          <Route path="article" element={<DataArticle />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
