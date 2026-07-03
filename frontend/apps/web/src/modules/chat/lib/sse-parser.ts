/**
 * Manual SSE parser over a raw ReadableStream. Native EventSource can't be
 * used here because /chat/stream is a POST with an auth header and a JSON
 * body. The backend (ChatController) never sets an `event:` name -- every
 * frame is a bare `data: {"text": "..."}` line -- so this only needs to
 * collect `data:` lines per frame (blank-line delimited per the SSE spec).
 */
export async function* parseSseStream(body: ReadableStream<Uint8Array>): AsyncGenerator<string> {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      const frames = buffer.split('\n\n');
      buffer = frames.pop() ?? '';

      for (const frame of frames) {
        const dataLines = frame
          .split('\n')
          .filter((line) => line.startsWith('data:'))
          .map((line) => line.slice(5).trimStart());
        if (dataLines.length > 0) yield dataLines.join('\n');
      }
    }
  } finally {
    reader.releaseLock();
  }
}
