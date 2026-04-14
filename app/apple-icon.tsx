import { ImageResponse } from 'next/og'

export const dynamic = 'force-static'
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          borderRadius: 40,
          background: 'linear-gradient(135deg, #00a8cc 0%, #004e5f 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Left wing upper */}
        <div style={{
          position: 'absolute',
          top: 72,
          left: 10,
          width: 62,
          height: 34,
          background: 'white',
          borderRadius: '0 60% 30% 10%',
          transform: 'rotate(-12deg)',
        }}/>
        {/* Right wing upper */}
        <div style={{
          position: 'absolute',
          top: 72,
          right: 10,
          width: 62,
          height: 34,
          background: 'white',
          borderRadius: '60% 0 10% 30%',
          transform: 'rotate(12deg)',
        }}/>
        {/* Body */}
        <div style={{
          position: 'absolute',
          top: 82,
          left: 76,
          width: 28,
          height: 56,
          background: 'white',
          borderRadius: '50% 50% 35% 35%',
        }}/>
        {/* Head */}
        <div style={{
          position: 'absolute',
          top: 46,
          left: 76,
          width: 28,
          height: 28,
          background: 'white',
          borderRadius: '50%',
        }}/>
        {/* Tail */}
        <div style={{
          position: 'absolute',
          bottom: 18,
          left: 70,
          width: 40,
          height: 16,
          background: 'white',
          borderRadius: '0 0 40% 40%',
        }}/>
      </div>
    ),
    { ...size }
  )
}
