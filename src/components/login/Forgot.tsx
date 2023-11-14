import React, { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import Form from '../utilities/Forms';

interface ValidateType {
  email?: string[];
}

const Forgot: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [validate, setValidate] = useState<ValidateType>({});

  const validateforgotPassword = (): boolean => {
    let isValid = true;

    const validator = Form.validator({
      email: {
        value: email,
        isRequired: true,
        isEmail: true,
      },
    });

    if (validator !== null && validator.errors && validator.errors.email) {
      setValidate({
        email: validator.errors.email,
      });
      isValid = false;
    }
    return isValid;
  };

  const forgotPassword = (e: FormEvent) => {
    e.preventDefault();

    const isValid = validateforgotPassword();

    if (isValid) {
      alert('Reset password link is sent to ' + email);
      setValidate({});
      setEmail('');
    }
  };

  return (
    <div className="bg-gradient-to-r from-yellow-400 via-red-300 to-red-500 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 border-2 border-yellow-400 rounded-lg shadow-2xl">
        <p className="text-2xl text-center font-bold mb-6 text-red-600">Forgot Password</p>
        <form onSubmit={forgotPassword} autoComplete="off">
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-2 border rounded-md ${validate.email ? 'border-red-500' : 'border-gray-300'
                } focus:border-yellow-400 focus:ring-1 focus:ring-yellow-300`}
              placeholder="Enter your email"
            />
            {validate.email && (
              <p className="text-red-500 mt-2">{validate.email[0]}</p>
            )}
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring focus:ring-yellow-200"
            >
              Reset Password
            </button>
          </div>
        </form>
        <hr className="my-6 border-red-200" />
        <div className="text-center">
          <Link to="/login" className="text-red-600 hover:underline hover:text-red-700">Back to Login</Link>
        </div>
      </div>
    </div>
  );

};

export default Forgot;
