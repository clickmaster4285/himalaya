import {
  GOOGLE_HOTELS_POINT_OF_SALE_ID,
  GOOGLE_HOTELS_PROPERTY,
  GOOGLE_HOTELS_PROPERTY_ID,
  getBookLandingUrl,
} from "@/lib/google-hotels/config";
import type { GoogleHotelsAvailabilityRow } from "@/lib/google-hotels/types";
import { escapeXml } from "@/lib/google-hotels/xml";

export function buildHotelListXml(): string {
  const p = GOOGLE_HOTELS_PROPERTY;
  return `<?xml version="1.0" encoding="UTF-8"?>
<listings>
  <listing>
    <id>${escapeXml(p.id)}</id>
    <name>${escapeXml(p.name)}</name>
    <address>
      <component name="addr1">${escapeXml(p.address.addr1)}</component>
      <component name="city">${escapeXml(p.address.city)}</component>
      <component name="province">${escapeXml(p.address.province)}</component>
      <component name="postal_code">${escapeXml(p.address.postalCode)}</component>
      <component name="country">${escapeXml(p.address.country)}</component>
    </address>
    <phone>${escapeXml(p.phone)}</phone>
    <category>${escapeXml(p.category)}</category>
    <latitude>${p.latitude}</latitude>
    <longitude>${p.longitude}</longitude>
  </listing>
</listings>`;
}

export function buildTransactionXml(rooms: GoogleHotelsAvailabilityRow[]): string {
  const now = new Date().toISOString();
  const feedId = `feed-${Date.now()}`;

  const results = rooms
    .map((room) => {
      return `
    <Result>
      <Property>${escapeXml(GOOGLE_HOTELS_PROPERTY_ID)}</Property>
      <Checkin>${escapeXml(room.checkinDate)}</Checkin>
      <Nights>${room.nights}</Nights>
      <Baserate currency="PKR">${room.baseRate}</Baserate>
      <Tax currency="PKR">${room.tax}</Tax>
      <OtherFees currency="PKR">0</OtherFees>
      <AllowablePointsOfSale>
        <PointOfSale id="${escapeXml(GOOGLE_HOTELS_POINT_OF_SALE_ID)}"/>
      </AllowablePointsOfSale>
    </Result>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<Transaction timestamp="${escapeXml(now)}" id="${escapeXml(feedId)}">
  ${results}
</Transaction>`;
}

export function buildLandingPagesXml(): string {
  const url = getBookLandingUrl();
  return `<?xml version="1.0" encoding="UTF-8"?>
<LandingPages>
  <LandingPage id="${escapeXml(GOOGLE_HOTELS_POINT_OF_SALE_ID)}">
    <URL>${escapeXml(url)}</URL>
  </LandingPage>
</LandingPages>`;
}
