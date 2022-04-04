import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { db } from '../../firebase';
import LodingGrid from 'components/LodingGrid';
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Avatar,
  Toolbar,
  Typography,
  Grid,
} from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import UserInfomation from 'components/UserInfomation';

type UserRecord = {
  uid: string;
  email: string;
  username: string;
  role: string;
  photoURL: string;
  state: string;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  imageLoading: {
    display: "none"
  },
  gridContainer: {
    height: "100%"
  },
  gridItem: {
    border: "1px solid #DADEE0",
    backgroundColor: "white",
  },
  selectedItem: {
    width: "calc(100% - 350px)",
    marginRight: "10px",
  },
  notSelectedItem: {
    width: "100%"
  },
  toolbar: {
    borderBottom: "1px solid #DADEE0",
    minHeight: "44px"
  },
  tableHeadRow: {
    "& > .MuiTableCell-root": {
      height: "55px",
      borderBottom: "1px solid #5ccce7",
      backgroundColor: "#F4F5F9",
    },
  },
  tableBodyRow: {
    "&.Mui-selected, &.Mui-selected:hover": {
      boxShadow: "inset 2px 0 #1ca1c1",
      backgroundColor: "#f4f5f9",
    },
    "& > .MuiTableCell-root": {
      padding: "7px"
    },
  },
  statusBadge: {
    height: "17px",
    lineHeight: "17px",
    borderRadius: "8px",
    padding: "3px 12px",
    fontSize: "14px",
    fontWeight: 500,
  },
  statusBadgeActive: {
    backgroundColor: "#d4ede5",
    color: "#55cd97",
  },
  statusBadgeNoActive: {
    backgroundColor: "#ffdedb",
    color: "#ff6455",
  },
  avatarCell: {
    width: "55px"
  }
}));

const UserManager: React.VFC = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState("");
  const [users, setUsers] = useState<UserRecord[]>([]);

  const counter = useRef(0);
  const imageLoaded = (users: UserRecord[]) => {
    counter.current += 1;
    if (counter.current >= users.length) {
      setLoading(false);
    }
  }

  useEffect(() => {
    const unsub = db
      .collection("users")
      .onSnapshot((snapshot) => {
        setUsers(
          snapshot.docs.map((doc) => ({
            uid: doc.id,
            email: doc.data().email,
            username: doc.data().username,
            role: doc.data().role,
            photoURL: doc.data().photoURL,
            state: doc.data().state
          }))
        );
      });
    return () => {
      unsub();
    }
  }, []);

  return (
    <>
      <Grid
        container
        className={classes.gridContainer}
      >
        <Grid item className={clsx(classes.gridItem, {
          [classes.selectedItem]: selected !== "",
          [classes.notSelectedItem]: selected === ""
        })}>
          <Toolbar variant="dense" className={classes.toolbar}>
            <Typography variant="h6" noWrap>
              Users
            </Typography>
          </Toolbar>
          {loading && <LodingGrid type="bubbles" height={"5%"} width={"5%"} delay={10} />}
          <Table className={clsx({ [classes.imageLoading]: loading })}>
            <TableHead>
              <TableRow className={classes.tableHeadRow}>
                <TableCell className={classes.avatarCell}></TableCell>
                <TableCell>ユーザー名</TableCell>
                <TableCell>ステータス</TableCell>
                <TableCell>権限</TableCell>
                <TableCell>メールアドレス</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow
                  key={user.uid}
                  onClick={() => setSelected(user.uid)}
                  aria-checked={selected === user.uid}
                  selected={selected === user.uid}
                  className={classes.tableBodyRow}
                >
                  <TableCell>
                    <Avatar
                      src={user.photoURL}
                      alt={user.username}
                      imgProps={{
                        onLoad: () => imageLoaded(users),
                        onError: () => imageLoaded(users),
                      }}
                    />
                  </TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>
                    <span className={clsx(classes.statusBadge, {
                      [classes.statusBadgeActive]: user.state === "online",
                      [classes.statusBadgeNoActive]: user.state === "offline"
                    })}>
                      {user.state === "online" ? "Active" : "Not Active"}
                    </span>
                  </TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
        {selected && <UserInfomation uid={selected} />}
      </Grid>
    </>
  );
};

export default UserManager;
