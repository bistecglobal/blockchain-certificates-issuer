import React from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons/lib/icons';

function CancelConfirmationModal({ isOpen, onCancel, onConfirm }) {
    return (
      <div className={`fixed inset-0 flex items-center justify-center ${isOpen ? '' : 'hidden'}`}>
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="bg-white p-6 rounded-md shadow-lg z-10">
          <div className="flex items-center mb-4">
            <ExclamationCircleOutlined className="h-6 w-6 text-yellow-500 mr-2" />
            <h2 className="text-xl font-semibold">Confirm Cancel</h2>
          </div>
          <p className="text-gray-700 mb-4">Are you sure you want to cancel? Any unsaved changes will be lost.</p>
          <div className="flex justify-end">
            <button
              className="py-2 px-4 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 mr-2"
              onClick={onCancel} 
            >
              No, Keep Editing
            </button>
            <button
              className="py-2 px-4 rounded-md bg-red-500 text-white hover:bg-red-600"
              onClick={onConfirm}
            >
              Yes, Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

export default CancelConfirmationModal;
