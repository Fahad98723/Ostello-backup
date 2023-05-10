import { AiFillFacebook, AiFillInstagram, AiFillLinkedin } from 'react-icons/ai'

import facebook from '../../../assets/icons/facebook.svg'
import github from '../../../assets/icons/github.svg'
import linkedin from '../../../assets/icons/linkedin.svg'
import dribble from '../../../assets/icons/dribble.svg'
import twitch from '../../../assets/icons/twich.svg'
import twitter from '../../../assets/icons/twitter.svg'
import tumblr from '../../../assets/icons/tumblr.svg'
import medium from '../../../assets/icons/medium.svg'
import youtube from '../../../assets/icons/youtube.svg'
import pinterest from '../../../assets/icons/pinterest.svg'
import blogger from '../../../assets/icons/blogger.svg'
import instagram from '../../../assets/icons/instagram.svg'

export const socialLinks = [
  {
    title: 'Twitter',
    img: twitter.src,
    url: 'https://twitter.com/OstelloIndia',
    size:'w-[30px] h-[30px]'
  },
  {
    title: 'LinkedIn',
    img: linkedin.src,
    url: 'https://www.linkedin.com/company/ostello-india/',
    size:'w-[28px] h-[28px]'
  },
  {
    title: 'Facebook',
    img: facebook.src,
    url: 'https://www.facebook.com/ostellocare',
    size:'w-[30px] h-[30px]'
  },
  // {
  //   title: 'Blogger',
  //   img: blogger.src,
  //   url: 'https://ostelloindiacare.blogspot.com/',
  // },
  // {
  //   title: 'Github',
  //   img: github.src,
  //   url: 'https://github.com/',
  // },
  // {
  //   title: 'Twitch',
  //   img: twitch.src,
  //   url: 'https://twitch.com/',
  // },
  // {
  //   title: 'Dribble',
  //   img: dribble.src,
  //   url: 'https://dribble.com/',
  // },
  // {
  //   title: 'Tumblr',
  //   img: tumblr.src,
  //   url: 'https://www.tumblr.com/blog/view/ostelloindia	',
  // },
  // {
  //   title: 'Medium',
  //   img: medium.src,
  //   url: 'https://medium.com/@ostelloindia',
  // },


  {
    title: 'Instagram',
    img: instagram.src,
    url: 'https://www.instagram.com/ostelloindia/',
    size:'w-[35px] h-[35px]'
  },

  {
    title: 'Youtube',
    img: youtube.src,
    url: 'https://www.youtube.com/channel/UCO0FJ52dFGo4xS6f6NQ-qoQ',
    size:'w-[35px] h-[35px]'
  },
  // {
  //   title: 'Pinterest',
  //   img: pinterest.src,
  //   url: 'https://in.pinterest.com/ostelloindia/',
  // },
]

export const footerLinks = [
  // {
  //   domain: 'Product',
  //   subDomains: [
  //     {
  //       title: 'Overview',
  //       url: '/',
  //       tag: '',
  //     },
  //     {
  //       title: 'Features',
  //       url: '/',
  //       tag: '',
  //     },
  //     {
  //       title: 'Solutions',
  //       url: '/',
  //       tag: 'New',
  //     },
  //     {
  //       title: 'Tutorials',
  //       url: '/',
  //       tag: '',
  //     },
  //     {
  //       title: 'Pricing',
  //       url: '/',
  //       tag: '',
  //     },
  //     {
  //       title: 'Releases',
  //       url: '/',
  //       tag: '',
  //     },
  //   ],
  // },
  {
    domain: 'Company',
    subDomains: [
      {
        title: 'About us',
        url: '/about-us',
        tag: '',
      },
      {
        title: 'Career',
        url: '/career',
        tag: '',
      },
      {
        title: 'Press',
        url: '/press',
        tag: '',
      },
      // {
      //   title: 'News',
      //   url: '/',
      //   tag: '',
      // },
      // {
      //   title: 'Media kit',
      //   url: '/',
      //   tag: '',
      // },
      {
        title: 'Contact',
        url: '/contact-us',
        tag: '',
      },
    ],
  },
  {
    domain: 'Resources',
    subDomains: [
      {
        title: 'Blog',
        url: '/blogs',
        tag: '',
      },
      {
        title: 'Newsletter',
        url: '/',
        tag: '',
      },
      {
        title: 'Events',
        url: '/events',
        tag: '',
      },
      // {
      //   title: 'Help Center',
      //   url: '/helpcenter',
      //   tag: '',
      // },
      // {
      //   title: 'Tutorials',
      //   url: '/',
      //   tag: '',
      // },
      // {
      //   title: 'Support',
      //   url: '/',
      //   tag: '',
      // },
    ],
  },
  {
    domain: 'Legal',
    subDomains: [
      {
        title: 'Terms',
        url: '/terms',
        tag: '',
      },
      {
        title: 'Privacy',
        url: '/privacy',
        tag: '',
      },
      // {
      //   title: 'Cookies',
      //   url: '/',
      //   tag: '',
      // },
      // {
      //   title: 'Licenses',
      //   url: '/',
      //   tag: '',
      // },
      // {
      //   title: 'Settings',
      //   url: '/',
      //   tag: '',
      // },
      // {
      //   title: 'Contact',
      //   url: '/contact-us',
      //   tag: '',
      // },
    ],
  },
]

// const socialLinks = [
//   {
//     title: 'instagram',
//     link: 'https://www.instagram.com/ostelloindia/?hl=en',
//     icon: <AiFillInstagram />,
//   },
//   {
//     title: 'facebook',
//     link: 'https://m.facebook.com/ostellocare/',
//     icon: <AiFillFacebook />,
//   },
//   {
//     title: 'youtube',
//     link: 'https://youtube.com/channel/UCO0FJ52dFGo4xS6f6NQ-qoQ',
//     icon: <ImYoutube />,
//   },
//   {
//     title: 'linkedin',
//     link: 'https://www.linkedin.com/company/ostello-india',
//     icon: <AiFillLinkedin />,
//   },
// ]
// export const footerLinks = [
//   {
//     header: 'About us',
//     links: [
//       {
//         title: 'Who we are',
//         url: '/about-us',
//         disabled: false,
//       },
//       {
//         title: 'Press',
//         url: '/press',
//         disabled: true,
//       },
//       {
//         title: 'Careers',
//         url: '/career',
//         disabled: false,
//       },
//       {
//         title: 'Blogs',
//         url: '/blogs',
//         disabled: false,
//       },
//       {
//         title: 'Sitemap',
//         url: '/sitemap',
//         disabled: false,
//       },
//     ],
//   },
//   {
//     header: 'Events',
//     url: '/events',
//     links: [
//       {
//         title: 'About Our Events',
//         url: '/events',
//         disabled: true,
//       },
//       {
//         title: 'Scholarship',
//         url: '/',
//         disabled: true,
//       },
//     ],
//   },
//   {
//     header: 'Contact Us',
//     links: [
//       {
//         title: 'FAQs',
//         url: '/faq',
//         disabled: true,
//       },
//       {
//         title: 'Contact Us',
//         url: '/contact-us',
//         disabled: true,
//       },
//     ],
//   },
//   {
//     header: 'Terms of Use',
//     links: [
//       {
//         title: 'Terms & Conditions',
//         url: '/terms',
//       },
//       {
//         title: 'Privacy Policy',
//         url: '/privacy',
//       },
//       {
//         title: 'Refund Policy',
//         url: '/',
//       },
//       {
//         title: 'Trust & Safety',
//         url: '/',
//       },
//     ],
//   },
// ]
