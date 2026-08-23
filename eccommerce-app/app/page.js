import Header from './components/Header';
import Footer from './components/Footer';
import HomePageMainSection from './components/Home';

export default function HomePage() {
  return (
    <>
      <Header />
      <HomePageMainSection />
      <Footer variant="minimal" /> {/* Minimal Footer Here */}
    </>
  );
}