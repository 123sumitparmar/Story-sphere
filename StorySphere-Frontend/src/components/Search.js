import React, { useState } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import ChipInput from 'material-ui-chip-input';
import { useDispatch } from 'react-redux';
import { getPostsBySearch } from '../actions/posts.js';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export const Search = () => {
  const [searchTitle, setSearchTitle] = useState('');
  const [searchBy, setSearchBy] = useState('Title');
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state for search
  const [noResults, setNoResults] = useState(false); // No results state for user feedback
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const query = useQuery();
  const page = query.get('page') || 1;
  const SearchQuery = query.get('searchQuery');

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    if (searchTitle.trim() !== '' || tags.join(',')) {
      // Dispatch the Search.
      const tag = tags?.join(',');
      navigate(`/posts/search?searchQuery=${searchTitle || 'none'}&tags=${tag || 'none'}`);
    } else {
      navigate('/');
    }

    // Simulate loading and clear the loading state
    setTimeout(() => {
      setLoading(false);
      // Here you can set noResults based on actual search results if needed
      setNoResults(false); // Reset no results if search is successful
    }, 1000);
  };

  const handleAdd = (e) => {
    setTags([...tags, e]);
  };

  const handleDelete = (e) => {
    setTags(tags.filter((tag) => tag !== e));
  };

  return (
    <Container>
      <form onSubmit={handleSearch} id="search">
        <Inputs>
          <Select onChange={(e) => setSearchBy(e.target.value)}>
            <option value="Title">Title</option>
            <option value="Tags">Tags</option>
          </Select>
          
          {searchBy === 'Title' ? (
            <SearchInput
              type="text"
              id="title"
              placeholder="Search by Title"
              onChange={(e) => setSearchTitle(e.target.value)}
            />
          ) : (
            <ChipInput
              style={{
                borderTop: '1px solid grey',
                margin: '0px',
                boxSizing: 'border-box',
                width: '100%',
              }}
              value={tags}
              onAdd={handleAdd}
              onDelete={handleDelete}
              label="Search Tags"
            />
          )}

          <Button type="submit">
            {loading ? <LoadingSpinner /> : <SearchIcon />}
          </Button>
        </Inputs>
      </form>

      {noResults && <NoResults>No posts found for your search</NoResults>}
    </Container>
  );
};

// Styled Components

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 20px 0;
`;

const Inputs = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 800px;
  background-color: #f8f8f8;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Select = styled.select`
  height: 45px;
  font-size: 1rem;
  padding: 0 10px;
  margin-right: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  background-color: #fff;
  cursor: pointer;
`;

const SearchInput = styled.input`
  height: 45px;
  font-size: 1rem;
  padding: 0 10px;
  margin-right: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  background-color: #fff;
  width: 250px;
`;

const Button = styled.button`
  height: 45px;
  width: 45px;
  background-color: #1e90ff;
  border: none;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  font-size: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s;

  &:hover {
    background-color: #187bcd;
  }
`;

const LoadingSpinner = styled.div`
  border: 4px solid transparent;
  border-top: 4px solid #fff;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const NoResults = styled.p`
  margin-top: 10px;
  font-size: 1rem;
  color: #ff0000;
  text-align: center;
`;

