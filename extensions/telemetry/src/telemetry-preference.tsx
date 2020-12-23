import { Component } from "@k8slens/extensions";
import React from "react";
import { observer } from "mobx-react";
import { TelemetryPreferencesStore } from "./telemetry-preferences-store";

@observer
export class TelemetryPreferenceInput extends React.Component {
  render() {
    const telemetry = TelemetryPreferencesStore.getInstance();

    return (
      <Component.Checkbox
        label="Allow telemetry & usage tracking"
        value={telemetry.enabled}
        onChange={v => { telemetry.enabled = v; }}
      />
    );
  }
}

export class TelemetryPreferenceHint extends React.Component {
  render() {
    return (
      <span>Telemetry & usage data is collected to continuously improve the Lens experience.</span>
    );
  }
}
