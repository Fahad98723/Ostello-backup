// Tag Components ==>>
export const Section = ({ children, className }) => (
  <section className={` space-y-2 mt-10 md:max-w-3xl md:mx-auto ${className}`}>
    {children}
  </section>
)
export const Title = ({ children, className }) => (
  <h1
    className={`font-bold text-2xl mt-10
    ${className}`}
  >
    {children}
  </h1>
)
export const Paragraph = ({ children, className }) => (
  <p className={`text-gray py-2 md:text-lg mt-2 ${className}`}>{children}</p>
)
export const Image = ({ src, className }) => (
  <div className='w-full'>
    <img className={`w-fit mx-auto ${className}`} src={src} alt='' />
  </div>
)

export const Divider = ({ className }) => (
  <span
    className={`border-2 border-l-0 border-r-0 border-b-0 block w-full max-w-3xl mx-auto border-gray/10 ${className}`}
  />
)

export const Quote = ({ caption, text }) => {
  return (
    <section className='border py-2 border-primary  border-l-2 border-r-0 border-t-0 border-b-0 pl-5 mt-10'>
      <p className=' font-bold italic max-w-lg md:text-lg'>" {text} "</p>
      <p className='mt-5 text-gray'> - {caption}</p>
    </section>
  )
}

export const Tag = ({ type, children, className }) => {
  let red = ` text-[#FF0000]-600 bg-red-100 `
  let green = ` text-green-600 bg-green-100 `
  let blue = ` text-blue-600 bg-blue-100 `

  return (
    <span
      className={` rounded-xl px-2 py-1 ${
        type == 'red'
          ? red
          : type == 'green'
          ? green
          : type == 'blue'
          ? blue
          : null
      } ${className}`}
    >
      {children}
    </span>
  )
}

export const LinkButton = ({ children, className, url, onClick, ...rest }) => {
  const router = useRouter()
  const handleClick = () => {
    if (url?.length) {
      router.push(url)
    }
  }
  return (
    <button
      onClick={() => {
        onClick()
        handleClick()
      }}
      className={`  border-2 border-gray/30 rounded-md  active:opacity-80 duration-300 transition-all p-2 h-8 flex items-center justify-center w-fit  ${className}`}
    >
      {children}
    </button>
  )
}

export const parseTag = ({
  type,
  data: { text, level, caption, style, items, file },
  id,
}) => {
  const renderTextOrHTML = (text) => {
    const sanitizedText = text.replaceAll('&nbsp;', ' ')
    if (text?.indexOf('<') !== -1) {
      return (
        <>
          <span key={id} dangerouslySetInnerHTML={{ __html: sanitizedText }} />
        </>
      )
    } else {
      return sanitizedText
    }
  }
  if (type === 'paragraph') {
    return <Paragraph key={id}>{renderTextOrHTML(text)}</Paragraph>
  } else if (type === 'header') {
    return <Title key={id}>{renderTextOrHTML(text)}</Title>
  } else if (type === 'quote') {
    return (
      <Quote
        key={id}
        text={renderTextOrHTML(text)}
        caption={renderTextOrHTML(caption)}
      />
    )
  } else if (type === 'list') {
    const type = style === 'ordered' ? 'ol' : 'ul'
    const childrens = items?.reduce((acc, item) => acc + `<li>${item}</li>`, '')
    return (
      <div className='pl-6'>
        {renderTextOrHTML(`<${type} >${childrens}</${type}>`)}
      </div>
    )
  } else if (type === 'image') {
    return (
      <div className='' key={id}>
        <Image src={file.url} alt='' />
        <Paragraph>{caption}</Paragraph>
      </div>
    )
  } else {
    null
  }
}
