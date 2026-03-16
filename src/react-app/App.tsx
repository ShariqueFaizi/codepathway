import { BrowserRouter as Router, Routes, Route } from "react-router";
import HomePage from "@/react-app/pages/Home";
import SheetsPage from "@/react-app/pages/Sheets";
import { SheetDetail } from "@/react-app/pages/SheetDetail";
import TopicArticle from "@/react-app/pages/TopicArticle";
import SubjectsPage from "@/react-app/pages/Subjects";
import SystemDesignPage from "@/react-app/pages/SystemDesign";
import InterviewsPage from "@/react-app/pages/Interviews";
import InterviewDetailPage from "@/react-app/pages/InterviewDetail";
import BlogsPage from "@/react-app/pages/Blogs";
import BlogDetailPage from "@/react-app/pages/BlogDetail";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sheets" element={<SheetsPage />} />
        <Route path="/sheets/:slug" element={<SheetDetail />} />
        <Route path="/sheets/:sheetSlug/topic/:topicSlug" element={<TopicArticle />} />
        <Route path="/subjects" element={<SubjectsPage />} />
        <Route path="/system-design" element={<SystemDesignPage />} />
        <Route path="/interviews" element={<InterviewsPage />} />
        <Route path="/interviews/:slug" element={<InterviewDetailPage />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/blogs/:slug" element={<BlogDetailPage />} />
      </Routes>
    </Router>
  );
}
