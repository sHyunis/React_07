import { Routes, Route } from 'react-router-dom';
import './App.css';
import { Footer, Header } from './components';
import { About, Home, NotFound, Products, Todos } from './routes';
import { AuthProvider } from './context/useAuth';
import AuthLayout from './layouts/AuthLayout';

// protected router
function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/"  element={<Home />}  />
          
          {/* <Route path="/todos"  element={
            // 로그인 하지 못하면 접근 못한다 = protected router
            <AuthLayout>
              <Todos />
            </AuthLayout>
          }  /> */}
          
          <Route path="/todos"  element={<Todos />}  />
          <Route path="/about"  element={<About />}  />
          <Route path="/products"  element={<Products />}  />
          <Route path="*"  element={<NotFound />}  />
        </Routes>
        <Footer />
      </div> 
    </AuthProvider>
  );
}

export default App;
