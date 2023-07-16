import React from 'react';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import logo from '~/assets/images/logo2.png';
import { Link, useLocation } from 'react-router-dom';
import { logoutSuccess } from '~/utils/store/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import isAdmin from '~/utils/jwt';
const cx = classNames.bind(styles);
function Header() {
    const [status, setStatus] = useState(false);
    const [isFixed, setIsFixed] = useState(false);
    const location = useLocation();
    const currentURL = location.pathname;
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login?.currenUser);
    useEffect(() => {
        const handleScroll = () => {
            const headerPosition = window.scrollY;

            if (headerPosition > 0 && !isFixed) {
                setIsFixed(true);
            } else if (headerPosition === 0 && isFixed) {
                setIsFixed(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isFixed]);

    const handleLogout = () => {
        dispatch(logoutSuccess());
    };
    return (
        <header className={cx('wrapper', isFixed ? 'fixed-header' : '')}>
            <img src={logo} alt="logo" className={cx('logo')} />
            <div className={cx('inner')} style={status ? { right: '0px' } : {}}>
                <ul className={cx('ul-element')}>
                    <Link to={'/'}>
                        <li className={cx('element', currentURL === '/' && 'header-active')}>trang chủ</li>
                    </Link>
                    <Link to={'/service'}>
                        <li className={cx('element', currentURL === '/service' && 'header-active')}>dịch vụ</li>
                    </Link>
                    <li className={cx('element')}>Contact</li>
                    <li className={cx('element')}>hồ sơ</li>
                    <li className={cx('element')}>lịch sử</li>
                    {user && isAdmin(user.accessToken) && (
                        <Link to={`/dashboard`}>
                            <li className={cx('element')}>Admin</li>
                        </Link>
                    )}

                    {user && (
                        <li className={cx('element')} onClick={handleLogout}>
                            đăng xuất
                        </li>
                    )}
                </ul>
                {!user ? (
                    <Link to={'/login'}>
                        <div className={cx('actions')}>
                            <button className={cx('btn-normal')}>đăng nhập</button>
                        </div>
                    </Link>
                ) : (
                    <div className={cx('actions')}>Xin chào {user.email}</div>
                )}
            </div>
            <div className={cx('mobile')} onClick={() => setStatus(!status)}>
                <FontAwesomeIcon icon={status ? faTimes : faBars} size="2x"></FontAwesomeIcon>
            </div>
        </header>
    );
}

export default Header;
