// @ts-check
/// <reference lib="dom" />
"use strict";

const video = document.getElementById("video");
if (video instanceof HTMLVideoElement) video.playbackRate = 0.75;
