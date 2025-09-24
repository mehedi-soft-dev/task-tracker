import React from 'react';
import {
  DialogTrigger,
  Dialog,
  Heading,
  Divider,
  Content,
  ButtonGroup,
  Button,
  AlertDialog
} from '@adobe/react-spectrum';

interface ConfirmDialogProps {
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'destructive' | 'confirmation';
  onConfirm: () => void;
  children: React.ReactElement;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'confirmation',
  onConfirm,
  children
}) => {
  return (
    <DialogTrigger>
      {children}
      <AlertDialog
        title={title}
        variant={variant}
        primaryActionLabel={confirmLabel}
        cancelLabel={cancelLabel}
        onPrimaryAction={onConfirm}
      >
        {message}
      </AlertDialog>
    </DialogTrigger>
  );
};