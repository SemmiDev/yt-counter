import axios from 'axios';

const API_URL = 'https://www.googleapis.com/youtube/v3/videos';
const PARTS = 'statistics%2Csnippet';

export const fetchVideoMetrics = async (videoId, apiKey) => {
    try {
        const response = await axios.get(
            `${API_URL}?part=${PARTS}&id=${videoId}&key=${apiKey}`
        );
        const videoData = response.data?.items?.[0];

        if (!videoData || !videoData.statistics || !videoData.snippet) {
            throw new Error('Invalid response data');
        }

        const { statistics, snippet } = videoData;
        const { viewCount, likeCount, commentCount } = statistics;
        const { title, thumbnails } = snippet;
        const thumbnailUrl = thumbnails?.medium?.url;

        return {
            videoId,
            viewCount,
            likeCount,
            commentCount,
            title,
            thumbnailUrl,
        };
    } catch (error) {
        console.log(`Error fetching video data for ${videoId}:`, error.message);
        return null;
    }
};

export const fetchContentMetrics = async (videoIds, apiKey) => {
    try {
        const requests = videoIds.map(async (videoId) => {
            return await fetchVideoMetrics(videoId, apiKey);
        });

        const videosMetrics = await Promise.all(requests);
        return videosMetrics.filter((metrics) => metrics !== null);
    } catch (error) {
        console.error('Error fetching video data:', error);
    }
};
