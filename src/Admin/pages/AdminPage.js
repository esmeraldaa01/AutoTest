import data from "../../assests/data";
import QuestionsTable from "./QuestionsTable";
import React, {useEffect, useState} from "react";
import QuestionForm from "./QuestionForm";
import {useNavigate} from "react-router-dom";

const cloneArray = (list) => {
    return list.map((object) => ({...object}));
};

const AdminPage = ({authorised}) => {
    const [create, setCreate] = useState(false);

    const [questions, setQuestions] = useState(() => {

        const cacheQuestions = localStorage.getItem("questions");

        if (!cacheQuestions)
            return cloneArray(data);

        return JSON.parse(cacheQuestions);
    });
    const [editableQuestion, setEditableQuestion] = useState(null);
    const [errorCreate, setErrorCreate] = useState({title: null, answer: [], choices: []}); //
    const [isModalVisible, setIsModalVisible] = useState(false);

    let navigate = useNavigate();

    useEffect(() => {
        if (authorised.admin === false) {
            navigate(`/`)
        }
    })

    const onEdit = (question) => {
        setQuestions((previousQuestions) => {
            const newQuestions = cloneArray(previousQuestions);
            const index = previousQuestions.findIndex(
                (question) => question.id === editableQuestion.id
            );
            newQuestions[index] = question;
            return newQuestions;
        });
        setEditableQuestion(null);
    };

    const onCreate = (question) => {
        const newQuestion = {id: Math.random(), ...question};
        setQuestions((previousQuestions) => {
            return [...previousQuestions, newQuestion];
        });
        setCreate(false);
    };

    const invalidChoiceLength = (choices) => {
        return (choices.length < 2) ? "Insert at least 2 options!" : null;
    }

    const validChoices = (choices) => {

        let errorMessage = null;

        choices.forEach((choice) => {
            if (choice.title === "" || choice.key === "")
                errorMessage = "Please fill the options!";
        });

        return errorMessage;
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };

    const onSubmit = (question) => {

        if (!question.title) {
            setErrorCreate({
                ...errorCreate,
                title: "Please fill the name! "
            });
            return;
        }

        if (!question.answer) {
            setErrorCreate({
                answer: "Please fill the answer! "
            });
            return;
        }

        if (question.choices.length < 2) {
            setErrorCreate({
                choices: "Insert at least 2 options!"
            });
            return;
        }

        if (!validChoices(question.choices)) {
            setErrorCreate({
                choices: "Please fill the options! "
            });
            return;
        }


        // if (!question.title && !question.answer) {
        //     setErrorCreate({
        //         title: "Please fill the title of the question!",
        //         answer: "Please select an answer for the question!",
        //         choices: "Insert at least 2 choices!  Please Fill options!"
        //     });
        //     return;
        //
        // } else
        //     setErrorCreate({title: null, answer: [], choices: null}); //
        setErrorCreate({...errorCreate, title: null});
        setErrorCreate({title: null, answer: [], choices: []}); //
        setErrorCreate({title: null, answer: [], choices: []}) //
        setErrorCreate({title: null, answer: [], choices: []}) //

        return editableQuestion ? onEdit(question) : onCreate(question);
    };

    const onCancel = () => {
        if (editableQuestion) setEditableQuestion(null);
        else setCreate(null);
        closeModal();
    };

    const onDelete = (record) => {
        setQuestions(questions.filter((question) => question.id !== record.id));
        console.log("a record", record.id)
    };


    const onQuestionCreate = () => {
        if (editableQuestion) setEditableQuestion(null);
        setCreate(true);
        setIsModalVisible(true);
    };

    const onQuestionEdit = (record) => {
        if (create) setCreate(false);
        setEditableQuestion(record);
        if (editableQuestion) setEditableQuestion(null);
        setIsModalVisible(true);
    };

    useEffect(() => {
        localStorage.setItem('questions', JSON.stringify(questions))
    }, [questions]);

    return (
        <div>

            <div>
                {editableQuestion && !create && (
                    <QuestionForm
                        isModalVisible={isModalVisible}
                        onSubmit={onSubmit}
                        onCancel={onCancel}
                        closeModal={closeModal}
                        create={create}
                        currentQuestion={editableQuestion}
                    />
                )}
                {!editableQuestion && create && (
                    <QuestionForm
                        isModalVisible={isModalVisible}
                        onSubmit={onSubmit}
                        closeModal={closeModal}
                        onCancel={onCancel}
                        errorCreate={errorCreate}
                    />
                )}
            </div>

            <div>
                <QuestionsTable
                    questions={questions}
                    onDelete={onDelete}
                    onEdit={onQuestionEdit}
                    onCreate={onQuestionCreate}
                />
            </div>
        </div>
    );
};

export default AdminPage;