import React from 'react';
import PropTypes from 'prop-types';
import { FaLockOpen, FaLock } from 'react-icons/fa';

import { Issue } from './styles';

const IssueState = ({ isOpen }) => {
  return (
    <Issue isOpen={isOpen}>
      {isOpen ? (
        <span>
          <FaLockOpen /> OPEN
        </span>
      ) : (
        <span>
          <FaLock /> CLOSED
        </span>
      )}
    </Issue>
  );
};

IssueState.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};

export default IssueState;
