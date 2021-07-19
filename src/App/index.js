import './App.css';
import Settings from '../Settings';
import AppLayout from './AppLayout';
import AppBar from './AppBar';
import { AppProvider } from './AppProvider';

function App() {
  return (
    <AppLayout className="App">
      <AppProvider>
        <AppBar></AppBar>      
        <Settings />
      </AppProvider>
    </AppLayout>
  );
}

export default App;
