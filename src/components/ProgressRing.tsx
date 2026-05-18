import { useState, useRef, useCallback, useEffect } from 'react'

function useInView(threshold = 0.3) {
  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  const observer = useRef<IntersectionObserver | null>(null)

  const setRef = useCallback((node: HTMLDivElement | null) => {
    if (observer.current) {
      observer.current.disconnect()
    }

    ref.current = node

    if (node) {
      observer.current = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsInView(true)
          }
        },
        { threshold }
      )
      observer.current.observe(node)
    }
  }, [threshold])

  useEffect(() => {
    return () => {
      if (observer.current) {
        observer.current.disconnect()
      }
    }
  }, [])

  return { ref: setRef, isInView }
}

interface ProgressRingProps {
  percentage: number
  size?: number
  strokeWidth?: number
  duration?: number
  delay?: number
  color?: string
  bgColor?: string
  children?: React.ReactNode
}

export default function ProgressRing({
  percentage,
  size = 120,
  strokeWidth = 8,
  duration = 2000,
  delay = 0,
  color = '#fbbf24',
  bgColor = 'rgba(255, 255, 255, 0.1)',
  children,
}: ProgressRingProps) {
  const { ref, isInView } = useInView()
  const [animatedPercentage, setAnimatedPercentage] = useState(0)
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius

  useEffect(() => {
    if (!isInView) return

    const startTime = Date.now() + delay

    const animate = () => {
      const elapsed = Date.now() - startTime
      if (elapsed < 0) {
        requestAnimationFrame(animate)
        return
      }

      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)

      setAnimatedPercentage(eased * percentage)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setAnimatedPercentage(percentage)
      }
    }

    requestAnimationFrame(animate)
  }, [isInView, percentage, duration, delay])

  const offset = circumference - (animatedPercentage / 100) * circumference

  return (
    <div ref={ref} className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={bgColor}
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-100"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  )
}
