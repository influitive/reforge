import React from 'react';

export default ({ count, add, dec }) => (
  <div>
    {count}
    <button onClick={add}>Increment</button>
    <button onClick={dec}>Decrement</button>
  </div>
);
