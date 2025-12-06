import './App.css'
import Footer from './Components/Footer'
import Header from './Components/Header'
import Main from './Components/MainPage/Main'
import 'swiper/css';
import { MovieProvider } from './context/MovieContext'

function App() {

  return (
    <MovieProvider>
      <Header />
      <Main />
      <Footer />
    </MovieProvider>
  )
}

export default App
