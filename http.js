
import axios from "axios";
import React from 'react'

function http() {
    axios({
        url: "https://swapi.dev/api/people/",
        method: 'get'
      })
      
      ;(async () => {
          const response = await axios({
            url: 'https://swapi.dev/api/people/',
            method: 'get'
          })
        
          console.log(response)
        })()
      
      axios.get()
  return (
    <div>
      
    </div>
  )
}


axios({
  url: 'https://dog.ceo/api/breeds/list/all',
  method: 'get'
})



export default http
