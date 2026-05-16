import { createBrowserRouter } from 'react-router-dom'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { HomePage } from '@/pages/HomePage'
import { PitchPage } from '@/pages/PitchPage'
import { PitchResultPage } from '@/pages/PitchResultPage'
import { CampaignPage } from '@/pages/CampaignPage'
import { LoginPage } from '@/pages/LoginPage'
import { SignupPage } from '@/pages/SignupPage'
import { HistoryPage } from '@/pages/HistoryPage'
import { NotFoundPage } from '@/pages/NotFoundPage'

export const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/signup', element: <SignupPage /> },
  {
    path: '/pitch',
    element: (
      <ProtectedRoute>
        <PitchPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/pitch/result',
    element: (
      <ProtectedRoute>
        <PitchResultPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/pitch/result/:sessionId',
    element: (
      <ProtectedRoute>
        <PitchResultPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/campaign',
    element: (
      <ProtectedRoute>
        <CampaignPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/history',
    element: (
      <ProtectedRoute>
        <HistoryPage />
      </ProtectedRoute>
    ),
  },
  { path: '*', element: <NotFoundPage /> },
])
