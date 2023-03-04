import React from 'react';
import { Sidebar, Menu, MenuItem, useProSidebar } from 'react-pro-sidebar';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

function SideBar() {
  const { collapseSidebar } = useProSidebar();

  return (
    <div style={{ display: 'flex'}}>
      <Sidebar backgroundColor='#35493f' breakPoint='md' rootStyles={{color: 'white'}}>
        <Menu>
          <MenuItem> Documentation</MenuItem>
          <MenuItem> Calendar</MenuItem>
          <MenuItem> E-commerce</MenuItem>
        </Menu>
      </Sidebar>
      <main>
        <button onClick={() => collapseSidebar()}><MenuOpenIcon className='text-white'/></button>
      </main>
    </div>
  );
}

export default SideBar;