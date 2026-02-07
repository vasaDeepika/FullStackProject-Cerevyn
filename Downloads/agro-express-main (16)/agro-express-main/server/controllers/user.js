import { readData, writeData } from '../utils/storage.js';

const USER_FILE = 'users.json';

// Initial mock user if file doesn't exist
const INITIAL_USERS = [
  {
    _id: "mock_user_123",
    name: "Demo User",
    email: "demo@example.com",
    password: "password123",
    mobile: "1234567890",
    address: "123 Green Street, Farmville",
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const getUsers = () => readData(USER_FILE, INITIAL_USERS);

const postApiSignups = async (req, res) => {
  const { name, email, address, password, mobile } = req.body;

  try {
    const users = getUsers();

    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.send({
        success: false,
        message: "Email already exists (LOCAL STORAGE)"
      });
    }

    const newUser = {
      _id: (users.length + 1).toString(),
      name: name,
      email: email,
      password: password,
      mobile: mobile,
      address: address,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    users.push(newUser);
    writeData(USER_FILE, users);

    res.send({
      success: true,
      data: newUser,
      message: "Signup successfully (LOCAL STORAGE) !!!",
    })
  }
  catch (e) {
    res.send({
      success: false,
      message: e.message,
    });
  }
};

const postApiLogins = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.send({
        success: false,
        message: "please fill all section"
      })
    }

    const users = getUsers();
    const response = users.find(u => u.email === email && u.password === password);

    if (response) {
      res.send(
        {
          success: true,
          data: response,
          message: "login successfuly (LOCAL STORAGE)!!!"
        }
      )
    } else {
      res.send({
        success: false,
        message: "Please correct email and password (Try: demo@example.com / password123)"
      })
    }
  } catch (e) {
    res.send({
      success: false,
      message: e.message
    })
  }

}

const putUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { mobile, address } = req.body;

    const users = getUsers();
    const userIndex = users.findIndex(u => u._id === id);

    if (userIndex !== -1) {
      users[userIndex] = {
        ...users[userIndex],
        mobile,
        address,
        updatedAt: new Date()
      };

      writeData(USER_FILE, users);

      res.send({
        success: true,
        data: users[userIndex],
        message: "Profile updated successfully (LOCAL STORAGE)!"
      });
    } else {
      res.send({
        success: false,
        message: "User not found (LOCAL STORAGE)"
      });
    }
  } catch (e) {
    res.send({
      success: false,
      message: e.message
    });
  }
}

export { postApiSignups, postApiLogins, putUserProfile };

