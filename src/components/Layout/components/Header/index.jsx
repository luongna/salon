import React from 'react';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import logo from '~/assets/images/logo2.png';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);
function Header() {
    const [status, setStatus] = useState(false);
    const [isFixed, setIsFixed] = useState(false);

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
    return (
        <header className={cx('wrapper', isFixed ? 'fixed-header' : '')}>
            <img src={logo} alt="logo" className={cx('logo')} />
            <div className={cx('inner')} style={status ? { right: '0px' } : {}}>
                <ul className={cx('ul-element')}>
                    <li className={cx('element', 'header-active')}>
                        <a href="/">trang chủ </a>
                    </li>
                    <li className={cx('element')}>
                        <a href="/about">dịch vụ</a>
                    </li>
                    <li className={cx('element')}>
                        <a href="/contact">Contact</a>
                    </li>
                    <li className={cx('element')}>
                        <a href="/contact">hồ sơ</a>
                    </li>
                    <li className={cx('element')}>
                        <a href="/contact">lịch sử</a>
                    </li>
                    <li className={cx('element')}>
                        <a href="/contact">đăng xuất</a>
                    </li>
                </ul>
                <Link to={'/login'}>
                    <div className={cx('actions')}>
                        <button className={cx('btn-normal')}>log in</button>
                    </div>
                </Link>
            </div>
            <div className={cx('mobile')} onClick={() => setStatus(!status)}>
                <FontAwesomeIcon icon={status ? faTimes : faBars} size="2x"></FontAwesomeIcon>
            </div>
        </header>
    );
}

export default Header;
