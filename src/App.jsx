import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import WhyPowerCare from './pages/WhyPowerCare'
import OurServices from './pages/OurServices'
import Industries from './pages/Industries'
import FindAJob from './pages/FindAJob'
import Contact from './pages/Contact'

// Scroll to top on every route change
const ScrollToTop = () => {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

// 404 page
const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50 pt-24">
    <div className="text-center px-4">
      <div className="text-8xl font-bold font-heading text-primary-200 mb-4">404</div>
      <h1 className="text-3xl font-bold font-heading text-slate-900 mb-3">Page Not Found</h1>
      <p className="text-slate-600 mb-8 max-w-sm mx-auto">
        The page you're looking for doesn't exist. Let's get you back on track.
      </p>
      <a href="/" className="btn-primary inline-flex">Back to Home</a>
    </div>
  </div>
)

const Layout = ({ children }) => (
  <div className="flex flex-col min-h-screen">
    <Header />
    <div className="flex-1 pt-16">{children}</div>
    <Footer />
  </div>
)

const App = () => (
  <BrowserRouter>
    <ScrollToTop />
    <Layout>
      <Routes>
        <Route path="/"              element={<Home />} />
        <Route path="/about"         element={<AboutUs />} />
        <Route path="/why-powercare" element={<WhyPowerCare />} />
        <Route path="/services"      element={<OurServices />} />
        <Route path="/industries"    element={<Industries />} />
        <Route path="/careers"       element={<FindAJob />} />
        <Route path="/contact"       element={<Contact />} />
        <Route path="*"              element={<NotFound />} />
      </Routes>
    </Layout>
  </BrowserRouter>
)

export default App
