import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import fs from "fs";
import ytDlpExec from "youtube-dl-exec";

//Changed download folder to public/downloads to allow Next.js to serve files
const downloadDir = path.join("/tmp", "Downloads");
if (!fs.existsSync(downloadDir)) {
  fs.mkdirSync(downloadDir, { recursive: true });
}
console.log(downloadDir)
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required." });
  }

  const youtubeUrlPattern =
    /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
  if (!youtubeUrlPattern.test(url)) {
    return res.status(400).json({ error: "Invalid YouTube URL." });
  }

  try {
    const filePath = path.join(downloadDir, `downloaded_video_${Date.now()}`);
    // Download the video 
    const output = await ytDlpExec(url, {
      output: filePath,
      noCheckCertificates: true,
      noWarnings: true,
      preferFreeFormats: true,
      addHeader: ["referer:youtube.com", "user-agent:googlebot"],
      format: "bestvideo+bestaudio/best",
    });

    console.log("Downloaded video successfully:", output);
    const fileUrl = `/downloads/${path.basename(filePath)}`;
    res.status(200).json({ message: "Download successful", fileUrl });
    } catch (error) {
    console.error("Error in downloading video:", );
    res.status(500).json({message:error + "failed to download the content"})
  }
}