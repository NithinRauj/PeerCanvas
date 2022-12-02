import { ChakraProvider, Heading } from '@chakra-ui/react';
import CourseDetailsPage from './pages/CourseDetailsPage';
import CoursesPage from './pages/CoursesPage';
import { Routes, Route } from 'react-router-dom';
import CourseCreationForm from './pages/CourseCreationForm';
import SignupPage from './pages/SignupPage';

function App() {

  return (
    <div className="App">
      <ChakraProvider>
        <Heading>PeerCanvas</Heading>
        <Routes>
          <Route path='/prof/createCourse' element={<CourseCreationForm />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/student/courses' element={<CoursesPage />} />
          <Route path='/student/course' element={<CourseDetailsPage />} />
        </Routes>
      </ChakraProvider>
    </div>
  )
}

export default App;
