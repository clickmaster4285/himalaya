import { permanentRedirect } from "next/navigation";

export default function LegacyThingToDoRedirectPage() {
  permanentRedirect("/things-to-do-in-murree");
}

