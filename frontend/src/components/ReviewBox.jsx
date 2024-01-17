import './ReviewBox.css'




export default function ReviewBox(props) {
    return (
        <>
            <div className='heading-section'>
                <p className='question-heading'>{props.question}</p>
            </div>
            <div className='review-main-section'>
                <div className='review-details'>
                    <div className='review-heading'><p>More details</p></div>
                    <div className='review-details-section'><p>0 - Never</p>
                        <p>1 - Sometimes</p>
                        <p>2 - Most of the times</p>
                        <p>3 - Everytime</p>
                    </div>

                </div>
            </div>

        </>
    )
}