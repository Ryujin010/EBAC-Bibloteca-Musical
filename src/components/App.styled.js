import styled from 'styled-components';

export const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.large};
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.large};
  margin-top: ${props => props.theme.spacing.large};

  @media (min-width: ${props => props.theme.breakpoints.tablet}) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

export const Message = styled.div`
  padding: ${props => props.theme.spacing.medium};
  margin: ${props => props.theme.spacing.medium} 0;
  text-align: center;
  font-size: ${props => props.theme.fontSizes.medium};
  border-radius: ${props => props.theme.borderRadius.medium};
  background: ${props => (props.$loading ? '#ebf8ff' : 'transparent')};
  color: ${props => (props.$loading ? '#2b6cb0' : props.theme.colors.text)};
  border: ${props => (props.$loading ? '1px solid #bee3f8' : 'none')};
  font-weight: ${props => (props.$loading ? '600' : '400')};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.small};

  &::before {
    content: ${props => (props.$loading ? '""' : 'none')};
    display: ${props => (props.$loading ? 'inline-block' : 'none')};
    width: 16px;
    height: 16px;
    border: 2px solid #bee3f8;
    border-top-color: #2b6cb0;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const ErrorMessage = styled(Message)`
  background-color: #fff5f5;
  color: #c53030;
  border: 1px solid #fed7d7;
  font-weight: 500;
  flex-direction: column;

  &::before {
    content: none;
  }
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
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props => props.theme.colors.primaryDark};
    transform: translateY(-1px);
    box-shadow: ${props => props.theme.shadows.small};
  }

  &:active {
    transform: scale(0.97);
  }
`;