

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { data } from 'autoprefixer';
const backgroundStyle = {
  backgroundImage: `url("/images/01. Login.png")`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  width: '100%',
  height: '100vh',
  position: 'relative',

};




const SigninPage = () => {
  const [validationErrors, setValidationErrors] = useState([]);
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    try {
      var userdata = {
        login: formData.email,
        password: formData.password,

      }
      // Perform asynchronous operation, such as making an API call
      const response = await fetch('http://10.6.13.13/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userdata),
      });

      if (response.ok) {
        console.log('Form data successfully submitted to the backend!');
      } else {
        const errorData = await response.json();
        console.error('Failed to submit form data to the backend.');

        if (errorData.message === 'Login failed' && errorData.errors) {
          console.error('Validation error:', errorData.errors);
          await setValidationErrors(errorData.errors);
        }
      }

    } catch (error) {
      console.error('An error occurred while sending form data:', error);
    }
  };



  return (
    <main style={backgroundStyle} className="flex justify-center items-center h-screen">
      <div style={{height:"85%",width:"28%"}} className="flex flex-col justify-center items-center">
        <div   className=' bg-white p-8 rounded-lg shadow-md flex flex-col justify-center items-center'>
          <div className="mb-9">
            <Image src="/images/Instagram Logo.png" width={170} height={150} alt="Instagram Logo" />
          </div>
          <div className=" w-full">
            <form className="mb-4 space-y-4 " onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" style = {{ fontWeight: '450'}} className='text-sm '>Username, email or phone number</label>
                <input
                  type= "text"
                  id="email"
                  className={`mt-3 p-4 w-full border ${validationErrors['login'] ? 'border-red-500' : 'border-gray-300'} p-2 rounded-xl`}

                  placeholder="Enter valid Username, email or phone number"
                  value={formData.email}
                  onChange={handleChange}
                />
                {validationErrors['login'] && (
                  <p className="text-red-500 text-xs">{validationErrors['login'][0]}</p>
                )}
              </div>

              <div className='mt-2'>
                <div style = {{ fontWeight: '450'}} className='flex justify-between text-sm '>
                  <label   htmlFor="password" >Password</label>   <Link style={{ color: '#7879f1' }} href={'/forgotpassword'} >Forgot password?</Link>
                </div>
                <input
                  type="password"
                  id="password"
                  className={`mt-2 p-4 w-full border ${validationErrors['password'] ? 'border-red-500' : 'border-gray-300'} p-2 rounded-xl`}
                  placeholder="At least 8 characters"
                  value={formData.password}
                  onChange={handleChange}
                />
                {validationErrors['password'] && (
                  <p className="text-red-500 text-xs">{validationErrors['password'][0]}</p>
                )}
              </div>
              <button
                type="submit"
                className=" w-full bg-black text-white p-2  rounded-full transition duration-300"
              >
                Sign Up
              </button>
              <div className="flex items-center justify-center mb-4">
                <div className="border-b border-gray-400 w-1/4"></div>
                <p className="mx-4 text-gray-500 ">OR</p>
                <div className="border-b border-gray-400 w-1/4"></div>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition duration-300"
              >
                Sign Up with facebook
              </button>
            </form>
          </div>
          <div className='mt-4'>
            Already have an account? <Link style={{ color: '#7879f1' }} href={'/signin'} >Sign In</Link>
          </div>
        </div>
        </div>
    </main>
  );
};

export default SigninPage;


