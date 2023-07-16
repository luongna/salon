import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import { DefaultLayout, LayoutAdmin } from '~/components/Layout';
import { useSelector } from 'react-redux';
import AccessDeny from './pages/Admin/Status/accessDeny';
import isAdmin from '~/utils/jwt';
function App() {
    const user = useSelector((state) => state.auth.login?.currenUser);
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        let Page = route.component;
                        let Layout = DefaultLayout;

                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.admin === true) {
                            
                            if (user) {
                                if (!isAdmin(user.accessToken)) {
                                    Layout = Fragment;
                                    Page = AccessDeny;
                                }else{
                                    Layout = LayoutAdmin;
                                }
                            }else{
                                Layout = Fragment;
                                Page = AccessDeny;
                            }
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }
                      
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
