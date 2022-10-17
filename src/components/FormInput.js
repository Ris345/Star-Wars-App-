import React from 'react'

function FormInput({handleSubmit,getPeople,updateForm}) {
  return (
    <div>
        <form
        onSubmit={handleSubmit}
        onReset={() => {
          getPeople("https://swapi.dev/api/people/");
        }}
      >
        <input onChange={updateForm} />
        <button type="submit" className="btn btn-outline-primary">
          Search
        </button>
        <button type="reset" className="btn btn-outline-danger">
          Clear
        </button>
      </form>
    </div>
  )
}

export default FormInput;
