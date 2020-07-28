import styled from 'styled-components';

export const IssuesWrapper = styled.span`
  display: flex;
  margin: 10px 0;

  button {
    height: 30px;
    width: 30px;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0;
    padding: 5px;
    border-radius: 4px;
    cursor: pointer;
  }
`;

export const AllIssues = styled.button`
  background-color: #007bff;
`;

export const ClosedIssues = styled.button`
  background-color: #c80808;
  margin: 0 20px;
`;

export const OpenIssues = styled.button`
  background-color: #129e0d;
`;
