// Importing React and external libs
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate, Link } from 'react-router-dom';

// Importing Style
import "./Data.css";

function MyComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  let history = useNavigate();

  /**
   * Deletes a user data from the data table by its ID.
   * @param {string} id - The ID of the user data to delete.
   * @returns {void}
  **/
  const handleDelete = (id) => {

    /**
     * Maps all the user from the data and get index of that user
    **/
    var index = data.map(function (e) {
      return e.id;
    }).indexOf(id);

    data.splice(index, 1);

    history("/");
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://reqres.in/api/users?page=${1}`);

        const result = response.data.data;

        setData(result);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <div className='table'>
          <table>
            <thead>
              <tr>
                <th>
                  Photo
                </th>
                <th>
                  ID
                </th>
                <th>
                  Email
                </th>
                <th>
                  First Name
                </th>
                <th>
                  Last Name
                </th>
                <th>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {
                data && data.length > 0
                  ?
                  data.map((item) => {
                    return (
                      <tr>
                        <td>
                          <img src={item.avatar} alt="" />
                        </td>
                        <td>
                          {item.id}
                        </td>
                        <td>
                          {item.email}
                        </td>
                        <td>
                          {item.first_name}
                        </td>
                        <td>
                          {item.last_name}
                        </td>
                        <td>
                          <Link to={`/show/${item.id}`}>
                            <button ><FaEye /></button>
                          </Link>
                          &nbsp;
                          <Link to={`/edit/${item.id}`}>
                            <button ><FaEdit /></button>
                          </Link>
                          &nbsp;
                          <button onClick={() => handleDelete(item.id)}><FaTrash /></button>
                        </td>
                      </tr>
                    )
                  })
                  :
                  "No Data Found"
              }
            </tbody>
          </table>
        </div>)
      }
    </div>
  );
}

export default MyComponent;
