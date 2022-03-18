import React from 'react';
import "chart.js/auto";
import {Doughnut} from "react-chartjs-2";

const chartOptions = {
    plugins: {
        tooltip: {
            callbacks: {
                label: function (item) {
                    const {formattedValue, label} = item;
                    return `${label}: ${formattedValue}%`
                }
            }
        }
    }
}
const chartData = (getData) => {
    return {
        datasets: [
            {
                data: [getData(true), getData(false)],
                backgroundColor: ["green", "red"],
            },
        ],
        labels: ["Correct", "Wrong"]
    }
};

const ChartResults = ({quizHistory}) => {

    const answerCount = (flag) => {
        let count = 0;
        for (let i = 0; i < quizHistory.length; i++) {
            if (quizHistory[i].isCorrect === flag)
                count++;
        }
        return (count / quizHistory.length) * 100;
    }

    const data = chartData(answerCount);

    return (
        <Doughnut options={chartOptions} data={data}/>
    );
};

export default ChartResults;