import React from 'react';

export default ({ onClick, children, isSelected }) => (
  <a onClick={onClick}>
    {children}
    {isSelected && <span> ✓ </span>}
  </a>
);
