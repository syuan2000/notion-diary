import styled from 'styled-components';
import {Link} from "react-router-dom"

export const NavbarContainer = styled.nav`
    width: 100%;
    height: ${(props) => (props.extend? "30vh": "80px")};
    background-color: #eaded1;
    display: flex;
    flex-direction: column;

    @media (min-width: 700px){
        height: 80px;
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
    width:100%;
    height: 80px;
    display: flex;
`;

export const NavbarLinkContainer = styled.div`
    display: flex;

`
export const NavbarLink = styled(Link)`
    color: white;
    font-size: x-large;
    text-decoration: none;
    margin:10px;

    &:hover {
        color: #efb6b2;
    }

    @media (max-width: 700px){
        display: none;
    }
`
export const NavbarExtendLink = styled(Link)`
    color: white;
    font-size: x-large;
    text-decoration: none;
    margin:10px;
`

export const Logo = styled.img`
    max-width: 50px;
    
`;

export const OpenLinksButton = styled.button`
    width: 70px;
    background: none;
    border: none;
    color: white;
    font-size: 40px;
    cursor: pointer;

    @media (min-width: 700px){
        display: none;
    }
`

export const ExtendContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    @media(min-width: 700px){
        display: none;
    }

`;