import React from 'react'
import MainLayout from '../../_layouts/MainLayout/MainLayout'
import SideLayout from '../../_layouts/SideLayout/SideLayout'
import MemberForm from '../../MemberForm/MemberForm'
import { useLocation } from 'react-router-dom'
import { Member } from '@patitas/model'

export default () => {

  const { search } = useLocation()
  const member: Partial<Member> = JSON.parse(new URLSearchParams(search).get('member') ?? 'false') || {}

  return (
    <MainLayout>
      <SideLayout>
        <MemberForm member={member} />
      </SideLayout>
    </MainLayout>
  )
}