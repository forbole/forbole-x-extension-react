import React from 'react'
import { Loadable } from 'recoil'
import Markdown from '../Markdown'

type ProfileCardProps = {
  profile?: Loadable<Profile>
  chainConnections?: ChainConnection[]
  onEditProfile?(): void
  onChainConnectionClick?(): void
}

const ProfileCard = ({ profile }: ProfileCardProps) => {
  const [showMore, setShowMore] = React.useState(false)

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

  return (
    <div className="mx-5 rounded-xl pb-6 bg-popup-100">
      <img
        className="object-cover rounded-t-xl h-[130px] w-full"
        src={profile.state === 'hasValue' && profile.contents.pictures.cover}
        alt="cover"
      />
      <div className="flex flex-row mx-5 mt-[-30px]">
        <img
          className="object-cover rounded-full w-20 h-20"
          src={profile.state === 'hasValue' && profile.contents.pictures.profile}
          alt="profile"
        />
        <div className="flex flex-row items-end w-full justify-between">
          <div className="flex flex-col pl-3">
            <h3>{profile.state === 'hasValue' && profile.contents.nickname}</h3>
            <p className="text-font-200 text-sm">
              @{profile.state === 'hasValue' && profile.contents.dtag}
            </p>
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
        <div className="inline">
          <Markdown className="inline">
            {profile.state === 'hasValue' &&
              (showMore ? profile.contents.bio : profile.contents.bio.toString().slice(0, 5))}
          </Markdown>
          {profile.state === 'hasValue' && profile.contents.bio.split(' ').length > 10 ? (
            <button className="text-font-200 text-sm pl-2" onClick={() => setShowMore(!showMore)}>
              Show {showMore ? 'less' : 'more'}
            </button>
          ) : null}
        </div>
        <button
          className="text-primary-100 underline underline-offset-1 text-left text-sm"
          onClick={() => {
            // onChainConnectionClick
          }}
        >
          {chainConnections.length} connections
        </button>
      </div>
    </div>
  )
}

export default ProfileCard
