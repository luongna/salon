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
            },
            {
                ud: 2,
                img: 'https://cdn.pixabay.com/photo/2023/05/23/10/45/girl-8012460_1280.jpg',
                tittle: 'đàu cắt moi',
            },
            {
                ud: 3,
                img: 'https://cdn.pixabay.com/photo/2023/05/23/10/45/girl-8012460_1280.jpg',
                tittle: 'đàu cắt moi',
            },
            {
                ud: 4,
                img: 'https://cdn.pixabay.com/photo/2023/05/23/10/45/girl-8012460_1280.jpg',
                tittle: 'đàu cắt moi',
            },
            {
                ud: 5,
                img: 'https://cdn.pixabay.com/photo/2023/05/23/10/45/girl-8012460_1280.jpg',
                tittle: 'đàu cắt moi',
            },
        ],
        [],
    );
    const [jsonData, setJsonData] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const deleteElement = (index) => {
        const updatedElements = [...jsonData];
        updatedElements.splice(index, 1);
        setJsonData(updatedElements);
    };
    const handleCheckboxChange = (index) => {
        if (selectedItems.includes(index)) {
            setSelectedItems(selectedItems.filter((item) => item !== index));
        } else {
            setSelectedItems([...selectedItems, index]);
        }
    };

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
                                <th>{element.tittle}</th>
                                <th>
                                    <div onClick={() => deleteElement(index)}>
                                        <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                                    </div>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {/* <table className={cx('table-element')}>
                {jsonData.length === 0 ? (
                    <h1>khong có sản phẩm</h1>
                ) : (
                    jsonData.map((element, index) => (
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
                            <th>{element.tittle}</th>
                            <th>
                                <div onClick={() => deleteElement(index)}>
                                    <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                                </div>
                            </th>
                        </tr>
                    ))
                )}
            </table> */}
            <button onClick={handleOrder}>Đặt hàng</button>
        </div>
    );
}

export default Cart;
