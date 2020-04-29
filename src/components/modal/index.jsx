import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';

const Custom = ({ children, classNames, dataTarget, largeOnSmallScreen }) => (
  <div
    className="modal fade"
    id={dataTarget}
    tabIndex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div
      className={`modal-dialog modal-dialog-centered ${
        largeOnSmallScreen ? 'modal-dialog-margin-0' : ''
      } ${classNames}`}
      role="document"
    >
      <div className="modal-content">
        <div className="modal-header" />
        <div className="modal-body">{children}</div>
      </div>
    </div>
  </div>
);

export default {
  Custom
};

Custom.defaultProps = {
  classNames: '',
  dataTarget: 'modal',
};

Custom.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  classNames: PropTypes.string,
  dataTarget: PropTypes.string,
};
