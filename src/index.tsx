//React
import ReactDOM from 'react-dom/client';

//Components
import App from './components/App';

//Styles
import './index.css';
import './theme.css';

// Webpack CSS import
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <App />
);

