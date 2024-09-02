import React from 'react';

export default function FormMenu({ isOpen, formData, onClose, onChange, onSubmit, isSubmitting  }) {
  if (!isOpen) return null; // Tidak menampilkan apapun jika modal tidak terbuka

  const handleDescriptionChange = (e) => {
    const { name, value } = e.target;
    if (value.length <= 300) {
      onChange(e);
    }
  };

  const remainingChars = 300 - formData.description.length;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-11/12 max-w-lg">
        <h2 className='text-lg font-semibold mb-4'>{formData.id ? 'Edit Menu' : 'Add Menu'}</h2>
        <form onSubmit={onSubmit}>
          <div className='mb-4'>
            <label className='block text-sm font-medium mb-2' htmlFor='name'>Name</label>
            <input
              type='text'
              id='name'
              name='name'
              value={formData.name}
              onChange={onChange}
              className='w-full border border-gray-300 rounded p-2'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-medium mb-2' htmlFor='description'>Description</label>
            <textarea
              id='description'
              name='description'
              value={formData.description}
              onChange={handleDescriptionChange}
              className='w-full border border-gray-300 rounded p-2'
              required
              rows={4}
              maxLength="300"
            />
            <p className="mt-1 text-sm text-gray-500">Characters remaining: {remainingChars}</p>
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-medium mb-2' htmlFor='price'>Price</label>
            <input
              type='number'
              id='price'
              name='price'
              value={formData.price}
              onChange={onChange}
              className='w-full border border-gray-300 rounded p-2'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-medium mb-2' htmlFor='photo'>Photo</label>
            <input
              type='file'
              id='photo'
              name='photo'
              accept='image/jpeg,image/png,image/jpg'
              onChange={onChange}
              className='w-full border border-gray-300 rounded p-2'
            />
          </div>
          <div className='flex justify-end'>
            <button type='button' className='mr-2 bg-gray-200 px-4 py-2 rounded' onClick={onClose}>Cancel</button>
            <button
                type='submit'
                disabled={isSubmitting} // Disable button while submitting
                className={`${isSubmitting?'bg-orange-300':'bg-orange-900'} text-white px-4 py-2 rounded mr-2`}
            >
                {isSubmitting ? 'Submitting...' : formData.id ? 'Update Menu' : 'Add Menu'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
