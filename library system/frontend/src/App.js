
import './styles/App.css';
import './styles/index.css';
import { LibraryNavbar } from './components/LibraryNavbar';
import { HomeContent } from './components/HomeContent';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { BookContent } from './components/BookContent';
import { SearchContent } from './components/SearchContent';
import { Borrow_listContent } from './components/Borrow_listContent';
import { UserContent } from './components/UserContent';

function App() {
  return (
    <> 
      <LibraryNavbar />
      <Router>
        <Routes>
            <Route exact path="/home" element={<HomeContent />} />
            <Route exact path="/book" element={<BookContent />} />
            <Route exact path="/search" element={< SearchContent/>} />
            <Route exact path="/borrow_list" element={<Borrow_listContent/>} />
            <Route exact path="/user" element={<UserContent/>} />
            <Route exact path="/" element={<HomeContent />} />
            <Route path="*" element={<HomeContent />} />
        </Routes>
      </Router>
    </>
    
  );
}

export default App;
