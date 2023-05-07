import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

export const GlobalStyle = createGlobalStyle`
${normalize}
::-webkit-scrollbar {
   display: none;
}

html {
   font-size: 10px;
   user-select: none;
   box-sizing: border-box;
}

body {
   height: 100vh;
   display: flex;
   -webkit-box-align: center;
   align-items: center;
   -webkit-box-pack: center;
   justify-content: center;
   font-family: 'NotoSansKRRegular', sans-serif;
   margin: 0px;
 
   -webkit-font-smoothing: antialiased;
   -moz-osx-font-smoothing: grayscale;
 }
 
 code {
   font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
     monospace;
 }

button{
   width: auto;
   background: none;
   border: none;
   cursor: pointer;
   &:focus{
      outline: none;
   }
}

.chat-rows {
   display: flex;
   align-items: center;
   max-width: 100%;
   height: 3rem;
   gap: 1rem;
   cursor: pointer;
   padding: 1.1rem;
 
   &:hover {
     background-color: grey;
     color: white;
   }

   .chat-data {
     display: flex;
     flex-direction: column;
     font-size: 1.3rem;
 
     .user-name {
       font-weight: 600;
     }
     .user-message {
       height: 1rem;
     }
   }
}
`;
