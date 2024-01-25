// Importing React and external libs
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function Show() {

  const [data, setData] = useState({});
  const { id } = useParams();

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
  }, []);

  return (

    <div>
      {
        <div>
          <img src={data.avatar} alt={data.first_name} />
          <p><b>ID: </b>{data.id}</p>
          <p><b>Email: </b>{data.email}</p>
          <p><b>First Name: </b>{data.first_name}</p>
          <p><b>Last Name: </b>{data.last_name}</p>
          <hr />
        </div>
      }
    </div>
  );
}

export default Show;
