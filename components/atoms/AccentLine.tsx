import Box from '@mui/material/Box'
import type { SxProps, Theme } from '@mui/material/styles'

interface AccentLineProps {
  sx?: SxProps<Theme>
}

/** 見出しの上に置く短いアクセント線 */
export default function AccentLine({ sx }: AccentLineProps) {
  return (
    <Box
      sx={[
        { width: 32, height: 3, borderRadius: 9999, bgcolor: 'primary.main' },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    />
  )
}
