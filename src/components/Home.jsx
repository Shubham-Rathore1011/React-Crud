import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {FaEye, FaEdit, FaTrash} from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import "./Data.css";
import ReactPaginate from 'react-paginate';

function MyComponent({data}) {
  

  let history = useNavigate();

  const handleDelete = (id) => {
    var index = data.map(function(e){
      return e.id;
    }).indexOf(id);

    data.splice(index, 1);

    history("/");
  }

  return (
    <div>
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
                        <button><FaEye /></button>
                        &nbsp;
                          <button><FaEdit /></button>
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
        </div>
    </div>
  );
}

function PaginatedItems() {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://reqres.in/api/users?page=${1}');

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

  const dataPerPage = 4;
  const [pageData, setPageData] = useState(0);
  const last = pageData + dataPerPage;
  const currentData = data.slice(pageData, last);
  const pageCount = Math.ceil(data.length / dataPerPage);

  const handlePageClick = (event) => {
    const newData = (event.selected * dataPerPage) % data.length;
    setPageData(newData);
  }
  console.log(data)

  return (
    <>
      {
        loading ? (
          <p>Loading...</p>
          ) : error ? (
            <p>Error: {error.message}</p>
          ) : (
            <>
              <MyComponent data={currentData}/>
              <div>
                <ReactPaginate
                  breakLabel="..."
                  nextLabel="Next"
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={5}
                  pageCount={pageCount}
                  previousLabel="Previous"
                  renderOnZeroPageCount={null}
                />
              </div>
            </>
          )
      }
    </>
  )
}

export default MyComponent;
