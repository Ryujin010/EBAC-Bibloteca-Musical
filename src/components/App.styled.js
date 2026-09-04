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

export const Message = styled.p`
  padding: ${props => props.theme.spacing.medium};
  margin: ${props => props.theme.spacing.medium} 0;
  text-align: center;
  font-size: ${props => props.theme.fontSizes.medium};
  border-radius: ${props => props.theme.borderRadius.small};
`;

export const ErrorMessage = styled(Message)`
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
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