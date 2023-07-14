import React from 'react';
import Slideshow from './slideshow';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import slideshow from '~/assets/images/combs-scissors-copy-space.jpg';
const cx = classNames.bind(styles);
function Home() {
    return (
        <>
            <Slideshow slides={slideshow} />
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
                        <div className="col-lg-3 col-md-4 col-sm-6">
                            <div className={cx('price-item')}>
                                <div className={cx('price-img')}>
                                    <img src={process.env.PUBLIC_URL + '/img/price-1.jpg'} alt="price" />
                                </div>
                                <div className={cx('price-text')}>
                                    <h2>Hair Cut</h2>
                                    <h3>$9.99</h3>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6">
                            <div className={cx('price-item')}>
                                <div className={cx('price-img')}>
                                    <img src={process.env.PUBLIC_URL + '/img/price-1.jpg'} alt="price" />
                                </div>
                                <div className={cx('price-text')}>
                                    <h2>Hair Wash</h2>
                                    <h3>$10.99</h3>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6">
                            <div className={cx('price-item')}>
                                <div className={cx('price-img')}>
                                    <img src={process.env.PUBLIC_URL + '/img/price-1.jpg'} alt="price" />
                                </div>
                                <div className={cx('price-text')}>
                                    <h2>Hair Color</h2>
                                    <h3>$11.99</h3>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6">
                            <div className={cx('price-item')}>
                                <div className={cx('price-img')}>
                                    <img src={process.env.PUBLIC_URL + '/img/price-1.jpg'} alt="price" />
                                </div>
                                <div className={cx('price-text')}>
                                    <h2>Hair Shave</h2>
                                    <h3>$12.99</h3>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6">
                            <div className={cx('price-item')}>
                                <div className={cx('price-img')}>
                                    <img src={process.env.PUBLIC_URL + '/img/price-1.jpg'} alt="price" />
                                </div>
                                <div className={cx('price-text')}>
                                    <h2>Hair Straight</h2>
                                    <h3>$13.99</h3>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6">
                            <div className={cx('price-item')}>
                                <div className={cx('price-img')}>
                                    <img src={process.env.PUBLIC_URL + '/img/price-1.jpg'} alt="price" />
                                </div>
                                <div className={cx('price-text')}>
                                    <h2>Facial</h2>
                                    <h3>$14.99</h3>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6">
                            <div className={cx('price-item')}>
                                <div className={cx('price-img')}>
                                    <img src={process.env.PUBLIC_URL + '/img/price-1.jpg'} alt="price" />
                                </div>
                                <div className={cx('price-text')}>
                                    <h2>Shampoo</h2>
                                    <h3>$15.99</h3>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6">
                            <div className={cx('price-item')}>
                                <div className={cx('price-img')}>
                                    <img src={process.env.PUBLIC_URL + '/img/price-1.jpg'} alt="price" />
                                </div>
                                <div className={cx('price-text')}>
                                    <h2>Beard Trim</h2>
                                    <h3>$16.99</h3>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6">
                            <div className={cx('price-item')}>
                                <div className={cx('price-img')}>
                                    <img src={process.env.PUBLIC_URL + '/img/price-1.jpg'} alt="price" />
                                </div>
                                <div className={cx('price-text')}>
                                    <h2>Beard Shave</h2>
                                    <h3>$17.99</h3>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6">
                            <div className={cx('price-item')}>
                                <div className={cx('price-img')}>
                                    <img src={process.env.PUBLIC_URL + '/img/price-1.jpg'} alt="price" />
                                </div>
                                <div className={cx('price-text')}>
                                    <h2>Wedding Cut</h2>
                                    <h3>$18.99</h3>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6">
                            <div className={cx('price-item')}>
                                <div className={cx('price-img')}>
                                    <img src={process.env.PUBLIC_URL + '/img/price-1.jpg'} alt="price" />
                                </div>
                                <div className={cx('price-text')}>
                                    <h2>Clean Up</h2>
                                    <h3>$19.99</h3>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6">
                            <div className={cx('price-item')}>
                                <div className={cx('price-img')}>
                                    <img src={process.env.PUBLIC_URL + '/img/price-1.jpg'} alt="price" />
                                </div>
                                <div className={cx('price-text')}>
                                    <h2>Massage</h2>
                                    <h3>$20.99</h3>
                                </div>
                            </div>
                        </div>
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
                        <div className="col-lg-3 col-md-6">
                            <div className={cx('team-item')}>
                                <div className={cx('team-img')}>
                                    <img src={process.env.PUBLIC_URL + '/img/team-3.jpg'} alt="Team" />
                                </div>
                                <div className={cx('team-text')}>
                                    <h2>Adam Phillips</h2>
                                    <p>Master Barber</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className={cx('team-item')}>
                                <div className={cx('team-img')}>
                                    <img src={process.env.PUBLIC_URL + '/img/team-3.jpg'} alt="Team" />
                                </div>
                                <div className={cx('team-text')}>
                                    <h2>Dylan Adams</h2>
                                    <p>Hair Expert</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className={cx('team-item')}>
                                <div className={cx('team-img')}>
                                    <img src={process.env.PUBLIC_URL + '/img/team-3.jpg'} alt="team" />
                                </div>
                                <div className={cx('team-text')}>
                                    <h2>Gloria Edwards</h2>
                                    <p>Beard Expert</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className={cx('team-item')}>
                                <div className={cx('team-img')}>
                                    <img src={process.env.PUBLIC_URL + '/img/team-3.jpg'} alt="team" />
                                </div>
                                <div className={cx('team-text')}>
                                    <h2>Josh Dunn</h2>
                                    <p>Color Expert</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
