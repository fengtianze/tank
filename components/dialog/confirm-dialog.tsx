import React, { FC, Fragment, useState } from 'react'
import { Button, ButtonType } from '../button'
import { Dialog } from './dialog'
import { ConfirmDialogProps } from './types'

export const ConfirmDialog: FC<ConfirmDialogProps> = props => {
  const {
    title,
    content,
    cancelText,
    confirmText,
    beforeConfirm,
    onCancel,
    onConfirm,
  } = props

  const [visible, setVisible] = useState(true)
  const [confirming, setConfirming] = useState(false)

  const close = (ok: boolean) => {
    setVisible(false)
    if (ok) {
      return onConfirm && onConfirm()
    } else {
      return onCancel && onCancel()
    }
  }

  const cancel = () => {
    close(false)
  }

  const confirm = () => {
    if (beforeConfirm) {
      setConfirming(true)
      beforeConfirm()
        .then(() => {
          setConfirming(false)
          close(true)
        })
        .catch(() => {
          setConfirming(false)
        })
    } else {
      close(true)
    }
  }

  return (
    <Dialog
      visible={visible}
      header={title}
      content={content}
      footer={
        <Fragment>
          <Button onClick={cancel}>{cancelText}</Button>
          <Button
            type={ButtonType.Primary}
            loading={confirming}
            onClick={confirm}
          >
            {confirmText}
          </Button>
        </Fragment>
      }
    />
  )
}

ConfirmDialog.defaultProps = {
  cancelText: 'cancel',
  confirmText: 'confirm',
}
