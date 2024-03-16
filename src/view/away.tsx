import React from "react";

import { Layout } from "./_layout.tsx";
import { Video } from "./_video.tsx";

export function AwayPage() {
  return (
    <Layout title="Overlay: BRB">
      <Video />
      <div id="away">
        <div id="chat">
        </div>
        <h1 className="title">BRB</h1>
      </div>
      <script src="away.js"></script>
    </Layout>
  );
}
