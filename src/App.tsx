import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Platform from './pages/Platform';
import Projects from './pages/Projects';
import Technology from './pages/Technology';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import { Privacy, Terms } from './pages/Legal';

/**
 * Pages are imported eagerly: every route is prerendered to static HTML, and
 * the whole bundle is small enough that code-splitting would add requests
 * without a meaningful saving.
 */
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="platform" element={<Platform />} />
        <Route path="projects" element={<Projects />} />
        <Route path="technology" element={<Technology />} />
        <Route path="contact" element={<Contact />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="terms" element={<Terms />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
