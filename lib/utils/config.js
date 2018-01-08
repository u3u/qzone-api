module.exports = {
  userAgent:
    'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75 Mobile/14E5239e Safari/602.1',
  loginUrl:
    'https://ui.ptlogin2.qq.com/cgi-bin/login?pt_hide_ad=1&style=9&pt_ttype=1&appid=549000929&pt_no_auth=1&pt_wxtest=1&daid=5&s_url=https%3A%2F%2Fh5.qzone.qq.com%2Fmqzone%2Findex',
  captchaUrl: 'https://ssl.captcha.qq.com/cap_union_new_getcapbysig',
  api: {
    login: 'https://ssl.ptlogin2.qq.com/login',
    photo: 'https://h5.qzone.qq.com/webapp/json/mqzone_photo/getPhotoList2',
    album:
      'https://mobile.qzone.qq.com/list?list_type=album&action=0&format=json'
  }
}
