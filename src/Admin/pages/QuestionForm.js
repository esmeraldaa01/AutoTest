import React, { useState } from "react";
import { Input, Button, Space, Select } from "antd";
import { FormOutlined } from "@ant-design/icons";
import Choices from "./Choices";
import "../styles/QuestionForm.css";

const QuestionForm = ({
                          errorCreate,
                          onSubmit,
                          onCancel,
                          currentQuestion,
                      }) => {

    const [question, setQuestion] = useState(() => {
        const initialState = { title: "", answer: [], choices: []}; //

        if (currentQuestion) {
            initialState.title = currentQuestion.title;
            initialState.answer = currentQuestion.answer;
            initialState.choices = currentQuestion.choices;
            initialState.id = currentQuestion.id;
        }

        return initialState;
    });

    const [errorEditing, setErrorEditing] = useState({
        title: null,
        answer: [],//
        choices : []
    });


    const onAnswerChange = (key) => {
        setQuestion({
            ...question,
            answer: key,
        });
    };

    React.useEffect(() => {
        const answerChoice = question.choices.find(
            (choice) => choice.key === question.answer
        );

        if (!answerChoice) {
            onAnswerChange(null);
        }
    }, [question.choices]);


    const onChoiceDelete = (choice) => {
        setQuestion((question) => {
            const filterChoices = question.choices.filter(
                (chosenChoice) => chosenChoice.key !== choice.key
            );
            return {
                ...question,
                choices: filterChoices,
            };
        });
    };

    const handleChange = (event) => {
        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newForm = { ...question };
        newForm[fieldName] = fieldValue;
        setQuestion(newForm);
    };

    const createChoice = () => {
        setQuestion((previousQuestion) => {
            const previousChoices = previousQuestion.choices;

            return {
                ...previousQuestion,
                choices: [
                    ...previousChoices,
                    {
                        key: "",
                        title: "",
                    },
                ],
            };
        });
    };

    const onChoiceChange = (attr, value, index) => {
        setQuestion((previousQuestion) => {
            const newChoices = [...previousQuestion.choices];

            const currentChoice = newChoices[index];

            currentChoice[attr] = value;

            return {
                ...previousQuestion,
                choices: newChoices,
            };
        });
    };

    const checkChoices = (choices) => {
        let foundError = false;
        choices.forEach((choice) => {
            if (choice.title === "" || choice.key === "") {
                foundError = true;
            }
        });
        return foundError;
    };


    const handleSave = () => {
        onSubmit(question);
        if(!question.title && !question.answer && question.choices.length <= 2){
            setErrorEditing({
                title: "Question Title is required!",
                answer: "Question Answer is required!",
                choices: "Insert at least two choices and choose an answer."})
            return;
        } else if(!question.title && !question.answer && (checkChoices(question.choices))){
            setErrorEditing({
                title: "Question Title is required!",
                answer: "Question Answer is required!",
                choices : "Fill options !"
            })
            return;
        }else if(!question.title && !question.answer && (checkChoices(question.choices))){
            setErrorEditing({
                title: "Question Title is required!",
                answer: "Question Answer is required!",
                choices : "Fill options !"
            })
            return;
        } else if(!question.answer && checkChoices(question.choices)){
            setErrorEditing({
                choices: "Please fill the options !",
                answer: "Question Answer is required!"})
            return;
        } else if(question.title && !question.answer){
            setErrorEditing({
                title: "Answer Title is required! Please choose an answer."
            })
            return;
        }else if((!question || !question.answer) && question.choices.length < 2) {
            setErrorEditing({
                choices: "Insert at least two choices and choose an answer."
            });
            return;
        }else if(!question.answer && question.choices.length >= 2 && (!checkChoices(question.choices)))  {
            setErrorEditing({
                title: "Question Answer is required! Choose an answer."
            })
            return;
        }else if (checkChoices(question.choices)) {
            setErrorEditing({
                choices: "Choice Title and Choice Key are required. Please fill the options!"
            });
            return;
        }else if (!question.title && question.answer && question.choices.length !== 0) {
            setErrorEditing({
                title: "Question Title is required! Please write a question title."
            });
            return;
        }
        else setErrorEditing({title: null, answer: [] , choices : []}); //

        setQuestion({ title: "", answer: [], choices: [], id: 0 }); //
    };


    const { Option } = Select;

    return (
        <div className="form-container">
            <form>
                <Space direction="vertical">
                    <label>Question Title </label>
                    <Input
                        type="text"
                        size="large"
                        name="title"
                        value={question.title}
                        onChange={handleChange}
                        placeholder=" Enter the question..."
                        addonBefore={<FormOutlined />}
                    />
                    <label>Correct Answer</label>

                    <Select
                        style={{width : '100%'}}
                        mode={"multiple"}
                        showSearch
                        placeholder="Select the correct answer"
                        value={question.answer}
                        onChange={onAnswerChange}
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {question.choices.map((choice, index) => {
                            return (
                                <Option key={index} value={choice.key}>
                                    {choice.title}
                                </Option>
                            );
                        })}
                    </Select>
                    <Choices
                        list={question.choices}
                        createChoice={createChoice}
                        handleDelete={onChoiceDelete}
                        onChoiceChange={onChoiceChange}
                    />
                </Space>
            </form>
            <div>
                <p style={{ color: "red",fontSize: '16px ',  display:'flex', flexDirection:'column'}}>
                    <p>{errorCreate?.title}</p>
                    <p>{errorCreate?.answer}</p>
                    <p>{errorCreate?.choices}</p>
                    <p>{currentQuestion && errorEditing?.answer}</p>
                    <p>{currentQuestion && errorEditing?.title}</p>
                    <p>{currentQuestion && errorEditing?.choices}</p>
                </p>
                <Button style={{marginRight : '7px'}} shape="round" onClick={handleSave}>
                    Save
                </Button>
                <Button danger shape="round" onClick={onCancel}>
                    Cancel
                </Button>
            </div>
        </div>
    );
};

export default QuestionForm;