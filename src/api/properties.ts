import type { Property } from "@/types/property";

const properties: Property[] = [
  {id: '60735', title: 'Central Park'},
  {id: '66266', title: 'Brooklyn Bridge'}
]

export function getProperty(propertyId: string) {
  const property = properties.find((property) => property.id === propertyId);

  return property;
}