import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer
      style={{
        backgroundColor: 'lightgray',
        padding: '15px 0',
        textAlign: 'center',
        color: 'black',
        position: 'relative',
        bottom: 0,
        width: '100%',
      }}
    >
      <p style={{fontFamily:"cursive"}}>Admin Footer</p>
    </footer>
  );
};

export default Footer;
