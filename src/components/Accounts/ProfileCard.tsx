import React, { useEffect } from 'react'
import Markdown from '../Markdown'

type ProfileCardProps = {
  profile?: Profile
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
    profile && (
      <div className="mx-5 rounded-xl pb-6 bg-popup-100">
        <img
          className="object-cover rounded-t-xl h-[130px] w-full"
          src={profile.pictures.cover}
          alt="cover"
        />
        <div className="flex flex-row mx-5 mt-[-30px]">
          <img
            className="object-cover rounded-full w-20 h-20"
            src={profile.pictures.profile}
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
        <div className="px-6 pt-5">
          <div className="relative pb-2">
            <Markdown id="markdown">{showMore ? profile.bio : profile.bio.split('\n')[0]}</Markdown>
            {profile.bio.includes('\n') ? (
              <button
                className="text-font-200 text-sm pl-2 absolute right-0 bottom-0"
                onClick={() => setShowMore(!showMore)}
              >
                Show {showMore ? 'less' : 'more'}
              </button>
            ) : null}
          </div>
          <button
            className="text-primary-100 text-left hover:opacity-80"
            onClick={() => {
              // onChainConnectionClick
            }}
          >
            {chainConnections.length} connections
          </button>
        </div>
      </div>
    )
  )
}

export default ProfileCard
