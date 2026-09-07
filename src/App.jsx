import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
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
  <div className="min-h-[70vh] flex items-center justify-center bg-white px-5 py-24">
    <div className="text-center max-w-md">
      <div className="font-mono text-sm tracking-widest text-primary-600 mb-6">404</div>
      <h1 className="text-display font-heading font-semibold text-ink-900 mb-4 text-balance">Page Not Found</h1>
      <p className="text-ink-600 leading-relaxed mb-9 text-pretty">
        The page you're looking for doesn't exist. Let's get you back on track.
      </p>
      <a href="/" className="btn-primary">Back to Home</a>
    </div>
  </div>
)

const Layout = ({ children }) => (
  <div className="flex flex-col min-h-screen">
    <Header />
    {/* Offset matches the fixed header height (h-20). */}
    <div className="flex-1 pt-20">{children}</div>
    <Footer />
  </div>
)

// Routes cross-fade so navigation reads as one continuous surface rather
// than a hard cut between documents.
const AnimatedRoutes = () => {
  const location = useLocation()
  const reduce = useReducedMotion()
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        <Routes location={location}>
        <Route path="/"              element={<Home />} />
        <Route path="/about"         element={<AboutUs />} />
        <Route path="/why-powercare" element={<WhyPowerCare />} />
        <Route path="/services"      element={<OurServices />} />
        <Route path="/industries"    element={<Industries />} />
        <Route path="/careers"       element={<FindAJob />} />
        <Route path="/contact"       element={<Contact />} />
          <Route path="*"              element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

const App = () => (
  <BrowserRouter>
    <ScrollToTop />
    <Layout>
      <AnimatedRoutes />
    </Layout>
  </BrowserRouter>
)

export default App
