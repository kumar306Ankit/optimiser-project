import { useState, json } from "react";
import React from "react";
import { searchFields } from "./fields";
import Input from "../forms/input";
import FormAction from "../forms/formaction";

const fields = searchFields;
let fieldState = {};

fields.forEach((field) => (fieldState[field.id] = ""));

export default function AdventureSearch() {
  const [searchState, setsearchState] = useState(fieldState);

  const handleChange = (e) => {
    setsearchState({ ...searchState, [e.target.id]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform form submission or data handling here
    searchAdventure();
  };


  const searchAdventure = async () => {
    const result = await fetch("http://localhost:3000/api/adventure/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(searchState),
    });

    const jsonData = await result.json();
    // console.log(jsonData);
    alert(jsonData.success);
    window.location.reload();
  };

  return (
    <div className="h-screen flex justify-evenly">

    <div className="flex flex-col  items-center justify-center ">
        <h1 className="uppercase font-bold text-2xl underline">Search</h1>
    <form onSubmit={handleSubmit} className="mt-4 space-y-6 w-96 bg-red-200 p-2">
      <div className="">
        {
          fields.map((field) => (
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
            ))
          }
        <FormAction handleSubmit={handleSubmit} text={'Search'} />
      </div>
    </form>
    </div>
        
     {/* <div className="flex flex-col items-center justify-center">
    <h1 className="uppercase font-bold text-2xl underline">Registration Instruction</h1>
      <div className="mt-4 space-y-6 w-96 bg-red-200 p-2">
        <ul className="list-disc pl-8">
          <li>Adventure Name: Enter the name of the Adventure</li>
          <li>Platform Location: Provide the URL of the Adventure theatre on Bing Maps, or any other relevant OTT platform.</li>
          <li>Give a rating for the Adventure on a scale of 1 to 5</li>
          <li>Money: Enter the amount of money required for ticket purchase or Adventure rental.</li>
          <li>Show Time: Specify the time when the Adventure will be shown or available for viewing.</li>
        </ul>
      </div>
    </div> */}
    </div>
  );
}