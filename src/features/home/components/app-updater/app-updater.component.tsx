import React, { useCallback, useEffect, useRef } from "react"
import {
  withServiceWorkerUpdater,
  ServiceWorkerUpdaterProps,
  LocalStoragePersistenceService,
} from "@3m1/service-worker-updater"
import { StyledUpdateButton, StyledAppVersion } from "./app-updater.styles"

const AppUpdater: React.FC<ServiceWorkerUpdaterProps> = (props) => {
  const { newServiceWorkerDetected, onLoadNewServiceWorkerAccept } = props
  const appVersion = useRef("")

  useEffect(() => {
    const versionNumber = process.env.REACT_APP_VERSION
    if (versionNumber) {
      appVersion.current = `v${versionNumber}`
    }
  }, [])

  const handleRefresh = useCallback((): void => {
    window?.location.reload()
  }, [])

  return (
    <>
      {newServiceWorkerDetected ? (
        <StyledUpdateButton
          type="button"
          onClick={onLoadNewServiceWorkerAccept}
        >
          Update
        </StyledUpdateButton>
      ) : appVersion.current ? (
        <StyledAppVersion type="button" onClick={handleRefresh}>
          {appVersion.current} ↻
        </StyledAppVersion>
      ) : null}
    </>
  )
}

export default withServiceWorkerUpdater(AppUpdater, {
  log: () => console.warn("App updated!"),
  persistenceService: new LocalStoragePersistenceService("pokoyApp"),
})
