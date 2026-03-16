import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Story from './pages/Story';
import Challenges from './pages/Challenges';
import Supporters from './pages/Supporters';
import Gallery from './pages/Gallery';
import Dates from './pages/Dates';
import Messages from './pages/Messages';
import Surprise from './pages/Surprise';
import Admin from './pages/Admin';
import ScrollToTop from './components/ScrollToTop';

const App: React.FC = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="story" element={<Story />} />
          <Route path="challenges" element={<Challenges />} />
          <Route path="supporters" element={<Supporters />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="dates" element={<Dates />} />
          <Route path="messages" element={<Messages />} />
          <Route path="surprise" element={<Surprise />} />
          <Route path="admin" element={<Admin />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
