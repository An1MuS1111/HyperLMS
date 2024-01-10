import './Review.css'
import ReviewBox from '../../components/ReviewBox'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react';


export default function Review() {

    const { assessment_id, team_id, user_id } = useParams();
    const [isLoading, setIsLoading] = useState(true)
    const [assessment, setAssessment] = useState({})
    const [team, setTeam] = useState()
    const [user, setUser] = useState()

    useEffect(() => {

        console.log("assessment_id: " + assessment_id)
        console.log("team_id: " + team_id)
        console.log("user_id: " + user_id)
        fetchAssessment()
        fetchTeam()
        fetchUser()
        console.log("This is......" + assessment)

    }, [])

    // fetching starts here
    const fetchAssessment = () => {
        axios.get('http://localhost:4444/assessments/' + assessment_id)
            .then(({ data }) => console.log(data))


    }

    const fetchTeam = () => {
        axios.get('http://localhost:4444/teams/' + team_id)
            .then(response => console.log(response.data))
    }

    const fetchUser = () => {
        axios.get('http://localhost:4444/users/' + user_id)
            .then(response => console.log(response.data))
    }

    return (
        <ReviewBox />
    )
}

