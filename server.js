const express = require('express'); const multer = require('multer'); const { exec } = require('child_process'); const fs = require('fs');

const app = express(); const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('video'), (req, res) => { const videoPath = req.file.path; const rtmpURL = "rtmp://a.rtmp.youtube.com/live2/YOUR-STREAM-KEY"; // यहां अपना YouTube/Facebook/Twitch RTMP URL डालें

exec(`ffmpeg -re -i ${videoPath} -c:v libx264 -preset ultrafast -b:v 3000k -maxrate 3000k -bufsize 6000k -f flv ${rtmpURL}`, 
    (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).send("Streaming Error");
        }
        res.send("Streaming Started");
    }
);

});

app.listen(3000, () => console.log("RTMP Server Running on Port 3000"));


