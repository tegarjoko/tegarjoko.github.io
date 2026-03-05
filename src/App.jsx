import { useState } from 'react';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Timeline from './components/Timeline';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Terminal from './components/Terminal';
import ScrollProgressBar from './components/ScrollProgressBar';
import Cursor from './components/Cursor';

export default function App() {
    const [loaded, setLoaded] = useState(false);

    return (
        <>
            <ScrollProgressBar />
            <Cursor />
            {!loaded && <LoadingScreen onDone={() => setLoaded(true)} />}
            <Navbar />
            <Hero />
            <About />
            <Timeline />
            <Skills />
            <Projects />
            <Contact />
            <Footer />
            <Terminal />
        </>
    );
}
