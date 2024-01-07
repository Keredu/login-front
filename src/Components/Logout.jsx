import { useNavigate } from 'react-router-dom';

const useLogout = (setError) => {
  const navigate = useNavigate();

  const logout = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:8000/logout/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: token }),
      });
      
      if (response.ok) {
        localStorage.removeItem('token');
        navigate('/login');
      
      } else {
        const data = await response.json();
        console.log(response);
        const errorMessage = data.detail || 'Unknown error occurred';
        const errorCode = `${response.status} (${response.statusText})` || 'N/A';
        setError({ message: errorMessage, errorCode: errorCode });
      }
      
    } catch (error) {
      setError({ message: "Internal error: An error occurred while trying to log out. Please try again.", errorCode: 500 });
    }
  };

  return logout;
};

export default useLogout;
