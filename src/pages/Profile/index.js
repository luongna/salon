import { useSelector } from 'react-redux';

function Profile() {
    const user = useSelector((state) => state.auth.login?.currenUser);

    return (
        <>
            {!user ? (
                <h1>Không có data</h1>
            ) : (
                <div className="container" style={{ marginTop: '20px' }}>
                    <div className="row">
                        <div className="col-lg-12 mb-4 mb-sm-5">
                            <div className="card card-style1 border-0">
                                <div className="card-body p-1-9 p-sm-2-3 p-md-6 p-lg-7">
                                    <div className="row align-items-center">
                                        <div className="col-lg-6 mb-4 mb-lg-0">
                                            <img src={user.img} alt="avatar" style={{width:'400px',height:'400px'}}/>
                                        </div>
                                        <div className="col-lg-6 px-xl-10">
                                            <div className=" d-lg-inline-block py-1-9 px-1-9 px-sm-6 mb-1-9 rounded">
                                                <h3 className="h2  mb-0">{user.name}</h3>
                                            </div>
                                            <ul className="list-unstyled mb-1-9">
                                                <li className="mb-2 mb-xl-3 display-28">
                                                    <span className=" text-secondary me-2 font-weight-600">
                                                        Ngày sinh:
                                                    </span>{' '}
                                                    10 Years
                                                </li>
                                                <li className="mb-2 mb-xl-3 ">
                                                    <span className=" text-secondary me-2 font-weight-600">Email:</span>{' '}
                                                    edith@mail.com
                                                </li>

                                                <li className="">
                                                    <span className=" text-secondary me-2 font-weight-600">
                                                        Số điện thoại:
                                                    </span>{' '}
                                                    {user.phone}
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Profile;
