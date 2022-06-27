import styled from "styled-components"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectToken } from "../store/user/selectors"
import { logOut } from "../store/user/slice"

export const Navigation = () => {

  const [ open, setOpen ] = useState(false)

  const dispatch = useDispatch()

  const token = useSelector(selectToken)

  return(
    <Nav>
      <Logo href="/">
        Codaisseur<span>templates</span>
      </Logo>
      <Hamburger onClick={() => setOpen(!open)}>
        <span/>
        <span/>
        <span/>
      </Hamburger>
      <Menu open={open}>
        {token 
          ? <MenuLink onClick={() => dispatch(logOut())}>Logout</MenuLink> 
          : <MenuLink href="/login">Login</MenuLink>}
        <MenuLink href="/leaflet">Empty 1</MenuLink>
        <MenuLink href="/styled">Empty 2</MenuLink>
      </Menu>
    </Nav>
  )
}

const MenuLink = styled.a`
  padding: 1rem 2rem;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  color: #ECECEC;
  transition: all 0.3s ease-in;
  font-size: 0.9rem;

  &:hover {
    color: #9CC094;
  }
`

const Nav = styled.div`
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  background: #B22727;
  /* position: absolute; */
  top: 0;
  left: 0;
  right: 0;
`

const Logo = styled.a`
  padding: 1rem 0;
  color: #ECECEC;
  text-decoration: none;
  font-weight: 800;
  font-size: 1.7rem;

  span {
    font-weight: 300;
    font-size: 1.3rem;
  }
`

const Hamburger = styled.div`
  display: none;
  flex-direction: column;
  cursor: pointer;
  span {
    height: 2px;
    width: 25px;
    background-color: #ECECEC;
    margin-bottom: 4px;
    border-radius: 5px;
  }

  @media (max-width: 780px) {
    display: flex;
  }
`

const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  @media (max-width: 780px) {
    overflow: hidden;
    flex-direction: column;
    width: 100%;
    max-height: ${({open}) => open ? "300px" : "0"};
    transition: max-height 0.3s ease-in;
  }
`
