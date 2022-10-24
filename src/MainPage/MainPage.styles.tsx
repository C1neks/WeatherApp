import styled from "styled-components";
import { keyframes } from "styled-components";

export const MainPageWrapper = styled.div`
  background: transparent;

  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const AppDesc = styled.span`
  font-size: 0.8rem;
  color: white;
  margin-top: 0.5rem;

  background: transparent;
`;

export const InputButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

export const Input = styled.input`
  font-family: "Urbanist", sans-serif;
  padding: 10px 30px;
  border-radius: 5px;
  border: none;

  outline: none;
  cursor: pointer;
`;

export const Button = styled.button`
  border: none;
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 20rem;
  background: #5f6385;
  color: white;
  cursor: pointer;
  margin-bottom: 1rem;
  opacity: 0.8;

  :hover {
    opacity: 1;

    transition: 0.5s;
  }
`;

export const InputButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
`;

export const LoaderContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  background: rgba(0, 0, 0, 0.834);
  z-index: 1;
`;

export const spinAnimation = keyframes`

0% {
  transform: rotate(0deg);
}
100% {
  transform: rotate(360deg);
}

`;

export const Spinner = styled.div`
  width: 64px;
  height: 64px;
  border: 8px solid;
  border-color: #3d5af1 transparent #3d5af1 transparent;
  border-radius: 50%;
  animation-name: ${spinAnimation};
  animation-duration: 1.2s;
  animation-iteration-count: infinite;
`;
