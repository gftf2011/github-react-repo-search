import styled from 'styled-components';

export const PaginationList = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;

  li {
    display: flex;
    align-items: center;
    padding: 5px;

    button {
      height: 30px;
      width: 30px;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #7159c1;
      border: 0;
      border-radius: 50%;
      cursor: pointer;
    }
  }
`;

export const CurrentItem = styled.li`
  height: 30px;
  min-width: 30px;
  color: #7159c1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: 1px solid #7159c1;
  border-radius: 15px;
  font-weight: bolder;
`;

export const PreviousItem = styled.li`
  margin-left: auto;
  margin-right: 10px;
`;

export const NextItem = styled.li`
  margin-right: auto;
  margin-left: 10px;
`;
