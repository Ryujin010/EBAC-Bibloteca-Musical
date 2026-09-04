import styled from 'styled-components';

export const HeaderContainer = styled.header`
  text-align: center;
  padding: ${props => props.theme.spacing.large} 0;
  border-bottom: 2px solid ${props => props.theme.colors.border};
  margin-bottom: ${props => props.theme.spacing.large};
`;

export const Title = styled.h1`
  font-size: ${props => props.theme.fontSizes.xxlarge};
  color: ${props => props.theme.colors.text};
  margin: 0;
`;

export const Subtitle = styled.p`
  font-size: ${props => props.theme.fontSizes.medium};
  color: ${props => props.theme.colors.textLight};
  margin-top: ${props => props.theme.spacing.tiny};
`;