import logger from "./logger";

/**
 * Installs Electron developer tools in the development build.
 * The dependency is not bundled to the production build.
 */
export const installDeveloperTools = () => {
  if (process.env.NODE_ENV === "development") {
    import("electron-devtools-installer")
      .then(({ default: devToolsInstaller, REACT_DEVELOPER_TOOLS }) => devToolsInstaller([REACT_DEVELOPER_TOOLS]))
      .then((name) => logger.info(`[DEVTOOLS-INSTALLER]: installed ${name}`))
      .catch(error => logger.error(`[DEVTOOLS-INSTALLER]: failed`, { error }));
  }
};
