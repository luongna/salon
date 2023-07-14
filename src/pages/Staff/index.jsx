import { useState } from "react";
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { Breadcrumbs } from '~/pages/Breadcrumbs';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';
import './Staff.css';
import staffNghia from '~/assets/images/n.jpg';
import staffLuong from '~/assets/images/luong.jpg';
import staffdube from '~/assets/images/dube.jpg';

function Staff() {

    const [staffs] = useState([
        {
            id: 1,
            name: 'Lê Quý Nghĩa',
            avatar: staffNghia,
            position: 'Salon staff',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        },
        {
            id: 2,
            name: 'Ngô Anh Lượng',
            avatar: staffLuong,
            position: 'Salon staff',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        },
        {
            id: 3,
            name: 'Hoàng Hồng Phúc',
            avatar: staffdube,
            position: 'Salon staff',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        },
        {
            id: 4,
            name: 'Nguyễn Hữu Phước',
            avatar: staffdube,
            position: 'Salon staff',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        },
        {
            id: 5,
            name: 'Lê Quý Nghĩa',
            avatar: staffNghia,
            position: 'Salon staff',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        },
        {
            id: 6,
            name: 'Ngô Anh Lượng',
            avatar: staffLuong,
            position: 'Salon staff',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        },
        {
            id: 7,
            name: 'Hoàng Hồng Phúc',
            avatar: staffdube,
            position: 'Salon staff',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        },
        {
            id: 8,
            name: 'Nguyễn Hữu Phước',
            avatar: staffdube,
            position: 'Salon staff',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        },
        {
            id: 9,
            name: 'Lê Quý Nghĩa',
            avatar: staffNghia,
            position: 'Salon staff',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        },
        {
            id: 10,
            name: 'Ngô Anh Lượng',
            avatar: staffLuong,
            position: 'Salon staff',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        },
    ]);

    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 6;

    const pageCount = Math.ceil(staffs.length / itemsPerPage);
    const offset = currentPage * itemsPerPage;
    const currentStaffs = staffs.slice(offset, offset + itemsPerPage);

    const handlePageChange = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };

    return (
        <div>
            <section
                className="header"
                style={{
                    '--bg-url': `url(${'https://theme.hstatic.net/1000181446/1000235350/14/image_breadcrumb_bg.png?v=1737'})`
                }}
            >
                <h1 className="heading">CÁC DỊCH VỤ</h1>
                <Breadcrumbs className="breadcrumbs">
                    <Link className="breadcrumb-link" to='/'>
                        Trang chủ   
                    </Link>
                    <Link className="breadcrumb-link" to='/staff'>
                         Đội ngũ nhân viên
                    </Link>
                </Breadcrumbs>
            </section>
            <h5 className='staff-content'>Đội ngũ nhân viên giàu kinh nghiệm</h5>
            <p className='staff-all-desc'>Với đội ngũ chuyên gia được đào tạo bài bản từ Hoa Kỳ và các nhân viên stylist & skinner giàu kinh nghiệm, Suplo tự tin có thể giúp bạn có một mái tóc thật phong cách và cá tính. Từ những kiểu tóc nam cổ điển như Mop-top của The Beatles cho đến hiện đại như Undercut, Slickback, Pompadour của các ngôi sao bóng đá Beckham, Ronaldo…</p>
            <div className="staff-list">
                {currentStaffs.map(staff => (
                    <div className="staff-item grid-col" key={staff.id}>
                        <img className="staff-img" src={staff.avatar} alt={staff.name} />
                        <h3>{staff.name}</h3>
                        <p>{staff.position}</p>
                        <p>{staff.description}</p>
                    </div>
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
                    pageRangeDisplayed={3}
                    onPageChange={handlePageChange}
                    containerClassName={'paginateContainer'}
                    activeClassName={'active'}
                />
            </div>
        </div>
    )
}

export default Staff;