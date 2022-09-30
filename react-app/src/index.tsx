import { render } from 'react-dom';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import routers from './router';
import PageContainer from './components/PageContainer';
import 'antd/dist/antd.less';
require('./assets/style/common.css');

function App() {
  /**
   * Get router element
   * @param {Object} router data
   * @returns {element} Route element html
   */
  const getElement = (router: any) => {
    if (router.element && router.noLayout) {
      return router.element;
    }
    if (router.element) {
      return <PageContainer>{router.element}</PageContainer>;
    }
    return null;
  };

  /**
   * Load route html
   * @param {array} routeList data
   * @returns {element} Route html
   */
  const getRouter = (routeList: Array<any>) =>
    routeList.map((router, index) => {
      if (router.redirect) {
        return (
          <Route
            key={`route-${router.path}-${index}`}
            path={router.path}
            element={<Navigate to={router.redirect} />}
          />
        );
      }
      if (!router.children) {
        return (
          <Route
            key={`route-${router.path}-${index}`}
            path={router.path}
            element={getElement(router)}
          />
        );
      }
      return (
        <Route key={`route-${router.path}-${index}`} path={router.path}>
          {getRouter(router.children)}
          <Route index element={getElement(router)}></Route>
        </Route>
      );
    });

  return (
    <HashRouter>
      {/* Routes start */}
      <Routes>{getRouter(routers)}</Routes>
      {/* Routes end */}
    </HashRouter>
  );
}

render(<App />, document.getElementById('react-mount-point'));
