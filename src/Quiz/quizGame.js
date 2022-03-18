import React, {useState, useEffect} from "react";
import "./quiz.css";
import {Divider} from "antd";
import {useNavigate} from "react-router-dom";
import {Card, Button} from "antd";


const Quiz = ({authorised}) => {

    const [questionIndex, setQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [arrayOfChoices, setArrayOfChoices] = useState([]);
    const [questions, setQuestions] = useState([])
    const [quizResult, setQuizResults] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        if (authorised.quiz === false) {
            navigate(`/`)
        }
    })

    useEffect(() => {
        const adminQuestion = localStorage.getItem("questions");
        setQuestions(JSON.parse(adminQuestion))
    }, [])

    const onUpdatingResults = (isCorrect) => {
        setQuizResults([
            ...quizResult,
            {
                title: questions[questionIndex].title,
                answer: questions[questionIndex].answer,
                userChoice: arrayOfChoices,
                options: questions[questionIndex].choices,
                isCorrect: isCorrect,
            },
        ]);
    }


    const onChoiceSelect = (choice) => {
        arrayOfChoices.push(choice.key);

        if (arrayOfChoices.length === questions[questionIndex].answer.length) {

            //TODO: CHECK THE ORDER OF CORRECT ANSWERS
            if (JSON.stringify(arrayOfChoices) === JSON.stringify(questions[questionIndex].answer)) {
                setScore(score + 1);
                onUpdatingResults(true);
            } else
                onUpdatingResults(false);
        } else
            return;
        setArrayOfChoices([]);
        setQuestionIndex(questionIndex + 1);
    };

    if (questionIndex === questions.length)
        navigate("/result");

    localStorage.setItem("quizResult", JSON.stringify(quizResult));
    localStorage.setItem("scores", JSON.stringify(score));

    return (
        <div className="container">
            <Card bordered={false} style={{width: 900}}>
                <h2>
                    Question {questionIndex + 1} of {questions.length}
                </h2>
                <div>
                    <p className="question-title"> {questions[questionIndex]?.title}</p>
                    <p>This question has {questions[questionIndex]?.answer.length} correct choice/s</p>
                    <Divider/>
                    <div className="choices-buttons">
                        {questions[questionIndex]?.choices.map((choice) => (
                            <Button
                                key={choice.key}
                                onClick={() => onChoiceSelect(choice)}
                                className="choices">
                                <p className="key">{choice.key}</p>
                                <p style={{paddingLeft: "40%", margin: "5px"}}>
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
