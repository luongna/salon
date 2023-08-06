import React, { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import classNames from 'classnames/bind';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import styles from './Cart.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import staffNghia from '~/assets/images/n.jpg';
import staffLuong from '~/assets/images/luong.jpg';
import staffdube from '~/assets/images/dube.jpg';
import axios from '~/utils/api/axios'
const cx = classNames.bind(styles);

function Cart() {
    const data = useMemo(
        () => [
            {
                ud: 1,
                img: 'https://cdn.pixabay.com/photo/2023/05/23/10/45/girl-8012460_1280.jpg',
                tittle: 'đàu cắt moi',
                price: 100000,
            },
            {
                ud: 2,
                img: 'https://cdn.pixabay.com/photo/2023/05/23/10/45/girl-8012460_1280.jpg',
                tittle: 'đàu cắt moi',
                price: 100,
            },
            {
                ud: 3,
                img: 'https://cdn.pixabay.com/photo/2023/05/23/10/45/girl-8012460_1280.jpg',
                tittle: 'đàu cắt moi',
                price: 100,
            },
            {
                ud: 4,
                img: 'https://cdn.pixabay.com/photo/2023/05/23/10/45/girl-8012460_1280.jpg',
                tittle: 'đàu cắt moi',
                price: 100,
            },
            {
                ud: 5,
                img: 'https://cdn.pixabay.com/photo/2023/05/23/10/45/girl-8012460_1280.jpg',
                tittle: 'đàu cắt moi',
                price: 100,
            },
        ],
        [],
    );
    const [jsonData, setJsonData] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const user = useSelector((state) => state.auth.login?.currenUser);
    const deleteElement = (index) => {
        const updatedElements = [...jsonData];
        updatedElements.splice(index, 1);
        setJsonData(updatedElements);
    };

    useEffect(() => {
        const newTotalPrice = jsonData.reduce((total, element) => total + element.price, 0);
        setTotalPrice(newTotalPrice);
    }, [jsonData]);
    const handleOrder = () => {
        console.log('Selected titles:');
    };
    useEffect(() => {
        axios
        .post(`/booking/listCart`,{
            serviceID :1,
            phone :user.phone, 
          })
        .then((res) => {
            const branch = res.data;
            console.log(branch)
           setJsonData(branch);
        })
        .catch((error) => console.log(error));
    }, []);

    //BookServices
    const [branches] = useState([
        {
            id: 1,
            address: 'Khu đô thị FPT, Ngũ Hành Sơn, TP Đà Nẵng',
            position: '15.977456962147246, 108.2627979201717',
        },
        {
            id: 2,
            address: '123 Phạm Như Xương, Liên Chiểu, TP Đà Nẵng',
            position: '16.06456047137082, 108.15191449651242',
        },
        {
            id: 3,
            address: '36 Trần Văn Ơn, TP Huế, Thừa Thiên Huế',
            position: '16.465680902969627, 107.60516250808173',
        },
        {
            id: 4,
            address: '150 Trần Thánh Tông, Hội An, Quảng Nam',
            position: '15.888565750138024, 108.34642808301683',
        },
        {
            id: 5,
            address: 'Thị trấn Chợ Chùa, Quảng Ngãi',
            position: '15.03934538342154, 108.77545294091901',
        },
    ]);

    const [dates, setDates] = useState([]);

    const handleClick = (daysToAdd) => {
        return new Promise((resolve) => {
            const nextDay = moment().add(daysToAdd, 'days').format('DD/MM');
            console.log('Next day:', nextDay);
            // Thực hiện các hành động khác với nextDay
            resolve(nextDay);
        });
    };

    useEffect(() => {
        const fetchDates = async () => {
            const promises = [0, 1, 2, 3, 4, 5, 6].map((daysToAdd) => handleClick(daysToAdd));
            const updatedDates = await Promise.all(promises).then((results) =>
                results.map((date, index) => ({ id: index + 1, date })),
            );
            setDates(updatedDates);
        };

        fetchDates();
    }, []);

    const [times] = useState([
        // '8:00', '9:30', '11:00', '13:00', '14:30', '16:00'
        {
            id: 1,
            time: '8:00',
        },
        {
            id: 2,
            time: '9:30',
        },
        {
            id: 3,
            time: '11:00',
        },
        {
            id: 4,
            time: '13:00',
        },
        {
            id: 5,
            time: '14:30',
        },
        {
            id: 6,
            time: '16:00',
        },
    ]);

    const [staffs] = useState([
        {
            id: 1,
            name: 'Lê Quý Nghĩa',
            avatar: staffNghia,
            position: 'Salon staff',
            phone: '0969140342',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        },
        {
            id: 2,
            name: 'Ngô Anh Lượng',
            avatar: staffLuong,
            position: 'Salon staff',
            phone: '0123456789',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        },
        {
            id: 3,
            name: 'Hoàng Hồng Phúc',
            avatar: staffdube,
            position: 'Salon staff',
            phone: '0123456789',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        },
        {
            id: 4,
            name: 'Nguyễn Hữu Phước',
            avatar: staffdube,
            position: 'Salon staff',
            phone: '0123456789',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        },
    ]);

    const [active, setActive] = useState(false);
    const [selectedBranchId, setSelectedBranchId] = useState(null);
    const [selectedTimeId, setSelectedTimeId] = useState(null);
    const [selectedDateId, setSelectedDateId] = useState(null);
    const [selectedStaff, setSelectedStaff] = useState(null);

    const handleSelectChange = (event) => {
        const selectID = parseInt(event.target.value);
        const selected = staffs.find((staff) => staff.id === selectID);
        setSelectedStaff(selected);
        if (selectID !== 0) {
            setActive(true);
        } else {
            setActive(false);
        }
    };

    const handleBranchesChange = (event) => {
        const selectedID = parseInt(event.target.value);
        const selected = branches.find((branch) => branch.id === selectedID);
        setSelectedBranchId(selected);
    };
    const handleDateClick = (id) => {
        setSelectedDateId(id);
    };
    const handleTimesClick = (id) => {
        setSelectedTimeId(id);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedBranchId && selectedStaff && selectedDateId && selectedTimeId) {
            toast.success('Bạn đã đặt lịch thành công', {
                position: toast.POSITION.TOP_RIGHT,
            });
        } else {
            toast.error('Vui lòng chọn đầy đủ các mục !!!', {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    };

    const position = [15.977456962147246, 108.2627979201717];
    let defaultIcon = L.icon({
        iconUrl: icon,
        shadowUrl: iconShadow,
        iconAnchor: [16, 37],
    });

    L.Marker.prototype.options.icon = defaultIcon;

    return (
        <div>
            {jsonData.length === 0 ? (
                <h1>Bạn chưa đặt sản phẩm!!!!!</h1>
            ) : (
                <>
                    <h1>Giỏ hàng</h1>
                    <table className={cx('table-element')}>
                        <tbody>
                            {jsonData.map((element, index) => (
                                <tr key={index}>
                                    <th className={cx('imgaes')}>
                                        <img src={element.img} alt="abc" />
                                    </th>
                                    <th>
                                        <h2>{element.tittle}</h2>

                                        <div> Lorem ipsum dolor sit amet, consectetur adipiscing elit</div>
                                    </th>
                                    <th>{element.price.toLocaleString('en-US')} VNĐ</th>
                                    <th>
                                        <div onClick={() => deleteElement(index)} style={{ cursor: 'pointer' }}>
                                            <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                                        </div>
                                    </th>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className={cx('booking-service')}>
                        <div className={cx('booking-information')}>
                            <h3>ĐẶT LỊCH</h3>
                            <div className={cx('branch-staff-booking')}>
                                <p>Chọn salon (*):</p>
                                <select onChange={handleBranchesChange}>
                                    <option value="0">- Vui lòng chọn chi nhánh -</option>
                                    {branches.map((branch) => (
                                        <option
                                            key={branch.id}
                                            value={branch.id}
                                            // onClick={() => handleBranchesClick(branch.id)}
                                        >
                                            {branch.address}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className={cx('branch-staff-booking')}>
                                <p>Chọn nhân viên (*):</p>
                                <select onChange={handleSelectChange}>
                                    <option value="0">- Vui lòng chọn nhân viên -</option>
                                    {staffs.map((staff) => (
                                        <option className="" key={staff.id} value={staff.id}>
                                            {staff.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className={cx('date-booking')}>
                                <p>Chọn ngày (*):</p>
                                <div className={cx('date-time')}>
                                    {dates.map((date) =>
                                        active !== true ? (
                                            <button disabled key={date.id}>
                                                {date.date}
                                            </button>
                                        ) : (
                                            <button
                                                className={cx({ selectted: date.id === selectedDateId })}
                                                key={date.id}
                                                onClick={() => handleDateClick(date.id)}
                                            >
                                                {date.date}
                                            </button>
                                        ),
                                    )}
                                </div>
                                <p>Chọn giờ (*):</p>
                                <div className={cx('status-time')}>
                                    <div>
                                        <div style={{ backgroundColor: '#000' }}></div>
                                        <span>Đã chọn</span>
                                    </div>
                                    <div>
                                        <div style={{ backgroundColor: 'rgb(246, 109, 109)' }}></div>
                                        <span>Chưa chọn</span>
                                    </div>
                                    <div>
                                        <div style={{ backgroundColor: '#ccc' }}></div>
                                        <span>Hết chỗ</span>
                                    </div>
                                </div>
                                <div className={cx('date-time')}>
                                    {times.map((data) => (
                                        <>
                                            {active !== true ? (
                                                <button disabled key={data.id}>
                                                    {data.time}
                                                </button>
                                            ) : (
                                                <button
                                                    className={cx({ selectted: data.id === selectedTimeId })}
                                                    key={data.id}
                                                    onClick={() => handleTimesClick(data.id)}
                                                >
                                                    {data.time}
                                                </button>
                                            )}
                                        </>
                                    ))}
                                </div>
                            </div>
                            <button className={cx('submit-booking')} type="submit" onClick={handleSubmit}>
                                ĐẶT LỊCH
                            </button>
                            <ToastContainer />
                        </div>
                        <div className={cx('booking-information')}>
                            <div className={cx('booking-staffs-information')}>
                                <h3>THÔNG TIN NHÂN VIÊN BẠN ĐÃ CHỌN</h3>
                                {selectedStaff && (
                                    <div>
                                        <img src={selectedStaff.avatar} alt="avatar" />
                                        <div>
                                            <p>
                                                <strong>{selectedStaff.name}</strong> - {selectedStaff.position}
                                            </p>
                                            <p>{selectedStaff.description}</p>
                                            <p>Số điện thoại: {selectedStaff.phone}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <MapContainer
                                center={position}
                                zoom={15}
                                scrollWheelZoom={false}
                                style={{ height: '48%', width: '100%', bottom: '0' }}
                            >
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <Marker position={position}>
                                    <Popup>
                                        A pretty CSS3 popup. <br /> Easily customizable.
                                    </Popup>
                                </Marker>
                            </MapContainer>
                        </div>
                    </div>

                    <div className={cx('total-price')}>
                        Tổng tiền: <span>{totalPrice.toLocaleString('en-US')}</span> VNĐ
                    </div>
                    <div style={{ justifyContent: 'end', display: 'flex' }}>
                        <button onClick={handleOrder} className={cx('button-price')}>
                            Đặt hàng
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default Cart;
