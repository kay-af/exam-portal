import { useWindowSize } from 'react-use'
import AppRouter from './routers/AppRouter';
import 'semantic-ui-css/semantic.min.css';

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
