
import React, { useState, useCallback } from 'react';
import { generateImage } from '../services/geminiService';
import Spinner from './Spinner';

const ImageGenerator: React.FC = () => {
  const initialPrompt = "Person standing by sunrise, deep in thought.";
  const [prompt, setPrompt] = useState<string>(initialPrompt);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!prompt.trim()) {
      setError("Prompt cannot be empty.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setImageSrc(null);

    try {
      const imageUrl = await generateImage(prompt);
      setImageSrc(imageUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  }, [prompt]);

  return (
    <div className="w-full max-w-2xl bg-gray-800/50 rounded-2xl shadow-2xl p-6 md:p-8 border border-gray-700 backdrop-blur-lg">
      <div className="space-y-6">
        <div>
          <label htmlFor="prompt" className="block text-sm font-medium text-gray-300 mb-2">
            Your Vision
          </label>
          <textarea
            id="prompt"
            rows={3}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full bg-gray-900/70 border border-gray-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 placeholder-gray-500"
            placeholder="e.g., A futuristic city at sunset..."
            disabled={isLoading}
          />
        </div>
        <button
          onClick={handleGenerate}
          disabled={isLoading}
          className="w-full flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isLoading ? <Spinner /> : 'Generate Image'}
        </button>

        {error && <p className="text-red-400 text-center bg-red-900/50 p-3 rounded-lg">{error}</p>}

        <div className="mt-6 w-full aspect-video bg-gray-900/70 rounded-lg flex items-center justify-center border border-dashed border-gray-600 overflow-hidden">
          {isLoading && (
            <div className="text-center text-gray-400">
              <p>Dreaming up your vision...</p>
              <p className="text-sm mt-1">This can take a moment.</p>
            </div>
          )}
          {!isLoading && imageSrc && (
            <img src={imageSrc} alt={prompt} className="w-full h-full object-contain" />
          )}
          {!isLoading && !imageSrc && (
             <div className="text-center text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="mt-2">Your generated image will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageGenerator;
