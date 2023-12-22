import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Overview } from './pages/Overview/Overview';
import { AllTeams } from './pages/Teams/AllTeams';
import { TeamRoster } from './pages/Roster/TeamRoster';
import { PlayerStats } from './pages/PlayerStats/PlayerStats';
import { Games } from './pages/Games/Games';
import { GameStats } from './pages/GameStats/GameStats';

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
              <Route path="/roster" element={<TeamRoster />} />
              <Route path="/player-stats" element={<PlayerStats />} />
              <Route path="/games" element={<Games />} />
              <Route path="/games-stats" element={<GameStats />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;
