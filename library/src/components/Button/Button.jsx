import React, { useState } from 'react';

export const Button = ({
  backgroundColor = '#007bff',
  hoverBackgroundColor = '#0056b3',
  textColor = '#ffffff',
  text = 'Click me',
  size = 'medium',
  borderRadius = '4px',
  padding = '10px 20px',
  fontSize = '16px',
  disabled = false,
  onClick = () => {}
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const sizeStyles = {
    small: {
      padding: '5px 10px',
      fontSize: '12px'
    },
    medium: {
      padding: '10px 20px',
      fontSize: '16px'
    },
    large: {
      padding: '15px 30px',
      fontSize: '20px'
    }
  };

  const currentSizeStyle = sizeStyles[size] || sizeStyles.medium;

  const buttonStyles = {
    backgroundColor: isHovered && !disabled ? hoverBackgroundColor : backgroundColor,
    color: textColor,
    borderRadius,
    padding: currentSizeStyle.padding,
    fontSize: currentSizeStyle.fontSize,
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    transition: 'all 0.3s ease',
    fontFamily: 'inherit',
    fontWeight: '500'
  };

  const handleMouseEnter = () => {
    if (!disabled) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = (e) => {
    if (!disabled) onClick(e);
  };

  return (
    <button
      style={buttonStyles}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;