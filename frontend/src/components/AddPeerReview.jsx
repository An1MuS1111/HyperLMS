
import { useState, useEffect } from 'react';
import axios from 'axios';
import './AddPeerReview.css'


const AddPeerReview = () => {
    const [formData, setFormData] = useState({
        reviewName: '',
        reviewDetails: '',
        numQuestions: 0,
        questions: [],
        teams: [],
    });

    const [teamsList, setTeamsList] = useState([]);
    const [addedTeams, setAddedTeams] = useState([]);

    useEffect(() => {


        axios.get('http://localhost:4444/teams')
            .then(response => setTeamsList(response.data))
            .catch(error => console.error('Error fetching teams:', error));
    }, []);

    const handleTeamAdd = (teamId) => {
        if (!formData.teams.includes(teamId) && !addedTeams.includes(teamId)) {
            setFormData(prevData => ({
                ...prevData,
                teams: [...prevData.teams, teamId],
            }));
        }
    };

    const handleTeamRemove = (teamId) => {
        setFormData(prevData => ({
            ...prevData,
            teams: prevData.teams.filter(id => id !== teamId),
        }));
        setAddedTeams(prevTeams => prevTeams.filter(id => id !== teamId));
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleQuestionChange = (index, value) => {
        const updatedQuestions = [...formData.questions];
        updatedQuestions[index] = {
            ...updatedQuestions[index],
            question: value,
        };

        setFormData({
            ...formData,
            questions: updatedQuestions,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const apiRequestData = {
            reviewName: formData.reviewName,
            reviewDetails: formData.reviewDetails,
            questions: formData.questions,
            teams: formData.teams,
        };
        console.log(apiRequestData)
        axios.post('http://localhost:4444/peerReviews/add', apiRequestData)
            .then(response => {
                console.log('API Response:', response.data);
                // Reset form after successful submission
                setFormData({
                    reviewName: '',
                    reviewDetails: '',
                    numQuestions: 0,
                    questions: [],
                    teams: [],
                });
            })
            .catch(error => {
                console.error('API Error:', error);
            });
    };

    const renderQuestionsInputs = () => {
        const questionInputs = [];
        for (let i = 0; i < formData.numQuestions; i++) {
            questionInputs.push(
                <div key={i}>
                    <label>{`Question ${i + 1}:`}</label>
                    <input
                        type="text"
                        value={formData.questions[i]?.question || ''}
                        onChange={(e) => handleQuestionChange(i, e.target.value)}
                    />
                </div>
            );
        }
        return questionInputs;
    };

    const renderTeamsInputs = () => {
        const teamInputs = formData.teams.map((teamId, index) => (
            <div key={index}>
                <label>{`Team ${index + 1}:`}</label>
                <input
                    type="text"
                    value={teamsList.find(team => team._id === teamId)?.teamName || ''}
                    readOnly
                />

                <button type="button" onClick={() => handleTeamRemove(teamId)}>
                    Remove
                </button>
            </div>
        ));
        return teamInputs;
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Peer Review Name:</label>
                <input
                    type="text"
                    name="reviewName"
                    value={formData.reviewName}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Peer Review Details:</label>
                <input
                    type="text"
                    name="reviewDetails"
                    value={formData.reviewDetails}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Number of Questions:</label>
                <input
                    type="number"
                    name="numQuestions"
                    value={formData.numQuestions}
                    onChange={handleChange}
                />
            </div>
            {renderQuestionsInputs()}

            <h3>Select Teams:</h3>
            <table>
                <tbody>
                    {teamsList.map(team => (
                        <tr key={team._id}>
                            <td>{team.teamName}</td>
                            <td>
                                <button type="button" onClick={() => handleTeamAdd(team._id)}>
                                    Add
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div>
                <h3>Selected Teams:</h3>
                {renderTeamsInputs()}
            </div>

            <button type="submit">Submit</button>
        </form>
    );
};

export default AddPeerReview;
