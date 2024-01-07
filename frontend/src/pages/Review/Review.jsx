import './Review.css'
import ReviewBox from '../../components/ReviewBox'
import { useParams } from 'react-router-dom';

export default function Review() {
    const { assessment_id, team_id, user_id } = useParams();
    return (
        <ReviewBox />
    )
}