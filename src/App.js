import "./App.css";
import AddChar from "./Input";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";

// use a different piece of state for each new render page
// don't need to call a different api everytime!
// try using async to avoid call back hell !!!
//

function App() {
  const [page0, setPage0] = useState([]);
  const [page1, setPage1] = useState([]);
  const [page2, setPage2] = useState([]);
  const [page3, setPage3] = useState([]);
  const [page4, setPage4] = useState([]);
  const [page5, setPage5] = useState([]);
  const [page6, setPage6] = useState([]);
  const [page7, setPage7] = useState([]);

  const getPeople = () => {
    const url = "https://swapi.dev/api/people/";
    axios
      .get(url)
      .then((response) => {
        let zeroResponse = response.data.next;
        const pageZero = response.data.results;
        setPage0(pageZero);
        axios.get(zeroResponse).then((response) => {
          let twoResponse = response.data.next;
          const pageOne = response.data.results;
          setPage1(pageOne);
          axios.get(twoResponse).then((response) => {
            let threeResponse = response.data.next;
            const pageTwo = response.data.results;
            setPage2(pageTwo);
            axios.get(threeResponse).then((response) => {
              let fourResponse = response.data.next;
              const pageThree = response.data.results;
              setPage3(pageThree);
              axios.get(fourResponse).then((response) => {
                let fiveResponse = response.data.next;
                const pageFour = response.data.results;
                setPage4(pageFour);
                axios.get(fiveResponse).then((response) => {
                  let sixResponse = response.data.next;
                  const pageFive = response.data.results;
                  setPage5(pageFive);
                  axios.get(sixResponse).then((response) => {
                    let sixResponse = response.data.next;
                    const pageSix = response.data.results;
                    setPage6(pageSix);
                    axios.get(sixResponse).then((response) => {
                      const pageSix = response.data.results;
                      setPage7(pageSix);
                    });
                  });
                });
              });
            });
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getPlanets = (planet) => {
    axios
      .get(planet)
      .then((response) => {
        const planets = response.data.name;
        if (planets) {
          return <td>{planets}</td>;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const getSpecies = (species) => {
  //   axios
  //     .get(species)
  //     .then((response) => {
  //       const species = response.data.name;
  //       return species;
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  useEffect(() => getPeople(), []);

  const convert1 = [...Object.values(page0)];

  const populateTable = convert1.map((keys, index) => {
    return (
      <tr key={keys.id}>
        <td>{keys.name}</td>
        <td>{keys.birth_year}</td>
        <td>{keys.height}</td>
        <td>{keys.mass}</td>
        <td>{getPlanets(keys.homeworld)}</td>
        {/* /* <td>{getSpecies(keys.species)}</td> */}
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
          <button className="btn btn-outline-dark btn-sm">prev</button>
          <button className="btn btn-outline-dark btn-sm float-right">
            next
          </button>
        </footer>
      </div>
    </div>
  );
}

export default App;
