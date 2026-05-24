import { buildHotelListXml } from "@/lib/google-hotels/feeds";
import { xmlResponse } from "@/lib/google-hotels/xml";

export const dynamic = "force-dynamic";

export async function GET() {
  return xmlResponse(buildHotelListXml());
}
