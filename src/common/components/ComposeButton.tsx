import Button from "./Button"
import { logger } from "../utils/Logger";
import { useAuthStore } from "../../store/AuthStore";
import useModal from "../../hooks/useModal";
import ComposePostModal from "../modals/ComposePostModal";
import SignInModal from "../modals/SignInModal";
import { useCallback } from "react";
import { useToast } from "../../hooks/useToast";
import { signInWithGoogle } from "../utils/FirebaseUtils";
import { callAPI } from "../utils/CommonUtils";
import ProfileIcon from "./ProfileIcon";

type ComposeButtonProps = {
  extraClasses: string
}
type CreateUserResponse = { "userId": string }

export default function ComposeButton(props: ComposeButtonProps) {
  const user = useAuthStore((s) => s.user)
  const setUser = useAuthStore((s) => s.setUser)
  const loginModal = useModal()
  const composePostModal = useModal()
  const toast = useToast()

  const loginUser = useCallback(async () => {
    const loggedInUser = await signInWithGoogle()
    const apiResp = await callAPI<CreateUserResponse>("v1/user/create", {
      "method": "POST",
      "body": loggedInUser
    })
    loggedInUser.userId = apiResp.userId
    localStorage.setItem("userObj", JSON.stringify(loggedInUser))
    setUser(loggedInUser)
    loginModal.closeModal()
    composePostModal.openModal()
    toast.success("Login is successful")
  }, [])

  const handleComposeClick = useCallback(() => {
    if (!user) {
      logger.info("User is trying to add a post in loggedout state")
      loginModal.openModal()
    } else {
      logger.info("User is trying to add a post in loggedin state")
      composePostModal.openModal()
    }
  }, [user])

  const icon = user ? <ProfileIcon type="extra-small" user={user} /> : "✍️";

  return (
    <>
      <Button
        type="primary"
        extraClasses={props.extraClasses}
        ariaLabel="Compose a Post"
        icon={icon}
        handleClick={handleComposeClick}
      >
        Compose a Post
      </Button>

      {user && (
        <ComposePostModal
          isOpen={composePostModal.isOpen}
          closeModal={composePostModal.closeModal}
          user={user}
        />
      )}

      <SignInModal
        isOpen={loginModal.isOpen}
        closeModal={loginModal.closeModal}
        loginUser={loginUser}
      />
    </>
  )
}
