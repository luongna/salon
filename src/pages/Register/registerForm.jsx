import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {  toast } from 'react-toastify';
import './registerForm.scss';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import axios from '~/utils/api/axios';

function RegisterForm() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [birthday, setBirthday] = useState('');
    const navigate = useNavigate();
    const handleInputChange = (e) => {
        const { id, value } = e.target;

        if (id === 'name') {
            setUsername(value);
        }
        if (id === 'phone') {
            setPhone(value);
        }
        if (id === 'email') {
            setEmail(value);
        }
        if (id === 'password') {
            setPassword(value);
        }
        if (id === 'confirmPassword') {
            setConfirmPassword(value);
        }
        if (id === 'birthday') {
            setBirthday(value);
        }
    };

    const validateForm = () => {
        // let formIsValid = true;
        if (!username) {
            // formIsValid = false;
            setErrors((errors) => ({ ...errors, username: 'vui lòng nhập Tên !' }));
        } else {
            setErrors((errors) => ({ ...errors, username: '' }));
        }

        if (!email) {
            // formIsValid = false;
            setErrors((errors) => ({ ...errors, email: 'Vui lòng nhập email!' }));
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                // formIsValid = false;
                setErrors((errors) => ({ ...errors, email: 'Vui lòng nhập email hợp lệ!' }));
            } else {
                setErrors((errors) => ({ ...errors, email: '' }));
            }
        }
        if (!phone) {
            // formIsValid = false;
            setErrors((errors) => ({ ...errors, phone: 'Vui lòng nhập số điện thoại!' }));
        } else {
            const regexPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
            if (!regexPhoneNumber.test(phone)) {
                // formIsValid = false;
                setErrors((errors) => ({ ...errors, phone: 'Vui lòng nhập số điện thoại hợp lệ!' }));
            } else {
                setErrors((errors) => ({ ...errors, phone: '' }));
            }
        }
        if (!password) {
        }
        if (!confirmPassword) {
            // formIsValid = false;
            setErrors((errors) => ({ ...errors, confirmPassword: 'vui lòng nhập lại mật khẩu !' }));
        } else {
            if (confirmPassword !== password) {
                setErrors((errors) => ({ ...errors, confirmPassword: 'Mật khẩu nhập lại không đúng !' }));
            } else {
                setErrors((errors) => ({ ...errors, confirmPassword: '' }));
            }
        }
       
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            axios
                .post('/register', {
                    name: username,
                    phone: phone,
                    email: email,
                    birthday: birthday,
                    password: password,
                })
                .then((res) => {
                    if (res.data === 'Email is already existed') {
                        setErrors((errors) => ({ ...errors, email: 'Email đã tồn tại!' }));
                    } else {
                        Swal.fire({
                            html: `<h4>Hãy nhập       mã xác nhận gồm 4 chữ số được gửi đến:</h4>
                <h4 style="color: #4caf50">${email}</h4>`,
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
                                    .post('/auth/verify-otp', {
                                        username: username,
                                        email,
                                        otp: code,
                                        password: password,
                                    })
                                    .then((res) => {
                                        console.log(res);
                                        if (res.data === 'OTP is not correct') {
                                            Swal.showValidationMessage('Mã OTP không đúng! Vui lòng thử lại!');
                                        } else {
                                            toast.success('Đăng kí thành công!');
                                            setTimeout(() => {
                                                navigate('/');
                                            }, 2000);
                                        }
                                    })
                                    .catch((err) => {
                                        console.log(err);
                                    });
                            },
                        });
                    }
                });
        }
    };
    return (
        <form className="form" id="form-1">
            <div className="form-header">
                <h3 className="form-heading">Đăng Kí</h3>
            </div>

            <div className="form-group">
                <label className="form-label">Họ và tên</label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="VD: Hoàng Hồng Phúc"
                    className="form-control1"
                    value={username}
                    onChange={(e) => handleInputChange(e)}
                />
                <i className="fa-solid fa-user form-user"></i>
                <span className="form-message"></span>
                {errors['username'] !== '' && <span className="error">{errors['username']}</span>}
            </div>

            <div className="form-group">
                <label className="form-label">Email</label>
                <input
                    id="email"
                    name="email"
                    type="text"
                    placeholder="VD: phuc@gmail.com"
                    className="form-control1"
                    value={email}
                    onChange={(e) => handleInputChange(e)}
                />
                <i className="fa-solid fa-user form-user"></i>
                <span className="form-message"></span>
                {errors['email'] !== '' && <span className="error">{errors['email']}</span>}
            </div>

            <div className="form-group">
                <label className="form-label">Số điện thoại</label>
                <input
                    id="phone"
                    name="phone"
                    type="text"
                    placeholder="Nhập mật khẩu"
                    className="form-control1"
                    value={phone}
                    onChange={(e) => handleInputChange(e)}
                />
                <i className="fa-solid fa-user form-user"></i>
                <span className="form-message"></span>
                {errors['phone'] !== '' && <span className="error">{errors['phone']}</span>}
            </div>
            <div className="form-group">
                <label className="form-label">Số điện thoại</label>
                <input
                    id="birthday"
                    name="birthday"
                    type="date"
                    placeholder="Nhập mật khẩu"
                    className="form-control1"
                    value={birthday}
                    onChange={(e) => handleInputChange(e)}
                />
                <i className="fa-solid fa-user form-user"></i>
                <span className="form-message"></span>
                {errors['birthday'] !== '' && <span className="error">{errors['birthday']}</span>}
            </div>

            <div className="form-group">
                <label className="form-label">Mật khẩu</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Nhập mật khẩu"
                    className="form-control1"
                    value={password}
                    onChange={(e) => handleInputChange(e)}
                />
                <i className="fa-solid fa-user-lock form-lock"></i>
                <span className="form-message"></span>
                <i className="fa-solid fa-eye-slash form-eye-slash"></i>
            </div>

            <div className="form-group">
                <label className="form-label">Nhập lại mật khẩu</label>
                <input
                    id="confirmPassword"
                    name="password_confirmation"
                    placeholder="Nhập lại mật khẩu"
                    type="password"
                    className="form-control1"
                    value={confirmPassword}
                    onChange={(e) => handleInputChange(e)}
                />
                <i className="fa-solid fa-user-lock form-lock"></i>
                <span className="form-message"></span>
                <i className="fa-solid fa-eye-slash form-eye-slash"></i>
            </div>

            <button className="form-submit" onClick={(e) => handleSubmit(e)} type="submit">
                Đăng ký
            </button>
        </form>
    );
}
export default RegisterForm;
