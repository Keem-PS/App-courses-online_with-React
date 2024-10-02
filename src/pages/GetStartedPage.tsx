import { useNavigate } from 'react-router-dom';

function GetStartedPage() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/home'); // นำทางไปยังหน้า Home หรือหน้าหลักของแอป
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Our App!</h1>
        <p className="text-lg text-gray-600 mb-6">
          This is a platform that helps you learn and grow. Let's get started on your journey!
        </p>
        <button
          onClick={handleGetStarted}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

export default GetStartedPage;
