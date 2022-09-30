import Login from '../pages/login';
import Register from '../pages/register';
import FundList from '../pages/fundList';
import PersonalCenter from '../pages/personalCenter';
import NoFoundPage from '../pages/404';

interface router {
  path?: string;
  element?: any;
  redirect?: string;
  noLayout?: boolean;
}

const routers: Array<router> = [
  //   {
  // path: '/',
  // element: <Dashboard />,
  // children: [
  //   {
  //     path: 'messages',
  //     element: <DashboardMessages />,
  //   },
  //   { path: 'tasks', element: <DashboardTasks /> },
  // ],
  //   },
  {
    path: '/login',
    element: <Login />,
    noLayout: true,
  },
  {
    path: '/register',
    element: <Register />,
    noLayout: true,
  },
  {
    path: '/fundList',
    element: <FundList />,
  },
  {
    path: '/personalCenter',
    element: <PersonalCenter />,
  },
  {
    path: '/',
    redirect: '/signIn',
  },
  {
    path: '*',
    element: <NoFoundPage />,
  },
];
export default routers;
