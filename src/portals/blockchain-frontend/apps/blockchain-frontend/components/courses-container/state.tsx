import axios from 'axios';
import { useState } from 'react';

export function useComponentState() {
  const handleDelete = (id) => {
    if (window.confirm('Are you sure to delete this trainer') == true) {
      console.log(id);
      axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}api/Course/${id}`);
    }
  };

  const handleSubmit = async (e) => {
    console.log(e.target);
  };

  return { handleSubmit, handleDelete };
}
