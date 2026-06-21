import { getProfileIcon, getTextColor, getUserColor } from "../utils/ProfileIconColors";
import type { User } from "../../types";

type ProfileIconProps = {
    type? : "default" | "extra-small"
    user: User
}
export default function ProfileIcon(props:ProfileIconProps) {
    let extraClasses = " ";
    if (props.type == "extra-small") {
        extraClasses += " h-8 ";
    }
    if (!props.user.photo) {
        const userColor = getUserColor(props.user.userId)
        const profileIcon = getProfileIcon(props.user.name)
        const textColor = getTextColor(userColor)
        return (
            <div className={`profile-icon ${extraClasses}`} style={{backgroundColor:userColor, color:textColor}}>{profileIcon}</div>
        )
    } else {
        return (<img className={`rounded-full h-8 inline-block ${extraClasses}`} src={props.user.photo} />)
    }
}