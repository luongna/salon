import React from 'react';
import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { AiOutlineCheck } from 'react-icons/ai';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { logoutSuccess, removeToCart, addToNotification, removeToNotification } from '~/utils/store/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import isAdmin, { isReceptionist } from '~/utils/jwt';
import { Avatar, Badge, Button, IconButton } from '@mui/material';
import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import { FiSearch } from 'react-icons/fi';
import { IoCartSharp } from 'react-icons/io5';
import { HiMenuAlt3 } from 'react-icons/hi';
import { AiFillBell } from 'react-icons/ai';
import { BASE_URL } from '~/utils/api/axios';
import axios from '~/utils/api/axios';
import { ToastContainer, toast } from 'react-toastify';
const cx = classNames.bind(styles);
function Header() {
    const [status, setStatus] = useState(false);
    const [isFixed, setIsFixed] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [notification, setNotification] = useState([]);
    const location = useLocation();
    const currentURL = location.pathname;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector((state) => state.auth.cart);
    const notificationCount = useSelector((state) => state.auth.notification);
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

    useEffect(() => {
        const socket = new SockJS(BASE_URL + '/ws');
        const client = Stomp.over(socket);
        if (user) {
            client.connect({}, () => {
                client.subscribe(`/topic/booking/${user.id}`, (dataGot) => {
                    setNotification((oldComment) => [JSON.parse(dataGot.body), ...oldComment]);
                    dispatch(addToNotification(1));
                    toast('🔔Bạn có một thông báo mới!', {
                        position: 'top-right',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'light',
                    });
                });
            });
        }
        let cleanup = false;

        return () => {
            cleanup = true;
            if (!cleanup) {
                client.disconnect();
            }
        };
    }, [user, dispatch]);

    useEffect(() => {
        if (user) {
            axios
                .get(`/notification/${user.id}`)
                .then((res) => {
                    const notification = res.data;
                    setNotification(notification);
                })
                .catch((error) => console.log(error));
        }
    }, [user]);

    const handleToggleSearch = () => {
        setIsSearchVisible(!isSearchVisible);
    };

    const handleLogout = () => {
        dispatch(logoutSuccess());
        dispatch(removeToCart());
        dispatch(removeToNotification());
    };

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchValue.trim() !== '') {
            // Encode the searchValue to handle special characters in the URL
            const encodedSearchValue = encodeURIComponent(searchValue);
            // Navigate to the /service page with the search query as a URL parameter
            navigate(`/service?search=${encodedSearchValue}`);
        } else {
            // Handle the case when the search input is empty
            console.log('Please enter a search term.');
        }
    };

    const maskRead = () => {
        axios
            .get(`/notification/read/${user.id}`)
            .then((res) => {
                if (res.data === 'done') {
                    setNotification((prevNotifications) =>
                        prevNotifications.map((notification) =>
                            notification.status === 0 ? { ...notification, status: 1 } : notification,
                        ),
                    );

                    dispatch(removeToNotification());
                }
            })
            .catch((error) => console.log(error));
    };
    return (
        <header className={cx('wrapper', isFixed ? 'fixed-header' : '')}>
            <div className={cx('inner')} style={status ? { right: '0px' } : {}}>
                <div className={cx('text-logo-box', 'pc')}>
                    <h2 className={cx('text-logo')}>SALON SPACE</h2>
                </div>
                <ul className={cx('ul-element')}>
                    <li>
                        <Link to={'/'} className={cx('element', currentURL === '/' && 'header-active')}>
                            trang chủ
                        </Link>
                    </li>
                    <li>
                        <Link to={'/service'} className={cx('element', currentURL === '/service' && 'header-active')}>
                            dịch vụ
                        </Link>
                    </li>

                    <li>
                        <Link
                            to={'/serviceExample'}
                            className={cx('element', currentURL === '/serviceExample' && 'header-active')}
                        >
                            Mẫu dịch vụ
                        </Link>
                    </li>

                    <li>
                        <Link to={'/staff'} className={cx('element', currentURL === '/staff' && 'header-active')}>
                            Chuyên gia
                        </Link>
                    </li>

                    <li>
                        <Link to={'/contact'} className={cx('element', currentURL === '/contact' && 'header-active')}>
                            liên hệ
                        </Link>
                    </li>

                    {user && isAdmin(user.accessToken) && (
                        <li>
                            <Link className={cx('element')} to={`/dashboard`}>
                                Admin
                            </Link>
                        </li>
                    )}
                    {user && isReceptionist(user.accessToken) && (
                        <Tippy
                            //  content="Tài khoản "
                            hideOnClick={true}
                            trigger="click"
                            placement="bottom"
                            interactive
                            render={(attrs) => (
                                <div className={cx('box_tippy')} tabIndex="-1" {...attrs} style={{ height: '80px' }}>
                                    <ul>
                                        <li>
                                            <Link to={'/bookOff'}>Đặt lịch</Link>
                                        </li>
                                        <li>
                                            <Link to={'/accept'}>Xác nhận</Link>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        >
                            <li
                                className={cx(
                                    'element',
                                    (currentURL === '/bookOff' || currentURL === '/accept') && 'header-active',
                                )}
                            >
                                Lễ tân
                            </li>
                        </Tippy>
                    )}
                </ul>
                {!user ? (
                    <>
                        <hr className={cx('line')} />
                        <div className={cx('actions')}>
                            <Link className={cx('non-user-button')} to={'/login'}>
                                <Button className={cx('btn-normal')}>Đăng nhập</Button>
                            </Link>
                            {/* Add the registration link */}
                            <Link className={cx('non-user-button')} to={'/register'}>
                                <Button className={cx('btn-normal', 'sign-in')}>Đăng ký</Button>
                            </Link>
                        </div>
                    </>
                ) : (
                    <>
                        <div className={cx('actions', 'actions-mobile')}>
                            <div className={cx('search')}>
                                {/* Render the search input and button */}
                                <form onSubmit={handleSearchSubmit}>
                                    {isSearchVisible && (
                                        <input
                                            type="text"
                                            placeholder="Tìm kiếm dịch vụ"
                                            value={searchValue}
                                            onChange={handleSearchChange}
                                            className={cx(
                                                'search-input',
                                                isSearchVisible ? 'search-input-visible' : '',
                                            )}
                                        />
                                    )}
                                    <IconButton
                                        type="submit"
                                        className={cx('search-btn', 'action-button')}
                                        onClick={handleToggleSearch}
                                    >
                                        <FiSearch size={24} />
                                    </IconButton>
                                </form>
                            </div>
                            <Link to={'/cart'}>
                                <IconButton className={cx('action-button')}>
                                    <Badge
                                        badgeContent={cart}
                                        color="error"
                                        sx={{ '& .MuiBadge-badge': { fontSize: 15, height: 15, minWidth: 15 } }}
                                    >
                                        <IoCartSharp size={28} />
                                    </Badge>
                                </IconButton>
                            </Link>

                            <Tippy
                                //  content="Tài khoản "
                                hideOnClick={true}
                                trigger="click"
                                placement="bottom"
                                interactive
                                render={(attrs) => (
                                    <div className={cx('box_notification')} tabIndex="-1" {...attrs}>
                                        <h2>Thông báo</h2>
                                        <ul>
                                            {notification.map((value) => (
                                                <li
                                                    key={value.id}
                                                    className={cx(value.status === 0 ? 'background-EBEDF0' : '')}
                                                >
                                                    <span>{value.text}</span>
                                                    <span>{value.date}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <div className={cx('box_notification_bottom')} onClick={maskRead}>
                                            <span className={cx('check-icon')}>
                                                <AiOutlineCheck />
                                            </span>
                                            Đánh dấu tất cả đã đọc
                                        </div>
                                    </div>
                                )}
                            >
                                <IconButton className={cx('action-button')}>
                                    <Badge
                                        badgeContent={notificationCount}
                                        color="error"
                                        sx={{ '& .MuiBadge-badge': { fontSize: 15, height: 15, minWidth: 15 } }}
                                    >
                                        <AiFillBell size={28} />
                                    </Badge>
                                </IconButton>
                            </Tippy>
                            <Tippy
                                //  content="Tài khoản "
                                hideOnClick={true}
                                trigger="click"
                                placement="bottom"
                                interactive
                                render={(attrs) => (
                                    <div className={cx('box_tippy')} tabIndex="-1" {...attrs}>
                                        <ul>
                                            <Link to={'/profile'}>
                                                <li>Hồ sơ</li>
                                            </Link>
                                            <Link to={'/user-history'}>
                                                <li>Lịch sử</li>
                                            </Link>
                                            <li onClick={handleLogout}>Đăng xuất</li>
                                        </ul>
                                    </div>
                                )}
                            >
                                <IconButton>
                                    <Avatar alt="avatar" src={user.img} sx={{ width: 28, height: 28 }} />
                                </IconButton>
                            </Tippy>
                        </div>
                        <div className={cx('user-nav')}>
                            <hr />
                            <p className={cx('element')}>Hồ sơ</p>
                            <p className={cx('element')}>Lịch sử</p>
                            <p className={cx('element')} onClick={handleLogout}>
                                Đăng xuất
                            </p>
                        </div>
                    </>
                )}
            </div>

            <div className={cx('mobile')}>
                <div className={cx('mobile-header')}>
                    <div className={cx('text-logo-box')}>
                        <h2 className={cx('text-logo')}>SALON SPACE</h2>
                    </div>
                    {user && (
                        <div className={cx('actions')}>
                            <div className={cx('search')}>
                                <Tippy
                                    hideOnClick={true}
                                    trigger="click"
                                    placement="bottom"
                                    offset={[0, 20]}
                                    interactive
                                    render={(attrs) => (
                                        <input className={cx('search-input')} placeholder="Tìm kiếm dịch vụ" />
                                    )}
                                >
                                    <IconButton className={cx('search-btn', 'action-button')}>
                                        <FiSearch size={24} />
                                    </IconButton>
                                </Tippy>
                            </div>
                            <Link to={'/cart'}>
                                <IconButton className={cx('action-button')}>
                                    <Badge
                                        badgeContent={cart}
                                        color="error"
                                        sx={{ '& .MuiBadge-badge': { fontSize: 15, height: 15, minWidth: 15 } }}
                                    >
                                        <IoCartSharp size={24} />
                                    </Badge>
                                </IconButton>
                            </Link>
                            <Tippy
                                hideOnClick={true}
                                trigger="click"
                                placement="bottom"
                                interactive
                                render={(attrs) => (
                                    <div className={cx('box_notification')} tabIndex="-1" {...attrs}>
                                        <h1>Thông báo</h1>
                                        <ul>
                                            {notification.map((value) => (
                                                <li
                                                    key={value.id}
                                                    className={cx(value.status === 0 ? 'background-EBEDF0' : '')}
                                                >
                                                    <span>{value.text}</span>
                                                    <span>{value.date}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <div className={cx('box_notification_bottom')} onClick={maskRead}>
                                            Đánh dấu đã đọc
                                        </div>
                                    </div>
                                )}
                            >
                                <IconButton className={cx('action-button')}>
                                    <Badge
                                        badgeContent={notificationCount}
                                        color="error"
                                        sx={{ '& .MuiBadge-badge': { fontSize: 15, height: 15, minWidth: 15 } }}
                                    >
                                        <AiFillBell size={28} />
                                    </Badge>
                                </IconButton>
                            </Tippy>
                        </div>
                    )}
                    <div onClick={() => setStatus(!status)} className={cx('action-button')}>
                        <HiMenuAlt3 size={24} />
                    </div>
                </div>
            </div>
            <ToastContainer />
        </header>
    );
}
export default Header;
