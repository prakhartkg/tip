import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import ChatWindow from './components/ChatWindow';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="app-container d-flex flex-column">
        <Header />
        <div className="app-body d-flex flex-grow-1">
          <Sidebar />
          <ChatWindow />
        </div>
        <Footer />
      </div>
    </Provider>
  );
}

export default App;
