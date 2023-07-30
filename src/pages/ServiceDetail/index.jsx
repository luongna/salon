import './ServiceDetail.scss';
import { useEffect, useRef, useState } from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Button } from '@mui/material';
import { Breadcrumbs } from '../Breadcrumbs';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';


function ServiceDetail() {
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchServiceDetail();
    }, []);

    const [serviceDetail, setServiceDetail] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const containerRef = useRef(null);

    const fetchServiceDetail = () => {
        axios.get(`http://localhost:8080/service/detail/${id}`)
            .then((response) => {
                setServiceDetail(response.data);
            })
            .catch((error) => {
                console.error('Error fetching service detail:', error);
            });
    };

    const images = serviceDetail?.images || [];

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
    
    if (!serviceDetail) {
        return <div>Loading...</div>; // You can render a loading indicator while waiting for data to be fetched
    }

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
                    <Link className="breadcrumb-text">CẠO MẶT ÊM ÁI - GỘI XẢ KỸ CÀNG</Link>
                </Breadcrumbs>
            </section>
            <div className="service-container">
                <div className="service-content">
                <div className="service-content__image">
                    <img className="service-image" src={serviceDetail.img} alt={serviceDetail.name} />
                </div>
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
                                overflowX: 'scroll',
                            }}
                        >
                            {images.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={` ${index + 1}`}
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
                        <h1 className="service-title">{serviceDetail.name}</h1>
                        <p>{serviceDetail.description}</p>
                    </div>
                </div>
                <div className="right-sider-bar">
                    <div style={{ padding: '12px' }}>
                    <h2
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                textAlign: 'center',
                                fontWeight: 'bold',
                            }}
                        >
                            THÔNG TIN DỊCH VỤ
                        </h2>
                        <h3>Tên:</h3>
                        <p>{serviceDetail.name}</p>
                        <h3>Mô tả:</h3>
                        <p>{serviceDetail.description}</p>
                        <h3>Giá:</h3>
                        <p>{serviceDetail.price}₫</p>
                    </div>
                    <Button className="add-cart-button" onClick={() => navigate('/cart')}>
                        <AddShoppingCartIcon className="add-cart-icon" />
                    </Button>
                </div>
            </div>
        </>
    );
}

export default ServiceDetail;
