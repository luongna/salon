import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';
import { useState } from 'react';
import { Breadcrumbs } from '~/pages/Breadcrumbs';
import { ServiceItem } from '~/pages/ServiceItem';
import './Service.css';
import SearchService from '~/components/Search';

function Service() {
    const mock = [
        {
            id: 1,
            title: 'CẠO MẶT ÊM ÁI - GỘI XẢ KỸ CÀNG',
            imgUrl: 'https://product.hstatic.net/1000181446/product/dv3_large.png',
        },
        {
            id: 2,
            title: 'CẠO MẶT ÊM ÁI - GỘI XẢ KỸ CÀNG',
            imgUrl: 'https://product.hstatic.net/1000181446/product/dv3_large.png',
        },
        {
            id: 3,
            title: 'CẠO MẶT ÊM ÁI - GỘI XẢ KỸ CÀNG',
            imgUrl: 'https://product.hstatic.net/1000181446/product/dv3_large.png',
        },
        {
            id: 4,
            title: 'CẠO MẶT ÊM ÁI - GỘI XẢ KỸ CÀNG',
            imgUrl: 'https://product.hstatic.net/1000181446/product/dv3_large.png',
        },
        {
            id: 5,
            title: 'CẠO MẶT ÊM ÁI - GỘI XẢ KỸ CÀNG',
            imgUrl: 'https://product.hstatic.net/1000181446/product/dv3_large.png',
        },
        {
            id: 6,
            title: 'CẠO MẶT ÊM ÁI - GỘI XẢ KỸ CÀNG',
            imgUrl: 'https://product.hstatic.net/1000181446/product/dv3_large.png',
        },
        {
            id: 7,
            title: 'CẠO MẶT ÊM ÁI - GỘI XẢ KỸ CÀNG',
            imgUrl: 'https://product.hstatic.net/1000181446/product/dv3_large.png',
        },
        {
            id: 8,
            title: 'CẠO MẶT ÊM ÁI - GỘI XẢ KỸ CÀNG',
            imgUrl: 'https://product.hstatic.net/1000181446/product/dv3_large.png',
        },
        {
            id: 9,
            title: 'CẠO MẶT ÊM ÁI - GỘI XẢ KỸ CÀNG',
            imgUrl: 'https://product.hstatic.net/1000181446/product/dv3_large.png',
        },
        {
            id: 10,
            title: 'CẠO MẶT ÊM ÁI - GỘI XẢ KỸ CÀNG',
            imgUrl: 'https://product.hstatic.net/1000181446/product/dv3_large.png',
        },
        {
            id: 11,
            title: 'CẠO MẶT ÊM ÁI - GỘI XẢ KỸ CÀNG',
            imgUrl: 'https://product.hstatic.net/1000181446/product/dv3_large.png',
        },
        {
            id: 12,
            title: 'CẠO MẶT ÊM ÁI - GỘI XẢ KỸ CÀNG',
            imgUrl: 'https://product.hstatic.net/1000181446/product/dv3_large.png',
        },
        {
            id: 13,
            title: 'CẠO MẶT ÊM ÁI - GỘI XẢ KỸ CÀNG',
            imgUrl: 'https://product.hstatic.net/1000181446/product/dv3_large.png',
        },
        {
            id: 14,
            title: 'CẠO MẶT ÊM ÁI - GỘI XẢ KỸ CÀNG',
            imgUrl: 'https://product.hstatic.net/1000181446/product/dv3_large.png',
        },
        {
            id: 15,
            title: 'CẠO MẶT ÊM ÁI - GỘI XẢ KỸ CÀNG',
            imgUrl: 'https://product.hstatic.net/1000181446/product/dv3_large.png',
        },
    ];
    const [services] = useState(mock);
    // const navigate = useNavigate();
    // const handleServiceClick = (service) => {
    //     navigate.push(`/service/${service.id}`, { services });
    // };

    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 6;

    const pageCount = Math.ceil(services.length / itemsPerPage);
    const offset = currentPage * itemsPerPage;
    const currentServices = services.slice(offset, offset + itemsPerPage);

    const handlePageChange = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };

    // const getServiceById = (id) => {
    //     return services.find((service) => service.id === id);
    // };

    return (
        <div>
            <section
                className="header"
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
            <section className="body">
                <SearchService></SearchService>
                <h2 className="heading">TRỞ THÀNH QUÝ ÔNG LỊCH LÃM CÙNG SUPLO</h2>
                <p className="sub-heading">
                    Suplo hạnh phúc khi mỗi ngày đem đến cho phái mạnh toàn cầu sự tự tin tỏa sáng, sức khoẻ, niềm vui
                    thư giãn; bằng những sản phẩm, dịch vụ chăm sóc sức khỏe, da mặt chuyên nghiệp - tạo kiểu tóc thời
                    trang - gói gọn trong quy trình khoa học 30phút (không phải chờ đợi lâu) với giá thành rẻ nhất thế
                    giới.
                </p>
                <div className="service-list">
                    {currentServices.map((service) => (
                        <ServiceItem
                            key={service.id}
                            id
                            // onClick={onClickService(service.id)}
                            {...service}
                        />
                    ))}
                </div>
                <div className="paginate-wrapper">
                    <ReactPaginate
                        previousLabel={<MdKeyboardArrowLeft size={24} />}
                        nextLabel={<MdKeyboardArrowRight size={24} />}
                        breakLabel={'...'}
                        breakClassName={'break-me'}
                        pageCount={pageCount}
                        marginPagesDisplayed={1}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageChange}
                        containerClassName={'paginateContainer'}
                        activeClassName={'active'}
                    />
                </div>
            </section>
        </div>
    );
}

export default Service;
