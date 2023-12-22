import './ReviewBox.css'




export default function ReviewBox() {
    return (
        <>
            <div className='heading-section'>
                <p className='question-heading'>Question 1: [Attendance] - This team member showed up for the teams meetings, and stayed involved for the whole session.</p>
            </div>
            <div className='review-main-section'>
                <div className='review-details'>
                    <div className='review-heading'><p>More details</p></div>
                    <div><p>0 - Never</p>
                        <p>0 - Sometimes</p>
                        <p>0 - Most of the times</p>
                        <p>0 - Everytime</p>
                    </div>

                </div>
            </div>

        </>
    )
}