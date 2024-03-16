// @ts-check
/// <reference lib="dom" />
"use strict";

const root = document.getElementById("achievements-root");
if (!(root instanceof HTMLElement)) throw new Error("Expected HTMLElement");

const refresh = async () => {
  const response = await fetch("/tracker");
  const html = await response.text();

  root.innerHTML = html;

  setTimeout(refresh, 5000);
};

refresh();

const video = document.getElementById("video");
if (video instanceof HTMLVideoElement) video.playbackRate = 0.333;
