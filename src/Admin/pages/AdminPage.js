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
            const index = previousQuestions.findIndex((question) => question.id === editableQuestion.id);
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

    const checkChoices = (choices) => {
        let foundError = false;
        choices.forEach((choice) => {
            if (choice.title === "" || choice.key === "")
                foundError = true;
        });
        return foundError;
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };

    const onSubmit = (question) => {
        if (!question.title) {
            setErrorCreate({
                ...errorCreate,
                title: "Please fill the title of the question!"
            });
            return;
        }
        if (question.answer === null) {
            setErrorCreate({
                ...errorCreate,
                answer: "Select an answer!"
            });
            return;
        }
        if (question.choices.length < 2) {
            setErrorCreate({
                ...errorCreate,
                choices: "Insert at least 2 options!"
            });
            return;
        }
        if (checkChoices(question.choices)) {
            setErrorCreate({
                ...errorCreate,
                choices: "Please fill the options!"
            });
            return;
        }

        return editableQuestion ? onEdit(question) : onCreate(question);
    };

    const onCancel = () => {
        if (editableQuestion) setEditableQuestion(null);
        else setCreate(null);
        closeModal();
    };

    const onDelete = (record) => {
        setQuestions(questions.filter((question) => question.id !== record.id));
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