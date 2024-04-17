// pages/patient.tsx
import React, { useState } from 'react';
import Head from 'next/head';

const Patient = () => {
  const [form, setForm] = useState({
    patientId: '',
    patientName: '',
    age: '',
    address: ''
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Patient Details:', form);
  };

  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>Patient Registration</title>
        <link rel="icon" href="/icons/blockchain.png" />
      </Head>
      <h1 className="text-2xl font-bold text-center">Patient Registration</h1>
      <form onSubmit={handleSubmit} className="max-w-xl m-auto mt-8 p-6 border rounded-lg">
        <div className="mb-4">
          <label htmlFor="patientId" className="block text-sm font-medium text-gray-700">Patient ID</label>
          <input type="text" id="patientId" name="patientId" value={form.patientId} onChange={handleInput} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none" required />
        </div>
        <div className="mb-4">
          <label htmlFor="patientName" className="block text-sm font-medium text-gray-700">Patient Name</label>
          <input type="text" id="patientName" name="patientName" value={form.patientName} onChange={handleInput} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none" required />
        </div>
        <div className="mb-4">
          <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
          <input type="text" id="age" name="age" value={form.age} onChange={handleInput} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none" required />
        </div>
        <div className="mb-6">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
          <input type="text" id="address" name="address" value={form.address} onChange={handleInput} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none" required />
        </div>
        <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700">Register</button>
      </form>
    </div>
  );
};

export default Patient;
