import type { User } from "@/api/types";
import defaultAvatar from "@/assets/images/default-avatar.png";
import styles from "./Avatar.module.css";
import { getAvatar } from "@/utils/avatar";

interface AvatarProps {
  user: User;
}

function Avatar({ user }: AvatarProps) {
  return (
    <img
      className={styles.avatar}
      src={getAvatar(user)}
      alt={`${user.nombre} ${user.apellido}`}
      loading="lazy"
      onError={(e) => {
        e.currentTarget.src = defaultAvatar;
      }}
    />
  );
}

export default Avatar;
