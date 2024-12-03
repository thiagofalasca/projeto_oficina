import React from 'react';
import users from '@/tests/__mocks__/users.json';

const page = () => {
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.nome}</li>
        ))}
      </ul>
    </div>
  );
};

export default page;
