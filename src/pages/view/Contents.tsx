import React from 'react';
import {
  Typography
} from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => createStyles({
  wrapper: {
    padding: theme.spacing(3),

  },
  content: {
    flexGrow: 1,
    overflowY: 'scroll',
    height: '100%'
  }
}));

const Contents: React.VFC = () => {
  const classes = useStyles();

  return (
    <div className={classes.content}>
      <Typography paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
        dolor purus non enim praesent elementum facilisis leo vel. Risus at
        ultrices mi tempus imperdiet. Semper risus in hendrerit gravida
        rutrum quisque non tellus. Convallis convallis tellus id interdum
        velit laoreet id donec ultrices. Odio morbi quis commodo odio aenean
        sed adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
        integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
        eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
        quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
        vivamus at augue. At augue eget arcu dictum varius duis at
        consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
        donec massa sapien faucibus et molestie ac.
      </Typography>
      <Typography paragraph>
        Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
        ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
        elementum integer enim neque volutpat ac tincidunt. Ornare
        suspendisse sed nisi lacus sed viverra tellus. Purus sit amet
        volutpat consequat mauris. Elementum eu facilisis sed odio morbi.
        Euismod lacinia at quis risus sed vulputate odio. Morbi tincidunt
        ornare massa eget egestas purus viverra accumsan in. In hendrerit
        gravida rutrum quisque non tellus orci ac. Pellentesque nec nam
        aliquam sem et tortor. Habitant morbi tristique senectus et.
        Adipiscing elit duis tristique sollicitudin nibh sit. Ornare aenean
        euismod elementum nisi quis eleifend. Commodo viverra maecenas
        accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam
        ultrices sagittis orci a.
      </Typography>
      <Typography paragraph>
        Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
        ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
        elementum integer enim neque volutpat ac tincidunt. Ornare
        suspendisse sed nisi lacus sed viverra tellus. Purus sit amet
        volutpat consequat mauris. Elementum eu facilisis sed odio morbi.
        Euismod lacinia at quis risus sed vulputate odio. Morbi tincidunt
        ornare massa eget egestas purus viverra accumsan in. In hendrerit
        gravida rutrum quisque non tellus orci ac. Pellentesque nec nam
        aliquam sem et tortor. Habitant morbi tristique senectus et.
        Adipiscing elit duis tristique sollicitudin nibh sit. Ornare aenean
        euismod elementum nisi quis eleifend. Commodo viverra maecenas
        accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam
        ultrices sagittis orci a.
      </Typography>
    </div>
  );
};

export default Contents;
