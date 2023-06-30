import React, { Fragment, useEffect, useState } from 'react';
import VideoCard from './video-card';
import AddMenu from './add-menu';
import { Tab } from '@headlessui/react';
import { BsCameraVideo } from 'react-icons/bs';
import { fetchContentMetrics } from './service.js';
import { ImSpinner } from 'react-icons/im';
import { API_KEY } from './env';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function App() {
    const [videoIds, setVideoIds] = useState([]);
    const [isFetching, setIsFetching] = useState(false);

    const [categories, setCategories] = useState({
        All: [],
        Likes: [],
        Comments: [],
        Views: [],
    });

    useEffect(() => {
        // Fetch data initially
        fetchData();

        // Fetch data every 10 seconds
        const interval = setInterval(fetchData, 10000);

        // Clean up interval on component unmount
        return () => clearInterval(interval);
    }, [videoIds]);

    const fetchData = () => {
        if (videoIds.length === 0) return;

        setIsFetching(true);

        fetchContentMetrics(videoIds, API_KEY).then((data) => {
            const sortedByViews = [...data].sort(
                (a, b) => b.viewCount - a.viewCount
            );
            setCategories((prevCategories) => ({
                ...prevCategories,
                Views: sortedByViews,
            }));

            const sortedByLikes = [...data].sort(
                (a, b) => b.likeCount - a.likeCount
            );
            setCategories((prevCategories) => ({
                ...prevCategories,
                Likes: sortedByLikes,
            }));

            const sortedByComments = [...data].sort(
                (a, b) => b.commentCount - a.commentCount
            );
            setCategories((prevCategories) => ({
                ...prevCategories,
                Comments: sortedByComments,
            }));

            const sortedByTotal = [...data].sort(
                (a, b) =>
                    b.viewCount +
                    b.likeCount +
                    b.commentCount -
                    (a.viewCount + a.likeCount + a.commentCount)
            );

            const categoriesWithTotal = sortedByTotal.map((video) => ({
                ...video,
                total:
                    Number(video.viewCount) +
                    Number(video.likeCount) +
                    Number(video.commentCount),
            }));

            setCategories((prevCategories) => ({
                ...prevCategories,
                All: categoriesWithTotal,
            }));

            setIsFetching(false);
        });
    };

    return (
        <div className='flex justify-center min-h-screen bg-black'>
            <Fragment>
                <AddMenu videoIds={videoIds} setVideoIds={setVideoIds} />
                <div className='p-4'>
                    <div className='w-full px-2 sm:px-0'>
                        <Tab.Group>
                            <div className='flex items-center justify-center gap-2 mb-5 text-2xl font-semibold leading-relaxed text-red-500'>
                                <BsCameraVideo className='w-6 h-6 text-red-500' />
                                Youtube Live Counter
                            </div>
                            <span className='flex items-center justify-center mb-5 text-xs md:text-lg lg:text-xl text-green-500/70'>
                                Automatic refresh every 10 seconds.
                            </span>
                            <div>
                                {isFetching && (
                                    <div className='flex items-center justify-center'>
                                        <ImSpinner className='w-12 h-12 text-green-500 animate-spin' />
                                    </div>
                                )}
                            </div>

                            <Tab.List className='sticky z-10 flex px-2 py-3 space-x-5 inset-2 bg-black/80 rounded-xl'>
                                {Object.keys(categories).map((category) => (
                                    <Tab
                                        key={category}
                                        className={({ selected }) =>
                                            classNames(
                                                'w-full rounded-lg py-2.5 text-sm md:text-lg font-medium leading-5 text-red-700',
                                                selected
                                                    ? 'bg-red-500/20 shadow-red-500 shadow-sm px-3 md:px-7 py-2 ring-0'
                                                    : 'text-red-100 hover:shadow-red-500 hover:shadow-xl md:px-7 hover:bg-red-500/[0.12]  py-2 hover:text-red-500'
                                            )
                                        }
                                    >
                                        {category}
                                    </Tab>
                                ))}
                            </Tab.List>
                            <Tab.Panels className='mt-3'>
                                {Object.values(categories).map(
                                    (videos, idx) => (
                                        <Tab.Panel
                                            key={idx}
                                            className={classNames(
                                                'rounded-xl flex w-full justify-center bg-transparent text-white p-3'
                                            )}
                                        >
                                            <div className='grid grid-cols-1 gap-12 place-items-end md:grid-cols-2 lg:grid-cols-3 md:flex-row'>
                                                {videos.map((video, index) => (
                                                    <div
                                                        key={video.videoId}
                                                        className='w-full'
                                                    >
                                                        <VideoCard
                                                            index={index}
                                                            video={video}
                                                        />
                                                        <hr className='border-gray-800/70 md:hidden' />
                                                    </div>
                                                ))}
                                            </div>
                                        </Tab.Panel>
                                    )
                                )}
                            </Tab.Panels>
                        </Tab.Group>
                    </div>
                </div>
            </Fragment>
        </div>
    );
}
