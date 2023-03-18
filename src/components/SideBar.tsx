import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import FacebookIcon from '@mui/icons-material/Facebook';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import ShareIcon from '@mui/icons-material/Share';
import TwitterIcon from '@mui/icons-material/Twitter';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import { Menu, MenuItem, Sidebar, useProSidebar } from 'react-pro-sidebar';

function SideBar() {
  const { collapseSidebar } = useProSidebar();
  const [bookmark, setBookmark] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

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
    <div style={{ display: 'flex' }}>
      <Sidebar
        backgroundColor="#35493f"
        breakPoint="md"
        rootStyles={{ color: 'white' }}
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
            className=" flex flex-row	"
          >
            Project Name{' '}
            <ShareIcon
              aria-describedby={id}
              variant="contained"
              onClick={handleClick}
            />
          </MenuItem>
          <MenuItem
            rootStyles={{ '&:hover': { backgroundColor: 'black!important' } }}
          >
            {' '}
            Test Title
          </MenuItem>
          <MenuItem> Test Content</MenuItem>
          <MenuItem> Test Content</MenuItem>
          <MenuItem> Test Content</MenuItem>
          <MenuItem> Test Content</MenuItem>
          <MenuItem> Test Content</MenuItem>
        </Menu>
      </Sidebar>
      <main>
        <button onClick={() => collapseSidebar()}>
          <MenuOpenIcon className="text-white" />
        </button>
      </main>
    </div>
  );
}

export default SideBar;
