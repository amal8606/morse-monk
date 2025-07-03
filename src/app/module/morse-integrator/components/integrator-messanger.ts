import { CommonModule } from "@angular/common";
import { Component, HostListener } from "@angular/core";
interface ToneSegment {
  start: number;
  duration: number;
}

@Component({
    selector: 'app-integrator-messanger',
    standalone:true,
    imports:[CommonModule],
    templateUrl: './integrator-messanger.component.html',
})

export class IntegratorMessangerComponent {
   audioCtx: AudioContext | null = null;
  oscillator: OscillatorNode | null = null;
 recordingStartedAt: number = 0;
  currentStartTime: number = 0;
    toneSegments: ToneSegment[] = [];
  toneActive = false;
  recordingStart = 0;
  toneStartTime = 0;
   selectedUser: any = null;

  audioUrl = '';
  isRecording = false;
  mediaRecorder: any;
  audioChunks: Blob[] = [];
  //prevent page reload
  @HostListener('window:beforeunload', ['$event'])
handleBeforeUnload(event: BeforeUnloadEvent) {
  if (this.isRecording || this.audioUrl!='') {
    event.preventDefault();
    event.returnValue = 'You are recording. Leaving now will delete the unsaved Morse code.';
  }
}
  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Control' && !this.toneActive && this.selectedUser) {
      this.startTone();
    }
  }

  @HostListener('window:keyup', ['$event'])
  handleKeyUp(event: KeyboardEvent) {
    if (event.key === 'Control' && this.toneActive&&this.selectedUser) {
      this.stopTone();
    }
  }
   users = [
    { name: 'Alice Monk', country: 'India', avatar: 'https://i.pravatar.cc/150?img=1' },
    { name: 'Ethan Sage', country: 'USA', avatar: 'https://i.pravatar.cc/150?img=2' },
    { name: 'Liu Chen', country: 'China', avatar: 'https://i.pravatar.cc/150?img=3' },
    { name: 'Amina Noor', country: 'UAE', avatar: 'https://i.pravatar.cc/150?img=4' },
    { name: 'Carlos Rivera', country: 'Mexico', avatar: 'https://i.pravatar.cc/150?img=5' },
  ];
  countries = ['India', 'USA', 'China', 'UAE', 'Mexico'];
  selectedCountry = '';
 

  filteredUsers() {
    return this.selectedCountry
      ? this.users.filter(u => u.country === this.selectedCountry)
      : this.users;
  }

  openRecorderModal(user: any) {
    this.selectedUser = user;
  }
public confirmCloseModal(){
  const message = '⚠️ You are recording or have unsaved audio. Closing will delete your Morse code. Do you want to proceed?';
  const shouldWarn = this.isRecording || 
                  (this.audioUrl !== null && this.audioUrl !== undefined && this.audioUrl !== '');

if (shouldWarn) {
  if (confirm(message)) this.closeModal();
} else {
  this.closeModal();
}
}
  closeModal() {
     // Stop any ongoing tone
  if (this.toneActive) {
    this.stopTone();
  }

  // Stop and close audio context if recording
  if (this.audioCtx) {
    this.audioCtx.close();
    this.audioCtx = null;
  }

  // Reset all recording state
  this.selectedUser = null;
  this.audioUrl = '';
  this.audioChunks = [];
  this.toneSegments = [];
  this.isRecording = false;
  this.mediaRecorder = null;
  this.oscillator = null;
  }

  toggleRecording() {
    if (this.isRecording) {
      this.mediaRecorder.stop();
      this.isRecording = false;
    } else {
      navigator.mediaDevices.getUserMedia({
  audio: {
    echoCancellation: false,
    noiseSuppression: false,
    sampleRate: 44100
  }
}).then(stream => {
  this.mediaRecorder = new MediaRecorder(stream, {
    mimeType: 'audio/webm;codecs=opus'
  });
  this.mediaRecorder.start();
  this.audioChunks = [];
  this.isRecording = true;

  this.mediaRecorder.ondataavailable = (e: any) => this.audioChunks.push(e.data);
  this.mediaRecorder.onstop = () => {
    const blob = new Blob(this.audioChunks, { type: 'audio/webm' });
    this.audioUrl = URL.createObjectURL(blob);
        };
      });
    }
  }


  sendToUser() {
     const whatsappUrl = `https://wa.me/918606927326`;
    window.open(whatsappUrl, '_blank');
  }

//  downloadAudio() {
//     if (this.audioUrl) {
//       const a = document.createElement('a');
//       a.href = this.audioUrl;
//       a.download = 'voice-message.webm';
//       a.click();
//     }
//   }

  sendViaWhatsApp() {
    alert('WhatsApp does not support sending audio files directly via link. Please download the audio and send it manually through WhatsApp.');
  }
  

   startTone() {
    if (!this.audioCtx) {
      this.audioCtx = new AudioContext();
      this.recordingStart = this.audioCtx.currentTime;
      this.toneSegments = [];
      this.isRecording = true;
    }

    if (!this.toneActive) {
      this.toneStartTime = this.audioCtx.currentTime - this.recordingStart;
      this.toneActive = true;

      this.oscillator = this.audioCtx.createOscillator();
      this.oscillator.type = 'sine';
      this.oscillator.frequency.setValueAtTime(500, this.audioCtx.currentTime);
      this.oscillator.connect(this.audioCtx.destination);
      this.oscillator.start();
    }
  }

  stopTone() {
    if (this.audioCtx && this.toneActive) {
      const toneEndTime = this.audioCtx.currentTime - this.recordingStart;
      const duration = toneEndTime - this.toneStartTime;
      if (duration > 0.01) {
        this.toneSegments.push({ start: this.toneStartTime, duration });
      }
      this.toneActive = false;

      if (this.oscillator) {
        this.oscillator.stop();
        this.oscillator.disconnect();
        this.oscillator = null;
      }
    }
  }

 async stopRecording() {
  this.stopTone();
  if (!this.audioCtx || this.toneSegments.length === 0) {
    if (this.audioCtx) {
      this.audioCtx.close();
      this.audioCtx = null;
    }
    this.isRecording = false;
    return;
  }

  // Use current audio context's sample rate
  const sampleRate = this.audioCtx.sampleRate;
  const totalDuration = Math.max(...this.toneSegments.map(s => s.start + s.duration)) + 0.5;
  const length = Math.ceil(totalDuration * sampleRate);

  // Create buffer directly
  const buffer = this.audioCtx.createBuffer(1, length, sampleRate);
  const data = buffer.getChannelData(0);

  // Initialize with silence
  data.fill(0);

  // Generate tones directly in buffer
  this.toneSegments.forEach(segment => {
    const startSample = Math.floor(segment.start * sampleRate);
    const durationSamples = Math.floor(segment.duration * sampleRate);
    
    for (let i = 0; i < durationSamples; i++) {
      const idx = startSample + i;
      if (idx >= data.length) break;
      
      // Calculate time relative to SEGMENT start
      const t = i / sampleRate;
      data[idx] = 0.5 * Math.sin(2 * Math.PI * 500 * t);
    }
  });

  // Convert to WAV
  try {
    const blob = await this.bufferToWaveBlob(buffer);
    this.audioUrl = URL.createObjectURL(blob);
  } catch (error) {
    console.error('Error generating audio:', error);
  } finally {
    // Cleanup
    this.audioCtx.close();
    this.audioCtx = null;
    this.isRecording = false;
  }
}

  async bufferToWaveBlob(buffer: AudioBuffer): Promise<Blob> {
    const length = buffer.length * 2 + 44;
    const view = new DataView(new ArrayBuffer(length));
    const channels = buffer.numberOfChannels;
    const sampleRate = buffer.sampleRate;
    const bitsPerSample = 16;
    const blockAlign = channels * bitsPerSample / 8;
    const byteRate = sampleRate * blockAlign;

    let offset = 0;
    const writeString = (s: string) => { for (let i = 0; i < s.length; i++) view.setUint8(offset++, s.charCodeAt(i)); };

    writeString('RIFF');
    view.setUint32(offset, length - 8, true); offset += 4;
    writeString('WAVE');
    writeString('fmt ');
    view.setUint32(offset, 16, true); offset += 4;
    view.setUint16(offset, 1, true); offset += 2;
    view.setUint16(offset, channels, true); offset += 2;
    view.setUint32(offset, sampleRate, true); offset += 4;
    view.setUint32(offset, byteRate, true); offset += 4;
    view.setUint16(offset, blockAlign, true); offset += 2;
    view.setUint16(offset, bitsPerSample, true); offset += 2;
    writeString('data');
    view.setUint32(offset, length - 44, true); offset += 4;

    const input = buffer.getChannelData(0);
    for (let i = 0; i < input.length; i++, offset += 2) {
      const sample = Math.max(-1, Math.min(1, input[i]));
      view.setInt16(offset, sample * 0x7FFF, true);
    }

    return new Blob([view.buffer], { type: 'audio/wav' });
  }

  downloadAudio() {
    if (this.audioUrl) {
      const a = document.createElement('a');
      a.href = this.audioUrl;
      a.download = 'morse-buzz.wav';
      a.click();
    }
  } }
  
