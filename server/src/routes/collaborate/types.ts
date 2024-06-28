import type { WebSocket } from "ws";

export enum MESSAGE_TYPE {
  FILE_UPLOAD = 'file_upload',
  HAS_ACTIVE_FILE = 'has_active_file',
  CONNECTION_ESTABLISHED = 'connection_established',
  NEW_CLIENT_CONNECTED = 'new_client_connected',
  CLIENT_SELECT_LAYER = 'client_select_layer',
  CLIENT_MODIFIED_FILE = 'client_modified_file',
  PING = 'PING',
  PONG = 'PONG',
  ACTIVE_CLIENTS = 'active_clients',
  ANIMATION_DATA_CHANGED = 'animation_data_changed',
}

export type SessionMessage<T> = {
  type: MESSAGE_TYPE;
  data: T
}

export type Clients = Set<{ clientId: string, conn: WebSocket, colorScheme: string }>