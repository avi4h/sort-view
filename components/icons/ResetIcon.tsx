import React from 'react';

const ResetIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M15.312 11.424a5.5 5.5 0 01-9.204-4.592l-1.424 1.424a.75.75 0 11-1.06-1.06l3-3a.75.75 0 011.06 0l3 3a.75.75 0 01-1.06 1.06l-1.432-1.432A3.987 3.987 0 006.013 10a3.987 3.987 0 007.95 1.053.75.75 0 011.35.471zM4.688 8.576a5.5 5.5 0 019.204 4.592l1.424-1.424a.75.75 0 111.06 1.06l-3 3a.75.75 0 01-1.06 0l-3-3a.75.75 0 111.06-1.06l1.432 1.432A3.987 3.987 0 0013.987 10a3.987 3.987 0 00-7.95-1.053.75.75 0 01-1.35-.471z"
      clipRule="evenodd"
    />
  </svg>
);

export default ResetIcon;
