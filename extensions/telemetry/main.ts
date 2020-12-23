import { LensMainExtension } from "@k8slens/extensions";
import { TelemetryPreferencesStore } from "./src/telemetry-preferences-store";
import { Tracker } from "./src/tracker";

export default class TelemetryMainExtension extends LensMainExtension {

  async onActivate() {
    console.log("telemetry main extension activated");
    const telStore = TelemetryPreferencesStore.getInstanceOrCreate();

    Tracker.getInstanceOrCreate().start();
    Tracker.getInstance().reportPeriodically();
    Tracker.getInstance().watchExtensions();
    await telStore.loadExtension(this);
  }

  onDeactivate() {
    TelemetryPreferencesStore.resetInstance();
    Tracker.getInstance().stop();
    Tracker.resetInstance();
    console.log("telemetry main extension deactivated");
  }
}
