// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use rusty_ytdl::{Video, VideoSearchOptions, VideoQuality, VideoOptions};
use std::env;
use std::fs;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
async fn download(url: String) {
  let video_options = VideoOptions {
    quality: VideoQuality::Highest,
    filter: VideoSearchOptions::VideoAudio,
    ..Default::default()
  };

  let video = Video::new_with_options(url, video_options).unwrap();

  let video_info = video.get_info().await.unwrap();

  let video_folder = "videos/";
  let videostr = (video_info.video_details.title).to_string();
  let video_title = format!("{}{}{}", &video_folder, &videostr, &".mp4");
  let _ = fs::create_dir_all("videos");
  let path = std::path::Path::new(&video_title);
  video.download(path).await.unwrap();
}

fn main() {
  tauri::Builder::default()
  .invoke_handler(tauri::generate_handler![download])
  .run(tauri::generate_context!())
  .expect("error while running tauri application");
}

