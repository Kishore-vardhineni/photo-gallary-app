import { useNavigate } from "react-router-dom"

const StatCard = ({ title, value, route }) => {

    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(route)}
            className="bg-white rounded-2xl shadow-md p-6 cursor-pointer 
                 hover:shadow-lg transition hover:scale-[1.02]"
        >
            <p className="text-gray-500">{title}</p>
            <h2 className="text-3xl font-bold mt-2">{value}</h2>
        </div>
    )
}

export default StatCard