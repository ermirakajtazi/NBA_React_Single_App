import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Overview } from './pages/Overview/Overview';
import { AllTeams } from './pages/Teams/AllTeams';

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 3600000,
      },
    },
  });

  return (
    <div className="bg-black">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route element={<Overview />}>
              <Route path="/" element={<AllTeams />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  );
}

export default App;
