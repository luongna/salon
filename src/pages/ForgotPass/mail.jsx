import axios from '~/utils/api/axios';
import { useState } from 'react'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { useEmailStore } from '~/utils/store/email'
import { Link } from 'react-router-dom';

const Mail =() =>{

    const [email, setEmail] = useEmailStore((state) => [state.email, state.setEmail])
    const [errors,setErrors] = useState({})
    const navigate = useNavigate();


    const validation=()=>{
        let formIsValid =true;
        // if(!email){
        //     formIsValid =false
        //     setErrors((errors) =>({...errors ,email:'vui lòng nhập Email !'}))
        // }
        // else setErrors((errors) =>({...errors ,email:''}))
        if(!email){
            formIsValid =false
            setErrors((errors) =>({...errors ,email:'vui lòng nhập Email !'}))
        } else{
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                formIsValid = false;
                setErrors((errors) => ({ ...errors, email: 'Vui lòng nhập email hợp lệ!' }));
        }
        else setErrors((errors) =>({...errors ,email:''}))
    }
    return formIsValid
}

const handleSubmit =(e) =>{
    e.preventDefault();
    if(validation()){
        axios
        .post('/users/mail2',
        {
            email:email,
        }
        ).then((res) => {
        if(res.data ==='email not exist')
        {
            document.getElementById('f').innerText = `Email không tồn tại`;
        }else{
            Swal.fire({
                html: `<h4>Hãy nhập mã xác nhận gồm 4 chữ số được gửi đến:</h4>
                        <h4 style="color: #4caf50 ; text-align:center">${email}</h4>`,
                input: 'number',
                showCancelButton: true,
                confirmButtonText: 'Xác nhận',
                cancelButtonText: 'Đóng',
                showLoaderOnConfirm: true,
                confirmButtonColor: '#4caf50',
                cancelButtonColor: ' #D3D3D3',
                allowOutsideClick: false,
                preConfirm: (code) => {
                    return axios
                        .post('/users/checkotp', {
                            otp: code,
                            email: email,
                            
                        })
                        .then((res) => {
                            console.log(res);
                            if (res.data === 'OTP is not correct') {
                                Swal.showValidationMessage('Mã OTP không đúng! Vui lòng thử lại!');
                            } else {
                                    navigate('/reset');
                               ;
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                },
            });
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
                            Email
                        </label>
    
                        <input
                            type="text"
                            id="form3Example3"
                            className="form-control form-control-lg"
                            placeholder="Enter a valid email address"
                            aria-describedby="phoneHelp"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                        {errors['email'] !== '' && <span className="error">{errors['email']}</span>}
                    </div>
    
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="form-check mb-0">
                            
    
                        </div>
                     
                    </div>
    
                    <div className="text-center text-lg-start mt-4 pt-2">
                        <button type="submit" className="btn btn-primary btn-lg">
                            Sent OTP
                        </button>
                        <p className="small fw-bold mt-2 pt-1 mb-0">
                            You have an account?{' '}
                            <a href="#!" className="link-danger">
                                <Link to={'/login'}>Register</Link>
                            </a>
                        </p>
                    </div>
                </form>
            </div>
        );
}
export default Mail