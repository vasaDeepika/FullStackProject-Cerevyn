# Agro-Express 🌿
A premium Full-Stack E-commerce platform for fresh, chemical-free vegetables.

## 🚀 Features
- **Modern UI/UX**: Vibrant hero section with animations and glassmorphism.
- **Search & Filter**: Real-time product search on the home page.
- **User Profiles**: Custom user profiles with editable mobile numbers and shipping addresses.
- **Secure Checkout**: Animated payment flow with integrated UPI QR codes (simulated).
- **Order History**: Track all your past "completed" orders with ease.
- **Full Stack**: Express/Node.js backend with MongoDB and React frontend.

## 🛠️ Tech Stack
- **Frontend**: React, Tailwind CSS, Bootstrap, Axios.
- **Backend**: Node.js, Express, Mongoose.
- **Database**: MongoDB (Local/Atlas).

## 🏃 Setup Instructions
1. **Clone the Repo**:
   ```bash
   git clone https://github.com/vasaDeepika/agro-express.git
   ```
2. **Setup Dependencies**:
   Run this in the root folder. This is the **most important** step to avoid errors:
   ```bash
   npm run setup
   ```
3. **Configure Environment**:
   - Create a `.env` file in the `server` folder.
   - Add these lines:
     ```env
     PORT=5000
     MONGO_URI=mongodb://localhost:27017/agro-express
     NODE_ENV=development
     ```
   *(Note: You can replace the MONGO_URI with your Atlas connection string if preferred.)*

4. **Seed the Database**:
   Populate your local database with the vegetable products:
   ```bash
   cd server
   node seedDatabase.js
   cd ..
   ```

5. **Run the Application**:
   Start everything with one command:
   ```bash
   npm run dev
   ```
   - **Frontend**: http://localhost:3001
   - **Backend**: http://localhost:5000

## 🎨 Credits
Developed with a focus on "Agro-Luxe" design aesthetics and high-performance user experience.

---

## 🛠️ Troubleshooting

### `'react-scripts' is not recognized`
If you see this error when running `npm start` in the `client` folder, it means dependencies are missing. 
**Solution**: Run the setup command from the **root folder**:
```bash
npm run setup
```
This will automatically install all necessary packages for the root, server, and client.