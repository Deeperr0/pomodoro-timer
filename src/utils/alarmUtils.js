
export default function handleAlarmSoundChange(e, setAlarmSoundURL){
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const audioContext = new (window.AudioContext ||
          window.webkitAudioContext)();

        audioContext.decodeAudioData(
          event.target.result,
          (audioBuffer) => {
            // Get the sample rate and create a 10-second buffer
            const sampleRate = audioBuffer.sampleRate;
            const trimmedLength = Math.min(sampleRate * 10, audioBuffer.length);
            const trimmedBuffer = audioContext.createBuffer(
              audioBuffer.numberOfChannels,
              trimmedLength,
              sampleRate
            );

            // Copy audio data to trimmed buffer
            for (let i = 0; i < audioBuffer.numberOfChannels; i++) {
              const sourceData = audioBuffer.getChannelData(i);
              const trimmedData = trimmedBuffer.getChannelData(i);
              trimmedData.set(sourceData.slice(0, trimmedLength));
            }

            // Convert trimmed buffer to WAV and then Base64
            const wavBlob = audioBufferToWav(trimmedBuffer);
            const wavReader = new FileReader();

            wavReader.onload = () => {
              const base64Sound = wavReader.result;
              localStorage.setItem("alarmSound", base64Sound);
              setAlarmSoundURL(base64Sound);
              console.log("Trimmed alarm sound (10s) saved to localStorage!");
            };

            wavReader.readAsDataURL(wavBlob);
          },
          (error) => {
            console.error("Error decoding audio:", error);
          }
        );
      };

      reader.readAsArrayBuffer(file);
    }
  };

  // Helper function to convert AudioBuffer to WAV Blob
  export function audioBufferToWav(audioBuffer) {
    const numberOfChannels = audioBuffer.numberOfChannels;
    const sampleRate = audioBuffer.sampleRate;
    const format = 1; // PCM
    const bitDepth = 16;

    const bytesPerSample = bitDepth / 8;
    const frameLength = audioBuffer.length;

    const channelData = [];
    for (let i = 0; i < numberOfChannels; i++) {
      channelData.push(audioBuffer.getChannelData(i));
    }

    const bufferLength = 44 + frameLength * numberOfChannels * bytesPerSample;
    const arrayBuffer = new ArrayBuffer(bufferLength);
    const view = new DataView(arrayBuffer);

    const writeString = (offset, string) => {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
      }
    };

    writeString(0, "RIFF");
    view.setUint32(4, bufferLength - 8, true);
    writeString(8, "WAVE");
    writeString(12, "fmt ");
    view.setUint32(16, 16, true); // subChunk1Size
    view.setUint16(20, format, true);
    view.setUint16(22, numberOfChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * numberOfChannels * bytesPerSample, true);
    view.setUint16(32, numberOfChannels * bytesPerSample, true);
    view.setUint16(34, bitDepth, true);
    writeString(36, "data");
    view.setUint32(40, frameLength * numberOfChannels * bytesPerSample, true);

    let offset = 44;
    for (let i = 0; i < frameLength; i++) {
      for (let channel = 0; channel < numberOfChannels; channel++) {
        const sample = Math.max(-1, Math.min(1, channelData[channel][i]));
        view.setInt16(
          offset,
          sample < 0 ? sample * 0x8000 : sample * 0x7fff,
          true
        );
        offset += 2;
      }
    }

    return new Blob([arrayBuffer], { type: "audio/wav" });
  }