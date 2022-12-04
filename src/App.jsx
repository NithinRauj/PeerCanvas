import { ChakraProvider, Heading } from '@chakra-ui/react';
import CourseDetailsPage from './pages/CourseDetailsPage';
import CoursesPage from './pages/CoursesPage';
import { Routes, Route } from 'react-router-dom';
import CourseCreationForm from './pages/CourseCreationForm';
import SignupPage from './pages/SignupPage';
import Appbar from './components/Appbar';
import SigninPage from './pages/SigninPage';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';

function App() {

  return (
    <div className="App">
      <ChakraProvider>
        <Appbar />
        <Routes>
          <Route path='/' element={<SigninPage />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/signin' element={<SigninPage />} />
          <Route path='/home' element={<ProtectedRoute type={'student'}><HomePage /></ProtectedRoute>} />
          <Route path='/prof/createCourse' element={<ProtectedRoute type={'professor'}><CourseCreationForm /></ProtectedRoute>} />
          <Route path='/student/courses' element={<ProtectedRoute type={'student'}><CoursesPage /></ProtectedRoute>} />
          <Route path='/student/course' element={<ProtectedRoute type={'student'}><CourseDetailsPage /></ProtectedRoute>} />
        </Routes>
      </ChakraProvider>
    </div>
  )
}

export default App;
