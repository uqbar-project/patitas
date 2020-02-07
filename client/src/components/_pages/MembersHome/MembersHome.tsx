import React from 'react'
import Member from '../../../../../model/Member'
import { members as membersBackend } from '../../../services/backend'
import MainLayout from '../../_layouts/MainLayout/MainLayout'
import Thumbnail from '../../Thumbnail/Thumbnail'
import ThumbnailList from '../../ThumbnailList/ThumbnailList'


export default () => {

  const fetchMembers = async (start: number, limit: number) => {
    const { data } = await membersBackend.list({ start, limit })
    return data
  }

  const onClick = (member: Member) => () => { window.location.href = member.contactPoints.find(_ => _.main)!.url }

  return (
    <MainLayout>
      <ThumbnailList fetchMore={fetchMembers}>
        {member => <Thumbnail key={member._id} image={member.logo} title={member.name} onClick={onClick(member)} />}
      </ThumbnailList>
    </MainLayout>
  )
}