import { Request, Response } from "express";
import jsftp from "jsftp";

var ftp: jsftp | null = null;

// interface ExRequest extends Request {
//   body: {
//     host: string;
//     user: string;
//     pass: string;
//   };
// }

// type FolderParams = {
//   parent: string;
// };

// type FolderList = {
//   list: [
//     {
//       name: string;
//     }
//   ];
// };

type FolderData = {
  id: string;
  value: string;
  open?: boolean;
};

export const connect = (req: Request, res: Response) => {
  console.log(req.body);
  const { host, user, pass } = req.body;
  ftp = new jsftp({
    host,
    port: 21,
    user,
    pass,
  });
  ftp.auth(user, pass, (err, data) => {
    if (data) {
      res.send({
        host,
        user,
        connected: true,
        message: data.text,
      });
    } else if (err) {
      res.send({
        host,
        user,
        connected: false,
        message: err.message,
      });
    } else {
      res.send({
        host,
        user,
        connected: false,
      });
    }
  });
};

export const disconnect = (req: Request, res: Response) => {
  console.log("disconnect");

  if (ftp) {
    ftp.raw("quit", (err, data) => {
      if (!err) {
        res.send({
          connected: false,
          message: data.text,
        });
      } else {
        res.send({
          connected: true,
          message: err.message,
        });
      }
    });
  } else {
    res.send({
      connected: false,
      message: "You have been disconnected.",
    });
  }
};

export const remoteFolders = (req: Request, res: Response) => {
  let currPath = req.query.parent ? (req.query.parent as string) : "";
  if (ftp) {
    ftp.ls(currPath, (err, list) => {
      if (!err) {
        let data = currPath
          ? loadRemoteFolders(list, currPath)
          : loadRootPath();
        res.send(data);
      } else {
        res.send({
          connected: true,
          message: err.message,
        });
      }
    });
  } else {
    res.send({
      connected: false,
      message: "You are no connected!",
    });
  }
};

const loadRootPath = () => {
  let data: FolderData[] = [];
  data.push({
    id: "/",
    value: "Root",
    open: false,
  });
  return data;
};

const loadRemoteFolders = (list: any, currPath: string) => {
  let data: FolderData[] = [];
  list.forEach((item: any) => {
    if (item.type == 1) {
      data.push({
        id: `${currPath}/${item.name}`,
        value: item.name,
      });
    }
  });
  return {
    parent: currPath,
    data: data,
  };
};

export const loadRemoteFiles = (req: Request, res: Response) => {
  if (ftp) {
    ftp.list(req.query.path as string, (err, data) => {
      res.send({
        connected: true,
        data,
      });
    });
  } else {
    res.send({
      connected: false,
      message: "You are no connected!",
    });
  }
};

export const loadResourceFiles = (req: Request, res: Response) => {
  if (ftp) {
    ftp.ls(req.query.path as string, (err, data) => {
      res.send({
        connected: true,
        data,
      });
    });
  } else {
    res.send({
      connected: false,
      message: "You are no connected!",
    });
  }
};

export const modifyPermission = (req: Request, res: Response) => {
  if (ftp) {
    ftp.raw(
      "site chmod",
      `${req.query.perms} ${req.query.path}`,
      (err, data) => {
        if (!err) {
          res.send({
            connected: true,
            ip: req.ip,
            data,
          });
        } else {
          res.send({
            connected: false,
            ftp_msg: "Cannot remove directory. Directory not empty!",
            msg_col: "red",
          });
        }
      }
    );
  } else {
    res.send({
      connected: false,
      message: "You are no connected!",
    });
  }
};
