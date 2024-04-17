// pages/hospital.tsx
import React, { useState } from 'react';
import Head from 'next/head';

const Hospital = () => {
  const [form, setForm] = useState({
    hospitalId: '',
    hospitalName: '',
    address: '',
    specification: ''
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Hospital Details:', form);
  };

  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>Hospital Registration</title>
        <link rel="icon" href="/icons/blockchain.png" />
      </Head>
      <h1 className="text-2xl font-bold text-center">Hospital Registration</h1>
      <form onSubmit={handleSubmit} className="max-w-xl m-auto mt-8 p-6 border rounded-lg">
        <div className="mb-4">
          <label htmlFor="hospitalId" className="block text-sm font-medium text-gray-700">Hospital ID</label>
          <input type="text" id="hospitalId" name="hospitalId" value={form.hospitalId} onChange={handleInput} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none" required />
        </div>
        <div className="mb-4">
          <label htmlFor="hospitalName" className="block text-sm font-medium text-gray-700">Hospital Name</label>
          <input type="text" id="hospitalName" name="hospitalName" value={form.hospitalName} onChange={handleInput} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none" required />
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
          <input type="text" id="address" name="address" value={form.address} onChange={handleInput} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none" required />
        </div>
        <div className="mb-6">
          <label htmlFor="specification" className="block text-sm font-medium text-gray-700">Specification</label>
          <input type="text" id="specification" name="specification" value={form.specification} onChange={handleInput} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none" required />
        </div>
        <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700">Register</button>
      </form>
    </div>
  );
};

export default Hospital;
