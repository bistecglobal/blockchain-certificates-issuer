import { useState } from 'react';

export function useCredentialState() {
  const [formData, setFormData] = useState({
    course_name: '',
    date: '',
    trainee: '',
    trainer: '',
  });

  const [previewUrl, setPreviewUrl] = useState('');

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return { formData, previewUrl, setPreviewUrl, handleChange };
}
