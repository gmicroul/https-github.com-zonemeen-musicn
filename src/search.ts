import ora from 'ora'
import { cyan, red } from 'colorette'
import searchType from './searchType'
import type { SongInfo } from './types'

const search = async ({ text, options }: SongInfo) => {
  try {
    const { number, service } = options
    const intRegex = /^[1-9]\d*$/

    if (text === '') {
      console.error(red('请输入歌曲名称或歌手名字'))
      process.exit(1)
    }

    if (!intRegex.test(number)) {
      console.error(red('页码数应是大于0的整数，请重新输入'))
      process.exit(1)
    }

    const spinner = ora(cyan('搜索ing')).start()
    const { searchSongs, totalSongCount } = await searchType[service](text, number)

    if (!searchSongs.length) {
      if (totalSongCount === undefined) {
        spinner.fail(red(`没搜索到 ${text} 的相关结果`))
        process.exit(1)
      }
      spinner.fail(red('搜索页码超出范围，请重新输入'))
      process.exit(1)
    }
    spinner.stop()
    return { searchSongs, options }
  } catch (err: any) {
    console.error(red(err))
    process.exit(1)
  }
}

export default search
