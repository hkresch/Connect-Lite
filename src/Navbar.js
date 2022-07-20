// function Navigation() {
//   return (
//     <>
//       <Navbar bg="dark" variant="dark">
//         <Container>
//           <Navbar.Brand href="/home">Navbar</Navbar.Brand>
//           <Nav className="me-auto">
//             <Nav.Link href="/home">Home</Nav.Link>
//             <Nav.Link href="/people">People</Nav.Link>
//             <Nav.Link href="/shows">Shows</Nav.Link>
//           </Nav>
//         </Container>
//       </Navbar>
//       <br />
//       </>
//   );
// }

// export default Navigation;

import React from "react"
import { Link, useMatch, useResolvedPath } from "react-router-dom"

const Navbar = () => {
    const path = window.location.name
    return (
    <nav className="nav">
    <Link to="/" className='site-title'>
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

