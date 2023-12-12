export default function Home() {
  const user = JSON.parse(localStorage.getItem("userInfo"));

  if (!user) {
    return null;
  } else {
    return <div>Welcome {JSON.stringify(user.username)}</div>;
  }
}
