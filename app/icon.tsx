import { ImageResponse } from 'next/og'

export const dynamic = 'force-static'
export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 7,
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
          top: 13,
          left: 2,
          width: 11,
          height: 6,
          background: 'white',
          borderRadius: '0 60% 30% 10%',
          transform: 'rotate(-12deg)',
        }}/>
        {/* Right wing upper */}
        <div style={{
          position: 'absolute',
          top: 13,
          right: 2,
          width: 11,
          height: 6,
          background: 'white',
          borderRadius: '60% 0 10% 30%',
          transform: 'rotate(12deg)',
        }}/>
        {/* Body */}
        <div style={{
          position: 'absolute',
          top: 14,
          left: 13,
          width: 6,
          height: 10,
          background: 'white',
          borderRadius: '50% 50% 35% 35%',
        }}/>
        {/* Head */}
        <div style={{
          position: 'absolute',
          top: 8,
          left: 13,
          width: 6,
          height: 6,
          background: 'white',
          borderRadius: '50%',
        }}/>
        {/* Tail */}
        <div style={{
          position: 'absolute',
          bottom: 3,
          left: 12,
          width: 8,
          height: 3,
          background: 'white',
          borderRadius: '0 0 40% 40%',
        }}/>
      </div>
    ),
    { ...size }
  )
}
