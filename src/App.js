import "./App.css";
import AddChar from "./Input";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";

function App() {
  const [people, setPeople] = useState([]);
  const [nextUrl, setnextUrl] = useState();
  const [prevUrl, setprevUrl] = useState();

  const getPeople = (url) => {
    axios.get(url).then(async (response) => {
      //loop through each character
      for (let i = 0; i < response.data.results.length; i++) {
        let planetUrl = response.data.results[i].homeworld;
        let speciesUrl = response.data.results[i].species;
        // make an HTTP request for the characters homeworld
        axios.get(planetUrl).then((resp) => {
          // set the characters homeworld name property based on the data that comes back
        });
        axios.get(speciesUrl).then((rsp) => {});

        const resp = await axios.get(planetUrl);
        response.data.results[i].homeworld = resp.data.name;
        const rsp = await axios.get(speciesUrl);
        if (!rsp.data.name) {
          response.data.results[i].species = "Human";
        } else {
          response.data.results[i].species = rsp.data.name;
        }
      }

      setPeople(response.data.results);
      setnextUrl(response.data.next);
      setprevUrl(response.data.previous);
    });
  };
  console.log("people: ", people);

  const getprevPage = () => {
    getPeople(prevUrl);
  };

  const getNewPage = () => {
    getPeople(nextUrl);
  };

  useEffect(() => getPeople("https://swapi.dev/api/people/"), []);

  const convertpeopleObject = [...Object.values(people)];

  const populateTable = convertpeopleObject.map((char, index) => {
    return (
      <tbody key={index}>
        <tr key={index}>
          <td>{char.name}</td>
          <td>{char.birth_year}</td>
          <td>{char.height}</td>
          <td>{char.mass}</td>
          <td>{char.homeworld}</td>
          <td>{char.species}</td>
        </tr>
      </tbody>
    );
  });

  return (
    <div className="table-responsive">
      <Header />
      <AddChar />
      <table caption="page 1" className="table table-bordered border-dark">
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
        {populateTable}
      </table>
      <div className="row">
        <footer className="fixed-bottom">
          <button className="btn btn-outline-dark btn-sm" onClick={getprevPage}>
            prev
          </button>
          <button
            className="btn btn-outline-dark btn-sm float-right"
            onClick={getNewPage}
          >
            next
          </button>
        </footer>
      </div>
    </div>
  );
}

export default App;
