import { AiOutlineSearch } from 'react-icons/ai'
import { IoLocationOutline } from 'react-icons/io5'

const SearchIcon = <AiOutlineSearch />
const LocationIcon = <IoLocationOutline />

const TopNavData = [
  {
    id: 1,
    type: 'location',
    icon: LocationIcon,
    content: '',
    placeholderText: 'Choose location',
  },
  {
    id: 2,
    type: 'search',
    icon: SearchIcon,
    content: '',
    placeholderText: 'Search for courses,institutes',
  },
]

export default TopNavData
