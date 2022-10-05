import "./App.css";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";


function App() {
  const [people, setPeople] = useState([]);
  const [nextUrl, setnextUrl] = useState();
  const [prevUrl, setprevUrl] = useState();
  const [incoming, setIncoming] = useState()

  const getPeople = (url) => {
    axios.get(url).then(async (response) => {
      for (let i = 0; i < response.data.results.length; i++) {
        let planetUrl = response.data.results[i].homeworld;
        let speciesUrl = response.data.results[i].species;
        axios.get(planetUrl).then((resp) => {});
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

  const updateForm = (e) => {
    let incomingMatch = e.target.value
    setIncoming(incomingMatch)
     console.log(incoming)
    
   }

  const Searchchar = (e) => {
    e.preventDefault();
    console.log(typeof people)
    console.log(typeof incoming)
    for (let i = 0; i < people.length; i++){
      console.log(people[i])
    }
    // if (people.inludes(incoming)) {
    //   console.log('true')
    // }
  };
  
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
          <td>{char.height}cm</td>
          <td>{char.mass}kg</td>
          <td>{char.homeworld}</td>
          <td>{char.species}</td>
          {/* <td>{char.films}</td> */}
        </tr>
      </tbody>
    );
  });

  return (
    <div className="table-responsive">
      <Header />
      {/* <AddChar /> */}
      <form>
        <input onChange={updateForm} />
        <button type="submit" className="btn btn-success" onClick={Searchchar}>
          Search
        </button>
        <button type="submit" className="btn btn-danger">
          Clear
        </button>
      </form>
      <table caption="page 1" className="table table-bordered border-dark">
        <tbody className="table-dark">
          <tr>
            <th>Name</th>
            <th>Birth Date</th>
            <th>Height</th>
            <th>Mass</th>
            <th>Homeworld</th>
            <th>Species</th>
            {/* <th>Movies</th> */}
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
