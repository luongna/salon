import React from 'react';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faSearch } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import logo from '~/assets/images/logo2.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { logoutSuccess } from '~/utils/store/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import isAdmin from '~/utils/jwt';
import { Avatar, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';

const cx = classNames.bind(styles);
function Header() {
    const [status, setStatus] = useState(false);
    const [isFixed, setIsFixed] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const location = useLocation();
    const currentURL = location.pathname;
    const dispatch = useDispatch();
    const navigate = useNavigate();

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

    const handleToggleSearch = () => {
        // Toggle the visibility of the search input when the search button is clicked
        setIsSearchVisible(!isSearchVisible);
    };

    const handleLogout = () => {
        dispatch(logoutSuccess());
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

    return (
        <header className={cx('wrapper', isFixed ? 'fixed-header' : '')}>
            <img src={logo} alt="logo" className={cx('logo')} />
            <div className={cx('inner')} style={status ? { right: '0px' } : {}}>
                <ul className={cx('ul-element')}>
                    <Link to={'/'}>
                        <li className={cx('element', currentURL === '/' && 'header-active')}>trang chủ</li>
                    </Link>
                    <Link to={'/service'}>
                        <li className={cx('element', currentURL.includes('/service') && 'header-active')}>dịch vụ</li>
                    </Link>
                    <Link to={'/serviceExample'}>
                        <li className={cx('element', currentURL === '/serviceExample' && 'header-active')}>
                            Mẫu dịch vụ
                        </li>
                    </Link>
                    <li className={cx('element')}>Contact</li>
                    {user && isAdmin(user.accessToken) && (
                        <Link to={`/dashboard`}>
                            <li className={cx('element')}>Admin</li>
                        </Link>
                    )}

                    {/* {user && (
                        <li className={cx('element')} onClick={handleLogout}>
                            đăng xuất
                        </li>
                    )} */}
                </ul>
                {!user ? (
                    <Link to={'/login'}>
                        <div className={cx('actions')}>
                            <button className={cx('btn-normal')}>đăng nhập</button>
                        </div>
                    </Link>
                ) : (
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
                                        className={cx('search-input', isSearchVisible ? 'search-input-visible' : '')}
                                    />
                                )}
                                <button type="submit" className={cx('search-btn')} onClick={handleToggleSearch}>
                                    <FontAwesomeIcon icon={faSearch} />
                                </button>
                            </form>
                        </div>
                        <Badge
                            badgeContent={4}
                            color="error"
                            sx={{ '& .MuiBadge-badge': { fontSize: 15, height: 15, minWidth: 15 } }}
                        >
                            <Link to={'/cart'}>
                                <ShoppingCartIcon color="action" sx={{ fontSize: 35, cursor: 'pointer' }} />
                            </Link>
                        </Badge>
                        <Badge
                            badgeContent={5}
                            color="error"
                            sx={{ '& .MuiBadge-badge': { fontSize: 15, height: 15, minWidth: 15 } }}
                        >
                            <Link to={'/notification'}>
                                <NotificationsActiveIcon color="action" sx={{ fontSize: 35, cursor: 'pointer' }} />
                            </Link>
                        </Badge>
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
                            <Avatar alt="avatar" src={user.img} />
                        </Tippy>
                    </div>
                )}
            </div>
            <div className={cx('mobile')}>
                <div>
                    {user && (
                        <div className={cx('actions')}>
                            <div className={cx('search')}>
                                <Tippy
                                    hideOnClick={true}
                                    trigger="click"
                                    placement="bottom"
                                    interactive
                                    render={(attrs) => <input placeholder="Tìm kiếm dịch vụ" />}
                                >
                                    <button className={cx('search-btn')}>
                                        <FontAwesomeIcon icon={faSearch} />
                                    </button>
                                </Tippy>
                            </div>
                            <Badge
                                badgeContent={4}
                                color="error"
                                sx={{ '& .MuiBadge-badge': { fontSize: 15, height: 15, minWidth: 15 } }}
                            >
                                <Link to={'/cart'}>
                                    <ShoppingCartIcon color="action" sx={{ fontSize: 35, cursor: 'pointer' }} />
                                </Link>
                            </Badge>
                            <Badge
                                badgeContent={5}
                                color="error"
                                sx={{ '& .MuiBadge-badge': { fontSize: 15, height: 15, minWidth: 15 } }}
                            >
                                <Link to={'/notification'}>
                                    <NotificationsActiveIcon color="action" sx={{ fontSize: 35, cursor: 'pointer' }} />
                                </Link>
                            </Badge>
                            <Tippy
                                //  content="Tài khoản "
                                hideOnClick={true}
                                trigger="click"
                                placement="bottom"
                                interactive
                                render={(attrs) => (
                                    <div className={cx('box_tippy')} tabIndex="-1" {...attrs}>
                                        <ul>
                                            <li>Hồ sơ</li>
                                            <li>Lịch sử</li>
                                            <li onClick={handleLogout}>Đăng xuất</li>
                                        </ul>
                                    </div>
                                )}
                            >
                                <Avatar alt="avatar" src={user.img} />
                            </Tippy>
                        </div>
                    )}
                </div>
                <div onClick={() => setStatus(!status)}>
                    <FontAwesomeIcon icon={status ? faTimes : faBars} size="2x"></FontAwesomeIcon>
                </div>
            </div>
        </header>
    );
}

export default Header;
