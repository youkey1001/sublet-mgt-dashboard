import axios from "axios";
const baseUrl = "https://us-central1-twitter-app-26e0d.cloudfunctions.net/api";
const params: any = {
  host: "sv6144.xserver.jp",
  user: "youking",
  pass: "19o0omaw",
};

export const request = {
  auth: function () {
    return new Promise((resolve, reject) => {
      axios.post(`${baseUrl}/connect`, params, {
        headers: {
          "content-type": "application/json",
        },
      });
    });
  },
  folders: function (parent: string) {
    axios
      .get(`${baseUrl}/remote/folders?parent=${parent}`)
      .then((res: any) => {
        return res;
      })
      .catch((err: any) => {
        return err;
      });
  },
  files: function (path: string) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${baseUrl}/remote/files?path=${path}`)
        .then((res: any) => {
          resolve(res);
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  },
};
