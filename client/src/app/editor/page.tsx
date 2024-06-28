'use client'
import Editor from '@/app/features/Editor'
import React from 'react'
import { WebSocketContextProvider } from '../context/WebSocketContextProvider'

const EditorPage = () => {
  return <WebSocketContextProvider><Editor /></WebSocketContextProvider>
}

export default EditorPage