import axios from 'axios';
import { IPaginationPayload } from '../shared/Interfaces/IPaginationPayload';
import { IPlayerStats } from '../shared/Interfaces/IPlayerStats';
import { baseUrl, getHeaders } from '../utils/apiConfig';

export const getGameStats = async (
  current_page: number,
  gamesIds: number[],
) => {
  try {
    const response = await axios.request<IPaginationPayload<IPlayerStats>>({
      method: 'GET',
      url: `${baseUrl}stats`,
      params: {
        page: current_page,
        per_page: 10,
        game_ids: gamesIds,
      },
      headers: getHeaders(),
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
