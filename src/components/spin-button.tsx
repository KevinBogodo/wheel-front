// SpinButton.tsx
import React from 'react';
import './SpinButton.css';

interface SpinButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

const SpinButton: React.FC<SpinButtonProps> = ({ onClick, disabled }) => {
  return (
    <button 
      id="spinButton" 
      onClick={onClick} 
      disabled={disabled}
    >
      {disabled ? 'La roue tourne...' : 'Tourner la roue'}
    </button>
  );
};

export default SpinButton;