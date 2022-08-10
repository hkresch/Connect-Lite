import React from "react"
import { Link, useMatch, useResolvedPath } from "react-router-dom"
import { useAuth} from "./contexts/UserAuth";
import Button from "react-bootstrap/esm/Button";

const Navbar = () => {
    const { user, authenticated, logout } = useAuth();
    const path = window.location.name
    return (
    <nav className="nav">
    <Link to="/home" className='site-title'>
        TV Lite
    </Link>
    <ul>
        <CustomLink to="/home">Home</CustomLink>
        <CustomLink to="/people">People</CustomLink>
        <CustomLink to="/shows">Shows</CustomLink>
    </ul>
    </nav>
    )
    
}

export default Navbar;


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

