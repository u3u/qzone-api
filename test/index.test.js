const QzoneApi = require('../lib')

test('main', () => {
  expect(typeof QzoneApi).toBe('function')
})

test('QzoneApi.login', async () => {
  await expect(QzoneApi.login('123456', '123456')).rejects.toThrow(
    QzoneApi.errMsg.check
  )
})

test('QzoneApi.getPhotoList', () => {})

test('QzoneApi.getAlbumList', () => {})
