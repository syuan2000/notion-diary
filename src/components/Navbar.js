import React, {useState} from 'react';
import {NavbarContainer, NavbarLinkContainer, NavbarLink, NavbarExtendLink, LeftContainer, RightContainer, InnerContainer, ExtendContainer, Logo, OpenLinksButton} from '../styles/Navbar.style'
import Logoimg from '../assets/image/logo.svg'

const Navbar = () => {

    const [extend, setExtend] = useState(false);
  return (
    <NavbarContainer extend={extend}>
        <InnerContainer>
            <LeftContainer>
                <NavbarLinkContainer>
                    <NavbarLink to="/">Home</NavbarLink>
                    <NavbarLink to="/gallery">Gallery</NavbarLink>
                    <OpenLinksButton onClick={()=> {
                        setExtend((cur)=>!cur)
                        }}>
                        {extend? <>&#10005;</>: <>&#8801;</>}
                    </OpenLinksButton>
                </NavbarLinkContainer>
            </LeftContainer>
            <RightContainer>
                <Logo src={Logoimg} />
            </RightContainer>
        </InnerContainer>
        {extend && <ExtendContainer>
            <NavbarExtendLink to="/">Home</NavbarExtendLink>
            <NavbarExtendLink to="/gallery">Gallery</NavbarExtendLink>
        </ExtendContainer>}
        
    </NavbarContainer>
  );
};

export default Navbar;