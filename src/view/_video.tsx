import React from "react";

export function Video() {
  return (
    <div id="background">
      <video id="video" autoPlay muted loop>
        <source src="background.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
