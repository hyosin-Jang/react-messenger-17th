import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css';
import { RecoilRoot } from 'recoil';
import { GlobalStyle } from 'styles/globalStyle';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <RecoilRoot>
    <GlobalStyle />
    <App />
  </RecoilRoot>
);
