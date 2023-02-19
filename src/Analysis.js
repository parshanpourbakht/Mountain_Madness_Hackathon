import { ChakraProvider } from '@chakra-ui/react'
import Home from './Home';

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <header className="App-header">
            Hello         
        </header>
      </div>
    </ChakraProvider>
  );
}

export default App;