import { useState } from 'react';
import Head from 'next/head';

const DoctorRegistration = () => {
  const [doctorDetails, setDoctorDetails] = useState({
    doctorId: '',
    doctorName: '',
    specialization: '',
    phoneNumber: '',
    address: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDoctorDetails({
      ...doctorDetails,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you might want to call an API or something
    console.log('Submitting Doctor Details:', doctorDetails);
  };

  return (
    <div className="container mx-auto px-4">
      <Head>
        <title>Register Doctor</title>
        <link rel="icon" href="/blockchain.png" />
      </Head>

      <h1 className="text-center text-3xl font-bold my-4">Doctor Registration</h1>
      <div className="max-w-md mx-auto bg-gray-100 p-8 rounded-lg shadow">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="doctorId" className="block text-sm font-medium text-gray-700">Doctor ID:</label>
            <input type="text" id="doctorId" name="doctorId" value={doctorDetails.doctorId} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
          </div>
          <div>
            <label htmlFor="doctorName" className="block text-sm font-medium text-gray-700">Doctor Name:</label>
            <input type="text" id="doctorName" name="doctorName" value={doctorDetails.doctorName} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
          </div>
          <div>
            <label htmlFor="specialization" className="block text-sm font-medium text-gray-700">Specialization:</label>
            <input type="text" id="specialization" name="specialization" value={doctorDetails.specialization} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
          </div>
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number:</label>
            <input type="text" id="phoneNumber" name="phoneNumber" value={doctorDetails.phoneNumber} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address:</label>
            <input type="text" id="address" name="address" value={doctorDetails.address} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
          </div>
          <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Register Doctor</button>
        </form>
      </div>
    </div>
  );
};

export default DoctorRegistration;
