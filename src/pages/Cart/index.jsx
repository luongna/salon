import React, { useState, useEffect, useMemo } from 'react';
import classNames from 'classnames/bind';
import styles from './Cart.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
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
    const deleteElement = (index) => {
        const updatedElements = [...jsonData];
        updatedElements.splice(index, 1);
        setJsonData(updatedElements);
    };
   
    useEffect(() => {
        const newTotalPrice = jsonData.reduce(
            (total, element) => total + element.price,
            0
          );
        setTotalPrice(newTotalPrice);
    }, [ jsonData]);
    const handleOrder = () => {
        console.log('Selected titles:');
    };
    useEffect(() => {
        setJsonData(data);
    }, [data]);
    return (
        <div>
            {jsonData.length === 0 ? (
                <h1>khong có sản phẩm</h1>
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
                                        <div> Moo tar</div>
                                    </th>
                                    <th>{element.price.toLocaleString('en-US')} VNĐ</th>
                                    <th>
                                        <div onClick={() => deleteElement(index)}>
                                            <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                                        </div>
                                    </th>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
            <div className={cx('total-price')}>
                Tổng tiền: <span>{totalPrice.toLocaleString('en-US')}</span> VNĐ
            </div>
            <div style={{ justifyContent: 'end', display: 'flex' }}>
                <button onClick={handleOrder} className={cx('button-price')}>
                    Đặt hàng
                </button>
            </div>
        </div>
    );
}

export default Cart;
