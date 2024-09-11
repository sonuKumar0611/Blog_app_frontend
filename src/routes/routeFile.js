import { lazy } from 'react';
import AddBlog from '../components/add_blog';
import GetBlog from '../components/blog';

const BlogHome = lazy(() => import('../components/blog_home'));
const Login = lazy(() => import('../components/login'));
const Signup = lazy(() => import('../components/signup'));


const routes = [
    {
        path: '/',
        exact: true,
        name: 'Login',
        component: Login,
        private: false,
    },
    {
        path: '/login',
        exact: true,
        name: 'Login',
        component: Login,
        private: false,
    },
    {
        path: '/signup',
        exact: true,
        name: 'Signup',
        component: Signup,
        private: false,
    },
    {
        path: '/blogs',
        exact: true,
        name: 'Blogs',
        component: BlogHome,
        private: false,
    },
    {
        path: '/blogs/add',
        exact: true,
        name: 'BlogsAdd',
        component: AddBlog,
        private: false,
    },
    {
        path: '/blogs/:blog_id',
        exact: true,
        name: 'GetBlog',
        component: GetBlog,
        private: false,
    },
];

export default routes;
