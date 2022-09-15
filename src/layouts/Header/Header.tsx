
import { Navbar, Container, Nav, NavDropdown, Button } from 'react-bootstrap';
import styles from './Header.module.scss';
import Link from 'next/link';
import { authApi } from 'libs/auth.api';
import { useUser } from 'hooks/useUser';
import { BsDoorOpenFill } from "react-icons/bs";
import { useRouter } from 'next/router';
import { useQuestionsInfo } from 'hooks';

export const Header = () => {


  const { mutateUser, isLoggedIn } = useUser();

  const logoutHandler = async () => {
    await authApi.logout();
    mutateUser({ isGuest: true });
  }

  const router = useRouter();
  const signInHandler = async () => {
    router.push('/auth/sign-n')
  }
  const { questionsInfo } = useQuestionsInfo();

  return (
    <Navbar bg="white" expand="lg" className={styles.navbar}>
      <Container >
        <Navbar.Brand >
          <Link href="/">
            <a className={styles.logo}>
              <span className={styles.bracket}>{`{`}</span>
              {` Codeteko `}
              <span className={styles.bracket}>{`}`}</span>
            </a>
          </Link></Navbar.Brand>
        <Navbar.Toggle className={styles.burgerMenu} />
        <Navbar.Collapse className="justify-content-end">
          <Nav >

            <NavDropdown title="Questions" className={styles.navbarLinks} >
              {Object.keys(questionsInfo).map((category) => {
                return (
                  <NavDropdown.Item key={category} className={styles.navbarDropdownItem}>
                    <Link href={`/questions/${category}`}>
                      <a>{category}</a>
                    </Link>
                  </NavDropdown.Item>
                );
              })}

            </NavDropdown>

            <NavDropdown title="Test" className={styles.navbarLinks}>
              {Object.keys(questionsInfo).map((category) => {
                return (
                  <NavDropdown.Item key={category} className={styles.navbarDropdownItem}>
                    <Link href={`/test/${category}`}>
                      <a>{category}</a>
                    </Link>
                  </NavDropdown.Item>
                );
              })}

            </NavDropdown>
            <Nav.Link href="#" className={styles.navbarLinks}>Link</Nav.Link>
            {isLoggedIn ?
              <div className={styles.logout} onClick={logoutHandler}>
                {/* {user?.email || 'name'} */}
                {/* <BsDoorOpenFill className='ml-3' /> */}
                {` Logout`}
              </div> :
              <div className={styles.logout} onClick={signInHandler}>
                {/* {user?.email || 'name'} */}
                {/* <BsDoorOpenFill className='ml-3' /> */}
                {` SignIn`}
              </div>
            }

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar >
  );
}
