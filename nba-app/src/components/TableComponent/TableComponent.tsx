import React from 'react';

interface ITable {
  children: React.ReactElement;
  title: string;
  description: string;
  headers: string[];
  toolbar: React.ReactNode;
  rightNode: React.ReactElement;
}

export const Table = ({
  title,
  description,
  headers,
  toolbar,
  children,
  rightNode,
}: ITable) => (
  <div className="bg-bgPrimary text-textColor">
    <div className="px-5 py-3">
      {title && (
        <div className="flex flex-wrap">
          <h4 className="text-2xl sm:text-2xl lg:text-3xl  font-semibold my-2">
            {title}
          </h4>
          {rightNode && <div className="ml-auto">{rightNode}</div>}
        </div>
      )}
      {description && (
        <p className="my-2 text-headerColor font-bold text-13">{description}</p>
      )}
    </div>
    <div className="flex flex-col text-textColor">
      {toolbar && <div className="w-full p-2">{toolbar}</div>}
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full pt-2 align-middle">
          <table className="min-w-full divide-y ">
            <thead>
              <tr>
                {headers.map((header) => (
                  <td
                    key={header}
                    className="px-3 py-3.5 text-left text-lg font-semibold text-textColor"
                  >
                    {header}
                  </td>
                ))}
              </tr>
            </thead>
            {children}
          </table>
        </div>
      </div>
    </div>
  </div>
);
