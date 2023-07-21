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
    const [selectedItems, setSelectedItems] = useState([]);
    const deleteElement = (index) => {
        const updatedElements = [...jsonData];
        updatedElements.splice(index, 1);
        setJsonData(updatedElements);
    };
    const handleCheckboxChange = (index) => {
        if (selectedItems.includes(index)) {
            setSelectedItems(selectedItems.filter((item) => item !== index));
            // setTotalPrice(totalPrice+selectedItems[index].price)
        } else {
            setSelectedItems([...selectedItems, index]);
            // setTotalPrice(totalPrice-selectedItems[index].price)
        }
    };
    useEffect(() => {
        // Calculate the total price based on the selected items
        const newTotalPrice = selectedItems.reduce(
            (total, index) => total + jsonData[index].price,
            0
        );
        setTotalPrice(newTotalPrice);
    }, [selectedItems, jsonData]);
    const handleOrder = () => {
        const selectedTitles = selectedItems.map((index) => jsonData[index].ud);
        console.log('Selected titles:', selectedTitles);
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
                                    <th>
                                        <input
                                            type="checkbox"
                                            onChange={() => handleCheckboxChange(index)}
                                            checked={selectedItems.includes(index)}
                                        />
                                    </th>
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
