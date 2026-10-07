import type { Property } from "@/types/property";
import { apiFetch } from "./lib/apiClient";

// get the real data from the endpoint https://1hotels.uat.dolli.cloud/api/hotel/infos/60735?dolliversion=v2
export async function getProperty(propertyId: string): Promise<Property> {
    const response = await apiFetch(`https://1hotels.uat.dolli.cloud/api/hotel/infos/${propertyId}?dolliversion=v2`)

    const property:Property = {
      id: response.hotelCode,
      title: response.hotelInfo.hotelName.value
    }   

  return property;
}