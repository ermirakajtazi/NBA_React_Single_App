import React from 'react';

type ITeamPlayer = {
  teamName: string;
  teamPlayers: ItemProp[] | undefined;
};
type ItemProp = {
  id: string;
  name: string;
};
export const renderTeamPlayers = (item: ITeamPlayer) => {
  const { teamName, teamPlayers } = item;
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg h-44 w-72 text-white justify-left items-start">
      <h1 className="pb-2">
        <span className="font-bold">Team name:</span>
        <span className="pl-2">{teamName}</span>
      </h1>
      <hr />
      <ul>
        {teamPlayers?.map((next: ItemProp) => (
          <li className="py-2" key={next.id}>
            <span className="font-bold"> Team Player:</span>
            <span className="pl-2">{next.name}</span>
            <br />
          </li>
        ))}
      </ul>
    </div>
  );
};
