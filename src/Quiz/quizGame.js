import React, { useState , useEffect} from "react";
import "./quiz.css";
import { Divider } from "antd";
import { useNavigate } from "react-router-dom";
import { Card, Button } from "antd";


const Quiz = ({authorised}) => {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [arrayOfChoices, setarrayOfChoices] = useState([]);
  const [questions , setQuestions] = useState([])
  const [checkAnswer, setCheckAnswers] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    if(authorised.quiz === false){
      navigate(`/`)
    }
  })

  useEffect(() => {
    const adminQuestion = localStorage.getItem("questions");
    const questionss = JSON.parse(adminQuestion);
    setQuestions(questionss)
  }, [])


  const handleClick = (choice) => {
    arrayOfChoices.push(choice.key);

    if (arrayOfChoices.length === questions[index].answer.length) {
      if (JSON.stringify(arrayOfChoices) === JSON.stringify(questions[index].answer)) {
        setScore(score + 1);
        setCheckAnswers([
          ...checkAnswer,
          {
            title: questions[index].title,
            answer: questions[index].answer,
            userChoice: arrayOfChoices,
            options : questions[index].choices,
            isCorrect: true,
          },
        ]);
      } else
        setCheckAnswers([
          ...checkAnswer,
          {
            title: questions[index].title,
            answer: questions[index].answer,
            userChoice: arrayOfChoices,
            options : questions[index].choices,
            isCorrect: false,
          },
        ]);
      setarrayOfChoices([]);
    } else return;
    setIndex(index + 1);
  };

  if (index === questions.length) navigate("/result");
  localStorage.setItem("quizResult", JSON.stringify(checkAnswer));
  localStorage.setItem("scores", score);

  return (
    <div className="container">
      <Card bordered={false} style={{ width: 900 }}>
        <h2>
          Question {index} of {questions.length}
        </h2>
        <div>
          <p className="question-title"> {questions[index]?.title}</p>
          <Divider />
          <div className="choices-buttons">
            {questions[index]?.choices.map((choice) => (
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
