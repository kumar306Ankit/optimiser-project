import { useState, useEffect } from "react";
import React from "react";
import { searchFields } from "./fields1";
import Input from "../forms/input";
import FormAction from "../forms/formaction";

const fields1 = searchFields;
let fieldState = {};

fields1.forEach((field) => (fieldState[field.id] = ""));

export default function MOOCSearch() {
  const [searchState, setsearchState] = useState(fieldState);

  const handleChange = (e) => {
    setsearchState({ ...searchState, [e.target.id]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform form submission or data handling here
    searchMOOC();
  };

  const [Data, setData] = useState(null);


  const searchMOOC = async () => {
    const result = await fetch("https://server-five-wine.vercel.app/api/mooc/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(searchState),
    });

    const jsonData = await result.json();
    const parsedData = JSON.parse(jsonData.result);
    // console.log(parsedData);
    console.log(jsonData.result);
    setData(parsedData);
    alert(jsonData.success);
    // window.location.reload();
  };

  useEffect(() => {
    if (Data) {
      const columnCount = Object.values(Data).reduce(
        (max, values) => Math.max(max, values.length),
        0
      );
      const columnWidths = {
        Name: '300px',
        Platform: '200px',
        Time: '100px',
        Rating: '100px',
        Money: '100px',
      };
      setTableProperties({ columnCount, columnWidths });
    }
  }, [Data]);

  const [tableProperties, setTableProperties] = useState({
    columnCount: 0,
    columnWidths: {},
  });

  return (
    <div className="h-full flex flex-col justify-evenly">
      <div className="flex flex-col  items-center justify-center">
        <h1 className="uppercase font-bold text-2xl underline">Search</h1>
        <form
          onSubmit={handleSubmit}
          className="mt-4 space-y-6 w-96 bg-red-200 p-2"
        >
          <div className="">
            {fields1.map((field) => (
              <Input
                key={field.id}
                handleChange={handleChange}
                value={searchState[field.id]}
                labelText={field.labelText}
                labelFor={field.labelFor}
                id={field.id}
                name={field.name}
                type={field.type}
                isRequired={field.isRequired}
                placeholder={field.placeholder}
              />
            ))}
            <FormAction handleSubmit={handleSubmit} text={"Search"} />
          </div>
        </form>
      </div>

      <div className="flex flex-col items-center justify-center">
        <h1 className="uppercase font-bold text-2xl underline">
          Search Result
        </h1>
        <div className="mt-4 space-y-6 p-2 text-center overflow-x-auto">
          {Data && (
            <table
              style={{
                borderCollapse: "collapse",
                width: "100%",
                fontFamily: "Arial, sans-serif",
              }}
            >
              <thead>
                <tr className="flex">
                  {Object.keys(Data).map((key) => (
                    <th
                      key={key}
                      style={{
                        padding: "12px",
                        borderBottom: "2px solid #ddd",
                        backgroundColor: "#f9f9f9",
                        color: "#333",
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        textAlign: "center",
                        width: tableProperties.columnWidths[key],
                      }}
                    >
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[...Array(tableProperties.columnCount)].map((_, index) => (
                  <tr className="flex" key={index}>
                    {Object.values(Data).map((values, columnIndex) => {
                      const value = values[index];
                      return (
                        <td
                          key={columnIndex}
                          style={{
                            padding: "12px",
                            borderBottom: "1px solid #ddd",
                            verticalAlign: "top",
                            whiteSpace: "nowrap",
                            width:
                              tableProperties.columnWidths[
                                Object.keys(Data)[columnIndex]
                              ],
                          }}
                        >
                          {typeof value === "string" &&
                          value.startsWith("https:") ? (
                            <a
                              href={value}
                              style={{
                                color: "#1e90ff",
                                textDecoration: "none",
                              }}
                            >
                              Click
                            </a>
                          ) : (
                            value
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
