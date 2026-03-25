import { useCallback, useEffect, useRef } from "react";

export function useNotifications() {
  const permissionRef = useRef<NotificationPermission>("default");

  useEffect(() => {
    if ("Notification" in window) {
      permissionRef.current = Notification.permission;
    }
  }, []);

  const requestPermission = useCallback(async () => {
    if (!("Notification" in window)) return false;
    const perm = await Notification.requestPermission();
    permissionRef.current = perm;
    return perm === "granted";
  }, []);

  const notify = useCallback((title: string, body: string, icon = "/favicon.svg") => {
    if (!("Notification" in window)) return;
    if (permissionRef.current !== "granted") return;
    if (document.visibilityState === "visible") return;
    try {
      new Notification(title, { body, icon, silent: false });
    } catch {
      // Notifications not supported in this context
    }
  }, []);

  return { requestPermission, notify };
}
