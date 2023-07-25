import './ServiceDetail.scss';
import { useEffect, useRef, useState } from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Button } from '@mui/material';
import { Breadcrumbs } from '../Breadcrumbs';
import { Link } from 'react-router-dom';
function ServiceDetail() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const images = [
        'https://product.hstatic.net/1000181446/product/dv3_large.png',
        'https://product.hstatic.net/1000181446/product/hairstyle2_compact.png',
        'https://product.hstatic.net/1000181446/product/dv3_large.png',
        'https://product.hstatic.net/1000181446/product/hairstyle2_compact.png',
        'https://product.hstatic.net/1000181446/product/dv3_large.png',
        'https://product.hstatic.net/1000181446/product/hairstyle2_compact.png',
        'https://product.hstatic.net/1000181446/product/dv3_large.png',
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const containerRef = useRef(null);

    const handlePrevClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const handleNextClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    const handleItemClick = (index) => {
        setCurrentIndex(index);
        if (containerRef.current) {
            const itemRef = containerRef.current.children[index];
            const containerWidth = containerRef.current.getBoundingClientRect().width;
            const itemWidth = itemRef.getBoundingClientRect().width;
            const itemOffsetLeft = itemRef.offsetLeft;
            if (itemOffsetLeft + itemWidth > containerWidth) {
                containerRef.current.scrollLeft = itemOffsetLeft + itemWidth - containerWidth;
            } else if (itemOffsetLeft < containerRef.current.scrollLeft) {
                containerRef.current.scrollLeft = itemOffsetLeft;
            }
        }
    };
    return (
        <>
            <section
                className="header __detail"
                style={{
                    '--bg-url': `url(${'https://theme.hstatic.net/1000181446/1000235350/14/image_breadcrumb_bg.png?v=1737'})`,
                }}
            >
                <h1 className="heading">CÁC DỊCH VỤ</h1>
                <Breadcrumbs className="breadcrumbs">
                    <Link className="breadcrumb-link" to="/">
                        Trang chủ
                    </Link>
                    <Link className="breadcrumb-link" to="/service">
                        Các dịch vụ
                    </Link>
                </Breadcrumbs>
            </section>
            <div className="service-container">
                <div className="service-content">
                    <img className="service-image" src={images[currentIndex]} alt={`Image ${currentIndex + 1}`} />
                    <div className="list-images">
                        <button className="left-button" onClick={handlePrevClick}>
                            <ArrowBackIosNewIcon />
                        </button>
                        <div
                            ref={containerRef}
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: '16px',
                            }}
                        >
                            {images.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`Image ${index + 1}`}
                                    style={{
                                        width: '150px',
                                        height: '100px',
                                        margin: '4px',
                                        cursor: 'pointer',
                                        border: currentIndex === index ? '4px solid #ed8787' : 'none',
                                    }}
                                    onClick={() => handleItemClick(index)}
                                />
                            ))}
                        </div>
                        <button className="right-button" onClick={handleNextClick}>
                            <ArrowForwardIosIcon />
                        </button>
                    </div>
                    <div>
                        <h1 className="service-title">CẠO MẶT ÊM ÁI - GỘI XẢ KỸ CÀNG</h1>
                        <p>
                            Cạo mặt êm ái giúp da sáng mịn. Gội xả kỹ càng sau cắt để bạn luôn hoàn hảo trước mỗi buổi
                            hẹn quan trọng. Không lo tóc con bám dính nhờ giấy cuốn cổ đặc biệt từ Suplo
                        </p>
                    </div>
                </div>
                <div className="right-sider-bar">
                    <div style={{ padding: '12px' }}>
                        <h2 style={{ display: 'flex', justifyContent: 'center' }}>THÔNG TIN DỊCH VỤ</h2>
                        <h3>Tên:</h3>
                        <p>CẠO MẶT ÊM ÁI - GỘI XẢ KỸ CÀNG</p>
                        <h3>Mô tả:</h3>
                        <p>
                            Cạo mặt êm ái giúp da sáng mịn. Gội xả kỹ càng sau cắt để bạn luôn hoàn hảo trước mỗi buổi
                            hẹn quan trọng. Không lo tóc con bám dính nhờ giấy cuốn cổ đặc biệt từ Suplo Cạo mặt êm ái
                            giúp da sáng mịn. Gội xả kỹ càng sau cắt để bạn luôn hoàn hảo trước mỗi buổi hẹn quan trọng.
                            Không lo tóc con bám dính nhờ giấy cuốn cổ đặc biệt từ Suplo
                        </p>
                        <h3>Giá:</h3>
                        <p>50,000₫</p>
                    </div>
                    <Button className="add-cart-button">
                        <AddShoppingCartIcon className="add-cart-icon" />
                    </Button>
                </div>
            </div>
        </>
    );
}

export default ServiceDetail;
