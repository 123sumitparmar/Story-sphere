import React, { useEffect } from "react";
import { Pagination, PaginationItem } from "@mui/material";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getPosts } from "../actions/posts";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Paginate = () => {
  const query = useQuery();
  const page = query.get("page") || 1; // Get the current page from the URL

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { numberOfPages, currentPage } = useSelector((state) => state.posts);

  useEffect(() => {
    // Fetch posts when the page number changes
    if (page) {
      dispatch(getPosts(page));
    }
  }, [page, dispatch]);

  const handlePageChange = (event, value) => {
    // Navigate to the new page
    navigate(`/posts?page=${value}`);
  };

  return (
    <PaginationContainer>
      <Pagination
        count={numberOfPages || 1} // Fallback to 1 page if `numberOfPages` is undefined
        page={Number(page) || 1} // Use the page number from the URL or default to 1
        variant="outlined"
        color="primary"
        onChange={handlePageChange} // Handle page change
        renderItem={(item) => (
          <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
        )}
      />
    </PaginationContainer>
  );
};

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export default Paginate;
