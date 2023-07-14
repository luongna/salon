import classNames from 'classnames/bind';
import Header from '~/components/Layout/components/Header';
import styles from './DefaultLayout.module.scss';
import Footer from '~/components/Layout/components/Footer';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            {/* <div className={cx('container')}>
                <div className={cx('content')}> */}
                    {children}
                    <Footer></Footer>
                {/* </div>
            </div> */}
        </div>
    );
}

export default DefaultLayout;
