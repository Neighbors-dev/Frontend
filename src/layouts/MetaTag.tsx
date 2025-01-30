import { Helmet } from 'react-helmet-async'

export default function MetaTag() {
  return (
    <Helmet>
      <meta
        name="description"
        content="경찰관, 소방관 분들께 감사의 마음을 전하고 도시를 밝혀주세요"
      />
      <meta name="keywords" content="경찰관, 소방관, 감사편지, 감사메시지, 편지, 메시지" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="To.Hero" />
      <meta
        property="og:description"
        content="경찰관, 소방관 분들께 감사의 마음을 전하고 도시를 밝혀주세요"
      />
      <meta property="og:site_name" content="To.Hero" />
      <meta
        property="og:image"
        content="https://storage.googleapis.com/to-hero/images/site-image.png"
      />
      <meta property="og:url" content="https://tohero.co.kr" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content="To.Hero" />
      <meta
        name="twitter:description"
        content="경찰관, 소방관 분들께 감사의 마음을 전하고 도시를 밝혀주세요"
      />
      <meta
        name="twitter:image"
        content="https://storage.googleapis.com/to-hero/images/site-image.png"
      />
    </Helmet>
  )
}
