import { ChakraProvider, Heading } from '@chakra-ui/react';
import CourseDetailsPage from './pages/CourseDetailsPage';
import { Routes, Route } from 'react-router-dom';
import CreateCoursePage from './pages/CreateCoursePage';
import SignupPage from './pages/SignupPage';
import Appbar from './components/Appbar';
import SigninPage from './pages/SigninPage';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import EnrollCoursePage from './pages/EnrollCoursePage';
import SubmissionsPage from './pages/SubmissionsPage';

function App() {

  return (
    <div className="App">
      <ChakraProvider>
        <Appbar />
        <Routes>
          <Route path='/' element={<SigninPage />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/signin' element={<SigninPage />} />
          <Route path={'/student'}>
            <Route
              path='home'
              element={<ProtectedRoute type={'student'}>
                <HomePage type={'student'} />
              </ProtectedRoute>}
            />
            <Route
              path='enrollCourses'
              element={<ProtectedRoute type={'student'}>
                <EnrollCoursePage />
              </ProtectedRoute>}
            />
            <Route
              path='course/:id'
              element={<ProtectedRoute type={'student'}>
                <CourseDetailsPage type={'student'} />
              </ProtectedRoute>}
            />
          </Route>
          <Route path={'/prof'}>
            <Route
              path='home'
              element={<ProtectedRoute type={'professor'}>
                <HomePage type={'professor'} />
              </ProtectedRoute>}
            />
            <Route
              path='createCourse'
              element={<ProtectedRoute type={'professor'}>
                <CreateCoursePage />
              </ProtectedRoute>}
            />
            <Route
              path='course/:id'
              element={<ProtectedRoute type={'professor'}>
                <CourseDetailsPage type={'professor'} />
              </ProtectedRoute>}
            />
            <Route
              path='course/submissions/:aid'
              element={<ProtectedRoute type={'professor'}>
                <SubmissionsPage type={'professor'} />
              </ProtectedRoute>}
            />
          </Route>
        </Routes>
      </ChakraProvider>
    </div>
  )
}

export default App;
