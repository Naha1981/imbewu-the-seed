import React, { useState, useRef, useEffect } from 'react';
import { 
  Mic, 
  Square, 
  RotateCcw, 
  Check, 
  Volume2, 
  Sparkles, 
  ShieldAlert, 
  Headphones, 
  Heart, 
  User, 
  School,
  Clock,
  ArrowRight
} from 'lucide-react';
import type { VoiceProfile, VoiceCalibrationLanguage } from '../../types';
import { FishAudioService, CALIBRATION_SCRIPTS } from '../../services/FishAudioService';

interface VoiceCloningStudioProps {
  initialRole?: 'parent' | 'teacher';
  onVoiceCalibrated: (profile: VoiceProfile) => void;
  onCancel?: () => void;
}

export const VoiceCloningStudio: React.FC<VoiceCloningStudioProps> = ({
  initialRole = 'parent',
  onVoiceCalibrated,
  onCancel
}) => {
  const [role, setRole] = useState<'parent' | 'teacher'>(initialRole);
  const [selectedLanguage, setSelectedLanguage] = useState<VoiceCalibrationLanguage>('zu');
  const [speakerName, setSpeakerName] = useState(initialRole === 'parent' ? "Mommy Lerato" : "Teacher Thandi");
  
  // Recording states: 'idle' | 'recording' | 'processing' | 'completed' | 'error'
  const [recordingState, setRecordingState] = useState<'idle' | 'recording' | 'processing' | 'completed' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [countdownSeconds, setCountdownSeconds] = useState(30);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [calibratedProfile, setCalibratedProfile] = useState<VoiceProfile | null>(null);
  const [isPlayingTestAudio, setIsPlayingTestAudio] = useState(false);

  // Audio & Canvas references
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const countdownIntervalRef = useRef<any>(null);

  const activeScript = CALIBRATION_SCRIPTS[selectedLanguage];

  // Clean up audio resources on unmount
  useEffect(() => {
    return () => {
      stopMediaStream();
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  const stopMediaStream = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }
  };

  // Draw real-time audio waveform from microphone onto canvas
  const drawWaveform = () => {
    if (!canvasRef.current || !analyserRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const analyser = analyserRef.current;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const render = () => {
      animationFrameRef.current = requestAnimationFrame(render);
      analyser.getByteTimeDomainData(dataArray);

      ctx.fillStyle = '#14213D';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.lineWidth = 3;
      ctx.strokeStyle = '#2A9D8F';
      ctx.beginPath();

      const sliceWidth = canvas.width / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * canvas.height) / 2;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
        x += sliceWidth;
      }

      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();
    };

    render();
  };

  // Start 30-Second Voice Calibration Recording
  const handleStartRecording = async () => {
    setErrorMessage(null);
    chunksRef.current = [];
    setRecordedBlob(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });
      mediaStreamRef.current = stream;

      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const audioCtx = new AudioCtx();
      audioContextRef.current = audioCtx;

      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 2048;
      analyserRef.current = analyser;

      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);

      drawWaveform();

      // Setup MediaRecorder
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/wav' });
        setRecordedBlob(blob);
        await processVoiceCalibration(blob);
      };

      mediaRecorder.start(250);
      setRecordingState('recording');
      setCountdownSeconds(30);

      // 30-Second countdown
      countdownIntervalRef.current = setInterval(() => {
        setCountdownSeconds((prev) => {
          if (prev <= 1) {
            handleStopRecording();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

    } catch (err: any) {
      console.error('Microphone access failed:', err);
      setRecordingState('error');
      setErrorMessage(
        err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError'
          ? 'Microphone permission denied. Please allow microphone access in your browser settings to clone your voice.'
          : 'Could not access microphone hardware. Please check your audio input device.'
      );
    }
  };

  // Stop Recording manually or at 30 seconds
  const handleStopRecording = () => {
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }

    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }

    stopMediaStream();
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
  };

  // Process & Upload to Fish Audio API (s2.1-pro)
  const processVoiceCalibration = async (blob: Blob) => {
    setRecordingState('processing');
    try {
      const profile = await FishAudioService.createVoiceModel({
        audioBlob: blob,
        speakerName,
        role,
        language: selectedLanguage
      });
      setCalibratedProfile(profile);
      setRecordingState('completed');
    } catch (err) {
      console.error('Failed to calibrate voice profile:', err);
      setRecordingState('error');
      setErrorMessage('Voice synthesis calibration encountered an issue. Please try re-recording.');
    }
  };

  // Test read-aloud using the calibrated voice
  const handleTestClonedVoice = () => {
    if (isPlayingTestAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingTestAudio(false);
      return;
    }

    setIsPlayingTestAudio(true);
    FishAudioService.synthesizeExpressiveVoice({
      text: activeScript.text,
      language: selectedLanguage,
      role,
      onEnd: () => setIsPlayingTestAudio(false)
    });
  };

  const handleUseThisVoice = () => {
    if (calibratedProfile) {
      onVoiceCalibrated(calibratedProfile);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EADFCF] shadow-xl max-w-2xl mx-auto space-y-6 animate-in fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#EADFCF]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E07A5F]/15 text-[#E07A5F] text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Fish Audio s2.1-pro Voice Studio</span>
          </div>
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#14213D]">
            Clone Your Voice for Bedtime & Creche
          </h2>
          <p className="text-xs sm:text-sm text-[#6B7280]">
            Record 30 seconds of your warm voice to personalize bedtime adventures and classroom rest-time stories.
          </p>
        </div>

        {onCancel && (
          <button
            onClick={onCancel}
            className="text-xs font-bold text-gray-400 hover:text-black shrink-0"
          >
            ✕ Cancel
          </button>
        )}
      </div>

      {/* Role & Speaker Setup */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-[#14213D] mb-1.5">Who is speaking?</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => {
                setRole('parent');
                if (speakerName.includes('Teacher')) setSpeakerName("Mommy Lerato");
              }}
              className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                role === 'parent'
                  ? 'border-[#E07A5F] bg-[#E07A5F]/10 text-[#14213D]'
                  : 'border-[#EADFCF] text-[#4B5563] hover:bg-[#FAF7F2]'
              }`}
            >
              <Heart className="w-3.5 h-3.5 text-[#E07A5F]" />
              <span>Parent / Mommy</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setRole('teacher');
                if (speakerName.includes('Mommy')) setSpeakerName("Teacher Thandi");
              }}
              className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                role === 'teacher'
                  ? 'border-[#2A9D8F] bg-[#2A9D8F]/10 text-[#14213D]'
                  : 'border-[#EADFCF] text-[#4B5563] hover:bg-[#FAF7F2]'
              }`}
            >
              <School className="w-3.5 h-3.5 text-[#2A9D8F]" />
              <span>Creche Teacher</span>
            </button>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-[#14213D] mb-1.5">Voice Profile Label:</label>
          <input
            type="text"
            value={speakerName}
            onChange={(e) => setSpeakerName(e.target.value)}
            placeholder="e.g. Mommy Lerato, Papa Sipho"
            className="w-full bg-[#FAF7F2] border border-[#EADFCF] rounded-xl px-3 py-2 text-xs font-bold text-[#14213D]"
          />
        </div>
      </div>

      {/* Language Calibration Script Tabs */}
      <div>
        <label className="block text-xs font-bold text-[#14213D] mb-2">
          Select Your Native Language Calibration Script:
        </label>
        <div className="grid grid-cols-3 gap-2 mb-3">
          {(['zu', 'st', 'en'] as VoiceCalibrationLanguage[]).map((lang) => (
            <button
              key={lang}
              type="button"
              onClick={() => setSelectedLanguage(lang)}
              className={`p-2.5 rounded-xl text-xs font-bold border transition-all ${
                selectedLanguage === lang
                  ? 'bg-[#14213D] text-white border-[#14213D] shadow-xs'
                  : 'bg-[#FAF7F2] text-[#4B5563] border-[#EADFCF] hover:bg-[#F4EDE2]'
              }`}
            >
              {lang === 'zu' && 'isiZulu'}
              {lang === 'st' && 'Sesotho'}
              {lang === 'en' && 'SA English'}
            </button>
          ))}
        </div>

        {/* Read-Aloud Script Box */}
        <div className="p-4 bg-[#FAF7F2] border border-[#EADFCF] rounded-2xl relative">
          <span className="text-[10px] uppercase font-bold text-[#E07A5F] block mb-1 tracking-wider">
            {activeScript.languageLabel} · Read aloud warmly:
          </span>
          <p className="font-editorial text-base sm:text-lg text-[#14213D] italic leading-relaxed">
            “{activeScript.text}”
          </p>
          <p className="text-[11px] text-[#6B7280] mt-2">
            💡 {activeScript.culturalContext}
          </p>
        </div>
      </div>

      {/* Recording Studio & Waveform Visualizer */}
      <div className="space-y-4">
        
        {/* Real-time Waveform Canvas */}
        <div className="h-28 bg-[#14213D] rounded-2xl overflow-hidden relative flex items-center justify-center border border-gray-800">
          <canvas
            ref={canvasRef}
            width={600}
            height={112}
            className="w-full h-full object-cover"
          />

          {recordingState === 'idle' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 text-white text-xs gap-1">
              <Mic className="w-5 h-5 text-gray-300 animate-pulse" />
              <span>Waveform visualizer ready. Press 'Start 30s Recording'</span>
            </div>
          )}

          {recordingState === 'recording' && (
            <div className="absolute top-3 right-3 flex items-center gap-2 bg-red-500/80 backdrop-blur-xs text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
              <span className="w-2 h-2 rounded-full bg-white" />
              <span>RECORDING ({countdownSeconds}s)</span>
            </div>
          )}
        </div>

        {/* Countdown & Progress Bar */}
        {recordingState === 'recording' && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-[#6B7280] font-medium">
              <span>Calibration Progress:</span>
              <span className="font-bold text-[#E07A5F]">{30 - countdownSeconds} / 30 seconds</span>
            </div>
            <div className="w-full h-2.5 bg-[#FAF7F2] rounded-full overflow-hidden border border-[#EADFCF]">
              <div
                className="h-full bg-[#E07A5F] transition-all duration-1000 ease-linear"
                style={{ width: `${((30 - countdownSeconds) / 30) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Error Alert */}
        {recordingState === 'error' && errorMessage && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-xs text-red-900 flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold mb-0.5">Microphone Notice</p>
              <p>{errorMessage}</p>
            </div>
          </div>
        )}

        {/* Processing State */}
        {recordingState === 'processing' && (
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-900 flex items-center gap-3">
            <div className="w-5 h-5 border-2 border-amber-600 border-t-transparent rounded-full animate-spin shrink-0" />
            <div>
              <p className="font-bold">Calibrating with Fish Audio s2.1-pro...</p>
              <p className="text-[11px] text-amber-800">Extracting vocal acoustics, warmth, and Soweto cadence.</p>
            </div>
          </div>
        )}

        {/* Completed State */}
        {recordingState === 'completed' && calibratedProfile && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-in fade-in">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-emerald-200 flex items-center justify-center text-emerald-800 font-bold">
                ✓
              </span>
              <div>
                <p className="font-bold text-emerald-900">Voice Cloned Successfully!</p>
                <p className="text-[11px] text-emerald-800">
                  Model ID: <code className="bg-emerald-100 px-1 py-0.5 rounded">{calibratedProfile.voiceModelId}</code> · Match Quality: {calibratedProfile.qualityScore}%
                </p>
              </div>
            </div>

            <button
              onClick={handleTestClonedVoice}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-emerald-300 text-emerald-900 text-xs font-bold hover:bg-emerald-100 transition-all shrink-0"
            >
              <Volume2 className="w-3.5 h-3.5 text-emerald-700" />
              <span>{isPlayingTestAudio ? 'Stop Preview' : 'Listen to Cloned Voice'}</span>
            </button>
          </div>
        )}

      </div>

      {/* Studio Action Buttons */}
      <div className="pt-4 border-t border-[#EADFCF] flex flex-col sm:flex-row items-center justify-between gap-3">
        
        {recordingState === 'idle' && (
          <button
            onClick={handleStartRecording}
            className="w-full py-3.5 rounded-full bg-[#E07A5F] hover:bg-[#D46A4F] text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
          >
            <Mic className="w-4 h-4" />
            <span>Start 30s Voice Calibration</span>
          </button>
        )}

        {recordingState === 'recording' && (
          <button
            onClick={handleStopRecording}
            className="w-full py-3.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 transition-all"
          >
            <Square className="w-4 h-4 fill-white" />
            <span>Finish Recording Early ({countdownSeconds}s left)</span>
          </button>
        )}

        {recordingState === 'completed' && (
          <div className="w-full flex flex-col sm:flex-row items-center gap-2">
            <button
              onClick={() => {
                setRecordingState('idle');
                setCalibratedProfile(null);
              }}
              className="w-full sm:w-auto py-3 px-5 rounded-full bg-[#FAF7F2] hover:bg-[#F4EDE2] border border-[#EADFCF] text-[#4B5563] font-bold text-xs flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Re-record</span>
            </button>

            <button
              onClick={handleUseThisVoice}
              className="w-full sm:flex-1 py-3.5 rounded-full bg-[#2A9D8F] hover:bg-[#238276] text-white font-bold text-xs shadow-md flex items-center justify-center gap-2"
            >
              <span>Use This Voice in Audio Book Studio</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {recordingState === 'error' && (
          <button
            onClick={() => setRecordingState('idle')}
            className="w-full py-3.5 rounded-full bg-[#14213D] text-white font-bold text-xs shadow-sm flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
        )}

      </div>

    </div>
  );
};
