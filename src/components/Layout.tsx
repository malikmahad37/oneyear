import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import FloatingHearts from './FloatingHearts';
import './Layout.css';

const Layout: React.FC = () => {
    return (
        <div className="layout-container">
            <FloatingHearts />
            <Navbar />

            <main className="main-content">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
