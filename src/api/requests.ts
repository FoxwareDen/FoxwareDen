const URL = "/.netlify/functions";

export async function heathCheck(): Promise<[boolean, string]> {
  const response = await fetch(`${URL}/heathcheck`);

  const res = await response.json();
  if (response.ok) {
    return [true, res.message];
  } else {
    return [false, res.message];
  }
}
