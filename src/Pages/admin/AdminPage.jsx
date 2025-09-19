import ApexChart from "../../Components/admin/ApexChart";
import AdminHome from "./AdminHome";
import AdminStats from "./AdminStats";

const AdminPage = () => {
    return (
        <div className="p-12">
            <AdminHome/>
            <ApexChart/>
            <AdminStats/>
        </div>
    );
};

export default AdminPage;