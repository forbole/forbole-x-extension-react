import React from 'react'
import { useRecoilValue } from 'recoil'
import { themeState } from '../../recoil/general'
import Markdown from '../Markdown'

type ProfileCardProps = {
  profile?: Profile
  chainConnections?: ChainConnection[]
  onEditProfile?(): void
  onChainConnectionClick?(): void
}

type Props = {}

const ProfileCard = (props?: Props) => {
  const theme = useRecoilValue(themeState)

  const profile = {
    bio: 'Hello World! **Lorem ipsum dolor sit amet,** consecteturim praesent elementum facilisis',
    coverPic: '/images/default_cover_image_dark.png',
    dtag: 'testertag',
    nickname: 'Tester',
    profilePic: '/images/default_profile_pic_dark.png',
  }

  const chainConnections = [
    {
      creationTime: '0100',
      externalAddress: 'testAddress1',
      userAddress: 'testerAddress1',
      chainName: 'chain1',
    },
    {
      creationTime: '0400',
      externalAddress: 'testAddress2',
      userAddress: 'testerAddress2',
      chainName: 'chain2',
    },
  ]
  //   const { profile, chainConnections, onEditProfile, onChainConnectionClick } = props
  return (
    <div className="mx-5 rounded-xl pb-6 bg-popup-100">
      <img
        className="object-cover rounded-t-xl h-[130px]"
        src={profile.coverPic ? profile.coverPic : `/images/default_cover_image_${theme}.png`}
        alt="cover"
      />
      <div className="flex flex-row mx-5 mt-[-30px]">
        <img
          className="object-cover rounded-full w-20 h-20"
          src={profile.profilePic ? profile.profilePic : `/images/default_profile_pic_${theme}.png`}
          alt="profile"
        />
        <div className="flex flex-row items-end w-full justify-between">
          <div className="flex flex-col pl-3">
            <h3>{profile.nickname}</h3>
            <p className="text-font-200 text-sm">@{profile.dtag}</p>
          </div>
          <button
            className="flex items-center space-x-5 border hover:bg-gray-100 px-2 py-1 rounded-lg"
            onClick={() => {
              // (edit) profile dialog
            }}
          >
            Edit Profile
          </button>
        </div>
      </div>
      <div className="flex flex-col px-6 pt-5">
        <Markdown>{profile.bio}</Markdown>
      </div>
    </div>
  )
}

export default ProfileCard
