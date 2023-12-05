import React from 'react';
import LibA from '../LibA';

import './index.less';


interface Props {}

const LibB = (props: Props) => {
  return (
    <div>
      <LibA></LibA>
    </div>
  );
};

export default LibB;
