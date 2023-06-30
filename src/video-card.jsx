import {
    AiOutlineComment,
    AiOutlineLike,
    AiOutlineFieldTime,
} from 'react-icons/ai';
import { TbChartInfographic, TbSum } from 'react-icons/tb';
import moment from 'moment/moment';

const VideoCard = ({ index, video }) => {
    const {
        total = null,
        title = '',
        thumbnailUrl = '',
        likeCount = 0,
        commentCount = 0,
        viewCount = 0,
        createdAt = new Date(),
    } = video;

    const getRanking = (index) => {
        switch (index) {
            case 0:
                return '🥇';
            case 1:
                return '🥈';
            case 2:
                return '🥉';
            default:
                return '';
        }
    };

    function formatCount(number) {
        const billion = 1000000000; // 1 miliar
        const million = 1000000; // 1 juta
        const thousand = 1000; // 1 ribu

        if (number >= billion) {
            return (number / billion).toFixed(1).replace(/\.0$/, '') + 'b';
        } else if (number >= million) {
            return (number / million).toFixed(1).replace(/\.0$/, '') + 'm';
        } else if (number >= thousand) {
            return (number / thousand).toFixed(1).replace(/\.0$/, '') + 'k';
        } else {
            return number.toString();
        }
    }

    return (
        <div className='w-full max-w-xs space-y-3 text-white bg-transparent rounded-lg '>
            <h1 className='p-3 text-lg leading-relaxed break-all text-white/80 '>
                {title}
            </h1>

            {/* <h3 className='flex items-center gap-1 text-xs italic'>
                <AiOutlineFieldTime className='w-5 h-5 text-gray-500' />{' '}
                {moment(createdAt).fromNow()}
            </h3> */}

            <div className='relative'>
                <img
                    className='object-cover w-full h-48 rounded-lg'
                    src={thumbnailUrl}
                    alt={title}
                />
                <div className='absolute p-2 rounded-full bg-white/80 top-2 right-2'>
                    <span className='text-4xl font-bold text-white'>
                        {getRanking(index)}
                    </span>
                </div>
            </div>

            <div className='py-2 space-y-3'>
                <div className='flex items-center text-gray-500 justify-evenly'>
                    <div className='flex items-center gap-1'>
                        <AiOutlineLike className='w-6 h-6 text-gray-500' />
                        <span className='mr-4 text-sm font-semibold text-gray-300'>
                            {formatCount(likeCount)}
                        </span>
                    </div>

                    <div className='flex items-center gap-1'>
                        <AiOutlineComment className='w-6 h-6 text-gray-500 ' />
                        <span className='mr-4 text-sm font-semibold text-gray-300'>
                            {formatCount(commentCount)}
                        </span>
                    </div>

                    <div className='flex items-center gap-1'>
                        <TbChartInfographic className='w-6 h-6 text-gray-500 ' />
                        <span className='mr-4 text-sm font-semibold text-gray-300'>
                            {formatCount(viewCount)}
                        </span>
                    </div>
                    {total && (
                        <div className='flex items-center gap-1 animate-pulse'>
                            <TbSum className='w-6 h-6 text-gray-500 ' />
                            <span className='mr-4 text-sm font-semibold text-green-300'>
                                {formatCount(total)}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VideoCard;
