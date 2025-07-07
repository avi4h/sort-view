import React from 'react';

const ShuffleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M13.477 2.477a.75.75 0 011.06 0l3.75 3.75a.75.75 0 010 1.06l-3.75 3.75a.75.75 0 11-1.06-1.06l2.47-2.47H3.75a.75.75 0 010-1.5h12.19l-2.47-2.47a.75.75 0 010-1.06zM6.523 10.477a.75.75 0 010 1.06l-2.47 2.47h12.19a.75.75 0 010 1.5H4.053l2.47 2.47a.75.75 0 11-1.06 1.06l-3.75-3.75a.75.75 0 010-1.06l3.75-3.75a.75.75 0 011.06 0z"
      clipRule="evenodd"
    />
  </svg>
);

export default ShuffleIcon;