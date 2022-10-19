import styled from "styled-components";

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
  padding: 10px 40px;
  border-radius: 10rem;
  border: none;

  outline: none;
  cursor: pointer;
  opacity: 0.8;
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

  :hover {
    opacity: 0.9;
    font-size: 1rem;
    transition: 0.5s;
  }
`;

export const InputButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
`;
