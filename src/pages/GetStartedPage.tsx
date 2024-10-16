import { useNavigate } from "react-router-dom";

function GetStartedPage() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/home"); // นำทางไปยังหน้า Home หรือหน้าหลักของแอป
  };

  return (
    <div className="container mx-auto h-screen flex items-center justify-center ">
      <div className="text-center p-4">
      <img src="https://foundr.com/wp-content/uploads/2023/04/How-to-create-an-online-course.jpg.webp" alt="" className="shadow-lg rounded-full sm:h-96"/>
      <div>
      <h1 className="text-2xl font-bold mt-4 sm:text-4xl">
          Welcome to <span className="text-indigo-600">Courses Online <i className="fa-brands fa-discourse"></i></span>
        </h1>
        <button onClick={handleGetStarted} className="mt-4 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-full transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-110">
          Get Started <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>

      </div>
    </div>
  );
}

export default GetStartedPage;
