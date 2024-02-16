import { Carousel } from "react-bootstrap";
import logoImage from '../assets/riLogo.png';
import violet from '../assets/violet.png';
import beavertail from '../assets/beavertail.png';
import castleHill from '../assets/castleHill.png';
import newport from '../assets/newport.png';
import newport2 from '../assets/newport2.png';
import jazzfest from '../assets/jazzfest.png';
import jazzfest2 from '../assets/jazzfest2.png';
import providence from '../assets/providence.png';
import providence2 from '../assets/providence2.png';
import providence3 from '../assets/providence3.png';
import sunset from '../assets/sunset.png';
import sunset2 from '../assets/sunset2.png';


const Home = () => {
    return (
        <div>
            <div className="home">
                <h2>Explore RI</h2>
                <Carousel random fade>
                    <Carousel.Item>
                        <img className="home-img d-block w-100" src="https://i.imgur.com/oRpcPDU.png" alt="First slide"/>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className="home-img d-block w-100" src={logoImage} alt="Second slide"/>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className="home-img d-block w-100" src="https://i.imgur.com/oRpcPDU.png" alt="Third slide"/>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className="home-img d-block w-100" src={violet} alt="Second slide"/>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className="home-img d-block w-100" src={newport} alt="Second slide"/>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className="home-img d-block w-100" src={providence} alt="Second slide"/>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className="home-img d-block w-100" src={sunset} alt="Second slide"/>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className="home-img d-block w-100" src={providence2} alt="Second slide"/>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className="home-img d-block w-100" src={newport2} alt="Second slide"/>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className="home-img d-block w-100" src={jazzfest} alt="Second slide"/>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className="home-img d-block w-100" src={beavertail} alt="Second slide"/>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className="home-img d-block w-100" src={castleHill} alt="Second slide"/>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className="home-img d-block w-100" src={providence3} alt="Second slide"/>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className="home-img d-block w-100" src={jazzfest2} alt="Second slide"/>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className="home-img d-block w-100" src={sunset2} alt="Second slide"/>
                    </Carousel.Item>

                </Carousel>
            </div>
        </div>
    );
}

export default Home;
