

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { data } from 'autoprefixer';
const backgroundStyle = {
  backgroundImage: `url("/images/signup-bg.png")`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  width: '100%',
  height: '100vh',
  position: 'relative',

};




const SignupPage = () => {
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
        email_or_phone: formData.email,
        name: formData.fullName,
        user_name: formData.username,
        password: formData.password,
        c_password: formData.confirmPassword

      }
      // Perform asynchronous operation, such as making an API call
      const response = await fetch('http://10.6.13.13/api/register', {
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

        if (errorData.message === 'Validation Error' && errorData.data) {
          console.error('Validation error:', errorData.data);
          await setValidationErrors(errorData.data);
        }
      }

    } catch (error) {
      console.error('An error occurred while sending form data:', error);
    }
  };



  return (
    <main style={backgroundStyle} className="flex justify-center items-center h-screen">
      <div style={{ height: '93%', width: '22%' }} className="flex justify-center items-center">
        <div className=' bg-white p-8 rounded-lg shadow-md flex flex-col justify-center items-center'>
          <div className="mb-4">
            <Image src="/images/Instagram Logo.png" width={200} height={200} alt="Instagram Logo" />
          </div>
          <div className="w-full">
            <form className="space-y-4 " onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className='text-sm font-bold'>Email or Phone Number</label>
                <input
                  type="text"
                  id="email"
                  className={`w-full border ${validationErrors['email_or_phone'] ? 'border-red-500' : 'border-gray-300'} p-2 rounded-lg`}

                  placeholder="Enter valid email or phone number"
                  value={formData.email}
                  onChange={handleChange}
                />
                {validationErrors['email_or_phone'] && (
                  <p className="text-red-500 text-xs">{validationErrors['email_or_phone'][0]}</p>
                )}
              </div>
              <div>
                <label htmlFor="fullName" className='text-sm font-bold'>Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  className={`w-full border ${validationErrors['name'] ? 'border-red-500' : 'border-gray-300'} p-2 rounded-lg`}

                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                />
                {validationErrors['name'] && (
                  <p className="text-red-500 text-xs">{validationErrors['name'][0]}</p>
                )}
              </div>
              <div>
                <label htmlFor="username" className='text-sm font-bold'>Username</label>
                <input
                  type="text"
                  id="username"
                  className={`w-full border ${validationErrors['user_name'] ? 'border-red-500' : 'border-gray-300'} p-2 rounded-lg`}

                  placeholder="Enter a username"
                  value={formData.username}
                  onChange={handleChange}
                />
                {validationErrors['user_name'] && (
                  <p className="text-red-500 text-xs">{validationErrors['user_name'][0]}</p>
                )}
              </div>
              <div>
                <label htmlFor="password" className='text-sm font-bold'>Password</label>
                <input
                  type="password"
                  id="password"
                  className={`w-full border ${validationErrors['password'] ? 'border-red-500' : 'border-gray-300'} p-2 rounded-lg`}
                  placeholder="At least 8 characters"
                  value={formData.password}
                  onChange={handleChange}
                />
                {validationErrors['password'] && (
                  <p className="text-red-500 text-xs">{validationErrors['password'][0]}</p>
                )}
              </div>
              <div>
                <label htmlFor="confirmPassword" className='text-sm font-bold'>Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  className={`mb-4 w-full border ${validationErrors['c_password'] ? 'border-red-500' : 'border-gray-300'} p-2 rounded-lg`}
                  placeholder="Retype new password to confirm"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                {validationErrors['c_password'] && (
                  <p className="text-red-500 text-xs">{validationErrors['c_password'][0]}</p>
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

export default SignupPage;


