import { getAvailabilityData } from "@/lib/google-hotels/availability";
import { buildTransactionXml } from "@/lib/google-hotels/feeds";
import { xmlResponse } from "@/lib/google-hotels/xml";

export const dynamic = "force-dynamic";

export async function GET() {
  const rooms = await getAvailabilityData();
  return xmlResponse(buildTransactionXml(rooms));
}
