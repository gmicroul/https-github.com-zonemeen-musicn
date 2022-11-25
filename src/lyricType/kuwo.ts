import got from 'got'
import { createWriteStream } from 'fs'

const kuwoSongLyric = async (lrcPath: string, lyricDownloadUrl: string) => {
  const {
    data: { lrclist },
  } = await got(lyricDownloadUrl).json()
  let lyric = ''
  for (const lrc of lrclist) {
    lyric += `[${lrc.time}] ${lrc.lineLyric}\n`
  }
  const lrcFile = createWriteStream(lrcPath)
  lrcFile.write(lyric)
}

export default kuwoSongLyric
