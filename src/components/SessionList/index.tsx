import React from 'react'
import { Button, message } from 'antd'

type Props = {}

const SessionList = (props: Props) => {
  return (
    <div style={{ padding: 12 }}>
      <div>我是用户自定义会话面板</div>
      <Button onClick={() => {
        message.success('hello world');
      }}>阿斯顿发是3335</Button>
    </div>
  )
}

export default SessionList