import { Link } from 'react-router-dom';
import './Home.css';

import Navbar from '../utils/Navbar';
import Footer from '../utils/Footer';

function Home() {
    return (
        <div className="home-body">
            <Navbar />
            <div className='home-main'>
                <div>
                    <p className='home-main-tag'>Shop Fashion<br /> <span>Shopyy</span></p>
                    <Link className='home-main-button' to='/shop'>
                        Shop here
                    </Link>
                </div>

            </div> 
            <Footer />
        </div>
    );
}

export default Home;