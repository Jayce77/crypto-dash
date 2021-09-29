import './App.css';
import Dashboard from '../Dashboard';
import Settings from '../Settings';
import AppLayout from './AppLayout';
import AppBar from './AppBar';
import { AppProvider } from './AppProvider';
import Content from '../Shared/Content'

function App() {
  return (
    <AppLayout className="App">
      <AppProvider>
        <AppBar />
        <Content>      
          <Settings />
          <Dashboard />
        </Content>
      </AppProvider>
    </AppLayout>
  );
}

export default App;