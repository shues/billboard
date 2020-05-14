import React from 'react';
import './App.css';
import Hight from './components/hight';
import Main from './components/main';
import Footer from './components/footer';

function App() {
  const prod = false;
  return (
    <div className="App">
      <Hight prod={prod} />
      <Main prod={prod} />
      <Footer prod={prod} />
    </div>
  );
}

export default App;
