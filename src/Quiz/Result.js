import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import "./result.css";
import {Card} from "antd";
import {Button} from "antd";
import {Modal} from "antd";
import {CaretRightOutlined} from "@ant-design/icons";
import ChartResults from "./QuizResults/ChartResults";

const Result = ({authorised}) => {
    const [result, setResult] = useState([]);
    const [quizHistory, setQuizHistory] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);

    let navigate = useNavigate();

    useEffect(() => {
        if (authorised.quiz === false) {
            navigate(`/`);
        }
    });
    useEffect(() => {
        const scores = localStorage.getItem("scores");
        const quizResult = localStorage.getItem("quizResult");
        setResult(JSON.parse(scores));
        setQuizHistory(JSON.parse(quizResult));
    }, []);

    const handleClickRestart = () => {
        navigate("/quiz");
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
    }

    const getOptionColor = (correct, notSelected) => {
        return correct ? "green" : notSelected ? "black" : "red";
    }

    return (
        <div className="container-res">
            <Card className="card" bordered={false}>
                <p className="result-header">
                    You scored {result} of {quizHistory.length}
                </p>
                <div className="chart">
                    <ChartResults quizHistory={quizHistory}/>
                </div>
                <div className="buttons">
                    <Button className="back-btn" onClick={handleClickRestart}>
                        <CaretRightOutlined/>
                        Back to quiz
                    </Button>
                    <Button className="quizHistory" type="danger" onClick={showModal}>
                        View Quiz History
                    </Button>
                </div>
                <Modal
                    closable
                    footer={null}
                    title="Quiz History"
                    visible={isModalVisible}
                    onCancel={closeModal}>
                    {quizHistory?.map((question) => {
                        return (
                            <div>
                                {question.title}
                                {question.options.map((option) => {
                                    const isOptionCorrect = question.answer.indexOf(option.key) !== -1;
                                    const isNotSelected = question.userChoice.indexOf(option.key) == -1;
                                    return (
                                        <p style={{
                                            color: getOptionColor(isOptionCorrect, isNotSelected)
                                        }}>
                                            {option.key}
                                        </p>
                                    );
                                })}
                            </div>
                        );
                    })}
                </Modal>
            </Card>
        </div>
    );
};
export default Result;
