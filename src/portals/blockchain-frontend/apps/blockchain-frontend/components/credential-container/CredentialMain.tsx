import { useState } from 'react';
import { useCredentialState } from './state';
import QRCode from 'qrcode.react';
import { message } from 'antd';
import { submitData } from 'apps/blockchain-frontend/api/fetchData';

export default function CredentialMain() {
  const { formData, previewUrl, setPreviewUrl, handleChange } =
    useCredentialState();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (submitted) {
      return; // Do not submit if already submitted
    }

    setSubmitting(true);

    try {
      const response = await submitData(formData);
      console.log('Form data submitted successfully:', response);

      setPreviewUrl(response.url);
      message.success('Credential created successfully');
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      message.error('Error submitting form. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container p-10">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-3 mt-10">
        <h2 className="text-2xl font-semibold mb-4">Certificate Issuer</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label htmlFor="courseName" className="text-sm font-medium">
            Course Name:
          </label>
          <input
            type="text"
            id="courseName"
            name="course_name"
            value={formData.course_name}
            onChange={handleChange}
            required
            className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <label htmlFor="date" className="text-sm font-medium">
            Date:
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <label htmlFor="trainee" className="text-sm font-medium">
            Trainee:
          </label>
          <input
            type="text"
            id="trainee"
            name="trainee"
            value={formData.trainee}
            onChange={handleChange}
            required
            className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <label htmlFor="trainer" className="text-sm font-medium">
            Trainer:
          </label>
          <input
            type="text"
            id="trainer"
            name="trainer"
            value={formData.trainer}
            onChange={handleChange}
            required
            className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className={`bg-blue-500 text-white rounded-md px-4 py-2 ${
            submitting || submitted
              ? 'cursor-not-allowed opacity-50'
              : 'hover:bg-blue-700'
          }`}
          disabled={submitting || submitted}
        >
          {submitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>

      {previewUrl && (
        <div className="mt-8">
          <div className="flex items-center space-x-4">
            Preview URL:
            <a
              href={previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              {previewUrl}
            </a>
          </div>
          <div className="mt-2">
            <QRCode value={previewUrl} size={128} level="L" />
          </div>
        </div>
      )}
    </div>
  );
}
