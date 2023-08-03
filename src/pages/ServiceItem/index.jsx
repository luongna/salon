import PropTypes from 'prop-types';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Button } from '@mui/material';
import { Link, useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import axios from '~/utils/api/axios';

export const ServiceItem = ({ id, title, imgUrl, onClick }) => {

  const navigate = useNavigate(); 
  const user = useSelector((state) => state.auth.login?.currenUser);
 const HandleAddToCart =(e)=> {
  e.preventDefault();
  console.log(11111)
    if(user === null){
      
     navigate('/login')
     
    }
    else{
      axios.post('/booking/addToCart',{
        serviceID :id,
        phone :user.phone, 
      }
      
      ).then(() => {
      Swal.fire({
        html: `<h4>Thêm vào giỏ hàng thành công!</h4>`,
        icon: 'success',
        showConfirmButton: false,
        timer: 1100,
    });
       
    console.log(id ,user.phone)
  })
}
 }

    return (
        <div className="service-wrapper" onClick={onClick}>
            <style>
                {`
            .service-wrapper {
              cursor: pointer;
              overflow: hidden;
            }
            
            .service-wrapper:hover .service-image {
              transform: scale(1.1);
            }
            
            .service-wrapper:hover .service-title {
              background-color: #000;
              color: rgb(246, 109, 109);
            }
            
            .service-title {
              background-color: rgb(246, 109, 109);
              color: #00;
              padding: 20px;
              max-height: 80px;
              text-align: center;
              font-size: 16px;
              position: relative;
              transition: all 0.6s;
              text-transform: uppercase;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              margin-bottom: 0px;
            }
            
            .service-image {
              aspect-ratio: 4 / 3;
              width: 100%;
              object-fit: cover;
              display: block;
              transition: all 0.6s;
              transform: scale(1);
            }

         
            .add-cart-button {
              width: 100%;
              background-color: rgb(255, 193, 7);
              border-radius: 0px;
              color: #fff;
                .add-cart-icon {
                font-size: 32px !important;
              }
              &:hover {
                background-color: rgb(255,193,7, 0.8);
              }
              &:focus {
                outline: none;
              }
            }
            @media screen and (max-width: 769px) {
              .service-image {
                width: 100%
              }
            }
          `}
            </style>
            <Link to={`/services/${id}`} className="item">
                <img className="service-image" src={imgUrl} alt="service" />
                <h3 className="service-title">{title}</h3>
            </Link>
            <Button className="add-cart-button" >
                <AddShoppingCartIcon className="add-cart-icon" onClick={(e) =>HandleAddToCart(e)}/>
            </Button>
        </div>
    );
};

ServiceItem.propTypes = {
    title: PropTypes.string,
    imgUrl: PropTypes.string,
    onClick: PropTypes.func,
}
