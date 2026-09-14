import styled from 'styled-components';

export const ResultsContainer = styled.div`
  flex: 1;
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.large};
  padding: ${props => props.theme.spacing.large};
  box-shadow: ${props => props.theme.shadows.medium};
  border-top: 4px solid ${props => props.theme.colors.primary};
`;

export const ResultsTitle = styled.h2`
  color: ${props => props.theme.colors.text};
  border-bottom: 2px solid ${props => props.theme.colors.border};
  padding-bottom: ${props => props.theme.spacing.medium};
  margin-bottom: ${props => props.theme.spacing.large};
  font-size: ${props => props.theme.fontSizes.large};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.small};
`;

export const EmptyMessage = styled.p`
  color: ${props => props.theme.colors.textMuted};
  text-align: center;
  padding: ${props => props.theme.spacing.xlarge} 0;
  font-size: ${props => props.theme.fontSizes.medium};
`;

export const SongItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${props => props.theme.spacing.medium} 0;
  border-bottom: 1px solid ${props => props.theme.colors.borderLight};
  transition: background 0.2s ease;

  &:hover {
    background: #f7fafc;
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const SongLink = styled.a`
  flex: 1;
  text-decoration: none;
  color: inherit;
  cursor: pointer;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

export const AddButton = styled.button`
  background: ${props => props.theme.colors.secondary};
  color: white;
  border: none;
  padding: ${props => props.theme.spacing.small} ${props => props.theme.spacing.medium};
  border-radius: ${props => props.theme.borderRadius.small};
  cursor: pointer;
  font-size: ${props => props.theme.fontSizes.small};
  font-weight: 600;
  transition: all 0.3s ease;
  margin-left: ${props => props.theme.spacing.medium};
  white-space: nowrap;

  &:hover {
    background: ${props => props.theme.colors.secondaryDark};
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.medium};
  }

  &:active {
    transform: scale(0.95);
  }
`;