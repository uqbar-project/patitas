import React from 'react'
import { members as membersBackend } from '../../../services/backend'
import MainLayout from '../../_layouts/MainLayout/MainLayout'
import Thumbnail from '../../Thumbnail/Thumbnail'
import ThumbnailList from '../../ThumbnailList/ThumbnailList'
import { Member } from '@patitas/model/src/Member'


export default () => {

  const fetchMembers = async (start: number, limit: number) => {
    const { data } = await membersBackend.list({ start, limit })
    return data
  }

  const onClick = (member: Member) => () => {
    window.location.href = member.homepage.startsWith('http') ? member.homepage : `http://${member.homepage}`
  }

  return (
    <MainLayout>
      <ThumbnailList fetchMore={fetchMembers}>
        {member => <Thumbnail key={member._id} image={member.logo} title={member.name} onClick={onClick(member)} />}
      </ThumbnailList>
    </MainLayout>
  )
}