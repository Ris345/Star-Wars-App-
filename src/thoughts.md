

step 1
get data from api using axios 
step 2 
console.log the data 
step 3 
convert the object into an array 
step 4 
populate the first page using map
step 5 
populate two remaining headers 
step 6 
 populate table with  remaining homeworld and species 
 step 7


steps to fix the homeworld problem 


step 1 
 loop through each character 
step 2 
  make a http request with homeworld object
  just make a http get request from the characters object.....
step 3 
 




steps for search button 
step 1 
 user type something in the input box 
step 2 
 user clicks the search button 
step 3 
 if search item matches 
  return resuls 
  else 
  no action 
 









 // const url1 = "https://swapi.dev/api/people/?page=2";
    // const url2 = "https://swapi.dev/api/people/?page=3";
    // const url3 = "https://swapi.dev/api/people/?page=4";
    // const url4 = "https://swapi.dev/api/people/?page=5";
    // const url5 = "https://swapi.dev/api/people/?page=6";
    // const url6 = "https://swapi.dev/api/people/?page=7";
    // const url7 = "https://swapi.dev/api/people/?page=8";
    // const url8 = "https://swapi.dev/api/people/?page=9";

  // axios.get(url1),
        // axios.get(url2),
        // axios.get(url3),
        // axios.get(url4),
        // axios.get(url5),
        // axios.get(url6),
        // axios.get(url7),
        // axios.get(url8),


// const pageOne = response[1].data.results;
        // setPage1(pageOne);
        // const pageTwo = response[2].data.results;
        // //console.log(pageTwo);
        // const pageThree = response[3].data.results;
        // //console.log(pageThree);
        // const pageFour = response[4].data.results;
        // //console.log(pageFour);
        // const pageFive = response[5].data.results;
        // //console.log(pageFive);
        // const pageSix = response[6].data.results;
        // //console.log(pageSix);
        // const pageSeven = response[7].data.results;
        // // console.log(pageSeven);
        // const pageEight = response[8].data.results;
        // //console.log(pageEight);




        const getPeople = () => {
    const url = "https://swapi.dev/api/people/";
    axios.get(url)
      .then((response) => {
        const people = response[0].data.results;
        console.log(people)
        setPage(people)
      })
      .catch((error) => {
         console.log(error)
       })
  }
  

  const getPlanets = (planet) => {
    console.log(planet);
    axios.get(planet)
      .then((response) => {
        const planets = response[1].data.results;
        return planets; 
      })
      .catch((error) => {
         console.log(error)
      })
    
  }


  const getSpecies = (species) => {
    console.log(species)
    axios
      .get(species)
      .then((response) => {
        const species = response[2].data.results;
        return species; 
      })
      .catch((error) => {
        console.log(error);
      });
  };


  useEffect( () => getPeople(), []);

  const convert = [...Object.values(page)];

  const populateTable = convert.map((keys, index) => {
    return (
      <tr key={keys.id}>
        <td>{keys.name}</td>
        <td>{keys.birth_year}</td>
        <td>{keys.height}</td>
        <td>{keys.mass}</td>
        <td>{getPlanets(keys.homeworld)}</td>
        <td>{keys.species}</td>
      </tr>
    );
  });












const getPlanets = (url) => {
    axios.get(url).then((response) => {   
      console.log(response.data.results)
      setPlanets(response.data.name);
    });
  };

console.log(planets)
  const getSpecies = (species) => {
    axios.get(species).then((response) => {
        console.log(response)
        setSpecies(species)
      })
  };

  useEffect(() => getPlanets("https://swapi.dev/api/planets/"), []);
  // useEffect(() => getSpecies(), [])

  useEffect(() => getPeople("https://swapi.dev/api/people/"), []);




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

  const getPlanets = (url) => {
    axios.get(url).then((response) => {
      setPlanets(response.data.results);
    });
  };

  const getSpecies = (species) => {
    axios.get(species).then((response) => {
      console.log(response);
      setSpecies(species);
    });
  };

  useEffect(() => getPlanets("https://swapi.dev/api/planets/"), []);

  useEffect(() => getPeople("https://swapi.dev/api/people/"), []);

  const convertObject = [...Object.values(people)];

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
