import "./App.css";
import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import axios from "axios";
import FormInput from "./components/FormInput";
import TableView from "./components/TableView";
import Footer from "./components/Footer";

function App() {
  const [people, setPeople] = useState([]);
  const [nextUrl, setNextUrl] = useState();
  const [prevUrl, setprevUrl] = useState();
  const [userInput, setuserInput] = useState();

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
      setNextUrl(response.data.next);
      setprevUrl(response.data.previous);
    });
  };

  const updateForm = (e) => {
    setuserInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(`https://swapi.dev/api/people/?search=${userInput}`)
      .then(async (rp) => {
        if (!rp) {
          setPeople("Invalid input try again!");
        }
        for (let i = 0; i < rp.data.results.length; i++) {
          let planetUrl = rp.data.results[i].homeworld;
          let speciesUrl = rp.data.results[i].species;
          axios.get(planetUrl).then((resp) => {});
          axios.get(speciesUrl).then((rsp) => {});
          const resp = await axios.get(planetUrl);
          rp.data.results[i].homeworld = resp.data.name;
          const rsp = await axios.get(speciesUrl);
          if (!rsp.data.name) {
            rp.data.results[i].species = "Human";
          } else {
            rp.data.results[i].species = rsp.data.name;
          }
        }
        setPeople(rp.data.results);
      });
  };

  const getprevPage = () => {
    getPeople(prevUrl);
  };

  const getNextPage = () => {
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
    <div className="table-responsive p-3 mb-2 bg-light text-dark">
      <Header />
      <FormInput
        handleSubmit={handleSubmit}
        getPeople={getPeople}
        updateForm={updateForm}
      />
      <TableView populateTable={populateTable} />
      <Footer nextUrl={nextUrl} prevUrl={prevUrl} getprevPage={getprevPage} getNextPage={getNextPage} />
    </div>
  );
}

export default App;
