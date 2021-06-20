import './App.css';
import 'semantic-ui-css/semantic.min.css'
import { useWindowSize } from 'react-use'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import AppRouter from './AppRouter';

function App() {

  const windowSize = useWindowSize()

  return (
    <div className="App" style={{
      width: windowSize.width,
      height: windowSize.height
    }}>
      <AppRouter />
    </div>
  );
}

export default App;
