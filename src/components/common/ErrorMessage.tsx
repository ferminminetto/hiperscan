"use client";
import { useEffect } from 'react';
import ReportIcon from '@mui/icons-material/Report';

type ErrorMessageProps = {
  message: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {

  return (
    <div className={`error-message-hidden ${message && 'error-message-shown'}`}>
      <ReportIcon /> {message}
    </div>
  )
}

export default ErrorMessage;