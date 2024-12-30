const { YoutubeTranscript } = require('youtube-transcript');
const axios = require('axios');
const Transcript = require('../models/Transcript');

exports.getTranscript = async (req, res) => {
  try {
    const { videoUrl } = req.body;
    const videoId = extractVideoId(videoUrl);

    // Check if transcript exists in database
    let existingTranscript = await Transcript.findOne({ videoId });
    if (existingTranscript) {
      return res.json(existingTranscript);
    }

    // Get video title from YouTube
    const videoTitle = await getVideoTitle(videoId);
    
    // Get transcript from YouTube
    const transcript = await YoutubeTranscript.fetchTranscript(videoId);
    const fullText = transcript.map(t => t.text).join(' ');

    // Save to database
    const newTranscript = new Transcript({
      videoId,
      videoTitle,
      transcript: fullText,
    });

    await newTranscript.save();
    res.json(newTranscript);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getVideoTitle = async (videoId) => {
  try {
    const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${process.env.YOUTUBE_API_KEY}&part=snippet`);
    return response.data.items[0].snippet.title;
  } catch (error) {
    console.error('Error fetching video title:', error);
    return 'Untitled Video';
  }
};

const extractVideoId = (url) => {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}; 