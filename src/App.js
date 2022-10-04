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
      //0response.data.results.homeworld = 'Tatooine'
      //loop through each character
      for (let i = 0; i < people.length; i++) {
        let planetUrl = response.data.results[i].homeworld;
        console.log(planetUrl);
        //getPlanet(planetUrl);
        axios.get(planetUrl).then((resp) => {
          response.data.results[i].homeworld = resp.data.name
          console.log('resp;', response.data.results[i].homeworld)
          //setPlanets(response.data.name);
          // console.log(response.data.name);
        });
      }

      // make an HTTP request for the characters homeworld

      // set the characters homeworld name property based on the data that comes back
      setPeople(response.data.results);
      setnextUrl(response.data.next);
      setprevUrl(response.data.previous);
    });
  };
 console.log('people: ', people)

  const getprevPage = () => {
    getPeople(prevUrl);
  };

  const getNewPage = () => {
    getPeople(nextUrl);
  };

  // async function getPlanet(planetUrl) {
  //   const response = await axios(planetUrl);
  //   return response.data.name;

  //     }

  // useEffect(() => {
  //   async function getPlanets() {
  //     const response = await axios("https://swapi.dev/api/planets/");
  //     setPlanets(response.data.name);
  //     console.log(response.data.name)
  //   }
  //   getPlanets();
  // }, []);

  // useEffect(() => {
  //   async function getSpecies() {
  //     const response = await axios("https://swapi.dev/api/species/");
  //     setSpecies(response.data.results);
  //   }
  //   getSpecies();
  // }, []);

  useEffect(() => getPeople("https://swapi.dev/api/people/"), []);

  const convertpeopleObject = [...Object.values(people)];

  // const convertplanetObject = [...Object.values(planets)];

  // const convertspeciesObject = [...Object.values(species)];

  // const arrCollecion = [
  //   ...convertpeopleObject,
  //   ...convertplanetObject,
  //   ...convertspeciesObject,
  // ];

  const populateTable = convertpeopleObject.map((char, index) => {
    return (
      <tbody key={index}>
        <tr key={index}>
          <td>{char.name}</td>
          <td>{char.birth_year}</td>
          <td>{char.height}</td>
          <td>{char.mass}</td>
          <td>{char.homeworld}</td>
          <td>{}</td>
          {/* <td>{getPlanets(char.homeworld)}</td> */}
          {/* <td>{getSpecies(keys.species)}</td> */}
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
