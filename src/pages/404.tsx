import { Home } from "lucide-react"
import { useNavigate } from "react-router"

const NotFoundPage = () => {
    const navigate=useNavigate()
  return (
    <div className="bg-gray-200 flex justify-center items-center h-screen">
       <div> <h1 className="font-bold text-4xl"> 404 PAGE NOT FOUND</h1>
        <button onClick={()=>navigate("/")} className="flex bg-primary px-3 py-2 rounded-md text-white gap-3 cursor-pointer items-center justify-center mt-2 "><Home/>Back to home </button></div>

    </div>
  )
}
export default NotFoundPage