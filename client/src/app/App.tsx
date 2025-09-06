import { useEffect, useState } from 'react';
import './App.css';
import requestAxios, { setAccessToken } from '../services/axios';
import { Route, Routes } from 'react-router-dom';
import Authorization from '../features/auth/ui/Authorization';
import Registration from '../features/auth/ui/Registration';
// import Navbar from '../widgets/Nav/UI/Navbar';

import type { User, RefreshResponse } from '../entities/user/types/user';

function App() {
  const [user, setUser] = useState<User | null>(null);

  const AxiosCheckUser = async (): Promise<void> => {
    try {
      const { data } = await requestAxios.get<RefreshResponse>('/tokens/refresh');

      if (data.message === 'success') {
        setUser(data.user);
        setAccessToken(data.accessToken);
      }
    } catch (error) {
      console.error('Ошибка обновления токена', error);
    }
  };

  useEffect(() => {
    AxiosCheckUser();
  }, []);

  return (
    <>
      {/* <Navbar user={user} setUser={setUser} /> */}
      <Routes>
        <Route path="/authorization" element={<Authorization setUser={setUser} />} />
        <Route path="/registration" element={<Registration setUser={setUser} />} />
        {/* <Route path="/" element={<MainPage />} /> */}
      </Routes>
    </>
  );
}

export default App;
