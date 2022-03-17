import { Routes, Route } from "react-router-dom";
import Layout from "./Quiz/layout/layout";
import Quiz from './Quiz/quizGame';
import Result from './Quiz/Result'
import AdminPage from "./Admin/pages/AdminPage";
import LoginPage from "./Login/LoginPage";
import {useState} from "react";

function App() {
    const [authorised , setAuthorised] = useState({
        admin : false ,
        quiz : false ,
    })

  return (
      <Layout>
        <Routes>
            <Route path = "/"  element={<LoginPage setAuthorised={setAuthorised}  />} />
          <Route path = "/quiz"  element={<Quiz authorised={authorised} />} />
                <Route path = "/result"  element={<Result authorised={authorised}/>} />
            <Route path = "/admin"  element={<AdminPage authorised={authorised} />} />
        </Routes>
       </Layout>
  );
}

export default App;
