import React, { useState } from 'react';
import axios from 'axios';

const TranscriptExtractor = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:5000/api/transcript/extract', {
        videoUrl: url,
      });
      setResult(response.data);
    } catch (error) {
      setError(error.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="space-y-8">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          YouTube Transcript Extractor
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col space-y-2">
            <input
              type="text"
              placeholder="Enter YouTube URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 px-4 rounded-md text-white font-medium
                ${loading 
                  ? 'bg-blue-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700'
                }`}
            >
              {loading ? 'Extracting...' : 'Extract Transcript'}
            </button>
          </div>
        </form>

        {error && (
          <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-md shadow">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {result.videoTitle}
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                Video ID: {result.videoId}
              </p>
              
              {/* YouTube Video Embed */}
              <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-md">
                <iframe
                  src={`https://www.youtube.com/embed/${result.videoId}`}
                  title={result.videoTitle}
                  className="absolute top-0 left-0 w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
            
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-gray-800">Transcript</h2>
              <div className="bg-white p-4 rounded-md shadow max-h-96 overflow-y-auto">
                <p className="text-gray-600 whitespace-pre-line">
                  {result.transcript}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TranscriptExtractor; 