import "../common/cluster-ipc";
import type http from "http";
import { ipcMain } from "electron";
import { autorun } from "mobx";
import { ClusterStore, getClusterIdFromHost } from "../common/cluster-store";
import { Cluster } from "./cluster";
import logger from "./logger";
import { apiKubePrefix } from "../common/vars";
import { Singleton } from "../common/utils";

export class ClusterManager extends Singleton {
  constructor(public readonly port: number) {
    super();

    // auto-init clusters
    autorun(() => {
      ClusterStore.getInstance().enabledClustersList.forEach(cluster => {
        if (!cluster.initialized) {
          logger.info(`[CLUSTER-MANAGER]: init cluster`, cluster.getMeta());
          cluster.init(port);
        }
      });
    });

    // auto-stop removed clusters
    autorun(() => {
      const removedClusters = Array.from(ClusterStore.getInstance().removedClusters.values());

      if (removedClusters.length > 0) {
        const meta = removedClusters.map(cluster => cluster.getMeta());

        logger.info(`[CLUSTER-MANAGER]: removing clusters`, meta);
        removedClusters.forEach(cluster => cluster.disconnect());
        ClusterStore.getInstance().removedClusters.clear();
      }
    }, {
      delay: 250
    });

    ipcMain.on("network:offline", () => { this.onNetworkOffline(); });
    ipcMain.on("network:online", () => { this.onNetworkOnline(); });
  }

  protected onNetworkOffline() {
    logger.info("[CLUSTER-MANAGER]: network is offline");
    ClusterStore.getInstance().enabledClustersList.forEach((cluster) => {
      if (!cluster.disconnected) {
        cluster.online = false;
        cluster.accessible = false;
        cluster.refreshConnectionStatus().catch((e) => e);
      }
    });
  }

  protected onNetworkOnline() {
    logger.info("[CLUSTER-MANAGER]: network is online");
    ClusterStore.getInstance().enabledClustersList.forEach((cluster) => {
      if (!cluster.disconnected) {
        cluster.refreshConnectionStatus().catch((e) => e);
      }
    });
  }

  stop() {
    ClusterStore.getInstance().clusters.forEach((cluster: Cluster) => {
      cluster.disconnect();
    });
  }

  getClusterForRequest(req: http.IncomingMessage): Cluster {
    let cluster: Cluster = null;

    // lens-server is connecting to 127.0.0.1:<port>/<uid>
    if (req.headers.host.startsWith("127.0.0.1")) {
      const clusterId = req.url.split("/")[1];

      cluster = ClusterStore.getInstance().getById(clusterId);

      if (cluster) {
        // we need to swap path prefix so that request is proxied to kube api
        req.url = req.url.replace(`/${clusterId}`, apiKubePrefix);
      }
    } else if (req.headers["x-cluster-id"]) {
      cluster = ClusterStore.getInstance().getById(req.headers["x-cluster-id"].toString());
    } else {
      const clusterId = getClusterIdFromHost(req.headers.host);

      cluster = ClusterStore.getInstance().getById(clusterId);
    }

    return cluster;
  }
}
