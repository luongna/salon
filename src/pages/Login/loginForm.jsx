import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from '~/utils/api/axios';
// import { render } from '@testing-library/react';
import Swal from 'sweetalert2/dist/sweetalert2.js';
// import { useTokenStore } from '~/utils/store/token';
// import { useUserStore } from '~/utils/store/user';
import './login.component.scss';
import { Link } from 'react-router-dom';
import { loginStart, loginFailed, loginSuccess } from '~/utils/store/authSlice';
import { useDispatch } from 'react-redux';
const LoginForm = (onClose) => {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    // const [setUserInfo] = useUserStore((state) => [state.setUserInfo]);
    // const [setToken] = useTokenStore((state) => [state.setToken]);
    const navigate = useNavigate();
    const dispath = useDispatch();
    const validateForm = () => {
        let formIsValid = true;

        if (!phone) {
            formIsValid = false;
            setErrors((errors) => ({ ...errors, phone: 'Vui lòng nhập số điện thoại!' }));
        } else {
            const regexPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
            if (!regexPhoneNumber.test(phone)) {
                formIsValid = false;
                setErrors((errors) => ({ ...errors, phone: 'Vui lòng nhập số điện thoại hợp lệ!' }));
            } else {
                setErrors((errors) => ({ ...errors, phone: '' }));
            }
        }

        if (!password) {
            formIsValid = false;
            setErrors((errors) => ({ ...errors, password: 'Vui lòng nhập password!' }));
        } else {
            setErrors((errors) => ({ ...errors, password: '' }));
        }

        return formIsValid;
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            dispath(loginStart());
            axios
                .post(
                    '/auth/login',
                    {
                        phone: phone,
                        password: password,
                    },
                    {
                        headers: {
                            'Content-type': 'application/json',
                            'Access-Control-Allow-Origin': '*',
                        },
                    },
                )
                .then((response) => {
                    if (response.status === 200 || response.data.userId !== null) {
                        Swal.fire({
                            html: `<h4>Đăng nhập thành công!</h4>`,
                            icon: 'success',
                            showConfirmButton: false,
                            timer: 1100,
                        });

                        dispath(loginSuccess(response.data));
                        navigate(-1);
                        // const { user, accessToken } = response.data;
                        // if (user.id === 1) {
                        // setUserInfo(response.data);
                        // setToken(response.data.accessToken);
                        //     navigate('/');
                        // } else {
                        //     setUserInfo(user);
                        //     setToken(accessToken);
                        //     navigate('/');
                        // }
                    }
                })
                .catch((err) => {
                    document.getElementById('f').innerText = `Số điện thoại hoặc mật khẩu không đúng!`;
                    console.log('error', err);
                    dispath(loginFailed());
                });
        }
    };
    return (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                    <p className="lead fw-normal mb-0 me-3">Sign in with</p>
                    <button type="button" className="btn btn-primary btn-floating mx-1">
                        <i className="fab fa-facebook-f"></i>
                    </button>

                    <button type="button" className="btn btn-primary btn-floating mx-1">
                        <i className="fab fa-twitter"></i>
                    </button>

                    <button type="button" className="btn btn-primary btn-floating mx-1">
                        <i className="fab fa-linkedin-in"></i>
                    </button>
                </div>

                <div className="divider d-flex align-items-center my-4">
                    <p className="text-center fw-bold mx-3 mb-0">Or</p>
                </div>
                <p id="f"></p>
                <div className="form-outline mb-4">
                    <label className="label" for="form3Example3">
                        Phone Number
                    </label>

                    <input
                        type="text"
                        id="form3Example3"
                        className="form-control form-control-lg"
                        placeholder="Enter a valid email address"
                        aria-describedby="phoneHelp"
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}
                    />
                    {errors['phone'] !== '' && <span className="error">{errors['phone']}</span>}
                </div>

                <div className="form-outline mb-3">
                    <label className="label" for="form3Example4">
                        Password
                    </label>
                    <input
                        type="password"
                        id="form3Example4"
                        className="form-control form-control-lg"
                        placeholder="Enter password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />

                    {errors['password'] !== '' && <span className="error">{errors['password']}</span>}
                </div>

                <div className="d-flex justify-content-between align-items-center">
                    <div className="form-check mb-0">
                        <input className="form-check-input me-2" type="checkbox" id="form2Example3" />

                        <label className="form-check-label" for="form2Example3">
                            Remember me
                        </label>
                    </div>
                    <a href="#!" className="text-body" >
                        <Link to={'/mail'}>Forgot password?</Link>
                    </a>
                </div>

                <div className="text-center text-lg-start mt-4 pt-2">
                    <button type="submit" className="btn btn-primary btn-lg">
                        Login
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
};
export default LoginForm;
