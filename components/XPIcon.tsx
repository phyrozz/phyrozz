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

const AERO_FILES: Record<XPIconName, string> = {
  'Windows Update': 'netcenter_7.png', Home: 'imageres_162.png', Briefcase: 'imageres_130.png', 'My Computer': 'imageres_109.png',
  Music: 'wmpshare_IDR_MAINFRAME.png', Important: 'imageres_81.png', Palette: 'mspaint_2.png',
  Menu: 'oobefldr_101.png', Exit: 'imageres_98.png', 'Map Network Drive': 'imageres_152.png',
  Email: 'imageres_20.png', Phone: 'networkexplorer_120.png', 'Date and Time': 'dfrgui_137.png',
  Download: 'shell32_16761.png', 'Internet Explorer 6': 'shell32_16744.png', Link: 'shell32_16744.png',
  Monitor: 'imageres_101.png', Star: 'SLUI_3.png', Globe: 'netcenter_7.png',
  Building: 'imageres_114.png', Smile: 'mstscax_13413.png', Flower: 'desk_40.png',
  Theater: 'wmpshare_IDR_MAINFRAME.png', Search: 'imageres_177.png', Heart: 'imageres_115.png',
  Calendar: 'WinCal_100.png', Disc: 'imageres_61.png', Play: 'sud_5.png',
  Radio: 'mblctr_170.png', Headphones: 'SndVolSSO_124.png', Flame: 'imageres_30.png',
  Lightbulb: 'shell32_1001.png', Quote: 'TabletPC_10204.png', Previous: 'msctf_401.png',
  Next: 'netshell_1607.png', Refresh: 'shell32_16739.png', 'Folder Opened': 'imageres_3.png', 'Control Panel': 'imageres_114.png', Delete: 'imageres_89.png',
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
    <>
      <img src={'/xp-icons/' + encodeURIComponent(FILES[name])} alt={alt} width={size} height={size} className={'xp-only-icon shrink-0 ' + className} style={{ imageRendering: 'pixelated', ...style }} aria-hidden={alt ? undefined : true} {...ariaProps} />
      <img src={'/aero-icons/' + encodeURIComponent(AERO_FILES[name])} alt={alt} width={size} height={size} className={'aero-only-icon shrink-0 ' + className} style={style} aria-hidden={alt ? undefined : true} {...ariaProps} />
    </>
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
