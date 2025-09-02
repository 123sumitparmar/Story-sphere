import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';
import swal from 'sweetalert';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search } from "../Search";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Form = ({ currentID, setCurrentID, user, authState }) => {
    const navigate = useNavigate();
    const query = useQuery();
    const page = query.get('page') || 1;

    const [postData, setPostData] = useState({
        title: '',
        message: '',
        tags: '',
        selectedFile: ''
    });

    const { posts } = useSelector(state => state.posts);
    const updatedPost = currentID ? posts.find(p => p._id === currentID) : null;

    const dispatch = useDispatch();

    useEffect(() => {
        if (updatedPost) setPostData(updatedPost);
    }, [updatedPost]);

    useEffect(() => {
        clear();
    }, [page]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!authState) {
            swal({
                title: "Sign In Required.",
                text: "Please Sign in to Post New Content.",
                icon: "warning",
            }).then(() => navigate("/auth"));
            return;
        }

        if (currentID) {
            dispatch(updatePost(postData._id, { ...postData, name: user?.result.name })).then(() => {
                swal({ title: "Post Successfully Updated", icon: "success" });
                clear();
            });
        } else {
            dispatch(createPost({ ...postData, name: user?.result.name })).then(() => {
                swal({ title: "Post has been Successfully Posted", icon: "success" });
                clear();
            });
        }
    };

    const clear = () => {
        setCurrentID(null);
        setPostData({
            title: '',
            message: '',
            tags: '',
            selectedFile: ''
        });
    };

    return (
        <Container>
            <Search />
            <form onSubmit={handleSubmit}>
                <FormTitle>
                    {currentID ? 'Editing' : 'Create'} a Memory
                </FormTitle>
                <Inputs>
                    <input
                        type="text"
                        id="Title"
                        placeholder="Title"
                        value={postData.title}
                        onChange={(e) => setPostData({ ...postData, title: e.target.value })}
                    />
                    <textarea
                        placeholder="Message"
                        rows={5}
                        id="Message"
                        value={postData.message}
                        onChange={(e) => setPostData({ ...postData, message: e.target.value })}
                    />
                    <input
                        type="text"
                        id="Tags"
                        placeholder="Tags (Comma Separated)"
                        value={postData.tags}
                        onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}
                    />
                    <div id="file">
                        <FileBase
                            type="file"
                            multiple={false}
                            onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
                        />
                    </div>
                    <button type="submit" id="Submit" disabled={!postData.title || !postData.message || !postData.tags}>
                        Submit
                    </button>
                    <button type="reset" onClick={clear} id="Clear">Clear</button>
                </Inputs>
            </form>
        </Container>
    );
};

export default Form;

// Styled Components
const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: fit-content;
    background-color: white;
    box-sizing: border-box;
    min-width: 440px;
    @media (max-width: 756px) {
        width: 100%;
        min-width: fit-content;
    }
    form {
        padding: 20px;
        border-radius: 8px;
        box-shadow: rgb(155 149 149) 0px 0px 12px 0px;
        width: 100%;
        box-sizing: border-box;
    }
`;

const FormTitle = styled.div`
    box-sizing: border-box; 
    display: flex;
    margin: 8px;
    justify-content: center;
    align-items: center;
    font-size: 1.4rem;
`;

const Inputs = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    #Title, #Message, #Tags, #file, #Submit, #Clear {
        box-sizing: border-box;
        width: 98%;  
        margin: 4px;
        padding: 10px;
        font-size: 1rem;
        border-radius: 5px;
        border: 1px solid grey;
        box-shadow: 0.5px 0.8px grey;
    }
    #Submit {
        background-color: blue;
        color: white;
        cursor: pointer;
        &:disabled {
            background-color: grey;
            cursor: not-allowed;
        }
    }
    #Clear {
        background-color: red;
        color: white;
        cursor: pointer;
    }
`;
