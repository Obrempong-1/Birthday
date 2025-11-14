/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect } from "react";
import { Camera, Download, RefreshCw, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { toast } from "sonner";

interface Filter {
  id: string;
  name: string;
  frame: string;
  style: React.CSSProperties;
}

const PhotoBooth = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user");

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const selectedFilter: Filter = {
    id: "birthday-sparkle",
    name: "Birthday Sparkle",
    frame: "🎂✨🎈",
    style: { filter: "brightness(1.1) saturate(1.3) hue-rotate(10deg)" },
  };

  useEffect(() => {
    if (isOpen) startCamera();
    else stopCamera();
    return () => stopCamera();
  }, [isOpen, facingMode]);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode, width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      setStream(mediaStream);
      if (videoRef.current) videoRef.current.srcObject = mediaStream;
      toast.success("Camera ready!");
    } catch (error) {
      console.error("Error accessing camera:", error);
      toast.error("Could not access camera. Please check permissions.");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const switchCamera = () =>
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"));

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.filter = selectedFilter.style.filter;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    ctx.filter = "none";

    if (selectedFilter.frame) {
      const fontSize = Math.floor(canvas.width / 15);
      ctx.font = `${fontSize}px Arial`;
      ctx.textAlign = "center";
      ctx.fillText(selectedFilter.frame, canvas.width / 2, fontSize * 1.5);
      ctx.fillText(selectedFilter.frame, canvas.width / 2, canvas.height - fontSize * 0.5);
    }

    const overlayFontSize = Math.floor(canvas.width / 20);
    ctx.font = `bold ${overlayFontSize}px Arial`;
    ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
    ctx.strokeStyle = "rgba(0, 0, 0, 0.5)";
    ctx.lineWidth = 3;

    const text = "Nana Yaw's 1st Birthday! 🎂";
    const textY = canvas.height - overlayFontSize * 2;
    ctx.strokeText(text, canvas.width / 2, textY);
    ctx.fillText(text, canvas.width / 2, textY);

    const imageData = canvas.toDataURL("image/png");
    setCapturedImage(imageData);
    playShutterSound();
    toast.success("Photo captured! 📸");
  };

  const playShutterSound = () => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    oscillator.frequency.value = 800;
    oscillator.type = "sine";
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  };

  const downloadPhoto = () => {
    if (!capturedImage) return;
    const link = document.createElement("a");
    link.download = `nanayaw-birthday-${Date.now()}.png`;
    link.href = capturedImage;
    link.click();
    toast.success("Photo downloaded! 🎉");
  };

  const retakePhoto = () => setCapturedImage(null);

  const handleClose = () => {
    stopCamera();
    setIsOpen(false);
  };

  return (
    <>
      <Button
        size="lg"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 rounded-full shadow-2xl gradient-celebration text-white hover:scale-110 transition-all duration-300 animate-bounce-in"
      >
        <Camera className="mr-2 w-5 h-5" />
        Photo Booth
      </Button>

      <Dialog open={isOpen}>
        <DialogContent className="w-screen h-screen p-0 overflow-hidden">
          <div
            className="relative w-full h-full bg-muted flex flex-col"
            style={{ paddingTop: "calc(env(safe-area-inset-top) + 2rem)" }}
          >
            
            <button
              onClick={handleClose}
              className="absolute z-50 p-3 bg-black/50 rounded-full hover:bg-black/70 transition"
              style={{
                top: "calc(env(safe-area-inset-top) + 1.5rem)",
                right: "calc(env(safe-area-inset-right) + 1rem)",
              }}
            >
              <X className="w-6 h-6 text-white" />
            </button>

            
            <div
              className="absolute top-0 left-0 w-full z-20 flex justify-center"
              style={{ paddingTop: "calc(env(safe-area-inset-top) + 2rem)" }}
            >
              <h1 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
                <Camera className="w-5 sm:w-6 h-5 sm:h-6 text-primary" />
                Birthday Photo Booth 📸
              </h1>
            </div>

            
            <div className="relative flex-1 w-full h-full">
              {!capturedImage ? (
                <>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    style={selectedFilter.style}
                  />

                  <div className="absolute top-24 left-1/2 -translate-x-1/2 text-3xl sm:text-4xl animate-bounce">
                    {selectedFilter.frame}
                  </div>
                  <div
                    className="absolute bottom-40 left-1/2 -translate-x-1/2 text-3xl sm:text-4xl animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  >
                    {selectedFilter.frame}
                  </div>

                  <div className="absolute bottom-32 left-1/2 -translate-x-1/2 bg-background/90 backdrop-blur-sm px-4 py-2 rounded-full font-bold text-base text-center">
                    Nana Yaw&apos;s 1st Birthday! 🎂
                  </div>
                </>
              ) : (
                <img
                  src={capturedImage}
                  alt="Captured"
                  className="absolute top-0 left-0 w-full h-full object-contain"
                />
              )}
            </div>

            
            <div
              className="absolute left-0 w-full flex flex-wrap justify-center gap-2 p-4 bg-black/20 backdrop-blur-sm z-20"
              style={{ bottom: "calc(env(safe-area-inset-bottom) + 1.5rem)" }}
            >
              {!capturedImage ? (
                <>
                  <Button
                    size="lg"
                    onClick={capturePhoto}
                    className="gradient-primary text-white hover:scale-105 transition-all"
                  >
                    <Camera className="mr-2 w-5 h-5" />
                    Capture
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={switchCamera}
                    className="hover:scale-105 transition-all"
                  >
                    <RefreshCw className="mr-2 w-4 h-4" />
                    Switch Camera
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    size="lg"
                    onClick={downloadPhoto}
                    className="gradient-celebration text-white hover:scale-105 transition-all"
                  >
                    <Download className="mr-2 w-5 h-5" />
                    Download
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={retakePhoto}
                    className="hover:scale-105 transition-all"
                  >
                    <Camera className="mr-2 w-5 h-5" />
                    Retake
                  </Button>
                </>
              )}
            </div>
          </div>
          <canvas ref={canvasRef} className="hidden" />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PhotoBooth;
