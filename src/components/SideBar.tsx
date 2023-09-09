/* eslint-disable no-alert */
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import FacebookIcon from '@mui/icons-material/Facebook';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
// import ShareIcon from '@mui/icons-material/Share';
import TwitterIcon from '@mui/icons-material/Twitter';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { Document, Outline } from 'react-pdf';
import {
  Menu,
  menuClasses,
  MenuItem,
  Sidebar,
  SubMenu,
  useProSidebar,
} from 'react-pro-sidebar';

const SideBar = (props: any) => {
  const { collapseSidebar } = useProSidebar();
  const [bookmark, setBookmark] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  // const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleShareProject = () => {
    setBookmark(!bookmark);
  };

  useEffect(() => {
    // set bookmark state
  }, []);

  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      <Sidebar
        backgroundColor="#35493f"
        breakPoint="md"
        rootStyles={{ color: 'white', width: '300px' }}
        collapsedWidth="5px"
      >
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <Typography sx={{ p: 2 }}>
            <ContentCopyIcon className="text-theme-green" />
            <FacebookIcon className="text-theme-green" />
            <TwitterIcon className="text-theme-green" />
          </Typography>
        </Popover>
        <Menu>
          <MenuItem
            suffix={
              bookmark ? (
                <BookmarkIcon onClick={handleShareProject} />
              ) : (
                <BookmarkBorderIcon onClick={handleShareProject} />
              )
            }
            rootStyles={{
              [`& > .${menuClasses.button}`]: {
                backgroundColor: '#35493f',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#35493f',
                  color: '#35493f',
                },
              },
              [`.${menuClasses.subMenuContent}`]: {
                backgroundColor: '#3d5348',
                '&:hover': {
                  backgroundColor: '#35493f',
                },
              },
            }}
          >
            Project Name{' '}
            {/* <ShareIcon
              aria-describedby={id}
              variant="contained"
              onClick={handleClick}
            /> */}
          </MenuItem>
          <SubMenu
            label="Outline"
            rootStyles={{
              [`& > .${menuClasses.button}`]: {
                backgroundColor: '#35493f',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#35493f',
                  color: '#35493f',
                },
              },
              [`.${menuClasses.subMenuContent}`]: {
                backgroundColor: '#3d5348',
                '&:hover': {
                  backgroundColor: '#35493f',
                },
              },
            }}
          >
            <MenuItem
              className="menuItemOutline"
              rootStyles={{ backgroundColor: '#3d5348', width: 'auto' }}
            >
              <Document file={props.file} className="flex justify-center">
                <Outline
                  onItemClick={props?.jumpToOutline}
                  onLoadError={(error) =>
                    alert(
                      `Error while retrieving the outline! ${error.message}`
                    )
                  }
                />
              </Document>
            </MenuItem>
          </SubMenu>
        </Menu>
      </Sidebar>
      <main>
        <button onClick={() => collapseSidebar()}>
          <MenuOpenIcon className="text-white" />
        </button>
      </main>
    </div>
  );
};

export default dynamic(() => Promise.resolve(SideBar), {
  ssr: false,
});
