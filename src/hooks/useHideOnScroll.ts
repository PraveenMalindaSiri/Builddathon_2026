import { useEffect, useRef, useState } from 'react'

const SCROLL_THRESHOLD = 12

/** Hide chrome when scrolling down; show when scrolling up (mobile-style). */
export function useHideOnScroll() {
  const [hidden, setHidden] = useState(false)
  const lastY = useRef(0)

  useEffect(() => {
    lastY.current = window.scrollY

    const onScroll = () => {
      const y = window.scrollY
      const delta = y - lastY.current

      if (y < SCROLL_THRESHOLD) {
        setHidden(false)
      } else if (delta > SCROLL_THRESHOLD) {
        setHidden(true)
      } else if (delta < -SCROLL_THRESHOLD) {
        setHidden(false)
      }

      lastY.current = y
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return hidden
}
