import styled from "styled-components";
import ImgBg from "../backgroundmain.jpg";
export const MainPageWrapper = styled.div`
  background-image: url(${ImgBg});

  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
