import React, { useRef } from 'react'

const MoodSongs = ({ songs }) => {
  const audioRefs = useRef([]);

  const handlePlay = (index) => {
    // Pause all other songs first
    audioRefs.current.forEach((audio, i) => {
      if (audio && i !== index) {
        audio.pause();
      }
    });

    // Then play the selected song
    const audio = audioRefs.current[index];
    if (audio) {
      audio.play().catch((err) => console.log("Playback error:", err));
    }
  };

  const handlePause = (index) => {
    const audio = audioRefs.current[index];
    if (audio) {
      audio.pause();
    }
  };

  return (
    <div>
      <h1>Recommended Songs</h1>
      {songs.map((song, index) => (
        <div key={index} className="flex flex-col gap-2 p-4 border-b border-gray-700">
          <h2 className="text-xl font-semibold">{song.title}</h2>
          <div className="flex items-center justify-between">
            <p className="text-gray-300">{song.artist}</p>

            <div className="flex items-center gap-4">
              {/* Hidden audio element */}
              <audio
                ref={(el) => (audioRefs.current[index] = el)}
                src={song.url || song.audio} // support both field names
                style={{ display: 'none' }}
              ></audio>

              {/* ▶️ Play button */}
              <button onClick={() => handlePlay(index)}>
                <span className="py-2 px-4 active:bg-[#1c1c1c] rounded-full text-sm md:text-xl border border-gray-400 cursor-pointer">
                  <i className="ri-play-large-fill"></i>
                </span>
              </button>

              {/* ⏸ Pause button */}
              <button onClick={() => handlePause(index)}>
                <span className="py-2 px-4 active:bg-[#1c1c1c] rounded-full text-sm md:text-xl border border-gray-400 cursor-pointer">
                  <i className="ri-pause-large-line"></i>
                </span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default MoodSongs
