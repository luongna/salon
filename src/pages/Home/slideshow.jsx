
import classNames from 'classnames/bind';
import styles from './Home.module.scss';

const cx = classNames.bind(styles);
function Slideshow({ slides }) {


    return (
        <div className={cx('element')}>
            <img className={cx('img-element')} src={slides} alt="Slide" />
            <h1 className={cx('slide-text')}>
                Create your style
                <p>
                   tạo ra phong cách của riêng bạn!
                </p>
            </h1>
        </div>
    );
}

export default Slideshow;
