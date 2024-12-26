import { useNavigate } from 'react-router-dom'

const REDIRECT_URI = `${window.location.origin}${import.meta.env.VITE_KAKAO_REDIRECT_URI}`
const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${import.meta.env.VITE_KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URI}`

export default function Login() {
  const navigate = useNavigate()
  console.log(kakaoLoginUrl)

  return (
    <div>
      <main>
        <h1>로고</h1>
        <section>
          <button type="button" onClick={() => navigate(kakaoLoginUrl)}>
            카카오로 시작하기
          </button>
          <button type="button">비회원으로 작성하기</button>
        </section>
      </main>
    </div>
  )
}
