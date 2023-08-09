import RegisterForm from './registerForm';
import logo from '~/assets/images/logo2.png';

const RegisterPage = () => {
    return (
        <section className="vh-100 w-90">
            <div className="container-fluid h-custom">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-9 col-lg-6 col-xl-5 back">
                        <img src={logo} className="img-fluid" alt="Sample " />
                    </div>
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                        <RegisterForm />
                    </div>
                </div>
            </div>
        </section>
    );
};
export default RegisterPage;
