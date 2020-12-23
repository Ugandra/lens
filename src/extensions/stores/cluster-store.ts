import { ClusterStore as InternalClusterStore, ClusterId } from "../../common/cluster-store";
import type { ClusterModel } from "../../common/cluster-store";
import { Cluster } from "../../main/cluster";
import { Singleton } from "../core-api/utils";
import { ObservableMap } from "mobx";

export { Cluster } from "../../main/cluster";
export type { ClusterModel, ClusterId } from "../../common/cluster-store";

/**
 * Store for all added clusters
 *
 * @beta
 */

// @ts-ignore
export class ClusterStore extends Singleton {
  static getInstance(): ClusterStore {
    return ClusterStore.getInstanceOrCreate();
  }

  /**
   * Active cluster id
   */
  get activeClusterId(): string {
    return InternalClusterStore.getInstance().activeCluster;
  }

  /**
   * Set active cluster id
   */
  set activeClusterId(id : ClusterId) {
    InternalClusterStore.getInstance().activeCluster = id;
  }

  /**
   * Map of all clusters
   */
  get clusters(): ObservableMap<string, Cluster> {
    return InternalClusterStore.getInstance().clusters;
  }

  /**
   * Get active cluster (a cluster which is currently visible)
   */
  get activeCluster(): Cluster {
    if (!this.activeClusterId) {
      return null;
    }

    return this.getById(this.activeClusterId);
  }

  /**
   * Array of all clusters
   */
  get clustersList(): Cluster[] {
    return InternalClusterStore.getInstance().clustersList;
  }

  /**
   * Array of all enabled clusters
   */
  get enabledClustersList(): Cluster[] {
    return InternalClusterStore.getInstance().enabledClustersList;
  }

  /**
   * Array of all clusters that have active connection to a Kubernetes cluster
   */
  get connectedClustersList(): Cluster[] {
    return InternalClusterStore.getInstance().connectedClustersList;
  }

  /**
   * Get cluster object by cluster id
   * @param id cluster id
   */
  getById(id: ClusterId): Cluster {
    return InternalClusterStore.getInstance().getById(id);
  }

  /**
   * Get all clusters belonging to a workspace
   * @param workspaceId workspace id
   */
  getByWorkspaceId(workspaceId: string): Cluster[] {
    return InternalClusterStore.getInstance().getByWorkspaceId(workspaceId);
  }

  /**
   * Add clusters to store
   * @param models list of cluster models
   */
  addClusters(...models: ClusterModel[]): Cluster[] {
    return InternalClusterStore.getInstance().addClusters(...models);
  }

  /**
   * Add a cluster to store
   * @param model cluster
   */
  addCluster(model: ClusterModel | Cluster): Cluster {
    return InternalClusterStore.getInstance().addCluster(model);
  }

  /**
   * Remove a cluster from store
   * @param model cluster
   */
  async removeCluster(model: ClusterModel) {
    return this.removeById(model.id);
  }

  /**
   * Remove a cluster from store by id
   * @param clusterId cluster id
   */
  async removeById(clusterId: ClusterId) {
    return InternalClusterStore.getInstance().removeById(clusterId);
  }

  /**
   * Remove all clusters belonging to a workspaces
   * @param workspaceId workspace id
   */
  removeByWorkspaceId(workspaceId: string) {
    return InternalClusterStore.getInstance().removeByWorkspaceId(workspaceId);
  }
}
