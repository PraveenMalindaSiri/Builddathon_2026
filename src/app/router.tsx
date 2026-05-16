import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from '@/app/AppLayout'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { HomePage } from '@/pages/HomePage'
import { PitchPage } from '@/pages/PitchPage'
import { PitchResultPage } from '@/pages/PitchResultPage'
import { CampaignPage } from '@/pages/CampaignPage'
import { CampaignResultPage } from '@/pages/CampaignResultPage'
import { LoginPage } from '@/pages/LoginPage'
import { SignupPage } from '@/pages/SignupPage'
import { HistoryPage } from '@/pages/HistoryPage'
import { NotFoundPage } from '@/pages/NotFoundPage'

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
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
        path: '/campaign/:campaignId',
        element: (
          <ProtectedRoute>
            <CampaignResultPage />
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
    ],
  },
])
