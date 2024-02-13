import React from 'react';

function KeyboardWrapper({ children }) {
  const handleKeyboardDismiss = (e) => {
    if (e.target.tagName !== 'INPUT') {
      document.activeElement.blur();
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'auto',
      }}
      onClick={handleKeyboardDismiss}
    >
      {children}
    </div>
  );
}

export default KeyboardWrapper;
