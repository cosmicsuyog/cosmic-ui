import React, { useState } from 'react';

export const Card = ({
  title = 'Card Title',
  subtitle = 'Card Subtitle',
  content = 'This is the card content. You can add any description or text here.',
  imageUrl = 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20900%20600%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%221%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%23fff8f0%22%2F%3E%3Cstop%20offset%3D%220.55%22%20stop-color%3D%22%23e8a06e%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%232a2622%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%22900%22%20height%3D%22600%22%20fill%3D%22url(%23g)%22%2F%3E%3Ccircle%20cx%3D%22720%22%20cy%3D%22130%22%20r%3D%22150%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.32%22%2F%3E%3Ccircle%20cx%3D%22160%22%20cy%3D%22500%22%20r%3D%22210%22%20fill%3D%22%232a2622%22%20opacity%3D%220.18%22%2F%3E%3Cpath%20d%3D%22M0%20430C180%20350%20315%20520%20515%20420C665%20345%20760%20355%20900%20305V600H0Z%22%20fill%3D%22%232a2622%22%20opacity%3D%220.82%22%2F%3E%3Ctext%20x%3D%2264%22%20y%3D%2296%22%20font-family%3D%22Arial%2CHelvetica%2Csans-serif%22%20font-size%3D%2252%22%20font-weight%3D%22800%22%20fill%3D%22%232a2622%22%3ECosmic%20UI%3C%2Ftext%3E%3Ctext%20x%3D%2264%22%20y%3D%22150%22%20font-family%3D%22Arial%2CHelvetica%2Csans-serif%22%20font-size%3D%2224%22%20font-weight%3D%22600%22%20fill%3D%22%236d5f56%22%3EPreview%20image%3C%2Ftext%3E%3C%2Fsvg%3E',
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