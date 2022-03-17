import  '../styles/QuestionsTable.css'
import {Button} from "antd";

const QuestionsTable = ({questions, onDelete, onEdit, onCreate}) => {
    return (
        <div className='table-container'>
            <table>
                <thead className='header'>
                <tr>
                    <th className="row-1">Question</th>
                    <th className="row-2">Options</th>
                    <th className="row-3">Answer</th>
                    <th className="row-4">Actions</th>
                </tr>
                </thead>
                <tbody>
                {questions.map((question) => (
                    <tr key={question.id}>
                        <td>{question.title}</td>
                        <td>
                            <div>
                                {question.choices.map((choice) => (<div>{choice.key}. {choice.title}</div>))}
                            </div>
                        </td>
                        <td>{question.answer}</td>
                        <td className='actions'>
                            <Button shape="round"
                                    onClick={() => onEdit(question)}>
                                Edit
                            </Button>
                            <Button danger shape="round" onClick={() => onDelete(question)}>
                                Delete
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Button onClick={onCreate}>Create</Button>
        </div>
    );
};

export default QuestionsTable;