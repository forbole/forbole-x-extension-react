import { useRecoilValueLoadable } from 'recoil'
import { themeState } from '../../recoil/general'

interface Props {
  src: string
}

const Cover = ({ src }: Props) => {
  const themeLoadable = useRecoilValueLoadable(themeState)
  const defaultCover =
    themeLoadable.contents === 'light'
      ? require('../../assets/images/default_cover_image_light.png')
      : require('../../assets/images/default_cover_image_dark.png')
  return (
    <img
      className="object-cover rounded-t-xl h-[130px] w-full"
      src={src || defaultCover}
      alt="cover"
      onError={(e) => (e.currentTarget.src = defaultCover)}
    />
  )
}

export default Cover
