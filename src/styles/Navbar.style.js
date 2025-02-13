import styled from 'styled-components';
import {Link} from "react-router-dom"

export const NavbarContainer = styled.nav`
    width: 100%;
    height: ${(props) => (props.extend? "30vh": "60px")};
    background-color: #ffffff;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    z-index: 1000;

    @media (min-width: 700px){
        height: 60px;
    }
`;

export const LeftContainer = styled.div`
    flex: 70%;
    display: flex;
    justify-content: flex-start;
    padding-left: 5%;
    align-items: center;
`;

export const RightContainer = styled.div`
    flex: 30%;
    display: flex;
    justify-content: flex-end;
    padding-right: 5%;
    align-items: center;
`;

export const InnerContainer = styled.div`
    width: 100%;
    height: 60px;
    display: flex;
`;

export const NavbarLinkContainer = styled.div`
    display: flex;
    align-items: center;
`

export const NavbarLink = styled(Link)`
    color: #2d2d2d;
    font-size: 16px;
    font-family: 'Inter', sans-serif;
    text-decoration: none;
    margin: 0 20px;
    padding: 5px 0;
    position: relative;

    &:after {
        content: '';
        position: absolute;
        width: 0;
        height: 2px;
        bottom: 0;
        left: 0;
        background-color: #2d2d2d;
        transition: width 0.2s ease;
    }

    &:hover:after {
        width: 100%;
    }

    @media (max-width: 700px){
        display: none;
    }
`

export const NavbarExtendLink = styled(NavbarLink)`
    display: block;
    margin: 15px 0;
    font-size: 18px;
`

export const Logo = styled.img`
    max-width: 32px;
    opacity: 0.8;
    transition: opacity 0.2s ease;
    
    &:hover {
        opacity: 1;
    }
`;

export const OpenLinksButton = styled.button`
    width: 40px;
    height: 40px;
    background: none;
    border: none;
    color: #2d2d2d;
    font-size: 24px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s ease;
    border-radius: 4px;

    &:hover {
        background-color: rgba(0, 0, 0, 0.05);
    }

    @media (min-width: 700px){
        display: none;
    }
`

export const ExtendContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #ffffff;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);

    @media(min-width: 700px){
        display: none;
    }
`;