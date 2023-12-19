import './Login.css'



export default function Login() {
    return (
        <>
            <div className='main'>
                <div className='main_section'>
                    <p>Login to your account</p>
                    <form action="">
                        <input type="email" placeholder='Your Email' />
                        <input type="password" placeholder='Password' />
                        <div>
                            <a href="#">Forgot password?</a>
                            <button type="submit">Log in</button>
                        </div>
                    </form>


                </div>
            </div>

        </>
    )
}