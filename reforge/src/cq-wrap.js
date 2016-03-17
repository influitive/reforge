import React, { Component } from 'react';
import { applyContainerQuery } from 'react-container-query';

export default function(WrappedComponent, query) {
  class ContainerComponent extends Component {
    render() {
      return <WrappedComponent {...this.props}/>;
    }
  }
  return applyContainerQuery(ContainerComponent, query, {setAttribute: true});
}
