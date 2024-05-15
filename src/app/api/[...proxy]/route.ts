import { decrypt, encrypt } from "@/utils/encryption";

export async function POST(request: Request) {
  const res = await request.json();
  const { encryptedData } = res;

  // Decrypt the data
  const decryptedData = decrypt(encryptedData);
  const parsedData = JSON.parse(decryptedData);

  // Extract the method, url and data from the decrypted data
  const { method, url, data } = parsedData.encryptedData || {};

  console.log("method, url, data", method, url, data);

  console.log("parsedData", parsedData);

  // Here, make the actual API request to the external API
  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    // Only include the body if the method is POST\PUT
    body: method === "post" || method === "put" ? JSON.stringify(data) : null,
  });

  const result = await response.json();

  // Encrypt the response before sending it back
  const encryptedResult = encrypt(JSON.stringify(result));

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  // return Response.json({ id });
  return Response.json({ encryptedResult });
}
