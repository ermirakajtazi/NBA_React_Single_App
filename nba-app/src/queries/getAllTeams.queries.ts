import axios from 'axios';
import { IPaginationPayload } from '../shared/Interfaces/IPaginationPayload';
import { ITeamsListInterface } from '../shared/Interfaces/ITeamsInterface';

export const getAllTeams = async (current_page: number) => {
  console.log(current_page, 'current page nga a');
  try {
    const response = await axios.request<
      IPaginationPayload<ITeamsListInterface>
    >({
      method: 'GET',
      url: 'https://free-nba.p.rapidapi.com/teams',
      params: { page: current_page, per_page: 10 },
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
    throw error; // Rethrow the error to be caught by the calling code
  }
};
