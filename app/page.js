export default function Home() {
  return (
    <div className="flex flex-col">
      Hello, Please login to continue
      <a href="/api/auth/login">Login</a>
    </div>
  )
}
