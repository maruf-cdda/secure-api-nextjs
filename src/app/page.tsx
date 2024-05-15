"use client";

import { decrypt, encrypt } from "@/utils/encryption";

const path = process.env.NEXT_PUBLIC_API_PATH as string;

export default function Home() {
  console.log("path", path);

  async function makeRequest(payload: object) {
    const encryptedData = encrypt(JSON.stringify(payload));

    const response = await fetch(`/api/${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ encryptedData }),
    });

    const result = await response.json();

    console.log(result);

    // Decrypt the response
    const decryptedResult = decrypt(result.encryptedResult);
    console.log("decryptedResult", JSON.parse(decryptedResult));
  }

  return (
    <div className="flex gap-4">
      <button
        onClick={() => {
          makeRequest({
            encryptedData: {
              method: "get",
              url: "https://jsonplaceholder.typicode.com/todos",
              headers: {
                authorization:
                  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik1hcnVmIEhvc2VuIENEREEiLCJpYXQiOjE1MTYyMzkwMjJ9.q3Mk3Hua3OdoCIDv9aQNfwhx0xFvpPLtO6yBx9OnAqg",
              },
              // data: {
              //   name: "test",
              // },
            },
          });
        }}
      >
        Make GET request
      </button>
      <button
        onClick={() => {
          makeRequest({
            encryptedData: {
              method: "post",
              url: "https://jsonplaceholder.typicode.com/posts",
              headers: {
                authorization:
                  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ik1hcnVmIEhvc2VuIENEREEiLCJpYXQiOjE1MTYyMzkwMjJ9.q3Mk3Hua3OdoCIDv9aQNfwhx0xFvpPLtO6yBx9OnAqg",
              },
              data: {
                name: "test",
              },
            },
          });
        }}
      >
        Make POST request
      </button>
    </div>
  );
}
