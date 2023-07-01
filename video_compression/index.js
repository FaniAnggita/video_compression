const ffmpegStatic = require('ffmpeg-static');
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegStatic);

const cliProgress = require('cli-progress');

// New progress bar
const b1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

// Catat waktu mulai eksekusi
const startTime = new Date();

// Run FFmpeg
ffmpeg()
  // Input file
  .input('test_video/tes2.mp4')

  // Pengaturan output video
  .outputOptions(['-vcodec libx265', '-crf 30'])

  // Output file
  .saveToFile('test_video/tes2_compress.mp4')

  .on('start', () => {
    // inialisasi nilai progress bar dan kecepatannya
    b1.start(100, 20);
  })
  .on('progress', () => {
    // update nilai progress bar
    b1.increment();
  })
  .on('end', () => {
    // stop progress bar
    b1.update(100);
    b1.stop();
    // Hitung lama waktu eksekusi
    const endTime = new Date();
    // Konversi ke detik
    const executionTime = (endTime - startTime) / 1000; 
    console.log(`FFmpeg has finished. Execution time: ${executionTime} seconds.`);
  })
  .on('error', (error) => {
    console.error(error);
  });
