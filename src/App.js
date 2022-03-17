import { Routes, Route } from "react-router-dom";
import Layout from "./Quiz/layout/layout";
import Quiz from './Quiz/quizGame';
import Result from './Quiz/Result'

function App() {
  return (
<Layout>
        <Routes>
          <Route path = "/quiz"  element={<Quiz />} />
            <Route path = "/result"  element={<Result />} />
        </Routes>
        </Layout>
  );
}

export default App;
