# Qzone API

[![NPM version](https://img.shields.io/npm/v/qzone-api.svg?style=flat)](https://npmjs.com/package/qzone-api) [![NPM downloads](https://img.shields.io/npm/dm/qzone-api.svg?style=flat)](https://npmjs.com/package/qzone-api) [![CircleCI](https://img.shields.io/circleci/token/0b492c79ed6c1cb071f9ec6a3867e1f27d20ffae/project/github/u3u/qzone-api/master.svg)](https://circleci.com/gh/u3u/qzone-api/tree/master) [![codecov](https://codecov.io/gh/u3u/qzone-api/branch/master/graph/badge.svg)](https://codecov.io/gh/u3u/qzone-api)

## Install

```bash
yarn add qzone-api
```

## Usage

```js
const QzoneApi = require('qzone-api')
;(async () => {
  const { user, cookies } = await QzoneApi.login(
    'your account',
    'your password'
  )
  // Get user information
  console.log(user) // { login: true, owner: true, token: 'xxx' }

  const p_uin = cookies.find(x => x.name === 'p_uin').value
  const p_skey = cookies.find(x => x.name === 'p_skey').value

  // Get all albums for this user
  const { vFeeds } = await QzoneApi.getAlbumList({
    p_uin,
    p_skey,
    g_tk: token,
    res_uin: '1542262366'
  })

  // Get the first 200 photos in 1542262366's first album
  const { photos, total_count } = await QzoneApi.getPhotoList({
    p_uin,
    p_skey,
    g_tk: token,
    uin: '1542262366',
    albumid: vFeeds[0].pic.albumid
  })
  // Get the total number of photos
  console.log(total_count)
  // Get all the picture address
  console.log(
    [].concat(...Object.values(photos).map(x => x.map(x => x[1].url)))
  )
})()
```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

**Qzone API** © [u3u](https://github.com/u3u), Released under the [MIT](./LICENSE) License.<br>
Authored and maintained by u3u with help from contributors ([list](https://github.com/u3u/qzone-api/contributors)).

> [quq.cat](https://quq.cat) · GitHub [@u3u](https://github.com/u3u)
