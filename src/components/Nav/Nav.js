import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import './Nav.css'
import { useAuth } from '../../context/useAuth'

const Nav = () => {
  const { user, login, logout } = useAuth();
  const navigate = useNavigate();
  const menus = [
    {
        path : "/",
        pathName : "home" 
    },
    {
        path : "/todos",
        pathName : "todos" 
    },
    {
        path : "/about",
        pathName : "about" 
    },
    {
        path : "/products",
        pathName : "products" 
    }
  ]

  return (
    <nav className='nav'>
      <ul>
        {
          menus.map(menu=><li key={menu.pathName}>
                            <NavLink to={menu.path}>{menu.pathName}</NavLink>
                          </li>)
        }
        {
          user ? 
          <li> { user }님, 안녕하세요. <button onClick={logout}>logout</button></li> 
          : 
          <li><button onClick={ () => login('kim') } >login</button></li>
        }
      </ul>
    </nav>
  )
}

export default Nav