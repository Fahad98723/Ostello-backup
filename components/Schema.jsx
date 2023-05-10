export default function Schema({ json }) {
  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  )
}
