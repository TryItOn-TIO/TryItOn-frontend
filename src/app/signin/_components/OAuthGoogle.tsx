import { signinWithGoogle } from "@/api/auth";
import { setAccessToken } from "@/utils/auth";
import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { useIdToken } from "@/hooks/useIdToken";

const OAuthGoogle = () => {
  const { setIdToken } = useIdToken();

  const router = useRouter();

  const handleSuccess = async (credentialResponse: any) => {
    if (!credentialResponse?.credential) {
      console.error("Google 인증 토큰을 받지 못했습니다.");
      return;
    }

    const idToken = credentialResponse.credential;

    try {
      // 먼저 로그인 시도
      const loginRes = await signinWithGoogle({ idToken });

      // 로그인 성공
      if (loginRes.accessToken) {
        setAccessToken(loginRes.accessToken);
        console.log("로그인 성공:", loginRes);
        router.push("/"); // 홈으로 리다이렉트
      }
    } catch (error: any) {
      console.error("로그인 에러:", error);

      // 404 에러 또는 회원가입이 필요한 경우
      if (error.response?.status === 404 || error.response?.needsSignup) {
        console.log("회원가입이 필요합니다");

        setIdToken(idToken);
        router.push("/signup/oauth");
      } else {
        console.error("로그인 오류:", error.response || error.message);
        alert("로그인 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    }
  };

  const handleError = () => {
    console.log("Google 로그인 실패");
    alert("Google 로그인에 실패했습니다. 다시 시도해주세요.");
  };

  return (
    <div className="w-full flex justify-center my-8">
      <GoogleLogin
        width={"500px"}
        onSuccess={handleSuccess}
        onError={handleError}
        useOneTap={false}
        auto_select={false}
        theme="outline"
        size="large"
        text="signup_with"
        shape="rectangular"
      />
    </div>
  );
};

export default OAuthGoogle;
