import { HTMLProps, ReactNode } from 'react';
import { TKProps } from '../types';

export type DialogProps = TKProps<
  HTMLProps<HTMLDivElement>,
  {
    visible: boolean;
    width: string;
    mask: boolean;
    header: ReactNode;
    footer: ReactNode;
    content: ReactNode;
    onClose: () => void;
  }
>;

export interface ConfirmDialogProps {
  title: string;
  content?: string;
  cancelText?: string;
  confirmText?: string;
  beforeConfirm?: () => Promise<void>;
  onCancel?: () => void;
  onConfirm?: () => void;
}
