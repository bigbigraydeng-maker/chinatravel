/**
 * Where the site's own header, footer, top banner and sign-up pop-up are NOT shown: the back office, and the ad landing
 * pages (/campaigns/{pathKey}). An ad landing page carries its own minimal header and footer so the visitor has one
 * thing to do.
 *
 * The path keys are typed out here instead of imported from the page configs because the component that reads this
 * file runs on every page: importing the configs would put them in every page's script bundle. A test keeps this list
 * in step with the configs.
 */
export const AD_LANDING_PATH_KEYS: readonly string[] = ['shanghai-surroundings'];

export function shouldHideSiteChrome(pathname: string | null | undefined): boolean {
  if (!pathname) return false;
  if (pathname.startsWith('/admin') || pathname.startsWith('/dev/')) return true;
  const path = pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
  return AD_LANDING_PATH_KEYS.some((key) => path === `/campaigns/${key}`);
}
