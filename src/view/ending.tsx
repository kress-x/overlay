import React from "react";

import { Layout } from "./_layout.tsx";
import { Video } from "./_video.tsx";

export function EndingPage() {
  return (
    <Layout title="Overlay: Stream Ended">
      <Video />
      <div id="ending">
        <h1 className="title dark">Stream Ended</h1>
      </div>
      <script src="ending.js"></script>
    </Layout>
  );
}
