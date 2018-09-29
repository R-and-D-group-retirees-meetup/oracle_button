# 何
VOICEROIDたちがOracleを読み上げてくれるボタンを追加するChrome Extensionです。
VOICEROIDたちにOracleを読み上げてもらいたい際にご利用ください。

# 使
https://chrome.google.com/webstore/detail/oracle-button/jmhbndabpmenffegecmajddkhingckid?authuser=0

# 注
- リポジトリに含まれる一切のソースコード及び画像、音声はオラクル社及び日本オラクル社とは一切の関係を有しません。
- 音声は以下のソフトウェアを使用して作成されています。
  - VOICEROID+ 東北きりたん EX
  - VOICEROID+ 結月ゆかり EX
  - VOICEROID+ 民安ともえ EX

# 作
1. 実際のところ Chrome Extension としてのソース自体は `app/` 以下に配置されているので、書きたいように書きましょう。
2. それ以外は開発環境用です。これを動かすには Docker 環境が必要なので、用意してください。
3. `$ docker-compose buid` で開発環境を用意しましょう。
4. eslint を実行する場合は `$ docker-compose run --rm node yarn run eslint` です。
5. prettier を実行する場合は `$ docker-compose run --rm node yanr run prettier` です。
6. 作成した Chrome Extension を 配布したい場合は、 `$ docker-compose run --rm node yarn run zip` を実行すると `.build/` に拡張機能のパッケージの .zip ファイルが作成されます。これをそのままアップロードしましょう。
