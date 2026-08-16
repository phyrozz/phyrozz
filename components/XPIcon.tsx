import type { ComponentType, CSSProperties } from 'react'
import {
  Home as LucideHome, Briefcase as LucideBriefcase, Monitor as LucideMonitor,
  Palette as LucidePalette, Sparkles as LucideSparkles, Menu as LucideMenu,
  X as LucideX, Music2 as LucideMusic2, MapPin as LucideMapPin,
  Mail as LucideMail, Phone as LucidePhone, Cake as LucideCake,
  Download as LucideDownload, GitBranch as LucideGitBranch, Link as LucideLink,
  Star as LucideStar, Globe as LucideGlobe, Building2 as LucideBuilding2,
  Smile as LucideSmile, Flower2 as LucideFlower2, Theater as LucideTheater,
  CalendarDays as LucideCalendarDays, Search as LucideSearch, Heart as LucideHeart,
  Disc3 as LucideDisc3, Play as LucidePlay, Radio as LucideRadio,
  Headphones as LucideHeadphones, Flame as LucideFlame, Lightbulb as LucideLightbulb,
  Quote as LucideQuote, FolderOpen as LucideFolderOpen, ChevronLeft as LucideChevronLeft, ChevronRight as LucideChevronRight, RotateCw as LucideRotateCw,
} from 'lucide-react'

export type XPIconName =
  | 'Windows Update' | 'Home' | 'Briefcase' | 'My Computer' | 'Music' | 'Important' | 'Palette'
  | 'Menu' | 'Exit' | 'Map Network Drive' | 'Email' | 'Phone' | 'Date and Time'
  | 'Download' | 'Internet Explorer 6' | 'Link' | 'Monitor' | 'Star' | 'Globe'
  | 'Building' | 'Smile' | 'Flower' | 'Theater' | 'Search' | 'Heart' | 'Calendar'
  | 'Disc' | 'Play' | 'Radio' | 'Headphones' | 'Flame' | 'Lightbulb' | 'Quote'
  | 'Previous' | 'Next' | 'Refresh' | 'Folder Opened' | 'Control Panel' | 'Delete'

const FILES: Record<XPIconName, string> = {
  'Windows Update': 'Windows Update.png', Home: 'My Documents.png', Briefcase: 'Briefcase.png', 'My Computer': 'My Computer.png',
  Music: 'My Music.png', Important: 'Important.png', Palette: 'Paint.png',
  Menu: 'Start Menu Programs.png', Exit: 'Exit.png', 'Map Network Drive': 'Map Network Drive.png',
  Email: 'Email.png', Phone: 'Phone.png', 'Date and Time': 'Date and Time.png',
  Download: 'Save.png', 'Internet Explorer 6': 'Internet Explorer 6.png', Link: 'URL.png',
  Monitor: 'Application Window.png', Star: 'Important.png', Globe: 'Network and Internet.png',
  Building: 'Computer Management.png', Smile: 'Success.png', Flower: 'Appearance.png',
  Theater: 'Windows Movie Maker.png', Search: 'Search.png', Heart: 'Favorites.png',
  Calendar: 'Date and Time.png', Disc: 'CD-ROM.png', Play: 'Play.png',
  Radio: 'Audio Devices.png', Headphones: 'Audio Devices.png', Flame: 'Burn audio CD.png',
  Lightbulb: 'Tip of the day.png', Quote: 'Compose a fax.png', Previous: 'Back.png',
  Next: 'Forward.png', Refresh: 'IE Refresh.png', 'Folder Opened': 'Folder Opened.png', 'Control Panel': 'Control Panel.png', Delete: 'Delete.png',
}

interface Props {
  name: XPIconName
  size?: number
  className?: string
  style?: CSSProperties
  alt?: string
  'aria-hidden'?: boolean | 'true' | 'false'
}

export default function XPIcon({ name, size = 16, className = '', style, alt = '', ...ariaProps }: Props) {
  return (
    <img
      src={'/xp-icons/' + encodeURIComponent(FILES[name])}
      alt={alt}
      width={size}
      height={size}
      className={'xp-only-icon shrink-0 ' + className}
      style={{ imageRendering: 'pixelated', ...style }}
      aria-hidden={alt ? undefined : true}
      {...ariaProps}
    />
  )
}

type IconProps = Omit<Props, 'name'>

function icon(name: XPIconName, PastelIcon: ComponentType<IconProps>) {
  return function ThemeIcon(props: IconProps) {
    return (
      <>
        <PastelIcon {...props} className={'pastel-only-icon ' + (props.className ?? '')} />
        <XPIcon name={name} {...props} />
      </>
    )
  }
}

export type LucideIcon = ReturnType<typeof icon>
export const WindowsUpdate = icon('Windows Update', LucideSparkles); export const Home = icon('Home', LucideHome)
export const Briefcase = icon('Briefcase', LucideBriefcase)
export const Monitor = icon('My Computer', LucideMonitor)
export const Palette = icon('Palette', LucidePalette)
export const Important = icon('Important', LucideSparkles)
export const Menu = icon('Menu', LucideMenu)
export const X = icon('Exit', LucideX)
export const Music2 = icon('Music', LucideMusic2)
export const MapPin = icon('Map Network Drive', LucideMapPin)
export const Mail = icon('Email', LucideMail)
export const Phone = icon('Phone', LucidePhone)
export const Cake = icon('Date and Time', LucideCake)
export const Download = icon('Download', LucideDownload)
export const GitBranch = icon('Internet Explorer 6', LucideGitBranch)
export const Link = icon('Link', LucideLink)
export const Star = icon('Star', LucideStar)
export const Globe = icon('Globe', LucideGlobe)
export const Building2 = icon('Building', LucideBuilding2)
export const Smile = icon('Smile', LucideSmile)
export const Flower2 = icon('Flower', LucideFlower2)
export const Theater = icon('Theater', LucideTheater)
export const CalendarDays = icon('Calendar', LucideCalendarDays)
export const Search = icon('Search', LucideSearch)
export const Heart = icon('Heart', LucideHeart)
export const Disc3 = icon('Disc', LucideDisc3)
export const Play = icon('Play', LucidePlay)
export const Radio = icon('Radio', LucideRadio)
export const Headphones = icon('Headphones', LucideHeadphones)
export const Flame = icon('Flame', LucideFlame)
export const Lightbulb = icon('Lightbulb', LucideLightbulb)
export const Quote = icon('Quote', LucideQuote)
export const ChevronLeft = icon('Previous', LucideChevronLeft)
export const ChevronRight = icon('Next', LucideChevronRight)
export const Refresh = icon('Refresh', LucideRotateCw); export const FolderOpen = icon('Folder Opened', LucideFolderOpen); export const ControlPanel = icon('Control Panel', LucideMonitor)
export const Delete = icon('Delete', LucideX)
