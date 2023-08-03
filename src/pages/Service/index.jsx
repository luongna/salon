import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';
import { Breadcrumbs } from '~/pages/Breadcrumbs';
import { ServiceItem } from '~/pages/ServiceItem';
import './Service.css';
import SearchService from '~/components/Search';
import { tokens } from '~/utils/theme/theme';
import axios from '~/utils/api/axios';
import { useState, useEffect } from 'react';

function Service() {
    const [services, setServices] = useState([]);

    useEffect(() => {
        // Fetch data from the API when the component mounts
        axios
            .get(`/service`)
            .then((response) => {
                setServices(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);
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
                            id={service.id}
                            title={service.name}
                            imgUrl={service.img}
                            onClick={() => {
                                /* Handle click event here if needed */
                            }}
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
