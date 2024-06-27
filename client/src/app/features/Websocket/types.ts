export type Session = {
  sessionId: number,
  participants: {
    id: string,
    name?: string,
    state: any // should contain the participant state e.g which layer is selected, toolkit, etc
  }[]
}