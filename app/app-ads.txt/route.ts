export function GET() {
  return new Response("google.com, pub-8817664850418921, DIRECT, f08c47fec0942fa0\n", {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
