import { useEffect } from "react";

import { sessionState, useChatSession } from "@chainlit/react-client";
import { Playground } from "./components/playground";
import { useRecoilValue } from "recoil";
import CodeEditor from "./components/codeeditor.js";

const userEnv = {};

function App() {
  const { connect } = useChatSession();
  const session = useRecoilValue(sessionState);
  useEffect(() => {
    if (session?.socket.connected) {
      return;
    }
    fetch("http://localhost:80/custom-auth")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        connect({
          userEnv,
          accessToken: `Bearer: ${data.token}`,
        });
      });
  }, [connect]);

  return (
    <>
      {/* Divide codeeditor and playground 50% 50% */}

      <div className="flex">
        <div className="w-1/2">
          <CodeEditor />
        </div>
        <div className="w-1/2">
          <Playground />
        </div>
      </div>

    </>
  );
}

export default App;
