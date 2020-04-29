/* eslint-disable arrow-parens */
/* eslint-disable require-jsdoc */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import swal from 'sweetalert';
import authServices from '../../shared/authServices';
import { useUserContext } from 'context/UserContext';

export default ChildComponent => {
  const { logoutSuccess } = useUserContext()
  class ComposedComponent extends Component {
    componentDidMount() {
      this.shouldNavigateAway();
    }

    componentDidUpdate() {
      this.shouldNavigateAway();
    }

    shouldNavigateAway() {
      const currentPage = this.props.location.pathname;
      if (!authServices.isValid(authServices.getToken())) {
        logoutSuccess();
      }
      if (!this.props.auth) {
        const that = this;
        swal('You need to login first')
          .then((okay) => {
            if (okay) {
              return that.props.history.push(`/login?next=${currentPage}`);
            }
          });
      }
    }

    render() {
      return <ChildComponent {...this.props} />;
    }
  }
  return ComposedComponent;
};
