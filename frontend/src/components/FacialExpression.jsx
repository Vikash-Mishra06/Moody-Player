import React, { useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';
import MoodSongs from './Songs';
export default function FacialExpression() {
    const videoRef = useRef();

    const loadModels = async () => {
        const MODEL_URL = '/models';
        await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
        await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
    };
    const startVideo = () => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
                videoRef.current.srcObject = stream;
            })
            .catch((err) => console.error("Error accessing webcam: ", err));
    };
    async function detectMood() {
        const detections = await faceapi
            .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
            .withFaceExpressions();

        let mostProbableExpression = 0
        let _expression = '';

        if (!detections || detections.length === 0) {
            console.log("No face detected")
            return
        }

        for (const expression of Object.keys(detections[0].expressions)) {
            if (detections[0].expressions[expression] > mostProbableExpression) {
                mostProbableExpression = detections[0].expressions[expression]
                _expression = expression
            }
        }
        console.log(_expression)
    }
    useEffect(() => {

        loadModels().then(startVideo);
    }, []);
    return (
        <div className='flex flex-col p-5'>
            <h1 className='text-xl font-semibold'>/Moody Player</h1>
            <div className='flex flex-col gap-10 pt-10 md:px-20 md:py-10'>
                <h1 className='text-3xl'>Live Mood Detection</h1>
                <div className='grid grid-cols-1 md:grid-cols-2 w-full items-start gap-5'>
                    <div className='flex items-center justify-start gap-10 '>
                        <video
                            ref={videoRef}
                            autoPlay
                            muted
                            className='w-[40rem] aspect-16/9 object-cover rounded-lg'
                        />
                    </div>
                    <div className='flex flex-col items-baseline justify-start'>
                        <h1 className='text-3xl'>Detect Your Mood</h1>
                        <p className='text-lg pt-2 pb-5'>Just click below button and listen songs based on your Mood.</p>
                        <button className='px-4 py-2 active:bg-[#1c1c1c] rounded-2xl bg-black/10 border border-gray-400 cursor-pointer' onClick={detectMood}>Detect Mood</button>
                    </div>
                </div>
                <MoodSongs />
            </div>
        </div>
    );
}