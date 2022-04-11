import Topbar from "./components/topbar/Topbar";
import Sidebar from "./components/sidebar/Sidebar";
import './App.css';
import { useState } from "react";
import Home from "./pages/home/Home";
import Addservice from "./pages/addservices/Addservices";
import Workprogress from "./pages/workprogess/Workprogress";
import Pendingpage from "./pages/pending page/Pendingpage";
import Inprogress from "./pages/Inprogress page/InprogressPage";
import Startservice from "./pages/start service/Startservice";
import Finishpage from "./pages/finish page/Finishpage";
import Editpage from "./pages/Edit Page/Editpage";
import Editordeletepage from "./pages/Edit or delete page/Edit or delete page";
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

          <Route exact path="/workprogress/startservice/:id">
          <Startservice/>
          </Route>
          
          <Route exact path="/workprogress/inprogressservices">
          <Inprogress setSearch={setSearch} search={search}/>
          </Route>

          <Route exact path="/workprogress/finishservices">
          <Finishpage setSearch={setSearch} search={search}/>
          </Route>

          <Route exact path="/workprogress/editordeleteservice/:id">
          <Editordeletepage/>
          </Route>

          <Route exact path="/workprogress/editservice/:id">
          <Editpage/>
          </Route>

          <Route exact path="/workprogress/deleteservice/:id">
          <Editpage/>
          </Route>

       </Switch>
     </div>
    </Router>
  );
}

export default App;
