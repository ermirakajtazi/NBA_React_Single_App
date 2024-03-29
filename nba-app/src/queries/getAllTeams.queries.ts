import axios from 'axios';
import { IPaginationPayload } from '../shared/Interfaces/IPaginationPayload';
import { ITeamsListInterface } from '../shared/Interfaces/ITeamsInterface';
import { baseUrl, getHeaders } from '../utils/apiConfig';

export const getAllTeams = async (current_page: number, perPage: number) => {
  try {
    const response = await axios.request<
      IPaginationPayload<ITeamsListInterface>
    >({
      method: 'GET',
      url: `${baseUrl}teams`,
      params: { page: current_page, per_page: perPage },
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
