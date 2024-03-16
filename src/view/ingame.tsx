import React from "react";

import { Layout } from "./_layout.tsx";

export function IngamePage() {
  return (
    <Layout title="Overlay: Ingame">
      <div id="background">
        <video id="video" autoPlay muted loop>
          <source src="sidebar.mp4" type="video/mp4" />
        </video>
      </div>
      <div id="sidebar">
        <div id="achievements-root">
        </div>
        <div id="cam">
        </div>
        <div id="chat">
        </div>
      </div>
      <script src="ingame.js"></script>
    </Layout>
  );
}
