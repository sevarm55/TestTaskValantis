import md5 from "md5"
import { PRODUCT_URL } from "./URL"

export function generateAuthString(password) {
  const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, "")
  return md5(password + "_" + timestamp)
}



export async function getIds(offset, limit, authString) {
  const response = await fetch(PRODUCT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Auth": authString,
    },
    body: JSON.stringify({
      action: "get_ids",
      params: { offset, limit },
    }),
  })
  if (!response.ok) {
    throw new Error("Ошибка при получении списка идентификаторов")
  }
  return response.json()
}

export async function getItems(ids, authString) {
  const response = await fetch(PRODUCT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Auth": authString,
    },
    body: JSON.stringify({
      action: "get_items",
      params: { ids },
    }),
  })
  if (!response.ok) {
    throw new Error("Ошибка при получении данных продуктов")
  }
  return response.json()
}
