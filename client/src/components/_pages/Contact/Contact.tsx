import React from 'react'
import MainLayout from '../../_layouts/MainLayout/MainLayout'
import SideLayout from '../../_layouts/SideLayout/SideLayout'
import MemberForm from '../../MemberForm/MemberForm'

export default () => (
  <MainLayout>
    <SideLayout>
      <MemberForm member={{}} />
    </SideLayout>
  </MainLayout>
)