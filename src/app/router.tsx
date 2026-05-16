import { createBrowserRouter } from 'react-router-dom'
import { HomePage } from '@/pages/HomePage'
import { PitchPage } from '@/pages/PitchPage'
import { PitchResultPage } from '@/pages/PitchResultPage'
import { CampaignPage } from '@/pages/CampaignPage'
import { NotFoundPage } from '@/pages/NotFoundPage'

export const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/pitch', element: <PitchPage /> },
  { path: '/pitch/result', element: <PitchResultPage /> },
  { path: '/campaign', element: <CampaignPage /> },
  { path: '*', element: <NotFoundPage /> },
])
