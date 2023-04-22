import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import FacebookIcon from '@mui/icons-material/Facebook';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import ShareIcon from '@mui/icons-material/Share';
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
  const [customOutline, setCustomOutline] = useState({});
  const [customOutlineBool, setCustomOutlineBool] = useState(true);
  // const [file, setFile] = useState('./file-example_PDF_1MB.pdf');
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const testOutlineInput = (ref: any) => {
    // debugger;
    if (ref && ref.childNodes && ref.childNodes[0]) {
      const dummy = testFunction(ref.childNodes[0]);
      setCustomOutline(dummy);
      setCustomOutlineBool(false);
    } else {
      return;
    }
    // console.log(dummy);
    const jsx = (
      <SubMenu label="level1">
        <MenuItem
          rootStyles={{
            backgroundColor: '#027983',
            color: 'white',
          }}
        >
          <a href="#">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac
            faucibus odio.
          </a>
        </MenuItem>

        <SubMenu
          label="chapter2"
          rootStyles={{
            backgroundColor: '#027983',
            color: 'white',
          }}
        >
          <MenuItem
            rootStyles={{
              backgroundColor: '#027983',
              color: 'white',
            }}
          >
            <a href="#">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac
              faucibus odio.
            </a>
          </MenuItem>
        </SubMenu>
      </SubMenu>
    );
  };

  const test = (outline: any) => {
    // console.log(outline);
    // debugger;
    // const dummy = testFunction();
    // console.log(dummy);
    // setCustomOutline(testFunction());
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleShareProject = () => {
    setBookmark(!bookmark);
  };

  const testFunction = (ul: any) => {
    if (!ul) {
      return null;
    }
    const sidebarOutlineJsx: any = [];
    ul.childNodes.forEach((element: any) => {
      sidebarOutlineJsx.push(element.childNodes[0]);
      if (element.childNodes.length > 1) {
        testFunction(element.childNodes[1]);
      }
    });
    return { list: sidebarOutlineJsx };
  };

  // const testFunction = (ul?: any) => {
  //   if (!ul) {
  //     if (
  //       $('.react-pdf__Outline') &&
  //       $('.react-pdf__Outline').childNodes &&
  //       $('.react-pdf__Outline').childNodes[0]
  //     ) {
  //       ul = $('.react-pdf__Outline').childNodes[0];
  //     } else {
  //       return null;
  //     }
  //   }
  //   const sidebarOutlineJsx: any = [];
  //   ul.childNodes.forEach((element: any) => {
  //     // console.log(element.childNodes[0]);
  //     sidebarOutlineJsx.push(
  //       <MenuItem
  //         rootStyles={{
  //           backgroundColor: '#027983',
  //           color: 'white',
  //         }}
  //       >
  //         {[element.childNodes[0]]}
  //       </MenuItem>
  //     );
  //     if (element.childNodes.length > 1) {
  //       testFunction(element.childNodes[1]);
  //     }
  //   });
  //   return <SubMenu> {sidebarOutlineJsx} </SubMenu>;
  // };

  const buildOutlineInSidebar = () => {
    // $('.react-pdf__Outline').childNodes[0].childNodes.forEach((element) => {
    //   console.log(element);
    // });

    const jsx = (
      <SubMenu label="level1">
        <MenuItem
          rootStyles={{
            backgroundColor: '#027983',
            color: 'white',
          }}
        >
          chapter 1
        </MenuItem>

        <SubMenu
          label="chapter2"
          rootStyles={{
            backgroundColor: '#027983',
            color: 'white',
          }}
        >
          <MenuItem
            rootStyles={{
              backgroundColor: '#027983',
              color: 'white',
            }}
          >
            chapter 2 page 1
          </MenuItem>
        </SubMenu>
      </SubMenu>
    );
    return jsx;
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
            <ShareIcon
              aria-describedby={id}
              variant="contained"
              onClick={handleClick}
            />
          </MenuItem>
          {/* <SubMenu label="Outline">
            <MenuItem rootStyles={{ '&:hover': { backgroundColor: 'none' } }}>
              <Document file={props.file} className="flex justify-center">
                {customOutlineBool && (
                  <Outline
                    inputRef={(ref) => testOutlineInput(ref)}
                    onItemClick={props?.jumpToOutline}
                    onLoadSuccess={(outline) => test(outline)}
                  />
                )}
              </Document>
            </MenuItem>
          </SubMenu> */}
          {/* {Object.keys(customOutline)?.map((item) =>
            customOutline[item]?.map((element: any) => <p>{element.text}</p>)
          )} */}
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
                  file={props?.file}
                  onItemClick={props?.jumpToOutline}
                  onLoadError={(error) =>
                    alert(
                      `Error while retrieving the outline! ${error.message}`
                    )
                  }
                />
              </Document>
              {/* <Outline
                file={props?.file}
                onItemClick={props?.jumpToOutline}
                onLoadError={(error) =>
                  alert(`Error while retrieving the outline! ${error.message}`)
                }
              /> */}
            </MenuItem>
          </SubMenu>

          {/* <section>
            <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
              <Drawer variant="persistent" anchor="left" open={true}>
                <Outline onItemClick={clickTOC} />
              </Drawer>
            </Document>
          </section> */}
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
