import React, { useEffect , useState} from "react";
import { BrowserRouter as Router, Routes ,Route , Navigate} from "react-router-dom";
import styled from "styled-components";
import NavBar from './components/NavBar';
import Home from './components/Home';
import Authenticate from "./components/Authenticate";
import decode from 'jwt-decode';
import { LOGOUT } from './constants/ActionTypes';
import {useDispatch} from 'react-redux';
import { auth } from "./Authentication/firebase";

const App = ()=>{

    const dispatch = useDispatch();

    const [authState, setAuthState] = useState(JSON.parse(localStorage.getItem('profile')) === null? false: true);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    // console.log('The user state is: ');
    // console.log(user);

    useEffect(() => {
        const token = user?.token;
        if(token)
        {
            const decodedToken = decode(token);
            if(decodedToken.exp * 1000 < new Date().getTime())
            {
                setUser(null);
                auth.signOut();
                setAuthState(false);
                dispatch({
                    type: LOGOUT
                });
            }
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    },[])

    return(
        <Router>
            <Container>
                <NavBar user={user} setUser={setUser} authState={authState} setAuthState={setAuthState}/>
                <Routes>

                    {/* Home Page Rendering */}
                    <Route exact path = "/" element={<Navigate replace to="/posts" />} />

                    {/* Search Result */}
                    <Route exact path="/posts/search" element = { <Home user={user} setUser={setUser} authState={authState} /> } />

                    {/* Posts */}
                    <Route exact path = {`/posts`} element = { <Home user={user} setUser={setUser} authState={authState} /> } />

                    {/* Authentication */}
                    <Route exact path = "/auth" element={ authState? <Navigate replace to="/" /> : <Authenticate user={user} setUser={setUser} authState={authState} setAuthState={setAuthState}/> } />

                </Routes>
            </Container>
      </Router>
        
    );
};

export default App;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;