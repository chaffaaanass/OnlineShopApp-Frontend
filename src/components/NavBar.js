import React from 'react';
import '../css/NavBar.css';
function NavBar(){
    return (
        <div class="Header">
            <a href="/" class="ShopApp">ShopApp</a>
            <nav class="Navbar">
                <a href='/carts'>Cart</a>
                <a href="/register">Register</a>
                <a href='/login'>Login</a>
            </nav>
        </div>
    );
}
export default NavBar;