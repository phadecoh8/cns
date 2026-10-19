export function logEvent(event: string, requestId: string) {
  process.stdout.write(`${JSON.stringify({
    event,
    requestId 
  })}\n`);
}
