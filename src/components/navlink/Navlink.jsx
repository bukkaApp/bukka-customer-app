import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './navlink.scss';

const Navlink = ({ text, href, classNames, children, ...props }) => (
  <Link to={href} className={classNames} {...props}>
    {text || children}
  </Link>
);

export default Navlink;

Navlink.defaultProps = {
  children: '',
  text: ''
};

Navlink.propTypes = {
  text: PropTypes.string,
  href: PropTypes.string.isRequired,
  classNames: PropTypes.string.isRequired,
  children: PropTypes.node,
};
