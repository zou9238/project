
import './styles/App.css';
import { DUBUNavbar } from './components/DUBUNavbar';
import { ProductContent } from './components/ProductContent';
import { OrderContent } from './components/OrderContent';
import { HomeContent } from './components/HomeContent';
import { SelectionContent } from './components/SelectionContent';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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
      <DUBUNavbar />
      <Router>
        <Routes>
            <Route exact path="/home" element={<HomeContent />} />
            <Route exact path="/products" element={<ProductContent />} />
            <Route exact path="/orders" element={<OrderContent />} />
            <Route exact path="/selection" element={<SelectionContent />} />
            <Route exact path="/" element={<HomeContent />} />
            <Route path="*" element={<NotFoundContent />} />
        </Routes>
      </Router>
    </>
    
  );
}

export default App;
