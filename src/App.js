import "./App.css";
import AddChar from "./Input";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";

function App() {
  const [people, setPeople] = useState([]);
  const [nextUrl, setnextUrl] = useState();
  const [prevUrl, setprevUrl] = useState();
  const [planets, setPlanets] = useState([]);
  const [species, setSpecies] = useState([]);

  const getPeople = (url) => {
    axios.get(url).then((response) => {
      setPeople(response.data.results);
      setnextUrl(response.data.next);
      setprevUrl(response.data.previous);
    });
  };

  const getprevPage = () => {
    getPeople(prevUrl);
  };

  const getNewPage = () => {
    getPeople(nextUrl);
  };


  useEffect(() => {
    async function getPlanets() {
      const response = await axios("https://swapi.dev/api/planets/")
      setPlanets(response.data.results)
    }
    getPlanets()
 },[])

  
  useEffect(() => {
    async function getSpecies() {
      const response = await axios("https://swapi.dev/api/species/")
      setSpecies(response.data.results)
    }
    getSpecies()
  },[])
  

  useEffect(() => getPeople("https://swapi.dev/api/people/"), []);

  const convertObject = [...Object.values(people,planets,species)];

   
  const populateTable = convertObject.map((keys, index) => {
    return (
      <tr key={keys.id}>
        <td>{keys.name}</td>
        <td>{keys.birth_year}</td>
        <td>{keys.height}</td>
        <td>{keys.mass}</td>
        {/* <td>{getPlanets(keys.homeworld)}</td> */}
        {/* <td>{getSpecies(keys.species)}</td> */}
      </tr>
    );
  });

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
