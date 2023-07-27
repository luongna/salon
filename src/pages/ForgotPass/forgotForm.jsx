import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from '~/utils/api/axios';
import { Link } from 'react-router-dom';
import { faL } from '@fortawesome/free-solid-svg-icons'
import { useEmailStore } from '~/utils/store/email';
import Swal from 'sweetalert2'
import { Password } from '@mui/icons-material';


const ForgotForm =() =>{
    const [email] = useEmailStore((state) => [state.email])
    const [resetpass , setResetpass] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    const [errors, setErrors] = useState({})
    const negative = useNavigate();

const validation =() =>{
    let formIsValid = true
    if(!resetpass){
        formIsValid = false
        setErrors((errors) => ({...errors , resetpass :'vui lòng nhập mật khẩu mới'}))
    }
    if(!confirmPass){
        formIsValid= false
        setErrors((errors) => ({...errors , confirmPass :'vui lòng nhập lại mật khẩu mới'}))
    }
    if(resetpass.length <8){
        formIsValid=false
        setErrors((errors) => ({...errors , resetpass :'Nhập mật khẩu ít nhất 8 kí tự'}))
    }
    if(resetpass!== confirmPass){
        formIsValid=false;
        setErrors((errors) => ({...errors , confirmPass :'Mật khẩu nhập lại không khớp'}))
    }
    return formIsValid
}
const handleSubmit =(e) =>{
    e.preventDefault();
if(validation()){
    axios
    .post('/users/resetpass',
    {
        email:email,
        otp:resetpass,
    } 
    ).then((res) =>{
        console.log('ssssss')
        console.log(res.data)
        if(res.data==='suscess'){
        negative('/login')
        }
    })
}
}
    return(
    <div className="form">
            <form onSubmit={handleSubmit}>
                <div className="divider d-flex align-items-center my-4">
                    <p className="text-center fw-bold mx-3 mb-0">Reset Password</p>
                </div>
                <p id="f"></p>
                <div className="form-outline mb-4">
                    <label className="label" for="form3Example3">
                        New Pass
                    </label>

                    <input
                        type="text"
                        id="form3Example3"
                        className="form-control form-control-lg"
                        placeholder="Enter a valid email address"
                        aria-describedby="phoneHelp"
                        value={resetpass}
                        onChange={(event) => setResetpass(event.target.value)}
                    />
                    {errors['resetpass'] !== '' && <span className="error">{errors['resetpass']}</span>}
                </div>

                <div className="form-outline mb-3">
                    <label className="label" for="form3Example4">
                        Re-Password
                    </label>
                    <input
                        type="password"
                        id="form3Example4"
                        className="form-control form-control-lg"
                        placeholder="Enter password"
                        value={confirmPass}
                        onChange={(event) => setConfirmPass(event.target.value)}
                    />

                    {errors['confirmPass'] !== '' && <span className="error">{errors['confirmPass']}</span>}
                </div>

                

                <div className="text-center text-lg-start mt-4 pt-2">
                    <button type="submit" className="btn btn-primary btn-lg">
                        Reset Password
                    </button>
                    <p className="small fw-bold mt-2 pt-1 mb-0">
                        Don't have an account?{' '}
                        <a href="#!" className="link-danger">
                            <Link to={'/register'}>Register</Link>
                        </a>
                    </p>
                </div>
            </form>
        </div>
    );

}
export default ForgotForm ;