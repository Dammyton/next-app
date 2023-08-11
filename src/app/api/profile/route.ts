/** @TODO */

export async function GET(request: Request) {
  const token = request.headers.get('Authorization');

  if (token === `Bearer 123`) {
    return new Response(
      JSON.stringify({ name: 'John Doe', email: 'johndoe@gmail.com' }),
      { status: 200 }
    );
  } else {
    return new Response('Unauthorized', { status: 401 });
  }
}
