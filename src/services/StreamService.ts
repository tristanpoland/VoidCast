// src/services/StreamService.ts
export class StreamService {
    private ws: WebSocket | null = null;
    private mediaSource: MediaSource;
    private sourceBuffer: SourceBuffer | null = null;
    private videoElement: HTMLVideoElement;
    private queue: ArrayBuffer[] = [];
    private updating = false;
  
    constructor(videoElement: HTMLVideoElement) {
      this.videoElement = videoElement;
      this.mediaSource = new MediaSource();
      this.videoElement.src = URL.createObjectURL(this.mediaSource);
      
      this.mediaSource.addEventListener('sourceopen', () => {
        this.sourceBuffer = this.mediaSource.addSourceBuffer('video/webm; codecs="vp8,opus"');
        this.sourceBuffer.addEventListener('updateend', this.handleUpdateEnd.bind(this));
      });
    }
  
    connect(streamId: string) {
      this.ws = new WebSocket(`ws://localhost:3030/watch/${streamId}`);
      this.ws.binaryType = 'arraybuffer';
      
      this.ws.onmessage = (event) => {
        const data = event.data as ArrayBuffer;
        if (this.sourceBuffer && !this.sourceBuffer.updating) {
          this.sourceBuffer.appendBuffer(data);
        } else {
          this.queue.push(data);
        }
      };
    }
  
    private handleUpdateEnd() {
      if (this.sourceBuffer && this.queue.length > 0 && !this.sourceBuffer.updating) {
        const data = this.queue.shift();
        if (data) this.sourceBuffer.appendBuffer(data);
      }
    }
  
    disconnect() {
      if (this.ws) {
        this.ws.close();
        this.ws = null;
      }
    }
  }