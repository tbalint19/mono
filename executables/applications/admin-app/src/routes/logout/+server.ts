import { redirect } from '@sveltejs/kit'

export const GET = async ({ cookies }) => {
  cookies.delete("session", {
    path: "/",
    httpOnly: true,
    sameSite: true,
    secure: process.env.NODE_ENV === "production",
  })
  return redirect(308, "/")
}