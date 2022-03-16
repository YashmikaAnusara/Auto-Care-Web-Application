import React from 'react';
import { useEffect,useState } from 'react';
import axios from 'axios';
import Buttoninprogress from '../../components/Button in porgress/buttoninprogress';
import "./InprogressPage.css"

export default function Inprogress({search,setSearch}){

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
            .get("http://localhost:8070/service/inprogress")
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

      const renderClass = (servicedetails, index) => {
        return (
          <tr key={index}>
            <td className="table-clo1">{servicedetails.name}</td>
            <td className="table-clo3">{servicedetails.vnumber}</td>
            <td className="table-clo4">{servicedetails.cemail}</td>
            <td className="table-clo5">{servicedetails.stype}</td>
            <td className="table-clo6">{servicedetails.cnumber}</td>
            <td>
              <Buttoninprogress cid={servicedetails._id}/>
            </td>
            {/* <td><Link to={`/workprogress/startservice/${servicedetails._id}`}>
                <button  size="small" color="primary" >Start Service</button>
                </Link>
            </td> */}
          </tr>
        );
      };

    return(
        <div className="home">
            <h1 className="heading">Inprogress Services</h1>
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