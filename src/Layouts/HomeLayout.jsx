import { Outlet } from 'react-router';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';

const HomeLayout = () => {
    return (
        <div>
            <Navbar/>
       <div className='bg-green-50'>
             <Outlet/>
       </div>
            <Footer/>
        </div>
    );
};

export default HomeLayout;