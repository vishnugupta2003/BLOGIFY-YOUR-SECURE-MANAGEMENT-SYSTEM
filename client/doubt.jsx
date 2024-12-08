import React, { useEffect } from 'react';

export default function Doubt() {
  useEffect(() => {
    const timeout = setTimeout(() => {
      console.log('yes');
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);
  return <div>{console.log('no')}</div>;
}
