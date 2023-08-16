import React from 'react';
import Slideshow from './slideshow';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import slideshow1 from '~/assets/images/slideshow1.jpg';
import slideshow2 from '~/assets/images/slideshow2.jpg';
import slideshow3 from '~/assets/images/slideshow3.jpg';
import axios from '~/utils/api/axios';
import { useEffect, useState } from 'react';
import avatarDefault from '~/assets/images/avatarDefault.jpg';
import MyModal from '~/event/modal';

const cx = classNames.bind(styles);
function Home() {
    const slideshowImages = [slideshow1, slideshow2, slideshow3];
    const [topUsers, setTopUsers] = useState([]);
    const [mostBookedServices, setMostBookedServices] = useState([]);

    useEffect(() => {
        axios
            .get(`/service/most-booked`)
            .then((response) => {
                setMostBookedServices(response.data);
            })
            .catch((error) => {
                console.error('Error fetching most booked services:', error);
            });
    }, []);

    useEffect(() => {
        axios
            .get(`/users/top-users`)
            .then((response) => {
                setTopUsers(response.data);
            })
            .catch((error) => {
                console.error('Error fetching top users:', error);
            });
    }, []);

    function mapRole(role) {
        switch (role) {
            case 'ROLE_STAFF':
                return 'Chuyên gia';
            default:
                return role;
        }
    }

    return (
        <>
            <Slideshow slides={slideshowImages} />
            <div className={cx('about')}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-5 col-md-6">
                            <div className={cx('about-img')}>
                                <img src={process.env.PUBLIC_URL + '/img/about.jpg'} alt="about" />
                            </div>
                        </div>
                        <div className="col-lg-7 col-md-6">
                            <div className={cx('section-header')} style={{ textAlign: 'center' }}>
                                <p>Learn About Us</p>
                                <h2>25 Years Experience</h2>
                            </div>
                            <div className={cx('about-text')}>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec pretium mi.
                                    Curabitur facilisis ornare velit non vulputate. Aliquam metus tortor, auctor id
                                    gravida condimentum, viverra quis sem.
                                </p>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec pretium mi.
                                    Curabitur facilisis ornare velit non vulputate. Aliquam metus tortor, auctor id
                                    gravida condimentum, viverra quis sem. Curabitur non nisl nec nisi scelerisque
                                    maximus. Aenean consectetur convallis porttitor. Aliquam interdum at lacus non
                                    blandit.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={cx('service')}>
                <div className="container">
                    <div className={cx('section-header')} style={{ textAlign: 'center' }}>
                        <p>Our Salon Services</p>
                        <h2>Best Salon and Barber Services for You</h2>
                    </div>
                    <div className="row">
                        <div className="col-lg-4 col-md-6">
                            <div className={cx('service-item')}>
                                <div className={cx('service-img')}>
                                    <img src={process.env.PUBLIC_URL + '/img/service-1.jpg'} alt="service" />
                                </div>
                                <h3>Hair Cut</h3>
                                <p>
                                    Lorem ipsum dolor sit amet elit. Phasellus nec pretium mi. Curabitur facilisis
                                    ornare velit non
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className={cx('service-item')}>
                                <div className={cx('service-img')}>
                                    <img src={process.env.PUBLIC_URL + '/img/service-2.jpg'} alt="service" />
                                </div>
                                <h3>Beard Style</h3>
                                <p>
                                    Lorem ipsum dolor sit amet elit. Phasellus nec pretium mi. Curabitur facilisis
                                    ornare velit non
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className={cx('service-item')}>
                                <div className={cx('service-img')}>
                                    <img src={process.env.PUBLIC_URL + '/img/service-3.jpg'} alt="service" />
                                </div>
                                <h3>Color & Wash</h3>
                                <p>
                                    Lorem ipsum dolor sit amet elit. Phasellus nec pretium mi. Curabitur facilisis
                                    ornare velit non
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={cx('price')}>
                <div className="container">
                    <div className={cx('section-header')} style={{ textAlign: 'center' }}>
                        <p>Our Best Pricing</p>
                        <h2>We Provide Best Price in the City</h2>
                    </div>
                    <div className="row">
                        {mostBookedServices.map((service, index) => (
                            <div className="col-lg-3 col-md-4 col-sm-6" key={index}>
                                <div className={cx('price-item')}>
                                    <div className={cx('price-img')}>
                                        {/* You can replace this with an appropriate image source */}
                                        <img src={service[0]} alt="price" />
                                    </div>
                                    <div className={cx('price-text')}>
                                        <h2 className={cx('price-text-name')}>{service[1]}</h2>
                                        <h3>{service[2]}VNĐ</h3>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className={cx('team')}>
                <div className="container">
                    <div className={cx('section-header')} style={{ textAlign: 'center' }}>
                        <p>Our Barber Team</p>
                        <h2>Meet Our Hair Cut Expert Barber</h2>
                    </div>
                    <div className="row">
                        {topUsers.map((user, index) => (
                            <div className="col-lg-3 col-md-6" key={index}>
                                <div className={cx('team-item')}>
                                    <div className={cx('team-img')}>
                                        <img src={user[0] ? user[0] : avatarDefault} alt="Team" />
                                    </div>
                                    <div className={cx('team-text')}>
                                        <h2>{user[1]}</h2>
                                        <p className={cx('team-role')}>{mapRole(user[2])}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
