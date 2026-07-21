import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbNavProps {
  items: BreadcrumbItem[]
}

export default function BreadcrumbNav({ items }: BreadcrumbNavProps) {
  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="パンくずリスト"
      sx={{ mb: 5, fontSize: 13 }}
    >
      {items.map((item, i) =>
        item.href ? (
          <Link
            key={i}

            href={item.href}
            color="text.secondary"
            sx={{ fontSize: 13 }}
          >
            {item.label}
          </Link>
        ) : (
          <Typography
            key={i}
            color="text.primary"
            sx={{
              fontSize: 13,
              maxWidth: 240,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {item.label}
          </Typography>
        )
      )}
    </Breadcrumbs>
  )
}
