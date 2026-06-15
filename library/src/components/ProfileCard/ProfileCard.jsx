import React, { useState } from 'react';

export const ProfileCard = ({
  name = 'John Doe',
  role = 'Software Engineer',
  company = 'Tech Corp',
  location = 'San Francisco, CA',
  avatarUrl = 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20300%20300%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%221%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%232a2622%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23e8a06e%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%22300%22%20height%3D%22300%22%20rx%3D%22150%22%20fill%3D%22url(%23g)%22%2F%3E%3Ccircle%20cx%3D%22150%22%20cy%3D%22118%22%20r%3D%2254%22%20fill%3D%22%23fff8f0%22%20opacity%3D%220.92%22%2F%3E%3Cpath%20d%3D%22M68%20258C82%20200%20116%20172%20150%20172S218%20200%20232%20258%22%20fill%3D%22%23fff8f0%22%20opacity%3D%220.92%22%2F%3E%3Ctext%20x%3D%22150%22%20y%3D%22286%22%20text-anchor%3D%22middle%22%20font-family%3D%22Arial%2CHelvetica%2Csans-serif%22%20font-size%3D%2234%22%20font-weight%3D%22800%22%20fill%3D%22%232a2622%22%3ECU%3C%2Ftext%3E%3C%2Fsvg%3E',
  coverImageUrl = 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20900%20600%22%3E%3Cdefs%3E%3ClinearGradient%20id%3D%22g%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%221%22%20y2%3D%221%22%3E%3Cstop%20offset%3D%220%22%20stop-color%3D%22%23fff8f0%22%2F%3E%3Cstop%20offset%3D%220.55%22%20stop-color%3D%22%23e8a06e%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%232a2622%22%2F%3E%3C%2FlinearGradient%3E%3C%2Fdefs%3E%3Crect%20width%3D%22900%22%20height%3D%22600%22%20fill%3D%22url(%23g)%22%2F%3E%3Ccircle%20cx%3D%22720%22%20cy%3D%22130%22%20r%3D%22150%22%20fill%3D%22%23ffffff%22%20opacity%3D%220.32%22%2F%3E%3Ccircle%20cx%3D%22160%22%20cy%3D%22500%22%20r%3D%22210%22%20fill%3D%22%232a2622%22%20opacity%3D%220.18%22%2F%3E%3Cpath%20d%3D%22M0%20430C180%20350%20315%20520%20515%20420C665%20345%20760%20355%20900%20305V600H0Z%22%20fill%3D%22%232a2622%22%20opacity%3D%220.82%22%2F%3E%3Ctext%20x%3D%2264%22%20y%3D%2296%22%20font-family%3D%22Arial%2CHelvetica%2Csans-serif%22%20font-size%3D%2252%22%20font-weight%3D%22800%22%20fill%3D%22%232a2622%22%3ECosmic%20UI%3C%2Ftext%3E%3Ctext%20x%3D%2264%22%20y%3D%22150%22%20font-family%3D%22Arial%2CHelvetica%2Csans-serif%22%20font-size%3D%2224%22%20font-weight%3D%22600%22%20fill%3D%22%236d5f56%22%3EPreview%20image%3C%2Ftext%3E%3C%2Fsvg%3E',
  email = 'john.doe@example.com',
  phone = '+1 234 567 8900',
  website = 'https://johndoe.com',
  bio = 'Passionate software engineer with 5+ years of experience in building web applications. Loves React, Node.js, and creating beautiful user experiences.',
  backgroundColor = '#ffffff',
  textColor = '#333333',
  accentColor = '#4f46e5',
  borderRadius = '16px',
  shadow = true,
  showContactInfo = true,
  showSocialLinks = true,
  onConnect = () => {},
  onMessage = () => {}
}) => {
  const [isAvatarHovered, setIsAvatarHovered] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  const cardStyles = {
    backgroundColor,
    color: textColor,
    borderRadius,
    width: '360px',
    maxWidth: '100%',
    boxShadow: shadow ? '0 10px 40px rgba(0,0,0,0.1)' : 'none',
    fontFamily: 'inherit',
    overflow: 'hidden',
    position: 'relative'
  };

  const coverStyles = {
    width: '100%',
    height: '120px',
    backgroundColor: accentColor,
    backgroundImage: coverImageUrl ? `url(${coverImageUrl})` : 'none',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  };

  const avatarContainerStyles = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '-50px',
    marginBottom: '16px'
  };

  const avatarStyles = {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    border: `4px solid ${backgroundColor}`,
    objectFit: 'cover',
    cursor: 'pointer',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    transform: isAvatarHovered ? 'scale(1.05)' : 'scale(1)',
    boxShadow: isAvatarHovered ? '0 4px 12px rgba(0,0,0,0.15)' : 'none'
  };

  const infoStyles = {
    textAlign: 'center',
    padding: '0 20px'
  };

  const nameStyles = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    margin: '0 0 4px 0',
    color: textColor
  };

  const roleStyles = {
    fontSize: '0.95rem',
    color: accentColor,
    fontWeight: '500',
    margin: '0 0 4px 0'
  };

  const companyLocationStyles = {
    fontSize: '0.85rem',
    color: '#6b7280',
    margin: '0 0 12px 0'
  };

  const bioStyles = {
    fontSize: '0.9rem',
    lineHeight: '1.5',
    margin: '16px 0',
    textAlign: 'center',
    color: '#4b5563'
  };

  const contactInfoStyles = {
    backgroundColor: '#f9fafb',
    padding: '16px 20px',
    margin: '16px 0',
    borderRadius: '8px',
    fontSize: '0.85rem'
  };

  const contactItemStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '8px',
    color: '#4b5563'
  };

  const buttonContainerStyles = {
    display: 'flex',
    gap: '12px',
    padding: '0 20px 20px 20px'
  };

  const primaryButtonStyles = {
    flex: 1,
    backgroundColor: accentColor,
    color: '#ffffff',
    border: 'none',
    padding: '10px',
    borderRadius: '8px',
    fontSize: '0.9rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'opacity 0.3s ease'
  };

  const secondaryButtonStyles = {
    flex: 1,
    backgroundColor: 'transparent',
    color: accentColor,
    border: `2px solid ${accentColor}`,
    padding: '10px',
    borderRadius: '8px',
    fontSize: '0.9rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease'
  };

  const followButtonStyles = {
    position: 'absolute',
    top: '16px',
    right: '16px',
    backgroundColor: isFollowing ? '#ef4444' : accentColor,
    color: '#ffffff',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '0.8rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  };

  const socialLinksStyles = {
    display: 'flex',
    justifyContent: 'center',
    gap: '16px',
    padding: '16px 20px',
    borderTop: '1px solid #e5e7eb',
    marginTop: '8px'
  };

  const socialLinkStyles = {
    color: accentColor,
    textDecoration: 'none',
    fontSize: '0.85rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'opacity 0.3s ease'
  };

  return (
    <div style={cardStyles}>
      <div style={coverStyles}></div>
      
      <button
        style={followButtonStyles}
        onClick={() => setIsFollowing(!isFollowing)}
        onMouseEnter={(e) => e.target.style.opacity = '0.9'}
        onMouseLeave={(e) => e.target.style.opacity = '1'}
      >
        {isFollowing ? 'Following' : 'Follow'}
      </button>

      <div style={avatarContainerStyles}>
        <img
          src={avatarUrl}
          alt={name}
          style={avatarStyles}
          onMouseEnter={() => setIsAvatarHovered(true)}
          onMouseLeave={() => setIsAvatarHovered(false)}
        />
      </div>

      <div style={infoStyles}>
        <h2 style={nameStyles}>{name}</h2>
        <div style={roleStyles}>{role}</div>
        <div style={companyLocationStyles}>
          {company} • {location}
        </div>
        
        <div style={bioStyles}>{bio}</div>

        {showContactInfo && (
          <div style={contactInfoStyles}>
            {email && (
              <div style={contactItemStyles}>
                <span>📧</span>
                <span>{email}</span>
              </div>
            )}
            {phone && (
              <div style={contactItemStyles}>
                <span>📱</span>
                <span>{phone}</span>
              </div>
            )}
            {website && (
              <div style={contactItemStyles}>
                <span>🌐</span>
                <span>{website}</span>
              </div>
            )}
          </div>
        )}

        <div style={buttonContainerStyles}>
          <button
            style={primaryButtonStyles}
            onClick={onConnect}
            onMouseEnter={(e) => e.target.style.opacity = '0.9'}
            onMouseLeave={(e) => e.target.style.opacity = '1'}
          >
            Connect
          </button>
          <button
            style={secondaryButtonStyles}
            onClick={onMessage}
            onMouseEnter={(e) => e.target.style.backgroundColor = `${accentColor}10`}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            Message
          </button>
        </div>

        {showSocialLinks && (
          <div style={socialLinksStyles}>
            <a style={socialLinkStyles} onMouseEnter={(e) => e.target.style.opacity = '0.7'} onMouseLeave={(e) => e.target.style.opacity = '1'}>Twitter</a>
            <a style={socialLinkStyles} onMouseEnter={(e) => e.target.style.opacity = '0.7'} onMouseLeave={(e) => e.target.style.opacity = '1'}>LinkedIn</a>
            <a style={socialLinkStyles} onMouseEnter={(e) => e.target.style.opacity = '0.7'} onMouseLeave={(e) => e.target.style.opacity = '1'}>GitHub</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
