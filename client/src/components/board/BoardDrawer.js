import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Moment from 'react-moment';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import CloseIcon from '@material-ui/icons/Close';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ArchiveIcon from '@material-ui/icons/Archive';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import CodeIcon from '@material-ui/icons/Code';
import CreateIcon from '@material-ui/icons/Create';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import ArchivedLists from './ArchivedLists';
import ArchivedCards from './ArchivedCards';
import useStyles from '../../utils/drawerStyles';
// link ="https://chat.whatsapp.com/F2jrTCPviD066Dqr6M0k9S"
const BoardDrawer = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [viewingArchivedLists, setViewingArchivedLists] = useState(false);
  const [viewingArchivedCards, setViewingArchivedCards] = useState(false);
  const [ide, setIde] = useState(false);
  const [activityChunks, setActivityChunks] = useState(1);
  const activity = useSelector((state) => state.board.board.activity);

  const handleClose = () => {
    setOpen(false);
    setActivityChunks(1);
  };

  const handleIdeClick = () =>{
    const url = 'https://vscode.dev/';
    window.open(url, '_blank');
  }

  const handleMeetClick = () =>{
    const url = 'https://meet.new/';
    window.open(url, '_blank');
  }

  const handleWhatsappClick = () =>{
    const url = 'https://chat.whatsapp.com/HDIvUKPJAP5GfN4qpAesam';
    window.open(url, '_blank');
  }
  const handleJamboardClick = () =>{
    const url = 'https://jamboard.google.com/d/1Q4xrYedlrXAwFZhVvUKvpuXNyUGENuCX7Dd4ENxaTt8/edit?usp=sharing';
    window.open(url, '_blank');
  }


  return (
    <div>
      <Button
        onClick={() => setOpen(true)}
        variant='contained'
        className={open ? classes.hide : classes.showMenuButton}
      >
        <MoreHorizIcon fontSize='small' /> Show Menu
      </Button>
      <Drawer
        className={open ? classes.drawer : classes.hide}
        variant='persistent'
        anchor='right'
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        {!viewingArchivedLists && !viewingArchivedCards ? (
          <div>
            <div className={classes.drawerHeader}>
              <h3>Menu</h3>
              <Button onClick={handleClose}>
                <CloseIcon />
              </Button>
            </div>
            <Divider />
            <List>
              
              <ListItem button onClick={handleIdeClick}>
                <ListItemIcon>
                  {<CodeIcon />}
                </ListItemIcon>
                <ListItemText primary={'IDE'} />
              </ListItem>
              <ListItem button onClick={handleWhatsappClick}>
                <ListItemIcon>
                  {<WhatsAppIcon/>}
                </ListItemIcon>
                <ListItemText primary={'Join Whatsapp Group'} />
              </ListItem>
              <ListItem button onClick={handleMeetClick}>
                <ListItemIcon>
                  {<VideoCallIcon/>}
                </ListItemIcon>
                <ListItemText primary={'Create New Google Meet'} />
              </ListItem>
              <ListItem button onClick={handleJamboardClick}>
                <ListItemIcon>
                  {<CreateIcon/>}
                </ListItemIcon>
                <ListItemText primary={'Open New Jamboard'} />
              </ListItem>
              <ListItem button onClick={() => setViewingArchivedLists(true)}>
                <ListItemIcon>
                  <ArchiveIcon />
                </ListItemIcon>
                <ListItemText primary={'Archived Lists'} />
              </ListItem>
              <ListItem button onClick={() => setViewingArchivedCards(true)}>
                <ListItemIcon>
                  <ArchiveIcon />
                </ListItemIcon>
                <ListItemText primary={'Archived Cards'} />
              </ListItem>
            </List>
            <Divider />
            <div className={classes.activityTitle}>
              <h3>Activity</h3>
            </div>
            <List>
              {activity.slice(0, activityChunks * 10).map((activity) => (
                <ListItem key={activity._id}>
                  <ListItemText
                    primary={activity.text}
                    secondary={<Moment fromNow>{activity.date}</Moment>}
                  />
                </ListItem>
              ))}
            </List>
            <div className={classes.viewMoreActivityButton}>
              <Button
                disabled={activityChunks * 10 > activity.length}
                onClick={() => setActivityChunks(activityChunks + 1)}
              >
                View More Activity
              </Button>
            </div>
          </div>
        ) : viewingArchivedLists ? (
          <div>
            <div className={classes.drawerHeader}>
              <Button onClick={() => setViewingArchivedLists(false)}>
                <ChevronLeftIcon />
              </Button>
              <h3>Archived Lists</h3>
              <Button onClick={handleClose}>
                <CloseIcon />
              </Button>
            </div>
            <Divider />
            <ArchivedLists />
          </div>
        ) : (
          <div>
            <div className={classes.drawerHeader}>
              <Button onClick={() => setViewingArchivedCards(false)}>
                <ChevronLeftIcon />
              </Button>
              <h3>Archived Cards</h3>
              <Button onClick={handleClose}>
                <CloseIcon />
              </Button>
            </div>
            <Divider />
            <ArchivedCards />
          </div>
        )}
        <Divider />
      </Drawer>
    </div>
  )
};

export default BoardDrawer;
