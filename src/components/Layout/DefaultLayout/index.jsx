import classNames from 'classnames/bind';
import Header from '~/components/Layout/components/Header';
import styles from './DefaultLayout.module.scss';
import Footer from '~/components/Layout/components/Footer';
import Message from '~/pages/Message';
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
            {/* <Message /> */}
        </div>
    );
}

export default DefaultLayout;
