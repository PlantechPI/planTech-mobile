
import Router from './src/routes/index';
import { AuthProvider } from './src/context/auth'; 

export default function App() {
  return (
    <AuthProvider> 
      <Router/>
    </AuthProvider>
  );
}
