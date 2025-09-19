import { Outlet } from 'react-router';
import AdminNavbar from '../Components/admin/AdminNavbar';

const AdminLayout = () => {
    return (
        <div className='flex'>
           <div className=''>
            <AdminNavbar/>
           </div>
           <div className='ml-64 w-full bg-green-50'>
            <Outlet/> 
           </div>
        </div>
    );
};

export default AdminLayout;