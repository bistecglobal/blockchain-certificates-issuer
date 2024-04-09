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
        <h2 className="text-2xl font-semibold mb-4">Generate a Certificate</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-64 min-w-fit">
          <label
            htmlFor="courseName"
            className="block text-left font-medium text-gray-800"
          >
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
          <label
            htmlFor="date"
            className="block text-left font-medium text-gray-800"
          >
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
          <label
            htmlFor="trainee"
            className="block text-left font-medium text-gray-800"
          >
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
          <label
            htmlFor="trainer"
            className="block text-left font-medium text-gray-800"
          >
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
          className={`bg-blue-500 text-white rounded-md px-4 py-2 inline-block w-32 max-w-px${
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
          <div className="mt-2">
            <QRCode value={previewUrl} size={164} level="L" />
          </div>
        </div>
      )}
    </div>
  );
}
