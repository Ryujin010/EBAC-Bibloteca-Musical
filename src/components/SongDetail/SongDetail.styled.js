import styled from 'styled-components';

export const DetailContainer = styled.div`
  max-width: 800px;
  margin: ${props => props.theme.spacing.large} auto;
  padding: 0 ${props => props.theme.spacing.medium};
`;

export const BackLink = styled.a`
  display: inline-block;
  margin-bottom: ${props => props.theme.spacing.large};
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  font-size: ${props => props.theme.fontSizes.medium};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const AlbumDetail = styled.div`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.large};
  padding: ${props => props.theme.spacing.xlarge};
  box-shadow: ${props => props.theme.shadows.medium};
`;

export const AlbumTitle = styled.h1`
  color: ${props => props.theme.colors.text};
  margin-top: 0;
  margin-bottom: ${props => props.theme.spacing.large};
  font-size: ${props => props.theme.fontSizes.xlarge};
  border-bottom: 2px solid ${props => props.theme.colors.border};
  padding-bottom: ${props => props.theme.spacing.small};
`;

export const AlbumInfo = styled.div`
  p {
    margin: ${props => props.theme.spacing.small} 0;
    color: ${props => props.theme.colors.textLight};
    line-height: 1.6;
  }

  strong {
    color: ${props => props.theme.colors.text};
  }
`;

export const AlbumArt = styled.img`
  max-width: 200px;
  border-radius: ${props => props.theme.borderRadius.medium};
  margin-top: ${props => props.theme.spacing.medium};
  box-shadow: ${props => props.theme.shadows.medium};
`;

export const TrackList = styled.div`
  margin-top: ${props => props.theme.spacing.xlarge};
  border-top: 1px solid ${props => props.theme.colors.border};
  padding-top: ${props => props.theme.spacing.large};
`;

export const TrackListTitle = styled.h2`
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.fontSizes.large};
  margin-bottom: ${props => props.theme.spacing.medium};
`;

export const TrackItem = styled.li`
  padding: ${props => props.theme.spacing.small} 0;
  border-bottom: 1px solid ${props => props.theme.colors.borderLight};
  color: ${props => props.theme.colors.textLight};

  &:last-child {
    border-bottom: none;
  }
`;

// Mensaje con props dinámicas para carga y error
export const Message = styled.p`
  padding: ${props => props.theme.spacing.medium};
  margin: ${props => props.theme.spacing.medium} 0;
  text-align: center;
  font-size: ${props => props.theme.fontSizes.medium};
  border-radius: ${props => props.theme.borderRadius.small};
  background: ${props => props.$error ? '#f8d7da' : 'transparent'};
  color: ${props => props.$error ? '#721c24' : props.theme.colors.text};
  border: ${props => props.$error ? '1px solid #f5c6cb' : 'none'};
`;

export const RetryButton = styled.button`
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  padding: ${props => props.theme.spacing.small} ${props => props.theme.spacing.medium};
  border-radius: ${props => props.theme.borderRadius.small};
  cursor: pointer;
  font-size: ${props => props.theme.fontSizes.medium};
  margin-top: ${props => props.theme.spacing.small};

  &:hover {
    background-color: ${props => props.theme.colors.primaryDark};
  }
`;