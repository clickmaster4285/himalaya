"use client";

import { useEffect, useState } from "react";

const DOMAIN = "himalayavillas.com";

type Props = {
  /** Mailbox name, e.g. "info" or "bookings". */
  user: string;
  className?: string;
  style?: React.CSSProperties;
  /** Link label. Defaults to the address itself. */
  children?: React.ReactNode;
  /** Render the address as plain text with no link. */
  plain?: boolean;
};

/**
 * HIM-TECH-0006: the server HTML never contains a literal email address or mailto: link, so
 * Cloudflare's email obfuscation has nothing to rewrite into /cdn-cgi/l/email-protection (a 404
 * for crawlers). The address and mailto: link are filled in after hydration.
 */
export default function EmailLink({ user, className, style, children, plain = false }: Props) {
  const [address, setAddress] = useState<string | null>(null);
  useEffect(() => setAddress(`${user}@${DOMAIN}`), [user]);

  const text = address ?? `${user} [at] ${DOMAIN}`;
  if (plain) {
    return (
      <span className={className} style={style}>
        {text}
      </span>
    );
  }
  return (
    <a href={address ? `mailto:${address}` : undefined} className={className} style={style}>
      {children ?? text}
    </a>
  );
}
