import React from 'react';
import PropTypes from 'prop-types';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import { PaginationList, CurrentItem, PreviousItem, NextItem } from './styles';

const Pagination = ({ page, offset, totalItems, func }) => {
  return (
    <PaginationList>
      <PreviousItem>
        {page > 1 && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              func(page - 1);
            }}
          >
            <FaChevronLeft />
          </button>
        )}
      </PreviousItem>
      <CurrentItem>{page}</CurrentItem>
      <NextItem>
        {page * offset < totalItems && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              func(page + 1);
            }}
          >
            <FaChevronRight />
          </button>
        )}
      </NextItem>
    </PaginationList>
  );
};

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  offset: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  func: PropTypes.func.isRequired,
};

export default Pagination;
