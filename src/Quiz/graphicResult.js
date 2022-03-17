import React, {useEffect, useState} from "react";
import {Chart as ChartJs, Tooltip, Title, ArcElement, Legend} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJs.register(
    Tooltip, Title, ArcElement, Legend
);

const GraphicResult = () => {
const [questions , setQuestions] = useState([])

    useEffect(() => {
      const res =   localStorage.getItem('quizResult');
       const result = JSON.parse(res)
        setQuestions(result);
    }, [])


    const  getTrueCount = () => {
        let count = 0;
        for (let i = 0; i < questions.length; i++) {
            if (questions[i].isCorrect === true) {
                count++;
            }
        }
        return count;
    }

    const  getTrueCount1 = () => {
        let count = 0;
        for (let i = 0; i < questions.length; i++) {
            if (questions[i].isCorrect === false) {
                count++;
            }
        }
        return count;
    }


    const data = {
        datasets: [{
            data: [getTrueCount(), getTrueCount1()],
            backgroundColor:[
                'red',
                'yellow'
            ]
        },
        ],
        labels: [
            'Correct',
            'Wrong'
        ],
    };

    return (
        <div className="App" style={{width:'30%', height:'30%'}}>
            <Doughnut data={data}/>
        </div>
    );
}

export default GraphicResult;