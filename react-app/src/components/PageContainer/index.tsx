import React from 'react';
import GlobalHeader from '../../components/GlobalHeader';
import GlobalFooter from '../../components/GlobalFooter';
import GlobalMenu from '../../components/GlobalMenu';
import styles from './style.module.less';

export type PageContainerProps = {};

const PageContainer: React.FC<PageContainerProps> = (props) => {
  return (
    <>
      <GlobalHeader />
      <div className={styles.pageContainer}>
        <div className="pageMenu">
          <GlobalMenu />
        </div>
        <div className="pageContent">
          <main>{props.children}</main>
          <GlobalFooter />
        </div>
      </div>
    </>
  );
};

export default PageContainer;
