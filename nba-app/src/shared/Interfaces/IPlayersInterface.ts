export interface IPlayersInterface {
  first_name: string;
  height_feet: string;
  height_inches: string;
  id: string;
  last_name: string;
  position: string;
  team: ITeamProps;
}

export type ITeamProps = {
  abbreviation: string;
  city: string;
  conference: string;
  division: string;
  full_name: string;
  id: string;
  name: string;
};
