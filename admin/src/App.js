import Topbar from "./components/topbar/Topbar";
import Sidebar from "./components/sidebar/Sidebar";
import './App.css';
import { useState } from "react";
import Home from "./pages/home/Home";
import Addservice from "./pages/addservices/Addservices";
import Workprogress from "./pages/workprogess/Workprogress";
import Pendingpage from "./pages/pending page/Pendingpage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const [search, setSearch] = useState("");
  return (
    <Router>
      <Topbar />

     <div className="container">
       <Sidebar/>
       <Switch>
         
       <Route exact path="/">
         <Home/>
         </Route>

         {/*Services and Work Progess*/}
         <Route exact path="/addservice">
          <Addservice/>
          </Route>

          <Route exact path="/workprogress">
          <Workprogress/>
          </Route>

          <Route exact path="/workprogress/pendingservices">
          <Pendingpage setSearch={setSearch} search={search}/>
          </Route>

       </Switch>
     </div>
    </Router>
  );
}

export default App;
