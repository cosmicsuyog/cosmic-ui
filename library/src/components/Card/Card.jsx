import React, { useState } from 'react';

export const Card = ({
  title = 'Card Title',
  subtitle = 'Card Subtitle',
  content = 'This is the card content. You can add any description or text here.',
  imageUrl = '',
  imageAlt = 'Card image',
  backgroundColor = '#ffffff',
  textColor = '#333333',
  accentColor = '#007bff',
  borderRadius = '8px',
  shadow = true,
  hoverable = true,
  width = '320px',
  padding = '20px',
  buttonText = 'Learn More',
  onButtonClick = () => {},
  showButton = true
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const cardStyles = {
    backgroundColor,
    color: textColor,
    borderRadius,
    width,
    padding,
    transition: hoverable ? 'transform 0.3s ease, box-shadow 0.3s ease' : 'none',
    transform: isHovered && hoverable ? 'translateY(-4px)' : 'translateY(0)',
    boxShadow: shadow 
      ? (isHovered && hoverable 
          ? '0 10px 30px rgba(0,0,0,0.15)' 
          : '0 2px 8px rgba(0,0,0,0.1)')
      : 'none',
    fontFamily: 'inherit',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    cursor: hoverable ? 'pointer' : 'default'
  };

  const imageStyles = {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: `${borderRadius} ${borderRadius} 0 0`,
    margin: `-${padding} -${padding} 0 -${padding}`,
    marginBottom: '16px'
  };

  const titleStyles = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    margin: '0 0 8px 0',
    color: textColor
  };

  const subtitleStyles = {
    fontSize: '0.9rem',
    color: '#666666',
    margin: '0 0 12px 0',
    fontWeight: '500'
  };

  const contentStyles = {
    fontSize: '0.95rem',
    lineHeight: '1.5',
    margin: '0 0 20px 0',
    flex: 1
  };

  const buttonStyles = {
    backgroundColor: accentColor,
    color: '#ffffff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    fontSize: '0.9rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    alignSelf: 'flex-start'
  };

  const handleMouseEnter = () => {
    if (hoverable) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleButtonClick = (e) => {
    e.stopPropagation();
    onButtonClick();
  };

  return (
    <div
      style={cardStyles}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {imageUrl && <img src={imageUrl} alt={imageAlt} style={imageStyles} />}
      <h3 style={titleStyles}>{title}</h3>
      {subtitle && <div style={subtitleStyles}>{subtitle}</div>}
      <div style={contentStyles}>{content}</div>
      {showButton && (
        <button style={buttonStyles} onClick={handleButtonClick}>
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default Card;