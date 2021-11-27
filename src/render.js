
const { desktopCapturer, app } = require('electron');
const remote = require('@electron/remote')
const { dialog, Menu, MenuItem } = remote;

const { writeFile } = require('fs');

const playanimation = require('./app');

const { PythonShell } = require('python-shell')

const spawn = require("child_process").spawn;
const pythonProcess = spawn('python', ["./src/render.py"]);

pythonProcess.stdout.on('data', (data) => {
  console.log(data)
});

const express = require('express')
const app = express()

app.get('/', (req, res) => {

   const {
      spawn
   } = require('child_process');
   const pyProg = spawn('python', ['./../pypy.py']);

   pyProg.stdout.on('data', function(data) {

      console.log(data.toString());
      res.write(data);
      res.end('end');
   });
})

app.listen(4000, () => console.log('Application listening on port 4000!'))



const menu = new Menu()
menu.append(new MenuItem({
  label: 'Render',
  submenu: [
  {
    label: '120',
    accelerator: process.platform === 'darwin' ? 'Cmd+1' : 'Ctrl+1',
    click: () => { call_python() },
  },
  {
    label: '150',
    accelerator: process.platform === 'darwin' ? 'Cmd+2' : 'Ctrl+2',
    click: () => { start(150) },
  },
  {
    label: '180',
    accelerator: process.platform === 'darwin' ? 'Cmd+3' : 'Ctrl+3',
    click: () => { start(180) },
  }
]
}))

function call_python()
{
  let options = {
    pythonPath: 'C:/Users/Vlajk/anaconda3/envs/appdev/python.exe',
  };

  PythonShell.run('./src/render.py', null, function (err) {
    if (err) throw err;
    console.log('finished');
  });

}


Menu.setApplicationMenu(menu)
