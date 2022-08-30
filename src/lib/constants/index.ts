import { SUB_MENUS } from "@/lib/constants/subMenu";
import { ROLES } from "@/lib/constants/roles";
import { NRC_DATA } from "@/lib/constants/nrcData";

export { SUB_MENUS, ROLES, NRC_DATA };

export const DATE_FORMMAT = "YYYY-MM-DD";
export const MAX_FILE_SIZE = 1 * 1024 * 1024;
export const IMAGE_UPLOAD_FORMATS = ".png, .jpg, .jpeg, .webp";
export const IMAGE_UPLOAD_MIME_TYPES = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "image/webp",
];
export const BULK_UPLOAD_FILE_FORMATS = `.csv`;
export const BULK_UPLOAD_FILE_MIME_TYPES = [
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-excel",
  "text/comma-separated-values",
  "application/csv",
  "text/csv"

];
