import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import UserDetails from './UserDetails';
import MyOrders from './MyOrders';

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const [activeMenu, setActiveMenu] = useState('details');

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8">Миний булан</h1>
      <div className="flex">
        <aside className="w-64 mr-8">
          <nav className="space-y-2">
            <button 
              onClick={() => setActiveMenu('details')}
              className={`w-full text-left px-4 py-2 rounded-lg ${activeMenu === 'details' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}
            >
              Хувийн мэдээлэл
            </button>
            <button 
              onClick={() => setActiveMenu('orders')}
              className={`w-full text-left px-4 py-2 rounded-lg ${activeMenu === 'orders' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}
            >
              Миний захиалгууд
            </button>
            <button 
              onClick={logout}
              className="w-full text-left px-4 py-2 rounded-lg text-red-500 hover:bg-gray-100"
            >
              Гарах
            </button>
          </nav>
        </aside>
        <main className="flex-grow">
          {activeMenu === 'details' && <UserDetails user={user} />}
          {activeMenu === 'orders' && <MyOrders />}
        </main>
      </div>
    </div>
  );
};

export default Profile;