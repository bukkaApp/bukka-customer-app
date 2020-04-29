import React from 'react';
import { useLoadingContext } from '../../context/UseLoading';

import './progress-bar.scss';

const IndeterminateProgressBar = () => {
  const { status } = useLoadingContext();
  if (status) {
    return (
      <div className="progress">
        <div className="indeterminate" />
      </div>
    );
  }
  return null;
};

export default IndeterminateProgressBar;
