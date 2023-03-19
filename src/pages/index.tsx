import React from 'react';
import { ProSidebarProvider } from 'react-pro-sidebar';

import Header from '@/components/Header';
import PDFReader from '@/components/PDFReader';
// import SideBar from '@/components/SideBar';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

const Index = () => {
  return (
    <ProSidebarProvider>
      <Main
        meta={
          <Meta
            title="Next.js Boilerplate Presentation"
            description="Next js Boilerplate is the perfect starter code for your project. Build your React application with the Next.js framework."
          />
        }
      >
        <Header />
        <PDFReader />
      </Main>
    </ProSidebarProvider>
  );
};

export default Index;
