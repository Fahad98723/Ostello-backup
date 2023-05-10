import { Switch } from "antd";
import React, { useState } from "react";
import { isEmpty } from "../components/utils";
import MediaManager from "../pages/MerchantDashboardPages/MyProfile/MediaManager";

export default function Test() {
  const [testMode, setTestMode] = useState(
    !isEmpty(Number(window.sessionStorage.getItem("testMode")))
  );

  return (
    <div>
      <div>
        <p className="text-center text-2xl">
          Current Mode:{" "}
          {testMode ? (
            <span className="text-[#FF0000]">Test</span>
          ) : (
            <span className="text-green">Production</span>
          )}
        </p>
        <p className="text-[#FF0000] text-xl">Toggle test mode</p>
        <Switch
          checked={testMode}
          onChange={(e) => {
            setTestMode(e);
            window.sessionStorage.setItem("testMode", e ? 1 : 0);
            window.location.reload();
          }}
        />
      </div>
      <MediaManager />
    </div>
  );
}
