import axios from 'axios';
import { IPaginationPayload } from '../shared/Interfaces/IPaginationPayload';
import { IPlayerStats } from '../shared/Interfaces/IPlayerStats';

export const getPlayerStats = async (
  current_page: number,
  teamPlayersIds: string[],
) => {
  try {
    const response = await axios.request<IPaginationPayload<IPlayerStats>>({
      method: 'GET',
      url: 'https://free-nba.p.rapidapi.com/stats',
      params: {
        page: current_page,
        per_page: 10,
        player_ids: teamPlayersIds,
      },
      headers: {
        'X-RapidAPI-Key': '848b818301msh33b39866737a523p1b31e1jsn32e5860ddddf',
        'X-RapidAPI-Host': 'free-nba.p.rapidapi.com',
      },
    });

    if (response.status !== 200) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    return response.data;
  } catch (error) {
    console.error('Error fetching teams:', error);
    throw error;
  }
};
