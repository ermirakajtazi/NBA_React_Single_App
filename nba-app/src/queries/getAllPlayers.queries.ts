import axios from 'axios';
import { IPlayersInterface } from '../shared/Interfaces/IPlayersInterface';
import { IPaginationPayload } from '../shared/Interfaces/IPaginationPayload';
import { baseUrl, getHeaders } from '../utils/apiConfig';

export const getAllPlayers = async () => {
  try {
    const response = await axios.request<IPaginationPayload<IPlayersInterface>>(
      {
        method: 'GET',
        url: `${baseUrl}players`,
        headers: getHeaders(),
      },
    );

    if (response.status !== 200) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    return response.data.data;
  } catch (error) {
    console.error('Error fetching teams:', error);
    throw error;
  }
};
