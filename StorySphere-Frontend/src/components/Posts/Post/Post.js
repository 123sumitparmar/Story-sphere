import React, { useState } from "react";
import styled from "styled-components";
import moment from "moment";
import EditIcon from "@mui/icons-material/Edit";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/posts";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Post = ({ post, currentID, setCurrentID, user, authState }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [didLike, setDidLike] = useState(
    post.likes.find((like) => like === (user?.result?.id || user?.result?._id))
  );

  const AlertSignIn = () => {
    swal({
      title: "Sign In Required.",
      text: "Please Sign in to Like or Edit the Post.",
      icon: "warning",
    }).then(() => navigate("/auth"));
  };

  const handleLike = () => {
    if (authState) {
      dispatch(likePost(post._id));
      setDidLike(!didLike);
    } else {
      AlertSignIn();
    }
  };

  const handleDelete = () => {
    if (authState) {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this post!",
        icon: "warning",
        buttons: ["Cancel", "Yes"],
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          dispatch(deletePost(post._id)).then(() => {
            swal("Your post has been deleted successfully!", { icon: "success" });
          });
        } else {
          swal("Your post is safe!");
        }
      });
    } else {
      AlertSignIn();
    }
  };

  return (
    <Container>
      <Heading BgImg={post.selectedFile}>
        <Top>
          {post.name}
          {post.creator === (user?.result?._id || user?.result?.id) && (
            <button
              onClick={() =>
                authState ? setCurrentID(post._id) : AlertSignIn()
              }
            >
              <EditIcon />
            </button>
          )}
        </Top>
        <Time>{moment(post.createdAt).fromNow()}</Time>
      </Heading>
      <Body>
        <Tags>{post.tags.map((tag) => `#${tag} `)}</Tags>
        <Title>{post.title}</Title>
        <Message>{post.message}</Message>
        <Actions>
          <Like>
            <button onClick={handleLike}>
              {didLike ? <FavoriteIconStyled /> : <FavoriteBorderIconStyled />}
            </button>
            &nbsp;{post.likes.length} {`Like${post.likes.length > 1 ? "s" : ""}`}
          </Like>
          {authState &&
            post.creator === (user?.result?.id || user?.result?._id) && (
              <button onClick={handleDelete}>
                <Delete>
                  <DeleteIcon />
                  Delete
                </Delete>
              </button>
            )}
        </Actions>
      </Body>
    </Container>
  );
};

export default Post;

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  box-shadow: rgb(155 149 149) 0px 0px 12px 0px;
  width: 250px;
  height: 400px;
  margin: 10px;
  border-radius: 8px;
  button {
    background: none;
    border: none;
    color: inherit;
    font-family: inherit;
    font-size: inherit;
    cursor: pointer;
  }
  @media (max-width: 756px) {
    width: 100%;
    margin: 15px 0px 10px 0px;
  }
`;

const Heading = styled.div`
  background-image: ${(props) => `url("${props.BgImg}")`};
  opacity: 0.9;
  background-position: center;
  background-size: cover;
  color: white;
  border-radius: 8px 8px 0 0;
  width: 100%;
  height: 200px;
`;

const Top = styled.div`
  padding: 5px 10px 1px 10px;
  display: flex;
  font-size: 1.2rem;
  justify-content: space-between;
  align-items: center;
`;

const Time = styled.div`
  padding: 0px 10px 1px 10px;
`;

const Body = styled.div`
  width: 100%;
  height: 60%;
  background-color: white;
  border-radius: 0 0 8px 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Tags = styled.div`
  padding: 10px 10px 0px 10px;
  color: grey;
  font-size: 0.9rem;
`;

const Title = styled.div`
  font-size: 1.3rem;
  padding: 0 10px 0 10px;
`;

const Message = styled.div`
  font-size: 1rem;
  padding: 0 10px 0 10px;
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;

const Like = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Delete = styled(Like)`
  color: blue;
`;

const FavoriteIconStyled = styled(FavoriteIcon)`
  color: red;
`;

const FavoriteBorderIconStyled = styled(FavoriteBorderIcon)`
  color: red;
`;
