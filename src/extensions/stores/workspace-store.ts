import { Singleton } from "../core-api/utils";
import { WorkspaceStore as InternalWorkspaceStore, Workspace, WorkspaceId } from "../../common/workspace-store";
import { ObservableMap } from "mobx";

export { Workspace } from "../../common/workspace-store";
export type { WorkspaceId, WorkspaceModel } from "../../common/workspace-store";

/**
 * Stores all workspaces
 *
 * @beta
 */
// @ts-ignore
export class WorkspaceStore extends Singleton {
  static getInstance(): WorkspaceStore {
    return WorkspaceStore.getInstanceOrCreate();
  }

  /**
   * Default workspace id, this workspace is always present
   */
  static readonly defaultId: WorkspaceId = InternalWorkspaceStore.defaultId;

  /**
   * Currently active workspace id
   */
  get currentWorkspaceId(): string {
    return InternalWorkspaceStore.getInstance().currentWorkspaceId;
  }

  /**
   * Set active workspace id
   */
  set currentWorkspaceId(id: string) {
    InternalWorkspaceStore.getInstance().currentWorkspaceId = id;
  }

  /**
   * Map of all workspaces
   */
  get workspaces(): ObservableMap<string, Workspace> {
    return InternalWorkspaceStore.getInstance().workspaces;
  }

  /**
   * Currently active workspace
   */
  get currentWorkspace(): Workspace {
    return InternalWorkspaceStore.getInstance().currentWorkspace;
  }

  /**
   * Array of all workspaces
   */
  get workspacesList(): Workspace[] {
    return InternalWorkspaceStore.getInstance().workspacesList;
  }

  /**
   * Array of all enabled (visible) workspaces
   */
  get enabledWorkspacesList(): Workspace[] {
    return InternalWorkspaceStore.getInstance().enabledWorkspacesList;
  }

  /**
   * Get workspace by id
   * @param id workspace id
   */
  getById(id: WorkspaceId): Workspace {
    return InternalWorkspaceStore.getInstance().getById(id);
  }

  /**
   * Get workspace by name
   * @param name workspace name
   */
  getByName(name: string): Workspace {
    return InternalWorkspaceStore.getInstance().getByName(name);
  }

  /**
   * Set active workspace
   * @param id workspace id
   */
  setActive(id = WorkspaceStore.defaultId) {
    return InternalWorkspaceStore.getInstance().setActive(id);
  }

  /**
   * Add a workspace to store
   * @param workspace workspace
   */
  addWorkspace(workspace: Workspace) {
    return InternalWorkspaceStore.getInstance().addWorkspace(workspace);
  }

  /**
   * Update a workspace in store
   * @param workspace workspace
   */
  updateWorkspace(workspace: Workspace) {
    return InternalWorkspaceStore.getInstance().updateWorkspace(workspace);
  }

  /**
   * Remove workspace from store
   * @param workspace workspace
   */
  removeWorkspace(workspace: Workspace) {
    return InternalWorkspaceStore.getInstance().removeWorkspace(workspace);
  }

  /**
   * Remove workspace by id
   * @param id workspace
   */
  removeWorkspaceById(id: WorkspaceId) {
    return InternalWorkspaceStore.getInstance().removeWorkspaceById(id);
  }
}
