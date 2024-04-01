import { useCredentialState } from './state';
import QRCode from 'qrcode.react';

export default function CredentialMain() {
  const { formData, previewUrl, setPreviewUrl, handleChange } =
    useCredentialState();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await submitData(formData);
      console.log('Form data submitted successfully:', response);

      setPreviewUrl(response.url); // Set preview URL from response
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  // Server Action (sends data to the provided URL)
  async function submitData(data: any) {
    const url =
      'https://razor-certificate-app.azurewebsites.net/api/issuer/issuance-request';
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    });

    return await response.json();
  }

  return (
    <div className="container p-10 ">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-3 mt-10">
        <h2 className="text-2xl font-semibold mb-4">Certificate Issuer</h2>
        <div className="flex items-center">
          <label
            htmlFor="courseName"
            className="w-1/4 mr-4 text-sm font-medium"
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
            className="flex-grow px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center">
          <label htmlFor="date" className="w-1/4 mr-4 text-sm font-medium">
            Date:
          </label>
          <input
            type="text"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="flex-grow px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center">
          <label htmlFor="trainee" className="w-1/4 mr-4 text-sm font-medium">
            Trainee:
          </label>
          <input
            type="text"
            id="trainee"
            name="trainee"
            value={formData.trainee}
            onChange={handleChange}
            required
            className="flex-grow px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center">
          <label htmlFor="trainer" className="w-1/4 mr-4 text-sm font-medium">
            Trainer:
          </label>
          <input
            type="text"
            id="trainer"
            name="trainer"
            value={formData.trainer}
            onChange={handleChange}
            required
            className="flex-grow px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </form>

      <div className="mt-8 flex items-center space-x-4">
        Preview URL:
        <a
          href={previewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          {previewUrl}
        </a>
        <br />
        <div>
          <QRCode value={previewUrl} size={128} level="L" />
        </div>
      </div>
    </div>
  );
}
