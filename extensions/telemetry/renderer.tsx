import { LensRendererExtension } from "@k8slens/extensions";
import { TelemetryPreferencesStore } from "./src/telemetry-preferences-store";
import { TelemetryPreferenceHint, TelemetryPreferenceInput } from "./src/telemetry-preference";
import { Tracker } from "./src/tracker";
import React from "react";

export default class TelemetryRendererExtension extends LensRendererExtension {
  appPreferences = [
    {
      title: "Telemetry & Usage Tracking",
      components: {
        Hint: () => <TelemetryPreferenceHint/>,
        Input: () => <TelemetryPreferenceInput/>
      }
    }
  ];

  async onActivate() {
    console.log("telemetry extension activated");
    const telStore = TelemetryPreferencesStore.getInstanceOrCreate();

    Tracker.getInstanceOrCreate().start();
    await telStore.loadExtension(this);
  }

  async onDeactivate() {
    TelemetryPreferencesStore.resetInstance();
  }
}
