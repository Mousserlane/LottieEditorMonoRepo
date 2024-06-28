import React, { useEffect, useState } from 'react'
import { useCollaboration } from '@/app/hooks/useCollaboration'
import { MESSAGE_TYPE } from '../../Websocket/types';

type Client = {
  clientId: string;
  colorScheme: string;
}
export const Header = () => {
  const { connectionStatus, getMessage } = useCollaboration()
  const [activeClients, setActiveClients] = useState<Client[]>([]);

  useEffect(() => {
    const message = getMessage()
    if (connectionStatus === 'Open' && message?.type === MESSAGE_TYPE.ACTIVE_CLIENTS) {
      setActiveClients(message?.data as any)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getMessage, connectionStatus])

  return (
    <div className='bg-slate-50 p-8 flex justify-between items-center'>
      <h1>{connectionStatus}</h1>
      <div className='flex items-center'>
        <p className='mr-4'>Active Users:</p>
        {activeClients && activeClients.map((client: Client, index: number) => (
          <div className={`w-6 h-6 rounded-full ml-4 ${client.colorScheme}`} key={`${client.clientId}-index`} />
        ))}
      </div>
    </div>
  )
}