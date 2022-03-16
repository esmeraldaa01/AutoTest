import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import data from "../assests/data";
import "./result.css";
import {Card} from "antd";
import {Button , Divider} from "antd";
import { Modal } from 'antd';
import { ReloadOutlined , CaretRightOutlined} from  '@ant-design/icons';

const Result = () => {
    const [result, setResult] = useState();
    const [isModalVisible, setIsModalVisible] = useState(false);
const [ history , setHistory ] = useState([]);
const [color , setColor] = useState('');
const [message , setMessage] = useState('')
    let navigate = useNavigate();

    useEffect(() => {
        const result = localStorage.getItem("scores");
        const quizResult = JSON.parse(result);
        setResult(quizResult);
    }, []);

    useEffect(() => {
        const quizHis = localStorage.getItem("quizResult");
        const quizHistory = JSON.parse(quizHis);
        setHistory(quizHistory);
    }, []);

    const handleClick = () => {
        localStorage.removeItem("scores");
        localStorage.removeItem("quizResult");
        setMessage('No quiz history')
        setResult(0);
    };
    const handleClickRestart = () => {
        navigate("/quiz");
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };


    console.log('color', color)
    return (
        <div className="container-res">
            <Card className='card'  bordered={false} >
                <p className='result-header'>You score {result} of {data.length}</p>
                <div className='buttons'>
            <Button className='reset-btn' onClick={handleClick}> <ReloadOutlined /> Reset Score</Button>
            <Button className='back-btn' onClick={handleClickRestart}><CaretRightOutlined />Back to quiz</Button>
                </div>
                <Button type="danger" onClick={showModal}>
                View History
                </Button>
                <Modal title='Quiz history' visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                    {history !== [] ? history?.map((question, index) => {
                        return <div>
                            <p style={{color: `${question.isCorrect}`}} className='title'>{question.title}</p>
                            {question.isCorrect === "green" && <div className='horizontal'>
                                <label>Correct answer : </label>
                                <p style={{color: `${question.isCorrect}`}}>{question.choices}
                                </p></div>
                            }
                            {question.isCorrect === "red" && (
                                <div>
                                    <div className='horizontal'>
                                        <label>Your choice : </label>
                                        <p>{question.choices.join(',')}</p>
                                    </div>
                                    <div className='horizontal'>
                                        <label>Correct Answer : </label>
                                        <p className='correct-answer'
                                           style={{color: 'green'}}>{question.answer.join(',')}</p>
                                    </div>
                                </div>)}
                        </div>
                    }) :
                        <p>{message}</p>
                    }
                </Modal>
            </Card>
        </div>
    );
};
export default Result;