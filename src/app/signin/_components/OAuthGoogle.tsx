import { signinWithGoogle } from "@/api/auth";
import { setAccessToken } from "@/utils/auth";
import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { useIdToken } from "@/hooks/useIdToken";
import { CredentialResponse } from "@react-oauth/google";
import { useCustomAlert } from "@/hooks/useCustomAlert";
import CustomAlert from "@/components/ui/CustomAlert";

const OAuthGoogle = () => {
  const { isOpen, options, openAlert, closeAlert } = useCustomAlert();

  const { setIdToken } = useIdToken();
  const router = useRouter();

  const handleSuccess = async (credentialResponse: CredentialResponse) => {
    if (!credentialResponse?.credential) {
      console.error("Google 인증 토큰을 받지 못했습니다.");
      openAlert({
        title: "Google 인증 오류",
        message: "Google 인증에 실패했습니다. 다시 시도해주세요.",
        confirmText: "확인",
        cancelText: "취소",
        type: "error",
      });
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

      // 백엔드 BusinessException 처리
      const status = error.response?.status;
      const message = error.response?.data?.message || error.message;

      switch (status) {
        case 404:
          // 사용자를 찾을 수 없음 - 회원가입 필요
          console.log("회원가입이 필요합니다 (404)");
          setIdToken(idToken);
          router.push("/signup/oauth");
          break;

        case 400:
          // 잘못된 요청
          console.error("잘못된 요청:", message);
          openAlert({
            title: "안내",
            message: "잘못된 요청입니다. 다시 시도해주세요.",
            type: "error",
          });
          break;

        case 401:
          // 인증 실패
          console.error("인증 실패:", message);
          openAlert({
            title: "안내",
            message: "Google 인증에 실패했습니다. 다시 로그인해주세요.",
            type: "error",
          });
          break;

        case 403:
          // 권한 없음
          console.error("권한 없음:", message);
          openAlert({
            title: "안내",
            message: "접근 권한이 없습니다.",
            type: "error",
          });
          break;

        case 409:
          // 중복 또는 충돌
          console.error("데이터 충돌:", message);
          openAlert({
            title: "안내",
            message: "이미 존재하는 계정입니다. 다른 방법으로 로그인해주세요.",
            type: "error",
          });
          break;

        case 500:
          // 서버 내부 오류
          console.error("서버 오류:", message);
          openAlert({
            title: "안내",
            message: "서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.",
            type: "error",
          });
          break;

        default:
          // 네트워크 오류 또는 기타 오류
          if (!status) {
            console.error("네트워크 오류:", error);
            openAlert({
              title: "안내",
              message: "네트워크 연결을 확인하고 다시 시도해주세요.",
              type: "error",
            });
          } else {
            console.error("알 수 없는 오류:", message);
            openAlert({
              title: "안내",
              message: `로그인 중 오류가 발생했습니다. (${status})\n다시 시도해주세요.`,
              type: "error",
            });
          }
          break;
      }
    }
  };

  const handleError = () => {
    console.log("Google 로그인 실패");
    openAlert({
      title: "안내",
      message: "Google 로그인에 실패했습니다. 다시 시도해주세요.",
      type: "error",
    });
  };

  return (
    <>
      <CustomAlert
        isOpen={isOpen}
        title={options.title}
        message={options.message}
        type={options.type}
        onConfirm={options.onConfirm || closeAlert}
        onCancel={options.onCancel}
      />

      <div className="w-full flex justify-center my-8">
        <GoogleLogin
          width="100%"
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
    </>
  );
};

export default OAuthGoogle;
