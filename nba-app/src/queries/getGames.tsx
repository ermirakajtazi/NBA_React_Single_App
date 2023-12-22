import axios from 'axios';
import { IPaginationPayload } from '../shared/Interfaces/IPaginationPayload';
import { IGamesInterface } from '../shared/Interfaces/IGamesInterface';
import { baseUrl, getHeaders } from '../utils/apiConfig';

export const getGames = async (
  current_page: number,
  perPage: number,
  teamsIds: string[],
) => {
  try {
    const response = await axios.request<IPaginationPayload<IGamesInterface>>({
      method: 'GET',
      url: `${baseUrl}games`,
      params: {
        page: current_page,
        per_page: perPage,
        team_ids: teamsIds,
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
