import styled from 'styled-components';

export const LibraryContainer = styled.div`
  flex: 1;
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.large};
  padding: ${props => props.theme.spacing.large};
  box-shadow: ${props => props.theme.shadows.medium};
  min-height: 300px;
`;

export const LibraryTitle = styled.h2`
  color: ${props => props.theme.colors.text};
  border-bottom: 2px solid ${props => props.theme.colors.border};
  padding-bottom: ${props => props.theme.spacing.medium};
  margin-bottom: ${props => props.theme.spacing.large};
  font-size: ${props => props.theme.fontSizes.large};
`;

export const EmptyMessage = styled.p`
  color: ${props => props.theme.colors.textMuted};
  text-align: center;
  padding: ${props => props.theme.spacing.xlarge} 0;
  font-size: ${props => props.theme.fontSizes.medium};
`;

export const LibraryItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${props => props.theme.spacing.medium} 0;
  border-bottom: 1px solid ${props => props.theme.colors.borderLight};

  &:last-child {
    border-bottom: none;
  }
`;

// Botón con props dinámicas: color rojo para eliminar
export const RemoveButton = styled.button`
  background: ${props => props.$danger ? props.theme.colors.danger : props.theme.colors.primary};
  color: white;
  border: none;
  padding: ${props => props.theme.spacing.small} ${props => props.theme.spacing.medium};
  border-radius: ${props => props.theme.borderRadius.small};
  cursor: pointer;
  font-size: ${props => props.theme.fontSizes.small};
  transition: all 0.3s ease;
  margin-left: ${props => props.theme.spacing.medium};
  white-space: nowrap;

  &:hover {
    background: ${props => props.$danger ? props.theme.colors.dangerDark : props.theme.colors.primaryDark};
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.medium};
  }

  &:active {
    transform: scale(0.95);
  }
`;