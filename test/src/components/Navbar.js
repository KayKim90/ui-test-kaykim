import React from "react";
import styled from "@emotion/styled";

function Navbar() {
  return (
    <NavWrapper>
      <Nav>
        <img src="/logo_main.png" alt="logo" width="130px" />
        <small>Online Assesment</small>
      </Nav>
    </NavWrapper>
  );
}
const NavWrapper = styled.div`
  height: 80px !important;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(239, 239, 239);
`;
const Nav = styled.nav`
  padding: 24px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`;
export default Navbar;
