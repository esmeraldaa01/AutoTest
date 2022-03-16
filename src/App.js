import { Routes, Route } from "react-router-dom";
import Quiz from './Quiz/quizGame';
import Result from './Quiz/Result'

function App() {
  return (

        <Routes>
          <Route path = "/quiz"  element={<Quiz />} />
            <Route path = "/result"  element={<Result />} />
        </Routes>
  );
}

export default App;
