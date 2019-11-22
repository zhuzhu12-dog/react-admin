import Home from '../components/home';
import Login from '../containers/login';
import NotMatch from '../components/not-match';
const authRoutes = [{
    path: '/',
    component: Home,
    exact: true
},
{
    component: NotMatch,
},
] 
const noAuthRoutes = [{
    path: '/login',
    component: Login,
    exact: true
}]
export {
    authRoutes,
    noAuthRoutes
}