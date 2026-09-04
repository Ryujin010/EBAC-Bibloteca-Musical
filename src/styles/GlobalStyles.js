import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #f7fafc;
    color: #2d3748;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Estilos para enlaces */

  a {
    text-decoration: none;
    color: inherit;
  }

  /* Scrollbar personalizada (opcional) */

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #edf2f7;
  }

  ::-webkit-scrollbar-thumb {
    background: #cbd5e0;
    border-radius: 4px;
  }
    
  ::-webkit-scrollbar-thumb:hover {
    background: #a0aec0;
  }
`;

export default GlobalStyles;