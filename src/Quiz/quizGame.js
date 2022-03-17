import React, { useState , useEffect} from "react";
import "./quiz.css";
import { Divider } from "antd";
import { useNavigate } from "react-router-dom";
import { Card, Button } from "antd";

const Quiz = ({authorised}) => {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [arrayOfChoices, setarrayOfChoices] = useState([]);
  const [testQuestions , setTestQuestions] = useState([])
  const [questions, setQuestions] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    if(authorised.quiz === false){
      navigate(`/`)
    }
  })

  useEffect(() => {
    const adminQuestion = localStorage.getItem("questions");
    const questionss = JSON.parse(adminQuestion);
    setTestQuestions(questionss)
  }, [])
console.log(testQuestions , 'd')
  const handleClick = (choice) => {
    arrayOfChoices.push(choice.key);

    if (arrayOfChoices.length === testQuestions[index].answer.length) {
      if (JSON.stringify(arrayOfChoices) === JSON.stringify(testQuestions[index].answer)) {
        setScore(score + 1);
        setQuestions([
          ...questions,
          {
            title: testQuestions[index].title,
            answer: testQuestions[index].answer,
            choices: arrayOfChoices,
            isCorrect: true,
          },
        ]);
      } else
        setQuestions([
          ...questions,
          {
            title: testQuestions[index].title,
            answer: testQuestions[index].answer,
            choices: arrayOfChoices,
            isCorrect: false,
          },
        ]);
      setarrayOfChoices([]);
    } else return;
    setIndex(index + 1);
  };

  if (index === testQuestions.length) navigate("/result");
  localStorage.setItem("quizResult", JSON.stringify(questions));
  localStorage.setItem("scores", score);

  return (
    <div className="container">
      <Card bordered={false} style={{ width: 900 }}>
        <h2>
          Question {index} of {testQuestions.length}
        </h2>
        <div>
          <p className="question-title"> {testQuestions[index]?.title}</p>
          <Divider />
          <div className="choices-buttons">
            {testQuestions[index]?.choices.map((choice) => (
              <Button
                key={choice.key}
                onClick={() => handleClick(choice)}
                className="choices"
              >
                <p className="key">{choice.key}</p>
                <p style={{ paddingLeft: "40%", margin: "5px" }}>
                  {choice.title}
                </p>
              </Button>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};
export default Quiz;
