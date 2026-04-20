import { permanentRedirect } from "next/navigation";

export default function LegacyThingToDoRedirectPage() {
  permanentRedirect("/blog/thing-to-do-bhurban-murree");
}

