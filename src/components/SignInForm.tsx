import React from 'react'
import './style.css';
import { Link } from 'react-router-dom';
const Signinform = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center">
            <div className="max-w-md w-full px-6 py-8 bg-white shadow-md">
                <h2 className="text-2xl font-semibold mb-6">Sign In</h2>
                <form>
                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                    >
                        Sign In
                    </button>
                </form>
                <div className="mt-8">
                    <Link to="/">Create an account? Sign Up</Link>
                </div>
            </div>
        </div>
    );
};

export default Signinform
