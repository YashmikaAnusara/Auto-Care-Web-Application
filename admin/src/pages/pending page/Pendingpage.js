import React from 'react';
import { useEffect,useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./Pendingpage.css"

export default function Pendingpage({search,setSearch}){

    const [servicedetails, setservicedetails] = useState([
        {
          name: "",
          nic: "",
          vnumber: "",
          cemail: "",
          stype: "",
          cnumber: "",
        },
      ]);
    
      useEffect(() => {
        function getdetails() {
          axios
            .get("http://localhost:8070/service/pending")
            .then((res) => {
            //   console.log(res);
              setservicedetails(res.data);
            })
            .catch((err) => {
              alert(err.message);
            });
        }
    
        getdetails();
      },[]);
    
      const fromhandler =(event)=>{
        const data ={servicedetails}
    
          axios.post('http://localhost:8070/service/addstaff',data)
          .then(res=>{
            // setpop(true);
            alert("Employee Added Successfully");
            console.log(data);
          })
          .catch(err=>{
            // setOpen(true);
            alert("Database Error");
          })
        //  event.preventDefault();
      }
      const renderClass = (servicedetails, index) => {
        return (
          <tr key={index}>
            <td className="table-clo1">{servicedetails.name}</td>
            <td className="table-clo3">{servicedetails.vnumber}</td>
            <td className="table-clo4">{servicedetails.cemail}</td>
            <td className="table-clo5">{servicedetails.stype}</td>
            <td className="table-clo6">{servicedetails.cnumber}</td>
            <td><Link to={`/workprogress/${servicedetails._id}`}>
                <button  size="small" color="primary" >Edit / Delete Service</button>
                </Link>
            </td>
            <td>
                <button onClick={fromhandler} size="small" color="primary" >Start Service</button>
            </td>
          </tr>
        );
      };

    return(
        <div className="home">
            <h1 className="heading">Pending Services</h1>
            <input placeholder="Enter Customer Vehicle Number " className="searchbox" type="search" onChange={(e) => setSearch(e.target.value)}/>
            {/* <div ref={componentRef}> */}
            <table className="table-report">
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Customer Vehicle Number</th>
                <th>Customer Email</th>
                <th>Vehicle Service Type</th>
                <th>Customer Mobile Number</th>
              </tr>
            </thead>
            <tbody>{servicedetails ?.reverse()
                .filter((filteredservices) =>
                    filteredservices.vnumber
                    .toLowerCase()
                    .includes(search.toLowerCase())
                ).map(renderClass)}</tbody>
          </table>
          {/* </div> */}
        </div>
    )
}