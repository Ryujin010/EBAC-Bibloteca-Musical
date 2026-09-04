import styled from 'styled-components';

export const SongContainer = styled.div`
  padding: ${props => props.theme.spacing.small} 0;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

export const SongTitle = styled.h3`
  margin: 0;
  font-size: ${props => props.theme.fontSizes.medium};
  color: ${props => props.theme.colors.text};
`;

export const SongArtist = styled.p`
  margin: 2px 0 0;
  color: ${props => props.theme.colors.textLight};
  font-size: 0.85rem;
`;

export const SongDuration = styled.span`
  display: block;
  font-size: ${props => props.theme.fontSizes.small};
  color: ${props => props.theme.colors.textMuted};
  margin-top: 2px;
`;