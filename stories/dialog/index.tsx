import { action } from '@storybook/addon-actions'
import { boolean, text, withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import React, { Fragment, useState } from 'react'
import { Button, ButtonType, Dialog } from '../../components'

storiesOf('Dialog', module)
  .addDecorator(withKnobs)
  .add('dialog', () => {
    const width = text('width', '')
    const mask = boolean('mask', true)

    return <Demo width={width} mask={mask} />
  })

function Demo(props: { width: string; mask: boolean }) {
  const [visible, setVisible] = useState(false)
  const openDialog = () => {
    setVisible(true)
  }
  const closeDialog = () => {
    setVisible(false)
  }

  const confirmDialog = () => {
    const log = action('confirm dialog closed')

    Dialog.confirm({
      title: 'Are you sure?',
      content:
        'When clicked the OK button, this dialog will be closed after 1 second',
      cancelText: 'NO',
      confirmText: 'OK',
      beforeConfirm: () => {
        return new Promise(resolve => {
          setTimeout(resolve, 1000)
        })
      },
      onCancel: () => log('cancel'),
      onConfirm: () => log('comfirm'),
    })
  }

  return (
    <div>
      <Button onClick={openDialog}>open dialog</Button>
      <Button onClick={confirmDialog}>confirm dialog</Button>
      <Dialog
        visible={visible}
        header="What can Kubernetes do for you?"
        footer={
          <Fragment>
            <Button onClick={closeDialog}>cancel</Button>
            <Button type={ButtonType.Primary} onClick={closeDialog}>
              confirm
            </Button>
          </Fragment>
        }
        onClose={closeDialog}
        width={props.width}
        mask={props.mask}
      >
        With modern web services, users expect applications to be available
        24/7, and developers expect to deploy new versions of those applications
        several times a day. Containerization helps package software to serve
        these goals, enabling applications to be released and updated in an easy
        and fast way without downtime. Kubernetes helps you make sure those
        containerized applications run where and when you want, and helps them
        find the resources and tools they need to work. Kubernetes is a
        production-ready, open source platform designed with Google's
        accumulated experience in container orchestration, combined with
        best-of-breed ideas from the community.
      </Dialog>
    </div>
  )
}
