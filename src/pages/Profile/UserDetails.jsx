import React from 'react';

const UserDetails = ({ user }) => {
  return (
    <div className="p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Хувийн мэдээлэл</h2>
      <div>
        <p className="text-lg"><span className="font-semibold">Нэр:</span> {user.name || 'N/A'}</p>
        <p className="text-lg mt-2"><span className="font-semibold">И-мэйл:</span> {user.email}</p>
        {/* Add other user fields here as needed */}
      </div>
    </div>
  );
};

export default UserDetails;
