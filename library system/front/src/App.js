
import './styles/App.css';
import './styles/index.css';
import { LibraryNavbar } from './components/LibraryNavbar';
import { HomeContent } from './components/HomeContent';
import { StudentContent } from './components/StudentContent';
import { CourseContent } from './components/CourseContent';
import { DepartmentContent } from './components/DepartmentContent';
import { SelectCourseListContent } from './components/SelectCourseListContent';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { BookContent } from './components/BookContent';
import { SearchContent } from './components/SearchContent';
import { Borrow_listContent } from './components/Borrow_listContent';
const NotFoundContent = () => {
  return (
      <div className="App">
          NotFoundContent
      </div>
  );
};

function App() {
  return (
    <> 
      <LibraryNavbar />
      <Router>
        <Routes>
            <Route exact path="/home" element={<HomeContent />} />
            <Route exact path="/books" element={<BookContent />} />
            <Route exact path="/search" element={< SearchContent/>} />
            <Route exact path="/borrow_list" element={<Borrow_listContent/>} />
            <Route exact path="/departments" element={<DepartmentContent/>} />
            <Route exact path="/selectcourse/list" element={<SelectCourseListContent />} />
            <Route exact path="/" element={<HomeContent />} />
            <Route path="*" element={<HomeContent />} />
        </Routes>
      </Router>
    </>
    
  );
}

export default App;
