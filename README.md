このプロジェクトは、[Redux](https://redux.js.org/) と [Redux Toolkit](https://redux-toolkit.js.org/) のテンプレートを使って [Create React App](https://github.com/facebook/create-react-app) で
自動処理されたものです。

## 利用可能なスクリプト

プロジェクトディレクトリで実行可能：

### `npm start`

アプリを開発モードで実行します。<br />
[http://localhost:3000](http://localhost:3000) を開くと、ブラウザで表示されます。

編集を行うと、ページが再読み込みされます。<br />
また、コンソールに lint エラーがあれば表示されます。

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## もっと詳しく

詳しくは、[Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started)で説明されています。

To learn React, check out the [React documentation](https://reactjs.org/).

## FirebaseAuth の CustomClaims 設定方法

Firebase の管理画面から AdminSDK の秘密鍵をダウンロードし、プロジェクト直下へ service-account.json にリネームして配置

```
node claims.js {uid}
```

## Git ブランチの命名規則

`ブランチ名`とそれぞれの`役割`、`派生元`、`マージ先`を以下に定める。
| ブランチ名 | 役割 | 派生元 | マージ先 |
| -------- | -------- | -------- | -------- |
| main | 公開するものを置くブランチ | | |
| develop | 次にリリースために開発中のものを置くブランチ | master | master |
| release | 次にリリースするものを準備するブランチ | develop | develop, master |
| feature-\* | 新機能開発中に使うブランチ | develop | develop |
| hotfix-\* | 公開中のもののバグ修正用ブランチ | master | develop, master |

`feature-*` と `hotfix-*` の `*` へは以下の命名規則とする。
| \* | 対象機能 | ディレクトリ |　役割 |
| -------- | -------- | -------- | -------- |
| functions | firebase functions | /functions | Firebase サービスのサーバー機能 |
| route | react routing | /src/route | システム内のルーティング機能 |
| redux | react redux toolkit | /src/feature , /src/app | システム内の状態管理機能 |
| styles | css styles | /src/styles | css スタイル全般 |
| core | react main | /src | その他のシステム機能と UI |
| other | other | / | その他の周辺機能 |

※Git のコメントは英日問わず。
