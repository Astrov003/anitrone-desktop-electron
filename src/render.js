
const { desktopCapturer, app } = require('electron');
const remote = require('@electron/remote')
const { dialog, Menu, MenuItem } = remote;

const { writeFile } = require('fs');

const playanimation = require('./app');

const menu = new Menu()
menu.append(new MenuItem({
  label: 'Render',
  submenu: [
  {
    label: '120',
    accelerator: process.platform === 'darwin' ? 'Cmd+1' : 'Ctrl+1',
    click: () => { start () }
  },
  {
    label: '150',
    accelerator: process.platform === 'darwin' ? 'Cmd+2' : 'Ctrl+2',
    click: () => { start () },
  },
  {
    label: '180',
    accelerator: process.platform === 'darwin' ? 'Cmd+3' : 'Ctrl+3',
    click: () => { start () },
  }
]
}))

Menu.setApplicationMenu(menu)

function start()
{
  desktopCapturer.getSources({ types: ['window', 'screen'] }).then(async sources => {
    for (const source of sources) {
      if (source.name === 'Anitrone') {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: {
            mandatory: {
              chromeMediaSource: 'desktop',
              chromeMediaSourceId: source.id,
              minWidth: 1080,
              maxWidth: 1080,
              minHeight: 380,
              maxHeight: 380
            }
          }
        })

        // Global state
        let mediaRecorder; // MediaRecorder instance to capture footage
        const recordedChunks = [];
        

        const startBtn = document.getElementById('startBtn');
    
        
        startBtn.innerText = 'Recording';
        
        playanimation.play();
        setTimeout(() => {
          mediaRecorder.start();
        }, 500);

        setTimeout(() => {
          mediaRecorder.stop();
          startBtn.innerText = 'Start';
        }, 5000);
        


        // Create the Media Recorder
        const options = { mimeType: 'video/webm; codecs=vp9' };
        mediaRecorder = new MediaRecorder(stream, options);

        // Register Event Handlers
        mediaRecorder.ondataavailable = handleDataAvailable;
        mediaRecorder.onstop = handleStop;

        // Updates the UI


        // Captures all recorded chunks
        function handleDataAvailable(e) {
          console.log('video data available');
          recordedChunks.push(e.data);
        }

        // Saves the video file on stop
        async function handleStop(e) {
          const blob = new Blob(recordedChunks, {
            type: 'video/webm; codecs=vp9'
          });

          const buffer = Buffer.from(await blob.arrayBuffer());


          const { filePath } = await dialog.showSaveDialog({
            buttonLabel: 'Save video',
            defaultPath: `vid-${Date.now()}.webm`
          });


          if (filePath) {
            writeFile(filePath, buffer, () => console.log('video saved successfully!'));
          }

        }
      }
    }
  })
}