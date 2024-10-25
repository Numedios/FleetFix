import styled from 'styled-components';

export const DetailsContainer = styled.div`
  width: 100%;
  height: 100%;
  max-height: 100vh;
  padding: 20px;
  border-left: 1px solid #ccc;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: ${({ backgroundImage }) => `url(${backgroundImage})`};
  background-size: cover;
  background-position: center;
  position: relative;
`;

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 8px;
`;

export const Content = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const MovieImage = styled.img`
  width: 40%;
  height: auto;
  border-radius: 4px;
  margin-bottom: 15px;
  border: 2px solid #ccc;
  padding: 5px;
`;

export const Overview = styled.p`
  font-size: 1em;
  line-height: 1.5;
  text-align: center;
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: fit-content;
  max-width: 80%;
`;

export const PlaceholderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #888;
  font-size: 1.5em;
  text-align: center;
`;

export const PlaceholderImage = styled.img`
  width: 350px;
  height: auto;
  margin-bottom: 20px;
  opacity: 0.5;
`;
