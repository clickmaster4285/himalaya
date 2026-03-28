/**
 * Full page navigation after login/register so the session cookie is applied
 * before the role-specific layout (e.g. /dashboard/superadmin + sidebar) runs.
 */
export function hardNavigateAfterAuth(redirectTo: string) {
  const path = redirectTo.startsWith("/") ? redirectTo : "/dashboard/user";
  window.location.replace(new URL(path, window.location.origin).href);
}
