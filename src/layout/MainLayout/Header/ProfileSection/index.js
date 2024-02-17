import { useState, useRef, useEffect } from 'react';

// import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Avatar,
  Box,
  // Chip,
  Button,
  // ClickAwayListener,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Typography,
  Drawer
} from '@mui/material';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
// import MainCard from 'ui-component/cards/MainCard';
// import Transitions from 'ui-component/extended/Transitions';
// import User1 from 'assets/images/users/user-round.svg';
import useUser from 'hooks/useUser';
import useAuth from 'hooks/useAuth';
import useDynamicGreeting from 'hooks/useDynamicGreeting';
import CustomChip from 'ui-component/extended/Chip';

// assets
import { IconLogout, IconSettings } from '@tabler/icons';

// ==============================|| PROFILE MENU ||============================== //

const ProfileSection = () => {
  const user = useUser();
  const theme = useTheme();
  const customization = useSelector((state) => state.customization);
  // const navigate = useNavigate();
  const { logout } = useAuth();
  const greeting = useDynamicGreeting();
  // const [selectedIndex, setSelectedIndex] = useState(-1);
  const [open, setOpen] = useState(false);
  /**
   * anchorRef is used on different componets and specifying one type leads to other components throwing an error
   * */
  const anchorRef = useRef(null);

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  // const handleListItemClick = (event, index, route = '') => {
  //   setSelectedIndex(index);
  //   handleClose(event);

  //   if (route && route !== '') {
  //     navigate(route);
  //   }
  // };
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <Button
        disableRipple
        onClick={handleToggle}
        sx={{
          '&:hover': {
            backgroundColor: 'transparent !important'
          }
        }}
      >
        <Stack direction="row" alignItems="center" gap={1.5}>
          <Avatar
            sx={{
              backgroundColor: theme.palette.secondary.light,
              '& .MuiSvgIcon-root': {
                fill: 'black'
              }
            }}
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            color="secondary"
          />
          <Stack gap={1} alignItems="flex-start">
            <Typography variant="subtitle1" fontWeight={900} lineHeight={1}>
              {user?.userName}
            </Typography>
            <Typography variant="caption" fontSize={theme.typography.subMenuCaption.fontSize}>
              {user?.roleName}
            </Typography>
          </Stack>
        </Stack>
      </Button>
      {/* <Chip
        sx={{
          height: '48px',
          alignItems: 'center',
          borderRadius: '27px',
          transition: 'all .2s ease-in-out',
          borderColor: theme.palette.primary.light,
          backgroundColor: theme.palette.primary.light,
          '&[aria-controls="menu-list-grow"], &:hover': {
            borderColor: theme.palette.primary.main,
            background: `${theme.palette.primary.main}!important`,
            color: theme.palette.primary.light,
            '& svg': {
              stroke: theme.palette.primary.light
            }
          },
          '& .MuiChip-label > ': {
            color: theme.palette.primary.main
          },
          '&:hover .MuiChip-label > *': {
            color: theme.palette.primary.light
          }
        }}
        icon={
          
        }
        // label={<IconSettings stroke={1.5} size="1.5rem" color={theme.palette.primary.main} />}
        // label={
        //   <Stack gap={1}>
        //     <Typography variant="subtitle1" color="inherit" fontWeight={900} lineHeight={1}>
        //       {user?.userName}
        //     </Typography>
        //     <Typography variant="caption" fontSize={theme.typography.subMenuCaption.fontSize} color="inherit">
        //       {user?.roleName}
        //     </Typography>
        //   </Stack>
        // }
        variant="outlined"
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        color="primary"
      /> */}
      <Drawer anchor="right" open={open} role={undefined} onClose={handleClose} transitionDuration={300}>
        <Paper>
          <Box sx={{ p: 2 }}>
            <Stack direction="row" spacing={0.5} alignItems="center">
              <Typography variant="h4">{greeting},</Typography>
              <Typography component="span" variant="h4" textTransform="capitalize" sx={{ fontWeight: 400 }}>
                {user?.userName}
              </Typography>
            </Stack>
          </Box>
          <Divider />
          <PerfectScrollbar style={{ height: '100%', overflowX: 'hidden' }}>
            <Box sx={{ p: 2, pt: 0, height: '100%' }}>
              <List
                component="nav"
                sx={{
                  width: '100%',
                  height: '100%',
                  maxWidth: 350,
                  minWidth: 300,
                  backgroundColor: theme.palette.background.paper,
                  borderRadius: '10px',
                  [theme.breakpoints.down('md')]: {
                    minWidth: '100%'
                  },
                  '& .MuiListItemButton-root': {
                    mt: 0.5
                  }
                }}
              >
                <ListItemButton
                  sx={{
                    borderRadius: `${customization.borderRadius}px`,
                    '&:hover': {
                      backgroundColor: theme.palette.primary.dark,
                      color: theme.palette.grey[50],
                      '& svg': {
                        color: theme.palette.grey[50]
                      },
                      '& .MuiTypography-root': {
                        color: theme.palette.grey[50]
                      }
                    },
                    '&:hover .MuiChip-root': {
                      backgroundColor: theme.palette.primary.light
                    },
                    '&:hover .MuiChip-label': {
                      color: theme.palette.primary.dark
                    }
                  }}
                  // selected={selectedIndex === 0}
                  // onClick={(event) => handleListItemClick(event, 0, '#')}
                >
                  <ListItemIcon>
                    <IconSettings stroke={1.5} size="1.3rem" />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Stack direction="row" alignItems="center" gap={1.5}>
                        <Typography variant="body2" color="inherit">
                          Account Settings
                        </Typography>
                        <CustomChip
                          skin="light"
                          size="small"
                          label={'coming soon'}
                          color="primary"
                          sx={{ textTransform: 'capitalize', ml: 1 }}
                        />
                      </Stack>
                    }
                  />
                </ListItemButton>
                <ListItemButton
                  sx={{
                    borderRadius: `${customization.borderRadius}px`,
                    '&:hover': {
                      backgroundColor: theme.palette.primary.dark,
                      color: theme.palette.grey[50],
                      '& svg': {
                        color: theme.palette.grey[50]
                      }
                    }
                  }}
                  // selected={selectedIndex === 4}
                  onClick={logout}
                >
                  <ListItemIcon>
                    <IconLogout stroke={1.5} size="1.3rem" />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="body2" color="inherit">
                        Logout
                      </Typography>
                    }
                  />
                </ListItemButton>
              </List>
            </Box>
          </PerfectScrollbar>
        </Paper>
      </Drawer>
    </>
  );
  //   <>
  //     <Chip
  //       sx={{
  //         height: '48px',
  //         alignItems: 'center',
  //         borderRadius: '27px',
  //         transition: 'all .2s ease-in-out',
  //         borderColor: theme.palette.primary.light,
  //         backgroundColor: theme.palette.primary.light,
  //         '&[aria-controls="menu-list-grow"], &:hover': {
  //           borderColor: theme.palette.primary.main,
  //           background: `${theme.palette.primary.main}!important`,
  //           color: theme.palette.primary.light,
  //           '& svg': {
  //             stroke: theme.palette.primary.light
  //           }
  //         },
  //         '& .MuiChip-label > ': {
  //           color: theme.palette.primary.main
  //         },
  //         '&:hover .MuiChip-label > *': {
  //           color: theme.palette.primary.light
  //         }
  //       }}
  //       icon={
  //         <Avatar
  //           src={User1}
  //           sx={{
  //             ...theme.typography.mediumAvatar,
  //             margin: '8px 0 8px 8px !important'
  //             // cursor: 'pointer'
  //           }}
  //           ref={anchorRef}
  //           aria-controls={open ? 'menu-list-grow' : undefined}
  //           aria-haspopup="true"
  //           color="inherit"
  //         />
  //       }
  //       // label={<IconSettings stroke={1.5} size="1.5rem" color={theme.palette.primary.main} />}
  //       label={
  //         <Stack>
  //           <Typography variant="subtitle1" color="inherit" fontWeight={900} lineHeight={1}>
  //             John Doe
  //           </Typography>
  //           <Typography variant="caption" fontSize={theme.typography.subMenuCaption.fontSize} color="inherit">
  //             Project Admin
  //           </Typography>
  //         </Stack>
  //       }
  //       variant="outlined"
  //       ref={anchorRef}
  //       aria-controls={open ? 'menu-list-grow' : undefined}
  //       aria-haspopup="true"
  //       onClick={handleToggle}
  //       color="primary"
  //     />
  //     <Popper
  //       placement="bottom-end"
  //       open={open}
  //       anchorEl={anchorRef.current}
  //       role={undefined}
  //       transition
  //       disablePortal
  //       popperOptions={{
  //         modifiers: [
  //           {
  //             name: 'offset',
  //             options: {
  //               offset: [0, 14]
  //             }
  //           }
  //         ]
  //       }}
  //     >
  //       {({ TransitionProps }) => (
  //         <Transitions in={open} {...TransitionProps}>
  //           <Paper>
  //             <ClickAwayListener onClickAway={handleClose}>
  //               <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
  //                 <Box sx={{ p: 2 }}>
  //                   <Stack>
  //                     <Stack direction="row" spacing={0.5} alignItems="center">
  //                       <Typography variant="h4">Good Morning,</Typography>
  //                       <Typography component="span" variant="h4" sx={{ fontWeight: 400 }}>
  //                         Johne Doe
  //                       </Typography>
  //                     </Stack>
  //                     <Typography variant="subtitle2">Project Admin</Typography>
  //                   </Stack>
  //                 </Box>
  //                 <Divider />
  //                 <PerfectScrollbar style={{ height: '100%', maxHeight: 'calc(100vh - 250px)', overflowX: 'hidden' }}>
  //                   <Box sx={{ p: 2, pt: 0 }}>
  //                     <List
  //                       component="nav"
  //                       sx={{
  //                         width: '100%',
  //                         maxWidth: 350,
  //                         minWidth: 300,
  //                         backgroundColor: theme.palette.background.paper,
  //                         borderRadius: '10px',
  //                         [theme.breakpoints.down('md')]: {
  //                           minWidth: '100%'
  //                         },
  //                         '& .MuiListItemButton-root': {
  //                           mt: 0.5
  //                         }
  //                       }}
  //                     >
  //                       <ListItemButton
  //                         sx={{ borderRadius: `${customization.borderRadius}px` }}
  //                         selected={selectedIndex === 0}
  //                         onClick={(event) => handleListItemClick(event, 0, '#')}
  //                       >
  //                         <ListItemIcon>
  //                           <IconSettings stroke={1.5} size="1.3rem" />
  //                         </ListItemIcon>
  //                         <ListItemText primary={<Typography variant="body2">Account Settings</Typography>} />
  //                       </ListItemButton>
  //                       <ListItemButton
  //                         sx={{ borderRadius: `${customization.borderRadius}px` }}
  //                         selected={selectedIndex === 4}
  //                         onClick={handleLogout}
  //                       >
  //                         <ListItemIcon>
  //                           <IconLogout stroke={1.5} size="1.3rem" />
  //                         </ListItemIcon>
  //                         <ListItemText primary={<Typography variant="body2">Logout</Typography>} />
  //                       </ListItemButton>
  //                     </List>
  //                   </Box>
  //                 </PerfectScrollbar>
  //               </MainCard>
  //             </ClickAwayListener>
  //           </Paper>
  //         </Transitions>
  //       )}
  //     </Popper>
  //   </>
  // );
};

export default ProfileSection;
