import { rtdb } from "../firebase";
import firebase from "firebase/app";

let isOfflineForDatabase = {
  state: "offline",
  updateAt: firebase.database.ServerValue.TIMESTAMP,
};

let isOnlineForDatabase = {
  state: "online",
  updateAt: firebase.database.ServerValue.TIMESTAMP,
};

export const presenceSetup = (uid: string) => {
  let userStatusDatabaseRef = rtdb.ref("/status/" + uid);

  rtdb.ref(".info/connected").on("value", (snapshot) => {
    if (snapshot.val() === false) {
      return;
    }
    // onDisconnect()はタブを閉じると起爆する
    userStatusDatabaseRef
      .onDisconnect()
      .set(isOfflineForDatabase)
      .then(() => {
        userStatusDatabaseRef.set(isOnlineForDatabase);
      });
  });
};

// 自動でofflineに切り替わるため不要
// ログアウトボタンクリック時にステータスを変更した場合に利用
// export const presenceLogout = (uid: string) => {
//   let userStatusDatabaseRef = rtdb.ref("/status/" + uid);
//   userStatusDatabaseRef.set(isOfflineForDatabase);
// };
