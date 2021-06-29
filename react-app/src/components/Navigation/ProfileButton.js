import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { useHistory } from 'react-router-dom';
import LogoutButton from "../Auth/LogoutButton";
import "./Navigation.css"


function ProfileButton({ user }) {
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    return (
        <>
            <button onClick={openMenu} className="profile-button">
                {user.username}
            </button>
            {showMenu && (
                <ul className="profile-dropdown">
                    <li className="profile-username">{user.username}</li>
                    <li className="profile-email">{user.email}</li>
                    <li className="logout">
                        <LogoutButton />
                    </li>
                </ul>
            )}
        </>
    );
}

export default ProfileButton;