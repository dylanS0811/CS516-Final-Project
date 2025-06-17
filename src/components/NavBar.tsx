import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

interface ScoreEntry {
    username: string;
    score: number;
    timestamp: string;
}

export function NavBar() {

    const location = useLocation();



    return (
        <>
            <nav className="navbar">
                <ul className="nav-links">
                    <li>
                        <Link to="/game" className={location.pathname === '/game' ? 'active' : ''}>Home</Link>
                    </li>
                    <li>
                        <Link to="/scores" className={location.pathname === '/scores' ? 'active' : ''}>Scores</Link>
                    </li>
                </ul>
            </nav>
            <Outlet />
        </>
    );
}
