import React from 'react';
import useStore from '../store';

function Counter() {
  const count = useStore((state) => state.count);
  return (
    <div>
      Current Count:
      {' '}
      {count}
    </div>
  );
}

export default Counter;
