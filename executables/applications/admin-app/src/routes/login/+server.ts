import { backChannel } from "$lib/api";
import { redirect } from "@sveltejs/kit";

export const GET = async ({ request, cookies }) => {
  const url = new URL(request.url)
  const params = new URLSearchParams(url.search)
  const code = params.get('code')
  if (!code)
    return redirect(308, "/")
  const response = await backChannel.login({ body: { code } })
  if (response.status !== 200)
    return redirect(308, "/")
  cookies.set("session", response.body.token, {
    path: "/",
    httpOnly: true,
    sameSite: true,
    secure: process.env.NODE_ENV === "production",
  })
  return redirect(308, "/")
}
