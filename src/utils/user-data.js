let users = [
  {
    id: '1',
    name: 'Umar Sani',
    email: 'test@example.com',
    password: 'test',
  }
];

function addUser({ name, email, password }) {
  const isEmailExist = users.find((user) => user.email === email);
  if (isEmailExist) {
    throw new Error('Email already exists');
  }

  const newUser = {
    id: +new Date(),
    name,
    email,
    password,
  };

  users = [...users, newUser];
  return newUser;
}

function getUserById(id) {
  const foundUser = users.find((user) => user.id === id);
  return foundUser;
}

export { 
  addUser, 
  getUserById, 
};