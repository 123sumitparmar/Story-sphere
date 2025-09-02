import React, { useState } from "react";
import styled from "styled-components";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { auth } from "../Authentication/firebase";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider } from "firebase/auth";
import { useDispatch } from "react-redux";
import { AUTH } from "../constants/ActionTypes";
import { signIn, signUp } from "../actions/auth";

const Authenticate = ({ user, setUser, authState, setAuthState }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [personDetail, setPersonDetail] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const authResult = await auth.signInWithPopup(provider);

      const token = authResult?.credential.idToken;
      const result = authResult?.additionalUserInfo.profile;

      if (authResult) {
        dispatch({
          type: AUTH,
          data: { result, token },
        });

        setAuthState(true);
        setUser(JSON.parse(localStorage.getItem("profile")));
        navigate("/");
        swal("Signed In Successful!", "", "success");
      }
    } catch (error) {
      swal(error.message, "", "warning");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        await dispatch(signUp(personDetail));
      } else {
        await dispatch(signIn(personDetail));
      }
      setAuthState(true);
      setUser(JSON.parse(localStorage.getItem("profile")));
      navigate("/");
    } catch (error) {
      swal("Authentication Failed", error.message, "error");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container>
      <Title>{isSignUp ? "Sign Up" : "Log In"}</Title>
      <Form>
        <form onSubmit={handleLogin}>
          {isSignUp && (
            <>
              <InputTag>
                <span>User Name:</span>
                <span id="acc">
                  Already have an account?{" "}
                  <button type="button" onClick={() => setIsSignUp(false)}>
                    Log In
                  </button>
                </span>
              </InputTag>
              <input
                type="text"
                required
                onChange={(e) =>
                  setPersonDetail({ ...personDetail, name: e.target.value })
                }
                placeholder="Enter your Name*"
              />
            </>
          )}
          <InputTag>
            <span>Email:</span>
            {!isSignUp && (
              <span id="acc">
                Need an account?{" "}
                <button type="button" onClick={() => setIsSignUp(true)}>
                  Sign Up
                </button>
              </span>
            )}
          </InputTag>
          <input
            type="email"
            required
            autoComplete="email"
            onChange={(e) =>
              setPersonDetail({ ...personDetail, email: e.target.value })
            }
            placeholder="Enter your Email*"
          />
          <InputTag>
            <span>Password:</span>
            <span id="acc">
              <button type="button" onClick={togglePasswordVisibility}>
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                &nbsp; {showPassword ? "Hide" : "Show"}
              </button>
            </span>
          </InputTag>
          <input
            type={showPassword ? "text" : "password"}
            required
            onChange={(e) =>
              setPersonDetail({ ...personDetail, password: e.target.value })
            }
            placeholder="Enter your Password*"
          />
          <Submit>
            <button type="submit">
              {isSignUp ? "Sign Up" : "Log In"}
            </button>
          </Submit>
        </form>
      </Form>
      <Or>Or</Or>
      <button className="googleBTN" onClick={handleGoogleSignIn}>
        <GoogleSignIn>
          <FcGoogle className="googleIcon" />
          &nbsp; Sign In with Google
        </GoogleSignIn>
      </button>
    </Container>
  );
};

export default Authenticate;

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px;
  width: 500px;
  border: 1px solid #e3e3e3;
  border-radius: 10px;

  @media (max-width: 756px) {
    width: 100%;
    padding: 48px 29px;
    border: none;
  }

  .googleBTN {
    border: none;
    background: inherit;
    color: inherit;
    font-size: inherit;
    cursor: pointer;
  }
`;

const Title = styled.div`
  font-size: 2rem;
  color: #282a35;
  font-weight: 700;
  margin-bottom: 20px;
`;

const Form = styled.div`
  width: 100%;

  input {
    border: 1px solid #ced4da;
    border-radius: 5px;
    margin: 10px 0;
    padding: 10px 5px;
    width: 100%;
    font-size: 1rem;
  }
`;

const InputTag = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;

  #acc {
    font-weight: normal;

    button {
      border: none;
      background: white;
      color: blue;
      cursor: pointer;
    }
  }
`;

const Submit = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;

  button {
    color: white;
    background-color: blue;
    padding: 10px 40px;
    font-size: 1.1rem;
    font-weight: 700;
    border-radius: 50px;
    width: 100%;
    cursor: pointer;

    :hover {
      box-shadow: 0 0 12px darkblue;
    }
  }
`;

const Or = styled.div`
  display: flex;
  justify-content: center;
  margin: -20px 0 20px;
`;

const GoogleSignIn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  border: 1px solid grey;
  border-radius: 10px;
  font-size: 1rem;
  cursor: pointer;

  :hover {
    box-shadow: 0 0 12px rgb(155, 149, 149);
  }

  .googleIcon {
    font-size: 2rem;
  }
`;
