import { Outlet } from 'react-router-dom'
import { ActivePipelineProvider } from '@/contexts/ActivePipelineContext'

export function AppLayout() {
  return (
    <ActivePipelineProvider>
      <Outlet />
    </ActivePipelineProvider>
  )
}
