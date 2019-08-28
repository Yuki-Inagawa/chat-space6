# README
＊概要

グループ機能付きチャットアプリ

https://i.gyazo.com/76672d37dc4f7645d9077e4953417f73.mp4

https://i.gyazo.com/cf5c4d5efdbac071ebaf24a5a40c824b.mp4

https://i.gyazo.com/cff4e4ccf7e35896ea3185f9485d5d9e.mp4

*IPアドレス

52.199.254.8

*実装した機能

新規登録機能

グループ内でのチャット機能

複数人によるグループチャット機能

チャット相手の検索機能

チャットグループへのユーザー招待機能

チャットの履歴表示機能

画像送信機能

チャットの自動更新


* 開発環境
ruby 2.5.1

MySQL 5.6.43

amazon S3

Nginx

Unicorn


* データベース概要
## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false,index: true|
|email|string|null: false, unique: true|
|password|string|null: false|
### Association
- has_many :messages
- has_many :groups, through: :group_users
- has_many :group_users


## group_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user|references|null: false, foreign_key: true|
|group|references|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user


## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
- has_many :users, through: :group_users
- has_many :messages
- has_many :group_users

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|content|string||
|image|string||
|user|references|null: false, foreign_key: true|
|group|references|null: false, foreign_key: true|


### Association
- belongs_to :user
- belongs_to :group
