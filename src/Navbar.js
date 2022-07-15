import React from "react"
import { Link, useMatch, useResolvedPath } from "react-router-dom"
import Login from './components/LoginModal'

const Navbar = () => {
    const path = window.location.name
    return (
    <nav className="nav">
    <Link to="/" className='site-title'>
        Movie Connect
    </Link>
    <ul>
        <CustomLink to="/home">Home</CustomLink>
        <CustomLink to="/people">People</CustomLink>
        <CustomLink to="/shows">Shows</CustomLink>
    </ul>
    </nav>
    )
    
}

export default Navbar


const CustomLink = ({to, children, ...props}) => {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({path: resolvedPath.pathname, end: true})
    return (
        <li className={isActive ? "active": ""}>
            <Link to={to} {...props}>
                {children}
            </Link>
        </li>
    )
}

