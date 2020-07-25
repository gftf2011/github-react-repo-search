import styled, { css } from 'styled-components';

export const Issue = styled.span`
  span {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    padding: 5px 12px;
    border-radius: 15px;
    font-size: 12px;

    svg {
      height: 20px;
      width: 20px;
      margin-right: 10px;
    }

    ${(props) =>
      props.isOpen
        ? css`
            background-color: #129e0d;
          `
        : css`
            background-color: #c80808;
          `};
  }
`;
