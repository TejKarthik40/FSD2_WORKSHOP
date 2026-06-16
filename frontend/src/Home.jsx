import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
function Home(){
    return (
        <>
        <section className="hero">
            <div className="hero-content">
                <p>Discover a wide range of products at unbeatable prices. Shop now and experience the best online shopping experience!</p>
            </div>
            <div className="hero-image">
                <img src={heroImg} alt="Hero Image" />
            </div>
        </section>
        </>
    )
      
}
export default Home