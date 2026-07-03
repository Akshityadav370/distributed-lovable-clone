export type MessageRole = 'USER' | 'ASSISTANT' | 'SYSTEM' | 'TOOL';

export type ChatEventType = 'THOUGHT' | 'MESSAGE' | 'FILE_EDIT' | 'TOOL_LOG';

export interface ChatEventResponse {
  id: number;
  type: ChatEventType;
  sequenceOrder: number;
  content: string | null;
  filePath: string | null;
  metadata: string | null;
}

export interface ChatResponse {
  id: number;
  role: MessageRole;
  events: ChatEventResponse[];
  content: string;
  tokensUsed: number | null;
  createdAt: string;
}

export interface ChatRequest {
  message: string;
  projectId: number;
}

/** The live SSE stream only ever emits this -- richer typed events (THOUGHT,
 * FILE_EDIT, TOOL_LOG) only exist on persisted history, not on the stream. */
export interface StreamResponse {
  text: string;
}
