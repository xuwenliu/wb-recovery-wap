import React from 'react';

function Result({ title, extra }) {
  return (
    <>
      <div style={{ textAlign: 'center', padding: ' 20px ' }}>
        <p style={{ marginTop: '20px' }}>{title}</p>
        {extra && <p style={{ marginTop: '30px' }}>{extra}</p>}
      </div>
    </>
  );
}

export default Result;
