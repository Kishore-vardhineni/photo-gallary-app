
import './App.css';
import AppRoutes from './routes/Approutes';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from "react-hot-toast";
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
        <Toaster position="top-right" reverseOrder={false} toastOptions={{
          success: {
            style: {
              background: "#16a34a",  // strong green
              color: "#fff",
            },
            iconTheme: {
              primary: "#fff",
              secondary: "#16a34a",
            },
          },
          error: {
            style: {
              background: "#dc2626",  // strong red
              color: "#fff",
            },
            iconTheme: {
              primary: "#fff",
              secondary: "#dc2626",
            },
          },
        }}
        />
      </BrowserRouter>
    </AuthProvider>

  );
}

export default App;
