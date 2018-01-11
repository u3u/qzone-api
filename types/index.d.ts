declare module 'qzone-api' {
  export function login(
    uin: string,
    pwd: string
  ): Promise<{
    user: {
      login: boolean
      owner: boolean
      token: number
    }
    cookies: Array<{
      domain: string
      expires: string
      expiry: string
      httponly: boolean
      name: string
      path: string
      secure: boolean
      value: string
    }>
  }>

  export function getPhotoList(params: {
    p_uin: string
    p_skey: string
    g_tk: number | string
    uin: string
    albumid: string
    ps?: number | string
    pn?: number | string
  }): Promise<{
    album: any
    finish: number
    list_count: number
    total_count: number
    photos: any
  }>

  export function getAlbumList(params: {
    p_uin: string
    p_skey: string
    g_tk: number | string
    res_uin: string
  }): Promise<{
    attach_info: string
    auto_load: number
    has_more: number
    remain_count: number
    vFeeds: Array<{
      cell_template: any
      comm: any
      operation: any
      pic: {
        albumanswer: string
        albumid: string
        albumname: string
        albumnum: number
        albumquestion: string
        albumrights: number
        allow_access: number
        anonymity: number
        balbum: number
        busi_param?: any
        desc: string
        lastupdatetime: number
        picdata: any
        picdata_index: number
        uin: string
        uploadnum: number
      }
    }>
  }>
}
