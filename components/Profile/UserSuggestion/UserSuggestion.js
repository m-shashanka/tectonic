import { useRouter } from 'next/router';
import Card from '../../Layout/Card/Card';
import styles from './userSuggestion.module.css';

const profilePics = [
  "http://res.cloudinary.com/drnc3bkx7/image/upload/v1641534257/chbewrfoljgruxkl5t53.jpg",
  "http://res.cloudinary.com/drnc3bkx7/image/upload/v1641540354/r67io8m9gcq89rbjml0u.jpg",
  "http://res.cloudinary.com/drnc3bkx7/image/upload/v1641538659/sexakhxba68gal1prsio.jpg",
  "http://res.cloudinary.com/drnc3bkx7/image/upload/v1641539612/xeez3xmdlgf48wx1jbjh.jpg",
  "http://res.cloudinary.com/drnc3bkx7/image/upload/v1641538119/ronc0yu3sdkoasytt4ab.jpg"
];

const username = [
  "nancy",
  "joseph",
  "alice",
  "james",
  "marcos"
];

const UserSuggestion = ({index}) => {
  const router = useRouter();

    return (
      <Card className={styles.user} onClick={()=>router.push(`/${username[index]}`)} >
          <div className={styles.userPic}>
              <img src={profilePics[index]} />
          </div>
          <h4>{username[index]}</h4>
      </Card>
    );
}

export default UserSuggestion;