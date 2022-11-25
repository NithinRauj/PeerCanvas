import { ChakraProvider, Heading } from '@chakra-ui/react';
import CourseDetailsPage from './pages/CourseDetailsPage';
import CoursesPage from './pages/CoursesPage';

function App() {

  return (
    <div className="App">
      <ChakraProvider>
        <Heading>PeerCanvas</Heading>
        {/* <CoursesPage /> */}
        <CourseDetailsPage />
      </ChakraProvider>
    </div>
  )
}

export default App;
