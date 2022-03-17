import React, { useState } from "react";
import "./quiz.css";
import { Divider } from "antd";
import { useNavigate } from "react-router-dom";
import data from "../assests/data";
import { Card, Button } from "antd";

const Quiz = () => {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [arrayOfChoices, setarrayOfChoices] = useState([]);
  const [questions, setQuestions] = useState([]); //kshu
  let navigate = useNavigate();

  const handleClick = (choice) => {
    arrayOfChoices.push(choice.key);

    if (arrayOfChoices.length === data[index].answer.length) {
      if (
        JSON.stringify(arrayOfChoices) === JSON.stringify(data[index].answer)
      ) {
        setScore(score + 1);
        debugger;
        setQuestions([
          ...questions,
          {
            title: data[index].title,
            answer: data[index].answer,
            choices: arrayOfChoices,
            isCorrect: true,
          },
        ]);
      } else
        setQuestions([
          ...questions,
          {
            title: data[index].title,
            answer: data[index].answer,
            choices: arrayOfChoices,
            isCorrect: false,
          },
        ]);
      setarrayOfChoices([]);
    } else return;
    setIndex(index + 1);
  };

  if (index === data.length) navigate("/result"); 
  localStorage.setItem("quizResult", JSON.stringify(questions));
  localStorage.setItem("scores", score);

  return (
    <div className="container">
      <Card bordered={false} style={{ width: 900 }}>
        <h2>
          Question {index} of {data.length}
        </h2>
        <div>
          <p className="question-title"> {data[index]?.title}</p>
          <Divider />
          <div className="choices-buttons">
            {data[index]?.choices.map((choice) => (
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
