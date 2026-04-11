/** Use with next/image when `src` may be an absolute URL from CMS/admin (optimization only applies to configured remotes). */
export function shouldUnoptimizeImageSrc(src: string): boolean {
  return /^https?:\/\//i.test(src ?? "");
}
