import React from "react";
import Post from "./Post/Post";
import { CircularProgress } from "@material-ui/core";
import styled from "styled-components";
import { useSelector } from "react-redux";
import Paginate from "../Pagination";

const Posts = ({ currentID, setCurrentID, user, authState }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);

  if (isLoading) {
    return (
      <Container>
        <CircularProgress id="loading" />
      </Container>
    );
  }

  return (
    <Container>
      {posts?.length ? (
        <>
          {posts.map((post) => (
            <Card key={post._id}>
              <Post
                post={post}
                currentID={currentID}
                setCurrentID={setCurrentID}
                user={user}
                authState={authState}
              />
            </Card>
          ))}
          <Pages>
            <Paginate />
          </Pages>
        </>
      ) : (
        <NoPostsMessage>No posts available</NoPostsMessage>
      )}
    </Container>
  );
};

export default Posts;

// Styled Components
const Container = styled.div`
  min-width: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  height: 100%;

  @media (max-width: 756px) {
    width: 100%;
  }

  #loading {
    margin: 20px;
  }
`;

const Card = styled.div`
  @media (max-width: 756px) {
    width: 95%;
  }
`;

const Pages = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
`;

const NoPostsMessage = styled.div`
  font-size: 1.5rem;
  color: #555;
  text-align: center;
  margin-top: 20px;
`;
