import styled, { keyframes, css } from 'styled-components';
import { Link } from 'react-router-dom';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const Loading = styled.div`
  color: #fff;
  font-size: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  ${(props) =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;

export const Divider = styled.hr`
  margin: 20px 0;
`;

export const Project = styled.div`
  display: flex;
  align-items: center;

  img {
    border-radius: 50%;
    height: 30px;
    width: 30px;
  }

  h1 {
    margin-left: 10px;
  }
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;

  p {
    margin: 15px 0;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
  }
`;

export const GoBackButton = styled(Link)`
  width: 100px;
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 4px;
  background-color: #7159c1;
  color: #fff;
  text-decoration: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  svg {
    font-size: 18px;
    margin-right: 10px;
  }
`;

export const IssuesList = styled.ul`
  list-style: none;
  font-family: Arial, Helvetica, sans-serif;

  li {
    margin: 10px 0;
    padding: 15px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border: 1px solid #7159c1;
    border-radius: 4px;

    span {
      display: flex;
      align-items: center;

      img {
        margin-right: 10px;
        border-radius: 50%;
        height: 30px;
        width: 30px;
      }

      h3 {
        margin-right: auto;
      }

      a {
        display: flex;
        align-items: center;
        padding: 10px;
        border-radius: 4px;
        background-color: #7159c1;
        color: #fff;
        text-decoration: none;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

        svg {
          font-size: 18px;
          margin-right: 10px;
        }
      }
    }

    div {
      h5 {
        color: #333;
      }

      h6 {
        color: #666;
        margin: 20px 0;
        text-align: justify;
      }
    }
  }
`;
