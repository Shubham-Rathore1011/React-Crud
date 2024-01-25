// Importing React and external libs
import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

const Edit = () => {

  const [data, setData] = useState({});
  const { id } = useParams();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const previousFirstName = useRef("");
  const previousLastName = useRef("");

  useEffect(() => {

    async function fetchData() {

      try {
        const response = await axios.get(`https://reqres.in/api/users/${id}`);
        const result = await response.data.data;
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }


    }

    fetchData();

  }, [])

  previousFirstName.current = data.first_name;
  previousLastName.current = data.last_name;

  const handleSubmit = (e) => {
    e.preventDefault();


    previousFirstName.current = firstName;
    previousLastName.current = lastName;

    data.first_name = previousFirstName.current;
    data.last_name = previousLastName.current;

    setFirstName("");
    setLastName("");

  }

  return (

    <div>
      {
        <div>
          
          <h2>Edit Data</h2>
          <form>
            <label>
              First Name: <br />
              <input type="text" name="first_name" value={firstName} required onChange={(e) => setFirstName(e.target.value)}  />
            </label>
            <br /><br />
            <label>
              Last Name: <br />
              <input type="text" name="last_name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
            </label>
            <br /><br />
            <input type="submit" value="Submit" onClick={(e) => handleSubmit(e)} />
          </form><br />
          <div>
            {
              <div>
                <img src={data.avatar} alt={data.first_name} />
                <p><b>ID: </b>{data.id}</p>
                <p><b>Email: </b>{data.email}</p>
                <p><b>First Name: </b>{ previousFirstName.current || firstName}</p>
                <p><b>Last Name: </b>{ previousLastName.current || lastName}</p>
                <hr />
              </div>
            }
          </div>

        </div>
      }
    </div>
  )
}

export default Edit;


