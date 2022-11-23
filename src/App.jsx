import { ChakraProvider, Heading } from '@chakra-ui/react';

function App() {

  return (
    <div className="App">
      <ChakraProvider>
        <Heading>PeerCanvas</Heading>
      </ChakraProvider>
    </div>
  )
}

export default App;
