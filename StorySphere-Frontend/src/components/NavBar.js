import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../Authentication/firebase";
import swal from "sweetalert";
import { LOGOUT } from "../constants/ActionTypes";
import { useDispatch } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const Header = ({ user, setUser, authState, setAuthState }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [hamOpen, setHamOpen] = useState(false);

  const handleSignUp = async () => {
    setHamOpen(!hamOpen);
    if (authState) {
      swal({
        title: "Are you sure you want to Sign out?",
        icon: "warning",
        buttons: ["Cancel", "Yes"],
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          setUser(null);
          auth.signOut();
          setAuthState(false);
          dispatch({
            type: LOGOUT,
          });
          swal("You have Successfully Signed Out!", {
            icon: "success",
          });
        }
      });
    }
  };

  return (
    <Container>
      <Logo>
        <Link to="/">
          <Title>
            <img src={logo} alt="Logo" />
          </Title>
        </Link>
      </Logo>
      <NavContent>
        <PcNav>
          {authState && (
            <>
              <Pic>
                <ProfilePic profilePic={user?.result?.picture}>
                  {!user?.result?.picture && user.result.name.charAt(0)}
                </ProfilePic>
              </Pic>
              <UserName>{user?.result.name}</UserName>
            </>
          )}
          <Link to={authState ? "/" : "/auth"} onClick={handleSignUp}>
            <SignIn col={authState}>{authState ? "Log Out" : "Log In"}</SignIn>
          </Link>
        </PcNav>
        <Menu>
          <MenuIcon className="menuIcon" onClick={() => setHamOpen(true)} />
        </Menu>
        <MobNav show={hamOpen}>
          <CloseMenu>
            <CloseIcon onClick={() => setHamOpen(false)} />
          </CloseMenu>
          <MobProfile>
            {authState && (
              <>
                <Pic>
                  <ProfilePic profilePic={user?.result?.picture}>
                    {!user?.result?.picture && user.result.name.charAt(0)}
                  </ProfilePic>
                </Pic>
                <UserName>{user?.result.name}</UserName>
              </>
            )}
            <Link to={authState ? "/" : "/auth"} onClick={handleSignUp}>
              <SignIn>{authState ? "Log Out" : "Log In"}</SignIn>
            </Link>
          </MobProfile>
        </MobNav>
      </NavContent>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  padding: 10px 20px;
  border-radius: 10px;
  margin: 30px;
  height: 70px;
  width: 90vw;
  box-shadow: rgb(155 149 149) 0px 0px 12px 0px;
  a {
    text-decoration: none;
  }

  @media (max-width: 824px) {
    margin-bottom: 10px;
  }
`;

const Logo = styled.div`
  display: flex;
`;

const CloseMenu = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;

const NavContent = styled.div`
  display: flex;
`;

const PcNav = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  @media (max-width: 824px) {
    display: none;
  }
`;

const Menu = styled.div`
  display: flex;
  align-items: center;
  .menuIcon {
    font-size: 2rem;
  }
  @media (min-width: 824px) {
    display: none;
  }
`;

const MobNav = styled.div`
  z-index: 10;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  width: 200px;
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 20px;
  transition: transform 0.2s ease-in;
  transform: ${(props) => (props.show ? "translateX(0)" : "translateX(100%)")};
  @media (min-width: 824px) {
    display: none;
  }
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.5rem;
  color: darkblue;
  box-sizing: border-box;
  img {
    height: 70px;
  }

  @media (max-width: 756px) {
    font-size: 9vw;
  }
`;

const SignIn = styled.div`
  padding: 12px;
  cursor: pointer;
  background-color: ${(props) => (props.col ? "red" : "blue")};
  border-radius: 10px;
  color: white;
  font-size: 1.3rem;
  :hover {
    box-shadow: grey 0px 0px 12px 0px;
  }

  @media (max-width: 756px) {
    font-size: 1rem;
  }
`;

const MobProfile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  height: 100%;
  padding: 10px;
`;

const ProfilePic = styled.div`
  background-image: ${(props) => `url("${props.profilePic}")`};
  background-position: center;
  background-size: contain;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  width: 60px;
  aspect-ratio: 1/1;
  margin: 10px;
  border-radius: 50%;
  box-sizing: border-box;
`;

const Pic = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UserName = styled.div`
  padding-right: 10px;
  font-size: 1.3rem;
  text-align: center;
  @media (max-width: 824px) {
    margin-bottom: 10px;
  }
`;
