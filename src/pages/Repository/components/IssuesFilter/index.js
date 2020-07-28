import React from 'react';
import PropTypes from 'prop-types';
import { FaLockOpen, FaLock, FaGlobe } from 'react-icons/fa';

import { IssuesWrapper, AllIssues, ClosedIssues, OpenIssues } from './styles';

const IssueState = ({ func }) => {
  return (
    <IssuesWrapper>
      <OpenIssues
        onClick={(e) => {
          e.preventDefault();
          func('open');
        }}
      >
        <FaLockOpen />
      </OpenIssues>
      <ClosedIssues
        onClick={(e) => {
          e.preventDefault();
          func('closed');
        }}
      >
        <FaLock />
      </ClosedIssues>
      <AllIssues
        onClick={(e) => {
          e.preventDefault();
          func('all');
        }}
      >
        <FaGlobe />
      </AllIssues>
    </IssuesWrapper>
  );
};

IssueState.propTypes = {
  func: PropTypes.func.isRequired,
};

export default IssueState;
