import React, { useState } from 'react';
import Image from '@/Components/Image';
import { XMarkIcon } from '@heroicons/react/20/solid/index.js';
import { PhotoIcon } from '@heroicons/react/24/outline/index.js';

export default function UploadImage({ label, value, onChange, model }) {
    const [imagePreview, setImagePreview] = useState('');
    const onFileChange = (e) => {
        onChange(value, e.target.files[0]);
        setImagePreview(URL.createObjectURL(e.target.files[0]));
    };
    return (
        <div>
            <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-white">
                {label}
            </label>
            {imagePreview ? (
                <div className="relative mt-2">
                    <button
                        onClick={() => setImagePreview('')}
                        className="absolute right-0 top-0 mr-4 mt-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-900/50 px-2 py-1 text-xs uppercase text-white hover:bg-gray-900/70"
                    >
                        <XMarkIcon className="h-6 w-6 stroke-2" />
                    </button>
                    <Image
                        className="mb-4 w-full rounded-lg"
                        width="1200"
                        height="630"
                        src={imagePreview}
                        alt="Preview"
                    />
                </div>
            ) : model?.image ? (
                <div className="relative mt-2">
                    <Image
                        width="1200"
                        height="630"
                        src={model.image.path}
                        alt={model.title}
                        className="mb-5 rounded-lg object-cover object-center"
                    />
                </div>
            ) : (
                <div className="col-span-full mb-6">
                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-white/25 px-6 py-10">
                        <div className="text-center">
                            <PhotoIcon className="mx-auto h-12 w-12 stroke-[1.25] text-gray-500" aria-hidden="true" />
                            <div className="mt-4 flex text-sm leading-6 text-gray-400">
                                <label
                                    htmlFor="picture"
                                    className="focus-within:ring-primary-600 hover:text-primary-500 relative cursor-pointer rounded-md bg-gray-900 font-semibold text-white focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-900"
                                >
                                    <span>Upload a file</span>
                                    <input
                                        onChange={onFileChange}
                                        name="picture"
                                        id="picture"
                                        type="file"
                                        className="sr-only"
                                    />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs leading-5 text-gray-400">PNG, JPG up to 2MB</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}