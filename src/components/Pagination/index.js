import React from 'react';
import PropTypes from 'prop-types';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Pagination = ({ page, offset, totalItems, func }) => {
  return (
    <ul>
      <li>
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
      </li>
      <li>{page}</li>
      <li>
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
      </li>
    </ul>
  );
};

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  offset: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  func: PropTypes.func.isRequired,
};

export default Pagination;
