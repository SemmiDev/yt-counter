import { AiOutlineVideoCameraAdd } from 'react-icons/ai';
import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';

const AddMenu = ({ videoIds, setVideoIds }) => {
    let [isOpen, setIsOpen] = React.useState(false);
    const [videoLink, setvideoLink] = React.useState('');

    const extractVideoId = (videoUrl) => {
        let url = '';

        try {
            url = new URL(videoUrl);
        } catch (e) {
            return null;
        }

        if (
            url.hostname === 'www.youtube.com' ||
            url.hostname === 'youtube.com'
        ) {
            const searchParams = new URLSearchParams(url.search);
            return searchParams.get('v') || '';
        } else if (url.hostname === 'youtu.be') {
            return url.pathname.substr(1) || '';
        } else {
            return '';
        }
    };

    const newVideoHandler = () => {
        const videoId = extractVideoId(videoLink);

        if (videoId === null) {
            alert('Invalid URL');
            setvideoLink('');
            return;
        }

        if (videoIds.includes(videoId)) {
            alert('Video already added');
            setvideoLink('');
            return;
        }

        setVideoIds((prev) => [...prev, videoId]);
        setvideoLink('');

        closeModal();
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const openModal = () => {
        setIsOpen(true);
    };

    return (
        <Fragment>
            <div
                className='fixed z-10 flex flex-col items-center justify-center scale-95 bg-black border border-red-500 rounded-full group hover:scale-100 hover:bg-red-500 hover:cursor-pointer w-14 h-14 bottom-5 right-5 lg:bottom-16 lg:right-16'
                onClick={openModal}
            >
                <AiOutlineVideoCameraAdd className='text-red-500 group-hover:text-white w-7 h-7' />
            </div>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as='div' className='relative z-10' onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter='ease-out duration-300'
                        enterFrom='opacity-0'
                        enterTo='opacity-100'
                        leave='ease-in duration-200'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                    >
                        <div className='fixed inset-0 bg-black bg-opacity-25' />
                    </Transition.Child>

                    <div className='fixed inset-0 overflow-y-auto'>
                        <div className='flex items-center justify-center min-h-full p-4 text-center'>
                            <Transition.Child
                                as={Fragment}
                                enter='ease-out duration-300'
                                enterFrom='opacity-0 scale-95'
                                enterTo='opacity-100 scale-100'
                                leave='ease-in duration-200'
                                leaveFrom='opacity-100 scale-100'
                                leaveTo='opacity-0 scale-95'
                            >
                                <Dialog.Panel className='w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl'>
                                    <Dialog.Title
                                        as='h3'
                                        className='text-lg font-medium leading-6 text-gray-900'
                                    >
                                        New Video
                                    </Dialog.Title>
                                    <div className='mt-2'>
                                        <input
                                            type='text'
                                            className='w-full px-3 py-2 text-sm text-gray-700 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500'
                                            placeholder='Paste your video link here'
                                            name='video-link'
                                            id='video-link'
                                            value={videoLink}
                                            onChange={(e) =>
                                                setvideoLink(e.target.value)
                                            }
                                        />
                                    </div>

                                    <div className='mt-4'>
                                        <button
                                            type='button'
                                            className='inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                                            onClick={newVideoHandler}
                                        >
                                            Add
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </Fragment>
    );
};

export default AddMenu;
