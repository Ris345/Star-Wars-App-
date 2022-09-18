import "./App.css";
import AddChar from "./Input";
import React, { useState } from "react";
import Header from "./Header";

function App() {
  //dummy data
  const [data, setData] = useState(
    {
      id: Date.now(), 
      name: "Luke Skywalker",
      BirthDate: "19BBY",
      Height: "172cm",
      Mass: "77kg",
      Homeworld: "Tatooine",
      Species: "Human",
    },
    {
      id: Date.now(), 
      name: "C-3PO",
      BirthDate: "112BBY",
      Height: "167cm",
      Mass: "75kg",
      Homeworld: "Tatooine",
      Species: "Droid",
    },
  );

  const charRows = (
    <tbody>
       <tr>
      <td>{data.name}</td>
      <td>{data.BirthDate}</td>
      <td>{data.Height}</td>
      <td>{data.Mass}</td>
      <td>{data.Homeworld}</td>
      <td>{data.Species}</td>
      </tr>
    </tbody>
    
    
  );
  console.log(data);

  return (
    <div className="table-responsive">
      <Header />
      <AddChar />
      <table caption="page 1" className="table table-bordered">
        <tbody className="table-dark">
          <tr>
            <th>Name</th>
            <th>Birth Date</th>
            <th>Height</th>
            <th>Mass</th>
            <th>Homeworld</th>
            <th>Species</th>
          </tr>
        </tbody>
        {charRows}
      </table>
    </div>
  );
}

export default App;
