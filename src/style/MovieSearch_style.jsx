import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MovieContainer = styled.div`
  height: 95vh;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: #f0f0f0;
  width: 100%;
  
  @media (min-width: 1400px) {
    width: 60%; 
  }
`;

export const MovieList = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
  list-style: none;
`;

export const MovieItem = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: 1px solid white;
  margin-bottom: 8px; 
  width: 100%;
  height: 120px; 
  background-color: #e0e0e0;
  border-radius: 8px;
  text-align: center;
  padding: 8px;
  cursor: pointer;
  
  &:hover {
    background-color: #d0d0d0;
  }
`;

export const Poster = styled.img`
  width: 60px;
  height: auto;
  max-height: 80px;
  object-fit: cover;
  border-radius: 8px;
`;

export const Title = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin-top: 8px;
  color: #333;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
`;

export const SearchContainer = styled.div`
  display: flex;
  height: 5vh;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background-color: #0e1217; 
  width: 100%;
  
  @media (min-width: 1400px) {
    width: 60%; 
  }
`;

export const SearchInput = styled.input`
  flex: 1;
  padding: 8px; 
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
`;

export const SearchButton = styled.button`
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: auto;
`;
