import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import express from "express";
import * as route from "./route/index";

admin.initializeApp();

const app: express.Express = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.post("/connect", route.connect);
app.post("/disconnect", route.disconnect);
app.get("/remote/folders", route.remoteFolders);
app.get("/remote/files", route.loadRemoteFiles);
app.get("/resources/files", route.loadResourceFiles);
app.get("/resources/permission", route.modifyPermission);

// host: "sv6144.xserver.jp"
// port: 21 #default
// user: "youking"
// pass: "19o0omaw"

// express serverへルーティング
exports.api = functions.region("asia-northeast1").https.onRequest(app);

// 登録されているユーザーリストを取得
exports.getUsers = functions
  .region("asia-northeast1")
  .https.onRequest((request: any, response: any) => {
    response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    admin
      .auth()
      .listUsers(1000)
      .then((listUsersResult: any) => {
        response.json(listUsersResult);
      })
      .catch((error: any) => {
        response.send(error);
      });
  });

// 新規ユーザー作成をトリガーとしてfiresotreへユーザー情報を自動追加する
exports.onCreateUser = functions
  .region("asia-northeast1")
  .auth.user()
  .onCreate(async (user) => {
    const { uid, email, photoURL, displayName } = user;

    if (!photoURL || !displayName) {
      await admin.firestore().collection("users").doc(uid).set(
        {
          email: email,
          role: "guest",
          state: "online",
          updateAt: admin.database.ServerValue.TIMESTAMP,
        },
        { merge: true }
      );
    } else {
      await admin.firestore().collection("users").doc(uid).set({
        email: email,
        photoURL: photoURL,
        role: "guest",
        username: displayName,
        state: "online",
        updateAt: admin.database.ServerValue.TIMESTAMP,
      });
    }
    await admin.auth().setCustomUserClaims(uid, {
      role: "guest",
    });
    return admin
      .database()
      .ref("/status/" + uid)
      .set({
        state: "online",
        updateAt: admin.database.ServerValue.TIMESTAMP,
      });
  });

// 既存ユーザー削除をトリガーとしてfiresotreからユーザー情報を自動削除する
exports.onDeleteUser = functions
  .region("asia-northeast1")
  .auth.user()
  .onDelete(async (user) => {
    await admin.firestore().collection("users").doc(user.uid).delete();
    return await admin
      .database()
      .ref("/status/" + user.uid)
      .remove();
  });

// firestoreに保存されたユーザー情報のRoleを変更した際にCustomClaimsを自動変更する
exports.onChangeRole = functions
  .region("asia-northeast1")
  .firestore.document("/users/{uid}")
  .onUpdate(async (change, context) => {
    return await admin.auth().setCustomUserClaims(context.params.uid, {
      role: change.after.data().role,
    });
  });

// ユーザーのログイン、ログアウトを検知して状態をfirestoreへ自動書き込み
exports.onUserStatusChanged = functions
  .region("asia-northeast1")
  .database.ref("/status/{uid}")
  .onUpdate(async (change, context) => {
    const eventStatus = change.after.val();
    const userStatusFirestoreRef = admin
      .firestore()
      .collection("users")
      .doc(context.params.uid);
    const statusSnapshot = await change.after.ref.once("value");
    const status = statusSnapshot.val();
    functions.logger.log(status, eventStatus);
    if (status.updateAt > eventStatus.updateAt) {
      return null;
    }
    // eventStatus.updateAt = new Date(eventStatus.updateAt);
    return userStatusFirestoreRef.set(eventStatus, { merge: true });
  });
