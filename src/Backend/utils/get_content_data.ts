// src/Content/utils/getContentData.ts
import mainData from "../../Main/data";
import privateTabs from "../../Main/private_tabs";
import { ContentDataType, TopicType } from "../model/content_model";

function getContentData(isPrivate: boolean): ContentDataType[] {
  const filtered = Object.entries(mainData)
    .filter(([key]) => isPrivate || !privateTabs.includes(key))
    .flatMap(([, items]) => items);

  const contentData = filtered.map((item: any) => ({
    ...item,
    route: Array.isArray(item.route)
      ? item.route.map((routeItem: any) => ({
          ...routeItem,
          type: routeItem.type as TopicType | undefined,
        }))
      : undefined,
  }));

  return contentData as ContentDataType[];
}

export default getContentData;
