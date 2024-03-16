import React from "react";

import { Layout } from "./_layout.tsx";
import { Video } from "./_video.tsx";

export function StartingPage() {
  return (
    <Layout title="Overlay: Starting Soon">
      <Video />
      <div id="starting">
        <h1 className="title">Starting Soon</h1>
      </div>
      <script src="starting.js"></script>
    </Layout>
  );
}
