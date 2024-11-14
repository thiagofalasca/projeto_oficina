import users from '@/tests/__mocks__/users.json';

const page = () => {
  return (
    <div>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.nome}</li>
        ))}
      </ul>
    </div>
  );
};

export default page;
